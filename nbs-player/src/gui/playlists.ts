import {
  CustomFormEx,
  FormClose,
  SimpleFormEx,
  SimpleFormOperational,
  sendModalFormAsync,
} from 'form-api-ex'

import { NBS_PATH, PLUGIN_NAME } from '../const'
import { PlaylistDataManager, TipError } from '../data'
import { ensurePlaylist, playAfter, replacePlaylist } from '../player'
import { logErr } from '../utils'
import {
  ParentFormFunc,
  addToPlayListForm,
  changeIndexForm,
  playListSelectForm,
} from './common'

export async function playListSongForm(
  playListName: string,
  songFilename: string,
  player: LLSE_Player,
  parent?: ParentFormFunc,
) {
  const confManager = PlaylistDataManager.getFromXuid(player.xuid)

  new SimpleFormOperational(PLUGIN_NAME, songFilename, [
    {
      text: '覆盖当前列表并播放',
      operation: async () =>
        replacePlaylist(
          player,
          (await confManager.getByName(playListName))[0].files,
          songFilename,
        ),
    },
    {
      text: '添加为下一首并立即切换',
      operation: () => playAfter(player, songFilename, true),
    },
    {
      text: '下一首播放',
      operation: () => playAfter(player, songFilename),
    },
    {
      text: '添加到歌单',
      operation: () => addToPlayListForm(player, songFilename),
    },
    {
      text: '变更顺序',
      operation: async () => {
        const [data, playlistIndex] = await confManager.getByName(playListName)
        const { files } = data
        const fileIndex = files.findIndex((x) => x === songFilename)

        const newIdx = await changeIndexForm(files, fileIndex, player)
        if (newIdx === FormClose) return

        files.splice(fileIndex, 1)
        files.splice(newIdx, 0, songFilename)
        await confManager.change(playlistIndex, { files })
      },
    },
    {
      text: '从歌单中删除',
      operation: async () => {
        if (await sendModalFormAsync(player, PLUGIN_NAME, '真的要删除吗？')) {
          const [data, playlistIndex] = await confManager.getByName(playListName)
          const { files } = data
          const fileIndex = files.findIndex((x) => x === songFilename)
          files.splice(fileIndex, 1)
          await confManager.change(playlistIndex, { files })
        }
      },
    },
  ])
    .sendAsync(player)
    .then(() => parent?.())
    .catch((err) => {
      if (err instanceof TipError) {
        sendModalFormAsync(player, PLUGIN_NAME, err.message)
          .then(() => playListSongForm(playListName, songFilename, player, parent))
          .catch(logErr)
      } else logErr(err)
    })
}

export async function playListViewForm(
  name: string,
  player: LLSE_Player,
  parent?: ParentFormFunc,
) {
  const confManager = PlaylistDataManager.getFromXuid(player.xuid)
  const data = await confManager.read()
  const entry = data.find((x) => x.name === name)
  if (!entry) return

  const form = new SimpleFormEx(entry.files)
  form.title = PLUGIN_NAME
  form.canTurnPage = true
  form.canJumpPage = true
  form.hasSearchButton = true

  const res = await form.sendAsync(player)
  if (res === FormClose) {
    parent?.().catch(logErr)
    return
  }
  playListSongForm(name, res, player, () =>
    playListViewForm(name, player, parent),
  ).catch(logErr)
}

export async function playListChangeNameForm(
  name: string,
  player: LLSE_Player,
): Promise<string | FormClose> {
  const confManager = PlaylistDataManager.getFromXuid(player.xuid)
  const [, index] = await confManager.getByName(name)

  const res = await new CustomFormEx(PLUGIN_NAME)
    .addInput('newName', '请输入新名称')
    .sendAsync(player)
  if (res === FormClose) return FormClose

  const { newName } = res
  if (!newName) {
    await sendModalFormAsync(player, PLUGIN_NAME, '歌单名称不能为空')
    return playListChangeNameForm(name, player)
  }
  await confManager.change(index, { name: newName })
  return newName
}

