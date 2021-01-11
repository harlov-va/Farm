/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/vm-browserify/index.js":
/*!*********************************************!*\
  !*** ./node_modules/vm-browserify/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var indexOf = function (xs, item) {
    if (xs.indexOf) return xs.indexOf(item);
    else for (var i = 0; i < xs.length; i++) {
        if (xs[i] === item) return i;
    }
    return -1;
};
var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win = iframe.contentWindow;
    var wEval = win.eval, wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    if (context) {
        forEach(Object_keys(ctx), function (key) {
            context[key] = ctx[key];
        });
    }

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.isContext = function (context) {
    return context instanceof Context;
};

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};


/***/ }),

/***/ "./src/animation.js":
/*!**************************!*\
  !*** ./src/animation.js ***!
  \**************************/
/*! exports provided: Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Animation = /*#__PURE__*/function (_Sprite) {
  _inherits(Animation, _Sprite);

  function Animation(_ref) {
    var _this;

    var imageName = _ref.imageName,
        frames = _ref.frames,
        speed = _ref.speed,
        _ref$repeat = _ref.repeat,
        repeat = _ref$repeat === void 0 ? true : _ref$repeat,
        _ref$autorun = _ref.autorun,
        autorun = _ref$autorun === void 0 ? true : _ref$autorun,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 64 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 64 : _ref$height;

    _classCallCheck(this, Animation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Animation).call(this, {
      imageName: imageName,
      sourceX: frames[0].sx,
      sourceY: frames[0].sy,
      width: width,
      height: height
    }));
    _this.frames = frames;
    _this.speed = speed;
    _this.repeat = repeat;
    _this.running = autorun;
    _this.lastTime = 0;
    _this.currentFrame = 0;
    _this.totalFrames = _this.frames.length;
    return _this;
  }

  _createClass(Animation, [{
    key: "setFrame",
    value: function setFrame(index) {
      this.currentFrame = index;
      this.sourceX = this.frames[index].sx;
      this.sourceY = this.frames[index].sy;
    }
  }, {
    key: "run",
    value: function run() {
      if (!this.running) {
        this.setFrame(0);
        this.running = true;
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
    }
  }, {
    key: "nextFrame",
    value: function nextFrame() {
      if (this.currentFrame + 1 === this.totalFrames) {
        if (this.repeat) {
          this.setFrame(0);
          return;
        }

        this.stop();
        return;
      }

      this.setFrame(this.currentFrame + 1);
    }
  }, {
    key: "update",
    value: function update(time) {
      if (!this.running) {
        return;
      }

      if (this.lastTime === 0) {
        this.lastTime = time;
        return;
      }

      if (time - this.lastTime > this.speed) {
        this.nextFrame();
        this.lastTime = time;
      }
    }
  }]);

  return Animation;
}(_sprite__WEBPACK_IMPORTED_MODULE_0__["Sprite"]);

/***/ }),

/***/ "./src/body.js":
/*!*********************!*\
  !*** ./src/body.js ***!
  \*********************/
/*! exports provided: Body */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Body", function() { return Body; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");
/* harmony import */ var _character_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./character-sheet */ "./src/character-sheet.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Body = /*#__PURE__*/function () {
  function Body(_ref) {
    var _this = this;

    var imageName = _ref.imageName,
        speed = _ref.speed;

    _classCallCheck(this, Body);

    this.x = 0;
    this.y = 0;
    this.speed = speed;
    this.lastTime = 0;
    this.animations = {};
    var animationsSheet = new _character_sheet__WEBPACK_IMPORTED_MODULE_1__["CharacterSheet"]({
      imageName: imageName
    });
    "spell_on_cage,spell_gives_product,stand,birth,action,eat".split(",").forEach(function (name) {
      _this.animations[name] = animationsSheet.getAnimation(name);
    });
    this.stand();
  }

  _createClass(Body, [{
    key: "stand",
    value: function stand() {
      this.view = this.animations["stand"];
      this.view.stop();
    }
  }, {
    key: "birth",
    value: function birth() {
      this.view = this.animations["birth"];
      this.view.run();
    }
  }, {
    key: "actionOn",
    value: function actionOn() {
      this.view = this.animations["action"];
      this.view.stop();
    }
  }, {
    key: "update",
    value: function update(time) {
      if (this.lastTime === 0) {
        this.lastTime = time;
        return;
      }

      this.lastTime = time;
      this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
      this.view.update(time);
    }
  }]);

  return Body;
}();

/***/ }),

/***/ "./src/character-sheet.js":
/*!********************************!*\
  !*** ./src/character-sheet.js ***!
  \********************************/
/*! exports provided: CharacterSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterSheet", function() { return CharacterSheet; });
/* harmony import */ var _sprite_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite-sheet */ "./src/sprite-sheet.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var WIDTH_OLD = 832;
var HEIGHT_OLD = 1344;
var CharacterSheet = /*#__PURE__*/function (_SpriteSheet) {
  _inherits(CharacterSheet, _SpriteSheet);

  function CharacterSheet(_ref) {
    var _this;

    var imageName = _ref.imageName;

    _classCallCheck(this, CharacterSheet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CharacterSheet).call(this, {
      imageName: imageName,
      imageWidth: _constants__WEBPACK_IMPORTED_MODULE_1__["WIDTH_ANIMATION"],
      imageHeight: _constants__WEBPACK_IMPORTED_MODULE_1__["HEIGHT_ANMATION"]
    }));
    _this.sequences = _this.getSequences();
    return _this;
  }

  _createClass(CharacterSheet, [{
    key: "getSequences",
    value: function getSequences() {
      var data = __webpack_require__(/*! ./maps/animations.json */ "./src/maps/animations.json");

      var sequences = {};
      data.layers.forEach(function (layer) {
        sequences[layer.name] = layer.data.filter(function (i) {
          return i > 0;
        });
      });
      return sequences;
    }
  }, {
    key: "getAnimation",
    value: function getAnimation(name) {
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      var repeat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var autorun = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return _get(_getPrototypeOf(CharacterSheet.prototype), "getAnimation", this).call(this, this.sequences[name], speed, repeat, autorun);
    }
  }]);

  return CharacterSheet;
}(_sprite_sheet__WEBPACK_IMPORTED_MODULE_0__["SpriteSheet"]);

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: GAME_WIDTH, GAME_HEIGTH, WORKING_WIDTH, WORKING_HEIGTH, MENU_HEIGTH, SPRITE_WIDTH, SPRITE_HEIGTH, WIDTH_ANIMATION, HEIGHT_ANMATION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_WIDTH", function() { return GAME_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_HEIGTH", function() { return GAME_HEIGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKING_WIDTH", function() { return WORKING_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKING_HEIGTH", function() { return WORKING_HEIGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_HEIGTH", function() { return MENU_HEIGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRITE_WIDTH", function() { return SPRITE_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRITE_HEIGTH", function() { return SPRITE_HEIGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIDTH_ANIMATION", function() { return WIDTH_ANIMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEIGHT_ANMATION", function() { return HEIGHT_ANMATION; });
var GAME_WIDTH = 640;
var GAME_HEIGTH = 640;
var WORKING_WIDTH = GAME_WIDTH - 128;
var WORKING_HEIGTH = GAME_HEIGTH;
var MENU_HEIGTH = GAME_HEIGTH - 128;
var SPRITE_WIDTH = 64;
var SPRITE_HEIGTH = 64;
var WIDTH_ANIMATION = 704;
var HEIGHT_ANMATION = 384;

/***/ }),

/***/ "./src/control-state.js":
/*!******************************!*\
  !*** ./src/control-state.js ***!
  \******************************/
/*! exports provided: ControlState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlState", function() { return ControlState; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ControlState = /*#__PURE__*/function () {
  function ControlState() {
    var _this = this;

    _classCallCheck(this, ControlState);

    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.fire = false;
    this.amountCharacters = new Map([["wheat", "amountWheat"], ["cow", "amountCows"], ["chicken", "amountChickens"]]);
    this.charactersHud = new Map([["wheat", "amountFeed"], ["cow", "amountMilk"], ["chicken", "amountEggs"]]);
    this.keyMap = new Map([[37, "left"], [39, "right"], [38, "up"], [40, "down"], [32, "fire"]]);
    document.addEventListener("keydown", function (event) {
      return _this.update(event, true);
    });
    document.addEventListener("keyup", function (event) {
      return _this.update(event, false);
    }); //общее состояние игры

    this.states = [{
      name: "wheat",
      type: "character",
      x: 64,
      y: 512,
      draggable: true,
      birthTime: 10,
      repeat: -1,
      counter: 0,
      behavior: ["stand", "birth", "actionOn"]
    }, {
      name: "wheat",
      type: "character",
      x: 64,
      y: 512,
      draggable: true,
      birthTime: 10,
      repeat: -1,
      counter: 0,
      behavior: ["stand", "birth", "actionOn"]
    }, {
      name: "cow",
      type: "character",
      x: 192,
      y: 512,
      draggable: true,
      birthTime: 20,
      repeat: 1,
      counter: 0,
      behavior: ["stand", "birth", "stand"]
    }, {
      name: "chicken",
      type: "character",
      x: 320,
      y: 512,
      draggable: true,
      birthTime: 10,
      repeat: 3,
      counter: 0,
      behavior: ["stand", "birth", "stand"]
    }, {
      name: "amountWheat",
      type: "object",
      value: 2,
      textX: 128,
      textY: 556,
      normal: true,
      normalColor: "#0000FF",
      dangerColor: "#FF0000",
      x: 64,
      y: 512,
      draggable: false,
      counter: 0,
      behavior: ["stand"]
    }, {
      name: "amountCows",
      type: "object",
      value: 1,
      textX: 252,
      textY: 556,
      normal: true,
      normalColor: "#0000FF",
      dangerColor: "#FF0000",
      x: 192,
      y: 512,
      draggable: false,
      counter: 0,
      behavior: ["stand"]
    }, {
      name: "amountChickens",
      type: "object",
      value: 1,
      textX: 380,
      textY: 556,
      normal: true,
      normalColor: "#0000FF",
      dangerColor: "#FF0000",
      x: 320,
      y: 512,
      draggable: false,
      counter: 0,
      behavior: ["stand"]
    }, {
      name: "amountCoins",
      type: "object",
      value: 0,
      textX: 576,
      textY: 108,
      normal: false,
      normalColor: "#0000FF",
      dangerColor: "#FF0000",
      x: 512,
      y: 64,
      draggable: false,
      counter: 0,
      behavior: ["stand"]
    }, {
      name: "amountEggs",
      type: "object",
      value: 0,
      textX: 576,
      textY: 236,
      startX: 512,
      startY: 192,
      normal: false,
      normalColor: "#0000FF",
      dangerColor: "#FF0000",
      x: 512,
      y: 192,
      draggable: false,
      counter: 0,
      behavior: ["stand"]
    }, {
      name: "amountMilk",
      type: "object",
      value: 0,
      textX: 576,
      textY: 364,
      startX: 512,
      startY: 320,
      normal: false,
      normalColor: "#0000FF",
      dangerColor: "#FF0000",
      x: 512,
      y: 320,
      draggable: false,
      counter: 0,
      behavior: ["stand"]
    }, {
      name: "amountFeed",
      type: "object",
      value: 0,
      textX: 576,
      textY: 492,
      normal: false,
      normalColor: "#0000FF",
      dangerColor: "#FF0000",
      x: 512,
      y: 448,
      draggable: false,
      counter: 0,
      behavior: ["stand"]
    }];
  }

  _createClass(ControlState, [{
    key: "update",
    value: function update(event, pressed) {
      if (this.keyMap.has(event.keyCode)) {
        event.preventDefault();
        event.stopPropagation();
        this[this.keyMap.get(event.keyCode)] = pressed;
      }
    } //логика игры

  }, {
    key: "_changeState",
    value: function _changeState(state) {
      if (state.counter === state.behavior.length - 1) {
        state.counter = 1;
      } else {
        state.counter++;
      }
    }
  }, {
    key: "_changeHud",
    value: function _changeHud(name, value) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.name === name) {
            item.value += value;
            item.normal = item.value === 0 ? false : true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "_getFeed",
    value: function _getFeed() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.states[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          if (item.name === "amountFeed") {
            return item;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } //Механика игры

  }, {
    key: "play",
    value: function play(state, eventOccurred) {
      if (eventOccurred === "needAction") {
        if (state.name === "wheat") {
          this._changeState(state);
        } else {
          state.repeat--;

          this._changeHud(this.charactersHud.get(state.name), 1);

          if (state.repeat === 0) {
            this._changeState(state);

            if (state.name === "cow") {
              state.repeat = 1;
            } else {
              state.repeat = 3;
            }
          }
        }
      } else if (eventOccurred === "mouseup") {
        this._changeHud(this.amountCharacters.get(state.name), -1);

        if (state.name === "wheat") this._changeState(state);
      } else if (eventOccurred === "click") {
        var feed = this._getFeed();

        if (state.name === "wheat" && state.behavior[state.counter] === "actionOn") {
          this._changeHud("amountFeed", 1);

          this._changeState(state);

          return;
        }

        if ((state.name === "cow" || state.name === "chicken") && feed.value > 0 && state.behavior[state.counter] === "stand") {
          this._changeHud("amountFeed", -1);

          this._changeState(state);

          return;
        }

        if (state.name === "amountMilk") {
          if (state.value > 0) {
            this._changeHud("amountCoins", 2 * state.value);

            this._changeHud("amountMilk", -state.value);
          }

          return;
        }

        if (state.name === "amountEggs") {
          if (state.value > 0) {
            this._changeHud("amountCoins", state.value);

            this._changeHud("amountEggs", -state.value);
          }

          return;
        }
      }
    }
  }]);

  return ControlState;
}();

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _sreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sreen */ "./src/sreen.js");
/* harmony import */ var _scenes_loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/loading */ "./src/scenes/loading.js");
/* harmony import */ var _scenes_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/menu */ "./src/scenes/menu.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scene */ "./src/scene.js");
/* harmony import */ var _control_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./control-state */ "./src/control-state.js");
/* harmony import */ var _scenes_game_level__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/game-level */ "./src/scenes/game-level.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var Game = /*#__PURE__*/function () {
  function Game() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 640 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 640 : _ref$height;

    _classCallCheck(this, Game);

    this.screen = new _sreen__WEBPACK_IMPORTED_MODULE_0__["Screen"](width, height);
    this.screen.loadImages({
      cow: "img/cow.png",
      chicken: "img/chicken.png",
      wheat: "img/wheat.png",
      amountChickens: "img/amountChickens.png",
      amountCoins: "img/amountCoins.png",
      amountCows: "img/amountCows.png",
      amountEggs: "img/amountEggs.png",
      amountFeed: "img/amountFeed.png",
      amountMilk: "img/amountMilk.png",
      amountWheat: "img/amountWheat.png",
      title: "img/title.jpg",
      tiles: "img/tiles.png"
    });
    this.control = new _control_state__WEBPACK_IMPORTED_MODULE_4__["ControlState"]();
    this.scenes = {
      loading: new _scenes_loading__WEBPACK_IMPORTED_MODULE_1__["Loading"](this),
      menu: new _scenes_menu__WEBPACK_IMPORTED_MODULE_2__["Menu"](this),
      gameLevel: new _scenes_game_level__WEBPACK_IMPORTED_MODULE_5__["GameLevel"](this)
    };
    this.currentScene = this.scenes.loading;
    this.currentScene.init();
  }

  _createClass(Game, [{
    key: "changeScene",
    value: function changeScene(status) {
      switch (status) {
        case _scene__WEBPACK_IMPORTED_MODULE_3__["Scene"].LOADED:
          return this.scenes.menu;
          break;

        case _scene__WEBPACK_IMPORTED_MODULE_3__["Scene"].START_GAME:
          return this.scenes.gameLevel;
          break;

        default:
          return this.scenes.menu;
      }
    }
  }, {
    key: "frame",
    value: function frame(time) {
      var _this = this;

      if (this.currentScene.status !== _scene__WEBPACK_IMPORTED_MODULE_3__["Scene"].WORKING) {
        this.currentScene = this.changeScene(this.currentScene.status);
        this.currentScene.init();
      }

      this.currentScene.render(time);
      requestAnimationFrame(function (time) {
        return _this.frame(time);
      });
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      requestAnimationFrame(function (time) {
        return _this2.frame(time);
      });
    }
  }]);

  return Game;
}();

/***/ }),

/***/ "./src/hud-item.js":
/*!*************************!*\
  !*** ./src/hud-item.js ***!
  \*************************/
/*! exports provided: HudItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HudItem", function() { return HudItem; });
/* harmony import */ var _body__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body */ "./src/body.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var HudItem = /*#__PURE__*/function (_Body) {
  _inherits(HudItem, _Body);

  function HudItem(imageName, state) {
    var _this;

    _classCallCheck(this, HudItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HudItem).call(this, {
      imageName: imageName,
      speed: 50
    }));
    _this.state = state;
    _this.text = "x ".concat(_this.state.value);
    _this.color = _this.state.normal ? _this.state.normalColor : _this.state.dangerColor, _this.textX = _this.state.textX;
    _this.textY = _this.state.textY;
    return _this;
  }

  _createClass(HudItem, [{
    key: "update",
    value: function update(time) {
      this.text = "x ".concat(this.state.value);
      this.color = this.state.normal ? this.state.normalColor : this.state.dangerColor, this.textX = this.state.textX;
      this.textY = this.state.textY;
      this.stand();

      _get(_getPrototypeOf(HudItem.prototype), "update", this).call(this, time);
    }
  }, {
    key: "needAction",
    value: function needAction() {}
  }]);

  return HudItem;
}(_body__WEBPACK_IMPORTED_MODULE_0__["Body"]);

/***/ }),

/***/ "./src/image-loader.js":
/*!*****************************!*\
  !*** ./src/image-loader.js ***!
  \*****************************/
/*! exports provided: ImageLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return ImageLoader; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ImageLoader = /*#__PURE__*/function () {
  function ImageLoader(imageFiles) {
    _classCallCheck(this, ImageLoader);

    this.imageFiles = imageFiles;
    this.images = {};
  }

  _createClass(ImageLoader, [{
    key: "load",
    value: function load() {
      var promise = [];

      for (var name in this.imageFiles) {
        promise.push(this.loadImage(name, this.imageFiles[name]));
      }

      return Promise.all(promise);
    }
  }, {
    key: "loadImage",
    value: function loadImage(name, src) {
      var _this = this;

      return new Promise(function (resolve) {
        var image = new Image();
        _this.images[name] = image;

        image.onload = function () {
          return resolve(name);
        };

        image.src = src;
      });
    }
  }]);

  return ImageLoader;
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


window.onload = function () {
  var farm = new _game__WEBPACK_IMPORTED_MODULE_0__["Game"]();
  farm.run();
};

/***/ }),

/***/ "./src/maps/animations.json":
/*!**********************************!*\
  !*** ./src/maps/animations.json ***!
  \**********************************/
/*! exports provided: compressionlevel, height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"compressionlevel\":-1,\"height\":1,\"infinite\":false,\"layers\":[{\"data\":[6,7,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"height\":1,\"id\":1,\"name\":\"spell_on_cage\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":false,\"width\":20,\"x\":0,\"y\":0},{\"data\":[17,18,19,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"height\":1,\"id\":2,\"name\":\"spell_gives_product\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":false,\"width\":20,\"x\":0,\"y\":0},{\"data\":[34,35,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"height\":1,\"id\":6,\"name\":\"eat\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":true,\"width\":20,\"x\":0,\"y\":0},{\"data\":[23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"height\":1,\"id\":5,\"name\":\"action\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":false,\"width\":20,\"x\":0,\"y\":0},{\"data\":[12,13,14,15,16,17,18,19,20,21,22,0,0,0,0,0,0,0,0,0],\"height\":1,\"id\":4,\"name\":\"birth\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":false,\"width\":20,\"x\":0,\"y\":0},{\"data\":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"height\":1,\"id\":3,\"name\":\"stand\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":false,\"width\":20,\"x\":0,\"y\":0}],\"nextlayerid\":7,\"nextobjectid\":1,\"orientation\":\"orthogonal\",\"renderorder\":\"left-up\",\"tiledversion\":\"1.3.3\",\"tileheight\":64,\"tilesets\":[{\"firstgid\":1,\"source\":\"../../resources/animals.tsx\"}],\"tilewidth\":64,\"type\":\"map\",\"version\":1.2,\"width\":20}");

/***/ }),

/***/ "./src/maps/level1.json":
/*!******************************!*\
  !*** ./src/maps/level1.json ***!
  \******************************/
/*! exports provided: compressionlevel, height, infinite, layers, nextlayerid, nextobjectid, orientation, properties, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"compressionlevel\":-1,\"height\":10,\"infinite\":false,\"layers\":[{\"data\":[1,34,1,34,1,34,1,34,22,22,34,1,34,1,34,1,34,1,22,22,1,34,1,34,1,34,1,34,22,22,34,1,34,1,34,1,34,1,22,22,1,34,1,34,1,34,1,34,22,22,34,1,34,1,34,1,34,1,22,22,1,34,1,34,1,34,1,34,22,22,34,1,34,1,34,1,34,1,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],\"height\":10,\"id\":1,\"name\":\"layer1\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":true,\"width\":10,\"x\":0,\"y\":0},{\"draworder\":\"topdown\",\"id\":3,\"name\":\"hitboxes\",\"objects\":[],\"opacity\":1,\"type\":\"objectgroup\",\"visible\":true,\"x\":0,\"y\":0}],\"nextlayerid\":5,\"nextobjectid\":44,\"orientation\":\"orthogonal\",\"properties\":[{\"name\":\"name\",\"type\":\"string\",\"value\":\"level1\"}],\"renderorder\":\"left-up\",\"tiledversion\":\"1.3.3\",\"tileheight\":64,\"tilesets\":[{\"firstgid\":1,\"source\":\"../../resources/tileset.tsx\"}],\"tilewidth\":64,\"type\":\"map\",\"version\":1.2,\"width\":10}");

/***/ }),

