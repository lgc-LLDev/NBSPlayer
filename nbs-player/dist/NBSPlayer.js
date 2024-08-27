"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// src/third-party/EncoderDecoderTogether.min.js
var require_EncoderDecoderTogether_min = __commonJS({
  "src/third-party/EncoderDecoderTogether.min.js"(exports2) {
    "use strict";
    (function(r) {
      function x() {
      }
      __name(x, "x");
      function y() {
      }
      __name(y, "y");
      var z = String.fromCharCode, v = {}.toString, A = v.call(r.SharedArrayBuffer), B = v(), q = r.Uint8Array, t = q || Array, w = q ? ArrayBuffer : t, C = w.isView || function(g) {
        return g && "length" in g;
      }, D = v.call(w.prototype);
      w = y.prototype;
      var E = r.TextEncoder, a = new (q ? Uint16Array : t)(32);
      x.prototype.decode = function(g) {
        if (!C(g)) {
          var l = v.call(g);
          if (l !== D && l !== A && l !== B) throw TypeError("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
          g = q ? new t(g) : g || [];
        }
        for (var f = l = "", b = 0, c = g.length | 0, u = c - 32 | 0, e, d, h = 0, p = 0, m, k = 0, n = -1; b < c; ) {
          for (e = b <= u ? 32 : c - b | 0; k < e; b = b + 1 | 0, k = k + 1 | 0) {
            d = g[b] & 255;
            switch (d >> 4) {
              case 15:
                m = g[b = b + 1 | 0] & 255;
                if (2 !== m >> 6 || 247 < d) {
                  b = b - 1 | 0;
                  break;
                }
                h = (d & 7) << 6 | m & 63;
                p = 5;
                d = 256;
              case 14:
                m = g[b = b + 1 | 0] & 255, h <<= 6, h |= (d & 15) << 6 | m & 63, p = 2 === m >> 6 ? p + 4 | 0 : 24, d = d + 256 & 768;
              case 13:
              case 12:
                m = g[b = b + 1 | 0] & 255, h <<= 6, h |= (d & 31) << 6 | m & 63, p = p + 7 | 0, b < c && 2 === m >> 6 && h >> p && 1114112 > h ? (d = h, h = h - 65536 | 0, 0 <= h && (n = (h >> 10) + 55296 | 0, d = (h & 1023) + 56320 | 0, 31 > k ? (a[k] = n, k = k + 1 | 0, n = -1) : (m = n, n = d, d = m))) : (d >>= 8, b = b - d - 1 | 0, d = 65533), h = p = 0, e = b <= u ? 32 : c - b | 0;
              default:
                a[k] = d;
                continue;
              case 11:
              case 10:
              case 9:
              case 8:
            }
            a[k] = 65533;
          }
          f += z(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25], a[26], a[27], a[28], a[29], a[30], a[31]);
          32 > k && (f = f.slice(0, k - 32 | 0));
          if (b < c) {
            if (a[0] = n, k = ~n >>> 31, n = -1, f.length < l.length) continue;
          } else -1 !== n && (f += z(n));
          l += f;
          f = "";
        }
        return l;
      };
      w.encode = function(g) {
        g = void 0 === g ? "" : "" + g;
        var l = g.length | 0, f = new t((l << 1) + 8 | 0), b, c = 0, u = !q;
        for (b = 0; b < l; b = b + 1 | 0, c = c + 1 | 0) {
          var e = g.charCodeAt(b) | 0;
          if (127 >= e) f[c] = e;
          else {
            if (2047 >= e) f[c] = 192 | e >> 6;
            else {
              a: {
                if (55296 <= e) if (56319 >= e) {
                  var d = g.charCodeAt(b = b + 1 | 0) | 0;
                  if (56320 <= d && 57343 >= d) {
                    e = (e << 10) + d - 56613888 | 0;
                    if (65535 < e) {
                      f[c] = 240 | e >> 18;
                      f[c = c + 1 | 0] = 128 | e >> 12 & 63;
                      f[c = c + 1 | 0] = 128 | e >> 6 & 63;
                      f[c = c + 1 | 0] = 128 | e & 63;
                      continue;
                    }
                    break a;
                  }
                  e = 65533;
                } else 57343 >= e && (e = 65533);
                !u && b << 1 < c && b << 1 < (c - 7 | 0) && (u = true, d = new t(3 * l), d.set(f), f = d);
              }
              f[c] = 224 | e >> 12;
              f[c = c + 1 | 0] = 128 | e >> 6 & 63;
            }
            f[c = c + 1 | 0] = 128 | e & 63;
          }
        }
        return q ? f.subarray(0, c) : f.slice(0, c);
      };
      E || (r.TextDecoder = x, r.TextEncoder = y);
    })("undefined" == typeof global ? "undefined" == typeof self ? exports2 : self : global);
  }
});

// src/polyfill.ts
var import_event_target_polyfill = require("event-target-polyfill");
var import_EncoderDecoderTogether_min = __toESM(require_EncoderDecoderTogether_min());

// package.json
var version = "2.0.0";
var description = "Play NBS files in MCBE with LL";

