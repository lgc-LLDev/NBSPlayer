'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

const root =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof commonjsGlobal !== "undefined" && commonjsGlobal);

const shouldPolyfillEvent = (function() {
  try {
    new root.Event("");
  } catch (error) {
    return true;
  }
  return false;
})();

const shouldPolyfillEventTarget = (function() {
  try {
    new root.EventTarget();
  } catch (error) {
    return true;
  }
  return false;
})();

if (shouldPolyfillEvent) {
  root.Event = (function () {
    function Event(type, options) {
        this.bubbles = !!options && !!options.bubbles;
        this.cancelable = !!options && !!options.cancelable;
        this.composed = !!options && !!options.composed;
      this.type = type;
    }

    return Event;
  })();
}

if (shouldPolyfillEventTarget) {
  root.EventTarget = (function () {
    function EventTarget() {
      this.__listeners = new Map();
    }

    EventTarget.prototype = Object.create(Object.prototype);

    EventTarget.prototype.addEventListener = function (
      type,
      listener,
      options
    ) {
      if (arguments.length < 2) {
        throw new TypeError(
          "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
        );
      }
      const __listeners = this.__listeners;
      const actualType = type.toString();
      if (!__listeners.has(actualType)) {
        __listeners.set(actualType, new Map());
      }
      const listenersForType = __listeners.get(actualType);
      if (!listenersForType.has(listener)) {
        // Any given listener is only registered once
        listenersForType.set(listener, options);
      }
    };

    EventTarget.prototype.removeEventListener = function (
      type,
      listener,
      _options
    ) {
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

    EventTarget.prototype.dispatchEvent = function (event) {
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
              // Listener functions must be executed with the EventTarget as the `this` context.
              listener.call(this, event);
            } else if (listener && typeof listener.handleEvent === "function") {
              // Listener objects have their handleEvent method called, if they have one
              listener.handleEvent(event);
            }
          } catch (err) {
            // We need to report the error to the global error handling event,
            // but we do not want to break the loop that is executing the events.
            // Unfortunately, this is the best we can do, which isn't great, because the
            // native EventTarget will actually do this synchronously before moving to the next
            // event in the loop.
            setTimeout(() => {
              throw err;
            });
          }
          if (options && options.once) {
            // If this was registered with { once: true }, we need
            // to remove it now.
            listenersForType.delete(listener);
          }
        }
      }
      // Since there are no cancellable events on a base EventTarget,
      // this should always return true.
      return true;
    };

    return EventTarget;
  })();
}

(function(r){function x(){}function y(){}var z=String.fromCharCode,v={}.toString,A=v.call(r.SharedArrayBuffer),B=v(),q=r.Uint8Array,t=q||Array,w=q?ArrayBuffer:t,C=w.isView||function(g){return g&&"length"in g},D=v.call(w.prototype);w=y.prototype;var E=r.TextEncoder,a=new (q?Uint16Array:t)(32);x.prototype.decode=function(g){if(!C(g)){var l=v.call(g);if(l!==D&&l!==A&&l!==B)throw TypeError("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
g=q?new t(g):g||[];}for(var f=l="",b=0,c=g.length|0,u=c-32|0,e,d,h=0,p=0,m,k=0,n=-1;b<c;){for(e=b<=u?32:c-b|0;k<e;b=b+1|0,k=k+1|0){d=g[b]&255;switch(d>>4){case 15:m=g[b=b+1|0]&255;if(2!==m>>6||247<d){b=b-1|0;break}h=(d&7)<<6|m&63;p=5;d=256;case 14:m=g[b=b+1|0]&255,h<<=6,h|=(d&15)<<6|m&63,p=2===m>>6?p+4|0:24,d=d+256&768;case 13:case 12:m=g[b=b+1|0]&255,h<<=6,h|=(d&31)<<6|m&63,p=p+7|0,b<c&&2===m>>6&&h>>p&&1114112>h?(d=h,h=h-65536|0,0<=h&&(n=(h>>10)+55296|0,d=(h&1023)+56320|0,31>k?(a[k]=n,k=k+1|0,n=-1):
(m=n,n=d,d=m))):(d>>=8,b=b-d-1|0,d=65533),h=p=0,e=b<=u?32:c-b|0;default:a[k]=d;continue;case 11:case 10:case 9:case 8:}a[k]=65533;}f+=z(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29],a[30],a[31]);32>k&&(f=f.slice(0,k-32|0));if(b<c){if(a[0]=n,k=~n>>>31,n=-1,f.length<l.length)continue}else -1!==n&&(f+=z(n));l+=f;f="";}return l};w.encode=function(g){g=void 0===g?"":""+g;var l=g.length|
0,f=new t((l<<1)+8|0),b,c=0,u=!q;for(b=0;b<l;b=b+1|0,c=c+1|0){var e=g.charCodeAt(b)|0;if(127>=e)f[c]=e;else {if(2047>=e)f[c]=192|e>>6;else {a:{if(55296<=e)if(56319>=e){var d=g.charCodeAt(b=b+1|0)|0;if(56320<=d&&57343>=d){e=(e<<10)+d-56613888|0;if(65535<e){f[c]=240|e>>18;f[c=c+1|0]=128|e>>12&63;f[c=c+1|0]=128|e>>6&63;f[c=c+1|0]=128|e&63;continue}break a}e=65533;}else 57343>=e&&(e=65533);!u&&b<<1<c&&b<<1<(c-7|0)&&(u=!0,d=new t(3*l),d.set(f),f=d);}f[c]=224|e>>12;f[c=c+1|0]=128|e>>6&63;}f[c=c+1|0]=128|e&63;}}return q?
f.subarray(0,c):f.slice(0,c)};E||(r.TextDecoder=x,r.TextEncoder=y);})(""+void 0==typeof commonjsGlobal?""+void 0==typeof self?commonjsGlobal:self:commonjsGlobal);//AnonyCo

var version$1 = "2.0.0";
var description = "Play NBS files in MCBE with LL";

const PLUGIN_NAME = 'NBSPlayer';
const PLUGIN_VERSION = (version$1.split('.').map((v) => Number(v)));
const PLUGIN_DESCRIPTION = description;
const PLUGIN_EXTRA = { Author: 'student_2333', License: 'Apache-2.0' };
const BASE_PATH = `./plugins/${PLUGIN_NAME}`;
const NBS_PATH = `${BASE_PATH}/nbs`;
const DATA_PATH = `${BASE_PATH}/data`;
const DATA_PLAYLIST_PATH = `${DATA_PATH}/playlist`;
const DATA_HISTORY_PATH = `${DATA_PATH}/history`;
[BASE_PATH, NBS_PATH, DATA_PATH, DATA_PLAYLIST_PATH, DATA_HISTORY_PATH].forEach((x) => {
    if (!file.exists(x))
        file.mkdir(x);
});
logger.setTitle(PLUGIN_NAME);

var version = "0.5.2";

const NAME = 'FormAPIEx';
(version.split('.').map((v) => Number(v)));
const FormClose = Symbol(`${NAME}_FormClose`);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * 格式化错误堆栈
 * @param e 错误对象
 * @returns 格式化后的错误
 */
function formatError(e) {
    return e instanceof Error ? `${e.message}\n${e.stack}` : String(e);
}
/**
 * 使用 json 序列化及反序列化深复制对象
 * @param obj 对象
 * @returns 复制后对象
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function sendFormAsync(player, form) {
    return new Promise((resolve) => {
        player.sendForm(form, (_, data) => setTimeout(() => resolve(data === null || data === undefined ? FormClose : data), 0));
    });
}

var _CustomFormEx_objects;
/**
 * 使用 CustomFormObject 构建自定义表单对象
 * @param formTitle 表单标题
 * @param objects 表单元素
 * @returns 构建好的表单
 */
