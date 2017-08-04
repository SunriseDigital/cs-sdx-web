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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDEzZGZkMGRmNTg5M2RjYmE1N2QiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudExlYWYiLCJfY2xpY2tpbmdCdXR0b24iLCIkZWxlbWVudCIsImhlaWdodCIsIkVycm9yIiwiX2pxdWVyeVRvU3RyaW5nIiwiY3NzIiwib3ZlcmZsb3ciLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsIm9uIiwicGF1c2UiLCJyZXN0YXJ0IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImlzUnVubmluZyIsIm5leHRJbmRleCIsImxlYWZzIiwiaW5kZXhPZiIsIl9uZXh0IiwiYXNzZW1ibGVMZWFmcyIsImh0bWwiLCJnZXQiLCJvdXRlckhUTUwiLCJzdWJzdHIiLCJQYW5lbCIsInBhcmVudFBhbmVsIiwiJGJ1dHRvbnNXcmFwcGVyIiwiZmluZCIsIiRidXR0b24iLCJhcHBlbmQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjaGlsZFBhbmVscyIsImtleSIsImVsZW0iLCJwdXNoIiwicGFyZW50cyIsInBhcmVudCIsImlzTGVhZiIsImNhbGxiYWNrIiwiYXNzZW1ibGVEaXJlY3RQYXJlbnRzIiwiaW5kZXgiLCJkZXNjZW5kIiwiYWRkQ2xhc3MiLCJyb290UGFuZWwiLCJyZW1vdmVDbGFzcyIsIl9zaG93IiwiYXNjZW5kIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7Ozs7OztBQUVBQSxFQUFFLFlBQU07QUFDTkEsSUFBRSxlQUFGLEVBQW1CQyxJQUFuQixDQUF3QixZQUFVO0FBQ2hDLFFBQU1DLFFBQVFGLEVBQUUsSUFBRixDQUFkO0FBQ0EsUUFBTUcsV0FBVyx1QkFBYUQsS0FBYixDQUFqQjs7QUFFQSxRQUFNRSxXQUFXRixNQUFNRyxJQUFOLENBQVcsZUFBWCxDQUFqQjtBQUNBLFFBQUdELFFBQUgsRUFBWTtBQUNWRCxlQUFTRyxLQUFUO0FBQ0QsS0FGRCxNQUVPO0FBQ0xILGVBQVNJLEtBQVQsQ0FBZUMsT0FBZjtBQUNEOztBQUVETixVQUFNTyxJQUFOLENBQVcsYUFBWCxFQUEwQk4sUUFBMUI7QUFDRCxHQVpEO0FBYUQsQ0FkRCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7Ozs7SUFHcUJPLFE7QUFFbkIsb0JBQVlSLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakI7QUFDQSxTQUFLUyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0E7QUFDQSxTQUFLQyxZQUFMLEdBQW9CQyxTQUFwQjtBQUNBO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixDQUFDLENBQXZCO0FBQ0E7QUFDQSxTQUFLQyxZQUFMLEdBQW9CRixTQUFwQjtBQUNBO0FBQ0EsU0FBS0csZUFBTCxHQUF1QixLQUF2Qjs7QUFFQSxTQUFLQyxRQUFMLEdBQWdCZixLQUFoQjs7QUFFQSxTQUFLSyxLQUFMLEdBQWEsb0JBQVUsSUFBVixFQUFnQkwsS0FBaEIsQ0FBYjs7QUFFQTtBQUNBLFFBQU1nQixTQUFTaEIsTUFBTUcsSUFBTixDQUFXLGFBQVgsQ0FBZjtBQUNBLFFBQUcsQ0FBQ2EsTUFBSixFQUFXO0FBQ1QsWUFBTSxJQUFJQyxLQUFKLENBQVUsc0NBQXNDLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0gsUUFBMUIsQ0FBaEQsQ0FBTjtBQUNEO0FBQ0QsU0FBS0EsUUFBTCxDQUFjQyxNQUFkLENBQXFCQSxNQUFyQjtBQUNBLFNBQUtELFFBQUwsQ0FBY0ksR0FBZCxDQUFrQjtBQUNoQkMsZ0JBQVU7QUFETSxLQUFsQjs7QUFJQTtBQUNBO0FBQ0EsUUFBRyxFQUFFLGtCQUFrQkMsU0FBU0MsZUFBN0IsQ0FBSCxFQUFpRDtBQUMvQyxXQUFLUCxRQUFMLENBQWNRLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsWUFBTTtBQUNuQyxjQUFLQyxLQUFMO0FBQ0QsT0FGRDs7QUFJQSxXQUFLVCxRQUFMLENBQWNRLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsWUFBTTtBQUNuQyxZQUFHLENBQUMsTUFBS1QsZUFBVCxFQUF5QjtBQUN2QixnQkFBS1csT0FBTDtBQUNEO0FBQ0YsT0FKRDtBQUtEO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OztBQU9BOzs7NEJBR087QUFBQTs7QUFDTEMsbUJBQWEsS0FBS2QsY0FBbEI7O0FBRUEsV0FBS0EsY0FBTCxHQUFzQmUsV0FBVyxZQUFNO0FBQ3JDLFlBQUcsQ0FBQyxPQUFLQyxTQUFULEVBQW1CO0FBQ2pCO0FBQ0Q7O0FBRUQsWUFBSUMsWUFBWSxPQUFLQyxLQUFMLENBQVdDLE9BQVgsQ0FBbUIsT0FBS2xCLFlBQXhCLElBQXdDLENBQXhEO0FBQ0EsWUFBRyxDQUFDLE9BQUtpQixLQUFMLENBQVdELFNBQVgsQ0FBSixFQUEwQjtBQUN4QkEsc0JBQVksQ0FBWjtBQUNEO0FBQ0QsZUFBS0MsS0FBTCxDQUFXRCxTQUFYLEVBQXNCdkIsT0FBdEI7O0FBRUEsZUFBSzBCLEtBQUw7QUFFRCxPQWJxQixFQWFuQixLQUFLdEIsWUFiYyxDQUF0QjtBQWNEOztBQUVEOzs7Ozs7NEJBR087QUFDSixXQUFLRCxRQUFMLEdBQWdCLEtBQWhCO0FBQ0Y7O0FBRUQ7Ozs7Ozs4QkFHUztBQUNQLFdBQUtBLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLdUIsS0FBTDtBQUNEOztBQUVEOzs7Ozs7MkJBR007QUFDSCxXQUFLdkIsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFdBQUtDLFlBQUwsR0FBb0JDLFNBQXBCO0FBQ0Y7O0FBRUQ7Ozs7Ozs0QkFHTztBQUNMLFdBQUtGLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLSixLQUFMLENBQVdDLE9BQVg7QUFDQSxXQUFLSSxZQUFMLEdBQW9CLEtBQUtLLFFBQUwsQ0FBY1osSUFBZCxDQUFtQixlQUFuQixDQUFwQjtBQUNBLFVBQUcsQ0FBQyxLQUFLTyxZQUFULEVBQXNCO0FBQ3BCLGNBQU0sSUFBSU8sS0FBSixDQUFVLHdDQUF3QyxLQUFLQyxlQUFMLENBQXFCLEtBQUtILFFBQTFCLENBQWxELENBQU47QUFDRDs7QUFFRCxXQUFLZSxLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUt6QixLQUFMLENBQVc0QixhQUFYLENBQXlCLEtBQUtILEtBQTlCOztBQUVBLFdBQUtFLEtBQUw7QUFDRDs7O29DQUVlaEMsSyxFQUFNO0FBQ3BCLFVBQU1rQyxPQUFPbEMsTUFBTW1DLEdBQU4sQ0FBVSxDQUFWLEVBQWFDLFNBQTFCO0FBQ0EsYUFBT0YsS0FBS0csTUFBTCxDQUFZLENBQVosRUFBZUgsS0FBS0gsT0FBTCxDQUFhLEdBQWIsSUFBb0IsQ0FBbkMsQ0FBUDtBQUNEOzs7d0JBckVjO0FBQ2IsYUFBTyxLQUFLdEIsUUFBTCxJQUFpQixLQUFLQyxZQUFMLEtBQXNCQyxTQUE5QztBQUNEOzs7Ozs7a0JBaERrQkgsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNIQThCLEs7QUFFbkIsaUJBQVlyQyxRQUFaLEVBQXNCRCxLQUF0QixFQUE2QnVDLFdBQTdCLEVBQTBDO0FBQUE7O0FBQUE7O0FBQ3hDLFNBQUt0QyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtjLFFBQUwsR0FBZ0JmLEtBQWhCOztBQUVBLFNBQUt3QyxlQUFMLEdBQXVCLEtBQUt6QixRQUFMLENBQWMwQixJQUFkLENBQW1CLDRCQUFuQixDQUF2Qjs7QUFFQSxTQUFLRixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFFBQUcsS0FBS0EsV0FBUixFQUFvQjtBQUNsQixXQUFLRyxPQUFMLEdBQWUsS0FBSzNCLFFBQUwsQ0FBYzBCLElBQWQsQ0FBbUIscUJBQW5CLENBQWY7QUFDQTtBQUNBLFdBQUtGLFdBQUwsQ0FBaUJDLGVBQWpCLENBQWlDRyxNQUFqQyxDQUF3QyxLQUFLRCxPQUE3Qzs7QUFFQTtBQUNBLFdBQUtBLE9BQUwsQ0FBYW5CLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFBQ3FCLENBQUQsRUFBTztBQUM5QkEsVUFBRUMsY0FBRjtBQUNBO0FBQ0EsY0FBSzVDLFFBQUwsQ0FBY2EsZUFBZCxHQUFnQyxJQUFoQztBQUNBO0FBQ0EsY0FBS1IsT0FBTDtBQUNBO0FBQ0EsWUFBRyxNQUFLTCxRQUFMLENBQWMyQixTQUFqQixFQUEyQjtBQUN6QixnQkFBSzNCLFFBQUwsQ0FBYytCLEtBQWQ7QUFDRDtBQUNEO0FBQ0FMLG1CQUFXLFlBQU07QUFDZixnQkFBSzFCLFFBQUwsQ0FBY2EsZUFBZCxHQUFnQyxLQUFoQztBQUNELFNBRkQsRUFFRyxDQUZIOztBQUlBLGVBQU8sS0FBUDtBQUNELE9BaEJEO0FBaUJEOztBQUVEO0FBQ0EsU0FBS2dDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxTQUFLL0IsUUFBTCxDQUFjMEIsSUFBZCxDQUFtQix1QkFBbkIsRUFBNEMxQyxJQUE1QyxDQUFpRCxVQUFDZ0QsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDOUQsWUFBS0YsV0FBTCxDQUFpQkcsSUFBakIsQ0FBc0IsSUFBSVgsS0FBSixDQUFVckMsUUFBVixFQUFvQkgsRUFBRWtELElBQUYsQ0FBcEIsUUFBdEI7QUFDRCxLQUZEO0FBR0Q7O0FBRUQ7Ozs7Ozs7QUFLQTswQ0FDc0JFLE8sRUFBUTtBQUM1QixVQUFJQyxTQUFTLEtBQUtaLFdBQWxCO0FBQ0EsYUFBTVksTUFBTixFQUFhO0FBQ1hELGdCQUFRRCxJQUFSLENBQWFFLE1BQWI7QUFDQUEsaUJBQVNBLE9BQU9aLFdBQWhCO0FBQ0Q7QUFDRjs7QUFFRDs7OztrQ0FDY1QsSyxFQUFNO0FBQ2xCLFVBQUcsS0FBS3NCLE1BQVIsRUFBZTtBQUNidEIsY0FBTW1CLElBQU4sQ0FBVyxJQUFYO0FBQ0Q7O0FBRURuRCxRQUFFQyxJQUFGLENBQU8sS0FBSytDLFdBQVosRUFBeUIsVUFBQ0MsR0FBRCxFQUFNMUMsS0FBTjtBQUFBLGVBQWdCQSxNQUFNNEIsYUFBTixDQUFvQkgsS0FBcEIsQ0FBaEI7QUFBQSxPQUF6QjtBQUNEOztBQUVEOzs7Ozs7QUFXQTsyQkFDT3VCLFEsRUFBUztBQUNkLFVBQU1ILFVBQVUsRUFBaEI7QUFDQSxXQUFLSSxxQkFBTCxDQUEyQkosT0FBM0I7QUFDQXBELFFBQUVDLElBQUYsQ0FBT21ELE9BQVAsRUFBZ0IsVUFBQ0gsR0FBRCxFQUFNMUMsS0FBTixFQUFnQjtBQUM5QmdELGlCQUFTaEQsS0FBVDtBQUNELE9BRkQ7QUFHRDs7QUFFRDs7Ozs0QkFDUWtELEssRUFBT0YsUSxFQUFTO0FBQ3RCLFVBQUcsS0FBS1AsV0FBTCxDQUFpQlMsS0FBakIsQ0FBSCxFQUEyQjtBQUN6QkYsaUJBQVMsS0FBS1AsV0FBTCxDQUFpQlMsS0FBakIsQ0FBVDtBQUNBLGFBQUtULFdBQUwsQ0FBaUJTLEtBQWpCLEVBQXdCQyxPQUF4QixDQUFnQ0QsS0FBaEMsRUFBdUNGLFFBQXZDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs0QkFDTztBQUNMLFdBQUt0QyxRQUFMLENBQWMwQyxRQUFkLENBQXVCLHNCQUF2QjtBQUNBLFVBQUcsS0FBS2YsT0FBUixFQUFnQjtBQUNkLGFBQUtBLE9BQUwsQ0FBYWUsUUFBYixDQUFzQixzQkFBdEI7QUFDRDs7QUFFRCxVQUFHLEtBQUtMLE1BQVIsRUFBZTtBQUNiLGFBQUtuRCxRQUFMLENBQWNZLFlBQWQsR0FBNkIsSUFBN0I7QUFDRDtBQUNGOzs7OEJBRVE7QUFDUDtBQUNBLFdBQUs2QyxTQUFMLENBQWUzQyxRQUFmLENBQXdCMEIsSUFBeEIsQ0FBNkIsdUJBQTdCLEVBQXNEa0IsV0FBdEQsQ0FBa0Usc0JBQWxFOztBQUVBO0FBQ0EsV0FBS0MsS0FBTDtBQUNBLFdBQUtDLE1BQUwsQ0FBWTtBQUFBLGVBQVN4RCxNQUFNdUQsS0FBTixFQUFUO0FBQUEsT0FBWjtBQUNBLFdBQUtKLE9BQUwsQ0FBYSxDQUFiLEVBQWdCO0FBQUEsZUFBU25ELE1BQU11RCxLQUFOLEVBQVQ7QUFBQSxPQUFoQjtBQUNEOzs7d0JBdEVXO0FBQ1YsYUFBTyxLQUFLZCxXQUFMLENBQWlCZ0IsTUFBakIsS0FBNEIsQ0FBbkM7QUFDRDs7O3dCQXFCYztBQUNiLFVBQU1aLFVBQVUsRUFBaEI7QUFDQSxXQUFLSSxxQkFBTCxDQUEyQkosT0FBM0I7QUFDQSxVQUFHQSxRQUFRWSxNQUFSLEtBQW1CLENBQXRCLEVBQXdCO0FBQ3RCLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQU9aLFFBQVFBLFFBQVFZLE1BQVIsR0FBaUIsQ0FBekIsQ0FBUDtBQUNEOzs7Ozs7a0JBekVrQnhCLEsiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDEzZGZkMGRmNTg5M2RjYmE1N2QiLCJpbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jbGFzc2VzL0Nhcm91c2VsJ1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJCgnLnNkeC1jYXJvdXNlbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0ICRlbGVtID0gJCh0aGlzKVxyXG4gICAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoJGVsZW0pXHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAkZWxlbS5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKGludGVydmFsKXtcclxuICAgICAgY2Fyb3VzZWwuc3RhcnQoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2Fyb3VzZWwucGFuZWwuZGlzcGxheSgpXHJcbiAgICB9XHJcblxyXG4gICAgJGVsZW0uZGF0YSgnc2R4Q2Fyb3VzZWwnLCBjYXJvdXNlbClcclxuICB9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBQYW5lbCBmcm9tICcuL1BhbmVsJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcm91c2VsXHJcbntcclxuICBjb25zdHJ1Y3RvcigkZWxlbSkge1xyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjgYzli5XjgYTjgabjgovjgYvjgIHkuIDmmYLlgZzmraLjgZfjgabjgYTjgovjgYvjga7jg5Xjg6njgrBcclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZVxyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjga7jgqTjg7Pjgr/jg7zjg5Djg6vjgILjgrnjgr/jg7zjg4jjgZfjgabjgovjgYvjgIHmraLjgb7jgaPjgabjgYTjgovjgYvjga7jg5Xjg6njgrDjgavjgoLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdW5kZWZpbmVkXHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBrue5sOOCiui/lOOBl+OBr+OCpOODs+OCv+ODvOODkOODq+OBp+OBr+OBquOBj1RpbWVvdXTjgpLlho3luLDnmoTjgavoqq3jgpPjgaflrp/nj77jgZfjgabjgYTjgb7jgZnjgILjgZ3jga7jgq/jg6rjgqLnlKjjga7jgq3jg7zjgIJcclxuICAgIHRoaXMuX3J1blRpbWVvdXRLZXkgPSAtMVxyXG4gICAgLy/nj77lnKjooajnpLrkuK3jga7mnp3okYnjg5Hjg43jg6vjgpLkv53mjIHjgZfjgabjgYTjgb7jgZnjgILmraLjgb7jgaPjgZ/jgajjgY3ntprjgY3jgYvjgonlho3nlJ/jgZnjgovjgZ/jgoHjgIJcclxuICAgIHRoaXMuX2N1cnJlbnRMZWFmID0gdW5kZWZpbmVkXHJcbiAgICAvL0RPTeS4iuOBruODnOOCv+ODs+OCkuaKvOOBmeOBqG1vdXNlbGVhdmXjgYznmbrnlJ/jgZfjgabjgZfjgb7jgYbjga7jgafjgq/jg6rjg4Pjgq/mmYLjgavjg5Xjg6njgrDjgpLnq4vjgabnmbrnlJ/jgpLmipHmraLjgIJcclxuICAgIHRoaXMuX2NsaWNraW5nQnV0dG9uID0gZmFsc2VcclxuXHJcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1cclxuXHJcbiAgICB0aGlzLnBhbmVsID0gbmV3IFBhbmVsKHRoaXMsICRlbGVtKVxyXG4gICAgXHJcbiAgICAvL+WkluaeoOOBrumrmOOBleOCkuWIh+OCiuipsOOCgeOCi1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gJGVsZW0uYXR0cignZGF0YS1oZWlnaHQnKVxyXG4gICAgaWYoIWhlaWdodCl7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgZGF0YS1oZWlnaHQgYXR0cmlidXRlIGluIFwiICsgdGhpcy5fanF1ZXJ5VG9TdHJpbmcodGhpcy4kZWxlbWVudCkpXHJcbiAgICB9XHJcbiAgICB0aGlzLiRlbGVtZW50LmhlaWdodChoZWlnaHQpXHJcbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XHJcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xyXG4gICAgfSlcclxuXHJcbiAgICAvL+ODnuOCpuOCueOCquODvOODkOODvOaZguOBr+atouOCgeOCi1xyXG4gICAgLy/jgr/jg4Pjg4HmmYLjgat0b3VjaHN0YXJ0PnRvdWNoZW5kPm1vdXNlZW50ZXLjgajjgYTjgYborI7jgarpoIbjgafnmbrnlJ/jgZflpInjgarmjJnli5Xjgavjgarjgovjga7jgafjgIHjgr/jg4Pjg4Hjg4fjg5DjgqTjgrnjgafjga/jgoTjgonjgarjgYTjgIJcclxuICAgIGlmKCEoXCJvbnRvdWNoc3RhcnRcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKXtcclxuICAgICAgdGhpcy4kZWxlbWVudC5vbignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICB0aGlzLnBhdXNlKClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoIXRoaXMuX2NsaWNraW5nQnV0dG9uKXtcclxuICAgICAgICAgIHRoaXMucmVzdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44KL44Gp44GG44GL44CC44Od44O844K644Gn44KC5YGc5q2i44Gn44KC44Gp44Gh44KJ44Gn44KCZmFsc2XjgafjgZnjgIJcclxuICAgKi9cclxuICBnZXQgaXNSdW5uaW5nKCl7XHJcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZyAmJiB0aGlzLl9ydW5JbnRlcnZhbCAhPT0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zlrp/ooYzmmYLjgavnubDjgorov5TjgZflkbzjgbDjgozjgb7jgZnjgIJzZXRJbnRlcnZhbOOBr+S9v+OCj+OBmuOBq3NldFRpbWVvdXTjga7lho3luLDlkbzjgbPlh7rjgZfjgpLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgKi9cclxuICBfbmV4dCgpe1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3J1blRpbWVvdXRLZXkpXHJcblxyXG4gICAgdGhpcy5fcnVuVGltZW91dEtleSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZighdGhpcy5pc1J1bm5pbmcpe1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5sZWFmcy5pbmRleE9mKHRoaXMuX2N1cnJlbnRMZWFmKSArIDFcclxuICAgICAgaWYoIXRoaXMubGVhZnNbbmV4dEluZGV4XSl7XHJcbiAgICAgICAgbmV4dEluZGV4ID0gMFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGVhZnNbbmV4dEluZGV4XS5kaXNwbGF5KClcclxuXHJcbiAgICAgIHRoaXMuX25leHQoKVxyXG5cclxuICAgIH0sIHRoaXMuX3J1bkludGVydmFsKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44Od44O844K644GX44G+44GZ44CC5YaN44K544K/44O844OI44GvcmVzdGFydOOBp+OBiumhmOOBhOOBl+OBvuOBmeOAglxyXG4gICAqL1xyXG4gIHBhdXNlKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjg53jg7zjgrrmmYLjga7lho3jgrnjgr/jg7zjg4hcclxuICAgKi9cclxuICByZXN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLlgZzmraLjgZfjgb7jgZnjgIJcclxuICAgKi9cclxuICBzdG9wKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgICAgdGhpcy5fcnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuOCueOCv+ODvOODiOOBleOBm+OCi+OAguOCpOODs+OCv+ODvOODkOODq+OBr2RhdGEtaW50ZXJ2YWzjgYvjgonlj5bjgorjgb7jgZnjgIJcclxuICAgKi9cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWVcclxuICAgIHRoaXMucGFuZWwuZGlzcGxheSgpXHJcbiAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1pbnRlcnZhbCcpXHJcbiAgICBpZighdGhpcy5fcnVuSW50ZXJ2YWwpe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGRhdGEtaW50ZXJ2YWwgYXR0cmlidXRlIGluIFwiICsgdGhpcy5fanF1ZXJ5VG9TdHJpbmcodGhpcy4kZWxlbWVudCkpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sZWFmcyA9IFtdXHJcbiAgICB0aGlzLnBhbmVsLmFzc2VtYmxlTGVhZnModGhpcy5sZWFmcyk7XHJcblxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICBfanF1ZXJ5VG9TdHJpbmcoJGVsZW0pe1xyXG4gICAgY29uc3QgaHRtbCA9ICRlbGVtLmdldCgwKS5vdXRlckhUTUxcclxuICAgIHJldHVybiBodG1sLnN1YnN0cigwLCBodG1sLmluZGV4T2YoJz4nKSArIDEpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9DYXJvdXNlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsXHJcbntcclxuICBjb25zdHJ1Y3RvcihjYXJvdXNlbCwgJGVsZW0sIHBhcmVudFBhbmVsKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsID0gY2Fyb3VzZWxcclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG5cclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuV3JhcHBlcicpXHJcbiAgICBcclxuICAgIHRoaXMucGFyZW50UGFuZWwgPSBwYXJlbnRQYW5lbFxyXG4gICAgaWYodGhpcy5wYXJlbnRQYW5lbCl7XHJcbiAgICAgIHRoaXMuJGJ1dHRvbiA9IHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bicpXHJcbiAgICAgIC8v44Oc44K/44Oz44Gv6Kaq44Gu44Op44OD44OR44O844Gr56qB44Gj6L6844G/44G+44GZ44CC5oq844GX44Gf5pmC44Gr44G+44KL44Gj44Go5a2Q44OR44ON44Or44KS5YWl44KM5pu/44GI44KL44GL44KJ44Gn44GZ44CCXHJcbiAgICAgIHRoaXMucGFyZW50UGFuZWwuJGJ1dHRvbnNXcmFwcGVyLmFwcGVuZCh0aGlzLiRidXR0b24pXHJcblxyXG4gICAgICAvL+ODnOOCv+ODs+OBruOCr+ODquODg+OCr+OCpOODmeODs+ODiOeZu+mMsuOAglxyXG4gICAgICB0aGlzLiRidXR0b24ub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAvL21vdXNlbGVhdmXjga7oqqTnmbrngavpmLLmraLnlKjjg5Xjg6njgrDjgpJPTlxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwuX2NsaWNraW5nQnV0dG9uID0gdHJ1ZVxyXG4gICAgICAgIC8v6Ieq5YiG44KS6KGo56S6XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5KClcclxuICAgICAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBjOWLleOBhOOBpuOBhOOBn+OCiVxyXG4gICAgICAgIGlmKHRoaXMuY2Fyb3VzZWwuaXNSdW5uaW5nKXtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuX25leHQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL21vdXNlbGVhdmXjga7oqqTnmbrngavpmLLmraLnlKjjg5Xjg6njgrDjgpJPRkZcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuX2NsaWNraW5nQnV0dG9uID0gZmFsc2VcclxuICAgICAgICB9LCAwKVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+WtkOODkeODjeODq+OCkueUn+aIkOOAglxyXG4gICAgdGhpcy5jaGlsZFBhbmVscyA9IFtdXHJcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1wYW5lbCcpLmVhY2goKGtleSwgZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzLnB1c2gobmV3IFBhbmVsKGNhcm91c2VsLCAkKGVsZW0pLCB0aGlzKSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvL+aeneiRieODkeODjeODq+OBi+OBqeOBhuOBi+OBruODgeOCp+ODg+OCr+OAglxyXG4gIGdldCBpc0xlYWYoKXtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkUGFuZWxzLmxlbmd0aCA9PT0gMFxyXG4gIH1cclxuXHJcbiAgLy/nm7Tns7vjga7opqrjg5Hjg43jg6vjgpLpm4bjgoHjgovjgIJcclxuICBhc3NlbWJsZURpcmVjdFBhcmVudHMocGFyZW50cyl7XHJcbiAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnRQYW5lbFxyXG4gICAgd2hpbGUocGFyZW50KXtcclxuICAgICAgcGFyZW50cy5wdXNoKHBhcmVudClcclxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudFBhbmVsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruWtkOimgee0oOOCkumbhuOCgeOCi+OAglxyXG4gIGFzc2VtYmxlTGVhZnMobGVhZnMpe1xyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICBsZWFmcy5wdXNoKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgJC5lYWNoKHRoaXMuY2hpbGRQYW5lbHMsIChrZXksIHBhbmVsKSA9PiBwYW5lbC5hc3NlbWJsZUxlYWZzKGxlYWZzKSlcclxuICB9XHJcblxyXG4gIC8v44Or44O844OI44Gu44OR44ON44OrXHJcbiAgZ2V0IHJvb3RQYW5lbCgpe1xyXG4gICAgY29uc3QgcGFyZW50cyA9IFtdXHJcbiAgICB0aGlzLmFzc2VtYmxlRGlyZWN0UGFyZW50cyhwYXJlbnRzKVxyXG4gICAgaWYocGFyZW50cy5sZW5ndGggPT09IDApe1xyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXJlbnRzW3BhcmVudHMubGVuZ3RoIC0gMV1cclxuICB9XHJcblxyXG4gIC8v55u057O744Gu6Kaq44OR44ON44Or44Gr5a++44GX44Gm6aCG44Gr44Oh44K944OD44OJ44KS5a6f6KGM44GZ44KL44CCXHJcbiAgYXNjZW5kKGNhbGxiYWNrKXtcclxuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gICAgdGhpcy5hc3NlbWJsZURpcmVjdFBhcmVudHMocGFyZW50cylcclxuICAgICQuZWFjaChwYXJlbnRzLCAoa2V5LCBwYW5lbCkgPT4ge1xyXG4gICAgICBjYWxsYmFjayhwYW5lbClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvL+aMh+WumuOBl+OBn+OCpOODs+ODh+ODg+OCr+OCueOBruWtkOODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi1xyXG4gIGRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKXtcclxuICAgIGlmKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKXtcclxuICAgICAgY2FsbGJhY2sodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pXHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdLmRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy/jgqjjg6zjg6Hjg7Pjg4jjgpLopovjgYjjgovnirbmhYvjgavjgZfjgabjgq/jg6njgrnjgpLku5jkuI7jgIJcclxuICBfc2hvdygpe1xyXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgaWYodGhpcy4kYnV0dG9uKXtcclxuICAgICAgdGhpcy4kYnV0dG9uLmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICB0aGlzLmNhcm91c2VsLl9jdXJyZW50TGVhZiA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICAvL3NkeC1jYXJvdXNlbC1jdXJyZW5044Gu44Kv44Op44K544KS5aSW44GZ44CCXHJcbiAgICB0aGlzLnJvb3RQYW5lbC4kZWxlbWVudC5maW5kKCcuc2R4LWNhcm91c2VsLWN1cnJlbnQnKS5yZW1vdmVDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG5cclxuICAgIC8v5ZCE44OR44ON44Or44Gu44Ko44Os44Oh44Oz44OI44KS6KGo56S654q25oWL44G4XHJcbiAgICB0aGlzLl9zaG93KClcclxuICAgIHRoaXMuYXNjZW5kKHBhbmVsID0+IHBhbmVsLl9zaG93KCkpXHJcbiAgICB0aGlzLmRlc2NlbmQoMCwgcGFuZWwgPT4gcGFuZWwuX3Nob3coKSlcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL1BhbmVsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==