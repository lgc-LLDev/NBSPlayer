import { sendModalFormAsync } from 'form-api-ex';

import { PLUGIN_NAME } from '../const';
import { ParentFormFunc } from './common';

export async function historyForm(
  player: LLSE_Player,
  parent?: ParentFormFunc
) {
  sendModalFormAsync(player, PLUGIN_NAME, '未实现').then(() => parent?.());
}
