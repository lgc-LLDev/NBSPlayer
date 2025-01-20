import { FormClose, SimpleFormEx, SimpleFormOperational } from 'form-api-ex'

import { NBS_PATH, PLUGIN_NAME } from '../const'
import { playAfter, replacePlaylist } from '../player'
import { logErr } from '../utils'
import { ParentFormFunc, addToPlayListForm } from './common'

export async function fileListFileForm(
  fileList: string[],
  filename: string,
  player: LLSE_Player,
  parent?: ParentFormFunc,
) {
  const parentThis = () => fileListFileForm(fileList, filename, player, parent)

  new SimpleFormOperational<Promise<any>>(PLUGIN_NAME, filename, [
    {
      text: '覆盖当前列表并播放',
      operation: () =>
        replacePlaylist(player, fileList, filename).then(() => parent?.()),
    },
    {
      text: '添加为下一首并立即切换',
      operation: () => playAfter(player, filename, true).then(() => parent?.()),
    },
    {
      text: '下一首播放',
      operation: () => playAfter(player, filename).then(() => parent?.()),
    },
    {
      text: '添加到歌单',
      operation: () => addToPlayListForm(player, filename).then(parentThis),
    },
  ])
    .sendAsync(player)
    .then((res) => res === FormClose && parent?.())
    .catch(logErr)
}

export async function fileListForm(player: LLSE_Player, parent?: ParentFormFunc) {
  const files = file.getFilesList(NBS_PATH).filter((x) => x.endsWith('.nbs'))

  const form = new SimpleFormEx(files)
  form.title = PLUGIN_NAME
  form.canTurnPage = true
  form.canJumpPage = true
  form.hasSearchButton = true

  const res = await form.sendAsync(player)
  if (res === FormClose) {
    parent?.().catch(logErr)
    return
  }
  fileListFileForm(files, res, player, () => fileListForm(player, parent)).catch(logErr)
}
