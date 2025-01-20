import {
  FormClose,
  SimpleFormEx,
  SimpleFormOperational,
  sendModalFormAsync,
} from 'form-api-ex'

import { PLUGIN_NAME } from '../const'
import { Playlist, PlaylistFile, ensurePlaylist } from '../player'
import { logErr } from '../utils'
import { ParentFormFunc, changeIndexForm } from './common'

export async function playingFileForm(
  playlist: Playlist,
  file: PlaylistFile,
  player: LLSE_Player,
  parent?: ParentFormFunc,
) {
  const index = playlist.currentFileList.indexOf(file)

  new SimpleFormOperational<Promise<any>>(PLUGIN_NAME, file.displayString, [
    {
      text: '切换到此首',
      operation: () => playlist.switchTo(index),
    },
    {
      text: '变更顺序',
      operation: async () => {
        const newIndex = await changeIndexForm(
          playlist.currentFileList.map((x) => x.displayString),
          index,
          player,
        )
        if (newIndex !== FormClose) playlist.changeIndex(index, newIndex)
      },
    },
    {
      text: '从列表中移除',
      operation: async () => {
        if (await sendModalFormAsync(player, PLUGIN_NAME, '真的要删除吗？')) {
          playlist.removeFile(index)
        }
      },
    },
  ])
    .sendAsync(player)
    .then(() => parent?.())
    .catch(logErr)
}

export async function playingForm(player: LLSE_Player, parent?: ParentFormFunc) {
  const playlist = ensurePlaylist(player)
  if (!playlist.length) {
    sendModalFormAsync(player, PLUGIN_NAME, '播放列表为空')
      .then(() => parent?.())
      .catch(logErr)
    return
  }

  const form = new SimpleFormEx(playlist.currentFileList as PlaylistFile[])
  form.title = PLUGIN_NAME
  const originalFormatter = form.formatter
  form.formatter = (v, index, array) =>
    originalFormatter(v.displayString as any, index, array)
  form.canTurnPage = true
  form.canJumpPage = true
  form.hasSearchButton = true
  const res = await form.sendAsync(
    player,
    Math.ceil((playlist.playingIndex + 1) / form.maxPageNum),
  )
  if (res === FormClose) {
    parent?.().catch(logErr)
    return
  }
  playingFileForm(playlist, res, player, () => playingForm(player, parent)).catch(
    logErr,
  )
}
