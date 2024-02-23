import { FormClose, SimpleFormEx, SimpleFormOperational } from 'form-api-ex';

import { PLUGIN_NAME } from '../const';
import { HistoryDataManager } from '../data';
import { playAfter } from '../player';
import { logErr } from '../utils';
import { ParentFormFunc, addToPlayListForm } from './common';

export async function historyFileForm(
  filename: string,
  player: LLSE_Player,
  parent?: ParentFormFunc
) {
  new SimpleFormOperational(PLUGIN_NAME, filename, [
    {
      text: '添加为下一首并立即切换',
      operation: () => playAfter(player, filename, true),
    },
    {
      text: '下一首播放',
      operation: () => playAfter(player, filename),
    },
    {
      text: '添加到歌单',
      operation: () => addToPlayListForm(player, filename),
    },
  ])
    .sendAsync(player)
    .then(() => parent?.())
    .catch(logErr);
}

export async function historyForm(
  player: LLSE_Player,
  parent?: ParentFormFunc
) {
  const confManager = HistoryDataManager.getFromXuid(player.xuid);
  const files = await confManager.read();

  const form = new SimpleFormEx(files);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;

  const res = await form.sendAsync(player);
  if (res === FormClose) {
    parent?.().catch(logErr);
    return;
  }
  historyFileForm(res, player, parent).catch(logErr);
}
