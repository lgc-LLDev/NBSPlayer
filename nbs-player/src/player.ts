import { formatError } from 'form-api-ex';
import {
  BUILTIN_INSTRUMENTS,
  BasePlayer,
  BasePlaylist,
  IInstrument,
  IPlayNote,
  IPlaylistFile,
  ISong,
  parse,
} from 'nbs-play';
import { ticker } from './utils';

export const SOUND_ID_MAPPING = [
  'note.harp',
  'note.bassattack',
  'note.bd',
  'note.snare',
  'note.hat',
  'note.guitar',
  'note.flute',
  'note.bell',
  'note.chime',
  'note.xylobone',
  'note.iron_xylophone',
  'note.cow_bell',
  'note.didgeridoo',
  'note.bit',
  'note.banjo',
  'note.pling',
];
const TICKING_BASED = true;

export type PlayerOptions = {
  playerXuid: string;
};

type PlaySoundTaskType = {
  note: IPlayNote;
  player: TickingBasedPlayer;
  stopPlayTask: () => Promise<any>;
};
const playSoundTaskList: PlaySoundTaskType[] = [];

export function buildSoundPacket(
  position: FloatPos,
  instrumentList: IInstrument[],
  note: IPlayNote
): Packet {
  const bs = new BinaryStream();
  const { instrument, velocity, /* panning, */ pitch } = note;
  const { file: fileName } = instrumentList[instrument];
  const sound = fileName.substring(0, fileName.lastIndexOf('.'));

  bs.reset();
  bs.writeString(sound);

  bs.writeVarInt(Math.round(position.x * 8));
  bs.writeUnsignedVarInt(Math.round((position.y + 0.37) * 8));
  bs.writeVarInt(Math.round(position.z * 8));

  bs.writeFloat(velocity);
  bs.writeFloat(pitch);

  return bs.createPacket(86);
}

export abstract class LLBasePlayer extends BasePlayer {
  // eslint-disable-next-line class-methods-use-this
  override get builtinInstruments() {
    return BUILTIN_INSTRUMENTS.map((x) => ({
      ...x,
      file: `${SOUND_ID_MAPPING[x.id]}.ogg`,
    }));
  }

  public readonly playerXuid: string;

  constructor(song: ISong, options?: PlayerOptions) {
    super(song, options);
    const { playerXuid } = options || {};
    if (!playerXuid) throw new Error('playerXuid is required');
    this.playerXuid = playerXuid;
  }
}

class TickingBasedPlayer extends LLBasePlayer {
  override playTask?: () => any;

  override async playNote(note: IPlayNote): Promise<any> {
    playSoundTaskList.push({
      note,
      player: this,
      stopPlayTask: this.stopPlayTask.bind(this),
    });
  }

  protected override async startPlayTask(): Promise<void> {
    this.playTask = ticker.add(this.tickPlay.bind(this));
  }

  protected override async stopPlayTask(): Promise<void> {
    this.playTask?.();
    this.playTask = undefined;
  }
}

class TimerBasedPlayer extends LLBasePlayer {
  private playerObj?: LLSE_Player;

  override async playNote(note: IPlayNote): Promise<any> {
    try {
      this.playerObj?.sendPacket(
        buildSoundPacket(this.playerObj?.pos, this.instruments, note)
      );
    } catch (e) {
      logger.error(formatError(e));
    }
  }

  protected override async tickPlay(): Promise<void> {
    if (this.playing) {
      this.playerObj = mc.getPlayer(this.playerXuid);
      if (!this.playerObj) this.stopPlayTask();
    }
    await super.tickPlay();
  }
}

let _player;
if (TICKING_BASED) {
  ticker.add(async () => {
    if (!playSoundTaskList.length) return;
    const playerCache: Record<string, LLSE_Player> = {};
    const once = async (task: PlaySoundTaskType) => {
      const { note, player: nbsPlayer, stopPlayTask } = task;
      const { instruments, playerXuid } = nbsPlayer;
      const stop = async () => {
        await stopPlayTask();
        if (playerCache[playerXuid]) delete playerCache[playerXuid];
      };

      let player = playerCache[playerXuid];
      if (!player) player = mc.getPlayer(playerXuid);
      if (!player) return stop();

      try {
        player.sendPacket(buildSoundPacket(player.pos, instruments, note));
      } catch (e) {
        logger.error(formatError(e));
        return stop();
      }
      return undefined;
    };
    const tasks: Promise<any>[] = playSoundTaskList.map((task) => once(task));
    playSoundTaskList.length = 0;
    await Promise.all(tasks);
  });
  _player = TickingBasedPlayer;
} else {
  _player = TimerBasedPlayer;
}
export type Player = typeof TICKING_BASED extends true
  ? TickingBasedPlayer
  : TimerBasedPlayer;
export const Player = _player as typeof TICKING_BASED extends true
  ? typeof TickingBasedPlayer
  : typeof TimerBasedPlayer;

export class PlaylistFile implements IPlaylistFile {
  constructor(
    public readonly url: string,
    public readonly displayString: string = ''
  ) {
    if (!displayString) this.displayString = url.split('/').pop()!;
  }

  public async read(): Promise<ISong> {
    // eslint-disable-next-line new-cap
    const f = new file(this.url, file.ReadMode, true);
    let b;
    try {
      b = f.readAllSync() as ByteBuffer;
    } finally {
      f.close();
    }
    return parse(b);
  }
}

export class Playlist extends BasePlaylist<PlaylistFile, Player> {
  private readonly playerXuid: string;

  constructor(fileList: PlaylistFile[], options?: PlayerOptions) {
    super(fileList, options);
    const { playerXuid } = options || {};
    if (!playerXuid) throw new Error('playerXuid is required');
    this.playerXuid = playerXuid;
  }

  async createPlayer(song: ISong): Promise<Player> {
    return new Player(song, { playerXuid: this.playerXuid });
  }
}
