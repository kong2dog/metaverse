(self["webpackChunkmetaverse"] = self["webpackChunkmetaverse"] || []).push([[545],{

/***/ 466:
/***/ (function(module) {

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){ true?module.exports=e():0})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});


/***/ }),

/***/ 61:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(698)["default"]);

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 698:
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 687:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(61)();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ 861:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ 671:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ 144:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ 860:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ _readOnlyError)
/* harmony export */ });
function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

/***/ }),

/***/ 249:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(144);
/* harmony import */ var _models_localPlayer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(552);
/* harmony import */ var _models_remotePlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75);
/* harmony import */ var _models_Player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(83);



var ws = new WebSocket('ws://localhost:9988');



var Controller = /*#__PURE__*/function () {
  function Controller(scene) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(this, Controller);

    this.isController = true;
    this.scene = scene;
    this.store = scene.store;
    this.client = ws;
    this.addEvents();
    this.addGameEvents();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(Controller, [{
    key: "addEvents",
    value: function addEvents() {
      var _this = this;

      this.client.addEventListener('open', function () {
        _this.socketOpen();
      });
    }
  }, {
    key: "socketOpen",
    value: function socketOpen() {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var params = Object.fromEntries(urlSearchParams.entries());
      var data = {
        cmd: 'setId',
        id: params.id
      };
      this.client.send(JSON.stringify(data));
    }
  }, {
    key: "hitPlayer",
    value: function hitPlayer(player) {
      console.log(player._id);
      var data = {
        cmd: 'hit player',
        shooterId: this.store.state.localPlayer.player._id,
        id: player._id
      };
      this.client.send(JSON.stringify(data));
    }
  }, {
    key: "onStartRender",
    value: function onStartRender() {
      this.store.setState('gameStarted', true);
    }
  }, {
    key: "addGameEvents",
    value: function addGameEvents() {
      var _this2 = this;

      this.client.addEventListener('message', function (event) {
        var data = JSON.parse(event.data);
        console.log('client: %s', event);

        if (data.cmd === 'start render') {
          _this2.onStartRender();
        } else if (data.cmd === 'new player') {
          _this2.onNewPlayer(data);
        } else if (data.cmd === 'init game') {
          console.log(data);

          _this2.onInitGame(data);
        } else if (data.cmd === 'move player') {
          _this2.onMovePlayer(data);
        } else if (data.cmd === 'remove player') {
          _this2.onRemovePlayer(data);
        } else if (data.cmd === 'player dead') {
          _this2.onPlayerDead(data);
        } else if (data.cmd === 'update hitpoints') {
          _this2.onUpdateHitPoints(data);
        } else if (data.cmd === 'respawn player') {
          _this2.onRespawnPlayer(data);
        } else if (data.cmd === 'shot fired') {
          _this2.onShotFired(data);
        } else if (data.cmd === 'recived msg') {
          _this2.onReceiveMsg(data);
        }
      });
    }
  }, {
    key: "onReceiveMsg",
    value: function onReceiveMsg(data) {
      this.receiveMsg(data.from, data.msg);
    }
  }, {
    key: "receiveMsg",
    value: function receiveMsg(id, msg) {
      var sender;

      if (id === this.store.state.localPlayer._id) {
        sender = this.store.state.localPlayer;
      } else {
        sender = this._findPlayer(id);
      }
    }
  }, {
    key: "onShotFired",
    value: function onShotFired(data) {
      var pos = data.pos;
      this.scene.sound.gunFire3D(new BABYLON.Vector3(pos.x, pos.y, pos.z));
    }
  }, {
    key: "shotFired",
    value: function shotFired() {
      // 播放声音
      var data = {
        cmd: 'player fired shot',
        id: this.store.state.localPlayer.player._id
      };
      this.client.send(JSON.stringify(data));
    }
  }, {
    key: "onRespawnPlayer",
    value: function onRespawnPlayer(data) {
      this.respawnPlayer(data.player);
    }
  }, {
    key: "respawnPlayer",
    value: function respawnPlayer(player) {
      if (this.store.state.localPlayer.player._id === player._id) {
        this.store.state.localPlayer.player.setDead(player._isDead);
        this.store.state.localPlayer.player.setHitPoints(player._hitPoints);
        this.store.state.localPlayer.player.setXYZ(player._x, player._y, player._z);
      } else {
        var remotePlayer = this._findPlayer(player._id);

        remotePlayer.setDead(player._isDead);
        remotePlayer.setHitPoints(player._hitPoints);
        remotePlayer.setXYZ(player._x, player._y, player._z);
      }
    }
  }, {
    key: "onUpdateHitPoints",
    value: function onUpdateHitPoints(data) {
      this.updateHitPointsLocalPlayer(data.hitPoints);
    }
  }, {
    key: "updateHitPointsLocalPlayer",
    value: function updateHitPointsLocalPlayer(hitPoints) {
      this.store.state.localPlayer.setHitPoints(hitPoints);
    }
  }, {
    key: "onNewPlayer",
    value: function onNewPlayer(data) {
      console.log("New player connected");
      this.addRemotePlayer(data.player);
    }
  }, {
    key: "onInitGame",
    value: function onInitGame(data) {
      this.setLocalPlayer(data.localPlayer); // this.store.state.localPlayer = data.localPlayer;

      for (var i = 0; i < data.remotePlayers.length; i++) {
        this.addRemotePlayer(data.remotePlayers[i]);
      }

      ;
      this.initPlayersDone();
    }
  }, {
    key: "setLocalPlayer",
    value: function setLocalPlayer(player) {
      console.log('set local');
      console.log(player);
      var p = this.clonePlayer(player);
      this.store.state.localPlayer = new _models_localPlayer_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z(this.scene, p);
      console.log(this.store.state.localPlayer.Update);
      this.scene.load = true;
    }
  }, {
    key: "onRemovePlayer",
    value: function onRemovePlayer(data) {
      this.removeRemotePlayer(data.id);
    }
  }, {
    key: "onPlayerDead",
    value: function onPlayerDead(data) {
      this.playerDied(data.id, data.killer);
    }
  }, {
    key: "playerDied",
    value: function playerDied(id, killer) {
      if (id === this.store.state.localPlayer._id) {
        this.store.state.localPlayer.addDeath(); // 非自杀

        var remotePlayer;

        if (killer !== id) {
          remotePlayer = this._findPlayer(killer);
          remotePlayer.addKill();
        } else {
          remotePlayer = this.store.state.localPlayer;
        }

        this.store.state.localPlayer.gotKilled(remotePlayer);
      } else {
        var _killer;

        var dead = this._findPlayer(id);

        dead.addDeath();

        if (_killer === this.store.state.localPlayer._id) {
          _killer = this.store.state.localPlayer;
          this.store.state.localPlayer.addKill();
        } else {
          _killer = this._findPlayer(_killer);
        }

        _killer.addKill();

        dead.gotKilled(_killer);
      }
    }
  }, {
    key: "removeRemotePlayer",
    value: function removeRemotePlayer(id) {
      var player = this._findPlayer(id);

      if (!player) throw new Error("Player not found " + id);
      player.Destroy();
      this.store.state.remotePlayers.splice(this.store.state.remotePlayers.indexOf(player), 1);
    }
  }, {
    key: "addRemotePlayer",
    value: function addRemotePlayer(player) {
      var p = this.clonePlayer(player);
      var remotePlayer = new _models_remotePlayer_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(this.scene, p);
      this.store.state.remotePlayers.push(remotePlayer);
    }
  }, {
    key: "onMovePlayer",
    value: function onMovePlayer(data) {
      this.movePlayer(data.id, data.pos, data.rot);
    }
  }, {
    key: "movePlayer",
    value: function movePlayer(id, pos, rot) {
      var player = this._findPlayer(id);

      if (!player) return;
      player.move(pos, rot);
      player.player.setXYZ(pos.x, pos.y, pos.z);
      player.player.setRotXYZ(rot.x, rot.y, rot.z);
    }
  }, {
    key: "_findPlayer",
    value: function _findPlayer(id) {
      for (var i = 0; i < this.store.state.remotePlayers.length; i++) {
        if (this.store.state.remotePlayers[i].player._id === id) {
          return this.store.state.remotePlayers[i];
        }
      }

      return false;
    }
  }, {
    key: "Update",
    value: function Update() {
      this.store.state.localPlayer.Update();
    }
  }, {
    key: "Create",
    value: function Create() {}
  }, {
    key: "Destroy",
    value: function Destroy() {}
  }, {
    key: "requestAllPlayers",
    value: function requestAllPlayers() {
      console.log('request to load players');
      var data = {
        cmd: 'request init game'
      };
      this.client.send(JSON.stringify(data));
    }
  }, {
    key: "initPlayersDone",
    value: function initPlayersDone() {
      console.log('initial all players done');
    }
  }, {
    key: "sendLocalPlayerMovement",
    value: function sendLocalPlayerMovement(pos, rot) {
      var position = {
        x: pos.x,
        y: pos.y,
        z: pos.z
      };
      var rotation = {
        x: rot.x,
        y: rot.y,
        z: rot.z
      }; //Send new position and rotation to the server

      this.client.send(JSON.stringify({
        cmd: 'update position',
        pos: position,
        rot: rotation
      })); //Update the localPlayer model on the Client

      this.store.state.localPlayer.player.setXYZ(pos.x, pos.y, pos.z);
      this.store.state.localPlayer.player.setRotXYZ(rot.x, rot.y, rot.z);
    }
  }, {
    key: "clonePlayer",
    value: function clonePlayer(p) {
      var player = new _models_Player_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(p._x, p._y, p._z);
      player.setRotXYZ(p._x, p._y, p._z);
      player.setID(p._id);
      player.setColor(p._color.r, p._color.g, p._color.b);
      player.setHitPoints(p._hitPoints);
      player.setName(p._name);
      player._isDead = p._isDead;
      player._kills = p._kills;
      player._deaths = p._deaths;
      return player;
    }
  }]);

  return Controller;
}();