/***/ "./src/mouse.js":
/*!**********************!*\
  !*** ./src/mouse.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mouse; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Mouse = /*#__PURE__*/function () {
  function Mouse(characters, control) {
    _classCallCheck(this, Mouse);

    this.characters = characters;
    this.control = control;
    this.clickHandler = this.onClick.bind(this);
    this.mouseMoveHandler = this.onMouseMove.bind(this);
    this.mouseUpHandler = this.onMouseUp.bind(this);
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.findedCharacter = null;
    this.startCoords = {
      x: 0,
      y: 0
    };
    this.beginCoords = {
      x: 0,
      y: 0
    };
    this.dragged = false;
  } //работа с мышью и реакцией на нажатие


  _createClass(Mouse, [{
    key: "onMouseDown",
    value: function onMouseDown(evt) {
      evt.preventDefault();
      this.dragged = false;
      this.startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      window.addEventListener('mousemove', this.mouseMoveHandler);
      window.addEventListener('mouseup', this.mouseUpHandler);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      this.dragged = true;

      if (!this.findedCharacter) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.characters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            if (!item.state.draggable) continue;

            if (item.view.x <= moveEvt.clientX && item.view.x + item.view.width >= moveEvt.clientX && item.view.y <= moveEvt.clientY && item.view.y + item.view.height >= moveEvt.clientY) {
              this.findedCharacter = item;
              this.beginCoords = {
                x: this.findedCharacter.x,
                y: this.findedCharacter.y
              };
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        var indentX = this.findedCharacter.x + _constants__WEBPACK_IMPORTED_MODULE_0__["SPRITE_WIDTH"] - moveEvt.clientX;
        var indentY = this.findedCharacter.y + _constants__WEBPACK_IMPORTED_MODULE_0__["SPRITE_HEIGTH"] - moveEvt.clientY;

        if (moveEvt.clientX >= indentX && moveEvt.clientX <= _constants__WEBPACK_IMPORTED_MODULE_0__["WORKING_WIDTH"] - indentX && moveEvt.clientY >= indentY && moveEvt.clientY <= _constants__WEBPACK_IMPORTED_MODULE_0__["WORKING_HEIGTH"] - indentY) {
          var shift = {
            x: this.startCoords.x - moveEvt.clientX,
            y: this.startCoords.y - moveEvt.clientY
          };
          this.startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };
          var newCoords = {
            x: this.findedCharacter.x - shift.x,
            y: this.findedCharacter.y - shift.y
          };
          this.findedCharacter.x = newCoords.x;
          this.findedCharacter.y = newCoords.y;
        }
      }
    }
  }, {
    key: "toPreviousPlace",
    value: function toPreviousPlace() {
      this.findedCharacter.state.draggable = true;
      this.findedCharacter.x = this.beginCoords.x;
      this.findedCharacter.y = this.beginCoords.y;
    }
  }, {
    key: "_checkOverlap",
    value: function _checkOverlap(r1, r2) {
      return !(r1.x + r1.width < r2.x || r1.y + r1.height < r2.y || r1.x > r2.x + r2.width || r1.y > r2.y + r2.height);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(upEvt) {
      if (this.findedCharacter) {
        if (upEvt.clientY > _constants__WEBPACK_IMPORTED_MODULE_0__["MENU_HEIGTH"]) {
          this.toPreviousPlace();
        }

        if (upEvt.clientX < _constants__WEBPACK_IMPORTED_MODULE_0__["WORKING_WIDTH"] && upEvt.clientY < _constants__WEBPACK_IMPORTED_MODULE_0__["MENU_HEIGTH"]) {
          this.findedCharacter.x = Math.trunc(upEvt.clientX / _constants__WEBPACK_IMPORTED_MODULE_0__["SPRITE_WIDTH"]) * _constants__WEBPACK_IMPORTED_MODULE_0__["SPRITE_WIDTH"];
          this.findedCharacter.y = Math.trunc(upEvt.clientY / _constants__WEBPACK_IMPORTED_MODULE_0__["SPRITE_HEIGTH"]) * _constants__WEBPACK_IMPORTED_MODULE_0__["SPRITE_HEIGTH"];
          this.findedCharacter.state.draggable = false;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.characters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var item = _step2.value;
              if (item == this.findedCharacter) continue;

              if (this._checkOverlap(this.findedCharacter.view, item.view)) {
                this.toPreviousPlace();
                break;
              }
            } //и в логику игры

          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (!this.findedCharacter.state.draggable) this.control.play(this.findedCharacter.state, "mouseup");
        }
      }

      if (!this.dragged) {
        window.addEventListener('click', this.clickHandler);
      }

      this.findedCharacter = null;
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      window.removeEventListener('mouseup', this.mouseUpHandler);
    }
  }, {
    key: "onClick",
    value: function onClick(evt) {
      evt.preventDefault();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.characters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;

          if (item.view.x <= evt.clientX && item.view.x + item.view.width >= evt.clientX && item.view.y <= evt.clientY && item.view.y + item.view.height >= evt.clientY) {
            //и в логику игры
            this.control.play(item.state, "click");
            break;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      window.removeEventListener("click", this.clickHandler);
    }
  }]);

  return Mouse;
}();



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _body__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body */ "./src/body.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Player = /*#__PURE__*/function (_Body) {
  _inherits(Player, _Body);

  function Player(imageName, state) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, {
      imageName: imageName,
      speed: 50
    }));
    _this.state = state;
    _this.startTime = -1;
    _this.changeTime = true;
    return _this;
  }

  _createClass(Player, [{
    key: "update",
    value: function update(time) {
      if (this.state.behavior[this.state.counter] === "birth") {
        this.birth();

        if (this.changeTime) {
          this.startTime = time / 1000;
          this.changeTime = false;
        }
      } else if (this.state.behavior[this.state.counter] === "actionOn") {
        this.actionOn();
      } else {
        this.stand();
      }

      if (this.startTime > 0 && time / 1000 >= this.startTime + this.state.birthTime) {
        this.startTime = -1;
        this.changeTime = true;
        this.needAction(this.state, "needAction");
      }

      _get(_getPrototypeOf(Player.prototype), "update", this).call(this, time);
    }
  }, {
    key: "needAction",
    value: function needAction() {}
  }]);

  return Player;
}(_body__WEBPACK_IMPORTED_MODULE_0__["Body"]);

/***/ }),

/***/ "./src/scene.js":
/*!**********************!*\
  !*** ./src/scene.js ***!
  \**********************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scene = /*#__PURE__*/function () {
  function Scene(game) {
    _classCallCheck(this, Scene);

    this.game = game;
    this.status = this.constructor.WORKING;
  }

  _createClass(Scene, [{
    key: "init",
    value: function init() {
      this.status = this.constructor.WORKING;
    }
  }, {
    key: "finish",
    value: function finish(status) {
      this.status = status;
    }
  }, {
    key: "render",
    value: function render(time) {}
  }], [{
    key: "WORKING",
    get: function get() {
      return "WORKING";
    }
  }, {
    key: "LOADED",
    get: function get() {
      return "LOADED";
    }
  }, {
    key: "START_GAME",
    get: function get() {
      return "START_GAME";
    }
  }, {
    key: "GAME_OVER",
    get: function get() {
      return "GAME_OVER";
    }
  }, {
    key: "GAME_WIN",
    get: function get() {
      return "GAME_WIN";
    }
  }, {
    key: "FINISHED",
    get: function get() {
      return "FINISHED";
    }
  }]);

  return Scene;
}();

/***/ }),

/***/ "./src/scenes/game-level.js":
/*!**********************************!*\
  !*** ./src/scenes/game-level.js ***!
  \**********************************/
/*! exports provided: GameLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameLevel", function() { return GameLevel; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "./src/scene.js");
/* harmony import */ var _sprite_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sprite-sheet */ "./src/sprite-sheet.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../player */ "./src/player.js");
/* harmony import */ var _hud_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hud-item */ "./src/hud-item.js");
/* harmony import */ var _mouse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mouse */ "./src/mouse.js");
/* harmony import */ var vm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vm */ "./node_modules/vm-browserify/index.js");
/* harmony import */ var vm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vm__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var GameLevel = /*#__PURE__*/function (_Scene) {
  _inherits(GameLevel, _Scene);

  function GameLevel(game) {
    var _this;

    _classCallCheck(this, GameLevel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameLevel).call(this, game));
    _this.tiles = new _sprite_sheet__WEBPACK_IMPORTED_MODULE_1__["SpriteSheet"]({
      imageName: "tiles",
      imageWidth: 640,
      imageHeight: 640
    }); //рождение всех персонажей и элементов хада
    //специально использую присвоение, чтобы можно было отслеживать общее
    //состояние в control-state

    _this.characters = [];

    _this.game.control.states.forEach(function (item) {
      if (item.type === "character") {
        var character = new _player__WEBPACK_IMPORTED_MODULE_2__["Player"]("".concat(item.name), item);
        character.x = item.x;
        character.y = item.y;
        character.needAction = _this.game.control.play.bind(_this.game.control);

        _this.characters.push(character);
      } else if (item.type === "object") {
        var hudItem = new _hud_item__WEBPACK_IMPORTED_MODULE_3__["HudItem"]("".concat(item.name), item);
        hudItem.x = item.x;
        hudItem.y = item.y;

        _this.characters.push(hudItem);
      }
    });

    _this.characters.sort(function (prev, next) {
      return prev.constructor.name.charCodeAt(0) - next.constructor.name.charCodeAt(0);
    });

    _this.mouse = new _mouse__WEBPACK_IMPORTED_MODULE_4__["default"](_this.characters, _this.game.control);
    return _this;
  }

  _createClass(GameLevel, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(GameLevel.prototype), "init", this).call(this);

      var mapData = __webpack_require__(/*! ../maps/level1.json */ "./src/maps/level1.json");

      this.map = this.game.screen.createMap("level1", mapData, this.tiles);
    }
  }, {
    key: "update",
    value: function update(time) {
      this.characters.forEach(function (character) {
        character.update(time);
      });
    }
  }, {
    key: "render",
    value: function render(time) {
      var _this2 = this;

      this.update(time);
      this.game.screen.fill("#000000");
      this.game.screen.drawSprite(this.map);
      this.characters.forEach(function (elem) {
        if (elem instanceof _player__WEBPACK_IMPORTED_MODULE_2__["Player"]) {
          _this2.game.screen.drawSprite(elem.view);
        } else {
          _this2.game.screen.drawHud(elem);
        }
      });

      _get(_getPrototypeOf(GameLevel.prototype), "render", this).call(this, time);
    }
  }]);

  return GameLevel;
}(_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"]);

/***/ }),

/***/ "./src/scenes/loading.js":
/*!*******************************!*\
  !*** ./src/scenes/loading.js ***!
  \*******************************/
/*! exports provided: Loading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loading", function() { return Loading; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "./src/scene.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Loading = /*#__PURE__*/function (_Scene) {
  _inherits(Loading, _Scene);

  function Loading(game) {
    var _this;

    _classCallCheck(this, Loading);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Loading).call(this, game));
    _this.loadedAt = 0;
    return _this;
  }

  _createClass(Loading, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(Loading.prototype), "init", this).call(this);

      this.loadedAt = 0;
    }
  }, {
    key: "update",
    value: function update(time) {
      if (this.loadedAt === 0 && this.game.screen.isImagesLoaded === true) {
        this.loadedAt = time;
      }

      if (this.loadedAt != 0 && time - this.loadedAt > 500) {
        this.finish(_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"].LOADED);
      }
    }
  }, {
    key: "render",
    value: function render(time) {
      this.update(time);
      this.game.screen.fill("#000000");
      this.game.screen.print(50, 70, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...");

      _get(_getPrototypeOf(Loading.prototype), "render", this).call(this, time);
    }
  }]);

  return Loading;
}(_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"]);

/***/ }),

/***/ "./src/scenes/menu.js":
/*!****************************!*\
  !*** ./src/scenes/menu.js ***!
  \****************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "./src/scene.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Menu = /*#__PURE__*/function (_Scene) {
  _inherits(Menu, _Scene);

  function Menu(game) {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this, game));
  }

  _createClass(Menu, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(Menu.prototype), "init", this).call(this);
    }
  }, {
    key: "update",
    value: function update(time) {
      if (this.game.control.fire) {
        this.finish(_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"].START_GAME);
      }
    }
  }, {
    key: "render",
    value: function render(time) {
      this.update(time);
      this.game.screen.drawImage(0, 0, "title");
      this.game.screen.print(200, _constants__WEBPACK_IMPORTED_MODULE_1__["GAME_HEIGTH"] * 2 / 3, "#FFFFFF", "KOMIKAX_cyr", "Press space");

      _get(_getPrototypeOf(Menu.prototype), "render", this).call(this, time);
    }
  }]);

  return Menu;
}(_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"]);

/***/ }),

/***/ "./src/sprite-sheet.js":
/*!*****************************!*\
  !*** ./src/sprite-sheet.js ***!
  \*****************************/
/*! exports provided: SpriteSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpriteSheet", function() { return SpriteSheet; });
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation */ "./src/animation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var SpriteSheet = /*#__PURE__*/function () {
  function SpriteSheet(_ref) {
    var imageName = _ref.imageName,
        imageWidth = _ref.imageWidth,
        imageHeight = _ref.imageHeight,
        _ref$spriteWidth = _ref.spriteWidth,
        spriteWidth = _ref$spriteWidth === void 0 ? 64 : _ref$spriteWidth,
        _ref$spriteHeight = _ref.spriteHeight,
        spriteHeight = _ref$spriteHeight === void 0 ? 64 : _ref$spriteHeight;

    _classCallCheck(this, SpriteSheet);

    this.imageName = imageName;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
  }

  _createClass(SpriteSheet, [{
    key: "getAnimation",
    value: function getAnimation(indexes, speed) {
      var _this = this;

      var repeat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var autorun = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return new _animation__WEBPACK_IMPORTED_MODULE_1__["Animation"]({
        imageName: this.imageName,
        frames: indexes.map(function (index) {
          return {
            sx: _this.getSourceX(index),
            sy: _this.getSourceY(index)
          };
        }),
        speed: speed,
        repeat: repeat,
        autorun: autorun,
        width: this.spriteWidth,
        height: this.spriteHeight
      });
    }
  }, {
    key: "getSprite",
    value: function getSprite(index) {
      return new _sprite__WEBPACK_IMPORTED_MODULE_0__["Sprite"]({
        imageName: this.imageName,
        sourceX: this.getSourceX(index),
        sourceY: this.getSourceY(index),
        width: this.spriteWidth,
        height: this.spriteHeight
      });
    }
  }, {
    key: "getSourceX",
    value: function getSourceX(index) {
      return --index * this.spriteWidth % this.imageWidth;
    }
  }, {
    key: "getSourceY",
    value: function getSourceY(index) {
      return Math.trunc(--index * this.spriteWidth / this.imageWidth) * this.spriteHeight;
    }
  }]);

  return SpriteSheet;
}();

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: Sprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return Sprite; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sprite = /*#__PURE__*/function () {
  function Sprite(_ref) {
    var imageName = _ref.imageName,
        sourceX = _ref.sourceX,
        sourceY = _ref.sourceY,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 64 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 64 : _ref$height;

    _classCallCheck(this, Sprite);

    this.imageName = imageName;
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
  }

  _createClass(Sprite, [{
    key: "setXY",
    value: function setXY(x, y) {
      this.x = x;
      this.y = y;
    }
  }]);

  return Sprite;
}();

/***/ }),

/***/ "./src/sreen.js":
/*!**********************!*\
  !*** ./src/sreen.js ***!
  \**********************/
/*! exports provided: Screen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Screen", function() { return Screen; });
/* harmony import */ var _image_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-loader */ "./src/image-loader.js");
/* harmony import */ var _tile_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile-map */ "./src/tile-map.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Screen = /*#__PURE__*/function () {
  function Screen(width, height) {
    _classCallCheck(this, Screen);

    this.width = width;
    this.height = height;
    this.canvas = this.createCanvas(width, height);
    this.context = this.canvas.getContext("2d");
    this.images = {};
    this.isImagesLoaded = false;
  }

  _createClass(Screen, [{
    key: "loadImages",
    value: function loadImages(imageFiles) {
      var _this = this;

      var loader = new _image_loader__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"](imageFiles);
      loader.load().then(function (names) {
        _this.images = Object.assign(_this.images, loader.images);
        _this.isImagesLoaded = true;
      });
    }
  }, {
    key: "createCanvas",
    value: function createCanvas(width, height) {
      var elements = document.querySelector("canvas");
      var canvas = elements || document.createElement("canvas");
      document.body.append(canvas);
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }
  }, {
    key: "createMap",
    value: function createMap(name, mapData, tileset) {
      var _this2 = this;

      var mapImage = document.createElement("canvas");
      mapImage.width = mapData.width * mapData.tilewidth;
      mapImage.height = mapData.height * mapData.tileheight;
      var mapContext = mapImage.getContext("2d");
      var hitboxes = [];
      var row, col;
      mapData.layers.forEach(function (layer) {
        if (layer.type === "tilelayer") {
          row = 0;
          col = 0;
          layer.data.forEach(function (index) {
            if (index > 0) {
              mapContext.drawImage(_this2.images[tileset.imageName], tileset.getSourceX(index), tileset.getSourceY(index), mapData.tilewidth, mapData.tileheight, col * mapData.tilewidth, row * mapData.tileheight, mapData.tilewidth, mapData.tileheight);
            }

            col++;

            if (col > mapData.width - 1) {
              col = 0;
              row++;
            }
          });
        }

        if (layer.type === "objectgroup") {
          hitboxes.push.apply(hitboxes, _toConsumableArray(layer.objects.map(function (obj) {
            return {
              x1: obj.x,
              x2: obj.x + obj.width,
              y1: obj.y,
              y2: obj.y + obj.height
            };
          })));
        }
      });
      this.images[name] = mapImage;
      return new _tile_map__WEBPACK_IMPORTED_MODULE_1__["TileMap"]({
        imageName: name,
        sourceX: 0,
        sourceY: 0,
        width: mapImage.width,
        height: mapImage.height,
        hitboxes: hitboxes
      });
    }
  }, {
    key: "fill",
    value: function fill(color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.width, this.height);
    }
  }, {
    key: "print",
    value: function print(x, y, color, font, text) {
      this.context.fillStyle = color;
      this.context.font = "22px ".concat(font);
      this.context.fillText(text, x, y);
    }
  }, {
    key: "drawImage",
    value: function drawImage(x, y, imageName) {
      this.context.drawImage(this.images[imageName], x, y);
    }
  }, {
    key: "drawSprite",
    value: function drawSprite(sprite) {
      this.context.drawImage(this.images[sprite.imageName], sprite.sourceX, sprite.sourceY, sprite.width, sprite.height, sprite.x, sprite.y, sprite.width, sprite.height);
    }
  }, {
    key: "drawHud",
    value: function drawHud(hud) {
      this.context.drawImage(this.images[hud.view.imageName], hud.view.sourceX, hud.view.sourceY, hud.view.width, hud.view.height, hud.view.x, hud.view.y, hud.view.width, hud.view.height);
      this.context.fillStyle = hud.color;
      this.context.font = "22px KOMIKAX_cyr";
      this.context.fillText(hud.text, hud.textX, hud.textY);
    }
  }]);

  return Screen;
}();

/***/ }),

/***/ "./src/tile-map.js":
/*!*************************!*\
  !*** ./src/tile-map.js ***!
  \*************************/
/*! exports provided: TileMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileMap", function() { return TileMap; });
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var TileMap = /*#__PURE__*/function (_Sprite) {
  _inherits(TileMap, _Sprite);

  function TileMap(props) {
    var _this;

    _classCallCheck(this, TileMap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TileMap).call(this, props));
    _this.hitboxes = props.hitboxes || [];
    return _this;
  }

  return TileMap;
}(_sprite__WEBPACK_IMPORTED_MODULE_0__["Sprite"]);

