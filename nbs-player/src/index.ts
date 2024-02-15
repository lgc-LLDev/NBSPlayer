/// <reference path="../../../HelperLib/src/index.d.ts"/>

import './polyfill';

import {
  PLUGIN_DESCRIPTION,
  PLUGIN_EXTRA,
  PLUGIN_NAME,
  PLUGIN_VERSION,
  dataPath,
} from './const';
import { Player, PlaylistFile } from './player';

logger.setTitle(PLUGIN_NAME);

let activatingPlayer: Player | undefined;

async function testStartPlay(player: LLSE_Player) {
  const file = await new PlaylistFile(`${dataPath}/test.nbs`).read();
  const songPlayer = new Player(file, { playerXuid: player.xuid });
  activatingPlayer = songPlayer;
  await songPlayer.play();
}

mc.listen('onServerStarted', () => {
  const testPlayCmd = mc.newCommand('nbstestplay', 'test', PermType.Any);
  testPlayCmd.overload();
  testPlayCmd.setCallback((_, { player }) => {
    if (!player) return false;
    testStartPlay(player);
    return true;
  });
  testPlayCmd.setup();

  const testStopCmd = mc.newCommand('nbsteststop', 'test', PermType.Any);
  testStopCmd.overload();
  testStopCmd.setCallback(() => {
    if (activatingPlayer) activatingPlayer.stop();
    activatingPlayer = undefined;
    return true;
  });
  testStopCmd.setup();
});

ll.registerPlugin(
  PLUGIN_NAME,
  PLUGIN_DESCRIPTION,
  PLUGIN_VERSION,
  PLUGIN_EXTRA
);