export async function playListOperateForm(
  name: string,
  player: LLSE_Player,
  parent?: ParentFormFunc,
) {
  const confManager = PlaylistDataManager.getFromXuid(player.xuid)
  const parentThis = () => playListOperateForm(name, player, parent)

  new SimpleFormOperational(PLUGIN_NAME, name, [
    {
      text: '播放',
      operation: async () =>
        replacePlaylist(player, (await confManager.getByName(name))[0].files).then(() =>
          parent?.(),
        ),
    },
    {
      text: '查看',
      operation: () => playListViewForm(name, player, parentThis),
    },
    {
      text: '变更顺序',
      operation: async () => {
        const data = await confManager.read()
        const [, plIndex] = await confManager.getByName(name)
        const newIdx = await changeIndexForm(
          data.map((x) => x.name),
          plIndex,
          player,
        )
        if (newIdx !== FormClose) await confManager.changeIndex(plIndex, newIdx)
        parentThis().catch(logErr)
      },
    },
    {
      text: '重命名',
      operation: () =>
        playListChangeNameForm(name, player)
          .then((x) => {
            if (x !== FormClose) name = x
          })
          .then(parentThis)
          .catch(logErr),
    },
    {
      text: '清除所有无效歌曲',
      operation: async () => {
        const [data, index] = await confManager.getByName(name)
        const before = data.files.length
        const newFileList = data.files.filter((x) => file.exists(`${NBS_PATH}/${x}`))
        const after = newFileList.length
        await confManager.change(index, { files: newFileList })
        await sendModalFormAsync(
          player,
          PLUGIN_NAME,
          `清除了 ${before! - after!} 首无效歌曲`,
        )
        parentThis().catch(logErr)
      },
    },
    {
      text: '删除',
      operation: async () => {
        const [, index] = await confManager.getByName(name)
        if (await sendModalFormAsync(player, PLUGIN_NAME, '真的要删除吗？')) {
          confManager
            .remove(index)
            .then(() => parent?.())
            .catch(logErr)
        } else parentThis().catch(logErr)
      },
    },
  ])
    .sendAsync(player)
    .then((res) => (res === FormClose ? parent?.() : undefined))
    .catch((err) => {
      if (err instanceof TipError) {
        sendModalFormAsync(player, PLUGIN_NAME, err.message)
          .then(() => playListOperateForm(name, player, parent))
          .catch(logErr)
      } else logErr(err)
    })
}

export async function playListsForm(player: LLSE_Player, parent?: ParentFormFunc) {
  const res = await playListSelectForm(player)
  if (res === FormClose) {
    parent?.().catch(logErr)
    return
  }
  playListOperateForm(res, player, () => playListsForm(player, parent)).catch(logErr)
}

export async function newListForm(player: LLSE_Player, parent?: ParentFormFunc) {
  const playingPl = ensurePlaylist(player)

  const newPlaylistModeMap = [
    ['从当前播放列表创建', () => playingPl.fileList.map((x) => x.url)],
    ['创建空歌单', () => []],
  ] as readonly [string, () => string[]][]

  const res = await new CustomFormEx(PLUGIN_NAME)
    .addStepSlider(
      'mode',
      '请选择创建模式',
      newPlaylistModeMap.map((x) => x[0]),
    )
    .addInput('name', '请输入歌单名称')
    .sendAsync(player)
  if (res === FormClose) {
    parent?.().catch(logErr)
    return
  }

  if (!res.name) {
    sendModalFormAsync(player, PLUGIN_NAME, '歌单名称不能为空')
      .then(() => newListForm(player, parent))
      .catch(logErr)
    return
  }

  const manager = PlaylistDataManager.getFromXuid(player.xuid)
  try {
    await manager.add({
      name: res.name,
      files: newPlaylistModeMap[res.mode][1](),
    })
  } catch (e) {
    if (e instanceof TipError) {
      sendModalFormAsync(player, PLUGIN_NAME, e.message)
        .then(() => parent?.())
        .catch(logErr)
    } else throw e
  }
  sendModalFormAsync(player, PLUGIN_NAME, '创建成功')
    .then(() => parent?.())
    .catch(logErr)
}
