(self["webpackChunkmetaverse"] = self["webpackChunkmetaverse"] || []).push([[545],{

/***/ 553:
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ 757:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(553);


/***/ }),

/***/ 466:
/***/ (function(module) {

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){ true?module.exports=e():0})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});


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

/***/ 249:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(144);
/* harmony import */ var _models_localPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(552);
/* harmony import */ var _models_remotePlayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75);
/* harmony import */ var _models_Player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(83);



var ws = new WebSocket('ws://49.234.96.253:9988');



var Controller = /*#__PURE__*/function () {
  function Controller(scene) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(this, Controller);

    this.isController = true;
    this.scene = scene;
    this.store = scene.store;
    this.client = ws;
    this.addEvents();
    this.addGameEvents();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(Controller, [{
    key: "addEvents",
    value: function addEvents() {
      this.client.addEventListener('open', function () {// this.socketOpen()
      });
    }
  }, {
    key: "socketOpen",
    value: function socketOpen() {// this.client.send(JSON.stringify(data))
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
      var _this = this;

      this.client.addEventListener('message', function (event) {
        var data = JSON.parse(event.data);
        console.log(data);

        if (data.cmd === 'start render') {
          _this.onStartRender();
        } else if (data.cmd === 'new player') {
          _this.onNewPlayer(data);
        } else if (data.cmd === 'init game') {
          console.log(data);

          _this.onInitGame(data);
        } else if (data.cmd === 'move player') {
          _this.onMovePlayer(data);
        } else if (data.cmd === 'remove player') {
          _this.onRemovePlayer(data);
        } else if (data.cmd === 'player dead') {
          _this.onPlayerDead(data);
        } else if (data.cmd === 'update hitpoints') {
          _this.onUpdateHitPoints(data);
        } else if (data.cmd === 'respawn player') {
          _this.onRespawnPlayer(data);
        } else if (data.cmd === 'shot fired') {
          _this.onShotFired(data);
        } else if (data.cmd === 'recived msg') {
          _this.onReceiveMsg(data);
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
      console.log(data);
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
      this.store.state.localPlayer = new _models_localPlayer_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(this.scene, p);
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

        var dead = this._findPlayer(id); // dead.addDeath();


        if (_killer === this.store.state.localPlayer._id) {
          _killer = this.store.state.localPlayer;
          this.store.state.localPlayer.addKill();
        } else {
          _killer = this._findPlayer(_killer);
        }

        _killer.addKill(); // dead.gotKilled(killer)

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
      console.log('add' + player._id);
      var p = this.clonePlayer(player);
      var remotePlayer = new _models_remotePlayer_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(this.scene, p);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbn5lOTZlOWJlYS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLE1BQU07QUFDTixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FB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LE9BQU8sQ0FBQ0MsR0FBUixDQUFZaUksTUFBWjtNQUNBLEtBQUt0QixLQUFMLEdBQWEsSUFBSVgsU0FBSixFQUFiLENBZkksQ0FnQko7O01BQ0EsS0FBS3pHLEtBQUwsR0FBYSxJQUFJMkcsMkJBQUosQ0FBaUIsS0FBSzJCLE1BQXRCLEVBQThCLEtBQUtaLE1BQW5DLEVBQTJDLEtBQUt4SCxLQUFoRCxDQUFiO01BQ0EsS0FBS0YsS0FBTCxDQUFXNEksTUFBWDtNQUNBLEtBQUs5QixNQUFMLEdBQWMsSUFBZCxDQW5CSSxDQW9CSjs7TUFFQSxLQUFLd0IsTUFBTCxDQUFZTyxhQUFaLENBQTBCLFlBQU07UUFBRSxLQUFJLENBQUNDLE1BQUw7TUFBZ0IsQ0FBbEQ7TUFDQWQsTUFBTSxDQUFDMUgsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtRQUNwQyxLQUFJLENBQUN5SSxNQUFMO01BQ0gsQ0FGRDtJQUdIOzs7V0FFRCxrQkFBUztNQUNMLElBQUksQ0FBQyxLQUFLakMsTUFBVixFQUFrQjtRQUNkO01BQ0g7O01BQ0QsS0FBS3dCLE1BQUwsQ0FBWVMsTUFBWjtJQUNILEVBRUQ7Ozs7V0FDQSxtQkFBVTtNQUNOLEtBQUtoQyxTQUFMLEdBQWlCLElBQWpCO01BQ0EsS0FBSy9HLEtBQUwsQ0FBVzRFLE9BQVg7SUFDSDs7Ozs7Ozs7QUN6RUw7QUFDQW9ELE1BQU0sQ0FBQ2dCLEdBQVAsR0FBYSxJQUFJcEMsV0FBSixDQUFnQjtFQUN6QkMsR0FBRyxFQUFFYyxRQUFRLENBQUNzQixjQUFULENBQXdCLE1BQXhCO0FBRG9CLENBQWhCLENBQWI7QUFHQWpCLE1BQU0sQ0FBQ2dCLEdBQVAsQ0FBV0UsS0FBWDtBQUVBbEIsTUFBTSxDQUFDMUgsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtFQUNwQzBILE1BQU0sQ0FBQ2dCLEdBQVAsQ0FBV0QsTUFBWDtBQUNILENBRkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vbm9kZV9tb2R1bGVzL3N0YXRzLmpzL2J1aWxkL3N0YXRzLm1pbi5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL21ldGF2ZXJzZS8uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL2NvbnRyb2xsZXIvc291bmQuanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL2FwcGxpY2F0aW9uL0FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovL21ldGF2ZXJzZS8uL3NyYy9kZW1vLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCIvLyBzdGF0cy5qcyAtIGh0dHA6Ly9naXRodWIuY29tL21yZG9vYi9zdGF0cy5qc1xuKGZ1bmN0aW9uKGYsZSl7XCJvYmplY3RcIj09PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6Zi5TdGF0cz1lKCl9KSh0aGlzLGZ1bmN0aW9uKCl7dmFyIGY9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGEpe2MuYXBwZW5kQ2hpbGQoYS5kb20pO3JldHVybiBhfWZ1bmN0aW9uIHUoYSl7Zm9yKHZhciBkPTA7ZDxjLmNoaWxkcmVuLmxlbmd0aDtkKyspYy5jaGlsZHJlbltkXS5zdHlsZS5kaXNwbGF5PWQ9PT1hP1wiYmxvY2tcIjpcIm5vbmVcIjtsPWF9dmFyIGw9MCxjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Yy5zdHlsZS5jc3NUZXh0PVwicG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MC45O3otaW5kZXg6MTAwMDBcIjtjLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2EucHJldmVudERlZmF1bHQoKTtcbnUoKytsJWMuY2hpbGRyZW4ubGVuZ3RoKX0sITEpO3ZhciBrPShwZXJmb3JtYW5jZXx8RGF0ZSkubm93KCksZz1rLGE9MCxyPWUobmV3IGYuUGFuZWwoXCJGUFNcIixcIiMwZmZcIixcIiMwMDJcIikpLGg9ZShuZXcgZi5QYW5lbChcIk1TXCIsXCIjMGYwXCIsXCIjMDIwXCIpKTtpZihzZWxmLnBlcmZvcm1hbmNlJiZzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSl2YXIgdD1lKG5ldyBmLlBhbmVsKFwiTUJcIixcIiNmMDhcIixcIiMyMDFcIikpO3UoMCk7cmV0dXJue1JFVklTSU9OOjE2LGRvbTpjLGFkZFBhbmVsOmUsc2hvd1BhbmVsOnUsYmVnaW46ZnVuY3Rpb24oKXtrPShwZXJmb3JtYW5jZXx8RGF0ZSkubm93KCl9LGVuZDpmdW5jdGlvbigpe2ErKzt2YXIgYz0ocGVyZm9ybWFuY2V8fERhdGUpLm5vdygpO2gudXBkYXRlKGMtaywyMDApO2lmKGM+ZysxRTMmJihyLnVwZGF0ZSgxRTMqYS8oYy1nKSwxMDApLGc9YyxhPTAsdCkpe3ZhciBkPXBlcmZvcm1hbmNlLm1lbW9yeTt0LnVwZGF0ZShkLnVzZWRKU0hlYXBTaXplL1xuMTA0ODU3NixkLmpzSGVhcFNpemVMaW1pdC8xMDQ4NTc2KX1yZXR1cm4gY30sdXBkYXRlOmZ1bmN0aW9uKCl7az10aGlzLmVuZCgpfSxkb21FbGVtZW50OmMsc2V0TW9kZTp1fX07Zi5QYW5lbD1mdW5jdGlvbihlLGYsbCl7dmFyIGM9SW5maW5pdHksaz0wLGc9TWF0aC5yb3VuZCxhPWcod2luZG93LmRldmljZVBpeGVsUmF0aW98fDEpLHI9ODAqYSxoPTQ4KmEsdD0zKmEsdj0yKmEsZD0zKmEsbT0xNSphLG49NzQqYSxwPTMwKmEscT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3Eud2lkdGg9cjtxLmhlaWdodD1oO3Euc3R5bGUuY3NzVGV4dD1cIndpZHRoOjgwcHg7aGVpZ2h0OjQ4cHhcIjt2YXIgYj1xLmdldENvbnRleHQoXCIyZFwiKTtiLmZvbnQ9XCJib2xkIFwiKzkqYStcInB4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmXCI7Yi50ZXh0QmFzZWxpbmU9XCJ0b3BcIjtiLmZpbGxTdHlsZT1sO2IuZmlsbFJlY3QoMCwwLHIsaCk7Yi5maWxsU3R5bGU9ZjtiLmZpbGxUZXh0KGUsdCx2KTtcbmIuZmlsbFJlY3QoZCxtLG4scCk7Yi5maWxsU3R5bGU9bDtiLmdsb2JhbEFscGhhPS45O2IuZmlsbFJlY3QoZCxtLG4scCk7cmV0dXJue2RvbTpxLHVwZGF0ZTpmdW5jdGlvbihoLHcpe2M9TWF0aC5taW4oYyxoKTtrPU1hdGgubWF4KGssaCk7Yi5maWxsU3R5bGU9bDtiLmdsb2JhbEFscGhhPTE7Yi5maWxsUmVjdCgwLDAscixtKTtiLmZpbGxTdHlsZT1mO2IuZmlsbFRleHQoZyhoKStcIiBcIitlK1wiIChcIitnKGMpK1wiLVwiK2coaykrXCIpXCIsdCx2KTtiLmRyYXdJbWFnZShxLGQrYSxtLG4tYSxwLGQsbSxuLWEscCk7Yi5maWxsUmVjdChkK24tYSxtLGEscCk7Yi5maWxsU3R5bGU9bDtiLmdsb2JhbEFscGhhPS45O2IuZmlsbFJlY3QoZCtuLWEsbSxhLGcoKDEtaC93KSpwKSl9fX07cmV0dXJuIGZ9KTtcbiIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiaW1wb3J0IExvY2FsUGxheWVyIGZyb20gXCIuLi9tb2RlbHMvbG9jYWxQbGF5ZXIuanNcIjtcbmNvbnN0IHdzID0gbmV3IFdlYlNvY2tldCgnd3M6Ly80OS4yMzQuOTYuMjUzOjk5ODgnKVxuaW1wb3J0IFJlbW90ZVBsYXllciBmcm9tIFwiLi4vbW9kZWxzL3JlbW90ZVBsYXllci5qc1wiO1xuaW1wb3J0IFBsYXllciBmcm9tICcuLi9tb2RlbHMvUGxheWVyLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKHNjZW5lKSB7XG4gICAgICAgIHRoaXMuaXNDb250cm9sbGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgICB0aGlzLnN0b3JlID0gc2NlbmUuc3RvcmU7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gd3M7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYWRkR2FtZUV2ZW50cygpO1xuICAgIH1cblxuICAgIGFkZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5jbGllbnQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsICgpID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc29ja2V0T3BlbigpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc29ja2V0T3BlbigpIHtcbiAgICAgICAgLy8gdGhpcy5jbGllbnQuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICB9XG5cbiAgICBoaXRQbGF5ZXIocGxheWVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllci5faWQpXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBjbWQ6ICdoaXQgcGxheWVyJyxcbiAgICAgICAgICAgIHNob290ZXJJZDogdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5wbGF5ZXIuX2lkLFxuICAgICAgICAgICAgaWQ6IHBsYXllci5faWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaWVudC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG5cbiAgICBvblN0YXJ0UmVuZGVyKCkge1xuICAgICAgICB0aGlzLnN0b3JlLnNldFN0YXRlKCdnYW1lU3RhcnRlZCcsIHRydWUpXG4gICAgfVxuXG4gICAgYWRkR2FtZUV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5jbGllbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmKGRhdGEuY21kID09PSAnc3RhcnQgcmVuZGVyJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YXJ0UmVuZGVyKClcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuY21kID09PSAnbmV3IHBsYXllcicpe1xuICAgICAgICAgICAgICAgIHRoaXMub25OZXdQbGF5ZXIoZGF0YSlcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuY21kID09PSAnaW5pdCBnYW1lJyl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICAgICAgICB0aGlzLm9uSW5pdEdhbWUoZGF0YSk7XG4gICAgICAgICAgICB9ZWxzZSBpZihkYXRhLmNtZCA9PT0gJ21vdmUgcGxheWVyJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vdmVQbGF5ZXIoZGF0YSk7XG4gICAgICAgICAgICB9ZWxzZSBpZihkYXRhLmNtZCA9PT0gJ3JlbW92ZSBwbGF5ZXInKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVtb3ZlUGxheWVyKGRhdGEpO1xuICAgICAgICAgICAgfWVsc2UgaWYoZGF0YS5jbWQgPT09ICdwbGF5ZXIgZGVhZCcpe1xuICAgICAgICAgICAgICAgIHRoaXMub25QbGF5ZXJEZWFkKGRhdGEpO1xuICAgICAgICAgICAgfWVsc2UgaWYoZGF0YS5jbWQgPT09ICd1cGRhdGUgaGl0cG9pbnRzJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5vblVwZGF0ZUhpdFBvaW50cyhkYXRhKVxuICAgICAgICAgICAgfWVsc2UgaWYoZGF0YS5jbWQgPT09ICdyZXNwYXduIHBsYXllcicpe1xuICAgICAgICAgICAgICAgIHRoaXMub25SZXNwYXduUGxheWVyKGRhdGEpXG4gICAgICAgICAgICB9ZWxzZSBpZihkYXRhLmNtZCA9PT0gJ3Nob3QgZmlyZWQnKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdEZpcmVkKGRhdGEpXG4gICAgICAgICAgICB9ZWxzZSBpZihkYXRhLmNtZCA9PT0gJ3JlY2l2ZWQgbXNnJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlY2VpdmVNc2coZGF0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvblJlY2VpdmVNc2coZGF0YSkge1xuICAgICAgICB0aGlzLnJlY2VpdmVNc2coZGF0YS5mcm9tLCBkYXRhLm1zZylcbiAgICB9XG5cbiAgICByZWNlaXZlTXNnKGlkLCBtc2cpIHtcbiAgICAgICAgbGV0IHNlbmRlcjtcbiAgICAgICAgaWYoaWQgPT09IHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIuX2lkKXtcbiAgICAgICAgICAgIHNlbmRlciA9IHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXI7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2VuZGVyID0gdGhpcy5fZmluZFBsYXllcihpZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2hvdEZpcmVkKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcG9zID0gZGF0YS5wb3M7XG4gICAgICAgIHRoaXMuc2NlbmUuc291bmQuZ3VuRmlyZTNEKG5ldyBCQUJZTE9OLlZlY3RvcjMocG9zLnggLCBwb3MueSAsIHBvcy56KSk7XG4gICAgfVxuXG4gICAgc2hvdEZpcmVkKCkge1xuICAgICAgICAvLyDmkq3mlL7lo7Dpn7NcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGNtZDogJ3BsYXllciBmaXJlZCBzaG90JyxcbiAgICAgICAgICAgIGlkOiB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLnBsYXllci5faWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaWVudC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgIH1cblxuICAgIG9uUmVzcGF3blBsYXllcihkYXRhKSB7XG4gICAgICAgIHRoaXMucmVzcGF3blBsYXllcihkYXRhLnBsYXllcilcbiAgICB9XG5cbiAgICByZXNwYXduUGxheWVyKHBsYXllcikge1xuICAgICAgICBpZih0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLnBsYXllci5faWQgPT09IHBsYXllci5faWQpe1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5wbGF5ZXIuc2V0RGVhZChwbGF5ZXIuX2lzRGVhZCk7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLnBsYXllci5zZXRIaXRQb2ludHMocGxheWVyLl9oaXRQb2ludHMpO1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5wbGF5ZXIuc2V0WFlaKHBsYXllci5feCwgcGxheWVyLl95LCBwbGF5ZXIuX3opO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnN0IHJlbW90ZVBsYXllciA9IHRoaXMuX2ZpbmRQbGF5ZXIocGxheWVyLl9pZCk7XG4gICAgICAgICAgICByZW1vdGVQbGF5ZXIuc2V0RGVhZChwbGF5ZXIuX2lzRGVhZCk7XG4gICAgICAgICAgICByZW1vdGVQbGF5ZXIuc2V0SGl0UG9pbnRzKHBsYXllci5faGl0UG9pbnRzKTtcbiAgICAgICAgICAgIHJlbW90ZVBsYXllci5zZXRYWVoocGxheWVyLl94LCBwbGF5ZXIuX3ksIHBsYXllci5feik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwZGF0ZUhpdFBvaW50cyhkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgIHRoaXMudXBkYXRlSGl0UG9pbnRzTG9jYWxQbGF5ZXIoZGF0YS5oaXRQb2ludHMpXG4gICAgfVxuXG4gICAgdXBkYXRlSGl0UG9pbnRzTG9jYWxQbGF5ZXIoaGl0UG9pbnRzKXtcbiAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5zZXRIaXRQb2ludHMoaGl0UG9pbnRzKVxuICAgIH1cblxuICAgIG9uTmV3UGxheWVyKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOZXcgcGxheWVyIGNvbm5lY3RlZFwiKTtcbiAgICAgICAgdGhpcy5hZGRSZW1vdGVQbGF5ZXIoZGF0YS5wbGF5ZXIpXG4gICAgfVxuXG4gICAgb25Jbml0R2FtZShkYXRhKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxQbGF5ZXIoZGF0YS5sb2NhbFBsYXllcik7XG4gICAgICAgIC8vIHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIgPSBkYXRhLmxvY2FsUGxheWVyO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucmVtb3RlUGxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5hZGRSZW1vdGVQbGF5ZXIoZGF0YS5yZW1vdGVQbGF5ZXJzW2ldKTsgXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5pdFBsYXllcnNEb25lKCk7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxQbGF5ZXIocGxheWVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXQgbG9jYWwnKVxuICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIpXG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLmNsb25lUGxheWVyKHBsYXllcilcbiAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllciA9IG5ldyBMb2NhbFBsYXllcih0aGlzLnNjZW5lLCBwKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5VcGRhdGUpXG4gICAgICAgIHRoaXMuc2NlbmUubG9hZCA9IHRydWVcbiAgICB9XG5cbiAgICBvblJlbW92ZVBsYXllcihkYXRhKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUmVtb3RlUGxheWVyKGRhdGEuaWQpXG4gICAgfVxuXG4gICAgb25QbGF5ZXJEZWFkKGRhdGEpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJEaWVkKGRhdGEuaWQsIGRhdGEua2lsbGVyKVxuICAgIH1cblxuICAgIHBsYXllckRpZWQoaWQsIGtpbGxlcikge1xuICAgICAgICBpZihpZCA9PT0gdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5faWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIuYWRkRGVhdGgoKTtcbiAgICAgICAgICAgIC8vIOmdnuiHquadgFxuICAgICAgICAgICAgbGV0IHJlbW90ZVBsYXllciBcbiAgICAgICAgICAgIGlmKGtpbGxlciAhPT0gaWQpe1xuICAgICAgICAgICAgICAgIHJlbW90ZVBsYXllciA9IHRoaXMuX2ZpbmRQbGF5ZXIoa2lsbGVyKTtcbiAgICAgICAgICAgICAgICByZW1vdGVQbGF5ZXIuYWRkS2lsbCgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZW1vdGVQbGF5ZXIgPSB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5nb3RLaWxsZWQocmVtb3RlUGxheWVyKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCBraWxsZXJcbiAgICAgICAgICAgIGNvbnN0IGRlYWQgPSB0aGlzLl9maW5kUGxheWVyKGlkKTtcbiAgICAgICAgICAgIC8vIGRlYWQuYWRkRGVhdGgoKTtcbiAgICAgICAgICAgIGlmKGtpbGxlciA9PT0gdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5faWQpe1xuICAgICAgICAgICAgICAgIGtpbGxlciA9IHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5sb2NhbFBsYXllci5hZGRLaWxsKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGtpbGxlciA9IHRoaXMuX2ZpbmRQbGF5ZXIoa2lsbGVyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2lsbGVyLmFkZEtpbGwoKTtcblxuICAgICAgICAgICAgLy8gZGVhZC5nb3RLaWxsZWQoa2lsbGVyKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlUmVtb3RlUGxheWVyKGlkKSB7XG4gICAgICAgIGNvbnN0IHBsYXllciA9IHRoaXMuX2ZpbmRQbGF5ZXIoaWQpXG4gICAgICAgIGlmKCFwbGF5ZXIpIHRocm93IG5ldyBFcnJvcihcIlBsYXllciBub3QgZm91bmQgXCIgKyBpZCk7XG4gICAgICAgIHBsYXllci5EZXN0cm95KCk7XG4gICAgICAgIHRoaXMuc3RvcmUuc3RhdGUucmVtb3RlUGxheWVycy5zcGxpY2UodGhpcy5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzLmluZGV4T2YocGxheWVyKSwgMSlcbiAgICB9XG5cbiAgICBhZGRSZW1vdGVQbGF5ZXIocGxheWVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGQnICsgcGxheWVyLl9pZCk7XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLmNsb25lUGxheWVyKHBsYXllcik7XG4gICAgICAgIGNvbnN0IHJlbW90ZVBsYXllciA9IG5ldyBSZW1vdGVQbGF5ZXIodGhpcy5zY2VuZSwgcClcbiAgICAgICAgdGhpcy5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzLnB1c2gocmVtb3RlUGxheWVyKTtcbiAgICB9XG5cbiAgICBvbk1vdmVQbGF5ZXIoZGF0YSkge1xuICAgICAgICB0aGlzLm1vdmVQbGF5ZXIoZGF0YS5pZCwgZGF0YS5wb3MsIGRhdGEucm90KVxuICAgIH1cblxuICAgIG1vdmVQbGF5ZXIoaWQsIHBvcywgcm90KSB7XG4gICAgICAgIGNvbnN0IHBsYXllciA9IHRoaXMuX2ZpbmRQbGF5ZXIoaWQpO1xuICAgICAgICBpZighcGxheWVyKSByZXR1cm47XG4gICAgICAgIHBsYXllci5tb3ZlKHBvcywgcm90KVxuICAgICAgICBwbGF5ZXIucGxheWVyLnNldFhZWihwb3MueCwgcG9zLnksIHBvcy56KTtcbiAgICAgICAgcGxheWVyLnBsYXllci5zZXRSb3RYWVoocm90LngsIHJvdC55LCByb3Queik7XG4gICAgfVxuXG4gICAgX2ZpbmRQbGF5ZXIoaWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc3RvcmUuc3RhdGUucmVtb3RlUGxheWVycy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZih0aGlzLnN0b3JlLnN0YXRlLnJlbW90ZVBsYXllcnNbaV0ucGxheWVyLl9pZCA9PT0gaWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlLnN0YXRlLnJlbW90ZVBsYXllcnNbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLlVwZGF0ZSgpO1xuICAgIH1cblxuICAgIENyZWF0ZSgpIHtcblxuICAgIH1cblxuICAgIERlc3Ryb3koKSB7XG5cbiAgICB9XG5cbiAgICByZXF1ZXN0QWxsUGxheWVycyAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IHRvIGxvYWQgcGxheWVycycpXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBjbWQ6ICdyZXF1ZXN0IGluaXQgZ2FtZSdcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaWVudC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgIH1cblxuICAgIGluaXRQbGF5ZXJzRG9uZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luaXRpYWwgYWxsIHBsYXllcnMgZG9uZScpXG4gICAgfVxuXG4gICAgc2VuZExvY2FsUGxheWVyTW92ZW1lbnQocG9zLCByb3QpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB7IHg6IHBvcy54LCB5IDogcG9zLnkgLCB6IDogcG9zLnp9OyBcbiAgICAgICAgY29uc3Qgcm90YXRpb24gPSB7IHg6IHJvdC54LCB5IDogcm90LnkgLCB6IDogcm90Lnp9O1xuICAgICAgICAvL1NlbmQgbmV3IHBvc2l0aW9uIGFuZCByb3RhdGlvbiB0byB0aGUgc2VydmVyXG4gICAgICAgIHRoaXMuY2xpZW50LnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY21kOiAndXBkYXRlIHBvc2l0aW9uJyxcbiAgICAgICAgICAgIHBvczogcG9zaXRpb24sXG4gICAgICAgICAgICByb3Q6IHJvdGF0aW9uXG4gICAgICAgIH0pKVxuICAgICAgICAvL1VwZGF0ZSB0aGUgbG9jYWxQbGF5ZXIgbW9kZWwgb24gdGhlIENsaWVudFxuICAgICAgICB0aGlzLnN0b3JlLnN0YXRlLmxvY2FsUGxheWVyLnBsYXllci5zZXRYWVoocG9zLngsIHBvcy55LCBwb3Mueik7XG4gICAgICAgIHRoaXMuc3RvcmUuc3RhdGUubG9jYWxQbGF5ZXIucGxheWVyLnNldFJvdFhZWihyb3QueCwgcm90LnksIHJvdC56KTtcbiAgICB9XG5cbiAgICBjbG9uZVBsYXllcihwKSB7XG4gICAgICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIocC5feCwgcC5feSwgcC5feik7XG4gICAgICAgIHBsYXllci5zZXRSb3RYWVooIHAuX3ggLCBwLl95ICwgcC5feiApO1xuICAgICAgICBwbGF5ZXIuc2V0SUQocC5faWQpO1xuICAgICAgICBwbGF5ZXIuc2V0Q29sb3IocC5fY29sb3IuciAsIHAuX2NvbG9yLmcgLCBwLl9jb2xvci5iKTtcbiAgICAgICAgcGxheWVyLnNldEhpdFBvaW50cyhwLl9oaXRQb2ludHMpO1xuICAgICAgICBwbGF5ZXIuc2V0TmFtZShwLl9uYW1lKTtcbiAgICAgICAgcGxheWVyLl9pc0RlYWQgPSBwLl9pc0RlYWQ7XG4gICAgICAgIHBsYXllci5fa2lsbHMgPSBwLl9raWxscztcbiAgICAgICAgcGxheWVyLl9kZWF0aHMgPSBwLl9kZWF0aHM7XG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291bmQge1xuICBjb25zdHJ1Y3RvcihzY2VuZSkge1xuICAgIHRoaXMuZ3VuU2hvdCA9IG5ldyBCQUJZTE9OLlNvdW5kKCdndW5zaG90JywgJy93ZWFwb25fMi5tcDMnLCBzY2VuZSwgbnVsbCwgeyB2b2x1bWU6IDAuMSB9KVxuICAgIHRoaXMuZ3VuU2hvdDNEID0gbmV3IEJBQllMT04uU291bmQoJ2d1bnNob3QzZCcsICcvd2VhcG9uXzIubXAzJywgc2NlbmUsIG51bGwsIHtcbiAgICAgIHZvbHVtZTogMC4xICxzcGF0aWFsU291bmQ6IHRydWUsIG1heERpc3RhbmNlIDogMzAwXG4gICAgfSlcbiAgfVxuXG4gIGd1bkZpcmUoKSB7XG4gICAgdGhpcy5ndW5TaG90LnBsYXkoKVxuICB9XG5cbiAgZ3VuRmlyZTNEKHZlYzMpIHtcbiAgICB0aGlzLmd1blNob3QzRC5zZXRQb3NpdGlvbih2ZWMzKTtcbiAgICB0aGlzLmd1blNob3QzRC5wbGF5KCk7XG4gIH1cbn0iLCJpbXBvcnQgU3RhdHMgZnJvbSAnc3RhdHMuanMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJy4uL3N0b3JlL1N0b3JlLmpzJztcbmltcG9ydCBCYWJ5bG9uU2NlbmUgZnJvbSAnLi4vc2NlbmVzL2JhYnlsb25TY2VuZS5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICBkb21cbiAgICB9KSB7XG4gICAgICAgIHRoaXMuZG9tID0gZG9tO1xuICAgICAgICB0aGlzLnN0b3JlID0gbmV3IFN0b3JlKCk7XG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RvcmVEZWx0YVRpbWUgPSAxMDAwO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0U3RvcmVUaW1lID0gMDtcbiAgICAgICAgaWYgKHRoaXMuZG9tKSB7XG4gICAgICAgICAgICB0aGlzLmRvbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRzKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRzLmJlZ2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2VuZS5VcGRhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHMuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLmxhc3RTdG9yZVRpbWUgPiB0aGlzLnN0b3JlRGVsdGFUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RTdG9yZVRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5zZXRTdGF0ZSgndXBkYXRlZEF0JywgdGhpcy5sYXN0U3RvcmVUaW1lKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUucGVyc2lzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUubG9hZCgpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZG9tLmNsaWVudFdpZHRoKTtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmRvbS5jbGllbnRXaWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5kb20uY2xpZW50SGVpZ2h0IHx8IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY29uc29sZS5sb2cod2lkdGgpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuZG9tLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUodGhpcy5jYW52YXMsIHRydWUsIHtwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsIHN0ZW5jaWw6IHRydWV9LCB0cnVlKTtcbiAgICAgICAgY29uc3Qgd2lkdGgyID0gdGhpcy5lbmdpbmUuZ2V0UmVuZGVyV2lkdGgoKTtcbiAgICAgICAgY29uc29sZS5sb2cod2lkdGgyKVxuICAgICAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKCk7XG4gICAgICAgIC8vIHRoaXMuZG9tLmFwcGVuZENoaWxkKHRoaXMuc3RhdHMuZG9tRWxlbWVudCk7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgQmFieWxvblNjZW5lKHRoaXMuZW5naW5lLCB0aGlzLmNhbnZhcywgdGhpcy5zdG9yZSk7XG4gICAgICAgIHRoaXMuc2NlbmUuQ3JlYXRlKCk7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy51cGRhdGUoKTtcblxuICAgICAgICB0aGlzLmVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHsgdGhpcy51cGRhdGUoKTsgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNpemUoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZ2luZS5yZXNpemUoKTtcbiAgICB9XG5cbiAgICAvLyDnp7vpmaRkb21cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NlbmUuRGVzdHJveSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2FwcGxpY2F0aW9uL0FwcGxpY2F0aW9uLmpzJztcbndpbmRvdy5hcHAgPSBuZXcgQXBwbGljYXRpb24oe1xuICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dhcnAnKSxcbn0pO1xud2luZG93LmFwcC5zdGFydCgpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgIHdpbmRvdy5hcHAucmVzaXplKCk7XG59KTsiXSwibmFtZXMiOlsiTG9jYWxQbGF5ZXIiLCJ3cyIsIldlYlNvY2tldCIsIlJlbW90ZVBsYXllciIsIlBsYXllciIsIkNvbnRyb2xsZXIiLCJzY2VuZSIsImlzQ29udHJvbGxlciIsInN0b3JlIiwiY2xpZW50IiwiYWRkRXZlbnRzIiwiYWRkR2FtZUV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwbGF5ZXIiLCJjb25zb2xlIiwibG9nIiwiX2lkIiwiZGF0YSIsImNtZCIsInNob290ZXJJZCIsInN0YXRlIiwibG9jYWxQbGF5ZXIiLCJpZCIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5Iiwic2V0U3RhdGUiLCJldmVudCIsInBhcnNlIiwib25TdGFydFJlbmRlciIsIm9uTmV3UGxheWVyIiwib25Jbml0R2FtZSIsIm9uTW92ZVBsYXllciIsIm9uUmVtb3ZlUGxheWVyIiwib25QbGF5ZXJEZWFkIiwib25VcGRhdGVIaXRQb2ludHMiLCJvblJlc3Bhd25QbGF5ZXIiLCJvblNob3RGaXJlZCIsIm9uUmVjZWl2ZU1zZyIsInJlY2VpdmVNc2ciLCJmcm9tIiwibXNnIiwic2VuZGVyIiwiX2ZpbmRQbGF5ZXIiLCJwb3MiLCJzb3VuZCIsImd1bkZpcmUzRCIsIkJBQllMT04iLCJWZWN0b3IzIiwieCIsInkiLCJ6IiwicmVzcGF3blBsYXllciIsInNldERlYWQiLCJfaXNEZWFkIiwic2V0SGl0UG9pbnRzIiwiX2hpdFBvaW50cyIsInNldFhZWiIsIl94IiwiX3kiLCJfeiIsInJlbW90ZVBsYXllciIsInVwZGF0ZUhpdFBvaW50c0xvY2FsUGxheWVyIiwiaGl0UG9pbnRzIiwiYWRkUmVtb3RlUGxheWVyIiwic2V0TG9jYWxQbGF5ZXIiLCJpIiwicmVtb3RlUGxheWVycyIsImxlbmd0aCIsImluaXRQbGF5ZXJzRG9uZSIsInAiLCJjbG9uZVBsYXllciIsIlVwZGF0ZSIsImxvYWQiLCJyZW1vdmVSZW1vdGVQbGF5ZXIiLCJwbGF5ZXJEaWVkIiwia2lsbGVyIiwiYWRkRGVhdGgiLCJhZGRLaWxsIiwiZ290S2lsbGVkIiwiZGVhZCIsIkVycm9yIiwiRGVzdHJveSIsInNwbGljZSIsImluZGV4T2YiLCJwdXNoIiwibW92ZVBsYXllciIsInJvdCIsIm1vdmUiLCJzZXRSb3RYWVoiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwic2V0SUQiLCJzZXRDb2xvciIsIl9jb2xvciIsInIiLCJnIiwiYiIsInNldE5hbWUiLCJfbmFtZSIsIl9raWxscyIsIl9kZWF0aHMiLCJTb3VuZCIsImd1blNob3QiLCJ2b2x1bWUiLCJndW5TaG90M0QiLCJzcGF0aWFsU291bmQiLCJtYXhEaXN0YW5jZSIsInBsYXkiLCJ2ZWMzIiwic2V0UG9zaXRpb24iLCJTdGF0cyIsIlN0b3JlIiwiQmFieWxvblNjZW5lIiwiQXBwbGljYXRpb24iLCJkb20iLCJsb2FkZWQiLCJkZXN0cm95ZWQiLCJzdG9yZURlbHRhVGltZSIsImFuaW1hdGlvbkZyYW1lIiwibGFzdFN0b3JlVGltZSIsInN0eWxlIiwic3RhdHMiLCJiZWdpbiIsImVuZCIsIkRhdGUiLCJub3ciLCJwZXJzaXN0IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJkaXNwbGF5Iiwid2lkdGgiLCJjbGllbnRXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpbm5lckhlaWdodCIsImFwcGVuZENoaWxkIiwiZW5naW5lIiwiRW5naW5lIiwicHJlc2VydmVEcmF3aW5nQnVmZmVyIiwic3RlbmNpbCIsIndpZHRoMiIsImdldFJlbmRlcldpZHRoIiwiQ3JlYXRlIiwicnVuUmVuZGVyTG9vcCIsInVwZGF0ZSIsInJlc2l6ZSIsImFwcCIsImdldEVsZW1lbnRCeUlkIiwic3RhcnQiXSwic291cmNlUm9vdCI6IiJ9