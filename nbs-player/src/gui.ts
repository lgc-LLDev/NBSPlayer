import {
  FormClose,
  SimpleFormEx,
  SimpleFormOperational,
  sendModalFormAsync,
} from 'form-api-ex';
import { NBS_PATH, PLUGIN_NAME } from './const';
import { play, playingPlayers } from './player';
import { catchAndLog } from './utils';

export const InnerFormClose = Symbol(`${PLUGIN_NAME}_InnerFormClose`);
export type InnerFormClose = typeof InnerFormClose;
export type OperationPromise = Promise<InnerFormClose | void>;

export async function nbsList(player: LLSE_Player): OperationPromise {
  const files = file.getFilesList(NBS_PATH).filter((x) => x.endsWith('.nbs'));
  const form = new SimpleFormEx(files);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  const res = await form.sendAsync(player);
  if (res === FormClose) return InnerFormClose;
  catchAndLog(play(player, res));
  return undefined;
}

export async function playControl(player: LLSE_Player): OperationPromise {
  const nbsPlayer = playingPlayers[player.xuid];
  if (!nbsPlayer) {
    await sendModalFormAsync(player, PLUGIN_NAME, '没有正在播放的音乐');
    return InnerFormClose;
  }

  const { playing } = nbsPlayer;
  const form = new SimpleFormOperational(PLUGIN_NAME, '', [
    {
      text: playing ? '⏸️ 暂停' : '▶️ 播放',
      operation: () =>
        catchAndLog(
          playing // should re-get the player here because it may change
            ? playingPlayers[player.xuid].pause()
            : playingPlayers[player.xuid].resume()
        ),
    },
    {
      text: '⏹️ 停止',
      operation: () => catchAndLog(playingPlayers[player.xuid].stop()),
    },
  ]);
  if ((await form.sendAsync(player)) === FormClose) return InnerFormClose;
  return undefined;
}

export async function main(player: LLSE_Player) {
  const form = new SimpleFormOperational<OperationPromise>(PLUGIN_NAME, '', [
    { text: '选择文件', operation: () => catchAndLog(nbsList(player)) },
    { text: '播放控制', operation: () => catchAndLog(playControl(player)) },
  ]);
  if ((await form.sendAsync(player)) === InnerFormClose)
    catchAndLog(main(player));
}
