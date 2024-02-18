import { PLUGIN_NAME } from './const';
import { main as mainGui } from './gui';
import { logErr } from './utils';

function init() {
  const cmd = mc.newCommand('nbs', PLUGIN_NAME, PermType.Any);
  cmd.setAlias('nbsplayer');

  cmd.overload();

  cmd.setCallback((_, { player }) => {
    if (!player) return false;
    mainGui(player).catch(logErr);
    return true;
  });

  cmd.setup();
}

mc.listen('onServerStarted', init);