// src/const.ts
var PLUGIN_NAME = "NBSPlayer";
var PLUGIN_VERSION = version.split(".").map((v) => Number(v));
var PLUGIN_DESCRIPTION = description;
var PLUGIN_EXTRA = { Author: "student_2333", License: "Apache-2.0" };
var BASE_PATH = `./plugins/${PLUGIN_NAME}`;
var NBS_PATH = `${BASE_PATH}/nbs`;
var DATA_PATH = `${BASE_PATH}/data`;
var DATA_PLAYLIST_PATH = `${DATA_PATH}/playlist`;
var DATA_HISTORY_PATH = `${DATA_PATH}/history`;
[BASE_PATH, NBS_PATH, DATA_PATH, DATA_PLAYLIST_PATH, DATA_HISTORY_PATH].forEach(
  (x) => {
    if (!file.exists(x)) file.mkdir(x);
  }
);
logger.setTitle(PLUGIN_NAME);

// src/gui/index.ts
var import_form_api_ex9 = require("form-api-ex");

// src/utils.ts
var import_form_api_ex = require("form-api-ex");
function logErr(err) {
  logger.error((0, import_form_api_ex.formatError)(err));
}
__name(logErr, "logErr");
var _callbacks, _calling, _a;
var ticker = new (_a = class {
  constructor() {
    __privateAdd(this, _callbacks, []);
    __privateAdd(this, _calling, false);
    mc.listen("onTick", () => {
      this.trigger().catch(logErr);
    });
  }
  add(callback) {
    __privateGet(this, _callbacks).push(callback);
    return this.remove.bind(this, callback);
  }
  remove(callback) {
    const index = __privateGet(this, _callbacks).indexOf(callback);
    if (index !== -1) __privateGet(this, _callbacks).splice(index, 1);
  }
  async trigger() {
    if (__privateGet(this, _calling)) return;
    __privateSet(this, _calling, true);
    await Promise.all(__privateGet(this, _callbacks).map((x) => x()));
    __privateSet(this, _calling, false);
  }
}, _callbacks = new WeakMap(), _calling = new WeakMap(), _a)();

// src/gui/control.ts
var import_form_api_ex3 = require("form-api-ex");
var import_nbs_play2 = require("nbs-play");

// src/player.ts
var import_form_api_ex2 = require("form-api-ex");
var import_nbs_play = require("nbs-play");

// src/data.ts
var _TipError = class _TipError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "TipError";
  }
};
__name(_TipError, "TipError");
var TipError = _TipError;
var dataManagerCache = /* @__PURE__ */ new Map();
var _DataManager = class _DataManager {
  constructor(filePath, defaultContent) {
    this.filePath = filePath;
    this.defaultContent = defaultContent;
  }
  static get(filePath, defaultContent) {
    if (!dataManagerCache.has(filePath)) {
      const m = new this(filePath, defaultContent);
      dataManagerCache.set(filePath, m);
      return m;
    }
    return dataManagerCache.get(filePath);
  }
  async read(forceFlush = false) {
    if (this._dataCache && !forceFlush) return this._dataCache;
    const res = file.readFrom(this.filePath);
    if (res) {
      this._dataCache = JSON.parse(res);
      return JSON.parse(res);
    }
    if (!this.defaultContent) {
      throw new Error(`Read ${this.filePath} failed and no default provided`);
    }
    await this.write(this.defaultContent);
    this._dataCache = this.defaultContent;
    return this.defaultContent;
  }
  async write(content) {
    const res = file.writeTo(this.filePath, JSON.stringify(content));
    if (!res) throw new Error(`Failed to write to ${this.filePath}`);
    this._dataCache = content;
  }
  operate(callback) {
    return this.read().then(callback).then((content) => this.write(content));
  }
};
__name(_DataManager, "DataManager");
var DataManager = _DataManager;
var _ListDataManager = class _ListDataManager extends DataManager {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  async beforeAdd(x, data, index) {
  }
  async add(x, index = -1) {
    await this.operate(async (data) => {
      const ls = Array.isArray(x) ? x : [x];
      await this.beforeAdd?.(ls, data, index);
      if (index === -1) data.push(...ls);
      else data.splice(index, 0, ...ls);
      return data;
    });
  }
  async remove(index) {
    await this.operate(async (data) => {
      data.splice(index, 1);
      return data;
    });
  }
  async replace(index, newData) {
    await this.operate(async (data) => {
      data[index] = newData;
      return data;
    });
  }
  async changeIndex(from, to) {
    await this.operate(async (data) => {
      const [entry] = data.splice(from, 1);
      data.splice(to, 0, entry);
      return data;
    });
  }
};
__name(_ListDataManager, "ListDataManager");
var ListDataManager = _ListDataManager;
var _PlaylistDataManager = class _PlaylistDataManager extends ListDataManager {
  static getFromXuid(xuid) {
    return super.get(`${DATA_PLAYLIST_PATH}/${xuid}.json`, []);
  }
  // eslint-disable-next-line class-methods-use-this
  async beforeAdd(x, data) {
    const duplicated = x.find((xx) => data.some((dx) => dx.name === xx.name));
    if (duplicated) throw new TipError(`歌单名称 ${duplicated} 已存在`);
  }
  async change(index, newData) {
    await this.operate(async (data) => {
      const entry = data[index];
      const existedNames = data.map((x) => x.name).filter((x) => x !== entry.name);
      if (newData.name && existedNames.includes(newData.name)) {
        throw new TipError(`歌单名称 ${newData.name} 已存在`);
      }
      Object.assign(entry, newData);
      return data;
    });
  }
  async getByName(name) {
    const data = await this.read();
    const index = data.findIndex((x) => x.name === name);
    if (index === -1) throw new TipError(`歌单 ${name} 不存在`);
    return [data[index], index];
  }
};
__name(_PlaylistDataManager, "PlaylistDataManager");
var PlaylistDataManager = _PlaylistDataManager;
var _HistoryDataManager = class _HistoryDataManager extends ListDataManager {
  static getFromXuid(xuid) {
    return super.get(`${DATA_HISTORY_PATH}/${xuid}.json`, []);
  }
  async insertFirst(x) {
    await this.operate(async (data) => {
      const index = data.indexOf(x);
      if (index !== -1) data.splice(index, 1);
      data.unshift(x);
      return data;
    });
  }
};
__name(_HistoryDataManager, "HistoryDataManager");
var HistoryDataManager = _HistoryDataManager;