function buildCustomForm(formTitle, objects) {
    const form = mc.newCustomForm();
    form.setTitle(formTitle);
    for (const obj of objects) {
        switch (obj.type) {
            case 'label': {
                form.addLabel(obj.text);
                break;
            }
            case 'input': {
                const { title, placeholder, defaultVal } = obj;
                form.addInput(title, placeholder ?? '', defaultVal ?? '');
                break;
            }
            case 'switch': {
                const { title, defaultVal } = obj;
                form.addSwitch(title, defaultVal ?? false);
                break;
            }
            case 'dropdown': {
                const { title, items, defaultVal } = obj;
                form.addDropdown(title, items, defaultVal ?? 0);
                break;
            }
            case 'slider': {
                const { title, min, max, step, defaultVal } = obj;
                form.addSlider(title, min, max, step ?? 1, defaultVal ?? min);
                break;
            }
            case 'stepSlider': {
                const { title, items, defaultVal } = obj;
                form.addStepSlider(title, items, defaultVal ?? 0);
                break;
            }
            // no default
        }
    }
    return form;
}
class CustomFormEx {
    /**
     * @param title 表单标题
     */
    constructor(title = '') {
        /** 表单标题 */
        this.title = '';
        _CustomFormEx_objects.set(this, []);
        this.title = title;
    }
    /**
     * 获取表单元素列表
     */
    get objects() {
        return deepClone(__classPrivateFieldGet(this, _CustomFormEx_objects, "f"));
    }
    /**
     * 获取表单元素数量
     */
    get length() {
        return __classPrivateFieldGet(this, _CustomFormEx_objects, "f").length;
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
        __classPrivateFieldGet(this, _CustomFormEx_objects, "f").push([id, obj]);
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
        __classPrivateFieldGet(this, _CustomFormEx_objects, "f").unshift([id, obj]);
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
        __classPrivateFieldGet(this, _CustomFormEx_objects, "f").splice(index, 0, [id, obj]);
        return this;
    }
    // remove object
    /**
     * 删除表单元素
     * @param id 元素 id
     * @returns 自身，便于链式调用
     */
    remove(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _CustomFormEx_objects, "f").length; i += 1) {
            const [objId] = __classPrivateFieldGet(this, _CustomFormEx_objects, "f")[i];
            if (objId === id) {
                __classPrivateFieldGet(this, _CustomFormEx_objects, "f").splice(i, 1);
                break;
            }
        }
        return this;
    }
    get(id) {
        if (typeof id === 'number')
            return __classPrivateFieldGet(this, _CustomFormEx_objects, "f")[id];
        for (const [objId, val] of __classPrivateFieldGet(this, _CustomFormEx_objects, "f")) {
            if (objId === id)
                return val;
        }
        return null;
    }
    addLabel(arg1, arg2) {
        const id = arg2 ? arg1 : undefined;
        const text = arg2 ?? arg1;
        return this.push(id, { type: 'label', text });
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
            type: 'input',
            title,
            placeholder,
            defaultVal,
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
        return this.push(id, { type: 'switch', title, defaultVal });
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
        return this.push(id, { type: 'dropdown', title, items, defaultVal });
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
        return this.push(id, { type: 'slider', title, min, max, step, defaultVal });
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
        return this.push(id, { type: 'stepSlider', title, items, defaultVal });
    }
    // send
    parseReturn(data) {
        const res = {};
        for (let i = 0; i < data.length; i += 1) {
            const [id] = __classPrivateFieldGet(this, _CustomFormEx_objects, "f")[i];
            const val = data[i] ?? undefined;
            if (id)
                res[id] = val;
        }
        return res;
    }
    /**
     * 异步向玩家发送该表单
     * @param player 玩家对象
     * @returns 返回结果，玩家关闭表单或发送失败返回 FormClose
     */
    async sendAsync(player) {
        const data = await sendFormAsync(player, buildCustomForm(this.title, this.objects.map((v) => v[1])));
        if (data === FormClose)
            return FormClose;
        return this.parseReturn(data);
    }
}
_CustomFormEx_objects = new WeakMap();

/**
 * 异步向玩家发送模式表单
 * @param player 玩家对象
 * @param title 表单标题
 * @param content 表单内容
 * @param confirmButton 确认按钮标题
 * @param cancelButton 取消按钮标题
 * @returns 玩家选择的按钮
 */
function sendModalFormAsync(player, title, content, confirmButton = '§a确认', cancelButton = '§c取消') {
    // 不知道怎么回事按取消会返回 null / undefined，干脆直接转 boolean
    return new Promise((resolve) => {
        player.sendModalForm(title, content, confirmButton, cancelButton, (_, data) => setTimeout(() => resolve(!!data), 0));
    });
}

class SimpleFormAsync {
    /**
     * @param options 附加选项
     */
    constructor(options = {}) {
        /** 表单标题 */
        this.title = '';
        /** 表单内容 */
        this.content = '';
        /** 表单按钮 `[ text, image ]` */
        this.buttons = [];
        const { title, content, buttons } = options;
        if (title)
            this.title = title;
        if (content)
            this.content = content;
        if (buttons)
            this.buttons = buttons;
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
        const form = mc
            .newSimpleForm()
            .setTitle(this.title)
            .setContent(this.content);
        this.buttons.forEach(([text, image]) => {
            if (image)
                form.addButton(text, image);
            else
                form.addButton(text);
        });
        return sendFormAsync(player, form);
    }
}

