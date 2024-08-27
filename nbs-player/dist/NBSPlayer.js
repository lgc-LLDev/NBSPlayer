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

// ../../FormAPIEx/lib/FormAPIEx.cjs
var require_FormAPIEx = __commonJS({
  "../../FormAPIEx/lib/FormAPIEx.cjs"(exports2, module2) {
    "use strict";
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp3(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp3({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export(src_exports, {
      AUTHOR: /* @__PURE__ */ __name(() => AUTHOR, "AUTHOR"),
      CustomFormEx: /* @__PURE__ */ __name(() => CustomFormEx2, "CustomFormEx"),
      FormClose: /* @__PURE__ */ __name(() => FormClose7, "FormClose"),
      LICENSE: /* @__PURE__ */ __name(() => LICENSE, "LICENSE"),
      NAME: /* @__PURE__ */ __name(() => NAME, "NAME"),
      SimpleFormAsync: /* @__PURE__ */ __name(() => SimpleFormAsync, "SimpleFormAsync"),
      SimpleFormEx: /* @__PURE__ */ __name(() => SimpleFormEx6, "SimpleFormEx"),
      SimpleFormOperational: /* @__PURE__ */ __name(() => SimpleFormOperational7, "SimpleFormOperational"),
      VERSION: /* @__PURE__ */ __name(() => VERSION, "VERSION"),
      buildCustomForm: /* @__PURE__ */ __name(() => buildCustomForm, "buildCustomForm"),
      deepClone: /* @__PURE__ */ __name(() => deepClone, "deepClone"),
      formatError: /* @__PURE__ */ __name(() => formatError3, "formatError"),
      sendFormAsync: /* @__PURE__ */ __name(() => sendFormAsync, "sendFormAsync"),
      sendModalFormAsync: /* @__PURE__ */ __name(() => sendModalFormAsync5, "sendModalFormAsync"),
      wrapAsyncFunc: /* @__PURE__ */ __name(() => wrapAsyncFunc, "wrapAsyncFunc")
    });
    module2.exports = __toCommonJS(src_exports);
    var version2 = "0.5.2";
    var NAME = "FormAPIEx";
    var VERSION = version2.split(".").map((v) => Number(v));
    var AUTHOR = "student_2333 <lgc2333@126.com>";
    var LICENSE = "Apache-2.0";
    var FormClose7 = Symbol(`${NAME}_FormClose`);
    function formatError3(e) {
      return e instanceof Error ? `${e.message}
${e.stack}` : String(e);
    }
    __name(formatError3, "formatError");
    function wrapAsyncFunc(func) {
      return (...args) => {
        setTimeout(() => func(...args).catch((e) => logger.error(formatError3(e))), 0);
      };
    }
    __name(wrapAsyncFunc, "wrapAsyncFunc");
    function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    __name(deepClone, "deepClone");
    function sendFormAsync(player, form) {
      return new Promise((resolve) => {
        player.sendForm(
          form,
          (_, data) => setTimeout(
            () => resolve(data === null || data === void 0 ? FormClose7 : data),
            0
          )
        );
      });
    }
    __name(sendFormAsync, "sendFormAsync");
    function buildCustomForm(formTitle, objects) {
      const form = mc.newCustomForm();
      form.setTitle(formTitle);
      for (const obj of objects) {
        switch (obj.type) {
          case "label": {
            form.addLabel(obj.text);
            break;
          }
          case "input": {
            const { title, placeholder, defaultVal } = obj;
            form.addInput(title, placeholder ?? "", defaultVal ?? "");
            break;
          }
          case "switch": {
            const { title, defaultVal } = obj;
            form.addSwitch(title, defaultVal ?? false);
            break;
          }
          case "dropdown": {
            const { title, items, defaultVal } = obj;
            form.addDropdown(title, items, defaultVal ?? 0);
            break;
          }
          case "slider": {
            const { title, min, max, step, defaultVal } = obj;
            form.addSlider(title, min, max, step ?? 1, defaultVal ?? min);
            break;
          }
          case "stepSlider": {
            const { title, items, defaultVal } = obj;
            form.addStepSlider(title, items, defaultVal ?? 0);
            break;
          }
        }
      }
      return form;
    }
    __name(buildCustomForm, "buildCustomForm");
    var _objects, _a8;
    var CustomFormEx2 = (_a8 = class {
      /**
       * @param title 表单标题
       */
      constructor(title = "") {
        __privateAdd(this, _objects);
        this.title = "";
        __privateSet(this, _objects, []);
        this.title = title;
      }
      /**
       * 获取表单元素列表
       */
      get objects() {
        return deepClone(__privateGet(this, _objects));
      }
      /**
       * 获取表单元素数量
       */
      get length() {
        return __privateGet(this, _objects).length;
      }
      /**
       * 设置表单标题
       * @param val 标题
       * @returns 自身，便于链式调用
       */
      setTitle(val) {
        this.title = val;
        return this;
      }
      // add object
      // 格式化之后着色有问题
      // prettier-ignore
      /**
       * 向表单尾部添加一个元素
       * @param id 元素 id
       * @param obj 元素
       * @returns 自身，便于链式调用
       */
      push(id, obj) {
        __privateGet(this, _objects).push([id, obj]);
        return this;
      }
      // prettier-ignore
      /**
       * 向表单头部添加一个元素
       * @param id 元素 id
       * @param obj 元素
       * @returns 自身，便于链式调用
       */
      unshift(id, obj) {
        __privateGet(this, _objects).unshift([id, obj]);
        return this;
      }
      // prettier-ignore
      /**
       * 向表单插入一个元素
       * @param index 插入位置
       * @param id 元素 id
       * @param obj 元素
       * @returns 自身，便于链式调用
       */
      insert(index, id, obj) {
        __privateGet(this, _objects).splice(index, 0, [id, obj]);
        return this;
      }
      // remove object
      /**
       * 删除表单元素
       * @param id 元素 id
       * @returns 自身，便于链式调用
       */
      remove(id) {
        for (let i = 0; i < __privateGet(this, _objects).length; i += 1) {
          const [objId] = __privateGet(this, _objects)[i];
          if (objId === id) {
            __privateGet(this, _objects).splice(i, 1);
            break;
          }
        }
        return this;
      }
      get(id) {
        if (typeof id === "number") return __privateGet(this, _objects)[id];
        for (const [objId, val] of __privateGet(this, _objects)) {
          if (objId === id) return val;
        }
        return null;
      }
      addLabel(arg1, arg2) {
        const id = arg2 ? arg1 : void 0;
        const text = arg2 ?? arg1;
        return this.push(id, { type: "label", text });
      }
      /**
       * 向表单添加一个输入框
       * @param id 元素 id
       * @param title 输入框标题
       * @param options 附加选项
       * @returns 自身，便于链式调用
       */
      addInput(id, title, options = {}) {
        const { placeholder, default: defaultVal } = options;
        return this.push(id, {
          type: "input",
          title,
          placeholder,
          defaultVal
        });
      }
      /**
       * 向表单添加一个开关
       * @param id 元素 id
       * @param title 开关标题
       * @param defaultVal 开关默认状态，默认为 `false`
       * @returns 自身，便于链式调用
       */
      addSwitch(id, title, defaultVal = false) {
        return this.push(id, { type: "switch", title, defaultVal });
      }
      /**
       * 向表单添加一个下拉框
       * @param id 元素 id
       * @param title 下拉框标题
       * @param items 下拉框元素
       * @param defaultVal 下拉框默认选择元素位置，默认为 `0`
       * @returns 自身，便于链式调用
       */
      addDropdown(id, title, items, defaultVal = 0) {
        return this.push(id, { type: "dropdown", title, items, defaultVal });
      }
      /**
       * 向表单添加一个滑块
       * @param id 元素 id
       * @param title 滑块标题
       * @param min 滑块最小值
       * @param max 滑块最大值
       * @param options 附加选项
       * @returns 自身，便于链式调用
       */
      addSlider(id, title, min, max, options = {}) {
        const { step, default: defaultVal } = options;
        return this.push(id, { type: "slider", title, min, max, step, defaultVal });
      }
      /**
       * 向表单添加一个步进滑块
       * @param id 元素 id
       * @param title 步进滑块标题
       * @param items 步进滑块元素列表
       * @param defaultVal 滑块默认位置，默认为 `0`
       * @returns 自身，便于链式调用
       */
      addStepSlider(id, title, items, defaultVal = 0) {
        return this.push(id, { type: "stepSlider", title, items, defaultVal });
      }
      // send
      parseReturn(data) {
        const res = {};
        for (let i = 0; i < data.length; i += 1) {
          const [id] = __privateGet(this, _objects)[i];
          const val = data[i] ?? void 0;
          if (id) res[id] = val;
        }
        return res;
      }
      /**
       * 异步向玩家发送该表单
       * @param player 玩家对象
       * @returns 返回结果，玩家关闭表单或发送失败返回 FormClose
       */
      async sendAsync(player) {
        const data = await sendFormAsync(
          player,
          buildCustomForm(
            this.title,
            this.objects.map((v) => v[1])
          )
        );
        if (data === FormClose7) return FormClose7;
        return this.parseReturn(data);
      }
    }, _objects = new WeakMap(), __name(_a8, "CustomFormEx"), _a8);
    function sendModalFormAsync5(player, title, content, confirmButton = "§a确认", cancelButton = "§c取消") {
      return new Promise((resolve) => {
        player.sendModalForm(
          title,
          content,
          confirmButton,
          cancelButton,
          (_, data) => setTimeout(() => resolve(!!data), 0)
        );
      });
    }
    __name(sendModalFormAsync5, "sendModalFormAsync");
    var _a9;
    var SimpleFormAsync = (_a9 = class {
      /**
       * @param options 附加选项
       */
      constructor(options = {}) {
        this.title = "";
        this.content = "";
        this.buttons = [];
        const { title, content, buttons } = options;
        if (title) this.title = title;
        if (content) this.content = content;
        if (buttons) this.buttons = buttons;
      }
      /**
       * 设置表单标题
       * @param val 标题
       * @returns 自身，便于链式调用
       */
      setTitle(val) {
        this.title = val;
        return this;
      }
      /**
       * 设置表单内容
       * @param val 内容
       * @returns 自身，便于链式调用
       */
      setContent(val) {
        this.content = val;
        return this;
      }
      /**
       * 给表单添加一个按钮
       * @param text 按钮文本
       * @param image 按钮图片
       * @returns 自身，便于链式调用
       */
      addButton(text, image) {
        this.buttons.push([text, image]);
        return this;
      }
      /**
       * 异步向玩家发送该表单
       * @param player 玩家对象
       * @returns 玩家选择的按钮序号，玩家关闭表单或发送失败返回 FormClose
       */
      sendAsync(player) {
        const form = mc.newSimpleForm().setTitle(this.title).setContent(this.content);
        this.buttons.forEach(([text, image]) => {
          if (image) form.addButton(text, image);
          else form.addButton(text);
        });
        return sendFormAsync(player, form);
      }
    }, __name(_a9, "SimpleFormAsync"), _a9);
    var _a10;
    var SimpleFormEx6 = (_a10 = class {
      /**
       * @param buttons 表单按钮参数
       */
      constructor(buttons = []) {
        this.title = "";
        this.content = "§a第 §e{{currentPage}} §f/ §6{{maxPage}} §a页 §7| §a共 §e{{count}} §a条";
        this.buttons = [];
        this.formatter = (v) => [
          `§3${String(v)}`
        ];
        this.canTurnPage = false;
        this.canJumpPage = false;
        this.maxPageNum = 15;
        this.hasSearchButton = false;
        this.searcher = (buttons2, param) => {
          const params = param.toLowerCase().split(/\s/g);
          const formatted = this.formatButtons(buttons2).map((v) => v[0].toLowerCase());
          const result = [];
          for (const it of formatted) {
            const score = params.reduce((acc, cur) => acc + (it.includes(cur) ? 1 : 0), 0);
            if (score) result.push([score, buttons2[formatted.indexOf(it)]]);
          }
          return result.sort(([a], [b]) => b - a).map((v) => v[1]);
        };
        this.buttons = buttons;
      }
      /**
       * 格式化给定按钮
       * @param buttons 表单按钮参数列表
       * @returns 格式化后的按钮
       */
      formatButtons(buttons = this.buttons) {
        return buttons.map(this.formatter);
      }
      /**
       * @returns 表单最大页数
       */
      getMaxPageNum() {
        return this.canTurnPage ? Math.ceil(this.buttons.length / this.maxPageNum) : 1;
      }
      /**
       * 获取对应页数的按钮参数列表
       * @param page 页码
       * @returns 按钮参数列表
       */
      getPage(page = 1) {
        if (page > this.getMaxPageNum()) return [];
        return this.buttons.slice((page - 1) * this.maxPageNum, page * this.maxPageNum);
      }
      /**
       * 异步向玩家发送搜索表单
       * @param player 玩家对象
       * @param defaultVal 搜索框默认内容
       * @returns 选择的搜索结果按钮参数。返回 null 为没搜到, FormClose 为取消搜索
       */
      async sendSearchForm(player, defaultVal = "") {
        const form = new CustomFormEx2(this.title);
        const res = await form.addInput("param", "请输入你要搜索的内容", { default: defaultVal }).sendAsync(player);
        if (res === FormClose7) return FormClose7;
        const searched = this.searcher(this.buttons, res.param);
        if (!searched.length) {
          await new SimpleFormAsync({
            title: this.title,
            content: "§6没有搜索到结果"
          }).sendAsync(player);
          return null;
        }
        const searchForm = new _a10();
        searchForm.title = this.title;
        searchForm.content = `§a为您找到了 §l§6${searched.length} §r§a个结果
${searchForm.content}`;
        searchForm.buttons = searched;
        searchForm.formatter = this.formatter;
        searchForm.canTurnPage = this.canTurnPage;
        searchForm.canJumpPage = this.canJumpPage;
        searchForm.maxPageNum = this.maxPageNum;
        searchForm.hasSearchButton = false;
        const selected = await searchForm.sendAsync(player);
        return selected === FormClose7 ? FormClose7 : selected;
      }
      /**
       * 异步向玩家发送表单
       * @param player 玩家对象
       * @param page 页码
       * @returns 给定的按钮参数，表单被玩家关闭或发送失败返回 FormClose
       */
      async sendAsync(player, page = 1) {
        const buttons = this.canTurnPage ? this.getPage(page) : this.buttons;
        const formattedButtons = this.formatButtons(buttons);
        const maxPage = this.getMaxPageNum();
        const pageAboveOne = maxPage > 1;
        const hasJumpBtn = this.canJumpPage && pageAboveOne;
        const hasPreviousPage = page > 1 && pageAboveOne;
        const hasNextPage = page < maxPage && pageAboveOne;
        if (hasPreviousPage) formattedButtons.unshift(["§2<- 上一页"]);
        if (hasJumpBtn) formattedButtons.unshift(["§1跳页"]);
        if (this.hasSearchButton) formattedButtons.unshift(["§1搜索"]);
        if (hasNextPage) formattedButtons.push(["§2下一页 ->"]);
        const formatContent = /* @__PURE__ */ __name((content) => {
          const count = this.buttons.length;
          const formatMap = {
            currentPage: page,
            maxPage,
            count
          };
          for (const [key, val] of Object.entries(formatMap)) {
            content = content.replaceAll(`{{${key}}}`, String(val));
          }
          return content;
        }, "formatContent");
        const resultIndex = await new SimpleFormAsync({
          title: this.title,
          content: formatContent(this.content),
          buttons: formattedButtons
        }).sendAsync(player);
        if (resultIndex === FormClose7) return FormClose7;
        let offset = 0;
        if (this.hasSearchButton) {
          if (resultIndex === offset) {
            const res = await this.sendSearchForm(player);
            return res === null || res === FormClose7 ? this.sendAsync(player, page) : res;
          }
          offset += 1;
        }
        if (hasJumpBtn) {
          if (resultIndex === offset) {
            const res = await new CustomFormEx2(this.title).addSlider("num", "请选择你要跳转的页数", 1, maxPage, {
              default: page
            }).sendAsync(player);
            return this.sendAsync(player, res === FormClose7 ? page : res.num);
          }
          offset += 1;
        }
        if (hasPreviousPage) {
          if (resultIndex === offset) {
            return this.sendAsync(player, page - 1);
          }
          offset += 1;
        }
        if (hasNextPage && resultIndex + 1 === formattedButtons.length) {
          return this.sendAsync(player, page + 1);
        }
        const realIndex = resultIndex - offset;
        return buttons[realIndex];
      }
    }, __name(_a10, "_SimpleFormEx"), _a10);
    var _a11;
    var SimpleFormOperational7 = (_a11 = class {
      constructor(title = "", content = "", buttons = []) {
        this.title = title;
        this.content = content;
        this.buttons = buttons;
      }
      async sendAsync(player) {
        const form = new SimpleFormEx6(this.buttons);
        form.title = this.title;
        form.content = this.content;
        form.formatter = ({ text, image }) => [text, image];
        const res = await form.sendAsync(player);
        if (res === FormClose7) return FormClose7;
        return res.operation();
      }
    }, __name(_a11, "SimpleFormOperational"), _a11);
  }
});

// ../node_modules/.pnpm/event-target-polyfill@0.0.4/node_modules/event-target-polyfill/index.js
var root = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
var shouldPolyfillEvent = function() {
  try {
    new root.Event("");
  } catch (error) {
    return true;
  }
  return false;
}();
var shouldPolyfillEventTarget = function() {
  try {
    new root.EventTarget();
  } catch (error) {
    return true;
  }
  return false;
}();
if (shouldPolyfillEvent) {
  root.Event = /* @__PURE__ */ function() {
    function Event2(type, options) {
      this.bubbles = !!options && !!options.bubbles;
      this.cancelable = !!options && !!options.cancelable;
      this.composed = !!options && !!options.composed;
      this.type = type;
    }
    __name(Event2, "Event");
    return Event2;
  }();
}
if (shouldPolyfillEventTarget) {
  root.EventTarget = function() {
    function EventTarget2() {
      this.__listeners = /* @__PURE__ */ new Map();
    }
    __name(EventTarget2, "EventTarget");
    EventTarget2.prototype = Object.create(Object.prototype);
    EventTarget2.prototype.addEventListener = function(type, listener, options) {
      if (arguments.length < 2) {
        throw new TypeError(
          "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
        );
      }
      const __listeners = this.__listeners;
      const actualType = type.toString();
      if (!__listeners.has(actualType)) {
        __listeners.set(actualType, /* @__PURE__ */ new Map());
      }
      const listenersForType = __listeners.get(actualType);
      if (!listenersForType.has(listener)) {
        listenersForType.set(listener, options);
      }
    };
    EventTarget2.prototype.removeEventListener = function(type, listener, _options) {
      if (arguments.length < 2) {
        throw new TypeError(
          "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
        );
      }
      const __listeners = this.__listeners;
      const actualType = type.toString();
      if (__listeners.has(actualType)) {
        const listenersForType = __listeners.get(actualType);
        if (listenersForType.has(listener)) {
          listenersForType.delete(listener);
        }
      }
    };
    EventTarget2.prototype.dispatchEvent = function(event) {
      if (!(event instanceof Event)) {
        throw new TypeError(
          "Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'."
        );
      }
      const type = event.type;
      const __listeners = this.__listeners;
      const listenersForType = __listeners.get(type);
      if (listenersForType) {
        for (var listnerEntry of listenersForType.entries()) {
          const listener = listnerEntry[0];
          const options = listnerEntry[1];
          try {
            if (typeof listener === "function") {
              listener.call(this, event);
            } else if (listener && typeof listener.handleEvent === "function") {
              listener.handleEvent(event);
            }
          } catch (err) {
            setTimeout(() => {
              throw err;
            });
          }
          if (options && options.once) {
            listenersForType.delete(listener);
          }
        }
      }
      return true;
    };
    return EventTarget2;
  }();
}

// src/polyfill.ts
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
var import_form_api_ex9 = __toESM(require_FormAPIEx());

// src/utils.ts
var import_form_api_ex = __toESM(require_FormAPIEx());
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
var import_form_api_ex3 = __toESM(require_FormAPIEx());

// ../nbs-play/packages/nbs-play/dist/index.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var _a2;
var _PlayerEvent = (_a2 = class extends Event {
  constructor(type, eventInitDict) {
    const { bubbles, cancelable, composed, ...rest } = eventInitDict || {};
    super(type, { bubbles, cancelable, composed });
    this.params = rest;
  }
}, __name(_a2, "_PlayerEvent"), _a2);
__name2(_PlayerEvent, "PlayerEvent");
var PlayerEvent = _PlayerEvent;
var _a3;
var _PlayerEventTarget = (_a3 = class extends EventTarget {
  addEventListener(type, callback, options) {
    super.addEventListener(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    super.removeEventListener(type, callback, options);
  }
}, __name(_a3, "_PlayerEventTarget"), _a3);
__name2(_PlayerEventTarget, "PlayerEventTarget");
var PlayerEventTarget = _PlayerEventTarget;
async function arrFromAsync(iterable) {
  const arr = [];
  for await (const item of iterable) arr.push(item);
  return arr;
}
__name(arrFromAsync, "arrFromAsync");
__name2(arrFromAsync, "arrFromAsync");
var _a4;
var _Parser = (_a4 = class {
  constructor(buf) {
    this.buf = buf;
    this.offset = 0;
    this.view = new DataView(buf);
  }
  async parse() {
    const header = await this.parseHeader();
    const { version: version2, songLayers } = header;
    const notes = await arrFromAsync(this.parseNotes(version2));
    const layers = await arrFromAsync(this.parseLayers(songLayers, version2));
    const instruments = await arrFromAsync(this.parseInstruments());
    this.offset = 0;
    return { header, notes, layers, instruments };
  }
  readUChar() {
    const value = this.view.getUint8(this.offset);
    this.offset += 1;
    return value;
  }
  readUShort() {
    const value = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return value;
  }
  readShort() {
    const value = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return value;
  }
  readUInt() {
    const value = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return value;
  }
  readString() {
    const length = this.readUInt();
    const value = new TextDecoder("cp1252").decode(
      this.buf.slice(this.offset, this.offset + length)
    );
    this.offset += length;
    return value;
  }
  async parseHeader() {
    const songLength = this.readUShort();
    const version2 = songLength === 0 ? this.readUChar() : 0;
    return {
      version: version2,
      defaultInstruments: version2 > 0 ? this.readUChar() : 10,
      songLength: version2 >= 3 ? this.readUShort() : songLength,
      songLayers: this.readUShort(),
      songName: this.readString(),
      songAuthor: this.readString(),
      originalAuthor: this.readString(),
      description: this.readString(),
      tempo: this.readUShort() / 100,
      autoSave: this.readUChar() === 1,
      autoSaveDuration: this.readUChar(),
      timeSignature: this.readUChar(),
      minutesSpent: this.readUInt(),
      leftClicks: this.readUInt(),
      rightClicks: this.readUInt(),
      blocksAdded: this.readUInt(),
      blocksRemoved: this.readUInt(),
      songOrigin: this.readString(),
      loop: version2 >= 4 ? this.readUChar() === 1 : false,
      maxLoopCount: version2 >= 4 ? this.readUChar() : 0,
      loopStart: version2 >= 4 ? this.readUShort() : 0
    };
  }
  async *jump() {
    let value = -1;
    for (; ; ) {
      const jump = this.readUShort();
      if (jump === 0) break;
      value += jump;
      yield value;
    }
  }
  async *parseNotes(version2) {
    for await (const currentTick of this.jump()) {
      for await (const currentLayer of this.jump()) {
        yield {
          tick: currentTick,
          layer: currentLayer,
          instrument: this.readUChar(),
          key: this.readUChar(),
          velocity: version2 >= 4 ? this.readUChar() : 100,
          panning: version2 >= 4 ? this.readUChar() - 100 : 0,
          pitch: version2 >= 4 ? this.readShort() : 0
        };
      }
    }
  }
  async *parseLayers(layerCount, version2) {
    for (let id = 0; id < layerCount; id += 1) {
      yield {
        id,
        name: this.readString(),
        lock: version2 >= 4 ? this.readUChar() === 1 : false,
        volume: this.readUChar(),
        panning: version2 >= 2 ? this.readUChar() - 100 : 0
      };
    }
  }
  async *parseInstruments() {
    const len = this.readUChar();
    for (let id = 0; id < len; id += 1) {
      yield {
        id,
        name: this.readString(),
        file: this.readString(),
        pitch: this.readUChar(),
        pressKey: this.readUChar() === 1
      };
    }
  }
}, __name(_a4, "_Parser"), _a4);
__name2(_Parser, "Parser");
var Parser = _Parser;
async function parse(buf) {
  return new Parser(buf).parse();
}
__name(parse, "parse");
__name2(parse, "parse");
var CURRENT_NBS_VERSION = 5;
function buildInstrument(data) {
  return { pitch: 45, pressKey: true, ...data };
}
__name(buildInstrument, "buildInstrument");
__name2(buildInstrument, "buildInstrument");
function buildNote(data) {
  return { velocity: 100, panning: 0, pitch: 45, ...data };
}
__name(buildNote, "buildNote");
__name2(buildNote, "buildNote");
function buildLayer(data) {
  return { lock: false, volume: 100, panning: 0, ...data };
}
__name(buildLayer, "buildLayer");
__name2(buildLayer, "buildLayer");
function buildHeader(data) {
  return {
    version: CURRENT_NBS_VERSION,
    defaultInstruments: 16,
    songLength: 0,
    songLayers: 0,
    songName: "",
    songAuthor: "",
    originalAuthor: "",
    description: "",
    tempo: 10,
    autoSave: false,
    autoSaveDuration: 10,
    timeSignature: 4,
    minutesSpent: 0,
    leftClicks: 0,
    rightClicks: 0,
    blocksAdded: 0,
    blocksRemoved: 0,
    songOrigin: "",
    loop: false,
    maxLoopCount: 0,
    loopStart: 0,
    ...data
  };
}
__name(buildHeader, "buildHeader");
__name2(buildHeader, "buildHeader");
var BUILTIN_INSTRUMENTS = [
  buildInstrument({ id: 0, name: "Harp", file: "harp.ogg" }),
  buildInstrument({ id: 1, name: "Double Bass", file: "dbass.ogg" }),
  buildInstrument({ id: 2, name: "Bass Drum", file: "bdrum.ogg" }),
  buildInstrument({ id: 3, name: "Snare Drum", file: "sdrum.ogg" }),
  buildInstrument({ id: 4, name: "Click", file: "click.ogg" }),
  buildInstrument({ id: 5, name: "Guitar", file: "guitar.ogg" }),
  buildInstrument({ id: 6, name: "Flute", file: "flute.ogg" }),
  buildInstrument({ id: 7, name: "Bell", file: "bell.ogg" }),
  buildInstrument({ id: 8, name: "Chime", file: "icechime.ogg" }),
  buildInstrument({ id: 9, name: "Xylophone", file: "xylobone.ogg" }),
  buildInstrument({
    id: 10,
    name: "Iron Xylophone",
    file: "iron_xylophone.ogg"
  }),
  buildInstrument({ id: 11, name: "Cow Bell", file: "cow_bell.ogg" }),
  buildInstrument({ id: 12, name: "Didgeridoo", file: "didgeridoo.ogg" }),
  buildInstrument({ id: 13, name: "Bit", file: "bit.ogg" }),
  buildInstrument({ id: 14, name: "Banjo", file: "banjo.ogg" }),
  buildInstrument({ id: 15, name: "Pling", file: "pling.ogg" })
];
var _a5;
var _BasePlayer = (_a5 = class extends PlayerEventTarget {
  constructor(song, options) {
    super();
    this.song = song;
    this.volume = 0.8;
    this._playedTicks = 0;
    this._playedNotes = 0;
    this._lastTickTime = 0;
    this.instruments = [
      ...this.builtinInstruments.slice(0, song.header.defaultInstruments),
      ...song.instruments
    ];
    this.playNotes = this.buildPlayNotes(song);
  }
  /** 内置的音色列表，构建 {@link BasePlayer.instruments} 时使用 */
  get builtinInstruments() {
    return BUILTIN_INSTRUMENTS;
  }
  /** 是否正在播放 */
  get playing() {
    return !!this._playTask;
  }
  /** 歌曲长度 (tick) */
  get length() {
    return this.song.header.songLength + 1;
  }
  /** 歌曲 note 数 */
  get noteLength() {
    return this.song.notes.length;
  }
  /** 是否已播放到结尾 */
  get ended() {
    return this._playedTicks >= this.length;
  }
  get playedTicks() {
    return this._playedTicks;
  }
  /** 已播放的 note 数 */
  get playedNotes() {
    return this._playedNotes;
  }
  /** 构建单个 {@link IPlayNote} */
  buildSinglePlayNote(layer, note) {
    const finalPanning = (note.panning + layer.panning) / 2;
    const finalKey = note.key + (this.instruments[note.instrument].pitch - 45) + note.pitch / 100;
    const finalPitch = 2 ** ((finalKey - 45) / 12);
    return {
      instrument: note.instrument,
      velocity: note.velocity * layer.volume / 100 * this.volume,
      panning: finalPanning,
      pitch: finalPitch
    };
  }
  /** 构建 {@link IPlayNote} 列表 */
  buildPlayNotes(song) {
    const notes = new Array(song.header.songLayers).fill(void 0);
    for (let i = 0; i < song.notes.length; i += 1) {
      const note = song.notes[i];
      const { tick } = note;
      const layer = this.song.layers[note.layer];
      if (notes[tick] === void 0) notes[tick] = [];
      notes[tick].push(this.buildSinglePlayNote(layer, note));
    }
    return notes;
  }
  /** 获取指定 tick 区间的 note */
  getNotesBetween(start, end) {
    if (start === end && start > 0) return void 0;
    return this.playNotes.slice(start, end).filter((v) => v).flat();
  }
  /** 根据已经过的时间自增已播放的 tick 数 */
  tick() {
    const now = Date.now();
    const delta = now - this._lastTickTime;
    this._lastTickTime = now;
    const passedTicks = delta * this.song.header.tempo / 1e3;
    this._playedTicks += passedTicks;
    this.dispatchEvent(new PlayerEvent("tick", { passedTicks }));
    return passedTicks;
  }
  /** 执行 {@link BasePlayer.tick} 后返回当前需要播放的 note 列表 */
  async tickNotes() {
    const lastTick = Math.ceil(this._playedTicks);
    this.tick();
    const currentTick = Math.ceil(this._playedTicks);
    return this.getNotesBetween(lastTick, currentTick);
  }
  /** 执行 {@link BasePlayer.tickNotes} 后执行播放 */
  async tickPlay() {
    if (!this.playing) {
      return;
    }
    const notes = await this.tickNotes();
    if (notes && notes.length) {
      await Promise.all(notes.map((note) => this.playNote.bind(this)(note)));
      this._playedNotes += notes.length;
    }
    if (this.ended) {
      await this.stopPlay(false);
    }
  }
  /** 播放前的准备工作 */
  // eslint-disable-next-line class-methods-use-this
  async prepare() {
  }
  /** 启动播放任务，单独出来是为了方便继承类修改逻辑 */
  async startPlayTask() {
    this._playTask = setInterval(this.tickPlay.bind(this), 1);
  }
  /** 停止播放任务，单独出来是为了方便继承类修改逻辑 */
  async stopPlayTask() {
    clearInterval(this._playTask);
    this._playTask = void 0;
  }
  /** 开始或继续播放 */
  async startPlay(resetProgress = true) {
    if (this.playing) return;
    if (resetProgress || this.ended) await this.seek(0);
    await this.prepare();
    this._lastTickTime = Date.now();
    await this.startPlayTask();
    this.dispatchEvent(new PlayerEvent("play", { resetProgress }));
  }
  /** 暂停或停止播放 */
  async stopPlay(resetProgress = true) {
    const needDispatchEv = this.playing || resetProgress && this.playedTicks > 0;
    if (this.playing) await this.stopPlayTask();
    if (resetProgress) this.seek(0);
    if (needDispatchEv) this.dispatchEvent(new PlayerEvent("stop", { resetProgress }));
  }
  async play() {
    await this.startPlay();
  }
  async resume() {
    await this.startPlay(false);
  }
  async stop() {
    await this.stopPlay();
  }
  async pause() {
    await this.stopPlay(false);
  }
  /** 调整播放进度 */
  async seek(tick) {
    this._playedTicks = tick;
    this._playedNotes = tick ? this.getNotesBetween(0, tick)?.length || 0 : 0;
  }
}, __name(_a5, "_BasePlayer"), _a5);
__name2(_BasePlayer, "BasePlayer");
var BasePlayer = _BasePlayer;
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
__name(sleep, "sleep");
__name2(sleep, "sleep");
var _a6;
var _BasePlaylistFile = (_a6 = class {
  constructor(url, displayString = "") {
    this.url = url;
    this.displayString = displayString;
    if (!displayString) this.displayString = url.split("/").pop();
  }
  equals(other) {
    return this.url === other.url;
  }
}, __name(_a6, "_BasePlaylistFile"), _a6);
__name2(_BasePlaylistFile, "BasePlaylistFile");
var BasePlaylistFile = _BasePlaylistFile;
var LoopType = /* @__PURE__ */ ((LoopType2) => {
  LoopType2[LoopType2["None"] = 0] = "None";
  LoopType2[LoopType2["List"] = 1] = "List";
  LoopType2[LoopType2["Single"] = 2] = "Single";
  LoopType2[LoopType2["Shuffle"] = 3] = "Shuffle";
  return LoopType2;
})(LoopType || {});
var _a7;
var _BasePlaylist = (_a7 = class extends PlayerEventTarget {
  constructor(_fileList = [], options) {
    super();
    this._fileList = _fileList;
    this.delayTime = 1e3;
    this._loopType = 1;
    this._isPlaying = false;
    this._isPausing = false;
    this._playingIndex = 0;
    this._playTask = Promise.resolve();
  }
  get currentFileList() {
    return this._loopType === 3 ? this._shuffledList ?? this.newShuffledList() : this._fileList;
  }
  get fileList() {
    return this._fileList;
  }
  get length() {
    return this._fileList.length;
  }
  get isActive() {
    return this._isPlaying || this._isPausing;
  }
  get isPlaying() {
    return this._isPlaying;
  }
  get isPausing() {
    return this._isPausing;
  }
  get playingIndex() {
    return this._playingIndex;
  }
  get loopType() {
    return this._loopType;
  }
  get playingFile() {
    return this.currentFileList[this._playingIndex];
  }
  get playingPlayer() {
    return this._playingPlayer;
  }
  async extendFilesInner(targetList, files, index = -1) {
    if (index === -1) index = this.length;
    for (const f of files.reverse()) {
      const i = targetList.findIndex((v) => v.equals(f));
      if (i === -1) {
        targetList.splice(index, 0, f);
      } else {
        if (i === index) continue;
        if (i < index) index -= 1;
        this.changeIndexInner(i, index);
      }
    }
  }
  async extendFiles(files, index = -1) {
    const { playingFile } = this;
    await this.extendFilesInner(this.currentFileList, files, index);
    if (this._loopType === 3) {
      await this.extendFilesInner(this._fileList, files, -1);
    }
    const fi = this.currentFileList.indexOf(playingFile);
    if (fi !== -1) this._playingIndex = fi;
    this.dispatchEvent(new PlayerEvent("change", { list: this.currentFileList }));
  }
  addFile(file2, index = -1) {
    return this.extendFiles([file2], index);
  }
  async removeFilesInner(targetList, indexes) {
    for (const i of indexes) targetList.splice(i, 1);
  }
  async removeFiles(indexes) {
    const { playingFile } = this;
    const items = indexes.map((i) => this.currentFileList[i]);
    await this.removeFilesInner(this.currentFileList, indexes);
    if (this._loopType === 3) {
      await this.removeFilesInner(
        this._fileList,
        items.map((x) => this._fileList.indexOf(x))
      );
    }
    const newIndex = this.currentFileList.indexOf(playingFile);
    if (newIndex === -1) {
      this._playingIndex = 0;
      if (!this.length) await this.stop();
      else if (this.isActive) await this.flush();
    } else {
      this._playingIndex = newIndex;
    }
    this.dispatchEvent(new PlayerEvent("change", { list: this.currentFileList }));
  }
  removeFile(index) {
    return this.removeFiles([index]);
  }
  async changeIndexInner(old, now) {
    const [x] = this.currentFileList.splice(old, 1);
    this.currentFileList.splice(now, 0, x);
  }
  async changeIndex(old, now) {
    const { playingFile } = this;
    await this.changeIndexInner(old, now);
    this._playingIndex = this.currentFileList.indexOf(playingFile);
    this.dispatchEvent(new PlayerEvent("change", { list: this.currentFileList }));
  }
  async reset(newList = []) {
    this._shuffledList = void 0;
    this._playingIndex = 0;
    if (this._isPlaying) this.dispatchEvent(new PlayerEvent("stop"));
    await this.stopInner();
    this._fileList = newList;
    if (this._loopType === 3) this.newShuffledList();
    this.dispatchEvent(new PlayerEvent("change", { list: this.currentFileList }));
  }
  newShuffledList() {
    const li = [...this._fileList];
    this._shuffledList = li.sort(() => Math.random() - 0.5);
    return li;
  }
  async switchNext(manually = false) {
    if (this._playingIndex >= this.length - 1) {
      switch (this._loopType) {
        case 2:
          if (manually) this._playingIndex = 0;
          break;
        case 1:
          this._playingIndex = 0;
          break;
        case 3:
          this.newShuffledList();
          this._playingIndex = 0;
          break;
        default:
          throw new Error("No next");
      }
    } else if (this._loopType !== 2 || manually) {
      this._playingIndex += 1;
    } else {
      return;
    }
    this.dispatchEvent(new PlayerEvent("switch", { file: this.playingFile }));
  }
  async switchPrevious(manually = false) {
    if (this._playingIndex > 0) {
      this._playingIndex -= 1;
    } else if (manually || this._loopType === 3 || this._loopType === 1) {
      this._playingIndex = this.length - 1;
    } else {
      throw new Error("No previous");
    }
    this.dispatchEvent(new PlayerEvent("switch", { file: this.playingFile }));
  }
  async stopInner() {
    await this._stopFunc?.();
    this._isPlaying = false;
    await this._playTask;
  }
  async flush() {
    await this.stopInner();
    if (!this.length) return;
    let currentPlayer;
    const loadSong = /* @__PURE__ */ __name2(async () => {
      try {
        const song = await this.playingFile.read();
        currentPlayer = await this.createPlayer(song);
      } catch (e) {
        this.dispatchEvent(
          new PlayerEvent("error", {
            error: new Error(
              `Error when reading file ${this.playingFile.url}, skip and remove it from playlist (${e})`
            )
          })
        );
        this._playTask.then(this.removeFile.bind(this, this._playingIndex)).then(this.next.bind(this));
        return;
      }
      this._playingPlayer = currentPlayer;
      this._isPlaying = true;
      await this._playingPlayer.play();
      this._playTask.then(checkStop).then(switchNext);
    }, "loadSong");
    const checkStop = /* @__PURE__ */ __name2(() => new Promise((resolve) => {
      const clearState = /* @__PURE__ */ __name2(async () => {
        if (currentPlayer?.playing) await currentPlayer?.stop();
        if (currentPlayer === this._playingPlayer) {
          this._stopFunc = void 0;
          this._playingPlayer = void 0;
        }
      }, "clearState");
      this._playingPlayer?.addEventListener("tick", (e) => {
        if (e.target !== this._playingPlayer) return;
        this.dispatchEvent(new PlayerEvent("tick", { ...e.params, player: e.target }));
      });
      this._playingPlayer?.addEventListener("stop", async () => {
        if (this._isPausing) return;
        await sleep(this.delayTime);
        await clearState();
        resolve(void 0);
      });
      this._stopFunc = async () => {
        this._isPlaying = false;
        await clearState();
        resolve(void 0);
      };
    }), "checkStop");
    const switchNext = /* @__PURE__ */ __name2(async () => {
      if (!this._isPlaying) return;
      this._playTask.then(async () => {
        try {
          await this.switchNext();
          await this.flush();
        } catch (e) {
          this._isPlaying = false;
          this._playingIndex = -1;
          this.dispatchEvent(new PlayerEvent("switch", { file: void 0 }));
          this.dispatchEvent(new PlayerEvent("stop"));
        }
      });
    }, "switchNext");
    await this._playTask.then(loadSong);
  }
  switchLoopType(loopType) {
    if (this._loopType === loopType) return;
    const oldLoopType = this._loopType;
    this._loopType = loopType;
    this.dispatchEvent(new PlayerEvent("loopChange", { loopType }));
    if (loopType === 3) {
      this.newShuffledList();
      if (this._playingIndex !== -1) {
        this._playingIndex = this.currentFileList.indexOf(
          this._fileList[this._playingIndex]
        );
      }
      this.dispatchEvent(new PlayerEvent("change", { list: this.currentFileList }));
    } else if (oldLoopType === 3) {
      if (this._playingIndex !== -1 && this._shuffledList) {
        this._playingIndex = this.currentFileList.indexOf(
          this._shuffledList[this._playingIndex]
        );
      }
      this.dispatchEvent(new PlayerEvent("change", { list: this.currentFileList }));
    }
  }
  async play() {
    if (!this.length) throw new Error("Playlist is empty");
    if (this._playingIndex === -1) {
      this._playingIndex = 0;
      this.dispatchEvent(new PlayerEvent("switch", { file: this.playingFile }));
    }
    this._isPausing = false;
    await this.flush();
    this.dispatchEvent(new PlayerEvent("play"));
  }
  async pause() {
    if (!this._playingPlayer) throw new Error("Not playing");
    this._isPausing = true;
    await this._playingPlayer.pause();
    this.dispatchEvent(new PlayerEvent("pause"));
  }
  async resume() {
    if (!this._playingPlayer) throw new Error("Not playing");
    this._isPausing = false;
    await this._playingPlayer.resume();
    this.dispatchEvent(new PlayerEvent("resume"));
  }
  async stop() {
    this._isPausing = false;
    await this.stopInner();
    this.dispatchEvent(new PlayerEvent("stop"));
  }
  async next() {
    await this.switchNext(true);
    await this.flush();
  }
  async previous() {
    await this.switchPrevious(true);
    await this.flush();
  }
  async switchTo(index) {
    if (index < 0 || index >= this.length) {
      throw new Error(`Index out of range: ${index}`);
    }
    this._playingIndex = index;
    this.dispatchEvent(new PlayerEvent("switch", { file: this.playingFile }));
    await this.flush();
  }
}, __name(_a7, "_BasePlaylist"), _a7);
__name2(_BasePlaylist, "BasePlaylist");
var BasePlaylist = _BasePlaylist;

// src/player.ts
var import_form_api_ex2 = __toESM(require_FormAPIEx());

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
var _LLBasePlayer = class _LLBasePlayer extends BasePlayer {
  constructor(song, options) {
    super(song, options);
    this.lastBossBarPercent = -1;
    const { playerXuid } = options || {};
    if (!playerXuid) throw new Error("playerXuid is required");
    this.playerXuid = playerXuid;
  }
  // eslint-disable-next-line class-methods-use-this
  get builtinInstruments() {
    return BUILTIN_INSTRUMENTS.map((x) => ({
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
var _PlaylistFile = class _PlaylistFile extends BasePlaylistFile {
  async read() {
    const f = new file(`${NBS_PATH}/${this.url}`, file.ReadMode, true);
    let b;
    try {
      b = f.readAllSync();
    } finally {
      f.close();
    }
    const r = await parse(b);
    if (!r.header.songName) r.header.songName = this.displayString;
    return r;
  }
};
__name(_PlaylistFile, "PlaylistFile");
var PlaylistFile = _PlaylistFile;
var _Playlist = class _Playlist extends BasePlaylist {
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
  [LoopType.None]: "顺序播放",
  [LoopType.List]: "列表循环",
  [LoopType.Single]: "单曲循环",
  [LoopType.Shuffle]: "随机播放"
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
var import_form_api_ex5 = __toESM(require_FormAPIEx());

// src/gui/common.ts
var import_form_api_ex4 = __toESM(require_FormAPIEx());
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
var import_form_api_ex6 = __toESM(require_FormAPIEx());
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
var import_form_api_ex7 = __toESM(require_FormAPIEx());
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
var import_form_api_ex8 = __toESM(require_FormAPIEx());
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