// src/player.ts
var SOUND_ID_MAPPING = [
  "note.harp",
  "note.bassattack",
  "note.bd",
  "note.snare",
  "note.hat",
  "note.guitar",
  "note.flute",
  "note.bell",
  "note.chime",
  "note.xylobone",
  "note.iron_xylophone",
  "note.cow_bell",
  "note.didgeridoo",
  "note.bit",
  "note.banjo",
  "note.pling"
];
var BOSS_BAR_ID = 627752937;
var TICKING_BASED = true;
var playSoundTaskList = [];
var playerPlaylists = {};
function buildSoundPacket(position, instrumentList, note) {
  const bs = new BinaryStream();
  const {
    instrument,
    velocity,
    /* panning, */
    pitch
  } = note;
  const { file: fileName } = instrumentList[instrument];
  const sound = fileName.substring(0, fileName.lastIndexOf("."));
  bs.reset();
  bs.writeString(sound);
  bs.writeVarInt(Math.round(position.x * 8));
  bs.writeUnsignedVarInt(Math.round((position.y + 0.37) * 8));
  bs.writeVarInt(Math.round(position.z * 8));
  bs.writeFloat(velocity);
  bs.writeFloat(pitch);
  return bs.createPacket(86);
}
__name(buildSoundPacket, "buildSoundPacket");
var _LLBasePlayer = class _LLBasePlayer extends import_nbs_play.BasePlayer {
  constructor(song, options) {
    super(song, options);
    this.lastBossBarPercent = -1;
    const { playerXuid } = options || {};
    if (!playerXuid) throw new Error("playerXuid is required");
    this.playerXuid = playerXuid;
  }
  // eslint-disable-next-line class-methods-use-this
  get builtinInstruments() {
    return import_nbs_play.BUILTIN_INSTRUMENTS.map((x) => ({
      ...x,
      file: `${SOUND_ID_MAPPING[x.id]}.ogg`
    }));
  }
  async tickPlay() {
    if (!this.refreshPlayerObjCache()) {
      await this.stopPlayTask();
      return;
    }
    await super.tickPlay();
    if (this.playing) this.updateBossBar();
  }
  async stopPlay(resetProgress) {
    await super.stopPlay(resetProgress);
    this.updateBossBar();
  }
  refreshPlayerObjCache() {
    this.mcPlayer = mc.getPlayer(this.playerXuid) ?? void 0;
    return this.mcPlayer;
  }
  updateBossBar() {
    if (!this.playing) {
      this.lastBossBarPercent = -1;
      if (this.ended || this.playedTicks <= 0) {
        this.mcPlayer?.removeBossBar(BOSS_BAR_ID);
        return;
      }
    }
    const { songName, songAuthor, originalAuthor, songLength } = this.song.header;
    const percent = Math.round(this.playedTicks / songLength * 100);
    if (this.playing) {
      if (percent === this.lastBossBarPercent) return;
      this.lastBossBarPercent = percent;
    }
    const playMark = this.playing ? "§a⏵" : "§6⏸";
    let songDisplayName = `§b${songName}`;
    const displayAuthor = originalAuthor || songAuthor;
    if (displayAuthor) songDisplayName += `§f - §a${displayAuthor}`;
    const title = `${playMark} §dNBSPlayer §7| ${songDisplayName}`;
    const bossBarColor = this.playing ? 3 : 4;
    this.mcPlayer?.setBossBar(BOSS_BAR_ID, title, percent, bossBarColor);
  }
};
__name(_LLBasePlayer, "LLBasePlayer");
var LLBasePlayer = _LLBasePlayer;
var _TickingBasedPlayer = class _TickingBasedPlayer extends LLBasePlayer {
  async playNote(note) {
    playSoundTaskList.push({
      note,
      mcPlayer: this.mcPlayer,
      nbsPlayer: this,
      stopPlayTask: this.stopPlayTask.bind(this)
    });
  }
  async startPlayTask() {
    this._playTask = ticker.add(this.tickPlay.bind(this));
  }
  async stopPlayTask() {
    this._playTask?.();
    this._playTask = void 0;
  }
};
__name(_TickingBasedPlayer, "TickingBasedPlayer");
var TickingBasedPlayer = _TickingBasedPlayer;
var _TimerBasedPlayer = class _TimerBasedPlayer extends LLBasePlayer {
  async playNote(note) {
    try {
      this.mcPlayer?.sendPacket(
        buildSoundPacket(this.mcPlayer?.pos, this.instruments, note)
      );
    } catch (e) {
      logger.error((0, import_form_api_ex2.formatError)(e));
    }
  }
};
__name(_TimerBasedPlayer, "TimerBasedPlayer");
var TimerBasedPlayer = _TimerBasedPlayer;
var _player;
if (TICKING_BASED) {
  ticker.add(async () => {
    if (!playSoundTaskList.length) return;
    const playerCache = {};
    const once = /* @__PURE__ */ __name(async (task) => {
      const { note, nbsPlayer, stopPlayTask } = task;
      const { instruments, playerXuid } = nbsPlayer;
      const stop = /* @__PURE__ */ __name(async () => {
        await stopPlayTask();
        if (playerCache[playerXuid]) delete playerCache[playerXuid];
      }, "stop");
      let player = playerCache[playerXuid];
      if (!player) player = mc.getPlayer(playerXuid);
      if (!player) return stop();
      try {
        player.sendPacket(buildSoundPacket(player.pos, instruments, note));
      } catch (e) {
        logger.error((0, import_form_api_ex2.formatError)(e));
        return stop();
      }
      return void 0;
    }, "once");
    const tasks = playSoundTaskList.map((task) => once(task));
    playSoundTaskList.length = 0;
    await Promise.all(tasks);
  });
  _player = TickingBasedPlayer;
} else {
  _player = TimerBasedPlayer;
}
var Player = _player;
var _PlaylistFile = class _PlaylistFile extends import_nbs_play.BasePlaylistFile {
  async read() {
    const f = new file(`${NBS_PATH}/${this.url}`, file.ReadMode, true);
    let b;
    try {
      b = f.readAllSync();
    } finally {
      f.close();
    }
    const r = await (0, import_nbs_play.parse)(b);
    if (!r.header.songName) r.header.songName = this.displayString;
    return r;
  }
};
__name(_PlaylistFile, "PlaylistFile");
var PlaylistFile = _PlaylistFile;
var _Playlist = class _Playlist extends import_nbs_play.BasePlaylist {
  constructor(fileList, options) {
    super(fileList, options);
    const { playerXuid } = options || {};
    if (!playerXuid) throw new Error("playerXuid is required");
    this.playerXuid = playerXuid;
    this.addEventListener("error", ({ params: { error } }) => {
      logger.error((0, import_form_api_ex2.formatError)(error));
      mc.getPlayer(this.playerXuid).tell(`§c出现了一个错误
${(0, import_form_api_ex2.formatError)(error)}`);
    });
    this.addEventListener("switch", ({ params: { file: file2 } }) => {
      if (!file2) return;
      const history = HistoryDataManager.getFromXuid(this.playerXuid);
      history.insertFirst(file2.url);
    });
  }
  async createPlayer(song) {
    return new Player(song, { playerXuid: this.playerXuid });
  }
};
__name(_Playlist, "Playlist");
var Playlist = _Playlist;
function ensurePlaylist(player) {
  let playlist = playerPlaylists[player.xuid];
  if (!playlist) {
    playlist = new Playlist([], { playerXuid: player.xuid });
    playerPlaylists[player.xuid] = playlist;
  }
  return playlist;
}
__name(ensurePlaylist, "ensurePlaylist");
async function replacePlaylist(player, filenames, targetFilename) {
  if (targetFilename && !filenames.includes(targetFilename)) {
    throw Error(`${targetFilename} should present in filenames`);
  }
  const playlist = ensurePlaylist(player);
  const files = filenames.map((x) => new PlaylistFile(x));
  await playlist.reset(files);
  if (targetFilename) {
    await playlist.switchTo(
      playlist.currentFileList.findIndex((x) => x.url === targetFilename)
    );
  } else await playlist.play();
}
__name(replacePlaylist, "replacePlaylist");
async function playAfter(player, filename, playNow = false) {
  const playlist = ensurePlaylist(player);
  const oldPlayingFilename = playlist.currentFileList[playlist.playingIndex]?.displayString;
  await playlist.addFile(new PlaylistFile(filename), playlist.playingIndex + 1);
  if (playNow && oldPlayingFilename !== filename) await playlist.next();
}
__name(playAfter, "playAfter");

