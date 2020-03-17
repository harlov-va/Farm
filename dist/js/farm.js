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
      this.findedCharacter.x = this.beginCoords.x;
      this.findedCharacter.y = this.beginCoords.y;
      this.findedCharacter.state.draggable = true;
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

              if (item.view.x <= this.findedCharacter.x && item.view.x + item.view.width >= this.findedCharacter.x && item.view.y <= this.findedCharacter.y && item.view.y + item.view.height >= this.findedCharacter.y) {
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
      this.game.screen.print(200, _constants__WEBPACK_IMPORTED_MODULE_1__["GAME_HEIGTH"] * 2 / 3, "#FFFFFF", "KOMIKAX_cyr", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043F\u0440\u043E\u0431\u0435\u043B");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZtLWJyb3dzZXJpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYm9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyLXNoZWV0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2wtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h1ZC1pdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS1sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb3VzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL2dhbWUtbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9sb2FkaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZXMvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3ByaXRlLXNoZWV0LmpzIiwid2VicGFjazovLy8uL3NyYy9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NyZWVuLmpzIiwid2VicGFjazovLy8uL3NyYy90aWxlLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVjdG9yLmpzIl0sIm5hbWVzIjpbIkFuaW1hdGlvbiIsImltYWdlTmFtZSIsImZyYW1lcyIsInNwZWVkIiwicmVwZWF0IiwiYXV0b3J1biIsIndpZHRoIiwiaGVpZ2h0Iiwic291cmNlWCIsInN4Iiwic291cmNlWSIsInN5IiwicnVubmluZyIsImxhc3RUaW1lIiwiY3VycmVudEZyYW1lIiwidG90YWxGcmFtZXMiLCJsZW5ndGgiLCJpbmRleCIsInNldEZyYW1lIiwic3RvcCIsInRpbWUiLCJuZXh0RnJhbWUiLCJTcHJpdGUiLCJCb2R5IiwieCIsInkiLCJhbmltYXRpb25zIiwiYW5pbWF0aW9uc1NoZWV0IiwiQ2hhcmFjdGVyU2hlZXQiLCJzcGxpdCIsImZvckVhY2giLCJuYW1lIiwiZ2V0QW5pbWF0aW9uIiwic3RhbmQiLCJ2aWV3IiwicnVuIiwic2V0WFkiLCJNYXRoIiwidHJ1bmMiLCJ1cGRhdGUiLCJXSURUSF9PTEQiLCJIRUlHSFRfT0xEIiwiaW1hZ2VXaWR0aCIsIldJRFRIX0FOSU1BVElPTiIsImltYWdlSGVpZ2h0IiwiSEVJR0hUX0FOTUFUSU9OIiwic2VxdWVuY2VzIiwiZ2V0U2VxdWVuY2VzIiwiZGF0YSIsInJlcXVpcmUiLCJsYXllcnMiLCJsYXllciIsImZpbHRlciIsImkiLCJTcHJpdGVTaGVldCIsIkdBTUVfV0lEVEgiLCJHQU1FX0hFSUdUSCIsIldPUktJTkdfV0lEVEgiLCJXT1JLSU5HX0hFSUdUSCIsIk1FTlVfSEVJR1RIIiwiU1BSSVRFX1dJRFRIIiwiU1BSSVRFX0hFSUdUSCIsIkNvbnRyb2xTdGF0ZSIsInVwIiwiZG93biIsImxlZnQiLCJyaWdodCIsImZpcmUiLCJhbW91bnRDaGFyYWN0ZXJzIiwiTWFwIiwiY2hhcmFjdGVyc0h1ZCIsImtleU1hcCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic3RhdGVzIiwidHlwZSIsImRyYWdnYWJsZSIsImJpcnRoVGltZSIsImNvdW50ZXIiLCJiZWhhdmlvciIsInZhbHVlIiwidGV4dFgiLCJ0ZXh0WSIsIm5vcm1hbCIsIm5vcm1hbENvbG9yIiwiZGFuZ2VyQ29sb3IiLCJzdGFydFgiLCJzdGFydFkiLCJwcmVzc2VkIiwiaGFzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZ2V0Iiwic3RhdGUiLCJpdGVtIiwiZXZlbnRPY2N1cnJlZCIsIl9jaGFuZ2VTdGF0ZSIsIl9jaGFuZ2VIdWQiLCJmZWVkIiwiX2dldEZlZWQiLCJHYW1lIiwic2NyZWVuIiwiU2NyZWVuIiwibG9hZEltYWdlcyIsImNvdyIsImNoaWNrZW4iLCJ3aGVhdCIsImFtb3VudENoaWNrZW5zIiwiYW1vdW50Q29pbnMiLCJhbW91bnRDb3dzIiwiYW1vdW50RWdncyIsImFtb3VudEZlZWQiLCJhbW91bnRNaWxrIiwiYW1vdW50V2hlYXQiLCJ0aXRsZSIsInRpbGVzIiwiY29udHJvbCIsInNjZW5lcyIsImxvYWRpbmciLCJMb2FkaW5nIiwibWVudSIsIk1lbnUiLCJnYW1lTGV2ZWwiLCJHYW1lTGV2ZWwiLCJjdXJyZW50U2NlbmUiLCJpbml0Iiwic3RhdHVzIiwiU2NlbmUiLCJMT0FERUQiLCJTVEFSVF9HQU1FIiwiV09SS0lORyIsImNoYW5nZVNjZW5lIiwicmVuZGVyIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZnJhbWUiLCJIdWRJdGVtIiwidGV4dCIsImNvbG9yIiwiSW1hZ2VMb2FkZXIiLCJpbWFnZUZpbGVzIiwiaW1hZ2VzIiwicHJvbWlzZSIsInB1c2giLCJsb2FkSW1hZ2UiLCJQcm9taXNlIiwiYWxsIiwic3JjIiwicmVzb2x2ZSIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJ3aW5kb3ciLCJmYXJtIiwiTW91c2UiLCJjaGFyYWN0ZXJzIiwiY2xpY2tIYW5kbGVyIiwib25DbGljayIsImJpbmQiLCJtb3VzZU1vdmVIYW5kbGVyIiwib25Nb3VzZU1vdmUiLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VVcCIsIm9uTW91c2VEb3duIiwiZmluZGVkQ2hhcmFjdGVyIiwic3RhcnRDb29yZHMiLCJiZWdpbkNvb3JkcyIsImRyYWdnZWQiLCJldnQiLCJjbGllbnRYIiwiY2xpZW50WSIsIm1vdmVFdnQiLCJpbmRlbnRYIiwiaW5kZW50WSIsInNoaWZ0IiwibmV3Q29vcmRzIiwidXBFdnQiLCJ0b1ByZXZpb3VzUGxhY2UiLCJwbGF5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlBsYXllciIsInN0YXJ0VGltZSIsImNoYW5nZVRpbWUiLCJiaXJ0aCIsImFjdGlvbk9uIiwibmVlZEFjdGlvbiIsImdhbWUiLCJjb25zdHJ1Y3RvciIsImNoYXJhY3RlciIsImh1ZEl0ZW0iLCJzb3J0IiwicHJldiIsIm5leHQiLCJjaGFyQ29kZUF0IiwibW91c2UiLCJtYXBEYXRhIiwibWFwIiwiY3JlYXRlTWFwIiwiZmlsbCIsImRyYXdTcHJpdGUiLCJlbGVtIiwiZHJhd0h1ZCIsImxvYWRlZEF0IiwiaXNJbWFnZXNMb2FkZWQiLCJmaW5pc2giLCJwcmludCIsImRyYXdJbWFnZSIsInNwcml0ZVdpZHRoIiwic3ByaXRlSGVpZ2h0IiwiaW5kZXhlcyIsImdldFNvdXJjZVgiLCJnZXRTb3VyY2VZIiwiY2FudmFzIiwiY3JlYXRlQ2FudmFzIiwiY29udGV4dCIsImdldENvbnRleHQiLCJsb2FkZXIiLCJsb2FkIiwidGhlbiIsIm5hbWVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmQiLCJ0aWxlc2V0IiwibWFwSW1hZ2UiLCJ0aWxld2lkdGgiLCJ0aWxlaGVpZ2h0IiwibWFwQ29udGV4dCIsImhpdGJveGVzIiwicm93IiwiY29sIiwib2JqZWN0cyIsIm9iaiIsIngxIiwieDIiLCJ5MSIsInkyIiwiVGlsZU1hcCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZm9udCIsImZpbGxUZXh0Iiwic3ByaXRlIiwiaHVkIiwicHJvcHMiLCJWZWN0b3IiLCJkaXJlY3Rpb24iLCJzZXREaXJlY3Rpb24iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7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LEtBQXBDLEVBQTJDc0ssR0FBRyxDQUFDckssS0FBL0M7QUFDSDtBQXpGTDs7QUFBQTtBQUFBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFFTyxJQUFNK0osT0FBYjtBQUFBOztBQUNJLG1CQUFZTyxLQUFaLEVBQWtCO0FBQUE7O0FBQUE7O0FBQ2QsaUZBQU1BLEtBQU47QUFDQSxVQUFLaEIsUUFBTCxHQUFnQmdCLEtBQUssQ0FBQ2hCLFFBQU4sSUFBa0IsRUFBbEM7QUFGYztBQUdqQjs7QUFKTDtBQUFBLEVBQTZCbk4sOENBQTdCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRk8sSUFBTW9PLE1BQWI7QUFDSSxrQkFBWUMsU0FBWixFQUF1QnhQLEtBQXZCLEVBQThCO0FBQUE7O0FBQzFCLFNBQUt5UCxZQUFMLENBQWtCRCxTQUFsQixFQUE2QnhQLEtBQTdCO0FBQ0g7O0FBSEw7QUFBQTtBQUFBLGlDQUlpQndQLFNBSmpCLEVBSTRCeFAsS0FKNUIsRUFJbUM7QUFDM0IsV0FBS3dQLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsV0FBS3hQLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFdBQUtxQixDQUFMLEdBQVMsQ0FBVDtBQUNBLFdBQUtDLENBQUwsR0FBUyxDQUFUOztBQUNBLGNBQVFrTyxTQUFSO0FBQ0k7QUFDSSxlQUFLbE8sQ0FBTCxHQUFTLENBQUN0QixLQUFWO0FBQ0E7O0FBQ0o7QUFDSSxlQUFLc0IsQ0FBTCxHQUFTdEIsS0FBVDtBQUNBOztBQUNKO0FBQ0ksZUFBS3FCLENBQUwsR0FBU3JCLEtBQVQ7QUFDQTs7QUFDSjtBQUNJLGVBQUtxQixDQUFMLEdBQVMsQ0FBQ3JCLEtBQVY7QUFDQTtBQVpSO0FBY0g7QUF2Qkw7O0FBQUE7QUFBQSxJIiwiZmlsZSI6ImpzL2Zhcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciBpbmRleE9mID0gZnVuY3Rpb24gKHhzLCBpdGVtKSB7XG4gICAgaWYgKHhzLmluZGV4T2YpIHJldHVybiB4cy5pbmRleE9mKGl0ZW0pO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoeHNbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59O1xudmFyIE9iamVjdF9rZXlzID0gZnVuY3Rpb24gKG9iaikge1xuICAgIGlmIChPYmplY3Qua2V5cykgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSByZXMucHVzaChrZXkpXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxufTtcblxudmFyIGZvckVhY2ggPSBmdW5jdGlvbiAoeHMsIGZuKSB7XG4gICAgaWYgKHhzLmZvckVhY2gpIHJldHVybiB4cy5mb3JFYWNoKGZuKVxuICAgIGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmbih4c1tpXSwgaSwgeHMpO1xuICAgIH1cbn07XG5cbnZhciBkZWZpbmVQcm9wID0gKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ18nLCB7fSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvYmosIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9O1xuICAgIH1cbn0oKSk7XG5cbnZhciBnbG9iYWxzID0gWydBcnJheScsICdCb29sZWFuJywgJ0RhdGUnLCAnRXJyb3InLCAnRXZhbEVycm9yJywgJ0Z1bmN0aW9uJyxcbidJbmZpbml0eScsICdKU09OJywgJ01hdGgnLCAnTmFOJywgJ051bWJlcicsICdPYmplY3QnLCAnUmFuZ2VFcnJvcicsXG4nUmVmZXJlbmNlRXJyb3InLCAnUmVnRXhwJywgJ1N0cmluZycsICdTeW50YXhFcnJvcicsICdUeXBlRXJyb3InLCAnVVJJRXJyb3InLFxuJ2RlY29kZVVSSScsICdkZWNvZGVVUklDb21wb25lbnQnLCAnZW5jb2RlVVJJJywgJ2VuY29kZVVSSUNvbXBvbmVudCcsICdlc2NhcGUnLFxuJ2V2YWwnLCAnaXNGaW5pdGUnLCAnaXNOYU4nLCAncGFyc2VGbG9hdCcsICdwYXJzZUludCcsICd1bmRlZmluZWQnLCAndW5lc2NhcGUnXTtcblxuZnVuY3Rpb24gQ29udGV4dCgpIHt9XG5Db250ZXh0LnByb3RvdHlwZSA9IHt9O1xuXG52YXIgU2NyaXB0ID0gZXhwb3J0cy5TY3JpcHQgPSBmdW5jdGlvbiBOb2RlU2NyaXB0IChjb2RlKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNjcmlwdCkpIHJldHVybiBuZXcgU2NyaXB0KGNvZGUpO1xuICAgIHRoaXMuY29kZSA9IGNvZGU7XG59O1xuXG5TY3JpcHQucHJvdG90eXBlLnJ1bkluQ29udGV4dCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIENvbnRleHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJuZWVkcyBhICdjb250ZXh0JyBhcmd1bWVudC5cIik7XG4gICAgfVxuICAgIFxuICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZiAoIWlmcmFtZS5zdHlsZSkgaWZyYW1lLnN0eWxlID0ge307XG4gICAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIFxuICAgIHZhciB3aW4gPSBpZnJhbWUuY29udGVudFdpbmRvdztcbiAgICB2YXIgd0V2YWwgPSB3aW4uZXZhbCwgd0V4ZWNTY3JpcHQgPSB3aW4uZXhlY1NjcmlwdDtcblxuICAgIGlmICghd0V2YWwgJiYgd0V4ZWNTY3JpcHQpIHtcbiAgICAgICAgLy8gd2luLmV2YWwoKSBtYWdpY2FsbHkgYXBwZWFycyB3aGVuIHRoaXMgaXMgY2FsbGVkIGluIElFOlxuICAgICAgICB3RXhlY1NjcmlwdC5jYWxsKHdpbiwgJ251bGwnKTtcbiAgICAgICAgd0V2YWwgPSB3aW4uZXZhbDtcbiAgICB9XG4gICAgXG4gICAgZm9yRWFjaChPYmplY3Rfa2V5cyhjb250ZXh0KSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB3aW5ba2V5XSA9IGNvbnRleHRba2V5XTtcbiAgICB9KTtcbiAgICBmb3JFYWNoKGdsb2JhbHMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGNvbnRleHRba2V5XSkge1xuICAgICAgICAgICAgd2luW2tleV0gPSBjb250ZXh0W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICB2YXIgd2luS2V5cyA9IE9iamVjdF9rZXlzKHdpbik7XG5cbiAgICB2YXIgcmVzID0gd0V2YWwuY2FsbCh3aW4sIHRoaXMuY29kZSk7XG4gICAgXG4gICAgZm9yRWFjaChPYmplY3Rfa2V5cyh3aW4pLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIC8vIEF2b2lkIGNvcHlpbmcgY2lyY3VsYXIgb2JqZWN0cyBsaWtlIGB0b3BgIGFuZCBgd2luZG93YCBieSBvbmx5XG4gICAgICAgIC8vIHVwZGF0aW5nIGV4aXN0aW5nIGNvbnRleHQgcHJvcGVydGllcyBvciBuZXcgcHJvcGVydGllcyBpbiB0aGUgYHdpbmBcbiAgICAgICAgLy8gdGhhdCB3YXMgb25seSBpbnRyb2R1Y2VkIGFmdGVyIHRoZSBldmFsLlxuICAgICAgICBpZiAoa2V5IGluIGNvbnRleHQgfHwgaW5kZXhPZih3aW5LZXlzLCBrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgY29udGV4dFtrZXldID0gd2luW2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvckVhY2goZ2xvYmFscywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIShrZXkgaW4gY29udGV4dCkpIHtcbiAgICAgICAgICAgIGRlZmluZVByb3AoY29udGV4dCwga2V5LCB3aW5ba2V5XSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgXG4gICAgcmV0dXJuIHJlcztcbn07XG5cblNjcmlwdC5wcm90b3R5cGUucnVuSW5UaGlzQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXZhbCh0aGlzLmNvZGUpOyAvLyBtYXliZS4uLlxufTtcblxuU2NyaXB0LnByb3RvdHlwZS5ydW5Jbk5ld0NvbnRleHQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBjdHggPSBTY3JpcHQuY3JlYXRlQ29udGV4dChjb250ZXh0KTtcbiAgICB2YXIgcmVzID0gdGhpcy5ydW5JbkNvbnRleHQoY3R4KTtcblxuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgIGZvckVhY2goT2JqZWN0X2tleXMoY3R4KSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgY29udGV4dFtrZXldID0gY3R4W2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59O1xuXG5mb3JFYWNoKE9iamVjdF9rZXlzKFNjcmlwdC5wcm90b3R5cGUpLCBmdW5jdGlvbiAobmFtZSkge1xuICAgIGV4cG9ydHNbbmFtZV0gPSBTY3JpcHRbbmFtZV0gPSBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICB2YXIgcyA9IFNjcmlwdChjb2RlKTtcbiAgICAgICAgcmV0dXJuIHNbbmFtZV0uYXBwbHkocywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9O1xufSk7XG5cbmV4cG9ydHMuaXNDb250ZXh0ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICByZXR1cm4gY29udGV4dCBpbnN0YW5jZW9mIENvbnRleHQ7XG59O1xuXG5leHBvcnRzLmNyZWF0ZVNjcmlwdCA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuU2NyaXB0KGNvZGUpO1xufTtcblxuZXhwb3J0cy5jcmVhdGVDb250ZXh0ID0gU2NyaXB0LmNyZWF0ZUNvbnRleHQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBjb3B5ID0gbmV3IENvbnRleHQoKTtcbiAgICBpZih0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZm9yRWFjaChPYmplY3Rfa2V5cyhjb250ZXh0KSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgY29weVtrZXldID0gY29udGV4dFtrZXldO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvcHk7XG59O1xuIiwiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSAnLi9zcHJpdGUnO1xyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uIGV4dGVuZHMgU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3Ioe2ltYWdlTmFtZSwgZnJhbWVzLCBzcGVlZCwgcmVwZWF0ID0gdHJ1ZSwgYXV0b3J1biA9IHRydWUsIHdpZHRoID0gNjQsIGhlaWdodCA9IDY0fSl7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgIGltYWdlTmFtZTogaW1hZ2VOYW1lLFxyXG4gICAgICAgIHNvdXJjZVg6IGZyYW1lc1swXS5zeCxcclxuICAgICAgICBzb3VyY2VZOiBmcmFtZXNbMF0uc3ksXHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMucmVwZWF0ID0gcmVwZWF0O1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGF1dG9ydW47XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMudG90YWxGcmFtZXMgPSB0aGlzLmZyYW1lcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBzZXRGcmFtZShpbmRleCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSBpbmRleDtcclxuICAgICAgICB0aGlzLnNvdXJjZVggPSB0aGlzLmZyYW1lc1tpbmRleF0uc3g7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VZID0gdGhpcy5mcmFtZXNbaW5kZXhdLnN5O1xyXG4gICAgfVxyXG4gICAgcnVuKCl7XHJcbiAgICAgICAgaWYoIXRoaXMucnVubmluZyl7XHJcbiAgICAgICAgdGhpcy5zZXRGcmFtZSgwKTtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIG5leHRGcmFtZSgpe1xyXG4gICAgICAgIGlmKCh0aGlzLmN1cnJlbnRGcmFtZSArMSk9PT0gdGhpcy50b3RhbEZyYW1lcyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVwZWF0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RnJhbWUoMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRGcmFtZSh0aGlzLmN1cnJlbnRGcmFtZSArMSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZSl7XHJcbiAgICAgICAgaWYoIXRoaXMucnVubmluZyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sYXN0VGltZSA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aW1lLXRoaXMubGFzdFRpbWUpPnRoaXMuc3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm5leHRGcmFtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi92ZWN0b3JcIjtcclxuaW1wb3J0IHtDaGFyYWN0ZXJTaGVldH0gZnJvbSAnLi9jaGFyYWN0ZXItc2hlZXQnO1xyXG5leHBvcnQgY2xhc3MgQm9keXtcclxuICAgIGNvbnN0cnVjdG9yKHtpbWFnZU5hbWUsIHNwZWVkfSl7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7fTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBhbmltYXRpb25zU2hlZXQgPSBuZXcgQ2hhcmFjdGVyU2hlZXQoe2ltYWdlTmFtZX0pO1xyXG4gICAgICAgIGBzcGVsbF9vbl9jYWdlLHNwZWxsX2dpdmVzX3Byb2R1Y3Qsc3RhbmQsYmlydGgsYWN0aW9uLGVhdGAuc3BsaXQoYCxgKS5mb3JFYWNoKChuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1tuYW1lXSA9IGFuaW1hdGlvbnNTaGVldC5nZXRBbmltYXRpb24obmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdGFuZCgpO1xyXG4gICAgfVxyXG4gICAgc3RhbmQoKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMudmlldyA9IHRoaXMuYW5pbWF0aW9uc1tgc3RhbmRgXTtcclxuICAgICAgICB0aGlzLnZpZXcuc3RvcCgpO1xyXG4gICAgfVxyXG4gICAgYmlydGgoKXtcclxuICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLmFuaW1hdGlvbnNbYGJpcnRoYF07XHJcbiAgICAgICAgdGhpcy52aWV3LnJ1bigpO1xyXG4gICAgfVxyXG4gICAgYWN0aW9uT24oKXtcclxuICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLmFuaW1hdGlvbnNbYGFjdGlvbmBdO1xyXG4gICAgICAgIHRoaXMudmlldy5zdG9wKCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZSl7XHJcbiAgICAgICAgaWYodGhpcy5sYXN0VGltZSA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRoaXMudmlldy5zZXRYWShNYXRoLnRydW5jKHRoaXMueCksTWF0aC50cnVuYyh0aGlzLnkpKTtcclxuICAgICAgICB0aGlzLnZpZXcudXBkYXRlKHRpbWUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3ByaXRlU2hlZXQgfSBmcm9tIFwiLi9zcHJpdGUtc2hlZXRcIjtcclxuaW1wb3J0IHtXSURUSF9BTklNQVRJT04sIEhFSUdIVF9BTk1BVElPTn0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5jb25zdCBXSURUSF9PTEQgPSA4MzI7XHJcbmNvbnN0IEhFSUdIVF9PTEQgPSAxMzQ0O1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJTaGVldCBleHRlbmRzIFNwcml0ZVNoZWV0e1xyXG4gICAgY29uc3RydWN0b3Ioe2ltYWdlTmFtZX0pe1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lLFxyXG4gICAgICAgICAgICBpbWFnZVdpZHRoOiBXSURUSF9BTklNQVRJT04sXHJcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0OiBIRUlHSFRfQU5NQVRJT05cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlcXVlbmNlcyA9IHRoaXMuZ2V0U2VxdWVuY2VzKCk7XHJcbiAgICB9XHJcbiAgICBnZXRTZXF1ZW5jZXMoKXtcclxuICAgICAgICBjb25zdCBkYXRhID0gcmVxdWlyZShgLi9tYXBzL2FuaW1hdGlvbnMuanNvbmApO1xyXG4gICAgICAgIGNvbnN0IHNlcXVlbmNlcyAgPSB7fTtcclxuICAgICAgICBkYXRhLmxheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xyXG4gICAgICAgICAgICBzZXF1ZW5jZXNbbGF5ZXIubmFtZV0gPSBsYXllci5kYXRhLmZpbHRlcigoaSkgPT4gaT4wKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VzO1xyXG4gICAgfTtcclxuICAgIGdldEFuaW1hdGlvbihuYW1lLCBzcGVlZCA9IDEwMCwgcmVwZWF0ID0gdHJ1ZSwgYXV0b3J1biA9IHRydWUpe1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRBbmltYXRpb24odGhpcy5zZXF1ZW5jZXNbbmFtZV0sc3BlZWQsIHJlcGVhdCwgYXV0b3J1bik7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgR0FNRV9XSURUSCA9IDY0MDtcclxuZXhwb3J0IGNvbnN0IEdBTUVfSEVJR1RIPSA2NDA7XHJcbmV4cG9ydCBjb25zdCBXT1JLSU5HX1dJRFRIID0gR0FNRV9XSURUSCAtIDEyODtcclxuZXhwb3J0IGNvbnN0IFdPUktJTkdfSEVJR1RIID0gR0FNRV9IRUlHVEg7XHJcbmV4cG9ydCBjb25zdCBNRU5VX0hFSUdUSCA9IEdBTUVfSEVJR1RILTEyODtcclxuZXhwb3J0IGNvbnN0IFNQUklURV9XSURUSCA9IDY0O1xyXG5leHBvcnQgY29uc3QgU1BSSVRFX0hFSUdUSCA9IDY0O1xyXG5leHBvcnQgY29uc3QgV0lEVEhfQU5JTUFUSU9OID0gNzA0O1xyXG5leHBvcnQgY29uc3QgSEVJR0hUX0FOTUFUSU9OID0gMzg0O1xyXG4iLCJleHBvcnQgY2xhc3MgQ29udHJvbFN0YXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudXAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5maXJlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbW91bnRDaGFyYWN0ZXJzID0gbmV3IE1hcChbXHJcbiAgICAgICAgICAgIFtgd2hlYXRgLCBgYW1vdW50V2hlYXRgXSwgW2Bjb3dgLCBgYW1vdW50Q293c2BdLCBbYGNoaWNrZW5gLCBgYW1vdW50Q2hpY2tlbnNgXVxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyc0h1ZCA9IG5ldyBNYXAoW1xyXG4gICAgICAgICAgICBbYHdoZWF0YCwgYGFtb3VudEZlZWRgXSwgW2Bjb3dgLCBgYW1vdW50TWlsa2BdLCBbYGNoaWNrZW5gLCBgYW1vdW50RWdnc2BdXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgdGhpcy5rZXlNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgICAgICAgWzM3LCBgbGVmdGBdLCBbMzksIGByaWdodGBdLCBbMzgsIGB1cGBdLCBbNDAsIGBkb3duYF0sIFszMiwgYGZpcmVgXVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihga2V5ZG93bmAsIChldmVudCkgPT4gdGhpcy51cGRhdGUoZXZlbnQsIHRydWUpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBrZXl1cGAsIChldmVudCkgPT4gdGhpcy51cGRhdGUoZXZlbnQsIGZhbHNlKSk7XHJcbiAgICAgICAgLy/QvtCx0YnQtdC1INGB0L7RgdGC0L7Rj9C90LjQtSDQuNCz0YDRi1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgd2hlYXRgLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYGNoYXJhY3RlcmAsXHJcbiAgICAgICAgICAgICAgICB4OiA2NCxcclxuICAgICAgICAgICAgICAgIHk6IDUxMixcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJpcnRoVGltZTogMTAsXHJcbiAgICAgICAgICAgICAgICByZXBlYXQ6IC0xLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYCwgYGJpcnRoYCwgYGFjdGlvbk9uYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYHdoZWF0YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IGBjaGFyYWN0ZXJgLFxyXG4gICAgICAgICAgICAgICAgeDogNjQsXHJcbiAgICAgICAgICAgICAgICB5OiA1MTIsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBiaXJ0aFRpbWU6IDEwLFxyXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAtMSxcclxuICAgICAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogW2BzdGFuZGAsIGBiaXJ0aGAsIGBhY3Rpb25PbmBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGBjb3dgLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYGNoYXJhY3RlcmAsXHJcbiAgICAgICAgICAgICAgICB4OiAxOTIsXHJcbiAgICAgICAgICAgICAgICB5OiA1MTIsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBiaXJ0aFRpbWU6IDIwLFxyXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAxLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYCwgYGJpcnRoYCwgYHN0YW5kYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYGNoaWNrZW5gLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYGNoYXJhY3RlcmAsXHJcbiAgICAgICAgICAgICAgICB4OiAzMjAsXHJcbiAgICAgICAgICAgICAgICB5OiA1MTIsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBiaXJ0aFRpbWU6IDEwLFxyXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAzLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYCwgYGJpcnRoYCwgYHN0YW5kYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYGFtb3VudFdoZWF0YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IGBvYmplY3RgLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WDogMTI4LFxyXG4gICAgICAgICAgICAgICAgdGV4dFk6IDU1NixcclxuICAgICAgICAgICAgICAgIG5vcm1hbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5vcm1hbENvbG9yOiBgIzAwMDBGRmAsXHJcbiAgICAgICAgICAgICAgICBkYW5nZXJDb2xvcjogYCNGRjAwMDBgLFxyXG4gICAgICAgICAgICAgICAgeDogNjQsXHJcbiAgICAgICAgICAgICAgICB5OiA1MTIsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYGFtb3VudENvd3NgLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYG9iamVjdGAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIHRleHRYOiAyNTIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WTogNTU2LFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsQ29sb3I6IGAjMDAwMEZGYCxcclxuICAgICAgICAgICAgICAgIGRhbmdlckNvbG9yOiBgI0ZGMDAwMGAsXHJcbiAgICAgICAgICAgICAgICB4OiAxOTIsXHJcbiAgICAgICAgICAgICAgICB5OiA1MTIsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYGFtb3VudENoaWNrZW5zYCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IGBvYmplY3RgLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WDogMzgwLFxyXG4gICAgICAgICAgICAgICAgdGV4dFk6IDU1NixcclxuICAgICAgICAgICAgICAgIG5vcm1hbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5vcm1hbENvbG9yOiBgIzAwMDBGRmAsXHJcbiAgICAgICAgICAgICAgICBkYW5nZXJDb2xvcjogYCNGRjAwMDBgLFxyXG4gICAgICAgICAgICAgICAgeDogMzIwLFxyXG4gICAgICAgICAgICAgICAgeTogNTEyLFxyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogW2BzdGFuZGBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGBhbW91bnRDb2luc2AsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBgb2JqZWN0YCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgdGV4dFg6IDU3NixcclxuICAgICAgICAgICAgICAgIHRleHRZOiAxMDgsXHJcbiAgICAgICAgICAgICAgICBub3JtYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsQ29sb3I6IGAjMDAwMEZGYCxcclxuICAgICAgICAgICAgICAgIGRhbmdlckNvbG9yOiBgI0ZGMDAwMGAsXHJcbiAgICAgICAgICAgICAgICB4OiA1MTIsXHJcbiAgICAgICAgICAgICAgICB5OiA2NCxcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFtgc3RhbmRgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgYW1vdW50RWdnc2AsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBgb2JqZWN0YCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgdGV4dFg6IDU3NixcclxuICAgICAgICAgICAgICAgIHRleHRZOiAyMzYsXHJcbiAgICAgICAgICAgICAgICBzdGFydFg6IDUxMixcclxuICAgICAgICAgICAgICAgIHN0YXJ0WTogMTkyLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5vcm1hbENvbG9yOiBgIzAwMDBGRmAsXHJcbiAgICAgICAgICAgICAgICBkYW5nZXJDb2xvcjogYCNGRjAwMDBgLFxyXG4gICAgICAgICAgICAgICAgeDogNTEyLFxyXG4gICAgICAgICAgICAgICAgeTogMTkyLFxyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogW2BzdGFuZGBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGBhbW91bnRNaWxrYCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IGBvYmplY3RgLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WDogNTc2LFxyXG4gICAgICAgICAgICAgICAgdGV4dFk6IDM2NCxcclxuICAgICAgICAgICAgICAgIHN0YXJ0WDogNTEyLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRZOiAzMjAsXHJcbiAgICAgICAgICAgICAgICBub3JtYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsQ29sb3I6IGAjMDAwMEZGYCxcclxuICAgICAgICAgICAgICAgIGRhbmdlckNvbG9yOiBgI0ZGMDAwMGAsXHJcbiAgICAgICAgICAgICAgICB4OiA1MTIsXHJcbiAgICAgICAgICAgICAgICB5OiAzMjAsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBbYHN0YW5kYF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYGFtb3VudEZlZWRgLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogYG9iamVjdGAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgIHRleHRYOiA1NzYsXHJcbiAgICAgICAgICAgICAgICB0ZXh0WTogNDkyLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5vcm1hbENvbG9yOiBgIzAwMDBGRmAsXHJcbiAgICAgICAgICAgICAgICBkYW5nZXJDb2xvcjogYCNGRjAwMDBgLFxyXG4gICAgICAgICAgICAgICAgeDogNTEyLFxyXG4gICAgICAgICAgICAgICAgeTogNDQ4LFxyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogW2BzdGFuZGBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbiAgICB1cGRhdGUoZXZlbnQsIHByZXNzZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5rZXlNYXAuaGFzKGV2ZW50LmtleUNvZGUpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzW3RoaXMua2V5TWFwLmdldChldmVudC5rZXlDb2RlKV0gPSBwcmVzc2VkO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL9C70L7Qs9C40LrQsCDQuNCz0YDRi1xyXG4gICAgX2NoYW5nZVN0YXRlKHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlLmNvdW50ZXIgPT09IChzdGF0ZS5iZWhhdmlvci5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5jb3VudGVyID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGF0ZS5jb3VudGVyKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2NoYW5nZUh1ZChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5zdGF0ZXMpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS52YWx1ZSArPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9ybWFsID0gaXRlbS52YWx1ZSA9PT0gMCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2dldEZlZWQoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnN0YXRlcykge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09PSBgYW1vdW50RmVlZGApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/QnNC10YXQsNC90LjQutCwINC40LPRgNGLXHJcbiAgICBwbGF5KHN0YXRlLCBldmVudE9jY3VycmVkKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50T2NjdXJyZWQgPT09IGBuZWVkQWN0aW9uYCkge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUubmFtZSA9PT0gYHdoZWF0YCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUucmVwZWF0LS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VIdWQodGhpcy5jaGFyYWN0ZXJzSHVkLmdldChzdGF0ZS5uYW1lKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUucmVwZWF0ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5uYW1lID09PSBgY293YCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5yZXBlYXQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnJlcGVhdCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudE9jY3VycmVkID09PSBgbW91c2V1cGApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhbmdlSHVkKHRoaXMuYW1vdW50Q2hhcmFjdGVycy5nZXQoc3RhdGUubmFtZSksIC0xKVxyXG4gICAgICAgICAgICBpZiAoc3RhdGUubmFtZSA9PT0gYHdoZWF0YCkgdGhpcy5fY2hhbmdlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRPY2N1cnJlZCA9PT0gYGNsaWNrYCkge1xyXG4gICAgICAgICAgICBjb25zdCBmZWVkID0gdGhpcy5fZ2V0RmVlZCgpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUubmFtZSA9PT0gYHdoZWF0YCAmJiBzdGF0ZS5iZWhhdmlvcltzdGF0ZS5jb3VudGVyXSA9PT0gYGFjdGlvbk9uYCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSHVkKGBhbW91bnRGZWVkYCwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGlmICgoc3RhdGUubmFtZSA9PT0gYGNvd2AgfHwgc3RhdGUubmFtZSA9PT0gYGNoaWNrZW5gKSAmJiBmZWVkLnZhbHVlID4gMCAmJiBzdGF0ZS5iZWhhdmlvcltzdGF0ZS5jb3VudGVyXSA9PT0gYHN0YW5kYCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSHVkKGBhbW91bnRGZWVkYCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBpZiAoc3RhdGUubmFtZSA9PT0gYGFtb3VudE1pbGtgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUudmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSHVkKGBhbW91bnRDb2luc2AsIDIgKiBzdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSHVkKGBhbW91bnRNaWxrYCwgLXN0YXRlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgaWYgKHN0YXRlLm5hbWUgPT09IGBhbW91bnRFZ2dzYCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUh1ZChgYW1vdW50Q29pbnNgLCBzdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSHVkKGBhbW91bnRFZ2dzYCwgLXN0YXRlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY3JlZW4gfSBmcm9tIFwiLi9zcmVlblwiO1xyXG5pbXBvcnQge0xvYWRpbmd9IGZyb20gJy4vc2NlbmVzL2xvYWRpbmcnO1xyXG5pbXBvcnQgeyBNZW51IH0gZnJvbSBcIi4vc2NlbmVzL21lbnVcIjtcclxuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi9zY2VuZVwiO1xyXG5pbXBvcnQgeyBDb250cm9sU3RhdGUgfSBmcm9tIFwiLi9jb250cm9sLXN0YXRlXCI7XHJcbmltcG9ydCB7IEdhbWVMZXZlbCB9IGZyb20gXCIuL3NjZW5lcy9nYW1lLWxldmVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZXtcclxuICAgIGNvbnN0cnVjdG9yKHt3aWR0aCA9IDY0MCwgaGVpZ2h0ID0gNjQwfSA9IHt9KXtcclxuICAgICAgICB0aGlzLnNjcmVlbiA9IG5ldyBTY3JlZW4od2lkdGgsaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnNjcmVlbi5sb2FkSW1hZ2VzKHtcclxuICAgICAgICAgICAgY293OiBgaW1nL2Nvdy5wbmdgLFxyXG4gICAgICAgICAgICBjaGlja2VuOiBgaW1nL2NoaWNrZW4ucG5nYCxcclxuICAgICAgICAgICAgd2hlYXQ6IGBpbWcvd2hlYXQucG5nYCxcclxuICAgICAgICAgICAgYW1vdW50Q2hpY2tlbnM6IGBpbWcvYW1vdW50Q2hpY2tlbnMucG5nYCxcclxuICAgICAgICAgICAgYW1vdW50Q29pbnM6IGBpbWcvYW1vdW50Q29pbnMucG5nYCxcclxuICAgICAgICAgICAgYW1vdW50Q293czogYGltZy9hbW91bnRDb3dzLnBuZ2AsXHJcbiAgICAgICAgICAgIGFtb3VudEVnZ3M6IGBpbWcvYW1vdW50RWdncy5wbmdgLFxyXG4gICAgICAgICAgICBhbW91bnRGZWVkOiBgaW1nL2Ftb3VudEZlZWQucG5nYCxcclxuICAgICAgICAgICAgYW1vdW50TWlsazogYGltZy9hbW91bnRNaWxrLnBuZ2AsXHJcbiAgICAgICAgICAgIGFtb3VudFdoZWF0OiBgaW1nL2Ftb3VudFdoZWF0LnBuZ2AsXHJcbiAgICAgICAgICAgIHRpdGxlOiBgaW1nL3RpdGxlLmpwZ2AsXHJcbiAgICAgICAgICAgIHRpbGVzOiBgaW1nL3RpbGVzLnBuZ2BcclxuICAgICAgICB9KTsgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb250cm9sID0gbmV3IENvbnRyb2xTdGF0ZSgpOyBcclxuICAgICAgICB0aGlzLnNjZW5lcyA9IHtcclxuICAgICAgICAgICAgbG9hZGluZzogbmV3IExvYWRpbmcodGhpcyksXHJcbiAgICAgICAgICAgIG1lbnU6IG5ldyBNZW51KHRoaXMpLFxyXG4gICAgICAgICAgICBnYW1lTGV2ZWw6IG5ldyBHYW1lTGV2ZWwodGhpcylcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gdGhpcy5zY2VuZXMubG9hZGluZztcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VTY2VuZShzdGF0dXMpe1xyXG4gICAgICAgIHN3aXRjaChzdGF0dXMpe1xyXG4gICAgICAgICAgICBjYXNlIFNjZW5lLkxPQURFRDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lcy5tZW51O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmUuU1RBUlRfR0FNRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lcy5nYW1lTGV2ZWw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lcy5tZW51O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZyYW1lKHRpbWUpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNjZW5lLnN0YXR1cyAhPT0gU2NlbmUuV09SS0lORyl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gdGhpcy5jaGFuZ2VTY2VuZSh0aGlzLmN1cnJlbnRTY2VuZS5zdGF0dXMpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lLnJlbmRlcih0aW1lKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMuZnJhbWUodGltZSkpO1xyXG4gICAgfVxyXG4gICAgcnVuKCl7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lKSA9PiB0aGlzLmZyYW1lKHRpbWUpKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi9ib2R5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSHVkSXRlbSBleHRlbmRzIEJvZHkge1xyXG4gICAgY29uc3RydWN0b3IoaW1hZ2VOYW1lLCBzdGF0ZSkge1xyXG4gICAgICAgIHN1cGVyKHsgaW1hZ2VOYW1lLCBzcGVlZDogNTAgfSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IGB4ICR7dGhpcy5zdGF0ZS52YWx1ZX1gO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLnN0YXRlLm5vcm1hbCA/IHRoaXMuc3RhdGUubm9ybWFsQ29sb3IgOiB0aGlzLnN0YXRlLmRhbmdlckNvbG9yLCAgICAgICAgXHJcbiAgICAgICAgdGhpcy50ZXh0WCA9IHRoaXMuc3RhdGUudGV4dFg7XHJcbiAgICAgICAgdGhpcy50ZXh0WSA9IHRoaXMuc3RhdGUudGV4dFk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IGB4ICR7dGhpcy5zdGF0ZS52YWx1ZX1gO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLnN0YXRlLm5vcm1hbCA/IHRoaXMuc3RhdGUubm9ybWFsQ29sb3IgOiB0aGlzLnN0YXRlLmRhbmdlckNvbG9yLCAgICAgICAgXHJcbiAgICAgICAgdGhpcy50ZXh0WCA9IHRoaXMuc3RhdGUudGV4dFg7XHJcbiAgICAgICAgdGhpcy50ZXh0WSA9IHRoaXMuc3RhdGUudGV4dFk7XHJcbiAgICAgICAgdGhpcy5zdGFuZCgpO1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcclxuICAgIH1cclxuICAgIG5lZWRBY3Rpb24oKSB7IH1cclxufSIsImV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlcntcclxuICAgIGNvbnN0cnVjdG9yKGltYWdlRmlsZXMpe1xyXG4gICAgICAgIHRoaXMuaW1hZ2VGaWxlcyA9IGltYWdlRmlsZXM7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSB7fTtcclxuICAgIH1cclxuICAgIGxvYWQoKXtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gW107XHJcbiAgICAgICAgZm9yKGxldCBuYW1lIGluIHRoaXMuaW1hZ2VGaWxlcyl7XHJcbiAgICAgICAgICAgIHByb21pc2UucHVzaCh0aGlzLmxvYWRJbWFnZShuYW1lLCB0aGlzLmltYWdlRmlsZXNbbmFtZV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2UpO1xyXG4gICAgfVxyXG4gICAgbG9hZEltYWdlKG5hbWUsIHNyYyl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW25hbWVdID0gaW1hZ2U7XHJcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHJlc29sdmUobmFtZSk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyYztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtHYW1lfSBmcm9tICcuL2dhbWUnXHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZmFybSA9IG5ldyBHYW1lKCk7XHJcbiAgICBmYXJtLnJ1bigpO1xyXG59IiwiaW1wb3J0IHsgV09SS0lOR19XSURUSCwgV09SS0lOR19IRUlHVEgsIE1FTlVfSEVJR1RILCBTUFJJVEVfV0lEVEgsIFNQUklURV9IRUlHVEggfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW91c2V7XHJcbiAgICBjb25zdHJ1Y3RvcihjaGFyYWN0ZXJzLCBjb250cm9sKXtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xyXG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XHJcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm1vdXNlTW92ZUhhbmRsZXIgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb3VzZVVwSGFuZGxlciA9IHRoaXMub25Nb3VzZVVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5maW5kZWRDaGFyYWN0ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhcnRDb29yZHMgPSB7IHg6IDAsIHk6IDAgfTtcclxuICAgICAgICB0aGlzLmJlZ2luQ29vcmRzID0geyB4OiAwLCB5OiAwIH07XHJcbiAgICAgICAgdGhpcy5kcmFnZ2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL9GA0LDQsdC+0YLQsCDRgSDQvNGL0YjRjNGOINC4INGA0LXQsNC60YbQuNC10Lkg0L3QsCDQvdCw0LbQsNGC0LjQtVxyXG4gICAgb25Nb3VzZURvd24oZXZ0KSB7XHJcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydENvb3JkcyA9IHtcclxuICAgICAgICAgICAgeDogZXZ0LmNsaWVudFgsXHJcbiAgICAgICAgICAgIHk6IGV2dC5jbGllbnRZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlTW92ZShtb3ZlRXZ0KSB7XHJcbiAgICAgICAgbW92ZUV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5maW5kZWRDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmNoYXJhY3RlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5zdGF0ZS5kcmFnZ2FibGUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKChpdGVtLnZpZXcueCA8PSBtb3ZlRXZ0LmNsaWVudFggJiYgKGl0ZW0udmlldy54ICsgaXRlbS52aWV3LndpZHRoKSA+PSBtb3ZlRXZ0LmNsaWVudFgpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW0udmlldy55IDw9IG1vdmVFdnQuY2xpZW50WSAmJiAoaXRlbS52aWV3LnkgKyBpdGVtLnZpZXcuaGVpZ2h0KSA+PSBtb3ZlRXZ0LmNsaWVudFkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kZWRDaGFyYWN0ZXIgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5Db29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuZmluZGVkQ2hhcmFjdGVyLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuZmluZGVkQ2hhcmFjdGVyLnlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRlbnRYID0gdGhpcy5maW5kZWRDaGFyYWN0ZXIueCArIFNQUklURV9XSURUSCAtIG1vdmVFdnQuY2xpZW50WDtcclxuICAgICAgICAgICAgY29uc3QgaW5kZW50WSA9IHRoaXMuZmluZGVkQ2hhcmFjdGVyLnkgKyBTUFJJVEVfSEVJR1RIIC0gbW92ZUV2dC5jbGllbnRZO1xyXG4gICAgICAgICAgICBpZiAoKG1vdmVFdnQuY2xpZW50WCA+PSBpbmRlbnRYICYmIG1vdmVFdnQuY2xpZW50WCA8PSBXT1JLSU5HX1dJRFRIIC0gKGluZGVudFgpKSAmJlxyXG4gICAgICAgICAgICAgICAgKG1vdmVFdnQuY2xpZW50WSA+PSBpbmRlbnRZICYmIG1vdmVFdnQuY2xpZW50WSA8PSBXT1JLSU5HX0hFSUdUSCAtIChpbmRlbnRZKSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzaGlmdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLnN0YXJ0Q29vcmRzLnggLSBtb3ZlRXZ0LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zdGFydENvb3Jkcy55IC0gbW92ZUV2dC5jbGllbnRZXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydENvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBtb3ZlRXZ0LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogbW92ZUV2dC5jbGllbnRZXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0Nvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLmZpbmRlZENoYXJhY3Rlci54IC0gc2hpZnQueCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmZpbmRlZENoYXJhY3Rlci55IC0gc2hpZnQueVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyLnggPSBuZXdDb29yZHMueFxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kZWRDaGFyYWN0ZXIueSA9IG5ld0Nvb3Jkcy55XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRvUHJldmlvdXNQbGFjZSgpIHtcclxuICAgICAgICB0aGlzLmZpbmRlZENoYXJhY3Rlci54ID0gdGhpcy5iZWdpbkNvb3Jkcy54O1xyXG4gICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyLnkgPSB0aGlzLmJlZ2luQ29vcmRzLnk7XHJcbiAgICAgICAgdGhpcy5maW5kZWRDaGFyYWN0ZXIuc3RhdGUuZHJhZ2dhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIG9uTW91c2VVcCh1cEV2dCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbmRlZENoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAodXBFdnQuY2xpZW50WSA+IE1FTlVfSEVJR1RIKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvUHJldmlvdXNQbGFjZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cEV2dC5jbGllbnRYIDwgV09SS0lOR19XSURUSCAmJiB1cEV2dC5jbGllbnRZIDwgTUVOVV9IRUlHVEgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZGVkQ2hhcmFjdGVyLnggPSAoTWF0aC50cnVuYyh1cEV2dC5jbGllbnRYIC8gU1BSSVRFX1dJRFRIKSkgKiBTUFJJVEVfV0lEVEg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRlZENoYXJhY3Rlci55ID0gKE1hdGgudHJ1bmModXBFdnQuY2xpZW50WSAvIFNQUklURV9IRUlHVEgpKSAqIFNQUklURV9IRUlHVEg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRlZENoYXJhY3Rlci5zdGF0ZS5kcmFnZ2FibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5jaGFyYWN0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gPT0gdGhpcy5maW5kZWRDaGFyYWN0ZXIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoaXRlbS52aWV3LnggPD0gdGhpcy5maW5kZWRDaGFyYWN0ZXIueCAmJiAoaXRlbS52aWV3LnggKyBpdGVtLnZpZXcud2lkdGgpID49IHRoaXMuZmluZGVkQ2hhcmFjdGVyLngpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtLnZpZXcueSA8PSB0aGlzLmZpbmRlZENoYXJhY3Rlci55ICYmIChpdGVtLnZpZXcueSArIGl0ZW0udmlldy5oZWlnaHQpID49IHRoaXMuZmluZGVkQ2hhcmFjdGVyLnkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9QcmV2aW91c1BsYWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v0Lgg0LIg0LvQvtCz0LjQutGDINC40LPRgNGLXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmluZGVkQ2hhcmFjdGVyLnN0YXRlLmRyYWdnYWJsZSkgdGhpcy5jb250cm9sLnBsYXkodGhpcy5maW5kZWRDaGFyYWN0ZXIuc3RhdGUsIGBtb3VzZXVwYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdnZWQpIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpbmRlZENoYXJhY3RlciA9IG51bGw7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBIYW5kbGVyKTtcclxuICAgIH07XHJcbiAgICBvbkNsaWNrKGV2dCkge1xyXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5jaGFyYWN0ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICgoaXRlbS52aWV3LnggPD0gZXZ0LmNsaWVudFggJiYgKGl0ZW0udmlldy54ICsgaXRlbS52aWV3LndpZHRoKSA+PSBldnQuY2xpZW50WCkgJiZcclxuICAgICAgICAgICAgICAgIChpdGVtLnZpZXcueSA8PSBldnQuY2xpZW50WSAmJiAoaXRlbS52aWV3LnkgKyBpdGVtLnZpZXcuaGVpZ2h0KSA+PSBldnQuY2xpZW50WSkpIHtcclxuICAgICAgICAgICAgICAgIC8v0Lgg0LIg0LvQvtCz0LjQutGDINC40LPRgNGLXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wucGxheShpdGVtLnN0YXRlLCBgY2xpY2tgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIHRoaXMuY2xpY2tIYW5kbGVyKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi9ib2R5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgQm9keSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbWFnZU5hbWUsIHN0YXRlKSB7XHJcbiAgICAgICAgc3VwZXIoeyBpbWFnZU5hbWUsIHNwZWVkOiA1MCB9KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSAtMTtcclxuICAgICAgICB0aGlzLmNoYW5nZVRpbWUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5iZWhhdmlvclt0aGlzLnN0YXRlLmNvdW50ZXJdID09PSBgYmlydGhgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlydGgoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhbmdlVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aW1lIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmJlaGF2aW9yW3RoaXMuc3RhdGUuY291bnRlcl0gPT09IGBhY3Rpb25PbmApIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25PbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lID4gMCAmJiAodGltZSAvIDEwMDApID49ICh0aGlzLnN0YXJ0VGltZSArIHRoaXMuc3RhdGUuYmlydGhUaW1lKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRBY3Rpb24odGhpcy5zdGF0ZSwgYG5lZWRBY3Rpb25gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKHRpbWUpO1xyXG4gICAgfVxyXG4gICAgbmVlZEFjdGlvbigpIHsgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFNjZW5le1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHRoaXMuY29uc3RydWN0b3IuV09SS0lORztcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgV09SS0lORygpe3JldHVybiBgV09SS0lOR2A7fVxyXG4gICAgc3RhdGljIGdldCBMT0FERUQoKXtyZXR1cm4gYExPQURFRGA7fVxyXG4gICAgc3RhdGljIGdldCBTVEFSVF9HQU1FKCl7cmV0dXJuIGBTVEFSVF9HQU1FYDt9XHJcbiAgICBzdGF0aWMgZ2V0IEdBTUVfT1ZFUigpe3JldHVybiBgR0FNRV9PVkVSYDt9ICBcclxuICAgIHN0YXRpYyBnZXQgR0FNRV9XSU4oKXtyZXR1cm4gYEdBTUVfV0lOYDt9ICBcclxuICAgIHN0YXRpYyBnZXQgRklOSVNIRUQoKXtyZXR1cm4gYEZJTklTSEVEYDt9XHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB0aGlzLmNvbnN0cnVjdG9yLldPUktJTkc7XHJcbiAgICB9XHJcbiAgICBmaW5pc2goc3RhdHVzKXtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcclxuICAgIH1cclxuICAgIHJlbmRlcih0aW1lKXtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLi9zY2VuZVwiO1xyXG5pbXBvcnQgeyBTcHJpdGVTaGVldCB9IGZyb20gXCIuLi9zcHJpdGUtc2hlZXRcIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4uL3BsYXllclwiO1xyXG5pbXBvcnQgeyBIdWRJdGVtIH0gZnJvbSBcIi4uL2h1ZC1pdGVtXCI7XHJcbmltcG9ydCBNb3VzZSBmcm9tIFwiLi4vbW91c2VcIjtcclxuaW1wb3J0IHsgcnVuSW5UaGlzQ29udGV4dCB9IGZyb20gXCJ2bVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lTGV2ZWwgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSk7XHJcbiAgICAgICAgdGhpcy50aWxlcyA9IG5ldyBTcHJpdGVTaGVldCh7XHJcbiAgICAgICAgICAgIGltYWdlTmFtZTogYHRpbGVzYCxcclxuICAgICAgICAgICAgaW1hZ2VXaWR0aDogNjQwLFxyXG4gICAgICAgICAgICBpbWFnZUhlaWdodDogNjQwXHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICAvL9GA0L7QttC00LXQvdC40LUg0LLRgdC10YUg0L/QtdGA0YHQvtC90LDQttC10Lkg0Lgg0Y3Qu9C10LzQtdC90YLQvtCyINGF0LDQtNCwXHJcbiAgICAgICAgLy/RgdC/0LXRhtC40LDQu9GM0L3QviDQuNGB0L/QvtC70YzQt9GD0Y4g0L/RgNC40YHQstC+0LXQvdC40LUsINGH0YLQvtCx0Ysg0LzQvtC20L3QviDQsdGL0LvQviDQvtGC0YHQu9C10LbQuNCy0LDRgtGMINC+0LHRidC10LVcclxuICAgICAgICAvL9GB0L7RgdGC0L7Rj9C90LjQtSDQsiBjb250cm9sLXN0YXRlXHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5nYW1lLmNvbnRyb2wuc3RhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gYGNoYXJhY3RlcmApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IG5ldyBQbGF5ZXIoYCR7aXRlbS5uYW1lfWAsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyLnggPSBpdGVtLng7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIueSA9IGl0ZW0ueTtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlci5uZWVkQWN0aW9uID0gdGhpcy5nYW1lLmNvbnRyb2wucGxheS5iaW5kKHRoaXMuZ2FtZS5jb250cm9sKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVycy5wdXNoKGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBgb2JqZWN0YCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaHVkSXRlbSA9IG5ldyBIdWRJdGVtKGAke2l0ZW0ubmFtZX1gLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgIGh1ZEl0ZW0ueCA9IGl0ZW0ueDtcclxuICAgICAgICAgICAgICAgIGh1ZEl0ZW0ueSA9IGl0ZW0ueTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlcnMucHVzaChodWRJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyBcclxuICAgICAgICB0aGlzLmNoYXJhY3RlcnMuc29ydCgocHJldiwgbmV4dCkgPT4gcHJldi5jb25zdHJ1Y3Rvci5uYW1lLmNoYXJDb2RlQXQoMCkgLSBuZXh0LmNvbnN0cnVjdG9yLm5hbWUuY2hhckNvZGVBdCgwKSk7XHJcblxyXG4gICAgICAgIHRoaXMubW91c2UgPSBuZXcgTW91c2UodGhpcy5jaGFyYWN0ZXJzLHRoaXMuZ2FtZS5jb250cm9sKTtcclxuICAgIH1cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xyXG4gICAgICAgIGNvbnN0IG1hcERhdGEgPSByZXF1aXJlKGAuLi9tYXBzL2xldmVsMS5qc29uYCk7XHJcbiAgICAgICAgdGhpcy5tYXAgPSB0aGlzLmdhbWUuc2NyZWVuLmNyZWF0ZU1hcChgbGV2ZWwxYCwgbWFwRGF0YSwgdGhpcy50aWxlcylcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJzLmZvckVhY2goKGNoYXJhY3RlcikgPT4ge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXIudXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHRpbWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmZpbGwoYCMwMDAwMDBgKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmRyYXdTcHJpdGUodGhpcy5tYXApO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVycy5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtIGluc3RhbmNlb2YgUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmRyYXdTcHJpdGUoZWxlbS52aWV3KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZHJhd0h1ZChlbGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN1cGVyLnJlbmRlcih0aW1lKTtcclxuICAgIH0gICAgXHJcbn0iLCJpbXBvcnQge1NjZW5lfSBmcm9tICcuLi9zY2VuZSc7XHJcbmV4cG9ydCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgU2NlbmV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgICAgICB0aGlzLmxvYWRlZEF0ID0gMDtcclxuICAgIH0gICBcclxuICAgIGluaXQoKXtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRBdCA9IDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZSl7ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmxvYWRlZEF0ID09PSAwICYmIHRoaXMuZ2FtZS5zY3JlZW4uaXNJbWFnZXNMb2FkZWQgPT09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZEF0ID10aW1lOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvYWRlZEF0ICE9IDAgJiYgKHRpbWUgLSB0aGlzLmxvYWRlZEF0KSA+IDUwMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZmluaXNoKFNjZW5lLkxPQURFRCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICByZW5kZXIodGltZSl7XHJcbiAgICAgICAgdGhpcy51cGRhdGUodGltZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5maWxsKGAjMDAwMDAwYCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5wcmludCg1MCw3MCxg0JfQsNCz0YDRg9C30LrQsC4uLmApO1xyXG4gICAgICAgIHN1cGVyLnJlbmRlcih0aW1lKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSAnLi4vc2NlbmUnO1xyXG5pbXBvcnQgeyBHQU1FX1dJRFRILCBHQU1FX0hFSUdUSCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmV4cG9ydCBjbGFzcyBNZW51IGV4dGVuZHMgU2NlbmV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgIH1cclxuICAgIGluaXQoKXtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZSl7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lLmNvbnRyb2wuZmlyZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZmluaXNoKFNjZW5lLlNUQVJUX0dBTUUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcih0aW1lKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lKVxyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZHJhd0ltYWdlKDAsMCxgdGl0bGVgKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50KDIwMCwgR0FNRV9IRUlHVEgqMi8zLCBgI0ZGRkZGRmAsYEtPTUlLQVhfY3lyYCwgYNCd0LDQttC80LjRgtC1INC/0YDQvtCx0LXQu2ApO1xyXG4gICAgICAgIHN1cGVyLnJlbmRlcih0aW1lKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi9hbmltYXRpb25cIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlU2hlZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aW1hZ2VOYW1lLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgc3ByaXRlV2lkdGggPSA2NCwgc3ByaXRlSGVpZ2h0ID0gNjR9KXtcclxuICAgICAgICB0aGlzLmltYWdlTmFtZSA9aW1hZ2VOYW1lO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VXaWR0aCA9IGltYWdlV2lkdGg7XHJcbiAgICAgICAgdGhpcy5pbWFnZUhlaWdodCA9IGltYWdlSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcclxuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0QW5pbWF0aW9uKGluZGV4ZXMsIHNwZWVkLCByZXBlYXQgPSB0cnVlLCBhdXRvcnVuID0gdHJ1ZSl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6IHRoaXMuaW1hZ2VOYW1lLFxyXG4gICAgICAgICAgICBmcmFtZXM6IGluZGV4ZXMubWFwKChpbmRleCkgPT4gKHtzeDogdGhpcy5nZXRTb3VyY2VYKGluZGV4KSwgc3k6IHRoaXMuZ2V0U291cmNlWShpbmRleCl9KSksXHJcbiAgICAgICAgICAgIHNwZWVkOiBzcGVlZCxcclxuICAgICAgICAgICAgcmVwZWF0OiByZXBlYXQsXHJcbiAgICAgICAgICAgIGF1dG9ydW46IGF1dG9ydW4sXHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNwcml0ZVdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3ByaXRlSGVpZ2h0XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldFNwcml0ZShpbmRleCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTcHJpdGUoe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6IHRoaXMuaW1hZ2VOYW1lLFxyXG4gICAgICAgICAgICBzb3VyY2VYOiB0aGlzLmdldFNvdXJjZVgoaW5kZXgpLFxyXG4gICAgICAgICAgICBzb3VyY2VZOnRoaXMuZ2V0U291cmNlWShpbmRleCksXHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNwcml0ZVdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3ByaXRlSGVpZ2h0XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldFNvdXJjZVgoaW5kZXgpe1xyXG4gICAgICAgIHJldHVybiAoLS1pbmRleCAqdGhpcy5zcHJpdGVXaWR0aCkgJSB0aGlzLmltYWdlV2lkdGg7XHJcbiAgICB9XHJcbiAgICBnZXRTb3VyY2VZKGluZGV4KXtcclxuICAgICAgICByZXR1cm4gTWF0aC50cnVuYygoLS1pbmRleCAqIHRoaXMuc3ByaXRlV2lkdGgpIC8gdGhpcy5pbWFnZVdpZHRoKSp0aGlzLnNwcml0ZUhlaWdodDtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aW1hZ2VOYW1lLCBzb3VyY2VYLCBzb3VyY2VZLCB3aWR0aCA9IDY0LCBoZWlnaHQgPSA2NH0pe1xyXG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lID0gaW1hZ2VOYW1lO1xyXG4gICAgICAgIHRoaXMuc291cmNlWCA9IHNvdXJjZVg7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VZID0gc291cmNlWTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0WFkoeCx5KXtcclxuICAgICAgICB0aGlzLng9IHg7XHJcbiAgICAgICAgdGhpcy55PSB5O1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJpbXBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vaW1hZ2UtbG9hZGVyJ1xyXG5pbXBvcnQgeyBUaWxlTWFwIH0gZnJvbSAnLi90aWxlLW1hcCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NyZWVue1xyXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCl7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChgMmRgKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZXNMb2FkZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGxvYWRJbWFnZXMoaW1hZ2VGaWxlcyl7XHJcbiAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IEltYWdlTG9hZGVyKGltYWdlRmlsZXMpO1xyXG4gICAgICAgIGxvYWRlci5sb2FkKCkudGhlbigobmFtZXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBPYmplY3QuYXNzaWduKHRoaXMuaW1hZ2VzLCBsb2FkZXIuaW1hZ2VzKTtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlc0xvYWRlZCA9IHRydWU7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgY2FudmFzYCk7XHJcbiAgICAgICAgY29uc3QgY2FudmFzID0gZWxlbWVudHMgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgY2FudmFzYCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoY2FudmFzKTtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiBjYW52YXM7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVNYXAobmFtZSAsIG1hcERhdGEsIHRpbGVzZXQpe1xyXG4gICAgICAgIGNvbnN0IG1hcEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgY2FudmFzYCk7XHJcbiAgICAgICAgbWFwSW1hZ2Uud2lkdGggPSBtYXBEYXRhLndpZHRoICogbWFwRGF0YS50aWxld2lkdGg7XHJcbiAgICAgICAgbWFwSW1hZ2UuaGVpZ2h0ID0gbWFwRGF0YS5oZWlnaHQgKiBtYXBEYXRhLnRpbGVoZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgbWFwQ29udGV4dCA9IG1hcEltYWdlLmdldENvbnRleHQoYDJkYCk7XHJcbiAgICAgICAgY29uc3QgaGl0Ym94ZXMgPSBbXTtcclxuICAgICAgICBsZXQgcm93ICwgY29sO1xyXG4gICAgICAgIG1hcERhdGEubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGxheWVyLnR5cGUgPT09IGB0aWxlbGF5ZXJgKXtcclxuICAgICAgICAgICAgICAgIHJvdyA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb2wgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXIuZGF0YS5mb3JFYWNoKChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluZGV4PjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBDb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlc1t0aWxlc2V0LmltYWdlTmFtZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0LmdldFNvdXJjZVgoaW5kZXgpLCB0aWxlc2V0LmdldFNvdXJjZVkoaW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwRGF0YS50aWxld2lkdGgsIG1hcERhdGEudGlsZWhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbCAqIG1hcERhdGEudGlsZXdpZHRoLCByb3cgKiBtYXBEYXRhLnRpbGVoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBEYXRhLnRpbGV3aWR0aCwgbWFwRGF0YS50aWxlaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbCA+IChtYXBEYXRhLndpZHRoIC0gMSApKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ICsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobGF5ZXIudHlwZSA9PT0gYG9iamVjdGdyb3VwYCl7XHJcbiAgICAgICAgICAgICAgICBoaXRib3hlcy5wdXNoKC4uLmxheWVyLm9iamVjdHMubWFwKChvYmopID0+ICh7eDE6IG9iai54LCB4Mjogb2JqLnggKyBvYmoud2lkdGgsIHkxOiBvYmoueSwgeTI6IG9iai55ICsgb2JqLmhlaWdodH0pKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuaW1hZ2VzW25hbWVdID0gbWFwSW1hZ2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaWxlTWFwKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICBzb3VyY2VYOiAwLFxyXG4gICAgICAgICAgICBzb3VyY2VZOiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogbWFwSW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogbWFwSW1hZ2UuaGVpZ2h0LFxyXG4gICAgICAgICAgICBoaXRib3hlc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBmaWxsKGNvbG9yKXtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIHByaW50KHgsIHksIGNvbG9yLCBmb250LCB0ZXh0KXtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgMjJweCAke2ZvbnR9YDtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgeSk7XHJcbiAgICB9XHJcbiAgICBkcmF3SW1hZ2UoeCx5LCBpbWFnZU5hbWUpe1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZXNbaW1hZ2VOYW1lXSx4LHkpO1xyXG4gICAgfVxyXG4gICAgZHJhd1Nwcml0ZShzcHJpdGUpe1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZXNbc3ByaXRlLmltYWdlTmFtZV0sXHJcbiAgICAgICAgICAgIHNwcml0ZS5zb3VyY2VYLCBzcHJpdGUuc291cmNlWSwgc3ByaXRlLndpZHRoLCBzcHJpdGUuaGVpZ2h0LFxyXG4gICAgICAgICAgICBzcHJpdGUueCwgc3ByaXRlLnksIHNwcml0ZS53aWR0aCwgc3ByaXRlLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBkcmF3SHVkKGh1ZCl7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlc1todWQudmlldy5pbWFnZU5hbWVdLFxyXG4gICAgICAgICAgICBodWQudmlldy5zb3VyY2VYLCBodWQudmlldy5zb3VyY2VZLCBodWQudmlldy53aWR0aCwgaHVkLnZpZXcuaGVpZ2h0LFxyXG4gICAgICAgICAgICBodWQudmlldy54LCBodWQudmlldy55LCBodWQudmlldy53aWR0aCwgaHVkLnZpZXcuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gaHVkLmNvbG9yO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYDIycHggS09NSUtBWF9jeXJgO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChodWQudGV4dCwgaHVkLnRleHRYLCBodWQudGV4dFkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTcHJpdGV9IGZyb20gJy4vc3ByaXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUaWxlTWFwIGV4dGVuZHMgU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmhpdGJveGVzID0gcHJvcHMuaGl0Ym94ZXMgfHwgW107XHJcbiAgICB9XHJcbiAgICBcclxufSIsImV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aW9uLCBzcGVlZCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGRpcmVjdGlvbiwgc3BlZWQpXHJcbiAgICB9XHJcbiAgICBzZXREaXJlY3Rpb24oZGlyZWN0aW9uLCBzcGVlZCkge1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBgdXBgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gLXNwZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgYGRvd25gOlxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBgcmlnaHRgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBgbGVmdGA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSAtc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9