/***/ }),

/***/ 268:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Sound)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144);



var Sound = /*#__PURE__*/function () {
  function Sound(scene) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, Sound);

    this.gunShot = new BABYLON.Sound('gunshot', '/weapon_2.mp3', scene, null, {
      volume: 0.1
    });
    this.gunShot3D = new BABYLON.Sound('gunshot3d', '/weapon_2.mp3', scene, null, {
      volume: 0.1,
      spatialSound: true,
      maxDistance: 300
    });
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(Sound, [{
    key: "gunFire",
    value: function gunFire() {
      this.gunShot.play();
    }
  }, {
    key: "gunFire3D",
    value: function gunFire3D(vec3) {
      this.gunShot3D.setPosition(vec3);
      this.gunShot3D.play();
    }
  }]);

  return Sound;
}();



/***/ }),

/***/ 409:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(671);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(144);
// EXTERNAL MODULE: ./node_modules/stats.js/build/stats.min.js
var stats_min = __webpack_require__(466);
// EXTERNAL MODULE: ./src/store/Store.js
var Store = __webpack_require__(822);
// EXTERNAL MODULE: ./src/scenes/babylonScene.js
var babylonScene = __webpack_require__(919);
;// CONCATENATED MODULE: ./src/application/Application.js






var Application = /*#__PURE__*/function () {
  function Application(_ref) {
    var dom = _ref.dom;

    (0,classCallCheck/* default */.Z)(this, Application);

    this.dom = dom;
    this.store = new Store/* default */.Z();
    this.loaded = false;
    this.destroyed = false;
    this.storeDeltaTime = 1000;
    this.animationFrame = null;
    this.lastStoreTime = 0;

    if (this.dom) {
      this.dom.style.position = 'relative';
    }
  }

  (0,createClass/* default */.Z)(Application, [{
    key: "update",
    value: function update() {
      if (this.stats) {
        this.stats.begin();
      }

      this.scene.Update();

      if (this.stats) {
        this.stats.end();
      }

      if (Date.now() - this.lastStoreTime > this.storeDeltaTime) {
        this.lastStoreTime = Date.now();
        this.store.setState('updatedAt', this.lastStoreTime);
        this.store.persist();
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.store.load();
      this.canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
      this.canvas.style.display = 'block'; // console.log(this.dom.clientWidth);

      var width = this.dom.clientWidth || window.innerWidth;
      var height = this.dom.clientHeight || window.innerHeight;
      console.log(width);
      this.canvas.width = width;
      this.canvas.height = height;
      this.dom.appendChild(this.canvas);
      this.engine = new BABYLON.Engine(this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
      }, true);
      var width2 = this.engine.getRenderWidth();
      console.log(width2);
      this.stats = new stats_min(); // this.dom.appendChild(this.stats.domElement);

      this.scene = new babylonScene/* default */.Z(this.engine, this.canvas, this.store);
      this.scene.Create();
      this.loaded = true; // this.update();

      this.engine.runRenderLoop(function () {
        _this.update();
      });
      window.addEventListener('resize', function () {
        _this.resize();
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      if (!this.loaded) {
        return;
      }

      this.engine.resize();
    } // 移除dom

  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyed = true;
      this.scene.Destroy();
    }
  }]);

  return Application;
}();


;// CONCATENATED MODULE: ./src/demo.js

window.app = new Application({
  dom: document.getElementById('warp')
});
window.app.start();
window.addEventListener('resize', function () {
  window.app.resize();
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbn5lOTZlOWJlYS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsZUFBZSxLQUFzRCxvQkFBb0IsQ0FBNEQsQ0FBQyxrQkFBa0IsaUJBQWlCLGNBQWMscUJBQXFCLFNBQVMsY0FBYyxZQUFZLG9CQUFvQixxREFBcUQsSUFBSSx3Q0FBd0MsZ0NBQWdDLE1BQU0sT0FBTyxlQUFlLFlBQVksZUFBZSx1Q0FBdUM7QUFDbGYseUJBQXlCLEtBQUssbUhBQW1ILHNGQUFzRixLQUFLLE9BQU8sMERBQTBELDRCQUE0QixnQkFBZ0IsSUFBSSxnQ0FBZ0Msa0JBQWtCLG1EQUFtRCx5QkFBeUI7QUFDM2QsbUNBQW1DLFNBQVMsbUJBQW1CLGFBQWEsMEJBQTBCLHdCQUF3Qix3SkFBd0osVUFBVSxXQUFXLDRCQUE0QixhQUFhLHlCQUF5QixtREFBbUQscUJBQXFCLGNBQWMsb0JBQW9CLGNBQWM7QUFDcmUsb0JBQW9CLGNBQWMsaUJBQWlCLG9CQUFvQixPQUFPLDJCQUEyQixnQkFBZ0IsZ0JBQWdCLGNBQWMsZ0JBQWdCLG9CQUFvQixjQUFjLGtEQUFrRCxxQ0FBcUMsd0JBQXdCLGNBQWMsaUJBQWlCLHNDQUFzQyxTQUFTOzs7Ozs7OztBQ0p0WSxjQUFjLHFDQUFpQzs7QUFFL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvRkFBb0Y7QUFDcEY7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsR0FB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QUFNLENBQUNKLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQU07UUFDcEMsS0FBSSxDQUFDa0osTUFBTDtNQUNILENBRkQ7SUFHSDs7O1dBRUQsa0JBQVM7TUFDTCxJQUFJLENBQUMsS0FBS2hDLE1BQVYsRUFBa0I7UUFDZDtNQUNIOztNQUNELEtBQUt1QixNQUFMLENBQVlTLE1BQVo7SUFDSCxFQUVEOzs7O1dBQ0EsbUJBQVU7TUFDTixLQUFLL0IsU0FBTCxHQUFpQixJQUFqQjtNQUNBLEtBQUt6SCxLQUFMLENBQVdzRixPQUFYO0lBQ0g7Ozs7Ozs7O0FDekVMO0FBQ0E1RSxNQUFNLENBQUMrSSxHQUFQLEdBQWEsSUFBSW5DLFdBQUosQ0FBZ0I7RUFDekJDLEdBQUcsRUFBRWMsUUFBUSxDQUFDcUIsY0FBVCxDQUF3QixNQUF4QjtBQURvQixDQUFoQixDQUFiO0FBR0FoSixNQUFNLENBQUMrSSxHQUFQLENBQVdFLEtBQVg7QUFFQWpKLE1BQU0sQ0FBQ0osZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtFQUNwQ0ksTUFBTSxDQUFDK0ksR0FBUCxDQUFXRCxNQUFYO0FBQ0gsQ0FGRCIsInNvdXJjZXMiOlsid2VicGFjazovL21ldGF2ZXJzZS8uL25vZGVfbW9kdWxlcy9zdGF0cy5qcy9idWlsZC9zdGF0cy5taW4uanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lLmpzIiwid2VicGFjazovL21ldGF2ZXJzZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL21ldGF2ZXJzZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vcmVhZE9ubHlFcnJvci5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvY29udHJvbGxlci9jb250cm9sbGVyLmpzIiwid2VicGFjazovL21ldGF2ZXJzZS8uL3NyYy9jb250cm9sbGVyL3NvdW5kLmpzIiwid2VicGFjazovL21ldGF2ZXJzZS8uL3NyYy9hcHBsaWNhdGlvbi9BcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvZGVtby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzdGF0cy5qcyAtIGh0dHA6Ly9naXRodWIuY29tL21yZG9vYi9zdGF0cy5qc1xuKGZ1bmN0aW9uKGYsZSl7XCJvYmplY3RcIj09PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6Zi5TdGF0cz1lKCl9KSh0aGlzLGZ1bmN0aW9uKCl7dmFyIGY9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGEpe2MuYXBwZW5kQ2hpbGQoYS5kb20pO3JldHVybiBhfWZ1bmN0aW9uIHUoYSl7Zm9yKHZhciBkPTA7ZDxjLmNoaWxkcmVuLmxlbmd0aDtkKyspYy5jaGlsZHJlbltkXS5zdHlsZS5kaXNwbGF5PWQ9PT1hP1wiYmxvY2tcIjpcIm5vbmVcIjtsPWF9dmFyIGw9MCxjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Yy5zdHlsZS5jc3NUZXh0PVwicG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MC45O3otaW5kZXg6MTAwMDBcIjtjLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2EucHJldmVudERlZmF1bHQoKTtcbnUoKytsJWMuY2hpbGRyZW4ubGVuZ3RoKX0sITEpO3ZhciBrPShwZXJmb3JtYW5jZXx8RGF0ZSkubm93KCksZz1rLGE9MCxyPWUobmV3IGYuUGFuZWwoXCJGUFNcIixcIiMwZmZcIixcIiMwMDJcIikpLGg9ZShuZXcgZi5QYW5lbChcIk1TXCIsXCIjMGYwXCIsXCIjMDIwXCIpKTtpZihzZWxmLnBlcmZvcm1hbmNlJiZzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSl2YXIgdD1lKG5ldyBmLlBhbmVsKFwiTUJcIixcIiNmMDhcIixcIiMyMDFcIikpO3UoMCk7cmV0dXJue1JFVklTSU9OOjE2LGRvbTpjLGFkZFBhbmVsOmUsc2hvd1BhbmVsOnUsYmVnaW46ZnVuY3Rpb24oKXtrPShwZXJmb3JtYW5jZXx8RGF0ZSkubm93KCl9LGVuZDpmdW5jdGlvbigpe2ErKzt2YXIgYz0ocGVyZm9ybWFuY2V8fERhdGUpLm5vdygpO2gudXBkYXRlKGMtaywyMDApO2lmKGM+ZysxRTMmJihyLnVwZGF0ZSgxRTMqYS8oYy1nKSwxMDApLGc9YyxhPTAsdCkpe3ZhciBkPXBlcmZvcm1hbmNlLm1lbW9yeTt0LnVwZGF0ZShkLnVzZWRKU0hlYXBTaXplL1xuMTA0ODU3NixkLmpzSGVhcFNpemVMaW1pdC8xMDQ4NTc2KX1yZXR1cm4gY30sdXBkYXRlOmZ1bmN0aW9uKCl7az10aGlzLmVuZCgpfSxkb21FbGVtZW50OmMsc2V0TW9kZTp1fX07Zi5QYW5lbD1mdW5jdGlvbihlLGYsbCl7dmFyIGM9SW5maW5pdHksaz0wLGc9TWF0aC5yb3VuZCxhPWcod2luZG93LmRldmljZVBpeGVsUmF0aW98fDEpLHI9ODAqYSxoPTQ4KmEsdD0zKmEsdj0yKmEsZD0zKmEsbT0xNSphLG49NzQqYSxwPTMwKmEscT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3Eud2lkdGg9cjtxLmhlaWdodD1oO3Euc3R5bGUuY3NzVGV4dD1cIndpZHRoOjgwcHg7aGVpZ2h0OjQ4cHhcIjt2YXIgYj1xLmdldENvbnRleHQoXCIyZFwiKTtiLmZvbnQ9XCJib2xkIFwiKzkqYStcInB4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmXCI7Yi50ZXh0QmFzZWxpbmU9XCJ0b3BcIjtiLmZpbGxTdHlsZT1sO2IuZmlsbFJlY3QoMCwwLHIsaCk7Yi5maWxsU3R5bGU9ZjtiLmZpbGxUZXh0KGUsdCx2KTtcbmIuZmlsbFJlY3QoZCxtLG4scCk7Yi5maWxsU3R5bGU9bDtiLmdsb2JhbEFscGhhPS45O2IuZmlsbFJlY3QoZCxtLG4scCk7cmV0dXJue2RvbTpxLHVwZGF0ZTpmdW5jdGlvbihoLHcpe2M9TWF0aC5taW4oYyxoKTtrPU1hdGgubWF4KGssaCk7Yi5maWxsU3R5bGU9bDtiLmdsb2JhbEFscGhhPTE7Yi5maWxsUmVjdCgwLDAscixtKTtiLmZpbGxTdHlsZT1mO2IuZmlsbFRleHQoZyhoKStcIiBcIitlK1wiIChcIitnKGMpK1wiLVwiK2coaykrXCIpXCIsdCx2KTtiLmRyYXdJbWFnZShxLGQrYSxtLG4tYSxwLGQsbSxuLWEscCk7Yi5maWxsUmVjdChkK24tYSxtLGEscCk7Yi5maWxsU3R5bGU9bDtiLmdsb2JhbEFscGhhPS45O2IuZmlsbFJlY3QoZCtuLWEsbSxhLGcoKDEtaC93KSpwKSl9fX07cmV0dXJuIGZ9KTtcbiIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcblxuZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8qISByZWdlbmVyYXRvci1ydW50aW1lIC0tIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLiAtLSBsaWNlbnNlIChNSVQpOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL0xJQ0VOU0UgKi9cblxuICBtb2R1bGUuZXhwb3J0cyA9IF9yZWdlbmVyYXRvclJ1bnRpbWUgPSBmdW5jdGlvbiBfcmVnZW5lcmF0b3JSdW50aW1lKCkge1xuICAgIHJldHVybiBleHBvcnRzO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7XG4gIHZhciBleHBvcnRzID0ge30sXG4gICAgICBPcCA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgICBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgICRTeW1ib2wgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCA/IFN5bWJvbCA6IHt9LFxuICAgICAgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiLFxuICAgICAgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiLFxuICAgICAgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgICB3cml0YWJsZTogITBcbiAgICB9KSwgb2JqW2tleV07XG4gIH1cblxuICB0cnkge1xuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3IsXG4gICAgICAgIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKSxcbiAgICAgICAgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yLl9pbnZva2UgPSBmdW5jdGlvbiAoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgICAgdmFyIHN0YXRlID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgICBpZiAoXCJleGVjdXRpbmdcIiA9PT0gc3RhdGUpIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG5cbiAgICAgICAgaWYgKFwiY29tcGxldGVkXCIgPT09IHN0YXRlKSB7XG4gICAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gbWV0aG9kKSB0aHJvdyBhcmc7XG4gICAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29udGV4dC5tZXRob2QgPSBtZXRob2QsIGNvbnRleHQuYXJnID0gYXJnOzspIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuXG4gICAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXCJuZXh0XCIgPT09IGNvbnRleHQubWV0aG9kKSBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7ZWxzZSBpZiAoXCJ0aHJvd1wiID09PSBjb250ZXh0Lm1ldGhvZCkge1xuICAgICAgICAgICAgaWYgKFwic3VzcGVuZGVkU3RhcnRcIiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5hcmc7XG4gICAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgICB9IGVsc2UgXCJyZXR1cm5cIiA9PT0gY29udGV4dC5tZXRob2QgJiYgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICAgIHN0YXRlID0gXCJleGVjdXRpbmdcIjtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IFwiY29tcGxldGVkXCIgOiBcInN1c3BlbmRlZFlpZWxkXCIsIHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBcInRocm93XCIgPT09IHJlY29yZC50eXBlICYmIChzdGF0ZSA9IFwiY29tcGxldGVkXCIsIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0oaW5uZXJGbiwgc2VsZiwgY29udGV4dCksIGdlbmVyYXRvcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpICYmIChJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcblxuICAgICAgaWYgKFwidGhyb3dcIiAhPT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmcsXG4gICAgICAgICAgICB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIFwib2JqZWN0XCIgPT0gX3R5cGVvZih2YWx1ZSkgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIHRoaXMuX2ludm9rZSA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG5cbiAgICBpZiAodW5kZWZpbmVkID09PSBtZXRob2QpIHtcbiAgICAgIGlmIChjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgXCJ0aHJvd1wiID09PSBjb250ZXh0Lm1ldGhvZCkge1xuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0gJiYgKGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQsIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpLCBcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSkgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSByZXR1cm4gY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZywgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgIHJldHVybiBpbmZvID8gaW5mby5kb25lID8gKGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlLCBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jLCBcInJldHVyblwiICE9PSBjb250ZXh0Lm1ldGhvZCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCkgOiBpbmZvIDogKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuICAgIDEgaW4gbG9jcyAmJiAoZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdKSwgMiBpbiBsb2NzICYmIChlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXSwgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdKSwgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIiwgZGVsZXRlIHJlY29yZC5hcmcsIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XSwgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBpdGVyYWJsZS5uZXh0KSByZXR1cm4gaXRlcmFibGU7XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgZm9yICg7ICsraSA8IGl0ZXJhYmxlLmxlbmd0aDspIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHJldHVybiBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV0sIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogITBcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpLCBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pLCBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIiksIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZ2VuRnVuICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gISFjdG9yICYmIChjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgPT09IChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkpO1xuICB9LCBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKSA6IChnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpKSwgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApLCBnZW5GdW47XG4gIH0sIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fYXdhaXQ6IGFyZ1xuICAgIH07XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSksIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvciwgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICB2b2lkIDAgPT09IFByb21pc2VJbXBsICYmIChQcm9taXNlSW1wbCA9IFByb21pc2UpO1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCksIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpLCBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KSwgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cy5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBmb3IgKDsga2V5cy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkgcmV0dXJuIG5leHQudmFsdWUgPSBrZXksIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgfTtcbiAgfSwgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXMsIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgXCJ0XCIgPT09IG5hbWUuY2hhckF0KDApICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkgJiYgKHRoaXNbbmFtZV0gPSB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIGRpc3BhdGNoRXhjZXB0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiLCByZWNvcmQuYXJnID0gZXhjZXB0aW9uLCBjb250ZXh0Lm5leHQgPSBsb2MsIGNhdWdodCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV0sXG4gICAgICAgICAgICByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICBpZiAoXCJyb290XCIgPT09IGVudHJ5LnRyeUxvYykgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpLFxuICAgICAgICAgICAgICBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiYgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmaW5hbGx5RW50cnkgJiYgKFwiYnJlYWtcIiA9PT0gdHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHR5cGUpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYyAmJiAoZmluYWxseUVudHJ5ID0gbnVsbCk7XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IHR5cGUsIHJlY29yZC5hcmcgPSBhcmcsIGZpbmFsbHlFbnRyeSA/ICh0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYywgQ29udGludWVTZW50aW5lbCkgOiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHRocm93IHJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gXCJicmVha1wiID09PSByZWNvcmQudHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHJlY29yZC50eXBlID8gdGhpcy5uZXh0ID0gcmVjb3JkLmFyZyA6IFwicmV0dXJuXCIgPT09IHJlY29yZC50eXBlID8gKHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZywgdGhpcy5tZXRob2QgPSBcInJldHVyblwiLCB0aGlzLm5leHQgPSBcImVuZFwiKSA6IFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlICYmIGFmdGVyTG9jICYmICh0aGlzLm5leHQgPSBhZnRlckxvYyksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIGZpbmlzaChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHJldHVybiB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShlbnRyeSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uIF9jYXRjaCh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiAobW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cyksIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLy8gVE9ETyhCYWJlbCA4KTogUmVtb3ZlIHRoaXMgZmlsZS5cblxudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi4vaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWVcIikoKTtcbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcblxuLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9wYWNrYWdlcy9ydW50aW1lL3J1bnRpbWUuanMjTDczNj1cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfcmVhZE9ubHlFcnJvcihuYW1lKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJcXFwiXCIgKyBuYW1lICsgXCJcXFwiIGlzIHJlYWQtb25seVwiKTtcbn0iLCJpbXBvcnQgTG9jYWxQbGF5ZXIgZnJvbSBcIi4uL21vZGVscy9sb2NhbFBsYXllci5qc1wiO1xuY29uc3Qgd3MgPSBuZXcgV2ViU29ja2V0KCd3czovL2xvY2FsaG9zdDo5OTg4JylcbmltcG9ydCBSZW1vdGVQbGF5ZXIgZnJvbSBcIi4uL21vZGVscy9yZW1vdGVQbGF5ZXIuanNcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi4vbW9kZWxzL1BsYXllci5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSkge1xuICAgICAgICB0aGlzLmlzQ29udHJvbGxlciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHNjZW5lLnN0b3JlO1xuICAgICAgICB0aGlzLmNsaWVudCA9IHdzO1xuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmFkZEdhbWVFdmVudHMoKTtcbiAgICB9XG5cbiAgICBhZGRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuY2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldE9wZW4oKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNvY2tldE9wZW4oKSB7XG4gICAgICAgIGNvbnN0IHVybFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5mcm9tRW50cmllcyh1cmxTZWFyY2hQYXJhbXMuZW50cmllcygpKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGNtZDogJ3NldElkJyxcbiAgICAgICAgICAgIGlkOiBwYXJhbXMuaWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaWVudC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgIH1cblxuICAgIGhpdFBsYXllcihwbGF5ZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyLl9pZClcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGNtZDogJ2hpdCBwbGF5ZXInLFxuICAgICAgICAgICAgc2hvb3RlcklkOiB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLnBsYXllci5faWQsXG4gICAgICAgICAgICBpZDogcGxheWVyLl9pZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpZW50LnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cblxuICAgIG9uU3RhcnRSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUuc2V0U3RhdGUoJ2dhbWVTdGFydGVkJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBhZGRHYW1lRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmNsaWVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGllbnQ6ICVzJywgZXZlbnQpO1xuICAgICAgICAgICAgaWYoZGF0YS5jbWQgPT09ICdzdGFydCByZW5kZXInKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3RhcnRSZW5kZXIoKVxuICAgICAgICAgICAgfWVsc2UgaWYoZGF0YS5jbWQgPT09ICduZXcgcGxheWVyJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk5ld1BsYXllcihkYXRhKVxuICAgICAgICAgICAgfWVsc2UgaWYoZGF0YS5jbWQgPT09ICdpbml0IGdhbWUnKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgICAgIHRoaXMub25Jbml0R2FtZShkYXRhKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuY21kID09PSAnbW92ZSBwbGF5ZXInKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW92ZVBsYXllcihkYXRhKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuY21kID09PSAncmVtb3ZlIHBsYXllcicpe1xuICAgICAgICAgICAgICAgIHRoaXMub25SZW1vdmVQbGF5ZXIoZGF0YSk7XG4gICAgICAgICAgICB9ZWxzZSBpZihkYXRhLmNtZCA9PT0gJ3BsYXllciBkZWFkJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5vblBsYXllckRlYWQoZGF0YSk7XG4gICAgICAgICAgICB9ZWxzZSBpZihkYXRhLmNtZCA9PT0gJ3VwZGF0ZSBoaXRwb2ludHMnKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVXBkYXRlSGl0UG9pbnRzKGRhdGEpXG4gICAgICAgICAgICB9ZWxzZSBpZihkYXRhLmNtZCA9PT0gJ3Jlc3Bhd24gcGxheWVyJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc3Bhd25QbGF5ZXIoZGF0YSlcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuY21kID09PSAnc2hvdCBmaXJlZCcpe1xuICAgICAgICAgICAgICAgIHRoaXMub25TaG90RmlyZWQoZGF0YSlcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuY21kID09PSAncmVjaXZlZCBtc2cnKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVjZWl2ZU1zZyhkYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uUmVjZWl2ZU1zZyhkYXRhKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZU1zZyhkYXRhLmZyb20sIGRhdGEubXNnKVxuICAgIH1cblxuICAgIHJlY2VpdmVNc2coaWQsIG1zZykge1xuICAgICAgICBsZXQgc2VuZGVyO1xuICAgICAgICBpZihpZCA9PT0gdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5faWQpe1xuICAgICAgICAgICAgc2VuZGVyID0gdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllcjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZW5kZXIgPSB0aGlzLl9maW5kUGxheWVyKGlkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TaG90RmlyZWQoZGF0YSkge1xuICAgICAgICBjb25zdCBwb3MgPSBkYXRhLnBvcztcbiAgICAgICAgdGhpcy5zY2VuZS5zb3VuZC5ndW5GaXJlM0QobmV3IEJBQllMT04uVmVjdG9yMyhwb3MueCAsIHBvcy55ICwgcG9zLnopKTtcbiAgICB9XG5cbiAgICBzaG90RmlyZWQoKSB7XG4gICAgICAgIC8vIOaSreaUvuWjsOmfs1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgY21kOiAncGxheWVyIGZpcmVkIHNob3QnLFxuICAgICAgICAgICAgaWQ6IHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIucGxheWVyLl9pZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpZW50LnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfVxuXG4gICAgb25SZXNwYXduUGxheWVyKGRhdGEpIHtcbiAgICAgICAgdGhpcy5yZXNwYXduUGxheWVyKGRhdGEucGxheWVyKVxuICAgIH1cblxuICAgIHJlc3Bhd25QbGF5ZXIocGxheWVyKSB7XG4gICAgICAgIGlmKHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIucGxheWVyLl9pZCA9PT0gcGxheWVyLl9pZCl7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLnBsYXllci5zZXREZWFkKHBsYXllci5faXNEZWFkKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIucGxheWVyLnNldEhpdFBvaW50cyhwbGF5ZXIuX2hpdFBvaW50cyk7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLnBsYXllci5zZXRYWVoocGxheWVyLl94LCBwbGF5ZXIuX3ksIHBsYXllci5feik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc3QgcmVtb3RlUGxheWVyID0gdGhpcy5fZmluZFBsYXllcihwbGF5ZXIuX2lkKTtcbiAgICAgICAgICAgIHJlbW90ZVBsYXllci5zZXREZWFkKHBsYXllci5faXNEZWFkKTtcbiAgICAgICAgICAgIHJlbW90ZVBsYXllci5zZXRIaXRQb2ludHMocGxheWVyLl9oaXRQb2ludHMpO1xuICAgICAgICAgICAgcmVtb3RlUGxheWVyLnNldFhZWihwbGF5ZXIuX3gsIHBsYXllci5feSwgcGxheWVyLl96KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXBkYXRlSGl0UG9pbnRzKGRhdGEpIHtcbiAgICAgICAgdGhpcy51cGRhdGVIaXRQb2ludHNMb2NhbFBsYXllcihkYXRhLmhpdFBvaW50cylcbiAgICB9XG5cbiAgICB1cGRhdGVIaXRQb2ludHNMb2NhbFBsYXllcihoaXRQb2ludHMpe1xuICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLnNldEhpdFBvaW50cyhoaXRQb2ludHMpXG4gICAgfVxuXG4gICAgb25OZXdQbGF5ZXIoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5ldyBwbGF5ZXIgY29ubmVjdGVkXCIpO1xuICAgICAgICB0aGlzLmFkZFJlbW90ZVBsYXllcihkYXRhLnBsYXllcilcbiAgICB9XG5cbiAgICBvbkluaXRHYW1lKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zZXRMb2NhbFBsYXllcihkYXRhLmxvY2FsUGxheWVyKTtcbiAgICAgICAgLy8gdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllciA9IGRhdGEubG9jYWxQbGF5ZXI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5yZW1vdGVQbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJlbW90ZVBsYXllcihkYXRhLnJlbW90ZVBsYXllcnNbaV0pOyBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbml0UGxheWVyc0RvbmUoKTtcbiAgICB9XG5cbiAgICBzZXRMb2NhbFBsYXllcihwbGF5ZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldCBsb2NhbCcpXG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllcilcbiAgICAgICAgY29uc3QgcCA9IHRoaXMuY2xvbmVQbGF5ZXIocGxheWVyKVxuICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyID0gbmV3IExvY2FsUGxheWVyKHRoaXMuc2NlbmUsIHApO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLlVwZGF0ZSlcbiAgICAgICAgdGhpcy5zY2VuZS5sb2FkID0gdHJ1ZVxuICAgIH1cblxuICAgIG9uUmVtb3ZlUGxheWVyKGRhdGEpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVSZW1vdGVQbGF5ZXIoZGF0YS5pZClcbiAgICB9XG5cbiAgICBvblBsYXllckRlYWQoZGF0YSkge1xuICAgICAgICB0aGlzLnBsYXllckRpZWQoZGF0YS5pZCwgZGF0YS5raWxsZXIpXG4gICAgfVxuXG4gICAgcGxheWVyRGllZChpZCwga2lsbGVyKSB7XG4gICAgICAgIGlmKGlkID09PSB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLl9pZCkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5hZGREZWF0aCgpO1xuICAgICAgICAgICAgLy8g6Z2e6Ieq5p2AXG4gICAgICAgICAgICBsZXQgcmVtb3RlUGxheWVyIFxuICAgICAgICAgICAgaWYoa2lsbGVyICE9PSBpZCl7XG4gICAgICAgICAgICAgICAgcmVtb3RlUGxheWVyID0gdGhpcy5fZmluZFBsYXllcihraWxsZXIpO1xuICAgICAgICAgICAgICAgIHJlbW90ZVBsYXllci5hZGRLaWxsKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJlbW90ZVBsYXllciA9IHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLmdvdEtpbGxlZChyZW1vdGVQbGF5ZXIpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IGtpbGxlclxuICAgICAgICAgICAgY29uc3QgZGVhZCA9IHRoaXMuX2ZpbmRQbGF5ZXIoaWQpO1xuICAgICAgICAgICAgZGVhZC5hZGREZWF0aCgpO1xuICAgICAgICAgICAgaWYoa2lsbGVyID09PSB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLl9pZCl7XG4gICAgICAgICAgICAgICAga2lsbGVyID0gdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllcjtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLmFkZEtpbGwoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAga2lsbGVyID0gdGhpcy5fZmluZFBsYXllcihraWxsZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBraWxsZXIuYWRkS2lsbCgpO1xuXG4gICAgICAgICAgICBkZWFkLmdvdEtpbGxlZChraWxsZXIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVSZW1vdGVQbGF5ZXIoaWQpIHtcbiAgICAgICAgY29uc3QgcGxheWVyID0gdGhpcy5fZmluZFBsYXllcihpZClcbiAgICAgICAgaWYoIXBsYXllcikgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIG5vdCBmb3VuZCBcIiArIGlkKTtcbiAgICAgICAgcGxheWVyLkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzLnNwbGljZSh0aGlzLnN0b3JlLnN0YXRlLnJlbW90ZVBsYXllcnMuaW5kZXhPZihwbGF5ZXIpLCAxKVxuICAgIH1cblxuICAgIGFkZFJlbW90ZVBsYXllcihwbGF5ZXIpIHtcbiAgICAgICAgY29uc3QgcCA9IHRoaXMuY2xvbmVQbGF5ZXIocGxheWVyKTtcbiAgICAgICAgY29uc3QgcmVtb3RlUGxheWVyID0gbmV3IFJlbW90ZVBsYXllcih0aGlzLnNjZW5lLCBwKVxuICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLnJlbW90ZVBsYXllcnMucHVzaChyZW1vdGVQbGF5ZXIpO1xuICAgIH1cblxuICAgIG9uTW92ZVBsYXllcihkYXRhKSB7XG4gICAgICAgIHRoaXMubW92ZVBsYXllcihkYXRhLmlkLCBkYXRhLnBvcywgZGF0YS5yb3QpXG4gICAgfVxuXG4gICAgbW92ZVBsYXllcihpZCwgcG9zLCByb3QpIHtcbiAgICAgICAgY29uc3QgcGxheWVyID0gdGhpcy5fZmluZFBsYXllcihpZCk7XG4gICAgICAgIGlmKCFwbGF5ZXIpIHJldHVybjtcbiAgICAgICAgcGxheWVyLm1vdmUocG9zLCByb3QpXG4gICAgICAgIHBsYXllci5wbGF5ZXIuc2V0WFlaKHBvcy54LCBwb3MueSwgcG9zLnopO1xuICAgICAgICBwbGF5ZXIucGxheWVyLnNldFJvdFhZWihyb3QueCwgcm90LnksIHJvdC56KTtcbiAgICB9XG5cbiAgICBfZmluZFBsYXllcihpZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuc3RvcmUuc3RhdGUucmVtb3RlUGxheWVyc1tpXS5wbGF5ZXIuX2lkID09PSBpZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuc3RhdGUucmVtb3RlUGxheWVyc1tpXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIuVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgQ3JlYXRlKCkge1xuXG4gICAgfVxuXG4gICAgRGVzdHJveSgpIHtcblxuICAgIH1cblxuICAgIHJlcXVlc3RBbGxQbGF5ZXJzICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgdG8gbG9hZCBwbGF5ZXJzJylcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGNtZDogJ3JlcXVlc3QgaW5pdCBnYW1lJ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpZW50LnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfVxuXG4gICAgaW5pdFBsYXllcnNEb25lKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW5pdGlhbCBhbGwgcGxheWVycyBkb25lJylcbiAgICB9XG5cbiAgICBzZW5kTG9jYWxQbGF5ZXJNb3ZlbWVudChwb3MsIHJvdCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHsgeDogcG9zLngsIHkgOiBwb3MueSAsIHogOiBwb3Muen07IFxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IHsgeDogcm90LngsIHkgOiByb3QueSAsIHogOiByb3Quen07XG4gICAgICAgIC8vU2VuZCBuZXcgcG9zaXRpb24gYW5kIHJvdGF0aW9uIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgdGhpcy5jbGllbnQuc2VuZChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBjbWQ6ICd1cGRhdGUgcG9zaXRpb24nLFxuICAgICAgICAgICAgcG9zOiBwb3NpdGlvbixcbiAgICAgICAgICAgIHJvdDogcm90YXRpb25cbiAgICAgICAgfSkpXG4gICAgICAgIC8vVXBkYXRlIHRoZSBsb2NhbFBsYXllciBtb2RlbCBvbiB0aGUgQ2xpZW50XG4gICAgICAgIHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIucGxheWVyLnNldFhZWihwb3MueCwgcG9zLnksIHBvcy56KTtcbiAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5wbGF5ZXIuc2V0Um90WFlaKHJvdC54LCByb3QueSwgcm90LnopO1xuICAgIH1cblxuICAgIGNsb25lUGxheWVyKHApIHtcbiAgICAgICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihwLl94LCBwLl95LCBwLl96KTtcbiAgICAgICAgcGxheWVyLnNldFJvdFhZWiggcC5feCAsIHAuX3kgLCBwLl96ICk7XG4gICAgICAgIHBsYXllci5zZXRJRChwLl9pZCk7XG4gICAgICAgIHBsYXllci5zZXRDb2xvcihwLl9jb2xvci5yICwgcC5fY29sb3IuZyAsIHAuX2NvbG9yLmIpO1xuICAgICAgICBwbGF5ZXIuc2V0SGl0UG9pbnRzKHAuX2hpdFBvaW50cyk7XG4gICAgICAgIHBsYXllci5zZXROYW1lKHAuX25hbWUpO1xuICAgICAgICBwbGF5ZXIuX2lzRGVhZCA9IHAuX2lzRGVhZDtcbiAgICAgICAgcGxheWVyLl9raWxscyA9IHAuX2tpbGxzO1xuICAgICAgICBwbGF5ZXIuX2RlYXRocyA9IHAuX2RlYXRocztcbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTb3VuZCB7XG4gIGNvbnN0cnVjdG9yKHNjZW5lKSB7XG4gICAgdGhpcy5ndW5TaG90ID0gbmV3IEJBQllMT04uU291bmQoJ2d1bnNob3QnLCAnL3dlYXBvbl8yLm1wMycsIHNjZW5lLCBudWxsLCB7IHZvbHVtZTogMC4xIH0pXG4gICAgdGhpcy5ndW5TaG90M0QgPSBuZXcgQkFCWUxPTi5Tb3VuZCgnZ3Vuc2hvdDNkJywgJy93ZWFwb25fMi5tcDMnLCBzY2VuZSwgbnVsbCwge1xuICAgICAgdm9sdW1lOiAwLjEgLHNwYXRpYWxTb3VuZDogdHJ1ZSwgbWF4RGlzdGFuY2UgOiAzMDBcbiAgICB9KVxuICB9XG5cbiAgZ3VuRmlyZSgpIHtcbiAgICB0aGlzLmd1blNob3QucGxheSgpXG4gIH1cblxuICBndW5GaXJlM0QodmVjMykge1xuICAgIHRoaXMuZ3VuU2hvdDNELnNldFBvc2l0aW9uKHZlYzMpO1xuICAgIHRoaXMuZ3VuU2hvdDNELnBsYXkoKTtcbiAgfVxufSIsImltcG9ydCBTdGF0cyBmcm9tICdzdGF0cy5qcyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi4vc3RvcmUvU3RvcmUuanMnO1xuaW1wb3J0IEJhYnlsb25TY2VuZSBmcm9tICcuLi9zY2VuZXMvYmFieWxvblNjZW5lLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIGRvbVxuICAgIH0pIHtcbiAgICAgICAgdGhpcy5kb20gPSBkb207XG4gICAgICAgIHRoaXMuc3RvcmUgPSBuZXcgU3RvcmUoKTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdG9yZURlbHRhVGltZSA9IDEwMDA7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRnJhbWUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RTdG9yZVRpbWUgPSAwO1xuICAgICAgICBpZiAodGhpcy5kb20pIHtcbiAgICAgICAgICAgIHRoaXMuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHMuYmVnaW4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjZW5lLlVwZGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0cykge1xuICAgICAgICAgICAgdGhpcy5zdGF0cy5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHRoaXMubGFzdFN0b3JlVGltZSA+IHRoaXMuc3RvcmVEZWx0YVRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFN0b3JlVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnNldFN0YXRlKCd1cGRhdGVkQXQnLCB0aGlzLmxhc3RTdG9yZVRpbWUpO1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5wZXJzaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zdG9yZS5sb2FkKCk7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5kb20uY2xpZW50V2lkdGgpO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZG9tLmNsaWVudFdpZHRoIHx8IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmRvbS5jbGllbnRIZWlnaHQgfHwgd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBjb25zb2xlLmxvZyh3aWR0aClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5kb20uYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZSh0aGlzLmNhbnZhcywgdHJ1ZSwge3ByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSwgc3RlbmNpbDogdHJ1ZX0sIHRydWUpO1xuICAgICAgICBjb25zdCB3aWR0aDIgPSB0aGlzLmVuZ2luZS5nZXRSZW5kZXJXaWR0aCgpO1xuICAgICAgICBjb25zb2xlLmxvZyh3aWR0aDIpXG4gICAgICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHMoKTtcbiAgICAgICAgLy8gdGhpcy5kb20uYXBwZW5kQ2hpbGQodGhpcy5zdGF0cy5kb21FbGVtZW50KTtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBCYWJ5bG9uU2NlbmUodGhpcy5lbmdpbmUsIHRoaXMuY2FudmFzLCB0aGlzLnN0b3JlKTtcbiAgICAgICAgdGhpcy5zY2VuZS5DcmVhdGUoKTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4geyB0aGlzLnVwZGF0ZSgpOyB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5naW5lLnJlc2l6ZSgpO1xuICAgIH1cblxuICAgIC8vIOenu+mZpGRvbVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2VuZS5EZXN0cm95KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vYXBwbGljYXRpb24vQXBwbGljYXRpb24uanMnO1xud2luZG93LmFwcCA9IG5ldyBBcHBsaWNhdGlvbih7XG4gICAgZG9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2FycCcpLFxufSk7XG53aW5kb3cuYXBwLnN0YXJ0KCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgd2luZG93LmFwcC5yZXNpemUoKTtcbn0pO1xuIl0sIm5hbWVzIjpbIkxvY2FsUGxheWVyIiwid3MiLCJXZWJTb2NrZXQiLCJSZW1vdGVQbGF5ZXIiLCJQbGF5ZXIiLCJDb250cm9sbGVyIiwic2NlbmUiLCJpc0NvbnRyb2xsZXIiLCJzdG9yZSIsImNsaWVudCIsImFkZEV2ZW50cyIsImFkZEdhbWVFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwic29ja2V0T3BlbiIsInVybFNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicGFyYW1zIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiZGF0YSIsImNtZCIsImlkIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwbGF5ZXIiLCJjb25zb2xlIiwibG9nIiwiX2lkIiwic2hvb3RlcklkIiwic3RhdGUiLCJsb2NhbFBsYXllciIsInNldFN0YXRlIiwiZXZlbnQiLCJwYXJzZSIsIm9uU3RhcnRSZW5kZXIiLCJvbk5ld1BsYXllciIsIm9uSW5pdEdhbWUiLCJvbk1vdmVQbGF5ZXIiLCJvblJlbW92ZVBsYXllciIsIm9uUGxheWVyRGVhZCIsIm9uVXBkYXRlSGl0UG9pbnRzIiwib25SZXNwYXduUGxheWVyIiwib25TaG90RmlyZWQiLCJvblJlY2VpdmVNc2ciLCJyZWNlaXZlTXNnIiwiZnJvbSIsIm1zZyIsInNlbmRlciIsIl9maW5kUGxheWVyIiwicG9zIiwic291bmQiLCJndW5GaXJlM0QiLCJCQUJZTE9OIiwiVmVjdG9yMyIsIngiLCJ5IiwieiIsInJlc3Bhd25QbGF5ZXIiLCJzZXREZWFkIiwiX2lzRGVhZCIsInNldEhpdFBvaW50cyIsIl9oaXRQb2ludHMiLCJzZXRYWVoiLCJfeCIsIl95IiwiX3oiLCJyZW1vdGVQbGF5ZXIiLCJ1cGRhdGVIaXRQb2ludHNMb2NhbFBsYXllciIsImhpdFBvaW50cyIsImFkZFJlbW90ZVBsYXllciIsInNldExvY2FsUGxheWVyIiwiaSIsInJlbW90ZVBsYXllcnMiLCJsZW5ndGgiLCJpbml0UGxheWVyc0RvbmUiLCJwIiwiY2xvbmVQbGF5ZXIiLCJVcGRhdGUiLCJsb2FkIiwicmVtb3ZlUmVtb3RlUGxheWVyIiwicGxheWVyRGllZCIsImtpbGxlciIsImFkZERlYXRoIiwiYWRkS2lsbCIsImdvdEtpbGxlZCIsImRlYWQiLCJFcnJvciIsIkRlc3Ryb3kiLCJzcGxpY2UiLCJpbmRleE9mIiwicHVzaCIsIm1vdmVQbGF5ZXIiLCJyb3QiLCJtb3ZlIiwic2V0Um90WFlaIiwicG9zaXRpb24iLCJyb3RhdGlvbiIsInNldElEIiwic2V0Q29sb3IiLCJfY29sb3IiLCJyIiwiZyIsImIiLCJzZXROYW1lIiwiX25hbWUiLCJfa2lsbHMiLCJfZGVhdGhzIiwiU291bmQiLCJndW5TaG90Iiwidm9sdW1lIiwiZ3VuU2hvdDNEIiwic3BhdGlhbFNvdW5kIiwibWF4RGlzdGFuY2UiLCJwbGF5IiwidmVjMyIsInNldFBvc2l0aW9uIiwiU3RhdHMiLCJTdG9yZSIsIkJhYnlsb25TY2VuZSIsIkFwcGxpY2F0aW9uIiwiZG9tIiwibG9hZGVkIiwiZGVzdHJveWVkIiwic3RvcmVEZWx0YVRpbWUiLCJhbmltYXRpb25GcmFtZSIsImxhc3RTdG9yZVRpbWUiLCJzdHlsZSIsInN0YXRzIiwiYmVnaW4iLCJlbmQiLCJEYXRlIiwibm93IiwicGVyc2lzdCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwiZGlzcGxheSIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJpbm5lcldpZHRoIiwiaGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJhcHBlbmRDaGlsZCIsImVuZ2luZSIsIkVuZ2luZSIsInByZXNlcnZlRHJhd2luZ0J1ZmZlciIsInN0ZW5jaWwiLCJ3aWR0aDIiLCJnZXRSZW5kZXJXaWR0aCIsIkNyZWF0ZSIsInJ1blJlbmRlckxvb3AiLCJ1cGRhdGUiLCJyZXNpemUiLCJhcHAiLCJnZXRFbGVtZW50QnlJZCIsInN0YXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==