// src/gui/control.ts
var LoopTypeNameMap = {
  [import_nbs_play2.LoopType.None]: "顺序播放",
  [import_nbs_play2.LoopType.List]: "列表循环",
  [import_nbs_play2.LoopType.Single]: "单曲循环",
  [import_nbs_play2.LoopType.Shuffle]: "随机播放"
};
async function controlForm(player, parent) {
  const playlist = ensurePlaylist(player);
  if (!playlist.length) {
    (0, import_form_api_ex3.sendModalFormAsync)(player, PLUGIN_NAME, "播放列表为空").then(() => parent?.()).catch(logErr);
    return;
  }
  const buttons = [
    {
      text: !playlist.isPlaying || playlist.isPausing ? "▶️ 播放" : "⏸️ 暂停",
      operation: /* @__PURE__ */ __name(() => {
        if (playlist.isActive) {
          return playlist.isPausing ? playlist.resume() : playlist.pause();
        }
        return playlist.play();
      }, "operation")
    },
    ...playlist.isActive ? [
      {
        text: "⏹️ 停止",
        operation: /* @__PURE__ */ __name(() => playlist.stop(), "operation")
      }
    ] : [],
    {
      text: "⏮️ 上一首",
      operation: /* @__PURE__ */ __name(() => playlist.previous().catch(() => (0, import_form_api_ex3.sendModalFormAsync)(player, PLUGIN_NAME, "没有上一首了")), "operation")
    },
    {
      text: "⏭️ 下一首",
      operation: /* @__PURE__ */ __name(() => playlist.next().catch(() => (0, import_form_api_ex3.sendModalFormAsync)(player, PLUGIN_NAME, "已经是最后一首了")), "operation")
    },
    {
      text: LoopTypeNameMap[playlist.loopType],
      operation: /* @__PURE__ */ __name(() => Promise.resolve().then(
        () => playlist.switchLoopType((playlist.loopType + 1) % 4)
      ), "operation")
    }
  ];
  new import_form_api_ex3.SimpleFormOperational(PLUGIN_NAME, "", buttons).sendAsync(player).then((res) => res === import_form_api_ex3.FormClose ? parent?.() : controlForm(player, parent)).catch(logErr);
}
__name(controlForm, "controlForm");