/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector = /*#__PURE__*/function () {
  function Vector(direction, speed) {
    _classCallCheck(this, Vector);

    this.setDirection(direction, speed);
  }

  _createClass(Vector, [{
    key: "setDirection",
    value: function setDirection(direction, speed) {
      this.direction = direction;
      this.speed = speed;
      this.x = 0;
      this.y = 0;

      switch (direction) {
        case "up":
          this.y = -speed;
          break;

        case "down":
          this.y = speed;
          break;

        case "right":
          this.x = speed;
          break;

        case "left":
          this.x = -speed;
          break;
      }
    }
  }]);

  return Vector;
}();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZtLWJyb3dzZXJpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYm9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyLXNoZWV0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2wtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h1ZC1pdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS1sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb3VzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL2dhbWUtbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9sb2FkaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZXMvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3ByaXRlLXNoZWV0LmpzIiwid2VicGFjazovLy8uL3NyYy9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NyZWVuLmpzIiwid2VicGFjazovLy8uL3NyYy90aWxlLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVjdG9yLmpzIl0sIm5hbWVzIjpbIkFuaW1hdGlvbiIsImltYWdlTmFtZSIsImZyYW1lcyIsInNwZWVkIiwicmVwZWF0IiwiYXV0b3J1biIsIndpZHRoIiwiaGVpZ2h0Iiwic291cmNlWCIsInN4Iiwic291cmNlWSIsInN5IiwicnVubmluZyIsImxhc3RUaW1lIiwiY3VycmVudEZyYW1lIiwidG90YWxGcmFtZXMiLCJsZW5ndGgiLCJpbmRleCIsInNldEZyYW1lIiwic3RvcCIsInRpbWUiLCJuZXh0RnJhbWUiLCJTcHJpdGUiLCJCb2R5IiwieCIsInkiLCJhbmltYXRpb25zIiwiYW5pbWF0aW9uc1NoZWV0IiwiQ2hhcmFjdGVyU2hlZXQiLCJzcGxpdCIsImZvckVhY2giLCJuYW1lIiwiZ2V0QW5pbWF0aW9uIiwic3RhbmQiLCJ2aWV3IiwicnVuIiwic2V0WFkiLCJNYXRoIiwidHJ1bmMiLCJ1cGRhdGUiLCJXSURUSF9PTEQiLCJIRUlHSFRfT0xEIiwiaW1hZ2VXaWR0aCIsIldJRFRIX0FOSU1BVElPTiIsImltYWdlSGVpZ2h0IiwiSEVJR0hUX0FOTUFUSU9OIiwic2VxdWVuY2VzIiwiZ2V0U2VxdWVuY2VzIiwiZGF0YSIsInJlcXVpcmUiLCJsYXllcnMiLCJsYXllciIsImZpbHRlciIsImkiLCJTcHJpdGVTaGVldCIsIkdBTUVfV0lEVEgiLCJHQU1FX0hFSUdUSCIsIldPUktJTkdfV0lEVEgiLCJXT1JLSU5HX0hFSUdUSCIsIk1FTlVfSEVJR1RIIiwiU1BSSVRFX1dJRFRIIiwiU1BSSVRFX0hFSUdUSCIsIkNvbnRyb2xTdGF0ZSIsInVwIiwiZG93biIsImxlZnQiLCJyaWdodCIsImZpcmUiLCJhbW91bnRDaGFyYWN0ZXJzIiwiTWFwIiwiY2hhcmFjdGVyc0h1ZCIsImtleU1hcCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic3RhdGVzIiwidHlwZSIsImRyYWdnYWJsZSIsImJpcnRoVGltZSIsImNvdW50ZXIiLCJiZWhhdmlvciIsInZhbHVlIiwidGV4dFgiLCJ0ZXh0WSIsIm5vcm1hbCIsIm5vcm1hbENvbG9yIiwiZGFuZ2VyQ29sb3IiLCJzdGFydFgiLCJzdGFydFkiLCJwcmVzc2VkIiwiaGFzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZ2V0Iiwic3RhdGUiLCJpdGVtIiwiZXZlbnRPY2N1cnJlZCIsIl9jaGFuZ2VTdGF0ZSIsIl9jaGFuZ2VIdWQiLCJmZWVkIiwiX2dldEZlZWQiLCJHYW1lIiwic2NyZWVuIiwiU2NyZWVuIiwibG9hZEltYWdlcyIsImNvdyIsImNoaWNrZW4iLCJ3aGVhdCIsImFtb3VudENoaWNrZW5zIiwiYW1vdW50Q29pbnMiLCJhbW91bnRDb3dzIiwiYW1vdW50RWdncyIsImFtb3VudEZlZWQiLCJhbW91bnRNaWxrIiwiYW1vdW50V2hlYXQiLCJ0aXRsZSIsInRpbGVzIiwiY29udHJvbCIsInNjZW5lcyIsImxvYWRpbmciLCJMb2FkaW5nIiwibWVudSIsIk1lbnUiLCJnYW1lTGV2ZWwiLCJHYW1lTGV2ZWwiLCJjdXJyZW50U2NlbmUiLCJpbml0Iiwic3RhdHVzIiwiU2NlbmUiLCJMT0FERUQiLCJTVEFSVF9HQU1FIiwiV09SS0lORyIsImNoYW5nZVNjZW5lIiwicmVuZGVyIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZnJhbWUiLCJIdWRJdGVtIiwidGV4dCIsImNvbG9yIiwiSW1hZ2VMb2FkZXIiLCJpbWFnZUZpbGVzIiwiaW1hZ2VzIiwicHJvbWlzZSIsInB1c2giLCJsb2FkSW1hZ2UiLCJQcm9taXNlIiwiYWxsIiwic3JjIiwicmVzb2x2ZSIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJ3aW5kb3ciLCJmYXJtIiwiTW91c2UiLCJjaGFyYWN0ZXJzIiwiY2xpY2tIYW5kbGVyIiwib25DbGljayIsImJpbmQiLCJtb3VzZU1vdmVIYW5kbGVyIiwib25Nb3VzZU1vdmUiLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VVcCIsIm9uTW91c2VEb3duIiwiZmluZGVkQ2hhcmFjdGVyIiwic3RhcnRDb29yZHMiLCJiZWdpbkNvb3JkcyIsImRyYWdnZWQiLCJldnQiLCJjbGllbnRYIiwiY2xpZW50WSIsIm1vdmVFdnQiLCJpbmRlbnRYIiwiaW5kZW50WSIsInNoaWZ0IiwibmV3Q29vcmRzIiwicjEiLCJyMiIsInVwRXZ0IiwidG9QcmV2aW91c1BsYWNlIiwiX2NoZWNrT3ZlcmxhcCIsInBsYXkiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiUGxheWVyIiwic3RhcnRUaW1lIiwiY2hhbmdlVGltZSIsImJpcnRoIiwiYWN0aW9uT24iLCJuZWVkQWN0aW9uIiwiZ2FtZSIsImNvbnN0cnVjdG9yIiwiY2hhcmFjdGVyIiwiaHVkSXRlbSIsInNvcnQiLCJwcmV2IiwibmV4dCIsImNoYXJDb2RlQXQiLCJtb3VzZSIsIm1hcERhdGEiLCJtYXAiLCJjcmVhdGVNYXAiLCJmaWxsIiwiZHJhd1Nwcml0ZSIsImVsZW0iLCJkcmF3SHVkIiwibG9hZGVkQXQiLCJpc0ltYWdlc0xvYWRlZCIsImZpbmlzaCIsInByaW50IiwiZHJhd0ltYWdlIiwic3ByaXRlV2lkdGgiLCJzcHJpdGVIZWlnaHQiLCJpbmRleGVzIiwiZ2V0U291cmNlWCIsImdldFNvdXJjZVkiLCJjYW52YXMiLCJjcmVhdGVDYW52YXMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImxvYWRlciIsImxvYWQiLCJ0aGVuIiwibmFtZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZCIsInRpbGVzZXQiLCJtYXBJbWFnZSIsInRpbGV3aWR0aCIsInRpbGVoZWlnaHQiLCJtYXBDb250ZXh0IiwiaGl0Ym94ZXMiLCJyb3ciLCJjb2wiLCJvYmplY3RzIiwib2JqIiwieDEiLCJ4MiIsInkxIiwieTIiLCJUaWxlTWFwIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJzcHJpdGUiLCJodWQiLCJwcm9wcyIsIlZlY3RvciIsImRpcmVjdGlvbiIsInNldERpcmVjdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSkE7QUFDTyxJQUFNQSxTQUFiO0FBQUE7O0FBQ0ksMkJBQStGO0FBQUE7O0FBQUEsUUFBbEZDLFNBQWtGLFFBQWxGQSxTQUFrRjtBQUFBLFFBQXZFQyxNQUF1RSxRQUF2RUEsTUFBdUU7QUFBQSxRQUEvREMsS0FBK0QsUUFBL0RBLEtBQStEO0FBQUEsMkJBQXhEQyxNQUF3RDtBQUFBLFFBQXhEQSxNQUF3RCw0QkFBL0MsSUFBK0M7QUFBQSw0QkFBekNDLE9BQXlDO0FBQUEsUUFBekNBLE9BQXlDLDZCQUEvQixJQUErQjtBQUFBLDBCQUF6QkMsS0FBeUI7QUFBQSxRQUF6QkEsS0FBeUIsMkJBQWpCLEVBQWlCO0FBQUEsMkJBQWJDLE1BQWE7QUFBQSxRQUFiQSxNQUFhLDRCQUFKLEVBQUk7O0FBQUE7O0FBQzNGLG1GQUFNO0FBQ05OLGVBQVMsRUFBRUEsU0FETDtBQUVOTyxhQUFPLEVBQUVOLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVU8sRUFGYjtBQUdOQyxhQUFPLEVBQUVSLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVVMsRUFIYjtBQUlOTCxXQUFLLEVBQUVBLEtBSkQ7QUFLTkMsWUFBTSxFQUFFQTtBQUxGLEtBQU47QUFPQSxVQUFLTCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxVQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxVQUFLUSxPQUFMLEdBQWVQLE9BQWY7QUFDQSxVQUFLUSxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUIsTUFBS2IsTUFBTCxDQUFZYyxNQUEvQjtBQWQyRjtBQWU5Rjs7QUFoQkw7QUFBQTtBQUFBLDZCQWlCYUMsS0FqQmIsRUFpQm1CO0FBQ1gsV0FBS0gsWUFBTCxHQUFvQkcsS0FBcEI7QUFDQSxXQUFLVCxPQUFMLEdBQWUsS0FBS04sTUFBTCxDQUFZZSxLQUFaLEVBQW1CUixFQUFsQztBQUNBLFdBQUtDLE9BQUwsR0FBZSxLQUFLUixNQUFMLENBQVllLEtBQVosRUFBbUJOLEVBQWxDO0FBQ0g7QUFyQkw7QUFBQTtBQUFBLDBCQXNCUztBQUNELFVBQUcsQ0FBQyxLQUFLQyxPQUFULEVBQWlCO0FBQ2pCLGFBQUtNLFFBQUwsQ0FBYyxDQUFkO0FBQ0EsYUFBS04sT0FBTCxHQUFlLElBQWY7QUFDQztBQUNKO0FBM0JMO0FBQUE7QUFBQSwyQkE0QlU7QUFDRixXQUFLQSxPQUFMLEdBQWUsS0FBZjtBQUNIO0FBOUJMO0FBQUE7QUFBQSxnQ0ErQmU7QUFDUCxVQUFJLEtBQUtFLFlBQUwsR0FBbUIsQ0FBcEIsS0FBMEIsS0FBS0MsV0FBbEMsRUFBOEM7QUFDMUMsWUFBRyxLQUFLWCxNQUFSLEVBQWU7QUFDWCxlQUFLYyxRQUFMLENBQWMsQ0FBZDtBQUNBO0FBQ0g7O0FBQ0QsYUFBS0MsSUFBTDtBQUNBO0FBQ0g7O0FBQ0QsV0FBS0QsUUFBTCxDQUFjLEtBQUtKLFlBQUwsR0FBbUIsQ0FBakM7QUFDSDtBQXpDTDtBQUFBO0FBQUEsMkJBMENXTSxJQTFDWCxFQTBDZ0I7QUFDUixVQUFHLENBQUMsS0FBS1IsT0FBVCxFQUFpQjtBQUNiO0FBQ0g7O0FBQ0QsVUFBRyxLQUFLQyxRQUFMLEtBQWtCLENBQXJCLEVBQXVCO0FBQ25CLGFBQUtBLFFBQUwsR0FBZ0JPLElBQWhCO0FBQ0E7QUFDSDs7QUFDRCxVQUFJQSxJQUFJLEdBQUMsS0FBS1AsUUFBWCxHQUFxQixLQUFLVixLQUE3QixFQUFtQztBQUMvQixhQUFLa0IsU0FBTDtBQUNBLGFBQUtSLFFBQUwsR0FBZ0JPLElBQWhCO0FBQ0g7QUFDSjtBQXRETDs7QUFBQTtBQUFBLEVBQStCRSw4Q0FBL0IsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDTyxJQUFNQyxJQUFiO0FBQ0ksc0JBQStCO0FBQUE7O0FBQUEsUUFBbEJ0QixTQUFrQixRQUFsQkEsU0FBa0I7QUFBQSxRQUFQRSxLQUFPLFFBQVBBLEtBQU87O0FBQUE7O0FBQzNCLFNBQUtxQixDQUFMLEdBQVMsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBUyxDQUFUO0FBQ0EsU0FBS3RCLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtVLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxTQUFLYSxVQUFMLEdBQWtCLEVBQWxCO0FBRUEsUUFBTUMsZUFBZSxHQUFHLElBQUlDLCtEQUFKLENBQW1CO0FBQUMzQixlQUFTLEVBQVRBO0FBQUQsS0FBbkIsQ0FBeEI7QUFDQSwrREFBMkQ0QixLQUEzRCxNQUFzRUMsT0FBdEUsQ0FBOEUsVUFBQ0MsSUFBRCxFQUFVO0FBQ3BGLFdBQUksQ0FBQ0wsVUFBTCxDQUFnQkssSUFBaEIsSUFBd0JKLGVBQWUsQ0FBQ0ssWUFBaEIsQ0FBNkJELElBQTdCLENBQXhCO0FBQ0gsS0FGRDtBQUdBLFNBQUtFLEtBQUw7QUFDSDs7QUFiTDtBQUFBO0FBQUEsNEJBY1c7QUFDSCxXQUFLQyxJQUFMLEdBQVksS0FBS1IsVUFBTCxTQUFaO0FBQ0EsV0FBS1EsSUFBTCxDQUFVZixJQUFWO0FBQ0g7QUFqQkw7QUFBQTtBQUFBLDRCQWtCVztBQUNILFdBQUtlLElBQUwsR0FBWSxLQUFLUixVQUFMLFNBQVo7QUFDQSxXQUFLUSxJQUFMLENBQVVDLEdBQVY7QUFDSDtBQXJCTDtBQUFBO0FBQUEsK0JBc0JjO0FBQ04sV0FBS0QsSUFBTCxHQUFZLEtBQUtSLFVBQUwsVUFBWjtBQUNBLFdBQUtRLElBQUwsQ0FBVWYsSUFBVjtBQUNIO0FBekJMO0FBQUE7QUFBQSwyQkEwQldDLElBMUJYLEVBMEJnQjtBQUNSLFVBQUcsS0FBS1AsUUFBTCxLQUFrQixDQUFyQixFQUF1QjtBQUNuQixhQUFLQSxRQUFMLEdBQWdCTyxJQUFoQjtBQUNBO0FBQ0g7O0FBQ0QsV0FBS1AsUUFBTCxHQUFnQk8sSUFBaEI7QUFDQSxXQUFLYyxJQUFMLENBQVVFLEtBQVYsQ0FBZ0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtkLENBQWhCLENBQWhCLEVBQW1DYSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLYixDQUFoQixDQUFuQztBQUNBLFdBQUtTLElBQUwsQ0FBVUssTUFBVixDQUFpQm5CLElBQWpCO0FBQ0g7QUFsQ0w7O0FBQUE7QUFBQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQSxJQUFNb0IsU0FBUyxHQUFHLEdBQWxCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLElBQW5CO0FBR08sSUFBTWIsY0FBYjtBQUFBOztBQUNJLGdDQUF3QjtBQUFBOztBQUFBLFFBQVgzQixTQUFXLFFBQVhBLFNBQVc7O0FBQUE7O0FBQ3BCLHdGQUFNO0FBQ0ZBLGVBQVMsRUFBVEEsU0FERTtBQUVGeUMsZ0JBQVUsRUFBRUMsMERBRlY7QUFHRkMsaUJBQVcsRUFBRUMsMERBQWVBO0FBSDFCLEtBQU47QUFLQSxVQUFLQyxTQUFMLEdBQWlCLE1BQUtDLFlBQUwsRUFBakI7QUFOb0I7QUFPdkI7O0FBUkw7QUFBQTtBQUFBLG1DQVNrQjtBQUNWLFVBQU1DLElBQUksR0FBR0MsbUJBQU8sQ0FBQywyREFBckI7O0FBQ0EsVUFBTUgsU0FBUyxHQUFJLEVBQW5CO0FBQ0FFLFVBQUksQ0FBQ0UsTUFBTCxDQUFZcEIsT0FBWixDQUFvQixVQUFDcUIsS0FBRCxFQUFXO0FBQzNCTCxpQkFBUyxDQUFDSyxLQUFLLENBQUNwQixJQUFQLENBQVQsR0FBd0JvQixLQUFLLENBQUNILElBQU4sQ0FBV0ksTUFBWCxDQUFrQixVQUFDQyxDQUFEO0FBQUEsaUJBQU9BLENBQUMsR0FBQyxDQUFUO0FBQUEsU0FBbEIsQ0FBeEI7QUFDSCxPQUZEO0FBR0EsYUFBT1AsU0FBUDtBQUNIO0FBaEJMO0FBQUE7QUFBQSxpQ0FpQmlCZixJQWpCakIsRUFpQmtFO0FBQUEsVUFBM0M1QixLQUEyQyx1RUFBbkMsR0FBbUM7QUFBQSxVQUE5QkMsTUFBOEIsdUVBQXJCLElBQXFCO0FBQUEsVUFBZkMsT0FBZSx1RUFBTCxJQUFLO0FBQzFELDhGQUEwQixLQUFLeUMsU0FBTCxDQUFlZixJQUFmLENBQTFCLEVBQStDNUIsS0FBL0MsRUFBc0RDLE1BQXRELEVBQThEQyxPQUE5RDtBQUNIO0FBbkJMOztBQUFBO0FBQUEsRUFBb0NpRCx5REFBcEMsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTyxJQUFNQyxVQUFVLEdBQUcsR0FBbkI7QUFDQSxJQUFNQyxXQUFXLEdBQUUsR0FBbkI7QUFDQSxJQUFNQyxhQUFhLEdBQUdGLFVBQVUsR0FBRyxHQUFuQztBQUNBLElBQU1HLGNBQWMsR0FBR0YsV0FBdkI7QUFDQSxJQUFNRyxXQUFXLEdBQUdILFdBQVcsR0FBQyxHQUFoQztBQUNBLElBQU1JLFlBQVksR0FBRyxFQUFyQjtBQUNBLElBQU1DLGFBQWEsR0FBRyxFQUF0QjtBQUNBLElBQU1sQixlQUFlLEdBQUcsR0FBeEI7QUFDQSxJQUFNRSxlQUFlLEdBQUcsR0FBeEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQSxJQUFNaUIsWUFBYjtBQUNJLDBCQUFjO0FBQUE7O0FBQUE7O0FBQ1YsU0FBS0MsRUFBTCxHQUFVLEtBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVksS0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxLQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVksS0FBWjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLElBQUlDLEdBQUosQ0FBUSxDQUM1Qix3QkFENEIsRUFDRixxQkFERSxFQUNxQiw2QkFEckIsQ0FBUixDQUF4QjtBQUdBLFNBQUtDLGFBQUwsR0FBcUIsSUFBSUQsR0FBSixDQUFRLENBQ3pCLHVCQUR5QixFQUNBLHFCQURBLEVBQ3VCLHlCQUR2QixDQUFSLENBQXJCO0FBR0EsU0FBS0UsTUFBTCxHQUFjLElBQUlGLEdBQUosQ0FBUSxDQUNsQixDQUFDLEVBQUQsU0FEa0IsRUFDSixDQUFDLEVBQUQsVUFESSxFQUNXLENBQUMsRUFBRCxPQURYLEVBQ3VCLENBQUMsRUFBRCxTQUR2QixFQUNxQyxDQUFDLEVBQUQsU0FEckMsQ0FBUixDQUFkO0FBR0FHLFlBQVEsQ0FBQ0MsZ0JBQVQsWUFBcUMsVUFBQ0MsS0FBRDtBQUFBLGFBQVcsS0FBSSxDQUFDbkMsTUFBTCxDQUFZbUMsS0FBWixFQUFtQixJQUFuQixDQUFYO0FBQUEsS0FBckM7QUFDQUYsWUFBUSxDQUFDQyxnQkFBVCxVQUFtQyxVQUFDQyxLQUFEO0FBQUEsYUFBVyxLQUFJLENBQUNuQyxNQUFMLENBQVltQyxLQUFaLEVBQW1CLEtBQW5CLENBQVg7QUFBQSxLQUFuQyxFQWhCVSxDQWlCVjs7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FDVjtBQUNJNUMsVUFBSSxTQURSO0FBRUk2QyxVQUFJLGFBRlI7QUFHSXBELE9BQUMsRUFBRSxFQUhQO0FBSUlDLE9BQUMsRUFBRSxHQUpQO0FBS0lvRCxlQUFTLEVBQUUsSUFMZjtBQU1JQyxlQUFTLEVBQUUsRUFOZjtBQU9JMUUsWUFBTSxFQUFFLENBQUMsQ0FQYjtBQVFJMkUsYUFBTyxFQUFFLENBUmI7QUFTSUMsY0FBUSxFQUFFO0FBVGQsS0FEVSxFQVlWO0FBQ0lqRCxVQUFJLFNBRFI7QUFFSTZDLFVBQUksYUFGUjtBQUdJcEQsT0FBQyxFQUFFLEVBSFA7QUFJSUMsT0FBQyxFQUFFLEdBSlA7QUFLSW9ELGVBQVMsRUFBRSxJQUxmO0FBTUlDLGVBQVMsRUFBRSxFQU5mO0FBT0kxRSxZQUFNLEVBQUUsQ0FBQyxDQVBiO0FBUUkyRSxhQUFPLEVBQUUsQ0FSYjtBQVNJQyxjQUFRLEVBQUU7QUFUZCxLQVpVLEVBdUJWO0FBQ0lqRCxVQUFJLE9BRFI7QUFFSTZDLFVBQUksYUFGUjtBQUdJcEQsT0FBQyxFQUFFLEdBSFA7QUFJSUMsT0FBQyxFQUFFLEdBSlA7QUFLSW9ELGVBQVMsRUFBRSxJQUxmO0FBTUlDLGVBQVMsRUFBRSxFQU5mO0FBT0kxRSxZQUFNLEVBQUUsQ0FQWjtBQVFJMkUsYUFBTyxFQUFFLENBUmI7QUFTSUMsY0FBUSxFQUFFO0FBVGQsS0F2QlUsRUFrQ1Y7QUFDSWpELFVBQUksV0FEUjtBQUVJNkMsVUFBSSxhQUZSO0FBR0lwRCxPQUFDLEVBQUUsR0FIUDtBQUlJQyxPQUFDLEVBQUUsR0FKUDtBQUtJb0QsZUFBUyxFQUFFLElBTGY7QUFNSUMsZUFBUyxFQUFFLEVBTmY7QUFPSTFFLFlBQU0sRUFBRSxDQVBaO0FBUUkyRSxhQUFPLEVBQUUsQ0FSYjtBQVNJQyxjQUFRLEVBQUU7QUFUZCxLQWxDVSxFQTZDVjtBQUNJakQsVUFBSSxlQURSO0FBRUk2QyxVQUFJLFVBRlI7QUFHSUssV0FBSyxFQUFFLENBSFg7QUFJSUMsV0FBSyxFQUFFLEdBSlg7QUFLSUMsV0FBSyxFQUFFLEdBTFg7QUFNSUMsWUFBTSxFQUFFLElBTlo7QUFPSUMsaUJBQVcsV0FQZjtBQVFJQyxpQkFBVyxXQVJmO0FBU0k5RCxPQUFDLEVBQUUsRUFUUDtBQVVJQyxPQUFDLEVBQUUsR0FWUDtBQVdJb0QsZUFBUyxFQUFFLEtBWGY7QUFZSUUsYUFBTyxFQUFFLENBWmI7QUFhSUMsY0FBUSxFQUFFO0FBYmQsS0E3Q1UsRUE0RFY7QUFDSWpELFVBQUksY0FEUjtBQUVJNkMsVUFBSSxVQUZSO0FBR0lLLFdBQUssRUFBRSxDQUhYO0FBSUlDLFdBQUssRUFBRSxHQUpYO0FBS0lDLFdBQUssRUFBRSxHQUxYO0FBTUlDLFlBQU0sRUFBRSxJQU5aO0FBT0lDLGlCQUFXLFdBUGY7QUFRSUMsaUJBQVcsV0FSZjtBQVNJOUQsT0FBQyxFQUFFLEdBVFA7QUFVSUMsT0FBQyxFQUFFLEdBVlA7QUFXSW9ELGVBQVMsRUFBRSxLQVhmO0FBWUlFLGFBQU8sRUFBRSxDQVpiO0FBYUlDLGNBQVEsRUFBRTtBQWJkLEtBNURVLEVBMkVWO0FBQ0lqRCxVQUFJLGtCQURSO0FBRUk2QyxVQUFJLFVBRlI7QUFHSUssV0FBSyxFQUFFLENBSFg7QUFJSUMsV0FBSyxFQUFFLEdBSlg7QUFLSUMsV0FBSyxFQUFFLEdBTFg7QUFNSUMsWUFBTSxFQUFFLElBTlo7QUFPSUMsaUJBQVcsV0FQZjtBQVFJQyxpQkFBVyxXQVJmO0FBU0k5RCxPQUFDLEVBQUUsR0FUUDtBQVVJQyxPQUFDLEVBQUUsR0FWUDtBQVdJb0QsZUFBUyxFQUFFLEtBWGY7QUFZSUUsYUFBTyxFQUFFLENBWmI7QUFhSUMsY0FBUSxFQUFFO0FBYmQsS0EzRVUsRUEwRlY7QUFDSWpELFVBQUksZUFEUjtBQUVJNkMsVUFBSSxVQUZSO0FBR0lLLFdBQUssRUFBRSxDQUhYO0FBSUlDLFdBQUssRUFBRSxHQUpYO0FBS0lDLFdBQUssRUFBRSxHQUxYO0FBTUlDLFlBQU0sRUFBRSxLQU5aO0FBT0lDLGlCQUFXLFdBUGY7QUFRSUMsaUJBQVcsV0FSZjtBQVNJOUQsT0FBQyxFQUFFLEdBVFA7QUFVSUMsT0FBQyxFQUFFLEVBVlA7QUFXSW9ELGVBQVMsRUFBRSxLQVhmO0FBWUlFLGFBQU8sRUFBRSxDQVpiO0FBYUlDLGNBQVEsRUFBRTtBQWJkLEtBMUZVLEVBeUdWO0FBQ0lqRCxVQUFJLGNBRFI7QUFFSTZDLFVBQUksVUFGUjtBQUdJSyxXQUFLLEVBQUUsQ0FIWDtBQUlJQyxXQUFLLEVBQUUsR0FKWDtBQUtJQyxXQUFLLEVBQUUsR0FMWDtBQU1JSSxZQUFNLEVBQUUsR0FOWjtBQU9JQyxZQUFNLEVBQUUsR0FQWjtBQVFJSixZQUFNLEVBQUUsS0FSWjtBQVNJQyxpQkFBVyxXQVRmO0FBVUlDLGlCQUFXLFdBVmY7QUFXSTlELE9BQUMsRUFBRSxHQVhQO0FBWUlDLE9BQUMsRUFBRSxHQVpQO0FBYUlvRCxlQUFTLEVBQUUsS0FiZjtBQWNJRSxhQUFPLEVBQUUsQ0FkYjtBQWVJQyxjQUFRLEVBQUU7QUFmZCxLQXpHVSxFQTBIVjtBQUNJakQsVUFBSSxjQURSO0FBRUk2QyxVQUFJLFVBRlI7QUFHSUssV0FBSyxFQUFFLENBSFg7QUFJSUMsV0FBSyxFQUFFLEdBSlg7QUFLSUMsV0FBSyxFQUFFLEdBTFg7QUFNSUksWUFBTSxFQUFFLEdBTlo7QUFPSUMsWUFBTSxFQUFFLEdBUFo7QUFRSUosWUFBTSxFQUFFLEtBUlo7QUFTSUMsaUJBQVcsV0FUZjtBQVVJQyxpQkFBVyxXQVZmO0FBV0k5RCxPQUFDLEVBQUUsR0FYUDtBQVlJQyxPQUFDLEVBQUUsR0FaUDtBQWFJb0QsZUFBUyxFQUFFLEtBYmY7QUFjSUUsYUFBTyxFQUFFLENBZGI7QUFlSUMsY0FBUSxFQUFFO0FBZmQsS0ExSFUsRUEySVY7QUFDSWpELFVBQUksY0FEUjtBQUVJNkMsVUFBSSxVQUZSO0FBR0lLLFdBQUssRUFBRSxDQUhYO0FBSUlDLFdBQUssRUFBRSxHQUpYO0FBS0lDLFdBQUssRUFBRSxHQUxYO0FBTUlDLFlBQU0sRUFBRSxLQU5aO0FBT0lDLGlCQUFXLFdBUGY7QUFRSUMsaUJBQVcsV0FSZjtBQVNJOUQsT0FBQyxFQUFFLEdBVFA7QUFVSUMsT0FBQyxFQUFFLEdBVlA7QUFXSW9ELGVBQVMsRUFBRSxLQVhmO0FBWUlFLGFBQU8sRUFBRSxDQVpiO0FBYUlDLGNBQVEsRUFBRTtBQWJkLEtBM0lVLENBQWQ7QUEySkg7O0FBOUtMO0FBQUE7QUFBQSwyQkErS1dOLEtBL0tYLEVBK0trQmUsT0EvS2xCLEVBK0syQjtBQUNuQixVQUFJLEtBQUtsQixNQUFMLENBQVltQixHQUFaLENBQWdCaEIsS0FBSyxDQUFDaUIsT0FBdEIsQ0FBSixFQUFvQztBQUNoQ2pCLGFBQUssQ0FBQ2tCLGNBQU47QUFDQWxCLGFBQUssQ0FBQ21CLGVBQU47QUFDQSxhQUFLLEtBQUt0QixNQUFMLENBQVl1QixHQUFaLENBQWdCcEIsS0FBSyxDQUFDaUIsT0FBdEIsQ0FBTCxJQUF1Q0YsT0FBdkM7QUFFSDtBQUNKLEtBdExMLENBdUxJOztBQXZMSjtBQUFBO0FBQUEsaUNBd0xpQk0sS0F4TGpCLEVBd0x3QjtBQUNoQixVQUFJQSxLQUFLLENBQUNoQixPQUFOLEtBQW1CZ0IsS0FBSyxDQUFDZixRQUFOLENBQWVoRSxNQUFmLEdBQXdCLENBQS9DLEVBQW1EO0FBQy9DK0UsYUFBSyxDQUFDaEIsT0FBTixHQUFnQixDQUFoQjtBQUNILE9BRkQsTUFFTztBQUNIZ0IsYUFBSyxDQUFDaEIsT0FBTjtBQUNIO0FBQ0o7QUE5TEw7QUFBQTtBQUFBLCtCQStMZWhELElBL0xmLEVBK0xxQmtELEtBL0xyQixFQStMNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDcEIsNkJBQWlCLEtBQUtOLE1BQXRCLDhIQUE4QjtBQUFBLGNBQXJCcUIsSUFBcUI7O0FBQzFCLGNBQUlBLElBQUksQ0FBQ2pFLElBQUwsS0FBY0EsSUFBbEIsRUFBd0I7QUFDcEJpRSxnQkFBSSxDQUFDZixLQUFMLElBQWNBLEtBQWQ7QUFDQWUsZ0JBQUksQ0FBQ1osTUFBTCxHQUFjWSxJQUFJLENBQUNmLEtBQUwsS0FBZSxDQUFmLEdBQW1CLEtBQW5CLEdBQTJCLElBQXpDO0FBQ0E7QUFDSDtBQUNKO0FBUG1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRdkI7QUF2TUw7QUFBQTtBQUFBLCtCQXdNZTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNQLDhCQUFpQixLQUFLTixNQUF0QixtSUFBOEI7QUFBQSxjQUFyQnFCLElBQXFCOztBQUMxQixjQUFJQSxJQUFJLENBQUNqRSxJQUFMLGlCQUFKLEVBQWdDO0FBQzVCLG1CQUFPaUUsSUFBUDtBQUNIO0FBQ0o7QUFMTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTVYsS0E5TUwsQ0ErTUk7O0FBL01KO0FBQUE7QUFBQSx5QkFnTlNELEtBaE5ULEVBZ05nQkUsYUFoTmhCLEVBZ04rQjtBQUN2QixVQUFJQSxhQUFhLGlCQUFqQixFQUFvQztBQUNoQyxZQUFJRixLQUFLLENBQUNoRSxJQUFOLFlBQUosRUFBNEI7QUFDeEIsZUFBS21FLFlBQUwsQ0FBa0JILEtBQWxCO0FBQ0gsU0FGRCxNQUVPO0FBQ0hBLGVBQUssQ0FBQzNGLE1BQU47O0FBQ0EsZUFBSytGLFVBQUwsQ0FBZ0IsS0FBSzdCLGFBQUwsQ0FBbUJ3QixHQUFuQixDQUF1QkMsS0FBSyxDQUFDaEUsSUFBN0IsQ0FBaEIsRUFBb0QsQ0FBcEQ7O0FBQ0EsY0FBSWdFLEtBQUssQ0FBQzNGLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDcEIsaUJBQUs4RixZQUFMLENBQWtCSCxLQUFsQjs7QUFDQSxnQkFBSUEsS0FBSyxDQUFDaEUsSUFBTixVQUFKLEVBQTBCO0FBQ3RCZ0UsbUJBQUssQ0FBQzNGLE1BQU4sR0FBZSxDQUFmO0FBQ0gsYUFGRCxNQUVPO0FBQ0gyRixtQkFBSyxDQUFDM0YsTUFBTixHQUFlLENBQWY7QUFDSDtBQUNKO0FBQ0o7QUFDSixPQWZELE1BZU8sSUFBSTZGLGFBQWEsY0FBakIsRUFBaUM7QUFDcEMsYUFBS0UsVUFBTCxDQUFnQixLQUFLL0IsZ0JBQUwsQ0FBc0IwQixHQUF0QixDQUEwQkMsS0FBSyxDQUFDaEUsSUFBaEMsQ0FBaEIsRUFBdUQsQ0FBQyxDQUF4RDs7QUFDQSxZQUFJZ0UsS0FBSyxDQUFDaEUsSUFBTixZQUFKLEVBQTRCLEtBQUttRSxZQUFMLENBQWtCSCxLQUFsQjtBQUMvQixPQUhNLE1BR0EsSUFBSUUsYUFBYSxZQUFqQixFQUErQjtBQUNsQyxZQUFNRyxJQUFJLEdBQUcsS0FBS0MsUUFBTCxFQUFiOztBQUNBLFlBQUlOLEtBQUssQ0FBQ2hFLElBQU4sZ0JBQTBCZ0UsS0FBSyxDQUFDZixRQUFOLENBQWVlLEtBQUssQ0FBQ2hCLE9BQXJCLGdCQUE5QixFQUE0RTtBQUN4RSxlQUFLb0IsVUFBTCxlQUE4QixDQUE5Qjs7QUFDQSxlQUFLRCxZQUFMLENBQWtCSCxLQUFsQjs7QUFDQTtBQUNIOztBQUNELFlBQUksQ0FBQ0EsS0FBSyxDQUFDaEUsSUFBTixjQUF3QmdFLEtBQUssQ0FBQ2hFLElBQU4sY0FBekIsS0FBc0RxRSxJQUFJLENBQUNuQixLQUFMLEdBQWEsQ0FBbkUsSUFBd0VjLEtBQUssQ0FBQ2YsUUFBTixDQUFlZSxLQUFLLENBQUNoQixPQUFyQixhQUE1RSxFQUF1SDtBQUNuSCxlQUFLb0IsVUFBTCxlQUE4QixDQUFDLENBQS9COztBQUNBLGVBQUtELFlBQUwsQ0FBa0JILEtBQWxCOztBQUNBO0FBQ0g7O0FBQ0QsWUFBSUEsS0FBSyxDQUFDaEUsSUFBTixpQkFBSixFQUFpQztBQUM3QixjQUFJZ0UsS0FBSyxDQUFDZCxLQUFOLEdBQWMsQ0FBbEIsRUFBcUI7QUFDakIsaUJBQUtrQixVQUFMLGdCQUErQixJQUFJSixLQUFLLENBQUNkLEtBQXpDOztBQUNBLGlCQUFLa0IsVUFBTCxlQUE4QixDQUFDSixLQUFLLENBQUNkLEtBQXJDO0FBQ0g7O0FBQ0Q7QUFDSDs7QUFDRCxZQUFJYyxLQUFLLENBQUNoRSxJQUFOLGlCQUFKLEVBQWlDO0FBQzdCLGNBQUlnRSxLQUFLLENBQUNkLEtBQU4sR0FBYyxDQUFsQixFQUFxQjtBQUNqQixpQkFBS2tCLFVBQUwsZ0JBQStCSixLQUFLLENBQUNkLEtBQXJDOztBQUNBLGlCQUFLa0IsVUFBTCxlQUE4QixDQUFDSixLQUFLLENBQUNkLEtBQXJDO0FBQ0g7O0FBQ0Q7QUFDSDtBQUNKO0FBRUo7QUEvUEw7O0FBQUE7QUFBQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLElBQU1xQixJQUFiO0FBQ0ksa0JBQTZDO0FBQUEsbUZBQUgsRUFBRztBQUFBLDBCQUFoQ2hHLEtBQWdDO0FBQUEsUUFBaENBLEtBQWdDLDJCQUF4QixHQUF3QjtBQUFBLDJCQUFuQkMsTUFBbUI7QUFBQSxRQUFuQkEsTUFBbUIsNEJBQVYsR0FBVTs7QUFBQTs7QUFDekMsU0FBS2dHLE1BQUwsR0FBYyxJQUFJQyw2Q0FBSixDQUFXbEcsS0FBWCxFQUFpQkMsTUFBakIsQ0FBZDtBQUNBLFNBQUtnRyxNQUFMLENBQVlFLFVBQVosQ0FBdUI7QUFDbkJDLFNBQUcsZUFEZ0I7QUFFbkJDLGFBQU8sbUJBRlk7QUFHbkJDLFdBQUssaUJBSGM7QUFJbkJDLG9CQUFjLDBCQUpLO0FBS25CQyxpQkFBVyx1QkFMUTtBQU1uQkMsZ0JBQVUsc0JBTlM7QUFPbkJDLGdCQUFVLHNCQVBTO0FBUW5CQyxnQkFBVSxzQkFSUztBQVNuQkMsZ0JBQVUsc0JBVFM7QUFVbkJDLGlCQUFXLHVCQVZRO0FBV25CQyxXQUFLLGlCQVhjO0FBWW5CQyxXQUFLO0FBWmMsS0FBdkI7QUFjQSxTQUFLQyxPQUFMLEdBQWUsSUFBSXhELDJEQUFKLEVBQWY7QUFDQSxTQUFLeUQsTUFBTCxHQUFjO0FBQ1ZDLGFBQU8sRUFBRSxJQUFJQyx1REFBSixDQUFZLElBQVosQ0FEQztBQUVWQyxVQUFJLEVBQUUsSUFBSUMsaURBQUosQ0FBUyxJQUFULENBRkk7QUFHVkMsZUFBUyxFQUFFLElBQUlDLDREQUFKLENBQWMsSUFBZDtBQUhELEtBQWQ7QUFLQSxTQUFLQyxZQUFMLEdBQW9CLEtBQUtQLE1BQUwsQ0FBWUMsT0FBaEM7QUFDQSxTQUFLTSxZQUFMLENBQWtCQyxJQUFsQjtBQUNIOztBQXpCTDtBQUFBO0FBQUEsZ0NBMEJnQkMsTUExQmhCLEVBMEJ1QjtBQUNmLGNBQU9BLE1BQVA7QUFDSSxhQUFLQyw0Q0FBSyxDQUFDQyxNQUFYO0FBQ0ksaUJBQU8sS0FBS1gsTUFBTCxDQUFZRyxJQUFuQjtBQUNBOztBQUNKLGFBQUtPLDRDQUFLLENBQUNFLFVBQVg7QUFDSSxpQkFBTyxLQUFLWixNQUFMLENBQVlLLFNBQW5CO0FBQ0E7O0FBQ0o7QUFDSSxpQkFBTyxLQUFLTCxNQUFMLENBQVlHLElBQW5CO0FBUlI7QUFVSDtBQXJDTDtBQUFBO0FBQUEsMEJBc0NVdEcsSUF0Q1YsRUFzQ2U7QUFBQTs7QUFDUCxVQUFHLEtBQUswRyxZQUFMLENBQWtCRSxNQUFsQixLQUE2QkMsNENBQUssQ0FBQ0csT0FBdEMsRUFBOEM7QUFDMUMsYUFBS04sWUFBTCxHQUFvQixLQUFLTyxXQUFMLENBQWlCLEtBQUtQLFlBQUwsQ0FBa0JFLE1BQW5DLENBQXBCO0FBQ0EsYUFBS0YsWUFBTCxDQUFrQkMsSUFBbEI7QUFDSDs7QUFDRCxXQUFLRCxZQUFMLENBQWtCUSxNQUFsQixDQUF5QmxILElBQXpCO0FBQ0FtSCwyQkFBcUIsQ0FBQyxVQUFDbkgsSUFBRDtBQUFBLGVBQVUsS0FBSSxDQUFDb0gsS0FBTCxDQUFXcEgsSUFBWCxDQUFWO0FBQUEsT0FBRCxDQUFyQjtBQUNIO0FBN0NMO0FBQUE7QUFBQSwwQkE4Q1M7QUFBQTs7QUFDRG1ILDJCQUFxQixDQUFDLFVBQUNuSCxJQUFEO0FBQUEsZUFBVSxNQUFJLENBQUNvSCxLQUFMLENBQVdwSCxJQUFYLENBQVY7QUFBQSxPQUFELENBQXJCO0FBQ0g7QUFoREw7O0FBQUE7QUFBQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFFTyxJQUFNcUgsT0FBYjtBQUFBOztBQUNJLG1CQUFZeEksU0FBWixFQUF1QjhGLEtBQXZCLEVBQThCO0FBQUE7O0FBQUE7O0FBQzFCLGlGQUFNO0FBQUU5RixlQUFTLEVBQVRBLFNBQUY7QUFBYUUsV0FBSyxFQUFFO0FBQXBCLEtBQU47QUFDQSxVQUFLNEYsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBSzJDLElBQUwsZUFBaUIsTUFBSzNDLEtBQUwsQ0FBV2QsS0FBNUI7QUFDQSxVQUFLMEQsS0FBTCxHQUFhLE1BQUs1QyxLQUFMLENBQVdYLE1BQVgsR0FBb0IsTUFBS1csS0FBTCxDQUFXVixXQUEvQixHQUE2QyxNQUFLVSxLQUFMLENBQVdULFdBQXJFLEVBQ0EsTUFBS0osS0FBTCxHQUFhLE1BQUthLEtBQUwsQ0FBV2IsS0FEeEI7QUFFQSxVQUFLQyxLQUFMLEdBQWEsTUFBS1ksS0FBTCxDQUFXWixLQUF4QjtBQU4wQjtBQU83Qjs7QUFSTDtBQUFBO0FBQUEsMkJBU1cvRCxJQVRYLEVBU2lCO0FBQ1QsV0FBS3NILElBQUwsZUFBaUIsS0FBSzNDLEtBQUwsQ0FBV2QsS0FBNUI7QUFDQSxXQUFLMEQsS0FBTCxHQUFhLEtBQUs1QyxLQUFMLENBQVdYLE1BQVgsR0FBb0IsS0FBS1csS0FBTCxDQUFXVixXQUEvQixHQUE2QyxLQUFLVSxLQUFMLENBQVdULFdBQXJFLEVBQ0EsS0FBS0osS0FBTCxHQUFhLEtBQUthLEtBQUwsQ0FBV2IsS0FEeEI7QUFFQSxXQUFLQyxLQUFMLEdBQWEsS0FBS1ksS0FBTCxDQUFXWixLQUF4QjtBQUNBLFdBQUtsRCxLQUFMOztBQUNBLDBFQUFhYixJQUFiO0FBQ0g7QUFoQkw7QUFBQTtBQUFBLGlDQWlCaUIsQ0FBRztBQWpCcEI7O0FBQUE7QUFBQSxFQUE2QkcsMENBQTdCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRk8sSUFBTXFILFdBQWI7QUFDSSx1QkFBWUMsVUFBWixFQUF1QjtBQUFBOztBQUNuQixTQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0g7O0FBSkw7QUFBQTtBQUFBLDJCQUtVO0FBQ0YsVUFBTUMsT0FBTyxHQUFHLEVBQWhCOztBQUNBLFdBQUksSUFBSWhILElBQVIsSUFBZ0IsS0FBSzhHLFVBQXJCLEVBQWdDO0FBQzVCRSxlQUFPLENBQUNDLElBQVIsQ0FBYSxLQUFLQyxTQUFMLENBQWVsSCxJQUFmLEVBQXFCLEtBQUs4RyxVQUFMLENBQWdCOUcsSUFBaEIsQ0FBckIsQ0FBYjtBQUNIOztBQUNELGFBQU9tSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUosT0FBWixDQUFQO0FBQ0g7QUFYTDtBQUFBO0FBQUEsOEJBWWNoSCxJQVpkLEVBWW9CcUgsR0FacEIsRUFZd0I7QUFBQTs7QUFDaEIsYUFBTyxJQUFJRixPQUFKLENBQVksVUFBQ0csT0FBRCxFQUFhO0FBQzVCLFlBQU1DLEtBQUssR0FBRyxJQUFJQyxLQUFKLEVBQWQ7QUFDQSxhQUFJLENBQUNULE1BQUwsQ0FBWS9HLElBQVosSUFBb0J1SCxLQUFwQjs7QUFDQUEsYUFBSyxDQUFDRSxNQUFOLEdBQWU7QUFBQSxpQkFBTUgsT0FBTyxDQUFDdEgsSUFBRCxDQUFiO0FBQUEsU0FBZjs7QUFDQXVILGFBQUssQ0FBQ0YsR0FBTixHQUFZQSxHQUFaO0FBQ0gsT0FMTSxDQUFQO0FBTUg7QUFuQkw7O0FBQUE7QUFBQSxJOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7O0FBRUFLLE1BQU0sQ0FBQ0QsTUFBUCxHQUFnQixZQUFNO0FBQ2xCLE1BQU1FLElBQUksR0FBRyxJQUFJcEQsMENBQUosRUFBYjtBQUNBb0QsTUFBSSxDQUFDdkgsR0FBTDtBQUNILENBSEQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBOztJQUNxQndILEs7QUFDakIsaUJBQVlDLFVBQVosRUFBd0J0QyxPQUF4QixFQUFpQztBQUFBOztBQUM3QixTQUFLc0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLdEMsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS3VDLFlBQUwsR0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQXBCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0IsS0FBS0MsV0FBTCxDQUFpQkYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBeEI7QUFDQSxTQUFLRyxjQUFMLEdBQXNCLEtBQUtDLFNBQUwsQ0FBZUosSUFBZixDQUFvQixJQUFwQixDQUF0QjtBQUNBTixVQUFNLENBQUNoRixnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxLQUFLMkYsV0FBTCxDQUFpQkwsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBckM7QUFDQSxTQUFLTSxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQjtBQUFFOUksT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBbkI7QUFDQSxTQUFLOEksV0FBTCxHQUFtQjtBQUFFL0ksT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBbkI7QUFDQSxTQUFLK0ksT0FBTCxHQUFlLEtBQWY7QUFDSCxHLENBQ0Q7Ozs7O2dDQUNZQyxHLEVBQUs7QUFDYkEsU0FBRyxDQUFDN0UsY0FBSjtBQUNBLFdBQUs0RSxPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUtGLFdBQUwsR0FBbUI7QUFDZjlJLFNBQUMsRUFBRWlKLEdBQUcsQ0FBQ0MsT0FEUTtBQUVmakosU0FBQyxFQUFFZ0osR0FBRyxDQUFDRTtBQUZRLE9BQW5CO0FBSUFsQixZQUFNLENBQUNoRixnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxLQUFLdUYsZ0JBQTFDO0FBQ0FQLFlBQU0sQ0FBQ2hGLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLEtBQUt5RixjQUF4QztBQUNIOzs7Z0NBQ1dVLE8sRUFBUztBQUNqQkEsYUFBTyxDQUFDaEYsY0FBUjtBQUNBLFdBQUs0RSxPQUFMLEdBQWUsSUFBZjs7QUFFQSxVQUFJLENBQUMsS0FBS0gsZUFBVixFQUEyQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUN2QiwrQkFBaUIsS0FBS1QsVUFBdEIsOEhBQWtDO0FBQUEsZ0JBQXpCNUQsSUFBeUI7QUFDOUIsZ0JBQUksQ0FBQ0EsSUFBSSxDQUFDRCxLQUFMLENBQVdsQixTQUFoQixFQUEyQjs7QUFDM0IsZ0JBQUttQixJQUFJLENBQUM5RCxJQUFMLENBQVVWLENBQVYsSUFBZW9KLE9BQU8sQ0FBQ0YsT0FBdkIsSUFBbUMxRSxJQUFJLENBQUM5RCxJQUFMLENBQVVWLENBQVYsR0FBY3dFLElBQUksQ0FBQzlELElBQUwsQ0FBVTVCLEtBQXpCLElBQW1Dc0ssT0FBTyxDQUFDRixPQUE5RSxJQUNDMUUsSUFBSSxDQUFDOUQsSUFBTCxDQUFVVCxDQUFWLElBQWVtSixPQUFPLENBQUNELE9BQXZCLElBQW1DM0UsSUFBSSxDQUFDOUQsSUFBTCxDQUFVVCxDQUFWLEdBQWN1RSxJQUFJLENBQUM5RCxJQUFMLENBQVUzQixNQUF6QixJQUFvQ3FLLE9BQU8sQ0FBQ0QsT0FEbkYsRUFDNkY7QUFDekYsbUJBQUtOLGVBQUwsR0FBdUJyRSxJQUF2QjtBQUNBLG1CQUFLdUUsV0FBTCxHQUFtQjtBQUNmL0ksaUJBQUMsRUFBRSxLQUFLNkksZUFBTCxDQUFxQjdJLENBRFQ7QUFFZkMsaUJBQUMsRUFBRSxLQUFLNEksZUFBTCxDQUFxQjVJO0FBRlQsZUFBbkI7QUFJQTtBQUNIO0FBQ0o7QUFac0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWExQixPQWJELE1BYU87QUFDSCxZQUFNb0osT0FBTyxHQUFHLEtBQUtSLGVBQUwsQ0FBcUI3SSxDQUFyQixHQUF5Qm9DLHVEQUF6QixHQUF3Q2dILE9BQU8sQ0FBQ0YsT0FBaEU7QUFDQSxZQUFNSSxPQUFPLEdBQUcsS0FBS1QsZUFBTCxDQUFxQjVJLENBQXJCLEdBQXlCb0Msd0RBQXpCLEdBQXlDK0csT0FBTyxDQUFDRCxPQUFqRTs7QUFDQSxZQUFLQyxPQUFPLENBQUNGLE9BQVIsSUFBbUJHLE9BQW5CLElBQThCRCxPQUFPLENBQUNGLE9BQVIsSUFBbUJqSCx3REFBYSxHQUFJb0gsT0FBbkUsSUFDQ0QsT0FBTyxDQUFDRCxPQUFSLElBQW1CRyxPQUFuQixJQUE4QkYsT0FBTyxDQUFDRCxPQUFSLElBQW1CakgseURBQWMsR0FBSW9ILE9BRHhFLEVBQ21GO0FBQy9FLGNBQUlDLEtBQUssR0FBRztBQUNSdkosYUFBQyxFQUFFLEtBQUs4SSxXQUFMLENBQWlCOUksQ0FBakIsR0FBcUJvSixPQUFPLENBQUNGLE9BRHhCO0FBRVJqSixhQUFDLEVBQUUsS0FBSzZJLFdBQUwsQ0FBaUI3SSxDQUFqQixHQUFxQm1KLE9BQU8sQ0FBQ0Q7QUFGeEIsV0FBWjtBQUlBLGVBQUtMLFdBQUwsR0FBbUI7QUFDZjlJLGFBQUMsRUFBRW9KLE9BQU8sQ0FBQ0YsT0FESTtBQUVmakosYUFBQyxFQUFFbUosT0FBTyxDQUFDRDtBQUZJLFdBQW5CO0FBSUEsY0FBSUssU0FBUyxHQUFHO0FBQ1p4SixhQUFDLEVBQUUsS0FBSzZJLGVBQUwsQ0FBcUI3SSxDQUFyQixHQUF5QnVKLEtBQUssQ0FBQ3ZKLENBRHRCO0FBRVpDLGFBQUMsRUFBRSxLQUFLNEksZUFBTCxDQUFxQjVJLENBQXJCLEdBQXlCc0osS0FBSyxDQUFDdEo7QUFGdEIsV0FBaEI7QUFJQSxlQUFLNEksZUFBTCxDQUFxQjdJLENBQXJCLEdBQXlCd0osU0FBUyxDQUFDeEosQ0FBbkM7QUFDQSxlQUFLNkksZUFBTCxDQUFxQjVJLENBQXJCLEdBQXlCdUosU0FBUyxDQUFDdkosQ0FBbkM7QUFDSDtBQUVKO0FBQ0o7OztzQ0FDaUI7QUFDZCxXQUFLNEksZUFBTCxDQUFxQnRFLEtBQXJCLENBQTJCbEIsU0FBM0IsR0FBdUMsSUFBdkM7QUFDQSxXQUFLd0YsZUFBTCxDQUFxQjdJLENBQXJCLEdBQXlCLEtBQUsrSSxXQUFMLENBQWlCL0ksQ0FBMUM7QUFDQSxXQUFLNkksZUFBTCxDQUFxQjVJLENBQXJCLEdBQXlCLEtBQUs4SSxXQUFMLENBQWlCOUksQ0FBMUM7QUFFSDs7O2tDQUNhd0osRSxFQUFJQyxFLEVBQUk7QUFDbEIsYUFBTyxFQUFFRCxFQUFFLENBQUN6SixDQUFILEdBQU95SixFQUFFLENBQUMzSyxLQUFWLEdBQWtCNEssRUFBRSxDQUFDMUosQ0FBckIsSUFBMEJ5SixFQUFFLENBQUN4SixDQUFILEdBQU93SixFQUFFLENBQUMxSyxNQUFWLEdBQW1CMkssRUFBRSxDQUFDekosQ0FBaEQsSUFBcUR3SixFQUFFLENBQUN6SixDQUFILEdBQU8wSixFQUFFLENBQUMxSixDQUFILEdBQU8wSixFQUFFLENBQUM1SyxLQUF0RSxJQUErRTJLLEVBQUUsQ0FBQ3hKLENBQUgsR0FBT3lKLEVBQUUsQ0FBQ3pKLENBQUgsR0FBT3lKLEVBQUUsQ0FBQzNLLE1BQWxHLENBQVA7QUFDSDs7OzhCQUNTNEssSyxFQUFPO0FBQ2IsVUFBSSxLQUFLZCxlQUFULEVBQTBCO0FBQ3RCLFlBQUljLEtBQUssQ0FBQ1IsT0FBTixHQUFnQmhILHNEQUFwQixFQUFpQztBQUM3QixlQUFLeUgsZUFBTDtBQUNIOztBQUNELFlBQUlELEtBQUssQ0FBQ1QsT0FBTixHQUFnQmpILHdEQUFoQixJQUFpQzBILEtBQUssQ0FBQ1IsT0FBTixHQUFnQmhILHNEQUFyRCxFQUFrRTtBQUM5RCxlQUFLMEcsZUFBTCxDQUFxQjdJLENBQXJCLEdBQTBCYSxJQUFJLENBQUNDLEtBQUwsQ0FBVzZJLEtBQUssQ0FBQ1QsT0FBTixHQUFnQjlHLHVEQUEzQixDQUFELEdBQTZDQSx1REFBdEU7QUFDQSxlQUFLeUcsZUFBTCxDQUFxQjVJLENBQXJCLEdBQTBCWSxJQUFJLENBQUNDLEtBQUwsQ0FBVzZJLEtBQUssQ0FBQ1IsT0FBTixHQUFnQjlHLHdEQUEzQixDQUFELEdBQThDQSx3REFBdkU7QUFDQSxlQUFLd0csZUFBTCxDQUFxQnRFLEtBQXJCLENBQTJCbEIsU0FBM0IsR0FBdUMsS0FBdkM7QUFIOEQ7QUFBQTtBQUFBOztBQUFBO0FBSTlELGtDQUFpQixLQUFLK0UsVUFBdEIsbUlBQWtDO0FBQUEsa0JBQXpCNUQsSUFBeUI7QUFDOUIsa0JBQUlBLElBQUksSUFBSSxLQUFLcUUsZUFBakIsRUFBa0M7O0FBQ2xDLGtCQUFJLEtBQUtnQixhQUFMLENBQW1CLEtBQUtoQixlQUFMLENBQXFCbkksSUFBeEMsRUFBOEM4RCxJQUFJLENBQUM5RCxJQUFuRCxDQUFKLEVBQThEO0FBQzFELHFCQUFLa0osZUFBTDtBQUNBO0FBQ0g7QUFDSixhQVY2RCxDQVk5RDs7QUFaOEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFhOUQsY0FBSSxDQUFDLEtBQUtmLGVBQUwsQ0FBcUJ0RSxLQUFyQixDQUEyQmxCLFNBQWhDLEVBQTJDLEtBQUt5QyxPQUFMLENBQWFnRSxJQUFiLENBQWtCLEtBQUtqQixlQUFMLENBQXFCdEUsS0FBdkM7QUFDOUM7QUFDSjs7QUFDRCxVQUFJLENBQUMsS0FBS3lFLE9BQVYsRUFBbUI7QUFDZmYsY0FBTSxDQUFDaEYsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBS29GLFlBQXRDO0FBQ0g7O0FBQ0QsV0FBS1EsZUFBTCxHQUF1QixJQUF2QjtBQUNBWixZQUFNLENBQUM4QixtQkFBUCxDQUEyQixXQUEzQixFQUF3QyxLQUFLdkIsZ0JBQTdDO0FBQ0FQLFlBQU0sQ0FBQzhCLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDLEtBQUtyQixjQUEzQztBQUNIOzs7NEJBQ09PLEcsRUFBSztBQUNUQSxTQUFHLENBQUM3RSxjQUFKO0FBRFM7QUFBQTtBQUFBOztBQUFBO0FBRVQsOEJBQWlCLEtBQUtnRSxVQUF0QixtSUFBa0M7QUFBQSxjQUF6QjVELElBQXlCOztBQUM5QixjQUFLQSxJQUFJLENBQUM5RCxJQUFMLENBQVVWLENBQVYsSUFBZWlKLEdBQUcsQ0FBQ0MsT0FBbkIsSUFBK0IxRSxJQUFJLENBQUM5RCxJQUFMLENBQVVWLENBQVYsR0FBY3dFLElBQUksQ0FBQzlELElBQUwsQ0FBVTVCLEtBQXpCLElBQW1DbUssR0FBRyxDQUFDQyxPQUF0RSxJQUNDMUUsSUFBSSxDQUFDOUQsSUFBTCxDQUFVVCxDQUFWLElBQWVnSixHQUFHLENBQUNFLE9BQW5CLElBQStCM0UsSUFBSSxDQUFDOUQsSUFBTCxDQUFVVCxDQUFWLEdBQWN1RSxJQUFJLENBQUM5RCxJQUFMLENBQVUzQixNQUF6QixJQUFvQ2tLLEdBQUcsQ0FBQ0UsT0FEM0UsRUFDcUY7QUFDakY7QUFDQSxpQkFBS3JELE9BQUwsQ0FBYWdFLElBQWIsQ0FBa0J0RixJQUFJLENBQUNELEtBQXZCO0FBQ0E7QUFDSDtBQUNKO0FBVFE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVVDBELFlBQU0sQ0FBQzhCLG1CQUFQLFVBQW9DLEtBQUsxQixZQUF6QztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakhMO0FBRU8sSUFBTTJCLE1BQWI7QUFBQTs7QUFDSSxrQkFBWXZMLFNBQVosRUFBdUI4RixLQUF2QixFQUE4QjtBQUFBOztBQUFBOztBQUMxQixnRkFBTTtBQUFFOUYsZUFBUyxFQUFUQSxTQUFGO0FBQWFFLFdBQUssRUFBRTtBQUFwQixLQUFOO0FBQ0EsVUFBSzRGLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUswRixTQUFMLEdBQWlCLENBQUMsQ0FBbEI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBSjBCO0FBSzdCOztBQU5MO0FBQUE7QUFBQSwyQkFPV3RLLElBUFgsRUFPaUI7QUFDVCxVQUFJLEtBQUsyRSxLQUFMLENBQVdmLFFBQVgsQ0FBb0IsS0FBS2UsS0FBTCxDQUFXaEIsT0FBL0IsYUFBSixFQUF5RDtBQUNyRCxhQUFLNEcsS0FBTDs7QUFDQSxZQUFJLEtBQUtELFVBQVQsRUFBcUI7QUFDakIsZUFBS0QsU0FBTCxHQUFpQnJLLElBQUksR0FBRyxJQUF4QjtBQUNBLGVBQUtzSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0g7QUFDSixPQU5ELE1BTU8sSUFBSSxLQUFLM0YsS0FBTCxDQUFXZixRQUFYLENBQW9CLEtBQUtlLEtBQUwsQ0FBV2hCLE9BQS9CLGdCQUFKLEVBQTREO0FBQy9ELGFBQUs2RyxRQUFMO0FBQ0gsT0FGTSxNQUVBO0FBQ0gsYUFBSzNKLEtBQUw7QUFDSDs7QUFDRCxVQUFJLEtBQUt3SixTQUFMLEdBQWlCLENBQWpCLElBQXVCckssSUFBSSxHQUFHLElBQVIsSUFBa0IsS0FBS3FLLFNBQUwsR0FBaUIsS0FBSzFGLEtBQUwsQ0FBV2pCLFNBQXhFLEVBQW9GO0FBQ2hGLGFBQUsyRyxTQUFMLEdBQWlCLENBQUMsQ0FBbEI7QUFDQSxhQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0csVUFBTCxDQUFnQixLQUFLOUYsS0FBckI7QUFDSDs7QUFDRCx5RUFBYTNFLElBQWI7QUFDSDtBQXpCTDtBQUFBO0FBQUEsaUNBMEJpQixDQUFHO0FBMUJwQjs7QUFBQTtBQUFBLEVBQTRCRywwQ0FBNUIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGTyxJQUFNMEcsS0FBYjtBQUNJLGlCQUFZNkQsSUFBWixFQUFpQjtBQUFBOztBQUNiLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUs5RCxNQUFMLEdBQWMsS0FBSytELFdBQUwsQ0FBaUIzRCxPQUEvQjtBQUNIOztBQUpMO0FBQUE7QUFBQSwyQkFXVTtBQUNGLFdBQUtKLE1BQUwsR0FBYyxLQUFLK0QsV0FBTCxDQUFpQjNELE9BQS9CO0FBQ0g7QUFiTDtBQUFBO0FBQUEsMkJBY1dKLE1BZFgsRUFja0I7QUFDVixXQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSDtBQWhCTDtBQUFBO0FBQUEsMkJBaUJXNUcsSUFqQlgsRUFpQmdCLENBRVg7QUFuQkw7QUFBQTtBQUFBLHdCQUt3QjtBQUFDO0FBQWtCO0FBTDNDO0FBQUE7QUFBQSx3QkFNdUI7QUFBQztBQUFpQjtBQU56QztBQUFBO0FBQUEsd0JBTzJCO0FBQUM7QUFBcUI7QUFQakQ7QUFBQTtBQUFBLHdCQVEwQjtBQUFDO0FBQW9CO0FBUi9DO0FBQUE7QUFBQSx3QkFTeUI7QUFBQztBQUFtQjtBQVQ3QztBQUFBO0FBQUEsd0JBVXlCO0FBQUM7QUFBbUI7QUFWN0M7O0FBQUE7QUFBQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR08sSUFBTXlHLFNBQWI7QUFBQTs7QUFDSSxxQkFBWWlFLElBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFDZCxtRkFBTUEsSUFBTjtBQUNBLFVBQUt6RSxLQUFMLEdBQWEsSUFBSS9ELHlEQUFKLENBQWdCO0FBQ3pCckQsZUFBUyxTQURnQjtBQUV6QnlDLGdCQUFVLEVBQUUsR0FGYTtBQUd6QkUsaUJBQVcsRUFBRTtBQUhZLEtBQWhCLENBQWIsQ0FGYyxDQU9kO0FBQ0E7QUFDQTs7QUFDQSxVQUFLZ0gsVUFBTCxHQUFrQixFQUFsQjs7QUFDQSxVQUFLa0MsSUFBTCxDQUFVeEUsT0FBVixDQUFrQjNDLE1BQWxCLENBQXlCN0MsT0FBekIsQ0FBaUMsVUFBQ2tFLElBQUQsRUFBVTtBQUN2QyxVQUFJQSxJQUFJLENBQUNwQixJQUFMLGdCQUFKLEVBQStCO0FBQzNCLFlBQU1vSCxTQUFTLEdBQUcsSUFBSVIsOENBQUosV0FBY3hGLElBQUksQ0FBQ2pFLElBQW5CLEdBQTJCaUUsSUFBM0IsQ0FBbEI7QUFDQWdHLGlCQUFTLENBQUN4SyxDQUFWLEdBQWN3RSxJQUFJLENBQUN4RSxDQUFuQjtBQUNBd0ssaUJBQVMsQ0FBQ3ZLLENBQVYsR0FBY3VFLElBQUksQ0FBQ3ZFLENBQW5CO0FBQ0F1SyxpQkFBUyxDQUFDSCxVQUFWLEdBQXVCLE1BQUtDLElBQUwsQ0FBVXhFLE9BQVYsQ0FBa0JnRSxJQUFsQixDQUF1QnZCLElBQXZCLENBQTRCLE1BQUsrQixJQUFMLENBQVV4RSxPQUF0QyxDQUF2Qjs7QUFDQSxjQUFLc0MsVUFBTCxDQUFnQlosSUFBaEIsQ0FBcUJnRCxTQUFyQjtBQUNILE9BTkQsTUFNTyxJQUFJaEcsSUFBSSxDQUFDcEIsSUFBTCxhQUFKLEVBQTRCO0FBQy9CLFlBQU1xSCxPQUFPLEdBQUcsSUFBSXhELGlEQUFKLFdBQWV6QyxJQUFJLENBQUNqRSxJQUFwQixHQUE0QmlFLElBQTVCLENBQWhCO0FBQ0FpRyxlQUFPLENBQUN6SyxDQUFSLEdBQVl3RSxJQUFJLENBQUN4RSxDQUFqQjtBQUNBeUssZUFBTyxDQUFDeEssQ0FBUixHQUFZdUUsSUFBSSxDQUFDdkUsQ0FBakI7O0FBQ0EsY0FBS21JLFVBQUwsQ0FBZ0JaLElBQWhCLENBQXFCaUQsT0FBckI7QUFDSDtBQUNKLEtBYkQ7O0FBY0EsVUFBS3JDLFVBQUwsQ0FBZ0JzQyxJQUFoQixDQUFxQixVQUFDQyxJQUFELEVBQU9DLElBQVA7QUFBQSxhQUFnQkQsSUFBSSxDQUFDSixXQUFMLENBQWlCaEssSUFBakIsQ0FBc0JzSyxVQUF0QixDQUFpQyxDQUFqQyxJQUFzQ0QsSUFBSSxDQUFDTCxXQUFMLENBQWlCaEssSUFBakIsQ0FBc0JzSyxVQUF0QixDQUFpQyxDQUFqQyxDQUF0RDtBQUFBLEtBQXJCOztBQUVBLFVBQUtDLEtBQUwsR0FBYSxJQUFJM0MsOENBQUosQ0FBVSxNQUFLQyxVQUFmLEVBQTBCLE1BQUtrQyxJQUFMLENBQVV4RSxPQUFwQyxDQUFiO0FBM0JjO0FBNEJqQjs7QUE3Qkw7QUFBQTtBQUFBLDJCQThCVztBQUNIOztBQUNBLFVBQU1pRixPQUFPLEdBQUd0SixtQkFBTyxDQUFDLG9EQUF4Qjs7QUFDQSxXQUFLdUosR0FBTCxHQUFXLEtBQUtWLElBQUwsQ0FBVXZGLE1BQVYsQ0FBaUJrRyxTQUFqQixXQUFxQ0YsT0FBckMsRUFBOEMsS0FBS2xGLEtBQW5ELENBQVg7QUFDSDtBQWxDTDtBQUFBO0FBQUEsMkJBbUNXakcsSUFuQ1gsRUFtQ2lCO0FBQ1QsV0FBS3dJLFVBQUwsQ0FBZ0I5SCxPQUFoQixDQUF3QixVQUFDa0ssU0FBRCxFQUFlO0FBQ25DQSxpQkFBUyxDQUFDekosTUFBVixDQUFpQm5CLElBQWpCO0FBQ0gsT0FGRDtBQUdIO0FBdkNMO0FBQUE7QUFBQSwyQkF3Q1dBLElBeENYLEVBd0NpQjtBQUFBOztBQUNULFdBQUttQixNQUFMLENBQVluQixJQUFaO0FBQ0EsV0FBSzBLLElBQUwsQ0FBVXZGLE1BQVYsQ0FBaUJtRyxJQUFqQjtBQUNBLFdBQUtaLElBQUwsQ0FBVXZGLE1BQVYsQ0FBaUJvRyxVQUFqQixDQUE0QixLQUFLSCxHQUFqQztBQUNBLFdBQUs1QyxVQUFMLENBQWdCOUgsT0FBaEIsQ0FBd0IsVUFBQzhLLElBQUQsRUFBVTtBQUM5QixZQUFJQSxJQUFJLFlBQVlwQiw4Q0FBcEIsRUFBNEI7QUFDeEIsZ0JBQUksQ0FBQ00sSUFBTCxDQUFVdkYsTUFBVixDQUFpQm9HLFVBQWpCLENBQTRCQyxJQUFJLENBQUMxSyxJQUFqQztBQUNILFNBRkQsTUFFTztBQUNILGdCQUFJLENBQUM0SixJQUFMLENBQVV2RixNQUFWLENBQWlCc0csT0FBakIsQ0FBeUJELElBQXpCO0FBQ0g7QUFDSixPQU5EOztBQU9BLDRFQUFheEwsSUFBYjtBQUNIO0FBcERMOztBQUFBO0FBQUEsRUFBK0I2Ryw0Q0FBL0IsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ08sSUFBTVIsT0FBYjtBQUFBOztBQUNJLG1CQUFZcUUsSUFBWixFQUFpQjtBQUFBOztBQUFBOztBQUNiLGlGQUFNQSxJQUFOO0FBQ0EsVUFBS2dCLFFBQUwsR0FBZ0IsQ0FBaEI7QUFGYTtBQUdoQjs7QUFKTDtBQUFBO0FBQUEsMkJBS1U7QUFDRjs7QUFDQSxXQUFLQSxRQUFMLEdBQWdCLENBQWhCO0FBQ0g7QUFSTDtBQUFBO0FBQUEsMkJBU1cxTCxJQVRYLEVBU2dCO0FBQ1IsVUFBRyxLQUFLMEwsUUFBTCxLQUFrQixDQUFsQixJQUF1QixLQUFLaEIsSUFBTCxDQUFVdkYsTUFBVixDQUFpQndHLGNBQWpCLEtBQW9DLElBQTlELEVBQW1FO0FBQy9ELGFBQUtELFFBQUwsR0FBZTFMLElBQWY7QUFDSDs7QUFDRCxVQUFHLEtBQUswTCxRQUFMLElBQWlCLENBQWpCLElBQXVCMUwsSUFBSSxHQUFHLEtBQUswTCxRQUFiLEdBQXlCLEdBQWxELEVBQXNEO0FBQ2xELGFBQUtFLE1BQUwsQ0FBWS9FLDRDQUFLLENBQUNDLE1BQWxCO0FBQ0g7QUFDSjtBQWhCTDtBQUFBO0FBQUEsMkJBaUJXOUcsSUFqQlgsRUFpQmdCO0FBQ1IsV0FBS21CLE1BQUwsQ0FBWW5CLElBQVo7QUFDQSxXQUFLMEssSUFBTCxDQUFVdkYsTUFBVixDQUFpQm1HLElBQWpCO0FBQ0EsV0FBS1osSUFBTCxDQUFVdkYsTUFBVixDQUFpQjBHLEtBQWpCLENBQXVCLEVBQXZCLEVBQTBCLEVBQTFCOztBQUNBLDBFQUFhN0wsSUFBYjtBQUNIO0FBdEJMOztBQUFBO0FBQUEsRUFBNkI2Ryw0Q0FBN0IsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ08sSUFBTU4sSUFBYjtBQUFBOztBQUNJLGdCQUFZbUUsSUFBWixFQUFpQjtBQUFBOztBQUFBLDZFQUNQQSxJQURPO0FBRWhCOztBQUhMO0FBQUE7QUFBQSwyQkFJVTtBQUNGO0FBQ0g7QUFOTDtBQUFBO0FBQUEsMkJBT1cxSyxJQVBYLEVBT2dCO0FBQ1IsVUFBRyxLQUFLMEssSUFBTCxDQUFVeEUsT0FBVixDQUFrQm5ELElBQXJCLEVBQTBCO0FBQ3RCLGFBQUs2SSxNQUFMLENBQVkvRSw0Q0FBSyxDQUFDRSxVQUFsQjtBQUNIO0FBQ0o7QUFYTDtBQUFBO0FBQUEsMkJBWVcvRyxJQVpYLEVBWWdCO0FBQ1IsV0FBS21CLE1BQUwsQ0FBWW5CLElBQVo7QUFDQSxXQUFLMEssSUFBTCxDQUFVdkYsTUFBVixDQUFpQjJHLFNBQWpCLENBQTJCLENBQTNCLEVBQTZCLENBQTdCO0FBQ0EsV0FBS3BCLElBQUwsQ0FBVXZGLE1BQVYsQ0FBaUIwRyxLQUFqQixDQUF1QixHQUF2QixFQUE0QnpKLHNEQUFXLEdBQUMsQ0FBWixHQUFjLENBQTFDOztBQUNBLHVFQUFhcEMsSUFBYjtBQUNIO0FBakJMOztBQUFBO0FBQUEsRUFBMEI2Ryw0Q0FBMUIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFHTyxJQUFNM0UsV0FBYjtBQUNJLDZCQUFzRjtBQUFBLFFBQXpFckQsU0FBeUUsUUFBekVBLFNBQXlFO0FBQUEsUUFBOUR5QyxVQUE4RCxRQUE5REEsVUFBOEQ7QUFBQSxRQUFsREUsV0FBa0QsUUFBbERBLFdBQWtEO0FBQUEsZ0NBQXJDdUssV0FBcUM7QUFBQSxRQUFyQ0EsV0FBcUMsaUNBQXZCLEVBQXVCO0FBQUEsaUNBQW5CQyxZQUFtQjtBQUFBLFFBQW5CQSxZQUFtQixrQ0FBSixFQUFJOztBQUFBOztBQUNsRixTQUFLbk4sU0FBTCxHQUFnQkEsU0FBaEI7QUFDQSxTQUFLeUMsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUt1SyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0g7O0FBUEw7QUFBQTtBQUFBLGlDQVFpQkMsT0FSakIsRUFRMEJsTixLQVIxQixFQVErRDtBQUFBOztBQUFBLFVBQTlCQyxNQUE4Qix1RUFBckIsSUFBcUI7QUFBQSxVQUFmQyxPQUFlLHVFQUFMLElBQUs7QUFDdkQsYUFBTyxJQUFJTCxvREFBSixDQUFjO0FBQ2pCQyxpQkFBUyxFQUFFLEtBQUtBLFNBREM7QUFFakJDLGNBQU0sRUFBRW1OLE9BQU8sQ0FBQ2IsR0FBUixDQUFZLFVBQUN2TCxLQUFEO0FBQUEsaUJBQVk7QUFBQ1IsY0FBRSxFQUFFLEtBQUksQ0FBQzZNLFVBQUwsQ0FBZ0JyTSxLQUFoQixDQUFMO0FBQTZCTixjQUFFLEVBQUUsS0FBSSxDQUFDNE0sVUFBTCxDQUFnQnRNLEtBQWhCO0FBQWpDLFdBQVo7QUFBQSxTQUFaLENBRlM7QUFHakJkLGFBQUssRUFBRUEsS0FIVTtBQUlqQkMsY0FBTSxFQUFFQSxNQUpTO0FBS2pCQyxlQUFPLEVBQUVBLE9BTFE7QUFNakJDLGFBQUssRUFBRSxLQUFLNk0sV0FOSztBQU9qQjVNLGNBQU0sRUFBRSxLQUFLNk07QUFQSSxPQUFkLENBQVA7QUFTSDtBQWxCTDtBQUFBO0FBQUEsOEJBbUJjbk0sS0FuQmQsRUFtQm9CO0FBQ1osYUFBTyxJQUFJSyw4Q0FBSixDQUFXO0FBQ2RyQixpQkFBUyxFQUFFLEtBQUtBLFNBREY7QUFFZE8sZUFBTyxFQUFFLEtBQUs4TSxVQUFMLENBQWdCck0sS0FBaEIsQ0FGSztBQUdkUCxlQUFPLEVBQUMsS0FBSzZNLFVBQUwsQ0FBZ0J0TSxLQUFoQixDQUhNO0FBSWRYLGFBQUssRUFBRSxLQUFLNk0sV0FKRTtBQUtkNU0sY0FBTSxFQUFFLEtBQUs2TTtBQUxDLE9BQVgsQ0FBUDtBQU9IO0FBM0JMO0FBQUE7QUFBQSwrQkE0QmVuTSxLQTVCZixFQTRCcUI7QUFDYixhQUFRLEVBQUVBLEtBQUYsR0FBUyxLQUFLa00sV0FBZixHQUE4QixLQUFLekssVUFBMUM7QUFDSDtBQTlCTDtBQUFBO0FBQUEsK0JBK0JlekIsS0EvQmYsRUErQnFCO0FBQ2IsYUFBT29CLElBQUksQ0FBQ0MsS0FBTCxDQUFZLEVBQUVyQixLQUFGLEdBQVUsS0FBS2tNLFdBQWhCLEdBQStCLEtBQUt6SyxVQUEvQyxJQUEyRCxLQUFLMEssWUFBdkU7QUFDSDtBQWpDTDs7QUFBQTtBQUFBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSk8sSUFBTTlMLE1BQWI7QUFDSSx3QkFBbUU7QUFBQSxRQUF0RHJCLFNBQXNELFFBQXREQSxTQUFzRDtBQUFBLFFBQTNDTyxPQUEyQyxRQUEzQ0EsT0FBMkM7QUFBQSxRQUFsQ0UsT0FBa0MsUUFBbENBLE9BQWtDO0FBQUEsMEJBQXpCSixLQUF5QjtBQUFBLFFBQXpCQSxLQUF5QiwyQkFBakIsRUFBaUI7QUFBQSwyQkFBYkMsTUFBYTtBQUFBLFFBQWJBLE1BQWEsNEJBQUosRUFBSTs7QUFBQTs7QUFDL0QsU0FBS04sU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLTyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLRSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLSixLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLaUIsQ0FBTCxHQUFTLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVMsQ0FBVDtBQUNIOztBQVRMO0FBQUE7QUFBQSwwQkFVVUQsQ0FWVixFQVVZQyxDQVZaLEVBVWM7QUFDTixXQUFLRCxDQUFMLEdBQVFBLENBQVI7QUFDQSxXQUFLQyxDQUFMLEdBQVFBLENBQVI7QUFDSDtBQWJMOztBQUFBO0FBQUEsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVPLElBQU0rRSxNQUFiO0FBQ0ksa0JBQVlsRyxLQUFaLEVBQW1CQyxNQUFuQixFQUEwQjtBQUFBOztBQUN0QixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLaU4sTUFBTCxHQUFjLEtBQUtDLFlBQUwsQ0FBa0JuTixLQUFsQixFQUF5QkMsTUFBekIsQ0FBZDtBQUNBLFNBQUttTixPQUFMLEdBQWUsS0FBS0YsTUFBTCxDQUFZRyxVQUFaLE1BQWY7QUFDQSxTQUFLN0UsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLaUUsY0FBTCxHQUFzQixLQUF0QjtBQUNIOztBQVJMO0FBQUE7QUFBQSwrQkFTZWxFLFVBVGYsRUFTMEI7QUFBQTs7QUFDbEIsVUFBTStFLE1BQU0sR0FBRyxJQUFJaEYseURBQUosQ0FBZ0JDLFVBQWhCLENBQWY7QUFDQStFLFlBQU0sQ0FBQ0MsSUFBUCxHQUFjQyxJQUFkLENBQW1CLFVBQUNDLEtBQUQsRUFBVztBQUMxQixhQUFJLENBQUNqRixNQUFMLEdBQWNrRixNQUFNLENBQUNDLE1BQVAsQ0FBYyxLQUFJLENBQUNuRixNQUFuQixFQUEyQjhFLE1BQU0sQ0FBQzlFLE1BQWxDLENBQWQ7QUFDQSxhQUFJLENBQUNpRSxjQUFMLEdBQXNCLElBQXRCO0FBQ0gsT0FIRDtBQUlIO0FBZkw7QUFBQTtBQUFBLGlDQWdCaUJ6TSxLQWhCakIsRUFnQndCQyxNQWhCeEIsRUFnQitCO0FBQ3ZCLFVBQU0yTixRQUFRLEdBQUcxSixRQUFRLENBQUMySixhQUFULFVBQWpCO0FBQ0EsVUFBTVgsTUFBTSxHQUFHVSxRQUFRLElBQUkxSixRQUFRLENBQUM0SixhQUFULFVBQTNCO0FBQ0E1SixjQUFRLENBQUM2SixJQUFULENBQWNDLE1BQWQsQ0FBcUJkLE1BQXJCO0FBQ0FBLFlBQU0sQ0FBQ2xOLEtBQVAsR0FBZUEsS0FBZjtBQUNBa04sWUFBTSxDQUFDak4sTUFBUCxHQUFnQkEsTUFBaEI7QUFDQSxhQUFPaU4sTUFBUDtBQUNIO0FBdkJMO0FBQUE7QUFBQSw4QkF3QmN6TCxJQXhCZCxFQXdCcUJ3SyxPQXhCckIsRUF3QjhCZ0MsT0F4QjlCLEVBd0JzQztBQUFBOztBQUM5QixVQUFNQyxRQUFRLEdBQUdoSyxRQUFRLENBQUM0SixhQUFULFVBQWpCO0FBQ0FJLGNBQVEsQ0FBQ2xPLEtBQVQsR0FBaUJpTSxPQUFPLENBQUNqTSxLQUFSLEdBQWdCaU0sT0FBTyxDQUFDa0MsU0FBekM7QUFDQUQsY0FBUSxDQUFDak8sTUFBVCxHQUFrQmdNLE9BQU8sQ0FBQ2hNLE1BQVIsR0FBaUJnTSxPQUFPLENBQUNtQyxVQUEzQztBQUNBLFVBQU1DLFVBQVUsR0FBR0gsUUFBUSxDQUFDYixVQUFULE1BQW5CO0FBQ0EsVUFBTWlCLFFBQVEsR0FBRyxFQUFqQjtBQUNBLFVBQUlDLEdBQUosRUFBVUMsR0FBVjtBQUNBdkMsYUFBTyxDQUFDckosTUFBUixDQUFlcEIsT0FBZixDQUF1QixVQUFDcUIsS0FBRCxFQUFXO0FBQzlCLFlBQUdBLEtBQUssQ0FBQ3lCLElBQU4sZ0JBQUgsRUFBOEI7QUFDMUJpSyxhQUFHLEdBQUcsQ0FBTjtBQUNBQyxhQUFHLEdBQUcsQ0FBTjtBQUNBM0wsZUFBSyxDQUFDSCxJQUFOLENBQVdsQixPQUFYLENBQW1CLFVBQUNiLEtBQUQsRUFBVztBQUMxQixnQkFBR0EsS0FBSyxHQUFDLENBQVQsRUFBVztBQUNQME4sd0JBQVUsQ0FBQ3pCLFNBQVgsQ0FBcUIsTUFBSSxDQUFDcEUsTUFBTCxDQUFZeUYsT0FBTyxDQUFDdE8sU0FBcEIsQ0FBckIsRUFDSXNPLE9BQU8sQ0FBQ2pCLFVBQVIsQ0FBbUJyTSxLQUFuQixDQURKLEVBQytCc04sT0FBTyxDQUFDaEIsVUFBUixDQUFtQnRNLEtBQW5CLENBRC9CLEVBRUlzTCxPQUFPLENBQUNrQyxTQUZaLEVBRXVCbEMsT0FBTyxDQUFDbUMsVUFGL0IsRUFHSUksR0FBRyxHQUFHdkMsT0FBTyxDQUFDa0MsU0FIbEIsRUFHNkJJLEdBQUcsR0FBR3RDLE9BQU8sQ0FBQ21DLFVBSDNDLEVBSUluQyxPQUFPLENBQUNrQyxTQUpaLEVBSXVCbEMsT0FBTyxDQUFDbUMsVUFKL0I7QUFNSDs7QUFDREksZUFBRzs7QUFDSCxnQkFBR0EsR0FBRyxHQUFJdkMsT0FBTyxDQUFDak0sS0FBUixHQUFnQixDQUExQixFQUE4QjtBQUMxQndPLGlCQUFHLEdBQUcsQ0FBTjtBQUNBRCxpQkFBRztBQUNOO0FBQ0osV0FkRDtBQWVIOztBQUNELFlBQUcxTCxLQUFLLENBQUN5QixJQUFOLGtCQUFILEVBQWdDO0FBQzVCZ0ssa0JBQVEsQ0FBQzVGLElBQVQsT0FBQTRGLFFBQVEscUJBQVN6TCxLQUFLLENBQUM0TCxPQUFOLENBQWN2QyxHQUFkLENBQWtCLFVBQUN3QyxHQUFEO0FBQUEsbUJBQVU7QUFBQ0MsZ0JBQUUsRUFBRUQsR0FBRyxDQUFDeE4sQ0FBVDtBQUFZME4sZ0JBQUUsRUFBRUYsR0FBRyxDQUFDeE4sQ0FBSixHQUFRd04sR0FBRyxDQUFDMU8sS0FBNUI7QUFBbUM2TyxnQkFBRSxFQUFFSCxHQUFHLENBQUN2TixDQUEzQztBQUE4QzJOLGdCQUFFLEVBQUVKLEdBQUcsQ0FBQ3ZOLENBQUosR0FBUXVOLEdBQUcsQ0FBQ3pPO0FBQTlELGFBQVY7QUFBQSxXQUFsQixDQUFULEVBQVI7QUFDSDtBQUNKLE9BdkJEO0FBd0JBLFdBQUt1SSxNQUFMLENBQVkvRyxJQUFaLElBQW9CeU0sUUFBcEI7QUFDQSxhQUFPLElBQUlhLGlEQUFKLENBQVk7QUFDZnBQLGlCQUFTLEVBQUU4QixJQURJO0FBRWZ2QixlQUFPLEVBQUUsQ0FGTTtBQUdmRSxlQUFPLEVBQUUsQ0FITTtBQUlmSixhQUFLLEVBQUVrTyxRQUFRLENBQUNsTyxLQUpEO0FBS2ZDLGNBQU0sRUFBRWlPLFFBQVEsQ0FBQ2pPLE1BTEY7QUFNZnFPLGdCQUFRLEVBQVJBO0FBTmUsT0FBWixDQUFQO0FBUUg7QUFoRUw7QUFBQTtBQUFBLHlCQWlFU2pHLEtBakVULEVBaUVlO0FBQ1AsV0FBSytFLE9BQUwsQ0FBYTRCLFNBQWIsR0FBeUIzRyxLQUF6QjtBQUNBLFdBQUsrRSxPQUFMLENBQWE2QixRQUFiLENBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLEtBQUtqUCxLQUEvQixFQUFxQyxLQUFLQyxNQUExQztBQUNIO0FBcEVMO0FBQUE7QUFBQSwwQkFxRVVpQixDQXJFVixFQXFFYUMsQ0FyRWIsRUFxRWdCa0gsS0FyRWhCLEVBcUV1QjZHLElBckV2QixFQXFFNkI5RyxJQXJFN0IsRUFxRWtDO0FBQzFCLFdBQUtnRixPQUFMLENBQWE0QixTQUFiLEdBQXlCM0csS0FBekI7QUFDQSxXQUFLK0UsT0FBTCxDQUFhOEIsSUFBYixrQkFBNEJBLElBQTVCO0FBQ0EsV0FBSzlCLE9BQUwsQ0FBYStCLFFBQWIsQ0FBc0IvRyxJQUF0QixFQUE0QmxILENBQTVCLEVBQStCQyxDQUEvQjtBQUNIO0FBekVMO0FBQUE7QUFBQSw4QkEwRWNELENBMUVkLEVBMEVnQkMsQ0ExRWhCLEVBMEVtQnhCLFNBMUVuQixFQTBFNkI7QUFDckIsV0FBS3lOLE9BQUwsQ0FBYVIsU0FBYixDQUF1QixLQUFLcEUsTUFBTCxDQUFZN0ksU0FBWixDQUF2QixFQUE4Q3VCLENBQTlDLEVBQWdEQyxDQUFoRDtBQUNIO0FBNUVMO0FBQUE7QUFBQSwrQkE2RWVpTyxNQTdFZixFQTZFc0I7QUFDZCxXQUFLaEMsT0FBTCxDQUFhUixTQUFiLENBQXVCLEtBQUtwRSxNQUFMLENBQVk0RyxNQUFNLENBQUN6UCxTQUFuQixDQUF2QixFQUNJeVAsTUFBTSxDQUFDbFAsT0FEWCxFQUNvQmtQLE1BQU0sQ0FBQ2hQLE9BRDNCLEVBQ29DZ1AsTUFBTSxDQUFDcFAsS0FEM0MsRUFDa0RvUCxNQUFNLENBQUNuUCxNQUR6RCxFQUVJbVAsTUFBTSxDQUFDbE8sQ0FGWCxFQUVja08sTUFBTSxDQUFDak8sQ0FGckIsRUFFd0JpTyxNQUFNLENBQUNwUCxLQUYvQixFQUVzQ29QLE1BQU0sQ0FBQ25QLE1BRjdDO0FBR0g7QUFqRkw7QUFBQTtBQUFBLDRCQWtGWW9QLEdBbEZaLEVBa0ZnQjtBQUNSLFdBQUtqQyxPQUFMLENBQWFSLFNBQWIsQ0FBdUIsS0FBS3BFLE1BQUwsQ0FBWTZHLEdBQUcsQ0FBQ3pOLElBQUosQ0FBU2pDLFNBQXJCLENBQXZCLEVBQ0kwUCxHQUFHLENBQUN6TixJQUFKLENBQVMxQixPQURiLEVBQ3NCbVAsR0FBRyxDQUFDek4sSUFBSixDQUFTeEIsT0FEL0IsRUFDd0NpUCxHQUFHLENBQUN6TixJQUFKLENBQVM1QixLQURqRCxFQUN3RHFQLEdBQUcsQ0FBQ3pOLElBQUosQ0FBUzNCLE1BRGpFLEVBRUlvUCxHQUFHLENBQUN6TixJQUFKLENBQVNWLENBRmIsRUFFZ0JtTyxHQUFHLENBQUN6TixJQUFKLENBQVNULENBRnpCLEVBRTRCa08sR0FBRyxDQUFDek4sSUFBSixDQUFTNUIsS0FGckMsRUFFNENxUCxHQUFHLENBQUN6TixJQUFKLENBQVMzQixNQUZyRDtBQUdBLFdBQUttTixPQUFMLENBQWE0QixTQUFiLEdBQXlCSyxHQUFHLENBQUNoSCxLQUE3QjtBQUNBLFdBQUsrRSxPQUFMLENBQWE4QixJQUFiO0FBQ0EsV0FBSzlCLE9BQUwsQ0FBYStCLFFBQWIsQ0FBc0JFLEdBQUcsQ0FBQ2pILElBQTFCLEVBQWdDaUgsR0FBRyxDQUFDekssS0FBcEMsRUFBMkN5SyxHQUFHLENBQUN4SyxLQUEvQztBQUNIO0FBekZMOztBQUFBO0FBQUEsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUVPLElBQU1rSyxPQUFiO0FBQUE7O0FBQ0ksbUJBQVlPLEtBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFDZCxpRkFBTUEsS0FBTjtBQUNBLFVBQUtoQixRQUFMLEdBQWdCZ0IsS0FBSyxDQUFDaEIsUUFBTixJQUFrQixFQUFsQztBQUZjO0FBR2pCOztBQUpMO0FBQUEsRUFBNkJ0Tiw4Q0FBN0IsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGTyxJQUFNdU8sTUFBYjtBQUNJLGtCQUFZQyxTQUFaLEVBQXVCM1AsS0FBdkIsRUFBOEI7QUFBQTs7QUFDMUIsU0FBSzRQLFlBQUwsQ0FBa0JELFNBQWxCLEVBQTZCM1AsS0FBN0I7QUFDSDs7QUFITDtBQUFBO0FBQUEsaUNBSWlCMlAsU0FKakIsRUFJNEIzUCxLQUo1QixFQUltQztBQUMzQixXQUFLMlAsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxXQUFLM1AsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsV0FBS3FCLENBQUwsR0FBUyxDQUFUO0FBQ0EsV0FBS0MsQ0FBTCxHQUFTLENBQVQ7O0FBQ0EsY0FBUXFPLFNBQVI7QUFDSTtBQUNJLGVBQUtyTyxDQUFMLEdBQVMsQ0FBQ3RCLEtBQVY7QUFDQTs7QUFDSjtBQUNJLGVBQUtzQixDQUFMLEdBQVN0QixLQUFUO0FBQ0E7O0FBQ0o7QUFDSSxlQUFLcUIsQ0FBTCxHQUFTckIsS0FBVDtBQUNBOztBQUNKO0FBQ0ksZUFBS3FCLENBQUwsR0FBUyxDQUFDckIsS0FBVjtBQUNBO0FBWlI7QUFjSDtBQXZCTDs7QUFBQTtBQUFBLEkiLCJmaWxlIjoianMvZmFybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwidmFyIGluZGV4T2YgPSBmdW5jdGlvbiAoeHMsIGl0ZW0pIHtcbiAgICBpZiAoeHMuaW5kZXhPZikgcmV0dXJuIHhzLmluZGV4T2YoaXRlbSk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh4c1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG52YXIgT2JqZWN0X2tleXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKSByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHJlcy5wdXNoKGtleSlcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaCA9IGZ1bmN0aW9uICh4cywgZm4pIHtcbiAgICBpZiAoeHMuZm9yRWFjaCkgcmV0dXJuIHhzLmZvckVhY2goZm4pXG4gICAgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZuKHhzW2ldLCBpLCB4cyk7XG4gICAgfVxufTtcblxudmFyIGRlZmluZVByb3AgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnXycsIHt9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH07XG4gICAgfVxufSgpKTtcblxudmFyIGdsb2JhbHMgPSBbJ0FycmF5JywgJ0Jvb2xlYW4nLCAnRGF0ZScsICdFcnJvcicsICdFdmFsRXJyb3InLCAnRnVuY3Rpb24nLFxuJ0luZmluaXR5JywgJ0pTT04nLCAnTWF0aCcsICdOYU4nLCAnTnVtYmVyJywgJ09iamVjdCcsICdSYW5nZUVycm9yJyxcbidSZWZlcmVuY2VFcnJvcicsICdSZWdFeHAnLCAnU3RyaW5nJywgJ1N5bnRheEVycm9yJywgJ1R5cGVFcnJvcicsICdVUklFcnJvcicsXG4nZGVjb2RlVVJJJywgJ2RlY29kZVVSSUNvbXBvbmVudCcsICdlbmNvZGVVUkknLCAnZW5jb2RlVVJJQ29tcG9uZW50JywgJ2VzY2FwZScsXG4nZXZhbCcsICdpc0Zpbml0ZScsICdpc05hTicsICdwYXJzZUZsb2F0JywgJ3BhcnNlSW50JywgJ3VuZGVmaW5lZCcsICd1bmVzY2FwZSddO1xuXG5mdW5jdGlvbiBDb250ZXh0KCkge31cbkNvbnRleHQucHJvdG90eXBlID0ge307XG5cbnZhciBTY3JpcHQgPSBleHBvcnRzLlNjcmlwdCA9IGZ1bmN0aW9uIE5vZGVTY3JpcHQgKGNvZGUpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2NyaXB0KSkgcmV0dXJuIG5ldyBTY3JpcHQoY29kZSk7XG4gICAgdGhpcy5jb2RlID0gY29kZTtcbn07XG5cblNjcmlwdC5wcm90b3R5cGUucnVuSW5Db250ZXh0ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgQ29udGV4dCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5lZWRzIGEgJ2NvbnRleHQnIGFyZ3VtZW50LlwiKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmICghaWZyYW1lLnN0eWxlKSBpZnJhbWUuc3R5bGUgPSB7fTtcbiAgICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgXG4gICAgdmFyIHdpbiA9IGlmcmFtZS5jb250ZW50V2luZG93O1xuICAgIHZhciB3RXZhbCA9IHdpbi5ldmFsLCB3RXhlY1NjcmlwdCA9IHdpbi5leGVjU2NyaXB0O1xuXG4gICAgaWYgKCF3RXZhbCAmJiB3RXhlY1NjcmlwdCkge1xuICAgICAgICAvLyB3aW4uZXZhbCgpIG1hZ2ljYWxseSBhcHBlYXJzIHdoZW4gdGhpcyBpcyBjYWxsZWQgaW4gSUU6XG4gICAgICAgIHdFeGVjU2NyaXB0LmNhbGwod2luLCAnbnVsbCcpO1xuICAgICAgICB3RXZhbCA9IHdpbi5ldmFsO1xuICAgIH1cbiAgICBcbiAgICBmb3JFYWNoKE9iamVjdF9rZXlzKGNvbnRleHQpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHdpbltrZXldID0gY29udGV4dFtrZXldO1xuICAgIH0pO1xuICAgIGZvckVhY2goZ2xvYmFscywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoY29udGV4dFtrZXldKSB7XG4gICAgICAgICAgICB3aW5ba2V5XSA9IGNvbnRleHRba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHZhciB3aW5LZXlzID0gT2JqZWN0X2tleXMod2luKTtcblxuICAgIHZhciByZXMgPSB3RXZhbC5jYWxsKHdpbiwgdGhpcy5jb2RlKTtcbiAgICBcbiAgICBmb3JFYWNoKE9iamVjdF9rZXlzKHdpbiksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgLy8gQXZvaWQgY29weWluZyBjaXJjdWxhciBvYmplY3RzIGxpa2UgYHRvcGAgYW5kIGB3aW5kb3dgIGJ5IG9ubHlcbiAgICAgICAgLy8gdXBkYXRpbmcgZXhpc3RpbmcgY29udGV4dCBwcm9wZXJ0aWVzIG9yIG5ldyBwcm9wZXJ0aWVzIGluIHRoZSBgd2luYFxuICAgICAgICAvLyB0aGF0IHdhcyBvbmx5IGludHJvZHVjZWQgYWZ0ZXIgdGhlIGV2YWwuXG4gICAgICAgIGlmIChrZXkgaW4gY29udGV4dCB8fCBpbmRleE9mKHdpbktleXMsIGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICBjb250ZXh0W2tleV0gPSB3aW5ba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9yRWFjaChnbG9iYWxzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghKGtleSBpbiBjb250ZXh0KSkge1xuICAgICAgICAgICAgZGVmaW5lUHJvcChjb250ZXh0LCBrZXksIHdpbltrZXldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICBcbiAgICByZXR1cm4gcmVzO1xufTtcblxuU2NyaXB0LnByb3RvdHlwZS5ydW5JblRoaXNDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBldmFsKHRoaXMuY29kZSk7IC8vIG1heWJlLi4uXG59O1xuXG5TY3JpcHQucHJvdG90eXBlLnJ1bkluTmV3Q29udGV4dCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgdmFyIGN0eCA9IFNjcmlwdC5jcmVhdGVDb250ZXh0KGNvbnRleHQpO1xuICAgIHZhciByZXMgPSB0aGlzLnJ1bkluQ29udGV4dChjdHgpO1xuXG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgZm9yRWFjaChPYmplY3Rfa2V5cyhjdHgpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBjb250ZXh0W2tleV0gPSBjdHhba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmZvckVhY2goT2JqZWN0X2tleXMoU2NyaXB0LnByb3RvdHlwZSksIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgZXhwb3J0c1tuYW1lXSA9IFNjcmlwdFtuYW1lXSA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgIHZhciBzID0gU2NyaXB0KGNvZGUpO1xuICAgICAgICByZXR1cm4gc1tuYW1lXS5hcHBseShzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIH07XG59KTtcblxuZXhwb3J0cy5pc0NvbnRleHQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHJldHVybiBjb250ZXh0IGluc3RhbmNlb2YgQ29udGV4dDtcbn07XG5cbmV4cG9ydHMuY3JlYXRlU2NyaXB0ID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5TY3JpcHQoY29kZSk7XG59O1xuXG5leHBvcnRzLmNyZWF0ZUNvbnRleHQgPSBTY3JpcHQuY3JlYXRlQ29udGV4dCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgdmFyIGNvcHkgPSBuZXcgQ29udGV4dCgpO1xuICAgIGlmKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3JFYWNoKE9iamVjdF9rZXlzKGNvbnRleHQpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBjb3B5W2tleV0gPSBjb250ZXh0W2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29weTtcbn07XG4iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tICcuL3Nwcml0ZSc7XHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb24gZXh0ZW5kcyBTcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aW1hZ2VOYW1lLCBmcmFtZXMsIHNwZWVkLCByZXBlYXQgPSB0cnVlLCBhdXRvcnVuID0gdHJ1ZSwgd2lkdGggPSA2NCwgaGVpZ2h0ID0gNjR9KXtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgaW1hZ2VOYW1lOiBpbWFnZU5hbWUsXHJcbiAgICAgICAgc291cmNlWDogZnJhbWVzWzBdLnN4LFxyXG4gICAgICAgIHNvdXJjZVk6IGZyYW1lc1swXS5zeSxcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gYXV0b3J1bjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbEZyYW1lcyA9IHRoaXMuZnJhbWVzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHNldEZyYW1lKGluZGV4KXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuc291cmNlWCA9IHRoaXMuZnJhbWVzW2luZGV4XS5zeDtcclxuICAgICAgICB0aGlzLnNvdXJjZVkgPSB0aGlzLmZyYW1lc1tpbmRleF0uc3k7XHJcbiAgICB9XHJcbiAgICBydW4oKXtcclxuICAgICAgICBpZighdGhpcy5ydW5uaW5nKXtcclxuICAgICAgICB0aGlzLnNldEZyYW1lKDApO1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbmV4dEZyYW1lKCl7XHJcbiAgICAgICAgaWYoKHRoaXMuY3VycmVudEZyYW1lICsxKT09PSB0aGlzLnRvdGFsRnJhbWVzKXtcclxuICAgICAgICAgICAgaWYodGhpcy5yZXBlYXQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGcmFtZSgwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEZyYW1lKHRoaXMuY3VycmVudEZyYW1lICsxKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lKXtcclxuICAgICAgICBpZighdGhpcy5ydW5uaW5nKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxhc3RUaW1lID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoKHRpbWUtdGhpcy5sYXN0VGltZSk+dGhpcy5zcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEZyYW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xyXG5pbXBvcnQge0NoYXJhY3RlclNoZWV0fSBmcm9tICcuL2NoYXJhY3Rlci1zaGVldCc7XHJcbmV4cG9ydCBjbGFzcyBCb2R5e1xyXG4gICAgY29uc3RydWN0b3Ioe2ltYWdlTmFtZSwgc3BlZWR9KXtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHt9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbnNTaGVldCA9IG5ldyBDaGFyYWN0ZXJTaGVldCh7aW1hZ2VOYW1lfSk7XHJcbiAgICAgICAgYHNwZWxsX29uX2NhZ2Usc3BlbGxfZ2l2ZXNfcHJvZHVjdCxzdGFuZCxiaXJ0aCxhY3Rpb24sZWF0YC5zcGxpdChgLGApLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zW25hbWVdID0gYW5pbWF0aW9uc1NoZWV0LmdldEFuaW1hdGlvbihuYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0YW5kKCk7XHJcbiAgICB9XHJcbiAgICBzdGFuZCgpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy52aWV3ID0gdGhpcy5hbmltYXRpb25zW2BzdGFuZGBdO1xyXG4gICAgICAgIHRoaXMudmlldy5zdG9wKCk7XHJcbiAgICB9XHJcbiAgICBiaXJ0aCgpe1xyXG4gICAgICAgIHRoaXMudmlldyA9IHRoaXMuYW5pbWF0aW9uc1tgYmlydGhgXTtcclxuICAgICAgICB0aGlzLnZpZXcucnVuKCk7XHJcbiAgICB9XHJcbiAgICBhY3Rpb25Pbigpe1xyXG4gICAgICAgIHRoaXMudmlldyA9IHRoaXMuYW5pbWF0aW9uc1tgYWN0aW9uYF07XHJcbiAgICAgICAgdGhpcy52aWV3LnN0b3AoKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lKXtcclxuICAgICAgICBpZih0aGlzLmxhc3RUaW1lID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy52aWV3LnNldFhZKE1hdGgudHJ1bmModGhpcy54KSxNYXRoLnRydW5jKHRoaXMueSkpO1xyXG4gICAgICAgIHRoaXMudmlldy51cGRhdGUodGltZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGVTaGVldCB9IGZyb20gXCIuL3Nwcml0ZS1zaGVldFwiO1xyXG5pbXBvcnQge1dJRFRIX0FOSU1BVElPTiwgSEVJR0hUX0FOTUFUSU9OfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmNvbnN0IFdJRFRIX09MRCA9IDgzMjtcclxuY29uc3QgSEVJR0hUX09MRCA9IDEzNDQ7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJhY3RlclNoZWV0IGV4dGVuZHMgU3ByaXRlU2hlZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aW1hZ2VOYW1lfSl7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWUsXHJcbiAgICAgICAgICAgIGltYWdlV2lkdGg6IFdJRFRIX0FOSU1BVElPTixcclxuICAgICAgICAgICAgaW1hZ2VIZWlnaHQ6IEhFSUdIVF9BTk1BVElPTlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VxdWVuY2VzID0gdGhpcy5nZXRTZXF1ZW5jZXMoKTtcclxuICAgIH1cclxuICAgIGdldFNlcXVlbmNlcygpe1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXF1aXJlKGAuL21hcHMvYW5pbWF0aW9ucy5qc29uYCk7XHJcbiAgICAgICAgY29uc3Qgc2VxdWVuY2VzICA9IHt9O1xyXG4gICAgICAgIGRhdGEubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHNlcXVlbmNlc1tsYXllci5uYW1lXSA9IGxheWVyLmRhdGEuZmlsdGVyKChpKSA9PiBpPjApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzZXF1ZW5jZXM7XHJcbiAgICB9O1xyXG4gICAgZ2V0QW5pbWF0aW9uKG5hbWUsIHNwZWVkID0gMTAwLCByZXBlYXQgPSB0cnVlLCBhdXRvcnVuID0gdHJ1ZSl7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldEFuaW1hdGlvbih0aGlzLnNlcXVlbmNlc1tuYW1lXSxzcGVlZCwgcmVwZWF0LCBhdXRvcnVuKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCBHQU1FX1dJRFRIID0gNjQwO1xyXG5leHBvcnQgY29uc3QgR0FNRV9IRUlHVEg9IDY0MDtcclxuZXhwb3J0IGNvbnN0IFdPUktJTkdfV0lEVEggPSBHQU1FX1dJRFRIIC0gMTI4O1xyXG5leHBvcnQgY29uc3QgV09SS0lOR19IRUlHVEggPSBHQU1FX0hFSUdUSDtcclxuZXhwb3J0IGNvbnN0IE1FTlVfSEVJR1RIID0gR0FNRV9IRUlHVEgtMTI4O1xyXG5leHBvcnQgY29uc3QgU1BSSVRFX1dJRFRIID0gNjQ7XHJcbmV4cG9ydCBjb25zdCBTUFJJVEVfSEVJR1RIID0gNjQ7XHJcbmV4cG9ydCBjb25zdCBXSURUSF9BTklNQVRJT04gPSA3MDQ7XHJcbmV4cG9ydCBjb25zdCBIRUlHSFRfQU5NQVRJT04gPSAzODQ7XHJcbiIsImV4cG9ydCBjbGFzcyBDb250cm9sU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy51cCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZpcmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFtb3VudENoYXJhY3RlcnMgPSBuZXcgTWFwKFtcclxuICAgICAgICAgICAgW2B3aGVhdGAsIGBhbW91bnRXaGVhdGBdLCBbYGNvd2AsIGBhbW91bnRDb3dzYF0sIFtgY2hpY2tlbmAsIGBhbW91bnRDaGlja2Vuc2BdXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJzSHVkID0gbmV3IE1hcChbXHJcbiAgICAgICAgICAgIFtgd2hlYXRgLCBgYW1vdW50RmVlZGBdLCBbYGNvd2AsIGBhbW91bnRNaWxrYF0sIFtgY2hpY2tlbmAsIGBhbW91bnRFZ2dzYF1cclxuICAgICAgICBdKTtcclxuICAgICAgICB0aGlzLmtleU1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICAgICAgICBbMzcsIGBsZWZ0YF0sIFszOSwgYHJpZ2h0YF0sIFszOCwgYHVwYF0sIFs0MCwgYGRvd25gXSwgWzMyLCBgZmlyZWBdXHJcbiAgICAgICAgXSlcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBrZXlkb3duYCwgKGV2ZW50KSA9PiB0aGlzLnVwZGF0ZShldmVudCwgdHJ1ZSkpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGtleXVwYCwgKGV2ZW50KSA9PiB0aGlzLnVwZGF0ZShldmVudCwgZmFsc2UpKTtcclxuICAgICAgICAvL9C+0LHRidC10LUg0YHQvtGB0YLQvtGP0L3QuNC1INC40LPRgNGLXHJcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGB3aGVhdGAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBgY2hhcmFjdGVyYCxcclxuICAgICAgICAgICAgICAgIHg6IDY0LFxyXG4gICAgICAgICAgICAgICAgeTogNTEyLFxyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYmlydGhUaW1lOiAxMCxcclxuICAgICAgICAgICAgICAgIHJlcGVhdDogLTEsXHJcbiAgICAgICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFtgc3RhbmRgLCBgYmlydGhgLCBgYWN0aW9uT25gXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgd2hlYXRgLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYGNoYXJhY3RlcmAsXHJcbiAgICAgICAgICAgICAgICB4OiA2NCxcclxuICAgICAgICAgICAgICAgIHk6IDUxMixcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJpcnRoVGltZTogMTAsXHJcbiAgICAgICAgICAgICAgICByZXBlYXQ6IC0xLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYCwgYGJpcnRoYCwgYGFjdGlvbk9uYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYGNvd2AsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBgY2hhcmFjdGVyYCxcclxuICAgICAgICAgICAgICAgIHg6IDE5MixcclxuICAgICAgICAgICAgICAgIHk6IDUxMixcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJpcnRoVGltZTogMjAsXHJcbiAgICAgICAgICAgICAgICByZXBlYXQ6IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFtgc3RhbmRgLCBgYmlydGhgLCBgc3RhbmRgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgY2hpY2tlbmAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBgY2hhcmFjdGVyYCxcclxuICAgICAgICAgICAgICAgIHg6IDMyMCxcclxuICAgICAgICAgICAgICAgIHk6IDUxMixcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJpcnRoVGltZTogMTAsXHJcbiAgICAgICAgICAgICAgICByZXBlYXQ6IDMsXHJcbiAgICAgICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFtgc3RhbmRgLCBgYmlydGhgLCBgc3RhbmRgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgYW1vdW50V2hlYXRgLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYG9iamVjdGAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgICAgIHRleHRYOiAxMjgsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WTogNTU2LFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsQ29sb3I6IGAjMDAwMEZGYCxcclxuICAgICAgICAgICAgICAgIGRhbmdlckNvbG9yOiBgI0ZGMDAwMGAsXHJcbiAgICAgICAgICAgICAgICB4OiA2NCxcclxuICAgICAgICAgICAgICAgIHk6IDUxMixcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFtgc3RhbmRgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgYW1vdW50Q293c2AsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBgb2JqZWN0YCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgdGV4dFg6IDI1MixcclxuICAgICAgICAgICAgICAgIHRleHRZOiA1NTYsXHJcbiAgICAgICAgICAgICAgICBub3JtYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBub3JtYWxDb2xvcjogYCMwMDAwRkZgLFxyXG4gICAgICAgICAgICAgICAgZGFuZ2VyQ29sb3I6IGAjRkYwMDAwYCxcclxuICAgICAgICAgICAgICAgIHg6IDE5MixcclxuICAgICAgICAgICAgICAgIHk6IDUxMixcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFtgc3RhbmRgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgYW1vdW50Q2hpY2tlbnNgLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYG9iamVjdGAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIHRleHRYOiAzODAsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WTogNTU2LFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsQ29sb3I6IGAjMDAwMEZGYCxcclxuICAgICAgICAgICAgICAgIGRhbmdlckNvbG9yOiBgI0ZGMDAwMGAsXHJcbiAgICAgICAgICAgICAgICB4OiAzMjAsXHJcbiAgICAgICAgICAgICAgICB5OiA1MTIsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYGFtb3VudENvaW5zYCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IGBvYmplY3RgLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WDogNTc2LFxyXG4gICAgICAgICAgICAgICAgdGV4dFk6IDEwOCxcclxuICAgICAgICAgICAgICAgIG5vcm1hbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBub3JtYWxDb2xvcjogYCMwMDAwRkZgLFxyXG4gICAgICAgICAgICAgICAgZGFuZ2VyQ29sb3I6IGAjRkYwMDAwYCxcclxuICAgICAgICAgICAgICAgIHg6IDUxMixcclxuICAgICAgICAgICAgICAgIHk6IDY0LFxyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogW2BzdGFuZGBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGBhbW91bnRFZ2dzYCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IGBvYmplY3RgLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WDogNTc2LFxyXG4gICAgICAgICAgICAgICAgdGV4dFk6IDIzNixcclxuICAgICAgICAgICAgICAgIHN0YXJ0WDogNTEyLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRZOiAxOTIsXHJcbiAgICAgICAgICAgICAgICBub3JtYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsQ29sb3I6IGAjMDAwMEZGYCxcclxuICAgICAgICAgICAgICAgIGRhbmdlckNvbG9yOiBgI0ZGMDAwMGAsXHJcbiAgICAgICAgICAgICAgICB4OiA1MTIsXHJcbiAgICAgICAgICAgICAgICB5OiAxOTIsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYGFtb3VudE1pbGtgLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYG9iamVjdGAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgIHRleHRYOiA1NzYsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WTogMzY0LFxyXG4gICAgICAgICAgICAgICAgc3RhcnRYOiA1MTIsXHJcbiAgICAgICAgICAgICAgICBzdGFydFk6IDMyMCxcclxuICAgICAgICAgICAgICAgIG5vcm1hbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBub3JtYWxDb2xvcjogYCMwMDAwRkZgLFxyXG4gICAgICAgICAgICAgICAgZGFuZ2VyQ29sb3I6IGAjRkYwMDAwYCxcclxuICAgICAgICAgICAgICAgIHg6IDUxMixcclxuICAgICAgICAgICAgICAgIHk6IDMyMCxcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFtgc3RhbmRgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgYW1vdW50RmVlZGAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBgb2JqZWN0YCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgdGV4dFg6IDU3NixcclxuICAgICAgICAgICAgICAgIHRleHRZOiA0OTIsXHJcbiAgICAgICAgICAgICAgICBub3JtYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsQ29sb3I6IGAjMDAwMEZGYCxcclxuICAgICAgICAgICAgICAgIGRhbmdlckNvbG9yOiBgI0ZGMDAwMGAsXHJcbiAgICAgICAgICAgICAgICB4OiA1MTIsXHJcbiAgICAgICAgICAgICAgICB5OiA0NDgsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuICAgIHVwZGF0ZShldmVudCwgcHJlc3NlZCkge1xyXG4gICAgICAgIGlmICh0aGlzLmtleU1hcC5oYXMoZXZlbnQua2V5Q29kZSkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXNbdGhpcy5rZXlNYXAuZ2V0KGV2ZW50LmtleUNvZGUpXSA9IHByZXNzZWQ7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v0LvQvtCz0LjQutCwINC40LPRgNGLXHJcbiAgICBfY2hhbmdlU3RhdGUoc3RhdGUpIHtcclxuICAgICAgICBpZiAoc3RhdGUuY291bnRlciA9PT0gKHN0YXRlLmJlaGF2aW9yLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLmNvdW50ZXIgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXRlLmNvdW50ZXIrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfY2hhbmdlSHVkKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnN0YXRlcykge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnZhbHVlICs9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub3JtYWwgPSBpdGVtLnZhbHVlID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfZ2V0RmVlZCgpIHtcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuc3RhdGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09IGBhbW91bnRGZWVkYCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL9Cc0LXRhdCw0L3QuNC60LAg0LjQs9GA0YtcclxuICAgIHBsYXkoc3RhdGUsIGV2ZW50T2NjdXJyZWQpIHtcclxuICAgICAgICBpZiAoZXZlbnRPY2N1cnJlZCA9PT0gYG5lZWRBY3Rpb25gKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5uYW1lID09PSBgd2hlYXRgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5yZXBlYXQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUh1ZCh0aGlzLmNoYXJhY3RlcnNIdWQuZ2V0KHN0YXRlLm5hbWUpLCAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZXBlYXQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLm5hbWUgPT09IGBjb3dgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnJlcGVhdCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUucmVwZWF0ID0gMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50T2NjdXJyZWQgPT09IGBtb3VzZXVwYCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VIdWQodGhpcy5hbW91bnRDaGFyYWN0ZXJzLmdldChzdGF0ZS5uYW1lKSwgLTEpXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5uYW1lID09PSBgd2hlYXRgKSB0aGlzLl9jaGFuZ2VTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudE9jY3VycmVkID09PSBgY2xpY2tgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlZWQgPSB0aGlzLl9nZXRGZWVkKCk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5uYW1lID09PSBgd2hlYXRgICYmIHN0YXRlLmJlaGF2aW9yW3N0YXRlLmNvdW50ZXJdID09PSBgYWN0aW9uT25gKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VIdWQoYGFtb3VudEZlZWRgLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZVN0YXRlKHN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgaWYgKChzdGF0ZS5uYW1lID09PSBgY293YCB8fCBzdGF0ZS5uYW1lID09PSBgY2hpY2tlbmApICYmIGZlZWQudmFsdWUgPiAwICYmIHN0YXRlLmJlaGF2aW9yW3N0YXRlLmNvdW50ZXJdID09PSBgc3RhbmRgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VIdWQoYGFtb3VudEZlZWRgLCAtMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5uYW1lID09PSBgYW1vdW50TWlsa2ApIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS52YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VIdWQoYGFtb3VudENvaW5zYCwgMiAqIHN0YXRlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VIdWQoYGFtb3VudE1pbGtgLCAtc3RhdGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBpZiAoc3RhdGUubmFtZSA9PT0gYGFtb3VudEVnZ3NgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUudmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSHVkKGBhbW91bnRDb2luc2AsIHN0YXRlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VIdWQoYGFtb3VudEVnZ3NgLCAtc3RhdGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjcmVlbiB9IGZyb20gXCIuL3NyZWVuXCI7XHJcbmltcG9ydCB7TG9hZGluZ30gZnJvbSAnLi9zY2VuZXMvbG9hZGluZyc7XHJcbmltcG9ydCB7IE1lbnUgfSBmcm9tIFwiLi9zY2VuZXMvbWVudVwiO1xyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuL3NjZW5lXCI7XHJcbmltcG9ydCB7IENvbnRyb2xTdGF0ZSB9IGZyb20gXCIuL2NvbnRyb2wtc3RhdGVcIjtcclxuaW1wb3J0IHsgR2FtZUxldmVsIH0gZnJvbSBcIi4vc2NlbmVzL2dhbWUtbGV2ZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1le1xyXG4gICAgY29uc3RydWN0b3Ioe3dpZHRoID0gNjQwLCBoZWlnaHQgPSA2NDB9ID0ge30pe1xyXG4gICAgICAgIHRoaXMuc2NyZWVuID0gbmV3IFNjcmVlbih3aWR0aCxoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuLmxvYWRJbWFnZXMoe1xyXG4gICAgICAgICAgICBjb3c6IGBpbWcvY293LnBuZ2AsXHJcbiAgICAgICAgICAgIGNoaWNrZW46IGBpbWcvY2hpY2tlbi5wbmdgLFxyXG4gICAgICAgICAgICB3aGVhdDogYGltZy93aGVhdC5wbmdgLFxyXG4gICAgICAgICAgICBhbW91bnRDaGlja2VuczogYGltZy9hbW91bnRDaGlja2Vucy5wbmdgLFxyXG4gICAgICAgICAgICBhbW91bnRDb2luczogYGltZy9hbW91bnRDb2lucy5wbmdgLFxyXG4gICAgICAgICAgICBhbW91bnRDb3dzOiBgaW1nL2Ftb3VudENvd3MucG5nYCxcclxuICAgICAgICAgICAgYW1vdW50RWdnczogYGltZy9hbW91bnRFZ2dzLnBuZ2AsXHJcbiAgICAgICAgICAgIGFtb3VudEZlZWQ6IGBpbWcvYW1vdW50RmVlZC5wbmdgLFxyXG4gICAgICAgICAgICBhbW91bnRNaWxrOiBgaW1nL2Ftb3VudE1pbGsucG5nYCxcclxuICAgICAgICAgICAgYW1vdW50V2hlYXQ6IGBpbWcvYW1vdW50V2hlYXQucG5nYCxcclxuICAgICAgICAgICAgdGl0bGU6IGBpbWcvdGl0bGUuanBnYCxcclxuICAgICAgICAgICAgdGlsZXM6IGBpbWcvdGlsZXMucG5nYFxyXG4gICAgICAgIH0pOyAgICAgICBcclxuICAgICAgICB0aGlzLmNvbnRyb2wgPSBuZXcgQ29udHJvbFN0YXRlKCk7IFxyXG4gICAgICAgIHRoaXMuc2NlbmVzID0ge1xyXG4gICAgICAgICAgICBsb2FkaW5nOiBuZXcgTG9hZGluZyh0aGlzKSxcclxuICAgICAgICAgICAgbWVudTogbmV3IE1lbnUodGhpcyksXHJcbiAgICAgICAgICAgIGdhbWVMZXZlbDogbmV3IEdhbWVMZXZlbCh0aGlzKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSB0aGlzLnNjZW5lcy5sb2FkaW5nO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lLmluaXQoKTtcclxuICAgIH1cclxuICAgIGNoYW5nZVNjZW5lKHN0YXR1cyl7XHJcbiAgICAgICAgc3dpdGNoKHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmUuTE9BREVEOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVzLm1lbnU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTY2VuZS5TVEFSVF9HQU1FOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVzLmdhbWVMZXZlbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVzLm1lbnU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnJhbWUodGltZSl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U2NlbmUuc3RhdHVzICE9PSBTY2VuZS5XT1JLSU5HKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSB0aGlzLmNoYW5nZVNjZW5lKHRoaXMuY3VycmVudFNjZW5lLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUucmVuZGVyKHRpbWUpO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy5mcmFtZSh0aW1lKSk7XHJcbiAgICB9XHJcbiAgICBydW4oKXtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMuZnJhbWUodGltZSkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQm9keSB9IGZyb20gXCIuL2JvZHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIdWRJdGVtIGV4dGVuZHMgQm9keSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbWFnZU5hbWUsIHN0YXRlKSB7XHJcbiAgICAgICAgc3VwZXIoeyBpbWFnZU5hbWUsIHNwZWVkOiA1MCB9KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gYHggJHt0aGlzLnN0YXRlLnZhbHVlfWA7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuc3RhdGUubm9ybWFsID8gdGhpcy5zdGF0ZS5ub3JtYWxDb2xvciA6IHRoaXMuc3RhdGUuZGFuZ2VyQ29sb3IsICAgICAgICBcclxuICAgICAgICB0aGlzLnRleHRYID0gdGhpcy5zdGF0ZS50ZXh0WDtcclxuICAgICAgICB0aGlzLnRleHRZID0gdGhpcy5zdGF0ZS50ZXh0WTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gYHggJHt0aGlzLnN0YXRlLnZhbHVlfWA7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuc3RhdGUubm9ybWFsID8gdGhpcy5zdGF0ZS5ub3JtYWxDb2xvciA6IHRoaXMuc3RhdGUuZGFuZ2VyQ29sb3IsICAgICAgICBcclxuICAgICAgICB0aGlzLnRleHRYID0gdGhpcy5zdGF0ZS50ZXh0WDtcclxuICAgICAgICB0aGlzLnRleHRZID0gdGhpcy5zdGF0ZS50ZXh0WTtcclxuICAgICAgICB0aGlzLnN0YW5kKCk7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKHRpbWUpO1xyXG4gICAgfVxyXG4gICAgbmVlZEFjdGlvbigpIHsgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVye1xyXG4gICAgY29uc3RydWN0b3IoaW1hZ2VGaWxlcyl7XHJcbiAgICAgICAgdGhpcy5pbWFnZUZpbGVzID0gaW1hZ2VGaWxlcztcclxuICAgICAgICB0aGlzLmltYWdlcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgbG9hZCgpe1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBbXTtcclxuICAgICAgICBmb3IobGV0IG5hbWUgaW4gdGhpcy5pbWFnZUZpbGVzKXtcclxuICAgICAgICAgICAgcHJvbWlzZS5wdXNoKHRoaXMubG9hZEltYWdlKG5hbWUsIHRoaXMuaW1hZ2VGaWxlc1tuYW1lXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZSk7XHJcbiAgICB9XHJcbiAgICBsb2FkSW1hZ2UobmFtZSwgc3JjKXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbbmFtZV0gPSBpbWFnZTtcclxuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gcmVzb2x2ZShuYW1lKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0dhbWV9IGZyb20gJy4vZ2FtZSdcclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmYXJtID0gbmV3IEdhbWUoKTtcclxuICAgIGZhcm0ucnVuKCk7XHJcbn0iLCJpbXBvcnQgeyBXT1JLSU5HX1dJRFRILCBXT1JLSU5HX0hFSUdUSCwgTUVOVV9IRUlHVEgsIFNQUklURV9XSURUSCwgU1BSSVRFX0hFSUdUSCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjaGFyYWN0ZXJzLCBjb250cm9sKSB7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcclxuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xyXG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb3VzZU1vdmVIYW5kbGVyID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubW91c2VVcEhhbmRsZXIgPSB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0Q29vcmRzID0geyB4OiAwLCB5OiAwIH07XHJcbiAgICAgICAgdGhpcy5iZWdpbkNvb3JkcyA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgICAgIHRoaXMuZHJhZ2dlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy/RgNCw0LHQvtGC0LAg0YEg0LzRi9GI0YzRjiDQuCDRgNC10LDQutGG0LjQtdC5INC90LAg0L3QsNC20LDRgtC40LVcclxuICAgIG9uTW91c2VEb3duKGV2dCkge1xyXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRDb29yZHMgPSB7XHJcbiAgICAgICAgICAgIHg6IGV2dC5jbGllbnRYLFxyXG4gICAgICAgICAgICB5OiBldnQuY2xpZW50WVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZU1vdmUobW92ZUV2dCkge1xyXG4gICAgICAgIG1vdmVFdnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLmRyYWdnZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZmluZGVkQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5jaGFyYWN0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uc3RhdGUuZHJhZ2dhYmxlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICgoaXRlbS52aWV3LnggPD0gbW92ZUV2dC5jbGllbnRYICYmIChpdGVtLnZpZXcueCArIGl0ZW0udmlldy53aWR0aCkgPj0gbW92ZUV2dC5jbGllbnRYKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChpdGVtLnZpZXcueSA8PSBtb3ZlRXZ0LmNsaWVudFkgJiYgKGl0ZW0udmlldy55ICsgaXRlbS52aWV3LmhlaWdodCkgPj0gbW92ZUV2dC5jbGllbnRZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luQ29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLmZpbmRlZENoYXJhY3Rlci54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmZpbmRlZENoYXJhY3Rlci55XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZW50WCA9IHRoaXMuZmluZGVkQ2hhcmFjdGVyLnggKyBTUFJJVEVfV0lEVEggLSBtb3ZlRXZ0LmNsaWVudFg7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGVudFkgPSB0aGlzLmZpbmRlZENoYXJhY3Rlci55ICsgU1BSSVRFX0hFSUdUSCAtIG1vdmVFdnQuY2xpZW50WTtcclxuICAgICAgICAgICAgaWYgKChtb3ZlRXZ0LmNsaWVudFggPj0gaW5kZW50WCAmJiBtb3ZlRXZ0LmNsaWVudFggPD0gV09SS0lOR19XSURUSCAtIChpbmRlbnRYKSkgJiZcclxuICAgICAgICAgICAgICAgIChtb3ZlRXZ0LmNsaWVudFkgPj0gaW5kZW50WSAmJiBtb3ZlRXZ0LmNsaWVudFkgPD0gV09SS0lOR19IRUlHVEggLSAoaW5kZW50WSkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hpZnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5zdGFydENvb3Jkcy54IC0gbW92ZUV2dC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3RhcnRDb29yZHMueSAtIG1vdmVFdnQuY2xpZW50WVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogbW92ZUV2dC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IG1vdmVFdnQuY2xpZW50WVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5maW5kZWRDaGFyYWN0ZXIueCAtIHNoaWZ0LngsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5maW5kZWRDaGFyYWN0ZXIueSAtIHNoaWZ0LnlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRlZENoYXJhY3Rlci54ID0gbmV3Q29vcmRzLnhcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyLnkgPSBuZXdDb29yZHMueVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0b1ByZXZpb3VzUGxhY2UoKSB7XHJcbiAgICAgICAgdGhpcy5maW5kZWRDaGFyYWN0ZXIuc3RhdGUuZHJhZ2dhYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZpbmRlZENoYXJhY3Rlci54ID0gdGhpcy5iZWdpbkNvb3Jkcy54O1xyXG4gICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyLnkgPSB0aGlzLmJlZ2luQ29vcmRzLnk7XHJcblxyXG4gICAgfVxyXG4gICAgX2NoZWNrT3ZlcmxhcChyMSwgcjIpIHtcclxuICAgICAgICByZXR1cm4gIShyMS54ICsgcjEud2lkdGggPCByMi54IHx8IHIxLnkgKyByMS5oZWlnaHQgPCByMi55IHx8IHIxLnggPiByMi54ICsgcjIud2lkdGggfHwgcjEueSA+IHIyLnkgKyByMi5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZVVwKHVwRXZ0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmluZGVkQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh1cEV2dC5jbGllbnRZID4gTUVOVV9IRUlHVEgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9QcmV2aW91c1BsYWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVwRXZ0LmNsaWVudFggPCBXT1JLSU5HX1dJRFRIICYmIHVwRXZ0LmNsaWVudFkgPCBNRU5VX0hFSUdUSCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kZWRDaGFyYWN0ZXIueCA9IChNYXRoLnRydW5jKHVwRXZ0LmNsaWVudFggLyBTUFJJVEVfV0lEVEgpKSAqIFNQUklURV9XSURUSDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyLnkgPSAoTWF0aC50cnVuYyh1cEV2dC5jbGllbnRZIC8gU1BSSVRFX0hFSUdUSCkpICogU1BSSVRFX0hFSUdUSDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyLnN0YXRlLmRyYWdnYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmNoYXJhY3RlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PSB0aGlzLmZpbmRlZENoYXJhY3RlcikgY29udGludWU7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tPdmVybGFwKHRoaXMuZmluZGVkQ2hhcmFjdGVyLnZpZXcsIGl0ZW0udmlldykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b1ByZXZpb3VzUGxhY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/QuCDQsiDQu9C+0LPQuNC60YMg0LjQs9GA0YtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maW5kZWRDaGFyYWN0ZXIuc3RhdGUuZHJhZ2dhYmxlKSB0aGlzLmNvbnRyb2wucGxheSh0aGlzLmZpbmRlZENoYXJhY3Rlci5zdGF0ZSwgYG1vdXNldXBgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuZHJhZ2dlZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyID0gbnVsbDtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyKTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcEhhbmRsZXIpO1xyXG4gICAgfTtcclxuICAgIG9uQ2xpY2soZXZ0KSB7XHJcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmNoYXJhY3RlcnMpIHtcclxuICAgICAgICAgICAgaWYgKChpdGVtLnZpZXcueCA8PSBldnQuY2xpZW50WCAmJiAoaXRlbS52aWV3LnggKyBpdGVtLnZpZXcud2lkdGgpID49IGV2dC5jbGllbnRYKSAmJlxyXG4gICAgICAgICAgICAgICAgKGl0ZW0udmlldy55IDw9IGV2dC5jbGllbnRZICYmIChpdGVtLnZpZXcueSArIGl0ZW0udmlldy5oZWlnaHQpID49IGV2dC5jbGllbnRZKSkge1xyXG4gICAgICAgICAgICAgICAgLy/QuCDQsiDQu9C+0LPQuNC60YMg0LjQs9GA0YtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5wbGF5KGl0ZW0uc3RhdGUsIGBjbGlja2ApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQm9keSB9IGZyb20gXCIuL2JvZHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBCb2R5IHtcclxuICAgIGNvbnN0cnVjdG9yKGltYWdlTmFtZSwgc3RhdGUpIHtcclxuICAgICAgICBzdXBlcih7IGltYWdlTmFtZSwgc3BlZWQ6IDUwIH0pO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IC0xO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlVGltZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmJlaGF2aW9yW3RoaXMuc3RhdGUuY291bnRlcl0gPT09IGBiaXJ0aGApIHtcclxuICAgICAgICAgICAgdGhpcy5iaXJ0aCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFuZ2VUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRpbWUgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYmVoYXZpb3JbdGhpcy5zdGF0ZS5jb3VudGVyXSA9PT0gYGFjdGlvbk9uYCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbk9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGFydFRpbWUgPiAwICYmICh0aW1lIC8gMTAwMCkgPj0gKHRoaXMuc3RhcnRUaW1lICsgdGhpcy5zdGF0ZS5iaXJ0aFRpbWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZEFjdGlvbih0aGlzLnN0YXRlLCBgbmVlZEFjdGlvbmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUodGltZSk7XHJcbiAgICB9XHJcbiAgICBuZWVkQWN0aW9uKCkgeyB9XHJcbn0iLCJleHBvcnQgY2xhc3MgU2NlbmV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gdGhpcy5jb25zdHJ1Y3Rvci5XT1JLSU5HO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBXT1JLSU5HKCl7cmV0dXJuIGBXT1JLSU5HYDt9XHJcbiAgICBzdGF0aWMgZ2V0IExPQURFRCgpe3JldHVybiBgTE9BREVEYDt9XHJcbiAgICBzdGF0aWMgZ2V0IFNUQVJUX0dBTUUoKXtyZXR1cm4gYFNUQVJUX0dBTUVgO31cclxuICAgIHN0YXRpYyBnZXQgR0FNRV9PVkVSKCl7cmV0dXJuIGBHQU1FX09WRVJgO30gIFxyXG4gICAgc3RhdGljIGdldCBHQU1FX1dJTigpe3JldHVybiBgR0FNRV9XSU5gO30gIFxyXG4gICAgc3RhdGljIGdldCBGSU5JU0hFRCgpe3JldHVybiBgRklOSVNIRURgO31cclxuICAgIGluaXQoKXtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHRoaXMuY29uc3RydWN0b3IuV09SS0lORztcclxuICAgIH1cclxuICAgIGZpbmlzaChzdGF0dXMpe1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHRpbWUpe1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL3NjZW5lXCI7XHJcbmltcG9ydCB7IFNwcml0ZVNoZWV0IH0gZnJvbSBcIi4uL3Nwcml0ZS1zaGVldFwiO1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi4vcGxheWVyXCI7XHJcbmltcG9ydCB7IEh1ZEl0ZW0gfSBmcm9tIFwiLi4vaHVkLWl0ZW1cIjtcclxuaW1wb3J0IE1vdXNlIGZyb20gXCIuLi9tb3VzZVwiO1xyXG5pbXBvcnQgeyBydW5JblRoaXNDb250ZXh0IH0gZnJvbSBcInZtXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVMZXZlbCBleHRlbmRzIFNjZW5lIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgICAgICB0aGlzLnRpbGVzID0gbmV3IFNwcml0ZVNoZWV0KHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiBgdGlsZXNgLFxyXG4gICAgICAgICAgICBpbWFnZVdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0OiA2NDBcclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgICAgIC8v0YDQvtC20LTQtdC90LjQtSDQstGB0LXRhSDQv9C10YDRgdC+0L3QsNC20LXQuSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YXQsNC00LBcclxuICAgICAgICAvL9GB0L/QtdGG0LjQsNC70YzQvdC+INC40YHQv9C+0LvRjNC30YPRjiDQv9GA0LjRgdCy0L7QtdC90LjQtSwg0YfRgtC+0LHRiyDQvNC+0LbQvdC+INCx0YvQu9C+INC+0YLRgdC70LXQttC40LLQsNGC0Ywg0L7QsdGJ0LXQtVxyXG4gICAgICAgIC8v0YHQvtGB0YLQvtGP0L3QuNC1INCyIGNvbnRyb2wtc3RhdGVcclxuICAgICAgICB0aGlzLmNoYXJhY3RlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmdhbWUuY29udHJvbC5zdGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSBgY2hhcmFjdGVyYCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gbmV3IFBsYXllcihgJHtpdGVtLm5hbWV9YCwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIueCA9IGl0ZW0ueDtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlci55ID0gaXRlbS55O1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyLm5lZWRBY3Rpb24gPSB0aGlzLmdhbWUuY29udHJvbC5wbGF5LmJpbmQodGhpcy5nYW1lLmNvbnRyb2wpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJzLnB1c2goY2hhcmFjdGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IGBvYmplY3RgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBodWRJdGVtID0gbmV3IEh1ZEl0ZW0oYCR7aXRlbS5uYW1lfWAsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaHVkSXRlbS54ID0gaXRlbS54O1xyXG4gICAgICAgICAgICAgICAgaHVkSXRlbS55ID0gaXRlbS55OyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVycy5wdXNoKGh1ZEl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7IFxyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVycy5zb3J0KChwcmV2LCBuZXh0KSA9PiBwcmV2LmNvbnN0cnVjdG9yLm5hbWUuY2hhckNvZGVBdCgwKSAtIG5leHQuY29uc3RydWN0b3IubmFtZS5jaGFyQ29kZUF0KDApKTtcclxuXHJcbiAgICAgICAgdGhpcy5tb3VzZSA9IG5ldyBNb3VzZSh0aGlzLmNoYXJhY3RlcnMsdGhpcy5nYW1lLmNvbnRyb2wpO1xyXG4gICAgfVxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICAgICAgY29uc3QgbWFwRGF0YSA9IHJlcXVpcmUoYC4uL21hcHMvbGV2ZWwxLmpzb25gKTtcclxuICAgICAgICB0aGlzLm1hcCA9IHRoaXMuZ2FtZS5zY3JlZW4uY3JlYXRlTWFwKGBsZXZlbDFgLCBtYXBEYXRhLCB0aGlzLnRpbGVzKVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlcnMuZm9yRWFjaCgoY2hhcmFjdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlci51cGRhdGUodGltZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIodGltZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZmlsbChgIzAwMDAwMGApO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZHJhd1Nwcml0ZSh0aGlzLm1hcCk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJzLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZHJhd1Nwcml0ZShlbGVtLnZpZXcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5kcmF3SHVkKGVsZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKHRpbWUpO1xyXG4gICAgfSAgICBcclxufSIsImltcG9ydCB7U2NlbmV9IGZyb20gJy4uL3NjZW5lJztcclxuZXhwb3J0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyBTY2VuZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUpO1xyXG4gICAgICAgIHRoaXMubG9hZGVkQXQgPSAwO1xyXG4gICAgfSAgIFxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXQoKTtcclxuICAgICAgICB0aGlzLmxvYWRlZEF0ID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lKXsgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMubG9hZGVkQXQgPT09IDAgJiYgdGhpcy5nYW1lLnNjcmVlbi5pc0ltYWdlc0xvYWRlZCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkQXQgPXRpbWU7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9hZGVkQXQgIT0gMCAmJiAodGltZSAtIHRoaXMubG9hZGVkQXQpID4gNTAwKXtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2goU2NlbmUuTE9BREVEKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIHJlbmRlcih0aW1lKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmZpbGwoYCMwMDAwMDBgKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50KDUwLDcwLGDQl9Cw0LPRgNGD0LfQutCwLi4uYCk7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKHRpbWUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tICcuLi9zY2VuZSc7XHJcbmltcG9ydCB7IEdBTUVfV0lEVEgsIEdBTUVfSEVJR1RIIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuZXhwb3J0IGNsYXNzIE1lbnUgZXh0ZW5kcyBTY2VuZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUpO1xyXG4gICAgfVxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXQoKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lKXtcclxuICAgICAgICBpZih0aGlzLmdhbWUuY29udHJvbC5maXJlKXtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2goU2NlbmUuU1RBUlRfR0FNRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKHRpbWUpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHRpbWUpXHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5kcmF3SW1hZ2UoMCwwLGB0aXRsZWApO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4ucHJpbnQoMjAwLCBHQU1FX0hFSUdUSCoyLzMsIGAjRkZGRkZGYCxgS09NSUtBWF9jeXJgLCBgUHJlc3Mgc3BhY2VgKTtcclxuICAgICAgICBzdXBlci5yZW5kZXIodGltZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZVNoZWV0e1xyXG4gICAgY29uc3RydWN0b3Ioe2ltYWdlTmFtZSwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIHNwcml0ZVdpZHRoID0gNjQsIHNwcml0ZUhlaWdodCA9IDY0fSl7XHJcbiAgICAgICAgdGhpcy5pbWFnZU5hbWUgPWltYWdlTmFtZTtcclxuICAgICAgICB0aGlzLmltYWdlV2lkdGggPSBpbWFnZVdpZHRoO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VIZWlnaHQgPSBpbWFnZUhlaWdodDtcclxuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7ICAgICAgICBcclxuICAgIH1cclxuICAgIGdldEFuaW1hdGlvbihpbmRleGVzLCBzcGVlZCwgcmVwZWF0ID0gdHJ1ZSwgYXV0b3J1biA9IHRydWUpe1xyXG4gICAgICAgIHJldHVybiBuZXcgQW5pbWF0aW9uKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiB0aGlzLmltYWdlTmFtZSxcclxuICAgICAgICAgICAgZnJhbWVzOiBpbmRleGVzLm1hcCgoaW5kZXgpID0+ICh7c3g6IHRoaXMuZ2V0U291cmNlWChpbmRleCksIHN5OiB0aGlzLmdldFNvdXJjZVkoaW5kZXgpfSkpLFxyXG4gICAgICAgICAgICBzcGVlZDogc3BlZWQsXHJcbiAgICAgICAgICAgIHJlcGVhdDogcmVwZWF0LFxyXG4gICAgICAgICAgICBhdXRvcnVuOiBhdXRvcnVuLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zcHJpdGVXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNwcml0ZUhlaWdodFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRTcHJpdGUoaW5kZXgpe1xyXG4gICAgICAgIHJldHVybiBuZXcgU3ByaXRlKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiB0aGlzLmltYWdlTmFtZSxcclxuICAgICAgICAgICAgc291cmNlWDogdGhpcy5nZXRTb3VyY2VYKGluZGV4KSxcclxuICAgICAgICAgICAgc291cmNlWTp0aGlzLmdldFNvdXJjZVkoaW5kZXgpLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zcHJpdGVXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNwcml0ZUhlaWdodFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRTb3VyY2VYKGluZGV4KXtcclxuICAgICAgICByZXR1cm4gKC0taW5kZXggKnRoaXMuc3ByaXRlV2lkdGgpICUgdGhpcy5pbWFnZVdpZHRoO1xyXG4gICAgfVxyXG4gICAgZ2V0U291cmNlWShpbmRleCl7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgudHJ1bmMoKC0taW5kZXggKiB0aGlzLnNwcml0ZVdpZHRoKSAvIHRoaXMuaW1hZ2VXaWR0aCkqdGhpcy5zcHJpdGVIZWlnaHQ7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3Ioe2ltYWdlTmFtZSwgc291cmNlWCwgc291cmNlWSwgd2lkdGggPSA2NCwgaGVpZ2h0ID0gNjR9KXtcclxuICAgICAgICB0aGlzLmltYWdlTmFtZSA9IGltYWdlTmFtZTtcclxuICAgICAgICB0aGlzLnNvdXJjZVggPSBzb3VyY2VYO1xyXG4gICAgICAgIHRoaXMuc291cmNlWSA9IHNvdXJjZVk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgIH1cclxuICAgIHNldFhZKHgseSl7XHJcbiAgICAgICAgdGhpcy54PSB4O1xyXG4gICAgICAgIHRoaXMueT0geTtcclxuICAgIH1cclxuICAgIFxyXG59IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL2ltYWdlLWxvYWRlcidcclxuaW1wb3J0IHsgVGlsZU1hcCB9IGZyb20gJy4vdGlsZS1tYXAnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbntcclxuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IHRoaXMuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoYDJkYCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSB7fTtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VzTG9hZGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsb2FkSW1hZ2VzKGltYWdlRmlsZXMpe1xyXG4gICAgICAgIGNvbnN0IGxvYWRlciA9IG5ldyBJbWFnZUxvYWRlcihpbWFnZUZpbGVzKTtcclxuICAgICAgICBsb2FkZXIubG9hZCgpLnRoZW4oKG5hbWVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzID0gT2JqZWN0LmFzc2lnbih0aGlzLmltYWdlcywgbG9hZGVyLmltYWdlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZXNMb2FkZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KXtcclxuICAgICAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGNhbnZhc2ApO1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGVsZW1lbnRzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGNhbnZhc2ApO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGNhbnZhcyk7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICByZXR1cm4gY2FudmFzO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlTWFwKG5hbWUgLCBtYXBEYXRhLCB0aWxlc2V0KXtcclxuICAgICAgICBjb25zdCBtYXBJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGNhbnZhc2ApO1xyXG4gICAgICAgIG1hcEltYWdlLndpZHRoID0gbWFwRGF0YS53aWR0aCAqIG1hcERhdGEudGlsZXdpZHRoO1xyXG4gICAgICAgIG1hcEltYWdlLmhlaWdodCA9IG1hcERhdGEuaGVpZ2h0ICogbWFwRGF0YS50aWxlaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IG1hcENvbnRleHQgPSBtYXBJbWFnZS5nZXRDb250ZXh0KGAyZGApO1xyXG4gICAgICAgIGNvbnN0IGhpdGJveGVzID0gW107XHJcbiAgICAgICAgbGV0IHJvdyAsIGNvbDtcclxuICAgICAgICBtYXBEYXRhLmxheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xyXG4gICAgICAgICAgICBpZihsYXllci50eXBlID09PSBgdGlsZWxheWVyYCl7XHJcbiAgICAgICAgICAgICAgICByb3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICAgICAgICAgIGxheWVyLmRhdGEuZm9yRWFjaCgoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbmRleD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwQ29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZXNbdGlsZXNldC5pbWFnZU5hbWVdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZXNldC5nZXRTb3VyY2VYKGluZGV4KSwgdGlsZXNldC5nZXRTb3VyY2VZKGluZGV4KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcERhdGEudGlsZXdpZHRoLCBtYXBEYXRhLnRpbGVoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2wgKiBtYXBEYXRhLnRpbGV3aWR0aCwgcm93ICogbWFwRGF0YS50aWxlaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwRGF0YS50aWxld2lkdGgsIG1hcERhdGEudGlsZWhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb2wrKztcclxuICAgICAgICAgICAgICAgICAgICBpZihjb2wgPiAobWFwRGF0YS53aWR0aCAtIDEgKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyArKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxheWVyLnR5cGUgPT09IGBvYmplY3Rncm91cGApe1xyXG4gICAgICAgICAgICAgICAgaGl0Ym94ZXMucHVzaCguLi5sYXllci5vYmplY3RzLm1hcCgob2JqKSA9PiAoe3gxOiBvYmoueCwgeDI6IG9iai54ICsgb2JqLndpZHRoLCB5MTogb2JqLnksIHkyOiBvYmoueSArIG9iai5oZWlnaHR9KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmltYWdlc1tuYW1lXSA9IG1hcEltYWdlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVGlsZU1hcCh7XHJcbiAgICAgICAgICAgIGltYWdlTmFtZTogbmFtZSxcclxuICAgICAgICAgICAgc291cmNlWDogMCxcclxuICAgICAgICAgICAgc291cmNlWTogMCxcclxuICAgICAgICAgICAgd2lkdGg6IG1hcEltYWdlLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG1hcEltYWdlLmhlaWdodCxcclxuICAgICAgICAgICAgaGl0Ym94ZXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZmlsbChjb2xvcil7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBwcmludCh4LCB5LCBjb2xvciwgZm9udCwgdGV4dCl7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYDIycHggJHtmb250fWA7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xyXG4gICAgfVxyXG4gICAgZHJhd0ltYWdlKHgseSwgaW1hZ2VOYW1lKXtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2VzW2ltYWdlTmFtZV0seCx5KTtcclxuICAgIH1cclxuICAgIGRyYXdTcHJpdGUoc3ByaXRlKXtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2VzW3Nwcml0ZS5pbWFnZU5hbWVdLFxyXG4gICAgICAgICAgICBzcHJpdGUuc291cmNlWCwgc3ByaXRlLnNvdXJjZVksIHNwcml0ZS53aWR0aCwgc3ByaXRlLmhlaWdodCxcclxuICAgICAgICAgICAgc3ByaXRlLngsIHNwcml0ZS55LCBzcHJpdGUud2lkdGgsIHNwcml0ZS5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgZHJhd0h1ZChodWQpe1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZXNbaHVkLnZpZXcuaW1hZ2VOYW1lXSxcclxuICAgICAgICAgICAgaHVkLnZpZXcuc291cmNlWCwgaHVkLnZpZXcuc291cmNlWSwgaHVkLnZpZXcud2lkdGgsIGh1ZC52aWV3LmhlaWdodCxcclxuICAgICAgICAgICAgaHVkLnZpZXcueCwgaHVkLnZpZXcueSwgaHVkLnZpZXcud2lkdGgsIGh1ZC52aWV3LmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGh1ZC5jb2xvcjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAyMnB4IEtPTUlLQVhfY3lyYDtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoaHVkLnRleHQsIGh1ZC50ZXh0WCwgaHVkLnRleHRZKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7U3ByaXRlfSBmcm9tICcuL3Nwcml0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGlsZU1hcCBleHRlbmRzIFNwcml0ZXtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5oaXRib3hlcyA9IHByb3BzLmhpdGJveGVzIHx8IFtdO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGlvbiwgc3BlZWQpIHtcclxuICAgICAgICB0aGlzLnNldERpcmVjdGlvbihkaXJlY3Rpb24sIHNwZWVkKVxyXG4gICAgfVxyXG4gICAgc2V0RGlyZWN0aW9uKGRpcmVjdGlvbiwgc3BlZWQpIHtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgYHVwYDpcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IC1zcGVlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGBkb3duYDpcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHNwZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgYHJpZ2h0YDpcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHNwZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgYGxlZnRgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gLXNwZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==