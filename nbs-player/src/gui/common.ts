import { FormClose, SimpleFormEx, sendModalFormAsync } from 'form-api-ex'

import { PLUGIN_NAME } from '../const'
import { PlaylistDataManager } from '../data'

export type ParentFormFunc = () => Promise<any>

export async function changeIndexForm(
  list: string[],
  originalIndex: number,
  player: LLSE_Player,
) {
  const changedList: (string | undefined)[] = list.slice()
  changedList.push(undefined)

  const form = new SimpleFormEx(changedList)
  form.title = PLUGIN_NAME
  form.content = `${list[originalIndex]}\n你想把该项排在哪项前面呢？\n${form.content}`
  const originalFormatter = form.formatter
  form.formatter = (v, index, array) =>
    v === undefined ? ['放在最后'] : originalFormatter(v, index, array)
  form.canTurnPage = true
  form.canJumpPage = true
  // form.hasSearchButton = true;

  const res = await form.sendAsync(player)
  if (res === FormClose) return FormClose
  const index = res === undefined ? list.length - 1 : list.indexOf(res)
  if (index === -1) throw Error('unexpected list change')
  return index
}

export async function playListSelectForm(player: LLSE_Player, additionalContent = '') {
  const playlists = await PlaylistDataManager.getFromXuid(player.xuid).read()
  if (!playlists) {
    await sendModalFormAsync(player, PLUGIN_NAME, '你还没有创建过歌单')
    return FormClose
  }

  const form = new SimpleFormEx(playlists.map((x) => x.name))
  form.title = PLUGIN_NAME
  if (additionalContent) form.content = `${additionalContent}\n${form.content}`
  form.canTurnPage = true
  form.canJumpPage = true
  form.hasSearchButton = true

  const res = await form.sendAsync(player)
  return res === FormClose ? FormClose : res
}

export async function addToPlayListForm(player: LLSE_Player, filename: string) {
  const playlistName = await playListSelectForm(player, `选择要添加到的歌单`)
  if (playlistName === FormClose) return
  const confManager = PlaylistDataManager.getFromXuid(player.xuid)
  const [{ files }, index] = await confManager.getByName(playlistName)
  if (!files.includes(filename)) files.push(filename)
  await confManager.change(index, { files })
}