// src/gui/file-list.ts
var import_form_api_ex5 = require("form-api-ex");

// src/gui/common.ts
var import_form_api_ex4 = require("form-api-ex");
async function changeIndexForm(list, originalIndex, player) {
  const changedList = list.slice();
  changedList.push(void 0);
  const form = new import_form_api_ex4.SimpleFormEx(changedList);
  form.title = PLUGIN_NAME;
  form.content = `${list[originalIndex]}
你想把该项排在哪项前面呢？
${form.content}`;
  const originalFormatter = form.formatter;
  form.formatter = (v, index2, array) => v === void 0 ? ["放在最后"] : originalFormatter(v, index2, array);
  form.canTurnPage = true;
  form.canJumpPage = true;
  const res = await form.sendAsync(player);
  if (res === import_form_api_ex4.FormClose) return import_form_api_ex4.FormClose;
  const index = res === void 0 ? list.length - 1 : list.indexOf(res);
  if (index === -1) throw Error("unexpected list change");
  return index;
}
__name(changeIndexForm, "changeIndexForm");
async function playListSelectForm(player, additionalContent = "") {
  const playlists = await PlaylistDataManager.getFromXuid(player.xuid).read();
  if (!playlists) {
    await (0, import_form_api_ex4.sendModalFormAsync)(player, PLUGIN_NAME, "你还没有创建过歌单");
    return import_form_api_ex4.FormClose;
  }
  const form = new import_form_api_ex4.SimpleFormEx(playlists.map((x) => x.name));
  form.title = PLUGIN_NAME;
  if (additionalContent) form.content = `${additionalContent}
${form.content}`;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  const res = await form.sendAsync(player);
  return res === import_form_api_ex4.FormClose ? import_form_api_ex4.FormClose : res;
}
__name(playListSelectForm, "playListSelectForm");
async function addToPlayListForm(player, filename) {
  const playlistName = await playListSelectForm(player, `选择要添加到的歌单`);
  if (playlistName === import_form_api_ex4.FormClose) return;
  const confManager = PlaylistDataManager.getFromXuid(player.xuid);
  const [{ files }, index] = await confManager.getByName(playlistName);
  if (!files.includes(filename)) files.push(filename);
  await confManager.change(index, { files });
}
__name(addToPlayListForm, "addToPlayListForm");

// src/gui/file-list.ts
async function fileListFileForm(fileList, filename, player, parent) {
  const parentThis = /* @__PURE__ */ __name(() => fileListFileForm(fileList, filename, player, parent), "parentThis");
  new import_form_api_ex5.SimpleFormOperational(PLUGIN_NAME, filename, [
    {
      text: "覆盖当前列表并播放",
      operation: /* @__PURE__ */ __name(() => replacePlaylist(player, fileList, filename).then(() => parent?.()), "operation")
    },
    {
      text: "添加为下一首并立即切换",
      operation: /* @__PURE__ */ __name(() => playAfter(player, filename, true).then(() => parent?.()), "operation")
    },
    {
      text: "下一首播放",
      operation: /* @__PURE__ */ __name(() => playAfter(player, filename).then(() => parent?.()), "operation")
    },
    {
      text: "添加到歌单",
      operation: /* @__PURE__ */ __name(() => addToPlayListForm(player, filename).then(parentThis), "operation")
    }
  ]).sendAsync(player).then((res) => res === import_form_api_ex5.FormClose && parent?.()).catch(logErr);
}
__name(fileListFileForm, "fileListFileForm");
async function fileListForm(player, parent) {
  const files = file.getFilesList(NBS_PATH).filter((x) => x.endsWith(".nbs"));
  const form = new import_form_api_ex5.SimpleFormEx(files);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  const res = await form.sendAsync(player);
  if (res === import_form_api_ex5.FormClose) {
    parent?.().catch(logErr);
    return;
  }
  fileListFileForm(files, res, player, () => fileListForm(player, parent)).catch(logErr);
}
__name(fileListForm, "fileListForm");

// src/gui/history.ts
var import_form_api_ex6 = require("form-api-ex");
async function historyFileForm(filename, player, parent) {
  new import_form_api_ex6.SimpleFormOperational(PLUGIN_NAME, filename, [
    {
      text: "添加为下一首并立即切换",
      operation: /* @__PURE__ */ __name(() => playAfter(player, filename, true), "operation")
    },
    {
      text: "下一首播放",
      operation: /* @__PURE__ */ __name(() => playAfter(player, filename), "operation")
    },
    {
      text: "添加到歌单",
      operation: /* @__PURE__ */ __name(() => addToPlayListForm(player, filename), "operation")
    }
  ]).sendAsync(player).then(() => parent?.()).catch(logErr);
}
__name(historyFileForm, "historyFileForm");
async function historyForm(player, parent) {
  const confManager = HistoryDataManager.getFromXuid(player.xuid);
  const files = await confManager.read();
  const form = new import_form_api_ex6.SimpleFormEx(files);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  const res = await form.sendAsync(player);
  if (res === import_form_api_ex6.FormClose) {
    parent?.().catch(logErr);
    return;
  }
  historyFileForm(res, player, parent).catch(logErr);
}
__name(historyForm, "historyForm");