class SimpleFormEx {
    /**
     * @param buttons 表单按钮参数
     */
    constructor(buttons = []) {
        /** 表单标题 */
        this.title = '';
        /**
         * 表单内容
         *
         * 可用变量
         * - `{{currentPage}}` - 当前页数
         * - `{{maxPage}}` - 最大页数
         * - `{{count}}` - 条目总数
         */
        this.content = '§a第 §e{{currentPage}} §f/ §6{{maxPage}} §a页 §7| §a共 §e{{count}} §a条';
        /** 表单按钮参数列表 */
        this.buttons = [];
        /**
         * 表单按钮格式化函数
         * @param v 表单按钮对应的参数
         * @param index 按钮对应的位置
         * @param array 整个表单按钮参数列表
         * @returns 格式化后的按钮 `[ text, image ]`
         */
        // eslint-disable-next-line class-methods-use-this
        this.formatter = (v) => [`§3${String(v)}`];
        /** 表单是否可翻页 */
        this.canTurnPage = false;
        /** 表单是否显示跳页按钮 */
        this.canJumpPage = false;
        /** 表单每页最大项目数 */
        this.maxPageNum = 15;
        /** 表单是否显示搜索按钮 */
        this.hasSearchButton = false;
        // eslint-disable-next-line class-methods-use-this
        /**
         * 表单按钮搜索函数
         * @param buttons 整个表单按钮参数列表
         * @param param 搜索关键词参数
         * @returns 搜索到的按钮参数列表
         */
        this.searcher = (buttons, param) => {
            const params = param.toLowerCase().split(/\s/g);
            const formatted = this.formatButtons(buttons).map((v) => v[0].toLowerCase());
            const result = [];
            for (const it of formatted) {
                const score = params.reduce((acc, cur) => acc + (it.includes(cur) ? 1 : 0), 0);
                if (score)
                    result.push([score, buttons[formatted.indexOf(it)]]);
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
        return this.canTurnPage
            ? Math.ceil(this.buttons.length / this.maxPageNum)
            : 1;
    }
    /**
     * 获取对应页数的按钮参数列表
     * @param page 页码
     * @returns 按钮参数列表
     */
    getPage(page = 1) {
        if (page > this.getMaxPageNum())
            return [];
        return this.buttons.slice((page - 1) * this.maxPageNum, page * this.maxPageNum);
    }
    /**
     * 异步向玩家发送搜索表单
     * @param player 玩家对象
     * @param defaultVal 搜索框默认内容
     * @returns 选择的搜索结果按钮参数。返回 null 为没搜到, FormClose 为取消搜索
     */
    async sendSearchForm(player, defaultVal = '') {
        const form = new CustomFormEx(this.title);
        const res = await form
            .addInput('param', '请输入你要搜索的内容', { default: defaultVal })
            .sendAsync(player);
        if (res === FormClose)
            return FormClose;
        const searched = this.searcher(this.buttons, res.param);
        if (!searched.length) {
            await new SimpleFormAsync({
                title: this.title,
                content: '§6没有搜索到结果',
            }).sendAsync(player);
            return null;
        }
        const searchForm = new SimpleFormEx();
        searchForm.title = this.title;
        searchForm.content = `§a为您找到了 §l§6${searched.length} §r§a个结果\n${searchForm.content}`;
        searchForm.buttons = searched;
        searchForm.formatter = this.formatter;
        searchForm.canTurnPage = this.canTurnPage;
        searchForm.canJumpPage = this.canJumpPage;
        searchForm.maxPageNum = this.maxPageNum;
        searchForm.hasSearchButton = false;
        const selected = await searchForm.sendAsync(player);
        return selected === FormClose ? FormClose : selected;
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
        if (hasPreviousPage)
            formattedButtons.unshift(['§2<- 上一页']);
        if (hasJumpBtn)
            formattedButtons.unshift(['§1跳页']);
        if (this.hasSearchButton)
            formattedButtons.unshift(['§1搜索']);
        if (hasNextPage)
            formattedButtons.push(['§2下一页 ->']);
        const formatContent = (content) => {
            const count = this.buttons.length;
            const formatMap = {
                currentPage: page,
                maxPage,
                count,
            };
            for (const [key, val] of Object.entries(formatMap)) {
                content = content.replaceAll(`{{${key}}}`, String(val));
            }
            return content;
        };
        const resultIndex = await new SimpleFormAsync({
            title: this.title,
            content: formatContent(this.content),
            buttons: formattedButtons,
        }).sendAsync(player);
        if (resultIndex === FormClose)
            return FormClose;
        let offset = 0;
        if (this.hasSearchButton) {
            if (resultIndex === offset) {
                const res = await this.sendSearchForm(player);
                return res === null || res === FormClose
                    ? this.sendAsync(player, page)
                    : res;
            }
            offset += 1;
        }
        if (hasJumpBtn) {
            if (resultIndex === offset) {
                const res = await new CustomFormEx(this.title)
                    .addSlider('num', '请选择你要跳转的页数', 1, maxPage, {
                    default: page,
                })
                    .sendAsync(player);
                return this.sendAsync(player, res === FormClose ? page : res.num);
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
}

class SimpleFormOperational {
    constructor(title = '', content = '', buttons = []) {
        this.title = title;
        this.content = content;
        this.buttons = buttons;
    }
    async sendAsync(player) {
        const form = new SimpleFormEx(this.buttons);
        form.title = this.title;
        form.content = this.content;
        form.formatter = ({ text, image }) => [text, image];
        const res = await form.sendAsync(player);
        if (res === FormClose)
            return FormClose;
        return res.operation();
    }
}

function logErr(err) {
    logger.error(formatError(err));
}
const ticker = new (class {
    constructor() {
        this.callbacks = [];
        this.calling = false;
        mc.listen('onTick', () => {
            this.trigger().catch(logErr);
        });
    }
    add(callback) {
        this.callbacks.push(callback);
        return this.remove.bind(this, callback);
    }
    remove(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index !== -1)
            this.callbacks.splice(index, 1);
    }
    async trigger() {
        if (this.calling)
            return;
        this.calling = true;
        await Promise.all(this.callbacks.map((x) => x()));
        this.calling = false;
    }
})();

class PlayerEvent extends Event {
    constructor(type, eventInitDict) {
        const { bubbles, cancelable, composed, ...rest } = eventInitDict || {};
        super(type, { bubbles, cancelable, composed });
        this.params = rest;
    }
}
class PlayerEventTarget extends EventTarget {
    addEventListener(type, callback, options) {
        super.addEventListener(type, callback, options);
    }
    removeEventListener(type, callback, options) {
        super.removeEventListener(type, callback, options);
    }
}

async function arrFromAsync(iterable) {
    const arr = [];
    for await (const item of iterable)
        arr.push(item);
    return arr;
}
/** NBS 文件解析器 */
class Parser {
    constructor(buf) {
        this.buf = buf;
        this.offset = 0x0;
        this.view = new DataView(buf);
    }
    async parse() {
        const header = await this.parseHeader();
        const { version, songLayers } = header;
        const notes = await arrFromAsync(this.parseNotes(version));
        const layers = await arrFromAsync(this.parseLayers(songLayers, version));
        const instruments = await arrFromAsync(this.parseInstruments());
        this.offset = 0x0;
        return { header, notes, layers, instruments };
    }
    readUChar() {
        const value = this.view.getUint8(this.offset);
        this.offset += 0x1;
        return value;
    }
    readUShort() {
        const value = this.view.getUint16(this.offset, true);
        this.offset += 0x2;
        return value;
    }
    readShort() {
        const value = this.view.getInt16(this.offset, true);
        this.offset += 0x2;
        return value;
    }
    readUInt() {
        const value = this.view.getUint32(this.offset, true);
        this.offset += 0x4;
        return value;
    }
    readString() {
        const length = this.readUInt();
        const value = new TextDecoder('cp1252').decode(this.buf.slice(this.offset, this.offset + length));
        this.offset += length;
        return value;
    }
    async parseHeader() {
        const songLength = this.readUShort();
        const version = songLength === 0 ? this.readUChar() : 0;
        return {
            version,
            defaultInstruments: version > 0 ? this.readUChar() : 10,
            songLength: version >= 3 ? this.readUShort() : songLength,
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
            loop: version >= 4 ? this.readUChar() === 1 : false,
            maxLoopCount: version >= 4 ? this.readUChar() : 0,
            loopStart: version >= 4 ? this.readUShort() : 0,
        };
    }
    async *jump() {
        let value = -1;
        for (;;) {
            const jump = this.readUShort();
            if (jump === 0)
                break;
            value += jump;
            yield value;
        }
    }
    async *parseNotes(version) {
        for await (const currentTick of this.jump()) {
            for await (const currentLayer of this.jump()) {
                yield {
                    tick: currentTick,
                    layer: currentLayer,
                    instrument: this.readUChar(),
                    key: this.readUChar(),
                    velocity: version >= 4 ? this.readUChar() : 100,
                    panning: version >= 4 ? this.readUChar() - 100 : 0,
                    pitch: version >= 4 ? this.readShort() : 0,
                };
            }
        }
    }
    async *parseLayers(layerCount, version) {
        for (let id = 0; id < layerCount; id += 1) {
            yield {
                id,
                name: this.readString(),
                lock: version >= 4 ? this.readUChar() === 1 : false,
                volume: this.readUChar(),
                panning: version >= 2 ? this.readUChar() - 100 : 0,
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
                pressKey: this.readUChar() === 1,
            };
        }
    }
}
async function parse(buf) {
    return new Parser(buf).parse();
}

function buildInstrument(data) {
    return { pitch: 45, pressKey: true, ...data };
}

/** 默认内置的音色列表 */
const BUILTIN_INSTRUMENTS = [
    buildInstrument({ id: 0, name: 'Harp', file: 'harp.ogg' }),
    buildInstrument({ id: 1, name: 'Double Bass', file: 'dbass.ogg' }),
    buildInstrument({ id: 2, name: 'Bass Drum', file: 'bdrum.ogg' }),
    buildInstrument({ id: 3, name: 'Snare Drum', file: 'sdrum.ogg' }),
    buildInstrument({ id: 4, name: 'Click', file: 'click.ogg' }),
    buildInstrument({ id: 5, name: 'Guitar', file: 'guitar.ogg' }),
    buildInstrument({ id: 6, name: 'Flute', file: 'flute.ogg' }),
    buildInstrument({ id: 7, name: 'Bell', file: 'bell.ogg' }),
    buildInstrument({ id: 8, name: 'Chime', file: 'icechime.ogg' }),
    buildInstrument({ id: 9, name: 'Xylophone', file: 'xylobone.ogg' }),
    buildInstrument({
        id: 10,
        name: 'Iron Xylophone',
        file: 'iron_xylophone.ogg',
    }),
    buildInstrument({ id: 11, name: 'Cow Bell', file: 'cow_bell.ogg' }),
    buildInstrument({ id: 12, name: 'Didgeridoo', file: 'didgeridoo.ogg' }),
    buildInstrument({ id: 13, name: 'Bit', file: 'bit.ogg' }),
    buildInstrument({ id: 14, name: 'Banjo', file: 'banjo.ogg' }),
    buildInstrument({ id: 15, name: 'Pling', file: 'pling.ogg' }),
];
/** NBS 播放器基类 */
class BasePlayer extends PlayerEventTarget {
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
        /** 已播放的 tick 数 */
        return this._playedTicks;
    }
    /** 已播放的 note 数 */
    get playedNotes() {
        return this._playedNotes;
    }
    constructor(song, options) {
        super();
        this.song = song;
        /** 音量，范围应为 `0` ~ `1` */
        this.volume = 0.8;
        /** 已播放的 tick 数，内部计数用，不暴露 */
        this._playedTicks = 0;
        /** 已播放的 note 数，内部计数用，不暴露 */
        this._playedNotes = 0;
        /** 上一次执行 {@link BasePlayer.tick} 的时间 */
        this._lastTickTime = 0;
        this.instruments = [
            ...this.builtinInstruments.slice(0, song.header.defaultInstruments),
            ...song.instruments,
        ];
        this.playNotes = this.buildPlayNotes(song);
    }
    /** 构建单个 {@link IPlayNote} */
    buildSinglePlayNote(layer, note) {
        const finalPanning = (note.panning + layer.panning) / 2;
        const finalKey = note.key +
            (this.instruments[note.instrument].pitch - 45) +
            note.pitch / 100;
        const finalPitch = 2 ** ((finalKey - 45) / 12);
        return {
            instrument: note.instrument,
            velocity: ((note.velocity * layer.volume) / 100) * this.volume,
            panning: finalPanning,
            pitch: finalPitch,
        };
    }
    /** 构建 {@link IPlayNote} 列表 */
    buildPlayNotes(song) {
        const notes = new Array(song.header.songLayers).fill(undefined);
        for (let i = 0; i < song.notes.length; i += 1) {
            const note = song.notes[i];
            const { tick } = note;
            const layer = this.song.layers[note.layer];
            if (notes[tick] === undefined)
                notes[tick] = [];
            notes[tick].push(this.buildSinglePlayNote(layer, note));
        }
        return notes;
    }
    /** 获取指定 tick 区间的 note */
    getNotesBetween(start, end) {
        if (start === end && start > 0)
            return undefined;
        return this.playNotes
            .slice(start, end)
            .filter((v) => v)
            .flat();
    }
    /** 根据已经过的时间自增已播放的 tick 数 */
    tick() {
        const now = Date.now();
        const delta = now - this._lastTickTime;
        this._lastTickTime = now;
        const passedTicks = (delta * this.song.header.tempo) / 1000;
        this._playedTicks += passedTicks;
        this.dispatchEvent(new PlayerEvent('tick', { passedTicks }));
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
            // await this.stopPlay();
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
    async prepare() { }
    /** 启动播放任务，单独出来是为了方便继承类修改逻辑 */
    async startPlayTask() {
        this._playTask = setInterval(this.tickPlay.bind(this), 1);
    }
    /** 停止播放任务，单独出来是为了方便继承类修改逻辑 */
    async stopPlayTask() {
        clearInterval(this._playTask);
        this._playTask = undefined;
    }
    /** 开始或继续播放 */
    async startPlay(resetProgress = true) {
        if (this.playing)
            return;
        if (resetProgress || this.ended)
            await this.seek(0);
        await this.prepare();
        this._lastTickTime = Date.now();
        await this.startPlayTask();
        this.dispatchEvent(new PlayerEvent('play', { resetProgress }));
    }
    /** 暂停或停止播放 */
    async stopPlay(resetProgress = true) {
        const needDispatchEv = this.playing || (resetProgress && this.playedTicks > 0);
        if (this.playing)
            await this.stopPlayTask();
        if (resetProgress)
            this.seek(0);
        if (needDispatchEv)
            this.dispatchEvent(new PlayerEvent('stop', { resetProgress }));
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
}

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class BasePlaylistFile {
    constructor(url, displayString = '') {
        this.url = url;
        this.displayString = displayString;
        if (!displayString)
            this.displayString = url.split('/').pop();
    }
    equals(other) {
        return this.url === other.url;
    }
}
var LoopType;
(function (LoopType) {
    /** 顺序播放 */
    LoopType[LoopType["None"] = 0] = "None";
    /** 列表循环 */
    LoopType[LoopType["List"] = 1] = "List";
    /** 单曲循环 */
    LoopType[LoopType["Single"] = 2] = "Single";
    /** 随机播放 */
    LoopType[LoopType["Shuffle"] = 3] = "Shuffle";
})(LoopType || (LoopType = {}));
class BasePlaylist extends PlayerEventTarget {
    constructor(_fileList = [], options) {
        super();
        this._fileList = _fileList;
        this.delayTime = 1000;
        this._loopType = LoopType.List;
        /** 是否正在播放，内部用 */
        this._isPlaying = false;
        /** 是否正在暂停，内部用 */
        this._isPausing = false;
        this._playingIndex = 0;
        this._playTask = Promise.resolve();
    }
    get currentFileList() {
        return this._loopType === LoopType.Shuffle
            ? this._shuffledList ?? this.newShuffledList()
            : this._fileList;
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
        if (index === -1)
            index = this.length;
        for (const f of files.reverse()) {
            const i = targetList.findIndex((v) => v.equals(f));
            if (i === -1) {
                targetList.splice(index, 0, f);
            }
            else {
                if (i === index)
                    continue;
                if (i < index)
                    index -= 1;
                this.changeIndexInner(i, index);
            }
        }
    }
    async extendFiles(files, index = -1) {
        const { playingFile } = this;
        await this.extendFilesInner(this.currentFileList, files, index);
        if (this._loopType === LoopType.Shuffle) {
            await this.extendFilesInner(this._fileList, files, -1);
        }
        const fi = this.currentFileList.indexOf(playingFile);
        if (fi !== -1)
            this._playingIndex = fi;
        this.dispatchEvent(new PlayerEvent('change', { list: this.currentFileList }));
    }
    addFile(file, index = -1) {
        return this.extendFiles([file], index);
    }
    async removeFilesInner(targetList, indexes) {
        for (const i of indexes)
            targetList.splice(i, 1);
    }
    async removeFiles(indexes) {
        const { playingFile } = this;
        const items = indexes.map((i) => this.currentFileList[i]);
        await this.removeFilesInner(this.currentFileList, indexes);
        if (this._loopType === LoopType.Shuffle) {
            await this.removeFilesInner(this._fileList, items.map((x) => this._fileList.indexOf(x)));
        }
        const newIndex = this.currentFileList.indexOf(playingFile);
        if (newIndex === -1) {
            this._playingIndex = 0;
            if (!this.length)
                await this.stop();
            else if (this.isActive)
                await this.flush();
        }
        else {
            this._playingIndex = newIndex;
        }
        this.dispatchEvent(new PlayerEvent('change', { list: this.currentFileList }));
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
        this.dispatchEvent(new PlayerEvent('change', { list: this.currentFileList }));
    }
    async reset(newList = []) {
        this._shuffledList = undefined;
        this._playingIndex = 0;
        if (this._isPlaying)
            this.dispatchEvent(new PlayerEvent('stop'));
        await this.stopInner();
        this._fileList = newList;
        if (this._loopType === LoopType.Shuffle)
            this.newShuffledList();
        this.dispatchEvent(new PlayerEvent('change', { list: this.currentFileList }));
    }
    newShuffledList() {
        const li = [...this._fileList];
        this._shuffledList = li.sort(() => Math.random() - 0.5);
        return li;
    }
    async switchNext(manually = false) {
        if (this._playingIndex >= this.length - 1) {
            switch (this._loopType) {
                case LoopType.Single:
                    if (manually)
                        this._playingIndex = 0;
                    break;
                case LoopType.List:
                    this._playingIndex = 0;
                    break;
                case LoopType.Shuffle:
                    this.newShuffledList();
                    this._playingIndex = 0;
                    break;
                default: // None
                    throw new Error('No next');
            }
        }
        else if (this._loopType !== LoopType.Single || manually) {
            this._playingIndex += 1;
        }
        else {
            return;
        }
        this.dispatchEvent(new PlayerEvent('switch', { file: this.playingFile }));
    }
    async switchPrevious(manually = false) {
        if (this._playingIndex > 0) {
            this._playingIndex -= 1;
        }
        else if (manually ||
            this._loopType === LoopType.Shuffle ||
            this._loopType === LoopType.List) {
            this._playingIndex = this.length - 1;
        }
        else {
            throw new Error('No previous');
        }
        this.dispatchEvent(new PlayerEvent('switch', { file: this.playingFile }));
    }
    async stopInner() {
        await this._stopFunc?.();
        this._isPlaying = false; // 保险
        await this._playTask;
    }
    async flush() {
        await this.stopInner();
        if (!this.length)
            return;
        let currentPlayer;
        const loadSong = async () => {
            try {
                const song = await this.playingFile.read();
                currentPlayer = await this.createPlayer(song);
            }
            catch (e) {
                this.dispatchEvent(new PlayerEvent('error', {
                    error: new Error(`Error when reading file ${this.playingFile.url}, ` +
                        `skip and remove it from playlist (${e})`),
                }));
                this._playTask
                    .then(this.removeFile.bind(this, this._playingIndex))
                    .then(this.next.bind(this));
                return;
            }
            this._playingPlayer = currentPlayer;
            this._isPlaying = true;
            await this._playingPlayer.play();
            this._playTask.then(checkStop).then(switchNext);
        };
        const checkStop = () => new Promise((resolve) => {
            const clearState = async () => {
                if (currentPlayer?.playing)
                    await currentPlayer?.stop();
                if (currentPlayer === this._playingPlayer) {
                    this._stopFunc = undefined;
                    this._playingPlayer = undefined;
                }
            };
            this._playingPlayer?.addEventListener('tick', (e) => {
                if (e.target !== this._playingPlayer)
                    return;
                this.dispatchEvent(new PlayerEvent('tick', { ...e.params, player: e.target }));
            });
            this._playingPlayer?.addEventListener('stop', async () => {
                if (this._isPausing)
                    return;
                await sleep(this.delayTime);
                await clearState();
                resolve(undefined);
            });
            this._stopFunc = async () => {
                this._isPlaying = false;
                await clearState();
                resolve(undefined);
            };
        });
        const switchNext = async () => {
            if (!this._isPlaying)
                return;
            this._playTask.then(async () => {
                try {
                    await this.switchNext();
                    await this.flush();
                }
                catch (e) {
                    // no next
                    this._isPlaying = false;
                    this._playingIndex = -1;
                    this.dispatchEvent(new PlayerEvent('switch', { file: undefined }));
                    this.dispatchEvent(new PlayerEvent('stop'));
                }
            });
        };
        await this._playTask.then(loadSong);
    }
    switchLoopType(loopType) {
        if (this._loopType === loopType)
            return;
        const oldLoopType = this._loopType;
        this._loopType = loopType;
        this.dispatchEvent(new PlayerEvent('loopChange', { loopType }));
        if (loopType === LoopType.Shuffle) {
            this.newShuffledList();
            if (this._playingIndex !== -1)
                this._playingIndex = this.currentFileList.indexOf(this._fileList[this._playingIndex]);
            this.dispatchEvent(new PlayerEvent('change', { list: this.currentFileList }));
        }
        else if (oldLoopType === LoopType.Shuffle) {
            if (this._playingIndex !== -1 && this._shuffledList)
                this._playingIndex = this.currentFileList.indexOf(this._shuffledList[this._playingIndex]);
            this.dispatchEvent(new PlayerEvent('change', { list: this.currentFileList }));
        }
    }
    async play() {
        if (!this.length)
            throw new Error('Playlist is empty');
        if (this._playingIndex === -1) {
            this._playingIndex = 0;
            this.dispatchEvent(new PlayerEvent('switch', { file: this.playingFile }));
        }
        this._isPausing = false;
        await this.flush();
        this.dispatchEvent(new PlayerEvent('play'));
    }
    async pause() {
        if (!this._playingPlayer)
            throw new Error('Not playing');
        this._isPausing = true;
        await this._playingPlayer.pause();
        this.dispatchEvent(new PlayerEvent('pause'));
    }
    async resume() {
        if (!this._playingPlayer)
            throw new Error('Not playing');
        this._isPausing = false;
        await this._playingPlayer.resume();
        this.dispatchEvent(new PlayerEvent('resume'));
    }
    async stop() {
        this._isPausing = false;
        await this.stopInner();
        this.dispatchEvent(new PlayerEvent('stop'));
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
        if (index < 0 || index >= this.length)
            throw new Error(`Index out of range: ${index}`);
        this._playingIndex = index;
        this.dispatchEvent(new PlayerEvent('switch', { file: this.playingFile }));
        await this.flush();
    }
}

class TipError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'TipError';
    }
}
const dataManagerCache = new Map();
class DataManager {
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
        if (this._dataCache && !forceFlush)
            return this._dataCache;
        const res = file.readFrom(this.filePath);
        if (res) {
            this._dataCache = JSON.parse(res);
            return JSON.parse(res);
        }
        if (!this.defaultContent)
            throw new Error(`Read ${this.filePath} failed and no default provided`);
        await this.write(this.defaultContent);
        this._dataCache = this.defaultContent;
        return this.defaultContent;
    }
    async write(content) {
        const res = file.writeTo(this.filePath, JSON.stringify(content));
        if (!res)
            throw new Error(`Failed to write to ${this.filePath}`);
        this._dataCache = content;
    }
    operate(callback) {
        return this.read()
            .then(callback)
            .then((content) => this.write(content));
    }
}
class ListDataManager extends DataManager {
    async beforeAdd(x, data, index) { }
    async add(x, index = -1) {
        await this.operate(async (data) => {
            const ls = Array.isArray(x) ? x : [x];
            await this.beforeAdd?.(ls, data, index);
            if (index === -1)
                data.push(...ls);
            else
                data.splice(index, 0, ...ls);
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
}
class PlaylistDataManager extends ListDataManager {
    static getFromXuid(xuid) {
        return super.get(`${DATA_PLAYLIST_PATH}/${xuid}.json`, []);
    }
    async beforeAdd(x, data) {
        const duplicated = x.find((xx) => data.some((dx) => dx.name === xx.name));
        if (duplicated)
            throw new TipError(`歌单名称 ${duplicated} 已存在`);
    }
    async change(index, newData) {
        await this.operate(async (data) => {
            const entry = data[index];
            const existedNames = data
                .map((x) => x.name)
                .filter((x) => x !== entry.name);
            if (newData.name && existedNames.includes(newData.name))
                throw new TipError(`歌单名称 ${newData.name} 已存在`);
            Object.assign(entry, newData);
            return data;
        });
    }
    async getByName(name) {
        const data = await this.read();
        const index = data.findIndex((x) => x.name === name);
        if (index === -1)
            throw new TipError(`歌单 ${name} 不存在`);
        return [data[index], index];
    }
}
class HistoryDataManager extends ListDataManager {
    static getFromXuid(xuid) {
        return super.get(`${DATA_HISTORY_PATH}/${xuid}.json`, []);
    }
    async insertFirst(x) {
        await this.operate(async (data) => {
            const index = data.indexOf(x);
            if (index !== -1)
                data.splice(index, 1);
            data.unshift(x);
            return data;
        });
    }
}

const SOUND_ID_MAPPING = [
    'note.harp',
    'note.bassattack',
    'note.bd',
    'note.snare',
    'note.hat',
    'note.guitar',
    'note.flute',
    'note.bell',
    'note.chime',
    'note.xylobone',
    'note.iron_xylophone',
    'note.cow_bell',
    'note.didgeridoo',
    'note.bit',
    'note.banjo',
    'note.pling',
];
const BOSS_BAR_ID = 627752937;
const playSoundTaskList = [];
const playerPlaylists = {};
function buildSoundPacket(position, instrumentList, note) {
    const bs = new BinaryStream();
    const { instrument, velocity, pitch } = note;
    const { file: fileName } = instrumentList[instrument];
    const sound = fileName.substring(0, fileName.lastIndexOf('.'));
    bs.reset();
    bs.writeString(sound);
    bs.writeVarInt(Math.round(position.x * 8));
    bs.writeUnsignedVarInt(Math.round((position.y + 0.37) * 8));
    bs.writeVarInt(Math.round(position.z * 8));
    bs.writeFloat(velocity);
    bs.writeFloat(pitch);
    return bs.createPacket(86);
}
class LLBasePlayer extends BasePlayer {
    get builtinInstruments() {
        return BUILTIN_INSTRUMENTS.map((x) => ({
            ...x,
            file: `${SOUND_ID_MAPPING[x.id]}.ogg`,
        }));
    }
    constructor(song, options) {
        super(song, options);
        this.lastBossBarPercent = -1;
        const { playerXuid } = options || {};
        if (!playerXuid)
            throw new Error('playerXuid is required');
        this.playerXuid = playerXuid;
    }
    async tickPlay() {
        if (!this.refreshPlayerObjCache()) {
            await this.stopPlayTask();
            return;
        }
        await super.tickPlay();
        if (this.playing)
            this.updateBossBar();
    }
    async stopPlay(resetProgress) {
        await super.stopPlay(resetProgress);
        this.updateBossBar();
    }
    refreshPlayerObjCache() {
        this.mcPlayer = mc.getPlayer(this.playerXuid) ?? undefined;
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
        const percent = Math.round((this.playedTicks / songLength) * 100);
        if (this.playing) {
            if (percent === this.lastBossBarPercent)
                return;
            this.lastBossBarPercent = percent;
        }
        const playMark = this.playing ? '§a⏵' : '§6⏸';
        let songDisplayName = `§b${songName}`;
        const displayAuthor = originalAuthor || songAuthor;
        if (displayAuthor)
            songDisplayName += `§f - §a${displayAuthor}`;
        const title = `${playMark} §dNBSPlayer §7| ${songDisplayName}`;
        const bossBarColor = this.playing ? 3 : 4;
        this.mcPlayer?.setBossBar(BOSS_BAR_ID, title, percent, bossBarColor);
    }
}
class TickingBasedPlayer extends LLBasePlayer {
    async playNote(note) {
        playSoundTaskList.push({
            note,
            mcPlayer: this.mcPlayer,
            nbsPlayer: this,
            stopPlayTask: this.stopPlayTask.bind(this),
        });
    }
    async startPlayTask() {
        this._playTask = ticker.add(this.tickPlay.bind(this));
    }
    async stopPlayTask() {
        this._playTask?.();
        this._playTask = undefined;
    }
}
let _player;
{
    ticker.add(async () => {
        if (!playSoundTaskList.length)
            return;
        const playerCache = {};
        const once = async (task) => {
            const { note, nbsPlayer, stopPlayTask } = task;
            const { instruments, playerXuid } = nbsPlayer;
            const stop = async () => {
                await stopPlayTask();
                if (playerCache[playerXuid])
                    delete playerCache[playerXuid];
            };
            let player = playerCache[playerXuid];
            if (!player)
                player = mc.getPlayer(playerXuid);
            if (!player)
                return stop();
            try {
                player.sendPacket(buildSoundPacket(player.pos, instruments, note));
            }
            catch (e) {
                logger.error(formatError(e));
                return stop();
            }
            return undefined;
        };
        const tasks = playSoundTaskList.map((task) => once(task));
        playSoundTaskList.length = 0;
        await Promise.all(tasks);
    });
    _player = TickingBasedPlayer;
}
const Player = _player;
class PlaylistFile extends BasePlaylistFile {
    async read() {
        const f = new file(`${NBS_PATH}/${this.url}`, file.ReadMode, true);
        let b;
        try {
            b = f.readAllSync();
        }
        finally {
            f.close();
        }
        const r = await parse(b);
        if (!r.header.songName)
            r.header.songName = this.displayString;
        return r;
    }
}
class Playlist extends BasePlaylist {
    constructor(fileList, options) {
        super(fileList, options);
        const { playerXuid } = options || {};
        if (!playerXuid)
            throw new Error('playerXuid is required');
        this.playerXuid = playerXuid;
        this.addEventListener('error', ({ params: { error } }) => {
            logger.error(formatError(error));
            mc.getPlayer(this.playerXuid).tell(`§c出现了一个错误\n${formatError(error)}`);
        });
        this.addEventListener('switch', ({ params: { file } }) => {
            if (!file)
                return;
            const history = HistoryDataManager.getFromXuid(this.playerXuid);
            history.insertFirst(file.url);
        });
    }
    async createPlayer(song) {
        return new Player(song, { playerXuid: this.playerXuid });
    }
}
function ensurePlaylist(player) {
    let playlist = playerPlaylists[player.xuid];
    if (!playlist) {
        playlist = new Playlist([], { playerXuid: player.xuid });
        playerPlaylists[player.xuid] = playlist;
    }
    return playlist;
}
async function replacePlaylist(player, filenames, targetFilename) {
    if (targetFilename && !filenames.includes(targetFilename))
        throw Error(`${targetFilename} should present in filenames`);
    const playlist = ensurePlaylist(player);
    const files = filenames.map((x) => new PlaylistFile(x));
    await playlist.reset(files);
    if (targetFilename)
        await playlist.switchTo(playlist.currentFileList.findIndex((x) => x.url === targetFilename));
    else
        await playlist.play();
}
async function playAfter(player, filename, playNow = false) {
    const playlist = ensurePlaylist(player);
    const oldPlayingFilename = playlist.currentFileList[playlist.playingIndex]?.displayString;
    await playlist.addFile(new PlaylistFile(filename), playlist.playingIndex + 1);
    if (playNow && oldPlayingFilename !== filename)
        await playlist.next();
}

const LoopTypeNameMap = {
    [LoopType.None]: '顺序播放',
    [LoopType.List]: '列表循环',
    [LoopType.Single]: '单曲循环',
    [LoopType.Shuffle]: '随机播放',
};
async function controlForm(player, parent) {
    const playlist = ensurePlaylist(player);
    if (!playlist.length) {
        sendModalFormAsync(player, PLUGIN_NAME, '播放列表为空')
            .then(() => parent?.())
            .catch(logErr);
        return;
    }
    const buttons = [
        {
            text: !playlist.isPlaying || playlist.isPausing ? '▶️ 播放' : '⏸️ 暂停',
            operation: () => {
                if (playlist.isActive)
                    return playlist.isPausing ? playlist.resume() : playlist.pause();
                return playlist.play();
            },
        },
        ...(playlist.isActive
            ? [
                {
                    text: '⏹️ 停止',
                    operation: () => playlist.stop(),
                },
            ]
            : []),
        {
            text: '⏮️ 上一首',
            operation: () => playlist
                .previous()
                .catch(() => sendModalFormAsync(player, PLUGIN_NAME, '没有上一首了')),
        },
        {
            text: '⏭️ 下一首',
            operation: () => playlist
                .next()
                .catch(() => sendModalFormAsync(player, PLUGIN_NAME, '已经是最后一首了')),
        },
        {
            text: LoopTypeNameMap[playlist.loopType],
            operation: () => Promise.resolve().then(() => playlist.switchLoopType((playlist.loopType + 1) % 4)),
        },
    ];
    new SimpleFormOperational(PLUGIN_NAME, '', buttons)
        .sendAsync(player)
        .then((res) => res === FormClose ? parent?.() : controlForm(player, parent))
        .catch(logErr);
}

async function changeIndexForm(list, originalIndex, player) {
    const changedList = list.slice();
    changedList.push(undefined);
    const form = new SimpleFormEx(changedList);
    form.title = PLUGIN_NAME;
    form.content = `${list[originalIndex]}\n你想把该项排在哪项前面呢？\n${form.content}`;
    const originalFormatter = form.formatter;
    form.formatter = (v, index, array) => v === undefined ? ['放在最后'] : originalFormatter(v, index, array);
    form.canTurnPage = true;
    form.canJumpPage = true;
    const res = await form.sendAsync(player);
    if (res === FormClose)
        return FormClose;
    const index = res === undefined ? list.length - 1 : list.indexOf(res);
    if (index === -1)
        throw Error('unexpected list change');
    return index;
}
async function playListSelectForm(player, additionalContent = '') {
    const playlists = await PlaylistDataManager.getFromXuid(player.xuid).read();
    if (!playlists) {
        await sendModalFormAsync(player, PLUGIN_NAME, '你还没有创建过歌单');
        return FormClose;
    }
    const form = new SimpleFormEx(playlists.map((x) => x.name));
    form.title = PLUGIN_NAME;
    if (additionalContent)
        form.content = `${additionalContent}\n${form.content}`;
    form.canTurnPage = true;
    form.canJumpPage = true;
    form.hasSearchButton = true;
    const res = await form.sendAsync(player);
    return res === FormClose ? FormClose : res;
}
async function addToPlayListForm(player, filename) {
    const playlistName = await playListSelectForm(player, `选择要添加到的歌单`);
    if (playlistName === FormClose)
        return;
    const confManager = PlaylistDataManager.getFromXuid(player.xuid);
    const [{ files }, index] = await confManager.getByName(playlistName);
    if (!files.includes(filename))
        files.push(filename);
    await confManager.change(index, { files });
}

async function fileListFileForm(fileList, filename, player, parent) {
    const parentThis = () => fileListFileForm(fileList, filename, player, parent);
    new SimpleFormOperational(PLUGIN_NAME, filename, [
        {
            text: '覆盖当前列表并播放',
            operation: () => replacePlaylist(player, fileList, filename).then(() => parent?.()),
        },
        {
            text: '添加为下一首并立即切换',
            operation: () => playAfter(player, filename, true).then(() => parent?.()),
        },
        {
            text: '下一首播放',
            operation: () => playAfter(player, filename).then(() => parent?.()),
        },
        {
            text: '添加到歌单',
            operation: () => addToPlayListForm(player, filename).then(parentThis),
        },
    ])
        .sendAsync(player)
        .then((res) => res === FormClose && parent?.())
        .catch(logErr);
}
async function fileListForm(player, parent) {
    const files = file.getFilesList(NBS_PATH).filter((x) => x.endsWith('.nbs'));
    const form = new SimpleFormEx(files);
    form.title = PLUGIN_NAME;
    form.canTurnPage = true;
    form.canJumpPage = true;
    form.hasSearchButton = true;
    const res = await form.sendAsync(player);
    if (res === FormClose) {
        parent?.().catch(logErr);
        return;
    }
    fileListFileForm(files, res, player, () => fileListForm(player, parent)).catch(logErr);
}

async function historyFileForm(filename, player, parent) {
    new SimpleFormOperational(PLUGIN_NAME, filename, [
        {
            text: '添加为下一首并立即切换',
            operation: () => playAfter(player, filename, true),
        },
        {
            text: '下一首播放',
            operation: () => playAfter(player, filename),
        },
        {
            text: '添加到歌单',
            operation: () => addToPlayListForm(player, filename),
        },
    ])
        .sendAsync(player)
        .then(() => parent?.())
        .catch(logErr);
}
async function historyForm(player, parent) {
    const confManager = HistoryDataManager.getFromXuid(player.xuid);
    const files = await confManager.read();
    const form = new SimpleFormEx(files);
    form.title = PLUGIN_NAME;
    form.canTurnPage = true;
    form.canJumpPage = true;
    form.hasSearchButton = true;
    const res = await form.sendAsync(player);
    if (res === FormClose) {
        parent?.().catch(logErr);
        return;
    }
    historyFileForm(res, player, parent).catch(logErr);
}

async function playingFileForm(playlist, file, player, parent) {
    const index = playlist.currentFileList.indexOf(file);
    new SimpleFormOperational(PLUGIN_NAME, file.displayString, [
        {
            text: '切换到此首',
            operation: () => playlist.switchTo(index),
        },
        {
            text: '变更顺序',
            operation: async () => {
                const newIndex = await changeIndexForm(playlist.currentFileList.map((x) => x.displayString), index, player);
                if (newIndex !== FormClose)
                    playlist.changeIndex(index, newIndex);
            },
        },
        {
            text: '从列表中移除',
            operation: async () => {
                if (await sendModalFormAsync(player, PLUGIN_NAME, '真的要删除吗？'))
                    playlist.removeFile(index);
            },
        },
    ])
        .sendAsync(player)
        .then(() => parent?.())
        .catch(logErr);
}
async function playingForm(player, parent) {
    const playlist = ensurePlaylist(player);
    if (!playlist.length) {
        sendModalFormAsync(player, PLUGIN_NAME, '播放列表为空')
            .then(() => parent?.())
            .catch(logErr);
        return;
    }
    const form = new SimpleFormEx(playlist.currentFileList);
    form.title = PLUGIN_NAME;
    const originalFormatter = form.formatter;
    form.formatter = (v, index, array) => originalFormatter(v.displayString, index, array);
    form.canTurnPage = true;
    form.canJumpPage = true;
    form.hasSearchButton = true;
    const res = await form.sendAsync(player, Math.ceil((playlist.playingIndex + 1) / form.maxPageNum));
    if (res === FormClose) {
        parent?.().catch(logErr);
        return;
    }
    playingFileForm(playlist, res, player, () => playingForm(player, parent)).catch(logErr);
}

async function playListSongForm(playListName, songFilename, player, parent) {
    const confManager = PlaylistDataManager.getFromXuid(player.xuid);
    new SimpleFormOperational(PLUGIN_NAME, songFilename, [
        {
            text: '覆盖当前列表并播放',
            operation: async () => replacePlaylist(player, (await confManager.getByName(playListName))[0].files, songFilename),
        },
        {
            text: '添加为下一首并立即切换',
            operation: () => playAfter(player, songFilename, true),
        },
        {
            text: '下一首播放',
            operation: () => playAfter(player, songFilename),
        },
        {
            text: '添加到歌单',
            operation: () => addToPlayListForm(player, songFilename),
        },
        {
            text: '变更顺序',
            operation: async () => {
                const [data, playlistIndex] = await confManager.getByName(playListName);
                const { files } = data;
                const fileIndex = files.findIndex((x) => x === songFilename);
                const newIdx = await changeIndexForm(files, fileIndex, player);
                if (newIdx === FormClose)
                    return;
                files.splice(fileIndex, 1);
                files.splice(newIdx, 0, songFilename);
                await confManager.change(playlistIndex, { files });
            },
        },
        {
            text: '从歌单中删除',
            operation: async () => {
                if (await sendModalFormAsync(player, PLUGIN_NAME, '真的要删除吗？')) {
                    const [data, playlistIndex] = await confManager.getByName(playListName);
                    const { files } = data;
                    const fileIndex = files.findIndex((x) => x === songFilename);
                    files.splice(fileIndex, 1);
                    await confManager.change(playlistIndex, { files });
                }
            },
        },
    ])
        .sendAsync(player)
        .then(() => parent?.())
        .catch((err) => {
        if (err instanceof TipError)
            sendModalFormAsync(player, PLUGIN_NAME, err.message)
                .then(() => playListSongForm(playListName, songFilename, player, parent))
                .catch(logErr);
        else
            logErr(err);
    });
}
async function playListViewForm(name, player, parent) {
    const confManager = PlaylistDataManager.getFromXuid(player.xuid);
    const data = await confManager.read();
    const entry = data.find((x) => x.name === name);
    if (!entry)
        return;
    const form = new SimpleFormEx(entry.files);
    form.title = PLUGIN_NAME;
    form.canTurnPage = true;
    form.canJumpPage = true;
    form.hasSearchButton = true;
    const res = await form.sendAsync(player);
    if (res === FormClose) {
        parent?.().catch(logErr);
        return;
    }
    playListSongForm(name, res, player, () => playListViewForm(name, player, parent)).catch(logErr);
}
async function playListChangeNameForm(name, player) {
    const confManager = PlaylistDataManager.getFromXuid(player.xuid);
    const [, index] = await confManager.getByName(name);
    const res = await new CustomFormEx(PLUGIN_NAME)
        .addInput('newName', '请输入新名称')
        .sendAsync(player);
    if (res === FormClose)
        return FormClose;
    const { newName } = res;
    if (!newName) {
        await sendModalFormAsync(player, PLUGIN_NAME, '歌单名称不能为空');
        return playListChangeNameForm(name, player);
    }
    await confManager.change(index, { name: newName });
    return newName;
}
async function playListOperateForm(name, player, parent) {
    const confManager = PlaylistDataManager.getFromXuid(player.xuid);
    const parentThis = () => playListOperateForm(name, player, parent);
    new SimpleFormOperational(PLUGIN_NAME, name, [
        {
            text: '播放',
            operation: async () => replacePlaylist(player, (await confManager.getByName(name))[0].files).then(() => parent?.()),
        },
        {
            text: '查看',
            operation: () => playListViewForm(name, player, parentThis),
        },
        {
            text: '变更顺序',
            operation: async () => {
                const data = await confManager.read();
                const [, plIndex] = await confManager.getByName(name);
                const newIdx = await changeIndexForm(data.map((x) => x.name), plIndex, player);
                if (newIdx !== FormClose)
                    await confManager.changeIndex(plIndex, newIdx);
                parentThis().catch(logErr);
            },
        },
        {
            text: '重命名',
            operation: () => playListChangeNameForm(name, player)
                .then((x) => {
                if (x !== FormClose)
                    name = x;
            })
                .then(parentThis)
                .catch(logErr),
        },
        {
            text: '清除所有无效歌曲',
            operation: async () => {
                const [data, index] = await confManager.getByName(name);
                const before = data.files.length;
                const newFileList = data.files.filter((x) => file.exists(`${NBS_PATH}/${x}`));
                const after = newFileList.length;
                await confManager.change(index, { files: newFileList });
                await sendModalFormAsync(player, PLUGIN_NAME, `清除了 ${before - after} 首无效歌曲`);
                parentThis().catch(logErr);
            },
        },
        {
            text: '删除',
            operation: async () => {
                const [, index] = await confManager.getByName(name);
                if (await sendModalFormAsync(player, PLUGIN_NAME, '真的要删除吗？'))
                    confManager
                        .remove(index)
                        .then(() => parent?.())
                        .catch(logErr);
                else
                    parentThis().catch(logErr);
            },
        },
    ])
        .sendAsync(player)
        .then((res) => (res === FormClose ? parent?.() : undefined))
        .catch((err) => {
        if (err instanceof TipError)
            sendModalFormAsync(player, PLUGIN_NAME, err.message)
                .then(() => playListOperateForm(name, player, parent))
                .catch(logErr);
        else
            logErr(err);
    });
}
async function playListsForm(player, parent) {
    const res = await playListSelectForm(player);
    if (res === FormClose) {
        parent?.().catch(logErr);
        return;
    }
    playListOperateForm(res, player, () => playListsForm(player, parent)).catch(logErr);
}
async function newListForm(player, parent) {
    const playingPl = ensurePlaylist(player);
    const newPlaylistModeMap = [
        ['从当前播放列表创建', () => playingPl.fileList.map((x) => x.url)],
        ['创建空歌单', () => []],
    ];
    const res = await new CustomFormEx(PLUGIN_NAME)
        .addStepSlider('mode', '请选择创建模式', newPlaylistModeMap.map((x) => x[0]))
        .addInput('name', '请输入歌单名称')
        .sendAsync(player);
    if (res === FormClose) {
        parent?.().catch(logErr);
        return;
    }
    if (!res.name) {
        sendModalFormAsync(player, PLUGIN_NAME, '歌单名称不能为空')
            .then(() => newListForm(player, parent))
            .catch(logErr);
        return;
    }
    const manager = PlaylistDataManager.getFromXuid(player.xuid);
    try {
        await manager.add({
            name: res.name,
            files: newPlaylistModeMap[res.mode][1](),
        });
    }
    catch (e) {
        if (e instanceof TipError)
            sendModalFormAsync(player, PLUGIN_NAME, e.message)
                .then(() => parent?.())
                .catch(logErr);
        else
            throw e;
    }
    sendModalFormAsync(player, PLUGIN_NAME, '创建成功')
        .then(() => parent?.())
        .catch(logErr);
}

async function mainForm(player) {
    new SimpleFormOperational(PLUGIN_NAME, '', [
        ['文件列表', fileListForm],
        ['播放控制', controlForm],
        ['播放列表', playingForm],
        ['播放历史', historyForm],
        ['我的歌单', playListsForm],
        ['创建歌单', newListForm],
    ].map(([text, op]) => ({
        text,
        operation: () => op(player, () => mainForm(player)).catch(logErr),
    })))
        .sendAsync(player)
        .catch(logErr);
}

function init() {
    const cmd = mc.newCommand('nbs', PLUGIN_NAME, PermType.Any);
    cmd.setAlias('nbsplayer');
    cmd.setEnum('enumFileList', ['filelist']);
    cmd.mandatory('enumFileList', ParamType.Enum, 'enumFileList', 1);
    cmd.overload(['enumFileList']);
    cmd.setEnum('enumControl', ['control']);
    cmd.mandatory('enumControl', ParamType.Enum, 'enumControl', 1);
    cmd.overload(['enumControl']);
    cmd.setEnum('enumPlaying', ['playing']);
    cmd.mandatory('enumPlaying', ParamType.Enum, 'enumPlaying', 1);
    cmd.overload(['enumPlaying']);
    cmd.setEnum('enumHistory', ['history']);
    cmd.mandatory('enumHistory', ParamType.Enum, 'enumHistory', 1);
    cmd.overload(['enumHistory']);
    cmd.setEnum('enumPlaylists', ['playlists']);
    cmd.mandatory('enumPlaylists', ParamType.Enum, 'enumPlaylists', 1);
    cmd.overload(['enumPlaylists']);
    cmd.setEnum('enumNewList', ['newlist']);
    cmd.mandatory('enumNewList', ParamType.Enum, 'enumNewList', 1);
    cmd.overload(['enumNewList']);
    cmd.setEnum('enumIsPlaying', ['isplaying']);
    cmd.mandatory('enumIsPlaying', ParamType.Enum, 'enumIsPlaying', 1);
    cmd.optional('player', ParamType.Player);
    cmd.overload(['enumIsPlaying', 'player']);
    cmd.setEnum('enumPlay', ['play']);
    cmd.mandatory('enumPlay', ParamType.Enum, 'enumPlay', 1);
    cmd.mandatory('filename', ParamType.String);
    cmd.optional('forcePlay', ParamType.Bool);
    cmd.overload(['enumPlay', 'filename', 'player', 'forcePlay']);
    cmd.overload();
    cmd.setCallback((_, { player }, output, res) => {
        if ('enumFileList' in res && res.enumFileList) {
            if (!player)
                return false;
            fileListForm(player).catch(logErr);
            return true;
        }
        if ('enumControl' in res && res.enumControl) {
            if (!player)
                return false;
            controlForm(player).catch(logErr);
            return true;
        }
        if ('enumPlaying' in res && res.enumPlaying) {
            if (!player)
                return false;
            playingForm(player).catch(logErr);
            return true;
        }
        if ('enumHistory' in res && res.enumHistory) {
            if (!player)
                return false;
            historyForm(player).catch(logErr);
            return true;
        }
        if ('enumPlaylists' in res && res.enumPlaylists) {
            if (!player)
                return false;
            playListsForm(player).catch(logErr);
            return true;
        }
        if ('enumNewList' in res && res.enumNewList) {
            if (!player)
                return false;
            newListForm(player).catch(logErr);
            return true;
        }
        if ('enumIsPlaying' in res && res.enumIsPlaying) {
            const [targetPlayer] = res.player || [player];
            if (!targetPlayer)
                return false;
            const { isPlaying } = ensurePlaylist(targetPlayer);
            output.addMessage(`${isPlaying}`);
            return isPlaying;
        }
        if ('enumPlay' in res && res.enumPlay) {
            if (!file.exists(`${NBS_PATH}/${res.filename}`)) {
                output.addMessage(`§c文件 ${res.filename} 不存在`);
                return false;
            }
            let playerList = [];
            if (res.player?.length)
                playerList = res.player;
            else if (player)
                playerList = [player];
            else
                return false;
            const playRes = playerList.map((targetPlayer) => {
                const playlist = ensurePlaylist(targetPlayer);
                const forcePlay = res.forcePlay ?? false;
                if (!forcePlay && playlist.isActive)
                    return false;
                playAfter(targetPlayer, res.filename, forcePlay).catch(logErr);
                return true;
            });
            const outTmp = [];
            for (let i = 0; i < playRes.length; i += 1) {
                const pl = playerList[i];
                const ok = playRes[i];
                outTmp.push(ok ? `§a成功为 ${pl.realName} 播放` : `§c为 ${pl.realName} 播放失败`);
            }
            output.addMessage(outTmp.join('\n'));
            return true;
        }
        if (!player)
            return false;
        mainForm(player).catch(logErr);
        return true;
    });
    cmd.setup();
}
mc.listen('onServerStarted', init);

ll.registerPlugin(PLUGIN_NAME, PLUGIN_DESCRIPTION, PLUGIN_VERSION, PLUGIN_EXTRA);
