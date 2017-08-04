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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Carousel = __webpack_require__(1);

var _Carousel2 = _interopRequireDefault(_Carousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  $('.sdx-carousel').each(function () {
    var $elem = $(this);
    var carousel = new _Carousel2.default($elem);

    var interval = $elem.attr('data-interval');
    if (interval) {
      carousel.start();
    } else {
      carousel.panel.display();
    }

    $elem.data('sdxCarousel', carousel);
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Panel = __webpack_require__(2);

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carousel = function () {
  function Carousel($elem) {
    var _this = this;

    _classCallCheck(this, Carousel);

    //スライドショーが動いてるか、一時停止しているかのフラグ
    this._running = false;
    //スライドショーのインターバル。スタートしてるか、止まっているかのフラグにも使っています。
    this._runInterval = undefined;
    //スライドショーの繰り返しはインターバルではなくTimeoutを再帰的に読んで実現しています。そのクリア用のキー。
    this._runTimeoutKey = -1;
    //現在表示中の枝葉パネルを保持しています。止まったとき続きから再生するため。
    this._currentLeaf = undefined;
    //DOM上のボタンを押すとmouseleaveが発生してしまうのでクリック時にフラグを立て発生を抑止。
    this._clickingButton = false;

    this.$element = $elem;

    this.panel = new _Panel2.default(this, $elem);

    //外枠の高さを切り詰める
    var height = $elem.attr('data-height');
    if (!height) {
      throw new Error("Missing data-height attribute in " + this._jqueryToString(this.$element));
    }
    this.$element.height(height);
    this.$element.css({
      overflow: 'hidden'
    });

    //マウスオーバー時は止める
    //タッチ時にtouchstart>touchend>mouseenterという謎な順で発生し変な挙動になるので、タッチデバイスではやらない。
    if (!("ontouchstart" in document.documentElement)) {
      this.$element.on('mouseenter', function () {
        _this.pause();
      });

      this.$element.on('mouseleave', function () {
        if (!_this._clickingButton) {
          _this.restart();
        }
      });
    }
  }

  /**
   * スライドショーが動いているどうか。ポーズでも停止でもどちらでもfalseです。
   */


  _createClass(Carousel, [{
    key: '_next',


    /**
     * スライドショー実行時に繰り返し呼ばれます。setIntervalは使わずにsetTimeoutの再帰呼び出しを使っています。
     */
    value: function _next() {
      var _this2 = this;

      clearTimeout(this._runTimeoutKey);

      this._runTimeoutKey = setTimeout(function () {
        if (!_this2.isRunning) {
          return;
        }

        var nextIndex = _this2.leafs.indexOf(_this2._currentLeaf) + 1;
        if (!_this2.leafs[nextIndex]) {
          nextIndex = 0;
        }
        _this2.leafs[nextIndex].display();

        _this2._next();
      }, this._runInterval);
    }

    /**
     * スライドショーをポーズします。再スタートはrestartでお願いします。
     */

  }, {
    key: 'pause',
    value: function pause() {
      this._running = false;
    }

    /**
     * スライドショーポーズ時の再スタート
     */

  }, {
    key: 'restart',
    value: function restart() {
      this._running = true;
      this._next();
    }

    /**
     * スライドショーを停止します。
     */

  }, {
    key: 'stop',
    value: function stop() {
      this._running = false;
      this._runInterval = undefined;
    }

    /**
     * スライドショーをスタートさせる。インターバルはdata-intervalから取ります。
     */

  }, {
    key: 'start',
    value: function start() {
      this._running = true;
      this.panel.display();
      this._runInterval = this.$element.attr('data-interval');
      if (!this._runInterval) {
        throw new Error("Missing data-interval attribute in " + this._jqueryToString(this.$element));
      }

      this.leafs = [];
      this.panel.assembleLeafs(this.leafs);

      this._next();
    }
  }, {
    key: '_jqueryToString',
    value: function _jqueryToString($elem) {
      var html = $elem.get(0).outerHTML;
      return html.substr(0, html.indexOf('>') + 1);
    }
  }, {
    key: 'isRunning',
    get: function get() {
      return this._running && this._runInterval !== undefined;
    }
  }]);

  return Carousel;
}();

exports.default = Carousel;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panel = function () {
  function Panel(carousel, $elem, parentPanel) {
    var _this = this;

    _classCallCheck(this, Panel);

    this.carousel = carousel;
    this.$element = $elem;

    this.$buttonsWrapper = this.$element.find('> .sdx-carousel-btnWrapper');

    this.parentPanel = parentPanel;
    if (this.parentPanel) {
      this.$button = this.$element.find('> .sdx-carousel-btn');
      //ボタンは親のラッパーに突っ込みます。押した時にまるっと子パネルを入れ替えるからです。
      this.parentPanel.$buttonsWrapper.append(this.$button);

      //ボタンのクリックイベント登録。
      this.$button.on('click', function (e) {
        e.preventDefault();
        //mouseleaveの誤発火防止用フラグをON
        _this.carousel._clickingButton = true;
        //自分を表示
        _this.display();
        //スライドショーが動いていたら
        if (_this.carousel.isRunning) {
          _this.carousel._next();
        }
        //mouseleaveの誤発火防止用フラグをOFF
        setTimeout(function () {
          _this.carousel._clickingButton = false;
        }, 0);

        return false;
      });
    }

    //子パネルを生成。
    this.childPanels = [];
    this.$element.find('> .sdx-carousel-panel').each(function (key, elem) {
      _this.childPanels.push(new Panel(carousel, $(elem), _this));
    });
  }

  //枝葉パネルかどうかのチェック。


  _createClass(Panel, [{
    key: 'assembleLeafs',


    //直系の子要素を集める。
    value: function assembleLeafs(leafs) {
      if (this.isLeaf) {
        leafs.push(this);
      }

      $.each(this.childPanels, function (key, panel) {
        return panel.assembleLeafs(leafs);
      });
    }

    //ルートのパネル

  }, {
    key: 'ascend',


    //直系の親パネルに対して順にメソッドを実行する。
    value: function ascend(callback) {
      var parent = this.parentPanel;
      while (parent) {
        callback(parent);
        parent = parent.parentPanel;
      }
    }

    //指定したインデックスの子パネルに対して順にメソッドを実行する

  }, {
    key: 'descend',
    value: function descend(index, callback) {
      if (this.childPanels[index]) {
        callback(this.childPanels[index]);
        this.childPanels[index].descend(index, callback);
      }
    }

    //エレメントを見える状態にしてクラスを付与。

  }, {
    key: '_show',
    value: function _show() {
      this.$element.addClass('sdx-carousel-current');
      if (this.$button) {
        this.$button.addClass('sdx-carousel-current');
      }

      if (this.isLeaf) {
        this.carousel._currentLeaf = this;
      }
    }
  }, {
    key: 'display',
    value: function display() {
      //sdx-carousel-currentのクラスを外す。
      this.rootPanel.$element.find('.sdx-carousel-current').removeClass('sdx-carousel-current');

      //各パネルのエレメントを表示状態へ
      this._show();
      this.ascend(function (panel) {
        return panel._show();
      });
      this.descend(0, function (panel) {
        return panel._show();
      });
    }
  }, {
    key: 'isLeaf',
    get: function get() {
      return this.childPanels.length === 0;
    }
  }, {
    key: 'rootPanel',
    get: function get() {
      if (!this.parentPanel) {
        return this;
      }

      var parent = this.parentPanel;
      while (parent.parentPanel) {
        parent = parent.parentPanel;
      }

      return parent;
    }
  }]);

  return Panel;
}();

exports.default = Panel;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjNiM2EwNzc4OGJjMWFlZWQ3MDkiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudExlYWYiLCJfY2xpY2tpbmdCdXR0b24iLCIkZWxlbWVudCIsImhlaWdodCIsIkVycm9yIiwiX2pxdWVyeVRvU3RyaW5nIiwiY3NzIiwib3ZlcmZsb3ciLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsIm9uIiwicGF1c2UiLCJyZXN0YXJ0IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImlzUnVubmluZyIsIm5leHRJbmRleCIsImxlYWZzIiwiaW5kZXhPZiIsIl9uZXh0IiwiYXNzZW1ibGVMZWFmcyIsImh0bWwiLCJnZXQiLCJvdXRlckhUTUwiLCJzdWJzdHIiLCJQYW5lbCIsInBhcmVudFBhbmVsIiwiJGJ1dHRvbnNXcmFwcGVyIiwiZmluZCIsIiRidXR0b24iLCJhcHBlbmQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjaGlsZFBhbmVscyIsImtleSIsImVsZW0iLCJwdXNoIiwiaXNMZWFmIiwiY2FsbGJhY2siLCJwYXJlbnQiLCJpbmRleCIsImRlc2NlbmQiLCJhZGRDbGFzcyIsInJvb3RQYW5lbCIsInJlbW92ZUNsYXNzIiwiX3Nob3ciLCJhc2NlbmQiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0EsV0FBS0osT0FBTCxDQUFhLENBQWIsRUFBZ0I7QUFBQSxlQUFTakQsTUFBTXFELEtBQU4sRUFBVDtBQUFBLE9BQWhCO0FBQ0Q7Ozt3QkFoRVc7QUFDVixhQUFPLEtBQUtaLFdBQUwsQ0FBaUJjLE1BQWpCLEtBQTRCLENBQW5DO0FBQ0Q7Ozt3QkFZYztBQUNiLFVBQUcsQ0FBQyxLQUFLckIsV0FBVCxFQUFxQjtBQUNuQixlQUFPLElBQVA7QUFDRDs7QUFFRCxVQUFJYSxTQUFTLEtBQUtiLFdBQWxCO0FBQ0EsYUFBTWEsT0FBT2IsV0FBYixFQUF5QjtBQUN2QmEsaUJBQVNBLE9BQU9iLFdBQWhCO0FBQ0Q7O0FBRUQsYUFBT2EsTUFBUDtBQUNEOzs7Ozs7a0JBbkVrQmQsSyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmM2IzYTA3Nzg4YmMxYWVlZDcwOSIsImltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2NsYXNzZXMvQ2Fyb3VzZWwnXHJcblxyXG4kKCgpID0+IHtcclxuICAkKCcuc2R4LWNhcm91c2VsJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgJGVsZW0gPSAkKHRoaXMpXHJcbiAgICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCgkZWxlbSlcclxuXHJcbiAgICBjb25zdCBpbnRlcnZhbCA9ICRlbGVtLmF0dHIoJ2RhdGEtaW50ZXJ2YWwnKVxyXG4gICAgaWYoaW50ZXJ2YWwpe1xyXG4gICAgICBjYXJvdXNlbC5zdGFydCgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYXJvdXNlbC5wYW5lbC5kaXNwbGF5KClcclxuICAgIH1cclxuXHJcbiAgICAkZWxlbS5kYXRhKCdzZHhDYXJvdXNlbCcsIGNhcm91c2VsKVxyXG4gIH0pXHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IFBhbmVsIGZyb20gJy4vUGFuZWwnXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRlbGVtKSB7XHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBjOWLleOBhOOBpuOCi+OBi+OAgeS4gOaZguWBnOatouOBl+OBpuOBhOOCi+OBi+OBruODleODqeOCsFxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBruOCpOODs+OCv+ODvOODkOODq+OAguOCueOCv+ODvOODiOOBl+OBpuOCi+OBi+OAgeatouOBvuOBo+OBpuOBhOOCi+OBi+OBruODleODqeOCsOOBq+OCguS9v+OBo+OBpuOBhOOBvuOBmeOAglxyXG4gICAgdGhpcy5fcnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICAgIC8v44K544Op44Kk44OJ44K344On44O844Gu57mw44KK6L+U44GX44Gv44Kk44Oz44K/44O844OQ44Or44Gn44Gv44Gq44GPVGltZW91dOOCkuWGjeW4sOeahOOBq+iqreOCk+OBp+Wun+ePvuOBl+OBpuOBhOOBvuOBmeOAguOBneOBruOCr+ODquOCoueUqOOBruOCreODvOOAglxyXG4gICAgdGhpcy5fcnVuVGltZW91dEtleSA9IC0xXHJcbiAgICAvL+ePvuWcqOihqOekuuS4reOBruaeneiRieODkeODjeODq+OCkuS/neaMgeOBl+OBpuOBhOOBvuOBmeOAguatouOBvuOBo+OBn+OBqOOBjee2muOBjeOBi+OCieWGjeeUn+OBmeOCi+OBn+OCgeOAglxyXG4gICAgdGhpcy5fY3VycmVudExlYWYgPSB1bmRlZmluZWRcclxuICAgIC8vRE9N5LiK44Gu44Oc44K/44Oz44KS5oq844GZ44GobW91c2VsZWF2ZeOBjOeZuueUn+OBl+OBpuOBl+OBvuOBhuOBruOBp+OCr+ODquODg+OCr+aZguOBq+ODleODqeOCsOOCkueri+OBpueZuueUn+OCkuaKkeatouOAglxyXG4gICAgdGhpcy5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG5cclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG5cclxuICAgIHRoaXMucGFuZWwgPSBuZXcgUGFuZWwodGhpcywgJGVsZW0pXHJcbiAgICBcclxuICAgIC8v5aSW5p6g44Gu6auY44GV44KS5YiH44KK6Kmw44KB44KLXHJcbiAgICBjb25zdCBoZWlnaHQgPSAkZWxlbS5hdHRyKCdkYXRhLWhlaWdodCcpXHJcbiAgICBpZighaGVpZ2h0KXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBkYXRhLWhlaWdodCBhdHRyaWJ1dGUgaW4gXCIgKyB0aGlzLl9qcXVlcnlUb1N0cmluZyh0aGlzLiRlbGVtZW50KSlcclxuICAgIH1cclxuICAgIHRoaXMuJGVsZW1lbnQuaGVpZ2h0KGhlaWdodClcclxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcclxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXHJcbiAgICB9KVxyXG5cclxuICAgIC8v44Oe44Km44K544Kq44O844OQ44O85pmC44Gv5q2i44KB44KLXHJcbiAgICAvL+OCv+ODg+ODgeaZguOBq3RvdWNoc3RhcnQ+dG91Y2hlbmQ+bW91c2VlbnRlcuOBqOOBhOOBhuisjuOBqumghuOBp+eZuueUn+OBl+WkieOBquaMmeWLleOBq+OBquOCi+OBruOBp+OAgeOCv+ODg+ODgeODh+ODkOOCpOOCueOBp+OBr+OChOOCieOBquOBhOOAglxyXG4gICAgaWYoIShcIm9udG91Y2hzdGFydFwiIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpe1xyXG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucGF1c2UoKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy4kZWxlbWVudC5vbignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICBpZighdGhpcy5fY2xpY2tpbmdCdXR0b24pe1xyXG4gICAgICAgICAgdGhpcy5yZXN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgYzli5XjgYTjgabjgYTjgovjganjgYbjgYvjgILjg53jg7zjgrrjgafjgoLlgZzmraLjgafjgoLjganjgaHjgonjgafjgoJmYWxzZeOBp+OBmeOAglxyXG4gICAqL1xyXG4gIGdldCBpc1J1bm5pbmcoKXtcclxuICAgIHJldHVybiB0aGlzLl9ydW5uaW5nICYmIHRoaXMuX3J1bkludGVydmFsICE9PSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOWun+ihjOaZguOBq+e5sOOCiui/lOOBl+WRvOOBsOOCjOOBvuOBmeOAgnNldEludGVydmFs44Gv5L2/44KP44Ga44Grc2V0VGltZW91dOOBruWGjeW4sOWRvOOBs+WHuuOBl+OCkuS9v+OBo+OBpuOBhOOBvuOBmeOAglxyXG4gICAqL1xyXG4gIF9uZXh0KCl7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fcnVuVGltZW91dEtleSlcclxuXHJcbiAgICB0aGlzLl9ydW5UaW1lb3V0S2V5ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmKCF0aGlzLmlzUnVubmluZyl7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLmxlYWZzLmluZGV4T2YodGhpcy5fY3VycmVudExlYWYpICsgMVxyXG4gICAgICBpZighdGhpcy5sZWFmc1tuZXh0SW5kZXhdKXtcclxuICAgICAgICBuZXh0SW5kZXggPSAwXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sZWFmc1tuZXh0SW5kZXhdLmRpc3BsYXkoKVxyXG5cclxuICAgICAgdGhpcy5fbmV4dCgpXHJcblxyXG4gICAgfSwgdGhpcy5fcnVuSW50ZXJ2YWwpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLjg53jg7zjgrrjgZfjgb7jgZnjgILlho3jgrnjgr/jg7zjg4jjga9yZXN0YXJ044Gn44GK6aGY44GE44GX44G+44GZ44CCXHJcbiAgICovXHJcbiAgcGF1c2UoKXtcclxuICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOODneODvOOCuuaZguOBruWGjeOCueOCv+ODvOODiFxyXG4gICAqL1xyXG4gIHJlc3RhcnQoKXtcclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlXHJcbiAgICB0aGlzLl9uZXh0KClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuWBnOatouOBl+OBvuOBmeOAglxyXG4gICAqL1xyXG4gIHN0b3AoKXtcclxuICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44K544K/44O844OI44GV44Gb44KL44CC44Kk44Oz44K/44O844OQ44Or44GvZGF0YS1pbnRlcnZhbOOBi+OCieWPluOCiuOBvuOBmeOAglxyXG4gICAqL1xyXG4gIHN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5wYW5lbC5kaXNwbGF5KClcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKCF0aGlzLl9ydW5JbnRlcnZhbCl7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgZGF0YS1pbnRlcnZhbCBhdHRyaWJ1dGUgaW4gXCIgKyB0aGlzLl9qcXVlcnlUb1N0cmluZyh0aGlzLiRlbGVtZW50KSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxlYWZzID0gW11cclxuICAgIHRoaXMucGFuZWwuYXNzZW1ibGVMZWFmcyh0aGlzLmxlYWZzKTtcclxuXHJcbiAgICB0aGlzLl9uZXh0KClcclxuICB9XHJcblxyXG4gIF9qcXVlcnlUb1N0cmluZygkZWxlbSl7XHJcbiAgICBjb25zdCBodG1sID0gJGVsZW0uZ2V0KDApLm91dGVySFRNTFxyXG4gICAgcmV0dXJuIGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPicpICsgMSlcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL0Nhcm91c2VsLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKGNhcm91c2VsLCAkZWxlbSwgcGFyZW50UGFuZWwpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbFxyXG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtXHJcblxyXG4gICAgdGhpcy4kYnV0dG9uc1dyYXBwZXIgPSB0aGlzLiRlbGVtZW50LmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1idG5XcmFwcGVyJylcclxuICAgIFxyXG4gICAgdGhpcy5wYXJlbnRQYW5lbCA9IHBhcmVudFBhbmVsXHJcbiAgICBpZih0aGlzLnBhcmVudFBhbmVsKXtcclxuICAgICAgdGhpcy4kYnV0dG9uID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuJylcclxuICAgICAgLy/jg5zjgr/jg7Pjga/opqrjga7jg6njg4Pjg5Hjg7zjgavnqoHjgaPovrzjgb/jgb7jgZnjgILmirzjgZfjgZ/mmYLjgavjgb7jgovjgaPjgajlrZDjg5Hjg43jg6vjgpLlhaXjgozmm7/jgYjjgovjgYvjgonjgafjgZnjgIJcclxuICAgICAgdGhpcy5wYXJlbnRQYW5lbC4kYnV0dG9uc1dyYXBwZXIuYXBwZW5kKHRoaXMuJGJ1dHRvbilcclxuXHJcbiAgICAgIC8v44Oc44K/44Oz44Gu44Kv44Oq44OD44Kv44Kk44OZ44Oz44OI55m76Yyy44CCXHJcbiAgICAgIHRoaXMuJGJ1dHRvbi5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9OXHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSB0cnVlXHJcbiAgICAgICAgLy/oh6rliIbjgpLooajnpLpcclxuICAgICAgICB0aGlzLmRpc3BsYXkoKVxyXG4gICAgICAgIC8v44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44Gf44KJXHJcbiAgICAgICAgaWYodGhpcy5jYXJvdXNlbC5pc1J1bm5pbmcpe1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fbmV4dCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9GRlxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG4gICAgICAgIH0sIDApXHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Q44OR44ON44Or44KS55Sf5oiQ44CCXHJcbiAgICB0aGlzLmNoaWxkUGFuZWxzID0gW11cclxuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLXBhbmVsJykuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHMucHVzaChuZXcgUGFuZWwoY2Fyb3VzZWwsICQoZWxlbSksIHRoaXMpKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8v5p6d6JGJ44OR44ON44Or44GL44Gp44GG44GL44Gu44OB44Kn44OD44Kv44CCXHJcbiAgZ2V0IGlzTGVhZigpe1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRQYW5lbHMubGVuZ3RoID09PSAwXHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruWtkOimgee0oOOCkumbhuOCgeOCi+OAglxyXG4gIGFzc2VtYmxlTGVhZnMobGVhZnMpe1xyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICBsZWFmcy5wdXNoKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgJC5lYWNoKHRoaXMuY2hpbGRQYW5lbHMsIChrZXksIHBhbmVsKSA9PiBwYW5lbC5hc3NlbWJsZUxlYWZzKGxlYWZzKSlcclxuICB9XHJcblxyXG4gIC8v44Or44O844OI44Gu44OR44ON44OrXHJcbiAgZ2V0IHJvb3RQYW5lbCgpe1xyXG4gICAgaWYoIXRoaXMucGFyZW50UGFuZWwpe1xyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudFBhbmVsXHJcbiAgICB3aGlsZShwYXJlbnQucGFyZW50UGFuZWwpe1xyXG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50UGFuZWxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50XHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruimquODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi+OAglxyXG4gIGFzY2VuZChjYWxsYmFjayl7XHJcbiAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnRQYW5lbFxyXG4gICAgd2hpbGUocGFyZW50KXtcclxuICAgICAgY2FsbGJhY2socGFyZW50KVxyXG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50UGFuZWxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8v5oyH5a6a44GX44Gf44Kk44Oz44OH44OD44Kv44K544Gu5a2Q44OR44ON44Or44Gr5a++44GX44Gm6aCG44Gr44Oh44K944OD44OJ44KS5a6f6KGM44GZ44KLXHJcbiAgZGVzY2VuZChpbmRleCwgY2FsbGJhY2spe1xyXG4gICAgaWYodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pe1xyXG4gICAgICBjYWxsYmFjayh0aGlzLmNoaWxkUGFuZWxzW2luZGV4XSlcclxuICAgICAgdGhpcy5jaGlsZFBhbmVsc1tpbmRleF0uZGVzY2VuZChpbmRleCwgY2FsbGJhY2spXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL+OCqOODrOODoeODs+ODiOOCkuimi+OBiOOCi+eKtuaFi+OBq+OBl+OBpuOCr+ODqeOCueOCkuS7mOS4juOAglxyXG4gIF9zaG93KCl7XHJcbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICBpZih0aGlzLiRidXR0b24pe1xyXG4gICAgICB0aGlzLiRidXR0b24uYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgIH1cclxuXHJcbiAgICBpZih0aGlzLmlzTGVhZil7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWwuX2N1cnJlbnRMZWFmID0gdGhpcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc3BsYXkoKXtcclxuICAgIC8vc2R4LWNhcm91c2VsLWN1cnJlbnTjga7jgq/jg6njgrnjgpLlpJbjgZnjgIJcclxuICAgIHRoaXMucm9vdFBhbmVsLiRlbGVtZW50LmZpbmQoJy5zZHgtY2Fyb3VzZWwtY3VycmVudCcpLnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcblxyXG4gICAgLy/lkITjg5Hjg43jg6vjga7jgqjjg6zjg6Hjg7Pjg4jjgpLooajnpLrnirbmhYvjgbhcclxuICAgIHRoaXMuX3Nob3coKVxyXG4gICAgdGhpcy5hc2NlbmQocGFuZWwgPT4gcGFuZWwuX3Nob3coKSlcclxuICAgIHRoaXMuZGVzY2VuZCgwLCBwYW5lbCA9PiBwYW5lbC5fc2hvdygpKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvUGFuZWwuanMiXSwic291cmNlUm9vdCI6IiJ9