// src/gui/playing.ts
var import_form_api_ex7 = require("form-api-ex");
async function playingFileForm(playlist, file2, player, parent) {
  const index = playlist.currentFileList.indexOf(file2);
  new import_form_api_ex7.SimpleFormOperational(PLUGIN_NAME, file2.displayString, [
    {
      text: "切换到此首",
      operation: /* @__PURE__ */ __name(() => playlist.switchTo(index), "operation")
    },
    {
      text: "变更顺序",
      operation: /* @__PURE__ */ __name(async () => {
        const newIndex = await changeIndexForm(
          playlist.currentFileList.map((x) => x.displayString),
          index,
          player
        );
        if (newIndex !== import_form_api_ex7.FormClose) playlist.changeIndex(index, newIndex);
      }, "operation")
    },
    {
      text: "从列表中移除",
      operation: /* @__PURE__ */ __name(async () => {
        if (await (0, import_form_api_ex7.sendModalFormAsync)(player, PLUGIN_NAME, "真的要删除吗？")) {
          playlist.removeFile(index);
        }
      }, "operation")
    }
  ]).sendAsync(player).then(() => parent?.()).catch(logErr);
}
__name(playingFileForm, "playingFileForm");
async function playingForm(player, parent) {
  const playlist = ensurePlaylist(player);
  if (!playlist.length) {
    (0, import_form_api_ex7.sendModalFormAsync)(player, PLUGIN_NAME, "播放列表为空").then(() => parent?.()).catch(logErr);
    return;
  }
  const form = new import_form_api_ex7.SimpleFormEx(playlist.currentFileList);
  form.title = PLUGIN_NAME;
  const originalFormatter = form.formatter;
  form.formatter = (v, index, array) => originalFormatter(v.displayString, index, array);
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  const res = await form.sendAsync(
    player,
    Math.ceil((playlist.playingIndex + 1) / form.maxPageNum)
  );
  if (res === import_form_api_ex7.FormClose) {
    parent?.().catch(logErr);
    return;
  }
  playingFileForm(playlist, res, player, () => playingForm(player, parent)).catch(
    logErr
  );
}
__name(playingForm, "playingForm");

