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
    //一番外枠はrelative。下層は全てabsolute
    this.$element.css({ position: 'relative' });
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
      this.$element.css({
        position: 'absolute',
        width: '100%'
      });
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
    key: 'assembleDirectParents',


    //直系の親パネルを集める。
    value: function assembleDirectParents(parents) {
      var parent = this.parentPanel;
      while (parent) {
        parents.push(parent);
        parent = parent.parentPanel;
      }
    }

    //直系の子要素を集める。

  }, {
    key: 'assembleLeafs',
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
      var parents = [];
      this.assembleDirectParents(parents);
      $.each(parents, function (key, panel) {
        callback(panel);
      });
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
      this.$element.css({ zIndex: 1 });
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
      //sdx-carousel-currentのz-indexをクリアしてクラスを外す。
      var $currents = this.rootPanel.$element.find('.sdx-carousel-current');
      $currents.filter('.sdx-carousel-panel').css({ zIndex: '' });
      $currents.removeClass('sdx-carousel-current');

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
      var parents = [];
      this.assembleDirectParents(parents);
      if (parents.length === 0) {
        return this;
      }

      return parents[parents.length - 1];
    }
  }]);

  return Panel;
}();

exports.default = Panel;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDIxNmE0OTlmMGJlNjJhNjZmZWMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudExlYWYiLCJfY2xpY2tpbmdCdXR0b24iLCIkZWxlbWVudCIsImNzcyIsInBvc2l0aW9uIiwiaGVpZ2h0IiwiRXJyb3IiLCJfanF1ZXJ5VG9TdHJpbmciLCJvdmVyZmxvdyIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwib24iLCJwYXVzZSIsInJlc3RhcnQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaXNSdW5uaW5nIiwibmV4dEluZGV4IiwibGVhZnMiLCJpbmRleE9mIiwiX25leHQiLCJhc3NlbWJsZUxlYWZzIiwiaHRtbCIsImdldCIsIm91dGVySFRNTCIsInN1YnN0ciIsIlBhbmVsIiwicGFyZW50UGFuZWwiLCIkYnV0dG9uc1dyYXBwZXIiLCJmaW5kIiwid2lkdGgiLCIkYnV0dG9uIiwiYXBwZW5kIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY2hpbGRQYW5lbHMiLCJrZXkiLCJlbGVtIiwicHVzaCIsInBhcmVudHMiLCJwYXJlbnQiLCJpc0xlYWYiLCJjYWxsYmFjayIsImFzc2VtYmxlRGlyZWN0UGFyZW50cyIsImluZGV4IiwiZGVzY2VuZCIsInpJbmRleCIsImFkZENsYXNzIiwiJGN1cnJlbnRzIiwicm9vdFBhbmVsIiwiZmlsdGVyIiwicmVtb3ZlQ2xhc3MiLCJfc2hv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IjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MjE2YTQ5OWYwYmU2MmE2NmZlYyIsImltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2NsYXNzZXMvQ2Fyb3VzZWwnXHJcblxyXG4kKCgpID0+IHtcclxuICAkKCcuc2R4LWNhcm91c2VsJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgJGVsZW0gPSAkKHRoaXMpXHJcbiAgICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCgkZWxlbSlcclxuXHJcbiAgICBjb25zdCBpbnRlcnZhbCA9ICRlbGVtLmF0dHIoJ2RhdGEtaW50ZXJ2YWwnKVxyXG4gICAgaWYoaW50ZXJ2YWwpe1xyXG4gICAgICBjYXJvdXNlbC5zdGFydCgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYXJvdXNlbC5wYW5lbC5kaXNwbGF5KClcclxuICAgIH1cclxuXHJcbiAgICAkZWxlbS5kYXRhKCdzZHhDYXJvdXNlbCcsIGNhcm91c2VsKVxyXG4gIH0pXHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IFBhbmVsIGZyb20gJy4vUGFuZWwnXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRlbGVtKSB7XHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBjOWLleOBhOOBpuOCi+OBi+OAgeS4gOaZguWBnOatouOBl+OBpuOBhOOCi+OBi+OBruODleODqeOCsFxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBruOCpOODs+OCv+ODvOODkOODq+OAguOCueOCv+ODvOODiOOBl+OBpuOCi+OBi+OAgeatouOBvuOBo+OBpuOBhOOCi+OBi+OBruODleODqeOCsOOBq+OCguS9v+OBo+OBpuOBhOOBvuOBmeOAglxyXG4gICAgdGhpcy5fcnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICAgIC8v44K544Op44Kk44OJ44K344On44O844Gu57mw44KK6L+U44GX44Gv44Kk44Oz44K/44O844OQ44Or44Gn44Gv44Gq44GPVGltZW91dOOCkuWGjeW4sOeahOOBq+iqreOCk+OBp+Wun+ePvuOBl+OBpuOBhOOBvuOBmeOAguOBneOBruOCr+ODquOCoueUqOOBruOCreODvOOAglxyXG4gICAgdGhpcy5fcnVuVGltZW91dEtleSA9IC0xXHJcbiAgICAvL+ePvuWcqOihqOekuuS4reOBruaeneiRieODkeODjeODq+OCkuS/neaMgeOBl+OBpuOBhOOBvuOBmeOAguatouOBvuOBo+OBn+OBqOOBjee2muOBjeOBi+OCieWGjeeUn+OBmeOCi+OBn+OCgeOAglxyXG4gICAgdGhpcy5fY3VycmVudExlYWYgPSB1bmRlZmluZWRcclxuICAgIC8vRE9N5LiK44Gu44Oc44K/44Oz44KS5oq844GZ44GobW91c2VsZWF2ZeOBjOeZuueUn+OBl+OBpuOBl+OBvuOBhuOBruOBp+OCr+ODquODg+OCr+aZguOBq+ODleODqeOCsOOCkueri+OBpueZuueUn+OCkuaKkeatouOAglxyXG4gICAgdGhpcy5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG5cclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG4gICAgLy/kuIDnlarlpJbmnqDjga9yZWxhdGl2ZeOAguS4i+WxpOOBr+WFqOOBpmFic29sdXRlXHJcbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7cG9zaXRpb246ICdyZWxhdGl2ZSd9KVxyXG4gICAgdGhpcy5wYW5lbCA9IG5ldyBQYW5lbCh0aGlzLCAkZWxlbSlcclxuICAgIFxyXG4gICAgLy/lpJbmnqDjga7pq5jjgZXjgpLliIfjgoroqbDjgoHjgotcclxuICAgIGNvbnN0IGhlaWdodCA9ICRlbGVtLmF0dHIoJ2RhdGEtaGVpZ2h0JylcclxuICAgIGlmKCFoZWlnaHQpe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGRhdGEtaGVpZ2h0IGF0dHJpYnV0ZSBpbiBcIiArIHRoaXMuX2pxdWVyeVRvU3RyaW5nKHRoaXMuJGVsZW1lbnQpKVxyXG4gICAgfVxyXG4gICAgdGhpcy4kZWxlbWVudC5oZWlnaHQoaGVpZ2h0KVxyXG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xyXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcclxuICAgIH0pXHJcblxyXG4gICAgLy/jg57jgqbjgrnjgqrjg7zjg5Djg7zmmYLjga/mraLjgoHjgotcclxuICAgIC8v44K/44OD44OB5pmC44GrdG91Y2hzdGFydD50b3VjaGVuZD5tb3VzZWVudGVy44Go44GE44GG6KyO44Gq6aCG44Gn55m655Sf44GX5aSJ44Gq5oyZ5YuV44Gr44Gq44KL44Gu44Gn44CB44K/44OD44OB44OH44OQ44Kk44K544Gn44Gv44KE44KJ44Gq44GE44CCXHJcbiAgICBpZighKFwib250b3VjaHN0YXJ0XCIgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSl7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wYXVzZSgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgIGlmKCF0aGlzLl9jbGlja2luZ0J1dHRvbil7XHJcbiAgICAgICAgICB0aGlzLnJlc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOBjOWLleOBhOOBpuOBhOOCi+OBqeOBhuOBi+OAguODneODvOOCuuOBp+OCguWBnOatouOBp+OCguOBqeOBoeOCieOBp+OCgmZhbHNl44Gn44GZ44CCXHJcbiAgICovXHJcbiAgZ2V0IGlzUnVubmluZygpe1xyXG4gICAgcmV0dXJuIHRoaXMuX3J1bm5pbmcgJiYgdGhpcy5fcnVuSW50ZXJ2YWwgIT09IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O85a6f6KGM5pmC44Gr57mw44KK6L+U44GX5ZG844Gw44KM44G+44GZ44CCc2V0SW50ZXJ2YWzjga/kvb/jgo/jgZrjgatzZXRUaW1lb3V044Gu5YaN5biw5ZG844Gz5Ye644GX44KS5L2/44Gj44Gm44GE44G+44GZ44CCXHJcbiAgICovXHJcbiAgX25leHQoKXtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLl9ydW5UaW1lb3V0S2V5KVxyXG5cclxuICAgIHRoaXMuX3J1blRpbWVvdXRLZXkgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYoIXRoaXMuaXNSdW5uaW5nKXtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMubGVhZnMuaW5kZXhPZih0aGlzLl9jdXJyZW50TGVhZikgKyAxXHJcbiAgICAgIGlmKCF0aGlzLmxlYWZzW25leHRJbmRleF0pe1xyXG4gICAgICAgIG5leHRJbmRleCA9IDBcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxlYWZzW25leHRJbmRleF0uZGlzcGxheSgpXHJcblxyXG4gICAgICB0aGlzLl9uZXh0KClcclxuXHJcbiAgICB9LCB0aGlzLl9ydW5JbnRlcnZhbClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuODneODvOOCuuOBl+OBvuOBmeOAguWGjeOCueOCv+ODvOODiOOBr3Jlc3RhcnTjgafjgYrpoZjjgYTjgZfjgb7jgZnjgIJcclxuICAgKi9cclxuICBwYXVzZSgpe1xyXG4gICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844Od44O844K65pmC44Gu5YaN44K544K/44O844OIXHJcbiAgICovXHJcbiAgcmVzdGFydCgpe1xyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWVcclxuICAgIHRoaXMuX25leHQoKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS5YGc5q2i44GX44G+44GZ44CCXHJcbiAgICovXHJcbiAgc3RvcCgpe1xyXG4gICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZVxyXG4gICAgIHRoaXMuX3J1bkludGVydmFsID0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLjgrnjgr/jg7zjg4jjgZXjgZvjgovjgILjgqTjg7Pjgr/jg7zjg5Djg6vjga9kYXRhLWludGVydmFs44GL44KJ5Y+W44KK44G+44GZ44CCXHJcbiAgICovXHJcbiAgc3RhcnQoKXtcclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlXHJcbiAgICB0aGlzLnBhbmVsLmRpc3BsYXkoKVxyXG4gICAgdGhpcy5fcnVuSW50ZXJ2YWwgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtaW50ZXJ2YWwnKVxyXG4gICAgaWYoIXRoaXMuX3J1bkludGVydmFsKXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBkYXRhLWludGVydmFsIGF0dHJpYnV0ZSBpbiBcIiArIHRoaXMuX2pxdWVyeVRvU3RyaW5nKHRoaXMuJGVsZW1lbnQpKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGVhZnMgPSBbXVxyXG4gICAgdGhpcy5wYW5lbC5hc3NlbWJsZUxlYWZzKHRoaXMubGVhZnMpO1xyXG5cclxuICAgIHRoaXMuX25leHQoKVxyXG4gIH1cclxuXHJcbiAgX2pxdWVyeVRvU3RyaW5nKCRlbGVtKXtcclxuICAgIGNvbnN0IGh0bWwgPSAkZWxlbS5nZXQoMCkub3V0ZXJIVE1MXHJcbiAgICByZXR1cm4gaHRtbC5zdWJzdHIoMCwgaHRtbC5pbmRleE9mKCc+JykgKyAxKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQYW5lbFxyXG57XHJcbiAgY29uc3RydWN0b3IoY2Fyb3VzZWwsICRlbGVtLCBwYXJlbnRQYW5lbCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsXHJcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1cclxuXHJcbiAgICB0aGlzLiRidXR0b25zV3JhcHBlciA9IHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bldyYXBwZXInKVxyXG4gICAgXHJcbiAgICB0aGlzLnBhcmVudFBhbmVsID0gcGFyZW50UGFuZWxcclxuICAgIGlmKHRoaXMucGFyZW50UGFuZWwpe1xyXG4gICAgICB0aGlzLiRlbGVtZW50LmNzcyh7XHJcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJ1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLiRidXR0b24gPSB0aGlzLiRlbGVtZW50LmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1idG4nKVxyXG4gICAgICAvL+ODnOOCv+ODs+OBr+imquOBruODqeODg+ODkeODvOOBq+eqgeOBo+i+vOOBv+OBvuOBmeOAguaKvOOBl+OBn+aZguOBq+OBvuOCi+OBo+OBqOWtkOODkeODjeODq+OCkuWFpeOCjOabv+OBiOOCi+OBi+OCieOBp+OBmeOAglxyXG4gICAgICB0aGlzLnBhcmVudFBhbmVsLiRidXR0b25zV3JhcHBlci5hcHBlbmQodGhpcy4kYnV0dG9uKVxyXG5cclxuICAgICAgLy/jg5zjgr/jg7Pjga7jgq/jg6rjg4Pjgq/jgqTjg5njg7Pjg4jnmbvpjLLjgIJcclxuICAgICAgdGhpcy4kYnV0dG9uLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgLy9tb3VzZWxlYXZl44Gu6Kqk55m654Gr6Ziy5q2i55So44OV44Op44Kw44KST05cclxuICAgICAgICB0aGlzLmNhcm91c2VsLl9jbGlja2luZ0J1dHRvbiA9IHRydWVcclxuICAgICAgICAvL+iHquWIhuOCkuihqOekulxyXG4gICAgICAgIHRoaXMuZGlzcGxheSgpXHJcbiAgICAgICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjgYzli5XjgYTjgabjgYTjgZ/jgolcclxuICAgICAgICBpZih0aGlzLmNhcm91c2VsLmlzUnVubmluZyl7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsLl9uZXh0KClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9tb3VzZWxlYXZl44Gu6Kqk55m654Gr6Ziy5q2i55So44OV44Op44Kw44KST0ZGXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsLl9jbGlja2luZ0J1dHRvbiA9IGZhbHNlXHJcbiAgICAgICAgfSwgMClcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/lrZDjg5Hjg43jg6vjgpLnlJ/miJDjgIJcclxuICAgIHRoaXMuY2hpbGRQYW5lbHMgPSBbXVxyXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtcGFuZWwnKS5lYWNoKChrZXksIGVsZW0pID0+IHtcclxuICAgICAgdGhpcy5jaGlsZFBhbmVscy5wdXNoKG5ldyBQYW5lbChjYXJvdXNlbCwgJChlbGVtKSwgdGhpcykpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy/mnp3okYnjg5Hjg43jg6vjgYvjganjgYbjgYvjga7jg4Hjgqfjg4Pjgq/jgIJcclxuICBnZXQgaXNMZWFmKCl7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZFBhbmVscy5sZW5ndGggPT09IDBcclxuICB9XHJcblxyXG4gIC8v55u057O744Gu6Kaq44OR44ON44Or44KS6ZuG44KB44KL44CCXHJcbiAgYXNzZW1ibGVEaXJlY3RQYXJlbnRzKHBhcmVudHMpe1xyXG4gICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50UGFuZWxcclxuICAgIHdoaWxlKHBhcmVudCl7XHJcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpXHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRQYW5lbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy/nm7Tns7vjga7lrZDopoHntKDjgpLpm4bjgoHjgovjgIJcclxuICBhc3NlbWJsZUxlYWZzKGxlYWZzKXtcclxuICAgIGlmKHRoaXMuaXNMZWFmKXtcclxuICAgICAgbGVhZnMucHVzaCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgICQuZWFjaCh0aGlzLmNoaWxkUGFuZWxzLCAoa2V5LCBwYW5lbCkgPT4gcGFuZWwuYXNzZW1ibGVMZWFmcyhsZWFmcykpXHJcbiAgfVxyXG5cclxuICAvL+ODq+ODvOODiOOBruODkeODjeODq1xyXG4gIGdldCByb290UGFuZWwoKXtcclxuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gICAgdGhpcy5hc3NlbWJsZURpcmVjdFBhcmVudHMocGFyZW50cylcclxuICAgIGlmKHBhcmVudHMubGVuZ3RoID09PSAwKXtcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdXHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruimquODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi+OAglxyXG4gIGFzY2VuZChjYWxsYmFjayl7XHJcbiAgICBjb25zdCBwYXJlbnRzID0gW11cclxuICAgIHRoaXMuYXNzZW1ibGVEaXJlY3RQYXJlbnRzKHBhcmVudHMpXHJcbiAgICAkLmVhY2gocGFyZW50cywgKGtleSwgcGFuZWwpID0+IHtcclxuICAgICAgY2FsbGJhY2socGFuZWwpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy/mjIflrprjgZfjgZ/jgqTjg7Pjg4fjg4Pjgq/jgrnjga7lrZDjg5Hjg43jg6vjgavlr77jgZfjgabpoIbjgavjg6Hjgr3jg4Pjg4njgpLlrp/ooYzjgZnjgotcclxuICBkZXNjZW5kKGluZGV4LCBjYWxsYmFjayl7XHJcbiAgICBpZih0aGlzLmNoaWxkUGFuZWxzW2luZGV4XSl7XHJcbiAgICAgIGNhbGxiYWNrKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKVxyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzW2luZGV4XS5kZXNjZW5kKGluZGV4LCBjYWxsYmFjaylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8v44Ko44Os44Oh44Oz44OI44KS6KaL44GI44KL54q25oWL44Gr44GX44Gm44Kv44Op44K544KS5LuY5LiO44CCXHJcbiAgX3Nob3coKXtcclxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHt6SW5kZXg6IDF9KVxyXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgaWYodGhpcy4kYnV0dG9uKXtcclxuICAgICAgdGhpcy4kYnV0dG9uLmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICB0aGlzLmNhcm91c2VsLl9jdXJyZW50TGVhZiA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICAvL3NkeC1jYXJvdXNlbC1jdXJyZW5044Guei1pbmRleOOCkuOCr+ODquOCouOBl+OBpuOCr+ODqeOCueOCkuWkluOBmeOAglxyXG4gICAgY29uc3QgJGN1cnJlbnRzID0gdGhpcy5yb290UGFuZWwuJGVsZW1lbnQuZmluZCgnLnNkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgICRjdXJyZW50cy5maWx0ZXIoJy5zZHgtY2Fyb3VzZWwtcGFuZWwnKS5jc3Moe3pJbmRleDogJyd9KVxyXG4gICAgJGN1cnJlbnRzLnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcblxyXG4gICAgLy/lkITjg5Hjg43jg6vjga7jgqjjg6zjg6Hjg7Pjg4jjgpLooajnpLrnirbmhYvjgbhcclxuICAgIHRoaXMuX3Nob3coKVxyXG4gICAgdGhpcy5hc2NlbmQocGFuZWwgPT4gcGFuZWwuX3Nob3coKSlcclxuICAgIHRoaXMuZGVzY2VuZCgwLCBwYW5lbCA9PiBwYW5lbC5fc2hvdygpKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvUGFuZWwuanMiXSwic291cmNlUm9vdCI6IiJ9