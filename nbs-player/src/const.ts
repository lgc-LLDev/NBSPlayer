import { description, version } from '../package.json';

export const PLUGIN_NAME = 'NBSPlayer';
export const PLUGIN_VERSION = <[number, number, number]>(
  version.split('.').map((v) => Number(v))
);
export const PLUGIN_DESCRIPTION = description;
export const PLUGIN_EXTRA = { Author: 'student_2333', License: 'Apache-2.0' };

export const BASE_PATH = `./plugins/${PLUGIN_NAME}`;
export const NBS_PATH = `${BASE_PATH}/nbs`;
[BASE_PATH, NBS_PATH].forEach((x) => {
  if (!file.exists(x)) file.mkdir(x);
});

logger.setTitle(PLUGIN_NAME);
