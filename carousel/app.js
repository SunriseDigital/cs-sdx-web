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
    // this._currentLeaf = undefined
    this._currentPanels = [];
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

        var currentLeaf = _this2._currentPanels[_this2._currentPanels.length - 1];
        var nextIndex = _this2.leafs.indexOf(currentLeaf) + 1;
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

    this.$element.on('transitionend', function (e) {
      _this.$element.removeClass('sdx-carousel-ready');
      _this.$element.removeClass('sdx-carousel-start');
      _this._clearBefore();
    });

    // this.showing = false
    this._beforePanels = [];

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
      this.carousel._currentPanels.push(this);
      this.$element.addClass('sdx-carousel-current');
      if (this.$button) {
        this.$button.addClass('sdx-carousel-current');
      }
    }
  }, {
    key: '_startShow',
    value: function _startShow(callback) {
      var _this2 = this;

      // this.showing = true
      this.$element.addClass('sdx-carousel-ready');
      this._show();
      this.descend(0, function (panel) {
        return panel._show();
      });

      setTimeout(function () {
        _this2.$element.addClass('sdx-carousel-start');
      }, 80);
    }
  }, {
    key: '_clearBefore',
    value: function _clearBefore() {
      var _this3 = this;

      $.each(this._beforePanels, function (key, panel) {
        if (_this3.carousel._currentPanels.indexOf(panel) === -1) {
          panel.$element.removeClass('sdx-carousel-current');
          panel.$button.removeClass('sdx-carousel-current');
        }
      });

      this._beforePanels = [];
    }
  }, {
    key: 'display',
    value: function display() {
      var _this4 = this;

      if (this._beforePanels.length) {
        return;
      }

      this._beforePanels = this.carousel._currentPanels;
      this.carousel._currentPanels = [];

      //各パネルのエレメントを表示状態へ
      this.ascend(function (panel) {
        return panel._show();
      });

      if (this.isRoot) {
        this._show();
        this.descend(0, function (panel) {
          return panel._show();
        });
        this._clearBefore();
      } else {
        this._startShow(function () {
          _this4._clearBefore();
        });
      }
    }
  }, {
    key: 'isLeaf',
    get: function get() {
      return this.childPanels.length === 0;
    }
  }, {
    key: 'isRoot',
    get: function get() {
      return this.parentPanel === undefined;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWJiYWExYjcwZTBlNGMxYjc2MzEiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudFBhbmVscyIsIl9jbGlja2luZ0J1dHRvbiIsIiRlbGVtZW50IiwiaGVpZ2h0IiwiRXJyb3IiLCJfanF1ZXJ5VG9TdHJpbmciLCJjc3MiLCJvdmVyZmxvdyIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwib24iLCJwYXVzZSIsInJlc3RhcnQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaXNSdW5uaW5nIiwiY3VycmVudExlYWYiLCJsZW5ndGgiLCJuZXh0SW5kZXgiLCJsZWFmcyIsImluZGV4T2YiLCJfbmV4dCIsImFzc2VtYmxlTGVhZnMiLCJodG1sIiwiZ2V0Iiwib3V0ZXJIVE1MIiwic3Vic3RyIiwiUGFuZWwiLCJwYXJlbnRQYW5lbCIsImUiLCJyZW1vdmVDbGFzcyIsIl9jbGVhckJlZm9yZSIsIl9iZWZvcmVQYW5lbHMiLCIkYnV0dG9uc1dyYXBwZXIiLCJmaW5kIiwiJGJ1dHRvbiIsImFwcGVuZCIsInByZXZlbnREZWZhdWx0IiwiY2hpbGRQYW5lbHMiLCJrZXkiLCJlbGVtIiwicHVzaCIsImlzTGVhZiIsImNhbGxiYWNrIiwicGFyZW50IiwiaW5kZXgiLCJkZXNjZW5kIiwiYWRkQ2xhc3MiLCJfc2hvdyIsImFzY2VuZCIsImlzUm9vdCIsIl9zdGFydFNob3ciXSwibWFw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QUFUO0FBQUEsT0FBWjs7QUFFQSxVQUFHLEtBQUtFLE1BQVIsRUFBZTtBQUNiLGFBQUtGLEtBQUw7QUFDQSxhQUFLRixPQUFMLENBQWEsQ0FBYixFQUFnQjtBQUFBLGlCQUFTdEQsTUFBTXdELEtBQU4sRUFBVDtBQUFBLFNBQWhCO0FBQ0EsYUFBS2pCLFlBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxhQUFLb0IsVUFBTCxDQUFnQixZQUFNO0FBQ3BCLGlCQUFLcEIsWUFBTDtBQUNELFNBRkQ7QUFHRDtBQUNGOzs7d0JBbkdXO0FBQ1YsYUFBTyxLQUFLTyxXQUFMLENBQWlCckIsTUFBakIsS0FBNEIsQ0FBbkM7QUFDRDs7O3dCQUVXO0FBQ1YsYUFBTyxLQUFLVyxXQUFMLEtBQXFCOUIsU0FBNUI7QUFDRDs7O3dCQVljO0FBQ2IsVUFBRyxDQUFDLEtBQUs4QixXQUFULEVBQXFCO0FBQ25CLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQUlnQixTQUFTLEtBQUtoQixXQUFsQjtBQUNBLGFBQU1nQixPQUFPaEIsV0FBYixFQUF5QjtBQUN2QmdCLGlCQUFTQSxPQUFPaEIsV0FBaEI7QUFDRDs7QUFFRCxhQUFPZ0IsTUFBUDtBQUNEOzs7Ozs7a0JBaEZrQmpCLEsiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWJiYWExYjcwZTBlNGMxYjc2MzEiLCJpbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jbGFzc2VzL0Nhcm91c2VsJ1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJCgnLnNkeC1jYXJvdXNlbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0ICRlbGVtID0gJCh0aGlzKVxyXG4gICAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoJGVsZW0pXHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAkZWxlbS5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKGludGVydmFsKXtcclxuICAgICAgY2Fyb3VzZWwuc3RhcnQoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2Fyb3VzZWwucGFuZWwuZGlzcGxheSgpXHJcbiAgICB9XHJcblxyXG4gICAgJGVsZW0uZGF0YSgnc2R4Q2Fyb3VzZWwnLCBjYXJvdXNlbClcclxuICB9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBQYW5lbCBmcm9tICcuL1BhbmVsJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcm91c2VsXHJcbntcclxuICBjb25zdHJ1Y3RvcigkZWxlbSkge1xyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjgYzli5XjgYTjgabjgovjgYvjgIHkuIDmmYLlgZzmraLjgZfjgabjgYTjgovjgYvjga7jg5Xjg6njgrBcclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZVxyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjga7jgqTjg7Pjgr/jg7zjg5Djg6vjgILjgrnjgr/jg7zjg4jjgZfjgabjgovjgYvjgIHmraLjgb7jgaPjgabjgYTjgovjgYvjga7jg5Xjg6njgrDjgavjgoLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdW5kZWZpbmVkXHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBrue5sOOCiui/lOOBl+OBr+OCpOODs+OCv+ODvOODkOODq+OBp+OBr+OBquOBj1RpbWVvdXTjgpLlho3luLDnmoTjgavoqq3jgpPjgaflrp/nj77jgZfjgabjgYTjgb7jgZnjgILjgZ3jga7jgq/jg6rjgqLnlKjjga7jgq3jg7zjgIJcclxuICAgIHRoaXMuX3J1blRpbWVvdXRLZXkgPSAtMVxyXG4gICAgLy/nj77lnKjooajnpLrkuK3jga7mnp3okYnjg5Hjg43jg6vjgpLkv53mjIHjgZfjgabjgYTjgb7jgZnjgILmraLjgb7jgaPjgZ/jgajjgY3ntprjgY3jgYvjgonlho3nlJ/jgZnjgovjgZ/jgoHjgIJcclxuICAgIC8vIHRoaXMuX2N1cnJlbnRMZWFmID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLl9jdXJyZW50UGFuZWxzID0gW11cclxuICAgIC8vRE9N5LiK44Gu44Oc44K/44Oz44KS5oq844GZ44GobW91c2VsZWF2ZeOBjOeZuueUn+OBl+OBpuOBl+OBvuOBhuOBruOBp+OCr+ODquODg+OCr+aZguOBq+ODleODqeOCsOOCkueri+OBpueZuueUn+OCkuaKkeatouOAglxyXG4gICAgdGhpcy5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG5cclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG5cclxuICAgIHRoaXMucGFuZWwgPSBuZXcgUGFuZWwodGhpcywgJGVsZW0pXHJcbiAgICBcclxuICAgIC8v5aSW5p6g44Gu6auY44GV44KS5YiH44KK6Kmw44KB44KLXHJcbiAgICBjb25zdCBoZWlnaHQgPSAkZWxlbS5hdHRyKCdkYXRhLWhlaWdodCcpXHJcbiAgICBpZighaGVpZ2h0KXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBkYXRhLWhlaWdodCBhdHRyaWJ1dGUgaW4gXCIgKyB0aGlzLl9qcXVlcnlUb1N0cmluZyh0aGlzLiRlbGVtZW50KSlcclxuICAgIH1cclxuICAgIHRoaXMuJGVsZW1lbnQuaGVpZ2h0KGhlaWdodClcclxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcclxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXHJcbiAgICB9KVxyXG5cclxuICAgIC8v44Oe44Km44K544Kq44O844OQ44O85pmC44Gv5q2i44KB44KLXHJcbiAgICAvL+OCv+ODg+ODgeaZguOBq3RvdWNoc3RhcnQ+dG91Y2hlbmQ+bW91c2VlbnRlcuOBqOOBhOOBhuisjuOBqumghuOBp+eZuueUn+OBl+WkieOBquaMmeWLleOBq+OBquOCi+OBruOBp+OAgeOCv+ODg+ODgeODh+ODkOOCpOOCueOBp+OBr+OChOOCieOBquOBhOOAglxyXG4gICAgaWYoIShcIm9udG91Y2hzdGFydFwiIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpe1xyXG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucGF1c2UoKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy4kZWxlbWVudC5vbignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICBpZighdGhpcy5fY2xpY2tpbmdCdXR0b24pe1xyXG4gICAgICAgICAgdGhpcy5yZXN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgYzli5XjgYTjgabjgYTjgovjganjgYbjgYvjgILjg53jg7zjgrrjgafjgoLlgZzmraLjgafjgoLjganjgaHjgonjgafjgoJmYWxzZeOBp+OBmeOAglxyXG4gICAqL1xyXG4gIGdldCBpc1J1bm5pbmcoKXtcclxuICAgIHJldHVybiB0aGlzLl9ydW5uaW5nICYmIHRoaXMuX3J1bkludGVydmFsICE9PSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOWun+ihjOaZguOBq+e5sOOCiui/lOOBl+WRvOOBsOOCjOOBvuOBmeOAgnNldEludGVydmFs44Gv5L2/44KP44Ga44Grc2V0VGltZW91dOOBruWGjeW4sOWRvOOBs+WHuuOBl+OCkuS9v+OBo+OBpuOBhOOBvuOBmeOAglxyXG4gICAqL1xyXG4gIF9uZXh0KCl7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fcnVuVGltZW91dEtleSlcclxuXHJcbiAgICB0aGlzLl9ydW5UaW1lb3V0S2V5ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmKCF0aGlzLmlzUnVubmluZyl7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRMZWFmID0gdGhpcy5fY3VycmVudFBhbmVsc1t0aGlzLl9jdXJyZW50UGFuZWxzLmxlbmd0aCAtIDFdXHJcbiAgICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLmxlYWZzLmluZGV4T2YoY3VycmVudExlYWYpICsgMVxyXG4gICAgICBpZighdGhpcy5sZWFmc1tuZXh0SW5kZXhdKXtcclxuICAgICAgICBuZXh0SW5kZXggPSAwXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sZWFmc1tuZXh0SW5kZXhdLmRpc3BsYXkoKVxyXG5cclxuICAgICAgdGhpcy5fbmV4dCgpXHJcblxyXG4gICAgfSwgdGhpcy5fcnVuSW50ZXJ2YWwpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLjg53jg7zjgrrjgZfjgb7jgZnjgILlho3jgrnjgr/jg7zjg4jjga9yZXN0YXJ044Gn44GK6aGY44GE44GX44G+44GZ44CCXHJcbiAgICovXHJcbiAgcGF1c2UoKXtcclxuICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOODneODvOOCuuaZguOBruWGjeOCueOCv+ODvOODiFxyXG4gICAqL1xyXG4gIHJlc3RhcnQoKXtcclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlXHJcbiAgICB0aGlzLl9uZXh0KClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuWBnOatouOBl+OBvuOBmeOAglxyXG4gICAqL1xyXG4gIHN0b3AoKXtcclxuICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44K544K/44O844OI44GV44Gb44KL44CC44Kk44Oz44K/44O844OQ44Or44GvZGF0YS1pbnRlcnZhbOOBi+OCieWPluOCiuOBvuOBmeOAglxyXG4gICAqL1xyXG4gIHN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5wYW5lbC5kaXNwbGF5KClcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKCF0aGlzLl9ydW5JbnRlcnZhbCl7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgZGF0YS1pbnRlcnZhbCBhdHRyaWJ1dGUgaW4gXCIgKyB0aGlzLl9qcXVlcnlUb1N0cmluZyh0aGlzLiRlbGVtZW50KSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxlYWZzID0gW11cclxuICAgIHRoaXMucGFuZWwuYXNzZW1ibGVMZWFmcyh0aGlzLmxlYWZzKTtcclxuXHJcbiAgICB0aGlzLl9uZXh0KClcclxuICB9XHJcblxyXG4gIF9qcXVlcnlUb1N0cmluZygkZWxlbSl7XHJcbiAgICBjb25zdCBodG1sID0gJGVsZW0uZ2V0KDApLm91dGVySFRNTFxyXG4gICAgcmV0dXJuIGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPicpICsgMSlcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL0Nhcm91c2VsLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKGNhcm91c2VsLCAkZWxlbSwgcGFyZW50UGFuZWwpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbFxyXG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtXHJcblxyXG4gICAgdGhpcy4kZWxlbWVudC5vbigndHJhbnNpdGlvbmVuZCcsIChlKSA9PiB7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NkeC1jYXJvdXNlbC1yZWFkeScpXHJcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NkeC1jYXJvdXNlbC1zdGFydCcpXHJcbiAgICAgIHRoaXMuX2NsZWFyQmVmb3JlKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIHRoaXMuc2hvd2luZyA9IGZhbHNlXHJcbiAgICB0aGlzLl9iZWZvcmVQYW5lbHMgPSBbXVxyXG5cclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuV3JhcHBlcicpXHJcbiAgICBcclxuICAgIHRoaXMucGFyZW50UGFuZWwgPSBwYXJlbnRQYW5lbFxyXG4gICAgaWYodGhpcy5wYXJlbnRQYW5lbCl7XHJcbiAgICAgIHRoaXMuJGJ1dHRvbiA9IHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bicpXHJcbiAgICAgIC8v44Oc44K/44Oz44Gv6Kaq44Gu44Op44OD44OR44O844Gr56qB44Gj6L6844G/44G+44GZ44CC5oq844GX44Gf5pmC44Gr44G+44KL44Gj44Go5a2Q44OR44ON44Or44KS5YWl44KM5pu/44GI44KL44GL44KJ44Gn44GZ44CCXHJcbiAgICAgIHRoaXMucGFyZW50UGFuZWwuJGJ1dHRvbnNXcmFwcGVyLmFwcGVuZCh0aGlzLiRidXR0b24pXHJcblxyXG4gICAgICAvL+ODnOOCv+ODs+OBruOCr+ODquODg+OCr+OCpOODmeODs+ODiOeZu+mMsuOAglxyXG4gICAgICB0aGlzLiRidXR0b24ub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAvL21vdXNlbGVhdmXjga7oqqTnmbrngavpmLLmraLnlKjjg5Xjg6njgrDjgpJPTlxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwuX2NsaWNraW5nQnV0dG9uID0gdHJ1ZVxyXG4gICAgICAgIC8v6Ieq5YiG44KS6KGo56S6XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5KClcclxuICAgICAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBjOWLleOBhOOBpuOBhOOBn+OCiVxyXG4gICAgICAgIGlmKHRoaXMuY2Fyb3VzZWwuaXNSdW5uaW5nKXtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuX25leHQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL21vdXNlbGVhdmXjga7oqqTnmbrngavpmLLmraLnlKjjg5Xjg6njgrDjgpJPRkZcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuX2NsaWNraW5nQnV0dG9uID0gZmFsc2VcclxuICAgICAgICB9LCAwKVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+WtkOODkeODjeODq+OCkueUn+aIkOOAglxyXG4gICAgdGhpcy5jaGlsZFBhbmVscyA9IFtdXHJcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1wYW5lbCcpLmVhY2goKGtleSwgZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzLnB1c2gobmV3IFBhbmVsKGNhcm91c2VsLCAkKGVsZW0pLCB0aGlzKSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvL+aeneiRieODkeODjeODq+OBi+OBqeOBhuOBi+OBruODgeOCp+ODg+OCr+OAglxyXG4gIGdldCBpc0xlYWYoKXtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkUGFuZWxzLmxlbmd0aCA9PT0gMFxyXG4gIH1cclxuXHJcbiAgZ2V0IGlzUm9vdCgpe1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50UGFuZWwgPT09IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgLy/nm7Tns7vjga7lrZDopoHntKDjgpLpm4bjgoHjgovjgIJcclxuICBhc3NlbWJsZUxlYWZzKGxlYWZzKXtcclxuICAgIGlmKHRoaXMuaXNMZWFmKXtcclxuICAgICAgbGVhZnMucHVzaCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgICQuZWFjaCh0aGlzLmNoaWxkUGFuZWxzLCAoa2V5LCBwYW5lbCkgPT4gcGFuZWwuYXNzZW1ibGVMZWFmcyhsZWFmcykpXHJcbiAgfVxyXG5cclxuICAvL+ODq+ODvOODiOOBruODkeODjeODq1xyXG4gIGdldCByb290UGFuZWwoKXtcclxuICAgIGlmKCF0aGlzLnBhcmVudFBhbmVsKXtcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnRQYW5lbFxyXG4gICAgd2hpbGUocGFyZW50LnBhcmVudFBhbmVsKXtcclxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudFBhbmVsXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhcmVudFxyXG4gIH1cclxuXHJcbiAgLy/nm7Tns7vjga7opqrjg5Hjg43jg6vjgavlr77jgZfjgabpoIbjgavjg6Hjgr3jg4Pjg4njgpLlrp/ooYzjgZnjgovjgIJcclxuICBhc2NlbmQoY2FsbGJhY2spe1xyXG4gICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50UGFuZWxcclxuICAgIHdoaWxlKHBhcmVudCl7XHJcbiAgICAgIGNhbGxiYWNrKHBhcmVudClcclxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudFBhbmVsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL+aMh+WumuOBl+OBn+OCpOODs+ODh+ODg+OCr+OCueOBruWtkOODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi1xyXG4gIGRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKXtcclxuICAgIGlmKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKXtcclxuICAgICAgY2FsbGJhY2sodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pXHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdLmRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy/jgqjjg6zjg6Hjg7Pjg4jjgpLopovjgYjjgovnirbmhYvjgavjgZfjgabjgq/jg6njgrnjgpLku5jkuI7jgIJcclxuICBfc2hvdygpe1xyXG4gICAgdGhpcy5jYXJvdXNlbC5fY3VycmVudFBhbmVscy5wdXNoKHRoaXMpXHJcbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICBpZih0aGlzLiRidXR0b24pe1xyXG4gICAgICB0aGlzLiRidXR0b24uYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zdGFydFNob3coY2FsbGJhY2spe1xyXG4gICAgLy8gdGhpcy5zaG93aW5nID0gdHJ1ZVxyXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnc2R4LWNhcm91c2VsLXJlYWR5JylcclxuICAgIHRoaXMuX3Nob3coKVxyXG4gICAgdGhpcy5kZXNjZW5kKDAsIHBhbmVsID0+IHBhbmVsLl9zaG93KCkpXHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1zdGFydCcpXHJcbiAgICB9LCA4MClcclxuICB9XHJcblxyXG4gIF9jbGVhckJlZm9yZSgpe1xyXG4gICAgJC5lYWNoKHRoaXMuX2JlZm9yZVBhbmVscywgKGtleSwgcGFuZWwpID0+IHtcclxuICAgICAgaWYodGhpcy5jYXJvdXNlbC5fY3VycmVudFBhbmVscy5pbmRleE9mKHBhbmVsKSA9PT0gLTEpe1xyXG4gICAgICAgIHBhbmVsLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICAgICAgcGFuZWwuJGJ1dHRvbi5yZW1vdmVDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuX2JlZm9yZVBhbmVscyA9IFtdXHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICBpZih0aGlzLl9iZWZvcmVQYW5lbHMubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuX2JlZm9yZVBhbmVscyA9IHRoaXMuY2Fyb3VzZWwuX2N1cnJlbnRQYW5lbHNcclxuICAgIHRoaXMuY2Fyb3VzZWwuX2N1cnJlbnRQYW5lbHMgPSBbXVxyXG5cclxuICAgIC8v5ZCE44OR44ON44Or44Gu44Ko44Os44Oh44Oz44OI44KS6KGo56S654q25oWL44G4XHJcbiAgICB0aGlzLmFzY2VuZChwYW5lbCA9PiBwYW5lbC5fc2hvdygpKVxyXG5cclxuICAgIGlmKHRoaXMuaXNSb290KXtcclxuICAgICAgdGhpcy5fc2hvdygpXHJcbiAgICAgIHRoaXMuZGVzY2VuZCgwLCBwYW5lbCA9PiBwYW5lbC5fc2hvdygpKVxyXG4gICAgICB0aGlzLl9jbGVhckJlZm9yZSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zdGFydFNob3coKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQmVmb3JlKClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL1BhbmVsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==