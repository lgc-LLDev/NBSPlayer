import { NBS_PATH, PLUGIN_NAME } from './const'
import {
  controlForm,
  fileListForm,
  historyForm,
  mainForm,
  newListForm,
  playListsForm,
  playingForm,
} from './gui'
import { ensurePlaylist, playAfter } from './player'
import { logErr } from './utils'

function init() {
  const cmd = mc.newCommand('nbs', PLUGIN_NAME, PermType.Any)
  cmd.setAlias('nbsplayer')

  type ResFileList = { enumFileList: 'filelist' }
  cmd.setEnum('enumFileList', ['filelist'])
  cmd.mandatory('enumFileList', ParamType.Enum, 'enumFileList', 1)
  cmd.overload(['enumFileList'])

  type ResControl = { enumControl: 'control' }
  cmd.setEnum('enumControl', ['control'])
  cmd.mandatory('enumControl', ParamType.Enum, 'enumControl', 1)
  cmd.overload(['enumControl'])

  type ResPlaying = { enumPlaying: 'playing' }
  cmd.setEnum('enumPlaying', ['playing'])
  cmd.mandatory('enumPlaying', ParamType.Enum, 'enumPlaying', 1)
  cmd.overload(['enumPlaying'])

  type ResHistory = { enumHistory: 'history' }
  cmd.setEnum('enumHistory', ['history'])
  cmd.mandatory('enumHistory', ParamType.Enum, 'enumHistory', 1)
  cmd.overload(['enumHistory'])

  type ResPlaylists = { enumPlaylists: 'playlists' }
  cmd.setEnum('enumPlaylists', ['playlists'])
  cmd.mandatory('enumPlaylists', ParamType.Enum, 'enumPlaylists', 1)
  cmd.overload(['enumPlaylists'])

  type ResNewList = { enumNewList: 'newlist' }
  cmd.setEnum('enumNewList', ['newlist'])
  cmd.mandatory('enumNewList', ParamType.Enum, 'enumNewList', 1)
  cmd.overload(['enumNewList'])

  type ResIsPlaying = { enumIsPlaying: 'isplaying'; player?: LLSE_Player[] }
  cmd.setEnum('enumIsPlaying', ['isplaying'])
  cmd.mandatory('enumIsPlaying', ParamType.Enum, 'enumIsPlaying', 1)
  cmd.optional('player', ParamType.Player)
  cmd.overload(['enumIsPlaying', 'player'])

  type ResPlay = {
    enumPlay: 'play'
    filename: string
    player?: LLSE_Player[]
    forcePlay?: boolean
  }
  cmd.setEnum('enumPlay', ['play'])
  cmd.mandatory('enumPlay', ParamType.Enum, 'enumPlay', 1)
  cmd.mandatory('filename', ParamType.String)
  // cmd.optional('player', ParamType.Player); // defined at line 51
  cmd.optional('forcePlay', ParamType.Bool)
  cmd.overload(['enumPlay', 'filename', 'player', 'forcePlay'])

  type ResMain = {}
  cmd.overload()

  type Res =
    | ResFileList
    | ResControl
    | ResPlaying
    | ResHistory
    | ResPlaylists
    | ResNewList
    | ResIsPlaying
    | ResPlay
    | ResMain

  cmd.setCallback((_, { player }, output, res: Res) => {
    // try {
    //   logger.info(JSON.stringify(res));
    // } catch (e) {
    //   logErr(e);
    // }

    if ('enumFileList' in res && res.enumFileList) {
      if (!player) return false
      fileListForm(player).catch(logErr)
      return true
    }

    if ('enumControl' in res && res.enumControl) {
      if (!player) return false
      controlForm(player).catch(logErr)
      return true
    }

    if ('enumPlaying' in res && res.enumPlaying) {
      if (!player) return false
      playingForm(player).catch(logErr)
      return true
    }

    if ('enumHistory' in res && res.enumHistory) {
      if (!player) return false
      historyForm(player).catch(logErr)
      return true
    }

    if ('enumPlaylists' in res && res.enumPlaylists) {
      if (!player) return false
      playListsForm(player).catch(logErr)
      return true
    }

    if ('enumNewList' in res && res.enumNewList) {
      if (!player) return false
      newListForm(player).catch(logErr)
      return true
    }

    if ('enumIsPlaying' in res && res.enumIsPlaying) {
      const [targetPlayer] = res.player || [player]
      if (!targetPlayer) return false
      const { isPlaying } = ensurePlaylist(targetPlayer)
      output.addMessage(`${isPlaying}`)
      return isPlaying
    }

    if ('enumPlay' in res && res.enumPlay) {
      if (!file.exists(`${NBS_PATH}/${res.filename}`)) {
        output.addMessage(`§c文件 ${res.filename} 不存在`)
        return false
      }

      let playerList: LLSE_Player[] = []
      if (res.player?.length) playerList = res.player
      else if (player) playerList = [player]
      else return false

      const playRes = playerList.map((targetPlayer) => {
        const playlist = ensurePlaylist(targetPlayer)
        const forcePlay = res.forcePlay ?? false
        if (!forcePlay && playlist.isActive) return false
        playAfter(targetPlayer, res.filename, forcePlay).catch(logErr)
        return true
      })

      const outTmp = []
      for (let i = 0; i < playRes.length; i += 1) {
        const pl = playerList[i]
        const ok = playRes[i]
        outTmp.push(
          ok ? `§a成功为 ${pl.realName} 播放` : `§c为 ${pl.realName} 播放失败`,
        )
      }

      output.addMessage(outTmp.join('\n'))
      return true
    }

    if (!player) return false
    mainForm(player).catch(logErr)
    return true
  })

  cmd.setup()
}

mc.listen('onServerStarted', init)
