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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjI2NzAyODRlODgyMWE4MzU5YmUiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudFBhbmVscyIsIl9jbGlja2luZ0J1dHRvbiIsIiRlbGVtZW50IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJvbiIsInBhdXNlIiwicmVzdGFydCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJpc1J1bm5pbmciLCJjdXJyZW50TGVhZiIsImxlbmd0aCIsIm5leHRJbmRleCIsImxlYWZzIiwiaW5kZXhPZiIsImNoaWxkUGFuZWxzIiwiX25leHQiLCJFcnJvciIsIl9qcXVlcnlUb1N0cmluZyIsImFzc2VtYmxlTGVhZnMiLCJodG1sIiwiZ2V0Iiwib3V0ZXJIVE1MIiwic3Vic3RyIiwiUGFuZWwiLCJwYXJlbnRQYW5lbCIsImUiLCJyZW1vdmVDbGFzcyIsIl9jbGVhckJlZm9yZVBhbmVscyIsIl9iZWZvcmVQYW5lbHMiLCIkYnV0dG9uc1dyYXBwZXIiLCJmaW5kIiwiJGJ1dHRvbiIsImFwcGVuZCIsInByZXZlbnREZWZhdWx0Iiwia2V5IiwiZWxlbSIsInB1c2giLCJpc0xlYWYiLCJjYWxsYmFjayIsInBhcmVudHMiLCJwYXJlbnQiLCJpIiwiaW5kZXgiLCJkZXNjZW5kIiwiYWRkQ2xhc3MiLCJfc2hvdyIsImFzY2VuZCIsInAiLCJpc1Jvb3QiLCJfc3RhcnRTaG93Il0sIm1hcHBp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VSxFQUFoQjtBQUNBLGFBQUtPLE1BQUwsQ0FBWTtBQUFBLGlCQUFLUCxRQUFRSCxJQUFSLENBQWFXLENBQWIsQ0FBTDtBQUFBLFNBQVo7O0FBRUE7QUFDQSxhQUFLbkIsYUFBTCxHQUFxQixLQUFLMUMsUUFBTCxDQUFjWSxjQUFuQztBQUNBO0FBQ0EsYUFBS1osUUFBTCxDQUFjWSxjQUFkLEdBQStCLEVBQS9COztBQUVBO0FBQ0FmLFVBQUVDLElBQUYsQ0FBT3VELE9BQVAsRUFBZ0IsVUFBQ0wsR0FBRCxFQUFNNUMsS0FBTjtBQUFBLGlCQUFnQkEsTUFBTXVELEtBQU4sRUFBaEI7QUFBQSxTQUFoQjs7QUFFQSxZQUFHLEtBQUtHLE1BQVIsRUFBZTtBQUNiLGVBQUtILEtBQUw7QUFDQSxlQUFLRixPQUFMLENBQWEsQ0FBYixFQUFnQjtBQUFBLG1CQUFTckQsTUFBTXVELEtBQU4sRUFBVDtBQUFBLFdBQWhCO0FBQ0EsZUFBS2xCLGtCQUFMO0FBQ0QsU0FKRCxNQUlPO0FBQ0w7QUFDQSxlQUFLc0IsVUFBTCxDQUFnQixZQUFNO0FBQ3BCLG1CQUFLdEIsa0JBQUw7QUFDRCxXQUZEO0FBR0Q7QUFDRjtBQUNGOzs7d0JBcEhXO0FBQ1YsYUFBTyxLQUFLYixXQUFMLENBQWlCSixNQUFqQixLQUE0QixDQUFuQztBQUNEOzs7d0JBRVc7QUFDVixhQUFPLEtBQUtjLFdBQUwsS0FBcUI1QixTQUE1QjtBQUNEOzs7d0JBWWM7QUFDYixVQUFHLENBQUMsS0FBSzRCLFdBQVQsRUFBcUI7QUFDbkIsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBSWdCLFNBQVMsS0FBS2hCLFdBQWxCO0FBQ0EsYUFBTWdCLE9BQU9oQixXQUFiLEVBQXlCO0FBQ3ZCZ0IsaUJBQVNBLE9BQU9oQixXQUFoQjtBQUNEOztBQUVELGFBQU9nQixNQUFQO0FBQ0Q7Ozs7OztrQkEvRWtCakIsSyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyMjY3MDI4NGU4ODIxYTgzNTliZSIsImltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2NsYXNzZXMvQ2Fyb3VzZWwnXHJcblxyXG4kKCgpID0+IHtcclxuICAkKCcuc2R4LWNhcm91c2VsJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgJGVsZW0gPSAkKHRoaXMpXHJcbiAgICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCgkZWxlbSlcclxuXHJcbiAgICBjb25zdCBpbnRlcnZhbCA9ICRlbGVtLmF0dHIoJ2RhdGEtaW50ZXJ2YWwnKVxyXG4gICAgaWYoaW50ZXJ2YWwpe1xyXG4gICAgICBjYXJvdXNlbC5zdGFydCgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYXJvdXNlbC5wYW5lbC5kaXNwbGF5KClcclxuICAgIH1cclxuXHJcbiAgICAkZWxlbS5kYXRhKCdzZHhDYXJvdXNlbCcsIGNhcm91c2VsKVxyXG4gIH0pXHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IFBhbmVsIGZyb20gJy4vUGFuZWwnXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRlbGVtKSB7XHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBjOWLleOBhOOBpuOCi+OBi+OAgeS4gOaZguWBnOatouOBl+OBpuOBhOOCi+OBi+OBruODleODqeOCsFxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBruOCpOODs+OCv+ODvOODkOODq+OAguOCueOCv+ODvOODiOOBl+OBpuOCi+OBi+OAgeatouOBvuOBo+OBpuOBhOOCi+OBi+OBruODleODqeOCsOOBq+OCguS9v+OBo+OBpuOBhOOBvuOBmeOAglxyXG4gICAgdGhpcy5fcnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICAgIC8v44K544Op44Kk44OJ44K344On44O844Gu57mw44KK6L+U44GX44Gv44Kk44Oz44K/44O844OQ44Or44Gn44Gv44Gq44GPVGltZW91dOOCkuWGjeW4sOeahOOBq+iqreOCk+OBp+Wun+ePvuOBl+OBpuOBhOOBvuOBmeOAguOBneOBruOCr+ODquOCoueUqOOBruOCreODvOOAglxyXG4gICAgdGhpcy5fcnVuVGltZW91dEtleSA9IC0xXHJcbiAgICAvL+ePvuWcqOihqOekuuS4reOBruaeneiRieODkeODjeODq+OCkuS/neaMgeOBl+OBpuOBhOOBvuOBmeOAguatouOBvuOBo+OBn+OBqOOBjee2muOBjeOBi+OCieWGjeeUn+OBmeOCi+OBn+OCgeOAglxyXG4gICAgLy8gdGhpcy5fY3VycmVudExlYWYgPSB1bmRlZmluZWRcclxuICAgIHRoaXMuX2N1cnJlbnRQYW5lbHMgPSBbXVxyXG4gICAgLy9ET03kuIrjga7jg5zjgr/jg7PjgpLmirzjgZnjgahtb3VzZWxlYXZl44GM55m655Sf44GX44Gm44GX44G+44GG44Gu44Gn44Kv44Oq44OD44Kv5pmC44Gr44OV44Op44Kw44KS56uL44Gm55m655Sf44KS5oqR5q2i44CCXHJcbiAgICB0aGlzLl9jbGlja2luZ0J1dHRvbiA9IGZhbHNlXHJcblxyXG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtXHJcblxyXG4gICAgdGhpcy5wYW5lbCA9IG5ldyBQYW5lbCh0aGlzLCAkZWxlbSlcclxuXHJcbiAgICAvL+ODnuOCpuOCueOCquODvOODkOODvOaZguOBr+atouOCgeOCi1xyXG4gICAgLy/jgr/jg4Pjg4HmmYLjgat0b3VjaHN0YXJ0PnRvdWNoZW5kPm1vdXNlZW50ZXLjgajjgYTjgYborI7jgarpoIbjgafnmbrnlJ/jgZflpInjgarmjJnli5Xjgavjgarjgovjga7jgafjgIHjgr/jg4Pjg4Hjg4fjg5DjgqTjgrnjgafjga/jgoTjgonjgarjgYTjgIJcclxuICAgIGlmKCEoXCJvbnRvdWNoc3RhcnRcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKXtcclxuICAgICAgdGhpcy4kZWxlbWVudC5vbignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICB0aGlzLnBhdXNlKClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoIXRoaXMuX2NsaWNraW5nQnV0dG9uKXtcclxuICAgICAgICAgIHRoaXMucmVzdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44KL44Gp44GG44GL44CC44Od44O844K644Gn44KC5YGc5q2i44Gn44KC44Gp44Gh44KJ44Gn44KCZmFsc2XjgafjgZnjgIJcclxuICAgKi9cclxuICBnZXQgaXNSdW5uaW5nKCl7XHJcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZyAmJiB0aGlzLl9ydW5JbnRlcnZhbCAhPT0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zlrp/ooYzmmYLjgavnubDjgorov5TjgZflkbzjgbDjgozjgb7jgZnjgIJzZXRJbnRlcnZhbOOBr+S9v+OCj+OBmuOBq3NldFRpbWVvdXTjga7lho3luLDlkbzjgbPlh7rjgZfjgpLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgKi9cclxuICBfbmV4dCgpe1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3J1blRpbWVvdXRLZXkpXHJcblxyXG4gICAgdGhpcy5fcnVuVGltZW91dEtleSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZighdGhpcy5pc1J1bm5pbmcpe1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjdXJyZW50TGVhZiA9IHRoaXMuX2N1cnJlbnRQYW5lbHNbdGhpcy5fY3VycmVudFBhbmVscy5sZW5ndGggLSAxXVxyXG4gICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5sZWFmcy5pbmRleE9mKGN1cnJlbnRMZWFmKSArIDFcclxuICAgICAgaWYodGhpcy5sZWFmc1tuZXh0SW5kZXhdKXtcclxuICAgICAgICB0aGlzLmxlYWZzW25leHRJbmRleF0uZGlzcGxheSgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5jaGlsZFBhbmVsc1swXS5kaXNwbGF5KClcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fbmV4dCgpXHJcblxyXG4gICAgfSwgdGhpcy5fcnVuSW50ZXJ2YWwpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLjg53jg7zjgrrjgZfjgb7jgZnjgILlho3jgrnjgr/jg7zjg4jjga9yZXN0YXJ044Gn44GK6aGY44GE44GX44G+44GZ44CCXHJcbiAgICovXHJcbiAgcGF1c2UoKXtcclxuICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOODneODvOOCuuaZguOBruWGjeOCueOCv+ODvOODiFxyXG4gICAqL1xyXG4gIHJlc3RhcnQoKXtcclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlXHJcbiAgICB0aGlzLl9uZXh0KClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuWBnOatouOBl+OBvuOBmeOAglxyXG4gICAqL1xyXG4gIHN0b3AoKXtcclxuICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44K544K/44O844OI44GV44Gb44KL44CC44Kk44Oz44K/44O844OQ44Or44GvZGF0YS1pbnRlcnZhbOOBi+OCieWPluOCiuOBvuOBmeOAglxyXG4gICAqL1xyXG4gIHN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5wYW5lbC5kaXNwbGF5KClcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKCF0aGlzLl9ydW5JbnRlcnZhbCl7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgZGF0YS1pbnRlcnZhbCBhdHRyaWJ1dGUgaW4gXCIgKyB0aGlzLl9qcXVlcnlUb1N0cmluZyh0aGlzLiRlbGVtZW50KSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxlYWZzID0gW11cclxuICAgIHRoaXMucGFuZWwuYXNzZW1ibGVMZWFmcyh0aGlzLmxlYWZzKTtcclxuXHJcbiAgICB0aGlzLl9uZXh0KClcclxuICB9XHJcblxyXG4gIF9qcXVlcnlUb1N0cmluZygkZWxlbSl7XHJcbiAgICBjb25zdCBodG1sID0gJGVsZW0uZ2V0KDApLm91dGVySFRNTFxyXG4gICAgcmV0dXJuIGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPicpICsgMSlcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL0Nhcm91c2VsLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKGNhcm91c2VsLCAkZWxlbSwgcGFyZW50UGFuZWwpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbFxyXG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtXHJcblxyXG4gICAgdGhpcy4kZWxlbWVudC5vbigndHJhbnNpdGlvbmVuZCcsIChlKSA9PiB7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NkeC1jYXJvdXNlbC1yZWFkeScpXHJcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NkeC1jYXJvdXNlbC1zdGFydCcpXHJcbiAgICAgIHRoaXMuX2NsZWFyQmVmb3JlUGFuZWxzKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuX2JlZm9yZVBhbmVscyA9IFtdXHJcblxyXG4gICAgdGhpcy4kYnV0dG9uc1dyYXBwZXIgPSB0aGlzLiRlbGVtZW50LmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1idG5XcmFwcGVyJylcclxuICAgIFxyXG4gICAgdGhpcy5wYXJlbnRQYW5lbCA9IHBhcmVudFBhbmVsXHJcbiAgICBpZih0aGlzLnBhcmVudFBhbmVsKXtcclxuICAgICAgdGhpcy4kYnV0dG9uID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuJylcclxuICAgICAgLy/jg5zjgr/jg7Pjga/opqrjga7jg6njg4Pjg5Hjg7zjgavnqoHjgaPovrzjgb/jgb7jgZnjgILmirzjgZfjgZ/mmYLjgavjgb7jgovjgaPjgajlrZDjg5Hjg43jg6vjgpLlhaXjgozmm7/jgYjjgovjgYvjgonjgafjgZnjgIJcclxuICAgICAgdGhpcy5wYXJlbnRQYW5lbC4kYnV0dG9uc1dyYXBwZXIuYXBwZW5kKHRoaXMuJGJ1dHRvbilcclxuXHJcbiAgICAgIC8v44Oc44K/44Oz44Gu44Kv44Oq44OD44Kv44Kk44OZ44Oz44OI55m76Yyy44CCXHJcbiAgICAgIHRoaXMuJGJ1dHRvbi5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9OXHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSB0cnVlXHJcbiAgICAgICAgLy/oh6rliIbjgpLooajnpLpcclxuICAgICAgICB0aGlzLmRpc3BsYXkoKVxyXG4gICAgICAgIC8v44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44Gf44KJXHJcbiAgICAgICAgaWYodGhpcy5jYXJvdXNlbC5pc1J1bm5pbmcpe1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fbmV4dCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9GRlxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG4gICAgICAgIH0sIDApXHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Q44OR44ON44Or44KS55Sf5oiQ44CCXHJcbiAgICB0aGlzLmNoaWxkUGFuZWxzID0gW11cclxuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLXBhbmVsJykuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHMucHVzaChuZXcgUGFuZWwoY2Fyb3VzZWwsICQoZWxlbSksIHRoaXMpKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8v5p6d6JGJ44OR44ON44Or44GL44Gp44GG44GL44Gu44OB44Kn44OD44Kv44CCXHJcbiAgZ2V0IGlzTGVhZigpe1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRQYW5lbHMubGVuZ3RoID09PSAwXHJcbiAgfVxyXG5cclxuICBnZXQgaXNSb290KCl7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJlbnRQYW5lbCA9PT0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruWtkOimgee0oOOCkumbhuOCgeOCi+OAglxyXG4gIGFzc2VtYmxlTGVhZnMobGVhZnMpe1xyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICBsZWFmcy5wdXNoKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgJC5lYWNoKHRoaXMuY2hpbGRQYW5lbHMsIChrZXksIHBhbmVsKSA9PiBwYW5lbC5hc3NlbWJsZUxlYWZzKGxlYWZzKSlcclxuICB9XHJcblxyXG4gIC8v44Or44O844OI44Gu44OR44ON44OrXHJcbiAgZ2V0IHJvb3RQYW5lbCgpe1xyXG4gICAgaWYoIXRoaXMucGFyZW50UGFuZWwpe1xyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudFBhbmVsXHJcbiAgICB3aGlsZShwYXJlbnQucGFyZW50UGFuZWwpe1xyXG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50UGFuZWxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50XHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruimquODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi+OAglxyXG4gIGFzY2VuZChjYWxsYmFjayl7XHJcbiAgICB2YXIgcGFyZW50cyA9IFtdXHJcbiAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnRQYW5lbFxyXG4gICAgd2hpbGUocGFyZW50KXtcclxuICAgICAgcGFyZW50cy5wdXNoKHBhcmVudClcclxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudFBhbmVsXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IHBhcmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgY2FsbGJhY2socGFyZW50c1tpXSkgICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8v5oyH5a6a44GX44Gf44Kk44Oz44OH44OD44Kv44K544Gu5a2Q44OR44ON44Or44Gr5a++44GX44Gm6aCG44Gr44Oh44K944OD44OJ44KS5a6f6KGM44GZ44KLXHJcbiAgZGVzY2VuZChpbmRleCwgY2FsbGJhY2spe1xyXG4gICAgaWYodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pe1xyXG4gICAgICBjYWxsYmFjayh0aGlzLmNoaWxkUGFuZWxzW2luZGV4XSlcclxuICAgICAgdGhpcy5jaGlsZFBhbmVsc1tpbmRleF0uZGVzY2VuZChpbmRleCwgY2FsbGJhY2spXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL+OCqOODrOODoeODs+ODiOOCkuimi+OBiOOCi+eKtuaFi+OBq+OBl+OBpuOCr+ODqeOCueOCkuS7mOS4juOAglxyXG4gIF9zaG93KCl7XHJcbiAgICB0aGlzLmNhcm91c2VsLl9jdXJyZW50UGFuZWxzLnB1c2godGhpcylcclxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgIGlmKHRoaXMuJGJ1dHRvbil7XHJcbiAgICAgIHRoaXMuJGJ1dHRvbi5hZGRDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3N0YXJ0U2hvdyhjYWxsYmFjayl7XHJcbiAgICB0aGlzLl9zaG93KClcclxuICAgIHRoaXMuZGVzY2VuZCgwLCBwYW5lbCA9PiBwYW5lbC5fc2hvdygpKVxyXG5cclxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1yZWFkeScpXHJcbiAgICBcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnc2R4LWNhcm91c2VsLXN0YXJ0JylcclxuICAgIH0sIDEwMClcclxuICB9XHJcblxyXG4gIF9jbGVhckJlZm9yZVBhbmVscygpe1xyXG4gICAgJC5lYWNoKHRoaXMuX2JlZm9yZVBhbmVscywgKGtleSwgcGFuZWwpID0+IHtcclxuICAgICAgaWYodGhpcy5jYXJvdXNlbC5fY3VycmVudFBhbmVscy5pbmRleE9mKHBhbmVsKSA9PT0gLTEpe1xyXG4gICAgICAgIHBhbmVsLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICAgICAgcGFuZWwuJGJ1dHRvbi5yZW1vdmVDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuX2JlZm9yZVBhbmVscyA9IFtdXHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICBpZih0aGlzLl9iZWZvcmVQYW5lbHMubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5pei44Gr6KGo56S65Lit44Gn5a2Q5L6b44GM44GE44Gf44KJ5a2Q5L6b44KS6KGo56S644CCXHJcbiAgICBpZih0aGlzLmNhcm91c2VsLl9jdXJyZW50UGFuZWxzLmluZGV4T2YodGhpcykgPj0gMCAmJiB0aGlzLmNoaWxkUGFuZWxzWzBdKXtcclxuICAgICAgdGhpcy5jaGlsZFBhbmVsc1swXS5kaXNwbGF5KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gICAgICB0aGlzLmFzY2VuZChwID0+IHBhcmVudHMucHVzaChwKSlcclxuICAgICAgXHJcbiAgICAgIC8v44Kv44Op44K544KS5aSW44GZ44Gu44Gn55u05YmN44Gu44OR44ON44Or44KS44Go44Gj44Gm44GK44GP44CCXHJcbiAgICAgIHRoaXMuX2JlZm9yZVBhbmVscyA9IHRoaXMuY2Fyb3VzZWwuX2N1cnJlbnRQYW5lbHNcclxuICAgICAgLy/ku4rlm57ooajnpLrjgZXjgozjgovjg5Hjg43jg6vjgpLpmo7lsaTjgafkv53mjIHjgIJcclxuICAgICAgdGhpcy5jYXJvdXNlbC5fY3VycmVudFBhbmVscyA9IFtdXHJcblxyXG4gICAgICAvL+WQhOODkeODjeODq+OBruOCqOODrOODoeODs+ODiOOCkuihqOekuueKtuaFi+OBuFxyXG4gICAgICAkLmVhY2gocGFyZW50cywgKGtleSwgcGFuZWwpID0+IHBhbmVsLl9zaG93KCkpXHJcblxyXG4gICAgICBpZih0aGlzLmlzUm9vdCl7XHJcbiAgICAgICAgdGhpcy5fc2hvdygpXHJcbiAgICAgICAgdGhpcy5kZXNjZW5kKDAsIHBhbmVsID0+IHBhbmVsLl9zaG93KCkpXHJcbiAgICAgICAgdGhpcy5fY2xlYXJCZWZvcmVQYW5lbHMoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdhbmltJylcclxuICAgICAgICB0aGlzLl9zdGFydFNob3coKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fY2xlYXJCZWZvcmVQYW5lbHMoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL1BhbmVsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==