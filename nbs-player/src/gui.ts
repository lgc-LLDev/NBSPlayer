import {
  FormClose,
  SimpleFormEx,
  SimpleFormOperational,
  sendModalFormAsync,
} from 'form-api-ex';
import { NBS_PATH, PLUGIN_NAME } from './const';
import { play, playingPlayers } from './player';
import { logErr } from './utils';

type ParentFormFunc = (player: LLSE_Player) => any;

export async function nbsList(player: LLSE_Player, parent?: ParentFormFunc) {
  const files = file.getFilesList(NBS_PATH).filter((x) => x.endsWith('.nbs'));

  const form = new SimpleFormEx(files);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;

  const res = await form.sendAsync(player);
  if (res === FormClose) {
    parent?.(player).catch(logErr);
    return;
  }
  play(player, res).catch(logErr);
}

export async function playControl(
  player: LLSE_Player,
  parent?: ParentFormFunc
) {
  const nbsPlayer = playingPlayers[player.xuid];
  if (!nbsPlayer) {
    sendModalFormAsync(player, PLUGIN_NAME, '没有正在播放的音乐')
      .then(() => parent?.(player))
      .catch(logErr);
    return;
  }

  const { playing } = nbsPlayer;
  new SimpleFormOperational(PLUGIN_NAME, '', [
    {
      text: playing ? '⏸️ 暂停' : '▶️ 播放',
      operation: () => {
        (playing ? nbsPlayer.pause : nbsPlayer.resume)()
          .then(() => parent?.(player))
          .catch(logErr);
      },
    },
    {
      text: '⏹️ 停止',
      operation: () => {
        nbsPlayer
          .stop()
          .then(() => parent?.(player))
          .catch(logErr);
      },
    },
  ])
    .sendAsync(player)
    .catch(logErr);
}

export async function main(player: LLSE_Player) {
  new SimpleFormOperational(PLUGIN_NAME, '', [
    {
      text: '选择文件',
      operation: () => {
        nbsList(player, main).then(logErr);
      },
    },
    {
      text: '播放控制',
      operation: () => {
        playControl(player, main).then(logErr);
      },
    },
  ])
    .sendAsync(player)
    .catch(logErr);
}
