import { formatError } from 'form-api-ex';
import {
  BUILTIN_INSTRUMENTS,
  BasePlayer,
  BasePlaylist,
  BasePlaylistFile,
  IInstrument,
  IPlayNote,
  ISong,
  parse,
} from 'nbs-play';

import { ticker } from './utils';
import { NBS_PATH } from './const';

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
export const BOSS_BAR_ID = 627752937; // NbsPlayer九键(xd
const TICKING_BASED = true;

export type PlayerOptions = {
  playerXuid: string;
};

type PlaySoundTaskType = {
  note: IPlayNote;
  mcPlayer: LLSE_Player;
  nbsPlayer: TickingBasedPlayer;
  stopPlayTask: () => Promise<any>;
};
const playSoundTaskList: PlaySoundTaskType[] = [];

export const playerPlaylists: Record<string, Playlist> = {};

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

  protected mcPlayer?: LLSE_Player;

  protected lastBossBarPercent = -1;

  constructor(song: ISong, options?: PlayerOptions) {
    super(song, options);
    const { playerXuid } = options || {};
    if (!playerXuid) throw new Error('playerXuid is required');
    this.playerXuid = playerXuid;
  }

  protected override async tickPlay(): Promise<void> {
    if (!this.refreshPlayerObjCache()) {
      await this.stopPlayTask();
      return;
    }
    await super.tickPlay();
    if (this.playing) this.updateBossBar();
  }

  public override async stopPlay(resetProgress?: boolean): Promise<void> {
    await super.stopPlay(resetProgress);
    this.updateBossBar();
  }

  protected refreshPlayerObjCache(): LLSE_Player | undefined {
    this.mcPlayer = mc.getPlayer(this.playerXuid) ?? undefined;
    return this.mcPlayer;
  }

  protected updateBossBar() {
    if (!this.playing) {
      this.lastBossBarPercent = -1;
      if (this.ended || this.playedTicks <= 0) {
        this.mcPlayer?.removeBossBar(BOSS_BAR_ID);
        return;
      }
    }

    const { songName, songAuthor, originalAuthor, songLength } =
      this.song.header;

    const percent = Math.round((this.playedTicks / songLength) * 100);
    if (this.playing) {
      if (percent === this.lastBossBarPercent) return;
      this.lastBossBarPercent = percent;
    }

    const playMark = this.playing ? '§a⏵' : '§6⏸';
    let songDisplayName = `§b${songName}`;
    const displayAuthor = originalAuthor || songAuthor;
    if (displayAuthor) songDisplayName += `§f - §a${displayAuthor}`;
    const title = `${playMark} §dNBSPlayer §7| ${songDisplayName}`;
    const bossBarColor = this.playing ? 3 : 4; // green : yellow

    this.mcPlayer?.setBossBar(BOSS_BAR_ID, title, percent, bossBarColor);
  }
}

class TickingBasedPlayer extends LLBasePlayer {
  override _playTask?: () => any;

  override async playNote(note: IPlayNote): Promise<any> {
    playSoundTaskList.push({
      note,
      mcPlayer: this.mcPlayer!,
      nbsPlayer: this,
      stopPlayTask: this.stopPlayTask.bind(this),
    });
  }

  protected override async startPlayTask(): Promise<void> {
    this._playTask = ticker.add(this.tickPlay.bind(this));
  }

  protected override async stopPlayTask(): Promise<void> {
    this._playTask?.();
    this._playTask = undefined;
  }
}

class TimerBasedPlayer extends LLBasePlayer {
  override async playNote(note: IPlayNote): Promise<any> {
    try {
      this.mcPlayer?.sendPacket(
        buildSoundPacket(this.mcPlayer?.pos, this.instruments, note)
      );
    } catch (e) {
      logger.error(formatError(e));
    }
  }
}

let _player;
if (TICKING_BASED) {
  ticker.add(async () => {
    if (!playSoundTaskList.length) return;
    const playerCache: Record<string, LLSE_Player> = {};
    const once = async (task: PlaySoundTaskType) => {
      const { note, nbsPlayer, stopPlayTask } = task;
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

export class PlaylistFile extends BasePlaylistFile {
  public async read(): Promise<ISong> {
    // eslint-disable-next-line new-cap
    const f = new file(`${NBS_PATH}/${this.url}`, file.ReadMode, true);
    let b;
    try {
      b = f.readAllSync() as ByteBuffer;
    } finally {
      f.close();
    }
    const r = await parse(b);
    if (!r.header.songName) r.header.songName = this.displayString;
    return r;
  }
}

export class Playlist extends BasePlaylist<PlaylistFile, Player> {
  private readonly playerXuid: string;

  constructor(fileList: PlaylistFile[], options?: PlayerOptions) {
    super(fileList, options);
    const { playerXuid } = options || {};
    if (!playerXuid) throw new Error('playerXuid is required');
    this.playerXuid = playerXuid;

    this.addEventListener('error', ({ params: { error } }) => {
      logger.error(formatError(error));
      mc.getPlayer(this.playerXuid).tell(
        `§c出现了一个错误\n${formatError(error)}`
      );
    });
  }

  async createPlayer(song: ISong): Promise<Player> {
    return new Player(song, { playerXuid: this.playerXuid });
  }
}

export function ensurePlaylist(player: LLSE_Player) {
  let playlist = playerPlaylists[player.xuid];
  if (!playlist) {
    playlist = new Playlist([], { playerXuid: player.xuid });
    playerPlaylists[player.xuid] = playlist;
  }
  return playlist;
}

export async function replacePlaylist(
  player: LLSE_Player,
  filenames: string[],
  targetFilename?: string
) {
  if (targetFilename && !filenames.includes(targetFilename))
    throw Error(`${targetFilename} should present in filenames`);

  const playlist = ensurePlaylist(player);
  const files = filenames.map((x) => new PlaylistFile(x));
  await playlist.reset(files);

  if (targetFilename)
    await playlist.switchTo(
      playlist.currentFileList.findIndex((x) => x.url === targetFilename)
    );
  else await playlist.play();
}

export async function playAfter(
  player: LLSE_Player,
  filename: string,
  playNow = false
) {
  const playlist = ensurePlaylist(player);
  const oldPlayingFilename =
    playlist.currentFileList[playlist.playingIndex]?.displayString;
  if (playNow && oldPlayingFilename !== filename) {
    await playlist.addFile(
      new PlaylistFile(filename),
      playlist.playingIndex + 1
    );
    await playlist.next();
  }
}