// src/gui/playlists.ts
var import_form_api_ex8 = require("form-api-ex");
async function playListSongForm(playListName, songFilename, player, parent) {
  const confManager = PlaylistDataManager.getFromXuid(player.xuid);
  new import_form_api_ex8.SimpleFormOperational(PLUGIN_NAME, songFilename, [
    {
      text: "覆盖当前列表并播放",
      operation: /* @__PURE__ */ __name(async () => replacePlaylist(
        player,
        (await confManager.getByName(playListName))[0].files,
        songFilename
      ), "operation")
    },
    {
      text: "添加为下一首并立即切换",
      operation: /* @__PURE__ */ __name(() => playAfter(player, songFilename, true), "operation")
    },
    {
      text: "下一首播放",
      operation: /* @__PURE__ */ __name(() => playAfter(player, songFilename), "operation")
    },
    {
      text: "添加到歌单",
      operation: /* @__PURE__ */ __name(() => addToPlayListForm(player, songFilename), "operation")
    },
    {
      text: "变更顺序",
      operation: /* @__PURE__ */ __name(async () => {
        const [data, playlistIndex] = await confManager.getByName(playListName);
        const { files } = data;
        const fileIndex = files.findIndex((x) => x === songFilename);
        const newIdx = await changeIndexForm(files, fileIndex, player);
        if (newIdx === import_form_api_ex8.FormClose) return;
        files.splice(fileIndex, 1);
        files.splice(newIdx, 0, songFilename);
        await confManager.change(playlistIndex, { files });
      }, "operation")
    },
    {
      text: "从歌单中删除",
      operation: /* @__PURE__ */ __name(async () => {
        if (await (0, import_form_api_ex8.sendModalFormAsync)(player, PLUGIN_NAME, "真的要删除吗？")) {
          const [data, playlistIndex] = await confManager.getByName(playListName);
          const { files } = data;
          const fileIndex = files.findIndex((x) => x === songFilename);
          files.splice(fileIndex, 1);
          await confManager.change(playlistIndex, { files });
        }
      }, "operation")
    }
  ]).sendAsync(player).then(() => parent?.()).catch((err) => {
    if (err instanceof TipError) {
      (0, import_form_api_ex8.sendModalFormAsync)(player, PLUGIN_NAME, err.message).then(() => playListSongForm(playListName, songFilename, player, parent)).catch(logErr);
    } else logErr(err);
  });
}
__name(playListSongForm, "playListSongForm");
async function playListViewForm(name, player, parent) {
  const confManager = PlaylistDataManager.getFromXuid(player.xuid);
  const data = await confManager.read();
  const entry = data.find((x) => x.name === name);
  if (!entry) return;
  const form = new import_form_api_ex8.SimpleFormEx(entry.files);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  const res = await form.sendAsync(player);
  if (res === import_form_api_ex8.FormClose) {
    parent?.().catch(logErr);
    return;
  }
  playListSongForm(
    name,
    res,
    player,
    () => playListViewForm(name, player, parent)
  ).catch(logErr);
}
__name(playListViewForm, "playListViewForm");
async function playListChangeNameForm(name, player) {
  const confManager = PlaylistDataManager.getFromXuid(player.xuid);
  const [, index] = await confManager.getByName(name);
  const res = await new import_form_api_ex8.CustomFormEx(PLUGIN_NAME).addInput("newName", "请输入新名称").sendAsync(player);
  if (res === import_form_api_ex8.FormClose) return import_form_api_ex8.FormClose;
  const { newName } = res;
  if (!newName) {
    await (0, import_form_api_ex8.sendModalFormAsync)(player, PLUGIN_NAME, "歌单名称不能为空");
    return playListChangeNameForm(name, player);
  }
  await confManager.change(index, { name: newName });
  return newName;
}
__name(playListChangeNameForm, "playListChangeNameForm");
async function playListOperateForm(name, player, parent) {
  const confManager = PlaylistDataManager.getFromXuid(player.xuid);
  const parentThis = /* @__PURE__ */ __name(() => playListOperateForm(name, player, parent), "parentThis");
  new import_form_api_ex8.SimpleFormOperational(PLUGIN_NAME, name, [
    {
      text: "播放",
      operation: /* @__PURE__ */ __name(async () => replacePlaylist(player, (await confManager.getByName(name))[0].files).then(
        () => parent?.()
      ), "operation")
    },
    {
      text: "查看",
      operation: /* @__PURE__ */ __name(() => playListViewForm(name, player, parentThis), "operation")
    },
    {
      text: "变更顺序",
      operation: /* @__PURE__ */ __name(async () => {
        const data = await confManager.read();
        const [, plIndex] = await confManager.getByName(name);
        const newIdx = await changeIndexForm(
          data.map((x) => x.name),
          plIndex,
          player
        );
        if (newIdx !== import_form_api_ex8.FormClose) await confManager.changeIndex(plIndex, newIdx);
        parentThis().catch(logErr);
      }, "operation")
    },
    {
      text: "重命名",
      operation: /* @__PURE__ */ __name(() => playListChangeNameForm(name, player).then((x) => {
        if (x !== import_form_api_ex8.FormClose) name = x;
      }).then(parentThis).catch(logErr), "operation")
    },
    {
      text: "清除所有无效歌曲",
      operation: /* @__PURE__ */ __name(async () => {
        const [data, index] = await confManager.getByName(name);
        const before = data.files.length;
        const newFileList = data.files.filter((x) => file.exists(`${NBS_PATH}/${x}`));
        const after = newFileList.length;
        await confManager.change(index, { files: newFileList });
        await (0, import_form_api_ex8.sendModalFormAsync)(
          player,
          PLUGIN_NAME,
          `清除了 ${before - after} 首无效歌曲`
        );
        parentThis().catch(logErr);
      }, "operation")
    },
    {
      text: "删除",
      operation: /* @__PURE__ */ __name(async () => {
        const [, index] = await confManager.getByName(name);
        if (await (0, import_form_api_ex8.sendModalFormAsync)(player, PLUGIN_NAME, "真的要删除吗？")) {
          confManager.remove(index).then(() => parent?.()).catch(logErr);
        } else parentThis().catch(logErr);
      }, "operation")
    }
  ]).sendAsync(player).then((res) => res === import_form_api_ex8.FormClose ? parent?.() : void 0).catch((err) => {
    if (err instanceof TipError) {
      (0, import_form_api_ex8.sendModalFormAsync)(player, PLUGIN_NAME, err.message).then(() => playListOperateForm(name, player, parent)).catch(logErr);
    } else logErr(err);
  });
}
__name(playListOperateForm, "playListOperateForm");
async function playListsForm(player, parent) {
  const res = await playListSelectForm(player);
  if (res === import_form_api_ex8.FormClose) {
    parent?.().catch(logErr);
    return;
  }
  playListOperateForm(res, player, () => playListsForm(player, parent)).catch(logErr);
}
__name(playListsForm, "playListsForm");
async function newListForm(player, parent) {
  const playingPl = ensurePlaylist(player);
  const newPlaylistModeMap = [
    ["从当前播放列表创建", () => playingPl.fileList.map((x) => x.url)],
    ["创建空歌单", () => []]
  ];
  const res = await new import_form_api_ex8.CustomFormEx(PLUGIN_NAME).addStepSlider(
    "mode",
    "请选择创建模式",
    newPlaylistModeMap.map((x) => x[0])
  ).addInput("name", "请输入歌单名称").sendAsync(player);
  if (res === import_form_api_ex8.FormClose) {
    parent?.().catch(logErr);
    return;
  }
  if (!res.name) {
    (0, import_form_api_ex8.sendModalFormAsync)(player, PLUGIN_NAME, "歌单名称不能为空").then(() => newListForm(player, parent)).catch(logErr);
    return;
  }
  const manager = PlaylistDataManager.getFromXuid(player.xuid);
  try {
    await manager.add({
      name: res.name,
      files: newPlaylistModeMap[res.mode][1]()
    });
  } catch (e) {
    if (e instanceof TipError) {
      (0, import_form_api_ex8.sendModalFormAsync)(player, PLUGIN_NAME, e.message).then(() => parent?.()).catch(logErr);
    } else throw e;
  }
  (0, import_form_api_ex8.sendModalFormAsync)(player, PLUGIN_NAME, "创建成功").then(() => parent?.()).catch(logErr);
}
__name(newListForm, "newListForm");

