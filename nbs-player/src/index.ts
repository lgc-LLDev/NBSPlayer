/// <reference path="../../../HelperLib/src/index.d.ts"/>

// init polyfill
import './polyfill';

// init logger & data paths
import {
  PLUGIN_DESCRIPTION,
  PLUGIN_EXTRA,
  PLUGIN_NAME,
  PLUGIN_VERSION,
} from './const';

// register commands
import './command';

ll.registerPlugin(
  PLUGIN_NAME,
  PLUGIN_DESCRIPTION,
  PLUGIN_VERSION,
  PLUGIN_EXTRA
);
