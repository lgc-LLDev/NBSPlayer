import { SimpleFormOperational } from 'form-api-ex'

import { PLUGIN_NAME } from '../const'
import { logErr } from '../utils'
import { controlForm } from './control'
import { fileListForm } from './file-list'
import { historyForm } from './history'
import { playingForm } from './playing'
import { newListForm, playListsForm } from './playlists'

export * from './common'
export * from './control'
export * from './file-list'
export * from './history'
export * from './playing'
export * from './playlists'

export async function mainForm(player: LLSE_Player) {
  new SimpleFormOperational(
    PLUGIN_NAME,
    '',
    (
      [
        ['文件列表', fileListForm],
        ['播放控制', controlForm],
        ['播放列表', playingForm],
        ['播放历史', historyForm],
        ['我的歌单', playListsForm],
        ['创建歌单', newListForm],
      ] as const
    ).map(([text, op]) => ({
      text,
      operation: () => op(player, () => mainForm(player)).catch(logErr),
    })),
  )
    .sendAsync(player)
    .catch(logErr)
}