// src/gui/index.ts
async function mainForm(player) {
  new import_form_api_ex9.SimpleFormOperational(
    PLUGIN_NAME,
    "",
    [
      ["文件列表", fileListForm],
      ["播放控制", controlForm],
      ["播放列表", playingForm],
      ["播放历史", historyForm],
      ["我的歌单", playListsForm],
      ["创建歌单", newListForm]
    ].map(([text, op]) => ({
      text,
      operation: /* @__PURE__ */ __name(() => op(player, () => mainForm(player)).catch(logErr), "operation")
    }))
  ).sendAsync(player).catch(logErr);
}
__name(mainForm, "mainForm");

// src/command.ts
function init() {
  const cmd = mc.newCommand("nbs", PLUGIN_NAME, PermType.Any);
  cmd.setAlias("nbsplayer");
  cmd.setEnum("enumFileList", ["filelist"]);
  cmd.mandatory("enumFileList", ParamType.Enum, "enumFileList", 1);
  cmd.overload(["enumFileList"]);
  cmd.setEnum("enumControl", ["control"]);
  cmd.mandatory("enumControl", ParamType.Enum, "enumControl", 1);
  cmd.overload(["enumControl"]);
  cmd.setEnum("enumPlaying", ["playing"]);
  cmd.mandatory("enumPlaying", ParamType.Enum, "enumPlaying", 1);
  cmd.overload(["enumPlaying"]);
  cmd.setEnum("enumHistory", ["history"]);
  cmd.mandatory("enumHistory", ParamType.Enum, "enumHistory", 1);
  cmd.overload(["enumHistory"]);
  cmd.setEnum("enumPlaylists", ["playlists"]);
  cmd.mandatory("enumPlaylists", ParamType.Enum, "enumPlaylists", 1);
  cmd.overload(["enumPlaylists"]);
  cmd.setEnum("enumNewList", ["newlist"]);
  cmd.mandatory("enumNewList", ParamType.Enum, "enumNewList", 1);
  cmd.overload(["enumNewList"]);
  cmd.setEnum("enumIsPlaying", ["isplaying"]);
  cmd.mandatory("enumIsPlaying", ParamType.Enum, "enumIsPlaying", 1);
  cmd.optional("player", ParamType.Player);
  cmd.overload(["enumIsPlaying", "player"]);
  cmd.setEnum("enumPlay", ["play"]);
  cmd.mandatory("enumPlay", ParamType.Enum, "enumPlay", 1);
  cmd.mandatory("filename", ParamType.String);
  cmd.optional("forcePlay", ParamType.Bool);
  cmd.overload(["enumPlay", "filename", "player", "forcePlay"]);
  cmd.overload();
  cmd.setCallback((_, { player }, output, res) => {
    if ("enumFileList" in res && res.enumFileList) {
      if (!player) return false;
      fileListForm(player).catch(logErr);
      return true;
    }
    if ("enumControl" in res && res.enumControl) {
      if (!player) return false;
      controlForm(player).catch(logErr);
      return true;
    }
    if ("enumPlaying" in res && res.enumPlaying) {
      if (!player) return false;
      playingForm(player).catch(logErr);
      return true;
    }
    if ("enumHistory" in res && res.enumHistory) {
      if (!player) return false;
      historyForm(player).catch(logErr);
      return true;
    }
    if ("enumPlaylists" in res && res.enumPlaylists) {
      if (!player) return false;
      playListsForm(player).catch(logErr);
      return true;
    }
    if ("enumNewList" in res && res.enumNewList) {
      if (!player) return false;
      newListForm(player).catch(logErr);
      return true;
    }
    if ("enumIsPlaying" in res && res.enumIsPlaying) {
      const [targetPlayer] = res.player || [player];
      if (!targetPlayer) return false;
      const { isPlaying } = ensurePlaylist(targetPlayer);
      output.addMessage(`${isPlaying}`);
      return isPlaying;
    }
    if ("enumPlay" in res && res.enumPlay) {
      if (!file.exists(`${NBS_PATH}/${res.filename}`)) {
        output.addMessage(`§c文件 ${res.filename} 不存在`);
        return false;
      }
      let playerList = [];
      if (res.player?.length) playerList = res.player;
      else if (player) playerList = [player];
      else return false;
      const playRes = playerList.map((targetPlayer) => {
        const playlist = ensurePlaylist(targetPlayer);
        const forcePlay = res.forcePlay ?? false;
        if (!forcePlay && playlist.isActive) return false;
        playAfter(targetPlayer, res.filename, forcePlay).catch(logErr);
        return true;
      });
      const outTmp = [];
      for (let i = 0; i < playRes.length; i += 1) {
        const pl = playerList[i];
        const ok = playRes[i];
        outTmp.push(
          ok ? `§a成功为 ${pl.realName} 播放` : `§c为 ${pl.realName} 播放失败`
        );
      }
      output.addMessage(outTmp.join("\n"));
      return true;
    }
    if (!player) return false;
    mainForm(player).catch(logErr);
    return true;
  });
  cmd.setup();
}
__name(init, "init");
mc.listen("onServerStarted", init);

// src/index.ts
ll.registerPlugin(PLUGIN_NAME, PLUGIN_DESCRIPTION, PLUGIN_VERSION, PLUGIN_EXTRA);
