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
      this.$button.on('click', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDBhOTM1OTQyOWEwNjVhMzFmZWUiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudExlYWYiLCJfY2xpY2tpbmdCdXR0b24iLCIkZWxlbWVudCIsImNzcyIsInBvc2l0aW9uIiwiaGVpZ2h0IiwiRXJyb3IiLCJfanF1ZXJ5VG9TdHJpbmciLCJvdmVyZmxvdyIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwib24iLCJwYXVzZSIsInJlc3RhcnQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaXNSdW5uaW5nIiwibmV4dEluZGV4IiwibGVhZnMiLCJpbmRleE9mIiwiX25leHQiLCJhc3NlbWJsZUxlYWZzIiwiaHRtbCIsImdldCIsIm91dGVySFRNTCIsInN1YnN0ciIsIlBhbmVsIiwicGFyZW50UGFuZWwiLCIkYnV0dG9uc1dyYXBwZXIiLCJmaW5kIiwid2lkdGgiLCIkYnV0dG9uIiwiYXBwZW5kIiwiY2hpbGRQYW5lbHMiLCJrZXkiLCJlbGVtIiwicHVzaCIsInBhcmVudHMiLCJwYXJlbnQiLCJpc0xlYWYiLCJjYWxsYmFjayIsImFzc2VtYmxlRGlyZWN0UGFyZW50cyIsImluZGV4IiwiZGVzY2VuZCIsInpJbmRleCIsImFkZENsYXNzIiwiJGN1cnJlbnRzIiwicm9vdFBhbmVsIiwiZmlsdGVyIiwicmVtb3ZlQ2xhc3MiLCJfc2hvdyIsImFzY2VuZCIsImxlbmd0aCJd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LENBQWtCLEVBQUN5QyxRQUFRLENBQVQsRUFBbEI7QUFDQSxXQUFLMUMsUUFBTCxDQUFjMkMsUUFBZCxDQUF1QixzQkFBdkI7QUFDQSxVQUFHLEtBQUtkLE9BQVIsRUFBZ0I7QUFDZCxhQUFLQSxPQUFMLENBQWFjLFFBQWIsQ0FBc0Isc0JBQXRCO0FBQ0Q7O0FBRUQsVUFBRyxLQUFLTixNQUFSLEVBQWU7QUFDYixhQUFLbkQsUUFBTCxDQUFjWSxZQUFkLEdBQTZCLElBQTdCO0FBQ0Q7QUFDRjs7OzhCQUVRO0FBQ1A7QUFDQSxVQUFNOEMsWUFBWSxLQUFLQyxTQUFMLENBQWU3QyxRQUFmLENBQXdCMkIsSUFBeEIsQ0FBNkIsdUJBQTdCLENBQWxCO0FBQ0FpQixnQkFBVUUsTUFBVixDQUFpQixxQkFBakIsRUFBd0M3QyxHQUF4QyxDQUE0QyxFQUFDeUMsUUFBUSxFQUFULEVBQTVDO0FBQ0FFLGdCQUFVRyxXQUFWLENBQXNCLHNCQUF0Qjs7QUFFQTtBQUNBLFdBQUtDLEtBQUw7QUFDQSxXQUFLQyxNQUFMLENBQVk7QUFBQSxlQUFTM0QsTUFBTTBELEtBQU4sRUFBVDtBQUFBLE9BQVo7QUFDQSxXQUFLUCxPQUFMLENBQWEsQ0FBYixFQUFnQjtBQUFBLGVBQVNuRCxNQUFNMEQsS0FBTixFQUFUO0FBQUEsT0FBaEI7QUFDRDs7O3dCQXpFVztBQUNWLGFBQU8sS0FBS2pCLFdBQUwsQ0FBaUJtQixNQUFqQixLQUE0QixDQUFuQztBQUNEOzs7d0JBcUJjO0FBQ2IsVUFBTWYsVUFBVSxFQUFoQjtBQUNBLFdBQUtJLHFCQUFMLENBQTJCSixPQUEzQjtBQUNBLFVBQUdBLFFBQVFlLE1BQVIsS0FBbUIsQ0FBdEIsRUFBd0I7QUFDdEIsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsYUFBT2YsUUFBUUEsUUFBUWUsTUFBUixHQUFpQixDQUF6QixDQUFQO0FBQ0Q7Ozs7OztrQkExRWtCMUIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAwYTkzNTk0MjlhMDY1YTMxZmVlIiwiaW1wb3J0IENhcm91c2VsIGZyb20gJy4vY2xhc3Nlcy9DYXJvdXNlbCdcclxuXHJcbiQoKCkgPT4ge1xyXG4gICQoJy5zZHgtY2Fyb3VzZWwnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCAkZWxlbSA9ICQodGhpcylcclxuICAgIGNvbnN0IGNhcm91c2VsID0gbmV3IENhcm91c2VsKCRlbGVtKVxyXG5cclxuICAgIGNvbnN0IGludGVydmFsID0gJGVsZW0uYXR0cignZGF0YS1pbnRlcnZhbCcpXHJcbiAgICBpZihpbnRlcnZhbCl7XHJcbiAgICAgIGNhcm91c2VsLnN0YXJ0KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNhcm91c2VsLnBhbmVsLmRpc3BsYXkoKVxyXG4gICAgfVxyXG5cclxuICAgICRlbGVtLmRhdGEoJ3NkeENhcm91c2VsJywgY2Fyb3VzZWwpXHJcbiAgfSlcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiLCJpbXBvcnQgUGFuZWwgZnJvbSAnLi9QYW5lbCdcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJvdXNlbFxyXG57XHJcbiAgY29uc3RydWN0b3IoJGVsZW0pIHtcclxuICAgIC8v44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44KL44GL44CB5LiA5pmC5YGc5q2i44GX44Gm44GE44KL44GL44Gu44OV44Op44KwXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICAgIC8v44K544Op44Kk44OJ44K344On44O844Gu44Kk44Oz44K/44O844OQ44Or44CC44K544K/44O844OI44GX44Gm44KL44GL44CB5q2i44G+44Gj44Gm44GE44KL44GL44Gu44OV44Op44Kw44Gr44KC5L2/44Gj44Gm44GE44G+44GZ44CCXHJcbiAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHVuZGVmaW5lZFxyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjga7nubDjgorov5TjgZfjga/jgqTjg7Pjgr/jg7zjg5Djg6vjgafjga/jgarjgY9UaW1lb3V044KS5YaN5biw55qE44Gr6Kqt44KT44Gn5a6f54++44GX44Gm44GE44G+44GZ44CC44Gd44Gu44Kv44Oq44Ki55So44Gu44Kt44O844CCXHJcbiAgICB0aGlzLl9ydW5UaW1lb3V0S2V5ID0gLTFcclxuICAgIC8v54++5Zyo6KGo56S65Lit44Gu5p6d6JGJ44OR44ON44Or44KS5L+d5oyB44GX44Gm44GE44G+44GZ44CC5q2i44G+44Gj44Gf44Go44GN57aa44GN44GL44KJ5YaN55Sf44GZ44KL44Gf44KB44CCXHJcbiAgICB0aGlzLl9jdXJyZW50TGVhZiA9IHVuZGVmaW5lZFxyXG4gICAgLy9ET03kuIrjga7jg5zjgr/jg7PjgpLmirzjgZnjgahtb3VzZWxlYXZl44GM55m655Sf44GX44Gm44GX44G+44GG44Gu44Gn44Kv44Oq44OD44Kv5pmC44Gr44OV44Op44Kw44KS56uL44Gm55m655Sf44KS5oqR5q2i44CCXHJcbiAgICB0aGlzLl9jbGlja2luZ0J1dHRvbiA9IGZhbHNlXHJcblxyXG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtXHJcbiAgICAvL+S4gOeVquWkluaeoOOBr3JlbGF0aXZl44CC5LiL5bGk44Gv5YWo44GmYWJzb2x1dGVcclxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtwb3NpdGlvbjogJ3JlbGF0aXZlJ30pXHJcbiAgICB0aGlzLnBhbmVsID0gbmV3IFBhbmVsKHRoaXMsICRlbGVtKVxyXG4gICAgXHJcbiAgICAvL+WkluaeoOOBrumrmOOBleOCkuWIh+OCiuipsOOCgeOCi1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gJGVsZW0uYXR0cignZGF0YS1oZWlnaHQnKVxyXG4gICAgaWYoIWhlaWdodCl7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgZGF0YS1oZWlnaHQgYXR0cmlidXRlIGluIFwiICsgdGhpcy5fanF1ZXJ5VG9TdHJpbmcodGhpcy4kZWxlbWVudCkpXHJcbiAgICB9XHJcbiAgICB0aGlzLiRlbGVtZW50LmhlaWdodChoZWlnaHQpXHJcbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XHJcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xyXG4gICAgfSlcclxuXHJcbiAgICAvL+ODnuOCpuOCueOCquODvOODkOODvOaZguOBr+atouOCgeOCi1xyXG4gICAgLy/jgr/jg4Pjg4HmmYLjgat0b3VjaHN0YXJ0PnRvdWNoZW5kPm1vdXNlZW50ZXLjgajjgYTjgYborI7jgarpoIbjgafnmbrnlJ/jgZflpInjgarmjJnli5Xjgavjgarjgovjga7jgafjgIHjgr/jg4Pjg4Hjg4fjg5DjgqTjgrnjgafjga/jgoTjgonjgarjgYTjgIJcclxuICAgIGlmKCEoXCJvbnRvdWNoc3RhcnRcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKXtcclxuICAgICAgdGhpcy4kZWxlbWVudC5vbignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICB0aGlzLnBhdXNlKClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoIXRoaXMuX2NsaWNraW5nQnV0dG9uKXtcclxuICAgICAgICAgIHRoaXMucmVzdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44KL44Gp44GG44GL44CC44Od44O844K644Gn44KC5YGc5q2i44Gn44KC44Gp44Gh44KJ44Gn44KCZmFsc2XjgafjgZnjgIJcclxuICAgKi9cclxuICBnZXQgaXNSdW5uaW5nKCl7XHJcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZyAmJiB0aGlzLl9ydW5JbnRlcnZhbCAhPT0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zlrp/ooYzmmYLjgavnubDjgorov5TjgZflkbzjgbDjgozjgb7jgZnjgIJzZXRJbnRlcnZhbOOBr+S9v+OCj+OBmuOBq3NldFRpbWVvdXTjga7lho3luLDlkbzjgbPlh7rjgZfjgpLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgKi9cclxuICBfbmV4dCgpe1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3J1blRpbWVvdXRLZXkpXHJcblxyXG4gICAgdGhpcy5fcnVuVGltZW91dEtleSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZighdGhpcy5pc1J1bm5pbmcpe1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5sZWFmcy5pbmRleE9mKHRoaXMuX2N1cnJlbnRMZWFmKSArIDFcclxuICAgICAgaWYoIXRoaXMubGVhZnNbbmV4dEluZGV4XSl7XHJcbiAgICAgICAgbmV4dEluZGV4ID0gMFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGVhZnNbbmV4dEluZGV4XS5kaXNwbGF5KClcclxuXHJcbiAgICAgIHRoaXMuX25leHQoKVxyXG5cclxuICAgIH0sIHRoaXMuX3J1bkludGVydmFsKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44Od44O844K644GX44G+44GZ44CC5YaN44K544K/44O844OI44GvcmVzdGFydOOBp+OBiumhmOOBhOOBl+OBvuOBmeOAglxyXG4gICAqL1xyXG4gIHBhdXNlKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjg53jg7zjgrrmmYLjga7lho3jgrnjgr/jg7zjg4hcclxuICAgKi9cclxuICByZXN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLlgZzmraLjgZfjgb7jgZnjgIJcclxuICAgKi9cclxuICBzdG9wKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgICAgdGhpcy5fcnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuOCueOCv+ODvOODiOOBleOBm+OCi+OAguOCpOODs+OCv+ODvOODkOODq+OBr2RhdGEtaW50ZXJ2YWzjgYvjgonlj5bjgorjgb7jgZnjgIJcclxuICAgKi9cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWVcclxuICAgIHRoaXMucGFuZWwuZGlzcGxheSgpXHJcbiAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1pbnRlcnZhbCcpXHJcbiAgICBpZighdGhpcy5fcnVuSW50ZXJ2YWwpe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGRhdGEtaW50ZXJ2YWwgYXR0cmlidXRlIGluIFwiICsgdGhpcy5fanF1ZXJ5VG9TdHJpbmcodGhpcy4kZWxlbWVudCkpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sZWFmcyA9IFtdXHJcbiAgICB0aGlzLnBhbmVsLmFzc2VtYmxlTGVhZnModGhpcy5sZWFmcyk7XHJcblxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICBfanF1ZXJ5VG9TdHJpbmcoJGVsZW0pe1xyXG4gICAgY29uc3QgaHRtbCA9ICRlbGVtLmdldCgwKS5vdXRlckhUTUxcclxuICAgIHJldHVybiBodG1sLnN1YnN0cigwLCBodG1sLmluZGV4T2YoJz4nKSArIDEpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9DYXJvdXNlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsXHJcbntcclxuICBjb25zdHJ1Y3RvcihjYXJvdXNlbCwgJGVsZW0sIHBhcmVudFBhbmVsKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsID0gY2Fyb3VzZWxcclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG5cclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuV3JhcHBlcicpXHJcbiAgICBcclxuICAgIHRoaXMucGFyZW50UGFuZWwgPSBwYXJlbnRQYW5lbFxyXG4gICAgaWYodGhpcy5wYXJlbnRQYW5lbCl7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcclxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICB3aWR0aDogJzEwMCUnXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuJGJ1dHRvbiA9IHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bicpXHJcbiAgICAgIC8v44Oc44K/44Oz44Gv6Kaq44Gu44Op44OD44OR44O844Gr56qB44Gj6L6844G/44G+44GZ44CC5oq844GX44Gf5pmC44Gr44G+44KL44Gj44Go5a2Q44OR44ON44Or44KS5YWl44KM5pu/44GI44KL44GL44KJ44Gn44GZ44CCXHJcbiAgICAgIHRoaXMucGFyZW50UGFuZWwuJGJ1dHRvbnNXcmFwcGVyLmFwcGVuZCh0aGlzLiRidXR0b24pXHJcblxyXG4gICAgICAvL+ODnOOCv+ODs+OBruOCr+ODquODg+OCr+OCpOODmeODs+ODiOeZu+mMsuOAglxyXG4gICAgICB0aGlzLiRidXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9OXHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSB0cnVlXHJcbiAgICAgICAgLy/oh6rliIbjgpLooajnpLpcclxuICAgICAgICB0aGlzLmRpc3BsYXkoKVxyXG4gICAgICAgIC8v44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44Gf44KJXHJcbiAgICAgICAgaWYodGhpcy5jYXJvdXNlbC5pc1J1bm5pbmcpe1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fbmV4dCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9GRlxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG4gICAgICAgIH0sIDApXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/lrZDjg5Hjg43jg6vjgpLnlJ/miJDjgIJcclxuICAgIHRoaXMuY2hpbGRQYW5lbHMgPSBbXVxyXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtcGFuZWwnKS5lYWNoKChrZXksIGVsZW0pID0+IHtcclxuICAgICAgdGhpcy5jaGlsZFBhbmVscy5wdXNoKG5ldyBQYW5lbChjYXJvdXNlbCwgJChlbGVtKSwgdGhpcykpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy/mnp3okYnjg5Hjg43jg6vjgYvjganjgYbjgYvjga7jg4Hjgqfjg4Pjgq/jgIJcclxuICBnZXQgaXNMZWFmKCl7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZFBhbmVscy5sZW5ndGggPT09IDBcclxuICB9XHJcblxyXG4gIC8v55u057O744Gu6Kaq44OR44ON44Or44KS6ZuG44KB44KL44CCXHJcbiAgYXNzZW1ibGVEaXJlY3RQYXJlbnRzKHBhcmVudHMpe1xyXG4gICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50UGFuZWxcclxuICAgIHdoaWxlKHBhcmVudCl7XHJcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpXHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRQYW5lbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy/nm7Tns7vjga7lrZDopoHntKDjgpLpm4bjgoHjgovjgIJcclxuICBhc3NlbWJsZUxlYWZzKGxlYWZzKXtcclxuICAgIGlmKHRoaXMuaXNMZWFmKXtcclxuICAgICAgbGVhZnMucHVzaCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgICQuZWFjaCh0aGlzLmNoaWxkUGFuZWxzLCAoa2V5LCBwYW5lbCkgPT4gcGFuZWwuYXNzZW1ibGVMZWFmcyhsZWFmcykpXHJcbiAgfVxyXG5cclxuICAvL+ODq+ODvOODiOOBruODkeODjeODq1xyXG4gIGdldCByb290UGFuZWwoKXtcclxuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gICAgdGhpcy5hc3NlbWJsZURpcmVjdFBhcmVudHMocGFyZW50cylcclxuICAgIGlmKHBhcmVudHMubGVuZ3RoID09PSAwKXtcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdXHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruimquODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi+OAglxyXG4gIGFzY2VuZChjYWxsYmFjayl7XHJcbiAgICBjb25zdCBwYXJlbnRzID0gW11cclxuICAgIHRoaXMuYXNzZW1ibGVEaXJlY3RQYXJlbnRzKHBhcmVudHMpXHJcbiAgICAkLmVhY2gocGFyZW50cywgKGtleSwgcGFuZWwpID0+IHtcclxuICAgICAgY2FsbGJhY2socGFuZWwpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy/mjIflrprjgZfjgZ/jgqTjg7Pjg4fjg4Pjgq/jgrnjga7lrZDjg5Hjg43jg6vjgavlr77jgZfjgabpoIbjgavjg6Hjgr3jg4Pjg4njgpLlrp/ooYzjgZnjgotcclxuICBkZXNjZW5kKGluZGV4LCBjYWxsYmFjayl7XHJcbiAgICBpZih0aGlzLmNoaWxkUGFuZWxzW2luZGV4XSl7XHJcbiAgICAgIGNhbGxiYWNrKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKVxyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzW2luZGV4XS5kZXNjZW5kKGluZGV4LCBjYWxsYmFjaylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8v44Ko44Os44Oh44Oz44OI44KS6KaL44GI44KL54q25oWL44Gr44GX44Gm44Kv44Op44K544KS5LuY5LiO44CCXHJcbiAgX3Nob3coKXtcclxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHt6SW5kZXg6IDF9KVxyXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgaWYodGhpcy4kYnV0dG9uKXtcclxuICAgICAgdGhpcy4kYnV0dG9uLmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICB0aGlzLmNhcm91c2VsLl9jdXJyZW50TGVhZiA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICAvL3NkeC1jYXJvdXNlbC1jdXJyZW5044Guei1pbmRleOOCkuOCr+ODquOCouOBl+OBpuOCr+ODqeOCueOCkuWkluOBmeOAglxyXG4gICAgY29uc3QgJGN1cnJlbnRzID0gdGhpcy5yb290UGFuZWwuJGVsZW1lbnQuZmluZCgnLnNkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgICRjdXJyZW50cy5maWx0ZXIoJy5zZHgtY2Fyb3VzZWwtcGFuZWwnKS5jc3Moe3pJbmRleDogJyd9KVxyXG4gICAgJGN1cnJlbnRzLnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcblxyXG4gICAgLy/lkITjg5Hjg43jg6vjga7jgqjjg6zjg6Hjg7Pjg4jjgpLooajnpLrnirbmhYvjgbhcclxuICAgIHRoaXMuX3Nob3coKVxyXG4gICAgdGhpcy5hc2NlbmQocGFuZWwgPT4gcGFuZWwuX3Nob3coKSlcclxuICAgIHRoaXMuZGVzY2VuZCgwLCBwYW5lbCA9PiBwYW5lbC5fc2hvdygpKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvUGFuZWwuanMiXSwic291cmNlUm9vdCI6IiJ9