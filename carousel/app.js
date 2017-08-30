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

    this._transitionDuration = this.$element.attr('data-transition-duration');

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

    if (this.carousel._transitionDuration) {

      this.$element.css({ 'transitionDuration': this.carousel._transitionDuration });
      this.$element.on('transitionend', function (e) {
        _this.$element.removeClass('sdx-carousel-ready');
        _this.$element.removeClass('sdx-carousel-start');
        _this._clearBeforePanels();
      });
    }

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
            this._startShow();
            if (!this.carousel._transitionDuration) {
              this.$element.removeClass('sdx-carousel-ready');
              this.$element.removeClass('sdx-carousel-start');
              this._clearBeforePanels();
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzJiNzE2ZmU1NWY5ZjkyYWE2Y2MiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudFBhbmVscyIsIl9jbGlja2luZ0J1dHRvbiIsIiRlbGVtZW50IiwiX3RyYW5zaXRpb25EdXJhdGlvbiIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwib24iLCJwYXVzZSIsInJlc3RhcnQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaXNSdW5uaW5nIiwiY3VycmVudExlYWYiLCJsZW5ndGgiLCJuZXh0SW5kZXgiLCJsZWFmcyIsImluZGV4T2YiLCJjaGlsZFBhbmVscyIsIl9uZXh0IiwiRXJyb3IiLCJfanF1ZXJ5VG9TdHJpbmciLCJhc3NlbWJsZUxlYWZzIiwiaHRtbCIsImdldCIsIm91dGVySFRNTCIsInN1YnN0ciIsIlBhbmVsIiwicGFyZW50UGFuZWwiLCJjc3MiLCJlIiwicmVtb3ZlQ2xhc3MiLCJfY2xlYXJCZWZvcmVQYW5lbHMiLCJfYmVmb3JlUGFuZWxzIiwiJGJ1dHRvbnNXcmFwcGVyIiwiZmluZCIsIiRidXR0b24iLCJhcHBlbmQiLCJwcmV2ZW50RGVmYXVsdCIsImtleSIsImVsZW0iLCJwdXNoIiwiaXNMZWFmIiwiY2FsbGJhY2siLCJwYXJlbnRzIiwicGFyZW50IiwiaSIsImluZGV4IiwiZGVzY2VuZCIsImFkZENsYXNzIiwiX3Nob3ciLCJhc2NlbmQiLCJwIiwi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QUcsQ0FBQyxLQUFLcEUsUUFBTCxDQUFjZSxtQkFBbEIsRUFBc0M7QUFDcEMsbUJBQUtELFFBQUwsQ0FBYzRCLFdBQWQsQ0FBMEIsb0JBQTFCO0FBQ0EsbUJBQUs1QixRQUFMLENBQWM0QixXQUFkLENBQTBCLG9CQUExQjtBQUNBLG1CQUFLQyxrQkFBTDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7Ozt3QkE3SFc7QUFDVixhQUFPLEtBQUtkLFdBQUwsQ0FBaUJKLE1BQWpCLEtBQTRCLENBQW5DO0FBQ0Q7Ozt3QkFFVztBQUNWLGFBQU8sS0FBS2MsV0FBTCxLQUFxQjdCLFNBQTVCO0FBQ0Q7Ozt3QkFZYztBQUNiLFVBQUcsQ0FBQyxLQUFLNkIsV0FBVCxFQUFxQjtBQUNuQixlQUFPLElBQVA7QUFDRDs7QUFFRCxVQUFJaUIsU0FBUyxLQUFLakIsV0FBbEI7QUFDQSxhQUFNaUIsT0FBT2pCLFdBQWIsRUFBeUI7QUFDdkJpQixpQkFBU0EsT0FBT2pCLFdBQWhCO0FBQ0Q7O0FBRUQsYUFBT2lCLE1BQVA7QUFDRDs7Ozs7O2tCQW5Ga0JsQixLIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMyYjcxNmZlNTVmOWY5MmFhNmNjIiwiaW1wb3J0IENhcm91c2VsIGZyb20gJy4vY2xhc3Nlcy9DYXJvdXNlbCdcclxuXHJcbiQoKCkgPT4ge1xyXG4gICQoJy5zZHgtY2Fyb3VzZWwnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCAkZWxlbSA9ICQodGhpcylcclxuICAgIGNvbnN0IGNhcm91c2VsID0gbmV3IENhcm91c2VsKCRlbGVtKVxyXG5cclxuICAgIGNvbnN0IGludGVydmFsID0gJGVsZW0uYXR0cignZGF0YS1pbnRlcnZhbCcpXHJcbiAgICBpZihpbnRlcnZhbCl7XHJcbiAgICAgIGNhcm91c2VsLnN0YXJ0KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNhcm91c2VsLnBhbmVsLmRpc3BsYXkoKVxyXG4gICAgfVxyXG5cclxuICAgICRlbGVtLmRhdGEoJ3NkeENhcm91c2VsJywgY2Fyb3VzZWwpXHJcbiAgfSlcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiLCJpbXBvcnQgUGFuZWwgZnJvbSAnLi9QYW5lbCdcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJvdXNlbFxyXG57XHJcbiAgY29uc3RydWN0b3IoJGVsZW0pIHtcclxuICAgIC8v44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44KL44GL44CB5LiA5pmC5YGc5q2i44GX44Gm44GE44KL44GL44Gu44OV44Op44KwXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICAgIC8v44K544Op44Kk44OJ44K344On44O844Gu44Kk44Oz44K/44O844OQ44Or44CC44K544K/44O844OI44GX44Gm44KL44GL44CB5q2i44G+44Gj44Gm44GE44KL44GL44Gu44OV44Op44Kw44Gr44KC5L2/44Gj44Gm44GE44G+44GZ44CCXHJcbiAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHVuZGVmaW5lZFxyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjga7nubDjgorov5TjgZfjga/jgqTjg7Pjgr/jg7zjg5Djg6vjgafjga/jgarjgY9UaW1lb3V044KS5YaN5biw55qE44Gr6Kqt44KT44Gn5a6f54++44GX44Gm44GE44G+44GZ44CC44Gd44Gu44Kv44Oq44Ki55So44Gu44Kt44O844CCXHJcbiAgICB0aGlzLl9ydW5UaW1lb3V0S2V5ID0gLTFcclxuICAgIC8v54++5Zyo6KGo56S65Lit44Gu5p6d6JGJ44OR44ON44Or44KS5L+d5oyB44GX44Gm44GE44G+44GZ44CC5q2i44G+44Gj44Gf44Go44GN57aa44GN44GL44KJ5YaN55Sf44GZ44KL44Gf44KB44CCXHJcbiAgICAvLyB0aGlzLl9jdXJyZW50TGVhZiA9IHVuZGVmaW5lZFxyXG4gICAgdGhpcy5fY3VycmVudFBhbmVscyA9IFtdXHJcbiAgICAvL0RPTeS4iuOBruODnOOCv+ODs+OCkuaKvOOBmeOBqG1vdXNlbGVhdmXjgYznmbrnlJ/jgZfjgabjgZfjgb7jgYbjga7jgafjgq/jg6rjg4Pjgq/mmYLjgavjg5Xjg6njgrDjgpLnq4vjgabnmbrnlJ/jgpLmipHmraLjgIJcclxuICAgIHRoaXMuX2NsaWNraW5nQnV0dG9uID0gZmFsc2VcclxuXHJcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1cclxuXHJcbiAgICB0aGlzLl90cmFuc2l0aW9uRHVyYXRpb24gPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtdHJhbnNpdGlvbi1kdXJhdGlvbicpXHJcblxyXG4gICAgdGhpcy5wYW5lbCA9IG5ldyBQYW5lbCh0aGlzLCAkZWxlbSlcclxuXHJcbiAgICAvL+ODnuOCpuOCueOCquODvOODkOODvOaZguOBr+atouOCgeOCi1xyXG4gICAgLy/jgr/jg4Pjg4HmmYLjgat0b3VjaHN0YXJ0PnRvdWNoZW5kPm1vdXNlZW50ZXLjgajjgYTjgYborI7jgarpoIbjgafnmbrnlJ/jgZflpInjgarmjJnli5Xjgavjgarjgovjga7jgafjgIHjgr/jg4Pjg4Hjg4fjg5DjgqTjgrnjgafjga/jgoTjgonjgarjgYTjgIJcclxuICAgIGlmKCEoXCJvbnRvdWNoc3RhcnRcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKXtcclxuICAgICAgdGhpcy4kZWxlbWVudC5vbignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICB0aGlzLnBhdXNlKClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoIXRoaXMuX2NsaWNraW5nQnV0dG9uKXtcclxuICAgICAgICAgIHRoaXMucmVzdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44KL44Gp44GG44GL44CC44Od44O844K644Gn44KC5YGc5q2i44Gn44KC44Gp44Gh44KJ44Gn44KCZmFsc2XjgafjgZnjgIJcclxuICAgKi9cclxuICBnZXQgaXNSdW5uaW5nKCl7XHJcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZyAmJiB0aGlzLl9ydW5JbnRlcnZhbCAhPT0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zlrp/ooYzmmYLjgavnubDjgorov5TjgZflkbzjgbDjgozjgb7jgZnjgIJzZXRJbnRlcnZhbOOBr+S9v+OCj+OBmuOBq3NldFRpbWVvdXTjga7lho3luLDlkbzjgbPlh7rjgZfjgpLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgKi9cclxuICBfbmV4dCgpe1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3J1blRpbWVvdXRLZXkpXHJcblxyXG4gICAgdGhpcy5fcnVuVGltZW91dEtleSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZighdGhpcy5pc1J1bm5pbmcpe1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjdXJyZW50TGVhZiA9IHRoaXMuX2N1cnJlbnRQYW5lbHNbdGhpcy5fY3VycmVudFBhbmVscy5sZW5ndGggLSAxXVxyXG4gICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5sZWFmcy5pbmRleE9mKGN1cnJlbnRMZWFmKSArIDFcclxuICAgICAgaWYodGhpcy5sZWFmc1tuZXh0SW5kZXhdKXtcclxuICAgICAgICB0aGlzLmxlYWZzW25leHRJbmRleF0uZGlzcGxheSgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5jaGlsZFBhbmVsc1swXS5kaXNwbGF5KClcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fbmV4dCgpXHJcblxyXG4gICAgfSwgdGhpcy5fcnVuSW50ZXJ2YWwpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLjg53jg7zjgrrjgZfjgb7jgZnjgILlho3jgrnjgr/jg7zjg4jjga9yZXN0YXJ044Gn44GK6aGY44GE44GX44G+44GZ44CCXHJcbiAgICovXHJcbiAgcGF1c2UoKXtcclxuICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOODneODvOOCuuaZguOBruWGjeOCueOCv+ODvOODiFxyXG4gICAqL1xyXG4gIHJlc3RhcnQoKXtcclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlXHJcbiAgICB0aGlzLl9uZXh0KClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuWBnOatouOBl+OBvuOBmeOAglxyXG4gICAqL1xyXG4gIHN0b3AoKXtcclxuICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44K544K/44O844OI44GV44Gb44KL44CC44Kk44Oz44K/44O844OQ44Or44GvZGF0YS1pbnRlcnZhbOOBi+OCieWPluOCiuOBvuOBmeOAglxyXG4gICAqL1xyXG4gIHN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5wYW5lbC5kaXNwbGF5KClcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKCF0aGlzLl9ydW5JbnRlcnZhbCl7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgZGF0YS1pbnRlcnZhbCBhdHRyaWJ1dGUgaW4gXCIgKyB0aGlzLl9qcXVlcnlUb1N0cmluZyh0aGlzLiRlbGVtZW50KSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxlYWZzID0gW11cclxuICAgIHRoaXMucGFuZWwuYXNzZW1ibGVMZWFmcyh0aGlzLmxlYWZzKTtcclxuXHJcbiAgICB0aGlzLl9uZXh0KClcclxuICB9XHJcblxyXG4gIF9qcXVlcnlUb1N0cmluZygkZWxlbSl7XHJcbiAgICBjb25zdCBodG1sID0gJGVsZW0uZ2V0KDApLm91dGVySFRNTFxyXG4gICAgcmV0dXJuIGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPicpICsgMSlcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL0Nhcm91c2VsLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKGNhcm91c2VsLCAkZWxlbSwgcGFyZW50UGFuZWwpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbFxyXG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtXHJcbiBcclxuICAgIGlmKHRoaXMuY2Fyb3VzZWwuX3RyYW5zaXRpb25EdXJhdGlvbil7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLiRlbGVtZW50LmNzcyh7J3RyYW5zaXRpb25EdXJhdGlvbic6IHRoaXMuY2Fyb3VzZWwuX3RyYW5zaXRpb25EdXJhdGlvbn0pXHJcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3RyYW5zaXRpb25lbmQnLCAoZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NkeC1jYXJvdXNlbC1yZWFkeScpXHJcbiAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnc2R4LWNhcm91c2VsLXN0YXJ0JylcclxuICAgICAgICB0aGlzLl9jbGVhckJlZm9yZVBhbmVscygpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JlZm9yZVBhbmVscyA9IFtdXHJcblxyXG4gICAgdGhpcy4kYnV0dG9uc1dyYXBwZXIgPSB0aGlzLiRlbGVtZW50LmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1idG5XcmFwcGVyJylcclxuICAgIFxyXG4gICAgdGhpcy5wYXJlbnRQYW5lbCA9IHBhcmVudFBhbmVsXHJcbiAgICBpZih0aGlzLnBhcmVudFBhbmVsKXtcclxuICAgICAgdGhpcy4kYnV0dG9uID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuJylcclxuICAgICAgLy/jg5zjgr/jg7Pjga/opqrjga7jg6njg4Pjg5Hjg7zjgavnqoHjgaPovrzjgb/jgb7jgZnjgILmirzjgZfjgZ/mmYLjgavjgb7jgovjgaPjgajlrZDjg5Hjg43jg6vjgpLlhaXjgozmm7/jgYjjgovjgYvjgonjgafjgZnjgIJcclxuICAgICAgdGhpcy5wYXJlbnRQYW5lbC4kYnV0dG9uc1dyYXBwZXIuYXBwZW5kKHRoaXMuJGJ1dHRvbilcclxuXHJcbiAgICAgIC8v44Oc44K/44Oz44Gu44Kv44Oq44OD44Kv44Kk44OZ44Oz44OI55m76Yyy44CCXHJcbiAgICAgIHRoaXMuJGJ1dHRvbi5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9OXHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSB0cnVlXHJcbiAgICAgICAgLy/oh6rliIbjgpLooajnpLpcclxuICAgICAgICB0aGlzLmRpc3BsYXkoKVxyXG4gICAgICAgIC8v44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44Gf44KJXHJcbiAgICAgICAgaWYodGhpcy5jYXJvdXNlbC5pc1J1bm5pbmcpe1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fbmV4dCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9GRlxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG4gICAgICAgIH0sIDApXHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Q44OR44ON44Or44KS55Sf5oiQ44CCXHJcbiAgICB0aGlzLmNoaWxkUGFuZWxzID0gW11cclxuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLXBhbmVsJykuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHMucHVzaChuZXcgUGFuZWwoY2Fyb3VzZWwsICQoZWxlbSksIHRoaXMpKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8v5p6d6JGJ44OR44ON44Or44GL44Gp44GG44GL44Gu44OB44Kn44OD44Kv44CCXHJcbiAgZ2V0IGlzTGVhZigpe1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRQYW5lbHMubGVuZ3RoID09PSAwXHJcbiAgfVxyXG5cclxuICBnZXQgaXNSb290KCl7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJlbnRQYW5lbCA9PT0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruWtkOimgee0oOOCkumbhuOCgeOCi+OAglxyXG4gIGFzc2VtYmxlTGVhZnMobGVhZnMpe1xyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICBsZWFmcy5wdXNoKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgJC5lYWNoKHRoaXMuY2hpbGRQYW5lbHMsIChrZXksIHBhbmVsKSA9PiBwYW5lbC5hc3NlbWJsZUxlYWZzKGxlYWZzKSlcclxuICB9XHJcblxyXG4gIC8v44Or44O844OI44Gu44OR44ON44OrXHJcbiAgZ2V0IHJvb3RQYW5lbCgpe1xyXG4gICAgaWYoIXRoaXMucGFyZW50UGFuZWwpe1xyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudFBhbmVsXHJcbiAgICB3aGlsZShwYXJlbnQucGFyZW50UGFuZWwpe1xyXG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50UGFuZWxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50XHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruimquODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi+OAglxyXG4gIGFzY2VuZChjYWxsYmFjayl7XHJcbiAgICB2YXIgcGFyZW50cyA9IFtdXHJcbiAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnRQYW5lbFxyXG4gICAgd2hpbGUocGFyZW50KXtcclxuICAgICAgcGFyZW50cy5wdXNoKHBhcmVudClcclxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudFBhbmVsXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IHBhcmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgY2FsbGJhY2socGFyZW50c1tpXSkgICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8v5oyH5a6a44GX44Gf44Kk44Oz44OH44OD44Kv44K544Gu5a2Q44OR44ON44Or44Gr5a++44GX44Gm6aCG44Gr44Oh44K944OD44OJ44KS5a6f6KGM44GZ44KLXHJcbiAgZGVzY2VuZChpbmRleCwgY2FsbGJhY2spe1xyXG4gICAgaWYodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pe1xyXG4gICAgICBjYWxsYmFjayh0aGlzLmNoaWxkUGFuZWxzW2luZGV4XSlcclxuICAgICAgdGhpcy5jaGlsZFBhbmVsc1tpbmRleF0uZGVzY2VuZChpbmRleCwgY2FsbGJhY2spXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL+OCqOODrOODoeODs+ODiOOCkuimi+OBiOOCi+eKtuaFi+OBq+OBl+OBpuOCr+ODqeOCueOCkuS7mOS4juOAglxyXG4gIF9zaG93KCl7XHJcbiAgICB0aGlzLmNhcm91c2VsLl9jdXJyZW50UGFuZWxzLnB1c2godGhpcylcclxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgIGlmKHRoaXMuJGJ1dHRvbil7XHJcbiAgICAgIHRoaXMuJGJ1dHRvbi5hZGRDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3N0YXJ0U2hvdyhjYWxsYmFjayl7XHJcbiAgICB0aGlzLl9zaG93KClcclxuICAgIHRoaXMuZGVzY2VuZCgwLCBwYW5lbCA9PiBwYW5lbC5fc2hvdygpKVxyXG5cclxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1yZWFkeScpXHJcbiAgICBcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnc2R4LWNhcm91c2VsLXN0YXJ0JylcclxuICAgIH0sIDEwMClcclxuICB9XHJcblxyXG4gIF9jbGVhckJlZm9yZVBhbmVscygpe1xyXG4gICAgJC5lYWNoKHRoaXMuX2JlZm9yZVBhbmVscywgKGtleSwgcGFuZWwpID0+IHtcclxuICAgICAgaWYodGhpcy5jYXJvdXNlbC5fY3VycmVudFBhbmVscy5pbmRleE9mKHBhbmVsKSA9PT0gLTEpe1xyXG4gICAgICAgIHBhbmVsLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICAgICAgcGFuZWwuJGJ1dHRvbi5yZW1vdmVDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuX2JlZm9yZVBhbmVscyA9IFtdXHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICBpZih0aGlzLl9iZWZvcmVQYW5lbHMubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5pei44Gr6KGo56S65Lit44Gn5a2Q5L6b44GM44GE44Gf44KJ5a2Q5L6b44KS6KGo56S644CCXHJcbiAgICBpZih0aGlzLmNhcm91c2VsLl9jdXJyZW50UGFuZWxzLmluZGV4T2YodGhpcykgPj0gMCAmJiB0aGlzLmNoaWxkUGFuZWxzWzBdKXtcclxuICAgICAgdGhpcy5jaGlsZFBhbmVsc1swXS5kaXNwbGF5KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gICAgICB0aGlzLmFzY2VuZChwID0+IHBhcmVudHMucHVzaChwKSlcclxuXHJcbiAgICAgIC8v44K544Op44Kk44OJ44K344On44O844Gu5pmC6KGo56S644GV44KM44Gm44Gq44GE5LiA55Wq5LiK44Gu6Kaq44KS6KGo56S644GX44Gq44GE44Go6Kaq44Gu44OR44ON44Or44Guei1pbmRleOOBjDLjgavjgarjgonjgarjgYTjga7jgafjgqLjg4vjg6Hjg7zjgrfjg6fjg7PmmYLjgavjg5zjgr/jg7Ppg6jliIbjgYzopovjgYjjgarjgYTjgIJcclxuICAgICAgLy/jgZ/jgaDjgZfjgZ3jgozjgYzotbfjgZPjgovjga7jga/jgrnjg6njgqTjg4njgrfjg6fjg7zjga7mmYLjga7jgb/jgILjg5zjgr/jg7PjgafliIfjgormm7/jgYjjgovjgajjgY3jga/opqrjg5Hjg43jg6vjgavjg5zjgr/jg7PjgYzjgYLjgovjga7jgafjgIHopqrjgYzopovjgYjjgarjgYTjgajjgq/jg6rjg4Pjgq/jgafjgY3jgarjgYTjgIJcclxuICAgICAgY29uc3QgaGlkZGVuUGFyZW50cyA9IHBhcmVudHMuZmlsdGVyKHAgPT4gIXAuJGVsZW1lbnQuaXMoJy5zZHgtY2Fyb3VzZWwtY3VycmVudCcpKVxyXG4gICAgICBpZihoaWRkZW5QYXJlbnRzLmxlbmd0aCl7XHJcbiAgICAgICAgaGlkZGVuUGFyZW50c1swXS5kaXNwbGF5KClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL+OCr+ODqeOCueOCkuWkluOBmeOBruOBp+ebtOWJjeOBruODkeODjeODq+OCkuOBqOOBo+OBpuOBiuOBj+OAglxyXG4gICAgICAgIHRoaXMuX2JlZm9yZVBhbmVscyA9IHRoaXMuY2Fyb3VzZWwuX2N1cnJlbnRQYW5lbHNcclxuICAgICAgICAvL+S7iuWbnuihqOekuuOBleOCjOOCi+ODkeODjeODq+OCkumajuWxpOOBp+S/neaMgeOAglxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwuX2N1cnJlbnRQYW5lbHMgPSBbXVxyXG5cclxuICAgICAgICAvL+WQhOODkeODjeODq+OBruOCqOODrOODoeODs+ODiOOCkuihqOekuueKtuaFi+OBuFxyXG4gICAgICAgICQuZWFjaChwYXJlbnRzLCAoa2V5LCBwYW5lbCkgPT4gcGFuZWwuX3Nob3coKSlcclxuXHJcbiAgICAgICAgaWYodGhpcy5pc1Jvb3Qpe1xyXG4gICAgICAgICAgdGhpcy5fc2hvdygpXHJcbiAgICAgICAgICB0aGlzLmRlc2NlbmQoMCwgcGFuZWwgPT4gcGFuZWwuX3Nob3coKSlcclxuICAgICAgICAgIHRoaXMuX2NsZWFyQmVmb3JlUGFuZWxzKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fc3RhcnRTaG93KClcclxuICAgICAgICAgIGlmKCF0aGlzLmNhcm91c2VsLl90cmFuc2l0aW9uRHVyYXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtcmVhZHknKVxyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtc3RhcnQnKVxyXG4gICAgICAgICAgICB0aGlzLl9jbGVhckJlZm9yZVBhbmVscygpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=