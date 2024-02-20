import { FormClose, SimpleFormEx } from 'form-api-ex';

import { PLUGIN_NAME } from '../const';

export type ParentFormFunc = () => Promise<any>;

export async function changeIndexForm(
  list: string[],
  originalIndex: number,
  player: LLSE_Player
) {
  const changedList: (string | undefined)[] = list.slice();
  changedList.push(undefined);

  const form = new SimpleFormEx(changedList);
  form.title = PLUGIN_NAME;
  form.content = `${list[originalIndex]}\n你想把该项排在哪项前面呢？\n${form.content}`;
  const originalFormatter = form.formatter;
  form.formatter = (v, index, array) =>
    v === undefined ? ['放在最后'] : originalFormatter(v, index, array);
  form.canTurnPage = true;
  form.canJumpPage = true;
  // form.hasSearchButton = true;

  const res = await form.sendAsync(player);
  if (res === FormClose) return FormClose;
  const index = res === undefined ? list.length - 1 : list.indexOf(res);
  if (index === -1) throw Error('unexpected list change');
  return index;
}
