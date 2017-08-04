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
        if (_this2.leafs[nextIndex]) {
          _this2.leafs[nextIndex].display();
        } else {
          _this2.panel.childPanels[0].display();
        }

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
      _this._clearBeforePanels();
    });

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
      var parents = [];
      var parent = this.parentPanel;
      while (parent) {
        parents.push(parent);
        parent = parent.parentPanel;
      }

      for (var i = parents.length - 1; i >= 0; i--) {
        callback(parents[i]);
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

      this._show();
      this.descend(0, function (panel) {
        return panel._show();
      });

      this.$element.addClass('sdx-carousel-ready');

      setTimeout(function () {
        _this2.$element.addClass('sdx-carousel-start');
      }, 100);
    }
  }, {
    key: '_clearBeforePanels',
    value: function _clearBeforePanels() {
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

      //既に表示中で子供がいたら子供を表示。
      if (this.carousel._currentPanels.indexOf(this) >= 0 && this.childPanels[0]) {
        this.childPanels[0].display();
      } else {
        var parents = [];
        this.ascend(function (p) {
          return parents.push(p);
        });

        //スライドショーの時表示されてない一番上の親を表示しないと親のパネルのz-indexが2にならないのでアニメーション時にボタン部分が見えない。
        //ただしそれが起こるのはスライドショーの時のみ。ボタンで切り替えるときは親パネルにボタンがあるので、親が見えないとクリックできない。
        var hiddenParents = parents.filter(function (p) {
          return !p.$element.is('.sdx-carousel-current');
        });
        if (hiddenParents.length) {
          hiddenParents[0].display();
        } else {
          //クラスを外すので直前のパネルをとっておく。
          this._beforePanels = this.carousel._currentPanels;
          //今回表示されるパネルを階層で保持。
          this.carousel._currentPanels = [];

          //各パネルのエレメントを表示状態へ
          $.each(parents, function (key, panel) {
            return panel._show();
          });

          if (this.isRoot) {
            this._show();
            this.descend(0, function (panel) {
              return panel._show();
            });
            this._clearBeforePanels();
          } else {
            // console.log('anim')
            this._startShow(function () {
              _this4._clearBeforePanels();
            });
          }
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDFhMjljZmEzMTA0YjAxZTY0OWQiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudFBhbmVscyIsIl9jbGlja2luZ0J1dHRvbiIsIiRlbGVtZW50IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJvbiIsInBhdXNlIiwicmVzdGFydCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJpc1J1bm5pbmciLCJjdXJyZW50TGVhZiIsImxlbmd0aCIsIm5leHRJbmRleCIsImxlYWZzIiwiaW5kZXhPZiIsImNoaWxkUGFuZWxzIiwiX25leHQiLCJFcnJvciIsIl9qcXVlcnlUb1N0cmluZyIsImFzc2VtYmxlTGVhZnMiLCJodG1sIiwiZ2V0Iiwib3V0ZXJIVE1MIiwic3Vic3RyIiwiUGFuZWwiLCJwYXJlbnRQYW5lbCIsImUiLCJyZW1vdmVDbGFzcyIsIl9jbGVhckJlZm9yZVBhbmVscyIsIl9iZWZvcmVQYW5lbHMiLCIkYnV0dG9uc1dyYXBwZXIiLCJmaW5kIiwiJGJ1dHRvbiIsImFwcGVuZCIsInByZXZlbnREZWZhdWx0Iiwia2V5IiwiZWxlbSIsInB1c2giLCJpc0xlYWYiLCJjYWxsYmFjayIsInBhcmVudHMiLCJwYXJlbnQiLCJpIiwiaW5kZXgiLCJkZXNjZW5kIiwiYWRkQ2xhc3MiLCJfc2hvdyIsImFzY2VuZCIsInAiLCJoaWRkZW5QYXJlbnRzIiwiZmlsdGVyIiwiaXMi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QU8sSUFBUDtBQUNEOztBQUVELFVBQUlnQixTQUFTLEtBQUtoQixXQUFsQjtBQUNBLGFBQU1nQixPQUFPaEIsV0FBYixFQUF5QjtBQUN2QmdCLGlCQUFTQSxPQUFPaEIsV0FBaEI7QUFDRDs7QUFFRCxhQUFPZ0IsTUFBUDtBQUNEOzs7Ozs7a0JBL0VrQmpCLEsiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDFhMjljZmEzMTA0YjAxZTY0OWQiLCJpbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jbGFzc2VzL0Nhcm91c2VsJ1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJCgnLnNkeC1jYXJvdXNlbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0ICRlbGVtID0gJCh0aGlzKVxyXG4gICAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoJGVsZW0pXHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAkZWxlbS5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKGludGVydmFsKXtcclxuICAgICAgY2Fyb3VzZWwuc3RhcnQoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2Fyb3VzZWwucGFuZWwuZGlzcGxheSgpXHJcbiAgICB9XHJcblxyXG4gICAgJGVsZW0uZGF0YSgnc2R4Q2Fyb3VzZWwnLCBjYXJvdXNlbClcclxuICB9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBQYW5lbCBmcm9tICcuL1BhbmVsJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcm91c2VsXHJcbntcclxuICBjb25zdHJ1Y3RvcigkZWxlbSkge1xyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjgYzli5XjgYTjgabjgovjgYvjgIHkuIDmmYLlgZzmraLjgZfjgabjgYTjgovjgYvjga7jg5Xjg6njgrBcclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZVxyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjga7jgqTjg7Pjgr/jg7zjg5Djg6vjgILjgrnjgr/jg7zjg4jjgZfjgabjgovjgYvjgIHmraLjgb7jgaPjgabjgYTjgovjgYvjga7jg5Xjg6njgrDjgavjgoLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdW5kZWZpbmVkXHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBrue5sOOCiui/lOOBl+OBr+OCpOODs+OCv+ODvOODkOODq+OBp+OBr+OBquOBj1RpbWVvdXTjgpLlho3luLDnmoTjgavoqq3jgpPjgaflrp/nj77jgZfjgabjgYTjgb7jgZnjgILjgZ3jga7jgq/jg6rjgqLnlKjjga7jgq3jg7zjgIJcclxuICAgIHRoaXMuX3J1blRpbWVvdXRLZXkgPSAtMVxyXG4gICAgLy/nj77lnKjooajnpLrkuK3jga7mnp3okYnjg5Hjg43jg6vjgpLkv53mjIHjgZfjgabjgYTjgb7jgZnjgILmraLjgb7jgaPjgZ/jgajjgY3ntprjgY3jgYvjgonlho3nlJ/jgZnjgovjgZ/jgoHjgIJcclxuICAgIC8vIHRoaXMuX2N1cnJlbnRMZWFmID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLl9jdXJyZW50UGFuZWxzID0gW11cclxuICAgIC8vRE9N5LiK44Gu44Oc44K/44Oz44KS5oq844GZ44GobW91c2VsZWF2ZeOBjOeZuueUn+OBl+OBpuOBl+OBvuOBhuOBruOBp+OCr+ODquODg+OCr+aZguOBq+ODleODqeOCsOOCkueri+OBpueZuueUn+OCkuaKkeatouOAglxyXG4gICAgdGhpcy5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG5cclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG5cclxuICAgIHRoaXMucGFuZWwgPSBuZXcgUGFuZWwodGhpcywgJGVsZW0pXHJcblxyXG4gICAgLy/jg57jgqbjgrnjgqrjg7zjg5Djg7zmmYLjga/mraLjgoHjgotcclxuICAgIC8v44K/44OD44OB5pmC44GrdG91Y2hzdGFydD50b3VjaGVuZD5tb3VzZWVudGVy44Go44GE44GG6KyO44Gq6aCG44Gn55m655Sf44GX5aSJ44Gq5oyZ5YuV44Gr44Gq44KL44Gu44Gn44CB44K/44OD44OB44OH44OQ44Kk44K544Gn44Gv44KE44KJ44Gq44GE44CCXHJcbiAgICBpZighKFwib250b3VjaHN0YXJ0XCIgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSl7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wYXVzZSgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgIGlmKCF0aGlzLl9jbGlja2luZ0J1dHRvbil7XHJcbiAgICAgICAgICB0aGlzLnJlc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOBjOWLleOBhOOBpuOBhOOCi+OBqeOBhuOBi+OAguODneODvOOCuuOBp+OCguWBnOatouOBp+OCguOBqeOBoeOCieOBp+OCgmZhbHNl44Gn44GZ44CCXHJcbiAgICovXHJcbiAgZ2V0IGlzUnVubmluZygpe1xyXG4gICAgcmV0dXJuIHRoaXMuX3J1bm5pbmcgJiYgdGhpcy5fcnVuSW50ZXJ2YWwgIT09IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O85a6f6KGM5pmC44Gr57mw44KK6L+U44GX5ZG844Gw44KM44G+44GZ44CCc2V0SW50ZXJ2YWzjga/kvb/jgo/jgZrjgatzZXRUaW1lb3V044Gu5YaN5biw5ZG844Gz5Ye644GX44KS5L2/44Gj44Gm44GE44G+44GZ44CCXHJcbiAgICovXHJcbiAgX25leHQoKXtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLl9ydW5UaW1lb3V0S2V5KVxyXG5cclxuICAgIHRoaXMuX3J1blRpbWVvdXRLZXkgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYoIXRoaXMuaXNSdW5uaW5nKXtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY3VycmVudExlYWYgPSB0aGlzLl9jdXJyZW50UGFuZWxzW3RoaXMuX2N1cnJlbnRQYW5lbHMubGVuZ3RoIC0gMV1cclxuICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMubGVhZnMuaW5kZXhPZihjdXJyZW50TGVhZikgKyAxXHJcbiAgICAgIGlmKHRoaXMubGVhZnNbbmV4dEluZGV4XSl7XHJcbiAgICAgICAgdGhpcy5sZWFmc1tuZXh0SW5kZXhdLmRpc3BsYXkoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGFuZWwuY2hpbGRQYW5lbHNbMF0uZGlzcGxheSgpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX25leHQoKVxyXG5cclxuICAgIH0sIHRoaXMuX3J1bkludGVydmFsKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44Od44O844K644GX44G+44GZ44CC5YaN44K544K/44O844OI44GvcmVzdGFydOOBp+OBiumhmOOBhOOBl+OBvuOBmeOAglxyXG4gICAqL1xyXG4gIHBhdXNlKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjg53jg7zjgrrmmYLjga7lho3jgrnjgr/jg7zjg4hcclxuICAgKi9cclxuICByZXN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLlgZzmraLjgZfjgb7jgZnjgIJcclxuICAgKi9cclxuICBzdG9wKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgICAgdGhpcy5fcnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuOCueOCv+ODvOODiOOBleOBm+OCi+OAguOCpOODs+OCv+ODvOODkOODq+OBr2RhdGEtaW50ZXJ2YWzjgYvjgonlj5bjgorjgb7jgZnjgIJcclxuICAgKi9cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWVcclxuICAgIHRoaXMucGFuZWwuZGlzcGxheSgpXHJcbiAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1pbnRlcnZhbCcpXHJcbiAgICBpZighdGhpcy5fcnVuSW50ZXJ2YWwpe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGRhdGEtaW50ZXJ2YWwgYXR0cmlidXRlIGluIFwiICsgdGhpcy5fanF1ZXJ5VG9TdHJpbmcodGhpcy4kZWxlbWVudCkpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sZWFmcyA9IFtdXHJcbiAgICB0aGlzLnBhbmVsLmFzc2VtYmxlTGVhZnModGhpcy5sZWFmcyk7XHJcblxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICBfanF1ZXJ5VG9TdHJpbmcoJGVsZW0pe1xyXG4gICAgY29uc3QgaHRtbCA9ICRlbGVtLmdldCgwKS5vdXRlckhUTUxcclxuICAgIHJldHVybiBodG1sLnN1YnN0cigwLCBodG1sLmluZGV4T2YoJz4nKSArIDEpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9DYXJvdXNlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsXHJcbntcclxuICBjb25zdHJ1Y3RvcihjYXJvdXNlbCwgJGVsZW0sIHBhcmVudFBhbmVsKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsID0gY2Fyb3VzZWxcclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG5cclxuICAgIHRoaXMuJGVsZW1lbnQub24oJ3RyYW5zaXRpb25lbmQnLCAoZSkgPT4ge1xyXG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtcmVhZHknKVxyXG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtc3RhcnQnKVxyXG4gICAgICB0aGlzLl9jbGVhckJlZm9yZVBhbmVscygpO1xyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLl9iZWZvcmVQYW5lbHMgPSBbXVxyXG5cclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuV3JhcHBlcicpXHJcbiAgICBcclxuICAgIHRoaXMucGFyZW50UGFuZWwgPSBwYXJlbnRQYW5lbFxyXG4gICAgaWYodGhpcy5wYXJlbnRQYW5lbCl7XHJcbiAgICAgIHRoaXMuJGJ1dHRvbiA9IHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bicpXHJcbiAgICAgIC8v44Oc44K/44Oz44Gv6Kaq44Gu44Op44OD44OR44O844Gr56qB44Gj6L6844G/44G+44GZ44CC5oq844GX44Gf5pmC44Gr44G+44KL44Gj44Go5a2Q44OR44ON44Or44KS5YWl44KM5pu/44GI44KL44GL44KJ44Gn44GZ44CCXHJcbiAgICAgIHRoaXMucGFyZW50UGFuZWwuJGJ1dHRvbnNXcmFwcGVyLmFwcGVuZCh0aGlzLiRidXR0b24pXHJcblxyXG4gICAgICAvL+ODnOOCv+ODs+OBruOCr+ODquODg+OCr+OCpOODmeODs+ODiOeZu+mMsuOAglxyXG4gICAgICB0aGlzLiRidXR0b24ub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAvL21vdXNlbGVhdmXjga7oqqTnmbrngavpmLLmraLnlKjjg5Xjg6njgrDjgpJPTlxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwuX2NsaWNraW5nQnV0dG9uID0gdHJ1ZVxyXG4gICAgICAgIC8v6Ieq5YiG44KS6KGo56S6XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5KClcclxuICAgICAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBjOWLleOBhOOBpuOBhOOBn+OCiVxyXG4gICAgICAgIGlmKHRoaXMuY2Fyb3VzZWwuaXNSdW5uaW5nKXtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuX25leHQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL21vdXNlbGVhdmXjga7oqqTnmbrngavpmLLmraLnlKjjg5Xjg6njgrDjgpJPRkZcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuX2NsaWNraW5nQnV0dG9uID0gZmFsc2VcclxuICAgICAgICB9LCAwKVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+WtkOODkeODjeODq+OCkueUn+aIkOOAglxyXG4gICAgdGhpcy5jaGlsZFBhbmVscyA9IFtdXHJcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1wYW5lbCcpLmVhY2goKGtleSwgZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzLnB1c2gobmV3IFBhbmVsKGNhcm91c2VsLCAkKGVsZW0pLCB0aGlzKSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvL+aeneiRieODkeODjeODq+OBi+OBqeOBhuOBi+OBruODgeOCp+ODg+OCr+OAglxyXG4gIGdldCBpc0xlYWYoKXtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkUGFuZWxzLmxlbmd0aCA9PT0gMFxyXG4gIH1cclxuXHJcbiAgZ2V0IGlzUm9vdCgpe1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50UGFuZWwgPT09IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgLy/nm7Tns7vjga7lrZDopoHntKDjgpLpm4bjgoHjgovjgIJcclxuICBhc3NlbWJsZUxlYWZzKGxlYWZzKXtcclxuICAgIGlmKHRoaXMuaXNMZWFmKXtcclxuICAgICAgbGVhZnMucHVzaCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgICQuZWFjaCh0aGlzLmNoaWxkUGFuZWxzLCAoa2V5LCBwYW5lbCkgPT4gcGFuZWwuYXNzZW1ibGVMZWFmcyhsZWFmcykpXHJcbiAgfVxyXG5cclxuICAvL+ODq+ODvOODiOOBruODkeODjeODq1xyXG4gIGdldCByb290UGFuZWwoKXtcclxuICAgIGlmKCF0aGlzLnBhcmVudFBhbmVsKXtcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnRQYW5lbFxyXG4gICAgd2hpbGUocGFyZW50LnBhcmVudFBhbmVsKXtcclxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudFBhbmVsXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhcmVudFxyXG4gIH1cclxuXHJcbiAgLy/nm7Tns7vjga7opqrjg5Hjg43jg6vjgavlr77jgZfjgabpoIbjgavjg6Hjgr3jg4Pjg4njgpLlrp/ooYzjgZnjgovjgIJcclxuICBhc2NlbmQoY2FsbGJhY2spe1xyXG4gICAgdmFyIHBhcmVudHMgPSBbXVxyXG4gICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50UGFuZWxcclxuICAgIHdoaWxlKHBhcmVudCl7XHJcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpXHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRQYW5lbFxyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSBwYXJlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGNhbGxiYWNrKHBhcmVudHNbaV0pICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL+aMh+WumuOBl+OBn+OCpOODs+ODh+ODg+OCr+OCueOBruWtkOODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi1xyXG4gIGRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKXtcclxuICAgIGlmKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKXtcclxuICAgICAgY2FsbGJhY2sodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pXHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdLmRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy/jgqjjg6zjg6Hjg7Pjg4jjgpLopovjgYjjgovnirbmhYvjgavjgZfjgabjgq/jg6njgrnjgpLku5jkuI7jgIJcclxuICBfc2hvdygpe1xyXG4gICAgdGhpcy5jYXJvdXNlbC5fY3VycmVudFBhbmVscy5wdXNoKHRoaXMpXHJcbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICBpZih0aGlzLiRidXR0b24pe1xyXG4gICAgICB0aGlzLiRidXR0b24uYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zdGFydFNob3coY2FsbGJhY2spe1xyXG4gICAgdGhpcy5fc2hvdygpXHJcbiAgICB0aGlzLmRlc2NlbmQoMCwgcGFuZWwgPT4gcGFuZWwuX3Nob3coKSlcclxuXHJcbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtcmVhZHknKVxyXG4gICAgXHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1zdGFydCcpXHJcbiAgICB9LCAxMDApXHJcbiAgfVxyXG5cclxuICBfY2xlYXJCZWZvcmVQYW5lbHMoKXtcclxuICAgICQuZWFjaCh0aGlzLl9iZWZvcmVQYW5lbHMsIChrZXksIHBhbmVsKSA9PiB7XHJcbiAgICAgIGlmKHRoaXMuY2Fyb3VzZWwuX2N1cnJlbnRQYW5lbHMuaW5kZXhPZihwYW5lbCkgPT09IC0xKXtcclxuICAgICAgICBwYW5lbC4kZWxlbWVudC5yZW1vdmVDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgICAgIHBhbmVsLiRidXR0b24ucmVtb3ZlQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLl9iZWZvcmVQYW5lbHMgPSBbXVxyXG4gIH1cclxuXHJcbiAgZGlzcGxheSgpe1xyXG4gICAgaWYodGhpcy5fYmVmb3JlUGFuZWxzLmxlbmd0aCl7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aXouOBq+ihqOekuuS4reOBp+WtkOS+m+OBjOOBhOOBn+OCieWtkOS+m+OCkuihqOekuuOAglxyXG4gICAgaWYodGhpcy5jYXJvdXNlbC5fY3VycmVudFBhbmVscy5pbmRleE9mKHRoaXMpID49IDAgJiYgdGhpcy5jaGlsZFBhbmVsc1swXSl7XHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHNbMF0uZGlzcGxheSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwYXJlbnRzID0gW11cclxuICAgICAgdGhpcy5hc2NlbmQocCA9PiBwYXJlbnRzLnB1c2gocCkpXHJcblxyXG4gICAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBruaZguihqOekuuOBleOCjOOBpuOBquOBhOS4gOeVquS4iuOBruimquOCkuihqOekuuOBl+OBquOBhOOBqOimquOBruODkeODjeODq+OBrnotaW5kZXjjgYwy44Gr44Gq44KJ44Gq44GE44Gu44Gn44Ki44OL44Oh44O844K344On44Oz5pmC44Gr44Oc44K/44Oz6YOo5YiG44GM6KaL44GI44Gq44GE44CCXHJcbiAgICAgIC8v44Gf44Gg44GX44Gd44KM44GM6LW344GT44KL44Gu44Gv44K544Op44Kk44OJ44K344On44O844Gu5pmC44Gu44G/44CC44Oc44K/44Oz44Gn5YiH44KK5pu/44GI44KL44Go44GN44Gv6Kaq44OR44ON44Or44Gr44Oc44K/44Oz44GM44GC44KL44Gu44Gn44CB6Kaq44GM6KaL44GI44Gq44GE44Go44Kv44Oq44OD44Kv44Gn44GN44Gq44GE44CCXHJcbiAgICAgIGNvbnN0IGhpZGRlblBhcmVudHMgPSBwYXJlbnRzLmZpbHRlcihwID0+ICFwLiRlbGVtZW50LmlzKCcuc2R4LWNhcm91c2VsLWN1cnJlbnQnKSlcclxuICAgICAgaWYoaGlkZGVuUGFyZW50cy5sZW5ndGgpe1xyXG4gICAgICAgIGhpZGRlblBhcmVudHNbMF0uZGlzcGxheSgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy/jgq/jg6njgrnjgpLlpJbjgZnjga7jgafnm7TliY3jga7jg5Hjg43jg6vjgpLjgajjgaPjgabjgYrjgY/jgIJcclxuICAgICAgICB0aGlzLl9iZWZvcmVQYW5lbHMgPSB0aGlzLmNhcm91c2VsLl9jdXJyZW50UGFuZWxzXHJcbiAgICAgICAgLy/ku4rlm57ooajnpLrjgZXjgozjgovjg5Hjg43jg6vjgpLpmo7lsaTjgafkv53mjIHjgIJcclxuICAgICAgICB0aGlzLmNhcm91c2VsLl9jdXJyZW50UGFuZWxzID0gW11cclxuXHJcbiAgICAgICAgLy/lkITjg5Hjg43jg6vjga7jgqjjg6zjg6Hjg7Pjg4jjgpLooajnpLrnirbmhYvjgbhcclxuICAgICAgICAkLmVhY2gocGFyZW50cywgKGtleSwgcGFuZWwpID0+IHBhbmVsLl9zaG93KCkpXHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNSb290KXtcclxuICAgICAgICAgIHRoaXMuX3Nob3coKVxyXG4gICAgICAgICAgdGhpcy5kZXNjZW5kKDAsIHBhbmVsID0+IHBhbmVsLl9zaG93KCkpXHJcbiAgICAgICAgICB0aGlzLl9jbGVhckJlZm9yZVBhbmVscygpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhbmltJylcclxuICAgICAgICAgIHRoaXMuX3N0YXJ0U2hvdygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyQmVmb3JlUGFuZWxzKClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=