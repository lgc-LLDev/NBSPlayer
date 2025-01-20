import {
  FormClose,
  sendModalFormAsync,
  SimpleFormOperational,
  SimpleFormOperationalButton,
} from 'form-api-ex'
import { LoopType } from 'nbs-play'

import { PLUGIN_NAME } from '../const'
import { ensurePlaylist } from '../player'
import { logErr } from '../utils'
import { ParentFormFunc } from './common'

export const LoopTypeNameMap = {
  [LoopType.None]: '顺序播放',
  [LoopType.List]: '列表循环',
  [LoopType.Single]: '单曲循环',
  [LoopType.Shuffle]: '随机播放',
}

export async function controlForm(player: LLSE_Player, parent?: ParentFormFunc) {
  const playlist = ensurePlaylist(player)
  if (!playlist.length) {
    sendModalFormAsync(player, PLUGIN_NAME, '播放列表为空')
      .then(() => parent?.())
      .catch(logErr)
    return
  }

  const buttons: SimpleFormOperationalButton<Promise<any>>[] = [
    {
      text: !playlist.isPlaying || playlist.isPausing ? '▶️ 播放' : '⏸️ 暂停',
      operation: () => {
        if (playlist.isActive) {
          return playlist.isPausing ? playlist.resume() : playlist.pause()
        }
        return playlist.play()
      },
    },
    ...(playlist.isActive
      ? [
          {
            text: '⏹️ 停止',
            operation: () => playlist.stop(),
          },
        ]
      : []),
    {
      text: '⏮️ 上一首',
      operation: () =>
        playlist
          .previous()
          .catch(() => sendModalFormAsync(player, PLUGIN_NAME, '没有上一首了')),
    },
    {
      text: '⏭️ 下一首',
      operation: () =>
        playlist
          .next()
          .catch(() => sendModalFormAsync(player, PLUGIN_NAME, '已经是最后一首了')),
    },
    {
      text: LoopTypeNameMap[playlist.loopType],
      operation: () =>
        Promise.resolve().then(() =>
          playlist.switchLoopType((playlist.loopType + 1) % 4),
        ),
    },
  ]
  new SimpleFormOperational(PLUGIN_NAME, '', buttons)
    .sendAsync(player)
    .then((res) => (res === FormClose ? parent?.() : controlForm(player, parent)))
    .catch(logErr)
}
