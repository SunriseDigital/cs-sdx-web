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
    this.$element.on('mouseenter', function () {
      _this.pause();
    });

    this.$element.on('mouseleave', function () {
      if (!_this._clickingButton) {
        _this.restart();
      }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGVmZTU4NTMzMjQ1OTAwNGY2NzciLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbCIsImF0dHIiLCJzdGFydCIsInBhbmVsIiwiZGlzcGxheSIsImRhdGEiLCJDYXJvdXNlbCIsIl9ydW5uaW5nIiwiX3J1bkludGVydmFsIiwidW5kZWZpbmVkIiwiX3J1blRpbWVvdXRLZXkiLCJfY3VycmVudExlYWYiLCJfY2xpY2tpbmdCdXR0b24iLCIkZWxlbWVudCIsImNzcyIsInBvc2l0aW9uIiwiaGVpZ2h0IiwiRXJyb3IiLCJfanF1ZXJ5VG9TdHJpbmciLCJvdmVyZmxvdyIsIm9uIiwicGF1c2UiLCJyZXN0YXJ0IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImlzUnVubmluZyIsIm5leHRJbmRleCIsImxlYWZzIiwiaW5kZXhPZiIsIl9uZXh0IiwiYXNzZW1ibGVMZWFmcyIsImh0bWwiLCJnZXQiLCJvdXRlckhUTUwiLCJzdWJzdHIiLCJQYW5lbCIsInBhcmVudFBhbmVsIiwiJGJ1dHRvbnNXcmFwcGVyIiwiZmluZCIsIndpZHRoIiwiJGJ1dHRvbiIsImFwcGVuZCIsImNoaWxkUGFuZWxzIiwia2V5IiwiZWxlbSIsInB1c2giLCJwYXJlbnRzIiwicGFyZW50IiwiaXNMZWFmIiwiY2FsbGJhY2siLCJhc3NlbWJsZURpcmVjdFBhcmVudHMiLCJpbmRleCIsImRlc2NlbmQiLCJ6SW5kZXgiLCJhZGRDbGFzcyIsIiRjdXJyZW50cyIsInJvb3RQYW5lbCIsImZpbHRlciIsInJlbW92ZUNsYXNzIiwiX3Nob3ciLCJhc2NlbmQiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBRUFBLEVBQUUsWUFBTTtBQUNOQSxJQUFFLGVBQUYsRUFBbUJDLElBQW5CLENBQXdCLFlBQVU7QUFDaEMsUUFBTUMsUUFBUUYsRUFBRSxJQUFGLENBQWQ7QUFDQSxRQUFNRyxXQUFXLHVCQUFhRCxLQUFiLENBQWpCOztBQUVBLFFBQU1FLFdBQVdGLE1BQU1HLElBQU4sQ0FBVyxlQUFYLENBQWpCO0FBQ0EsUUFBR0QsUUFBSCxFQUFZO0FBQ1ZELGVBQVNHLEtBQVQ7QUFDRCxLQUZELE1BRU87QUFDTEgsZUFBU0ksS0FBVCxDQUFlQyxPQUFmO0FBQ0Q7O0FBRUROLFVBQU1PLElBQU4sQ0FBVyxhQUFYLEVBQTBCTixRQUExQjtBQUNELEdBWkQ7QUFhRCxDQWRELEU7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBOzs7Ozs7OztJQUdxQk8sUTtBQUVuQixvQkFBWVIsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQjtBQUNBLFNBQUtTLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQTtBQUNBLFNBQUtDLFlBQUwsR0FBb0JDLFNBQXBCO0FBQ0E7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLENBQUMsQ0FBdkI7QUFDQTtBQUNBLFNBQUtDLFlBQUwsR0FBb0JGLFNBQXBCO0FBQ0E7QUFDQSxTQUFLRyxlQUFMLEdBQXVCLEtBQXZCOztBQUVBLFNBQUtDLFFBQUwsR0FBZ0JmLEtBQWhCO0FBQ0E7QUFDQSxTQUFLZSxRQUFMLENBQWNDLEdBQWQsQ0FBa0IsRUFBQ0MsVUFBVSxVQUFYLEVBQWxCO0FBQ0EsU0FBS1osS0FBTCxHQUFhLG9CQUFVLElBQVYsRUFBZ0JMLEtBQWhCLENBQWI7O0FBRUE7QUFDQSxRQUFNa0IsU0FBU2xCLE1BQU1HLElBQU4sQ0FBVyxhQUFYLENBQWY7QUFDQSxRQUFHLENBQUNlLE1BQUosRUFBVztBQUNULFlBQU0sSUFBSUMsS0FBSixDQUFVLHNDQUFzQyxLQUFLQyxlQUFMLENBQXFCLEtBQUtMLFFBQTFCLENBQWhELENBQU47QUFDRDtBQUNELFNBQUtBLFFBQUwsQ0FBY0csTUFBZCxDQUFxQkEsTUFBckI7QUFDQSxTQUFLSCxRQUFMLENBQWNDLEdBQWQsQ0FBa0I7QUFDaEJLLGdCQUFVO0FBRE0sS0FBbEI7O0FBSUE7QUFDQSxTQUFLTixRQUFMLENBQWNPLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsWUFBTTtBQUNuQyxZQUFLQyxLQUFMO0FBQ0QsS0FGRDs7QUFJQSxTQUFLUixRQUFMLENBQWNPLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsWUFBTTtBQUNuQyxVQUFHLENBQUMsTUFBS1IsZUFBVCxFQUF5QjtBQUN2QixjQUFLVSxPQUFMO0FBQ0Q7QUFDRixLQUpEO0FBS0Q7O0FBRUQ7Ozs7Ozs7OztBQU9BOzs7NEJBR087QUFBQTs7QUFDTEMsbUJBQWEsS0FBS2IsY0FBbEI7O0FBRUEsV0FBS0EsY0FBTCxHQUFzQmMsV0FBVyxZQUFNO0FBQ3JDLFlBQUcsQ0FBQyxPQUFLQyxTQUFULEVBQW1CO0FBQ2pCO0FBQ0Q7O0FBRUQsWUFBSUMsWUFBWSxPQUFLQyxLQUFMLENBQVdDLE9BQVgsQ0FBbUIsT0FBS2pCLFlBQXhCLElBQXdDLENBQXhEO0FBQ0EsWUFBRyxDQUFDLE9BQUtnQixLQUFMLENBQVdELFNBQVgsQ0FBSixFQUEwQjtBQUN4QkEsc0JBQVksQ0FBWjtBQUNEO0FBQ0QsZUFBS0MsS0FBTCxDQUFXRCxTQUFYLEVBQXNCdEIsT0FBdEI7O0FBRUEsZUFBS3lCLEtBQUw7QUFFRCxPQWJxQixFQWFuQixLQUFLckIsWUFiYyxDQUF0QjtBQWNEOztBQUVEOzs7Ozs7NEJBR087QUFDSixXQUFLRCxRQUFMLEdBQWdCLEtBQWhCO0FBQ0Y7O0FBRUQ7Ozs7Ozs4QkFHUztBQUNQLFdBQUtBLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLc0IsS0FBTDtBQUNEOztBQUVEOzs7Ozs7MkJBR007QUFDSCxXQUFLdEIsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFdBQUtDLFlBQUwsR0FBb0JDLFNBQXBCO0FBQ0Y7O0FBRUQ7Ozs7Ozs0QkFHTztBQUNMLFdBQUtGLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLSixLQUFMLENBQVdDLE9BQVg7QUFDQSxXQUFLSSxZQUFMLEdBQW9CLEtBQUtLLFFBQUwsQ0FBY1osSUFBZCxDQUFtQixlQUFuQixDQUFwQjtBQUNBLFVBQUcsQ0FBQyxLQUFLTyxZQUFULEVBQXNCO0FBQ3BCLGNBQU0sSUFBSVMsS0FBSixDQUFVLHdDQUF3QyxLQUFLQyxlQUFMLENBQXFCLEtBQUtMLFFBQTFCLENBQWxELENBQU47QUFDRDs7QUFFRCxXQUFLYyxLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUt4QixLQUFMLENBQVcyQixhQUFYLENBQXlCLEtBQUtILEtBQTlCOztBQUVBLFdBQUtFLEtBQUw7QUFDRDs7O29DQUVlL0IsSyxFQUFNO0FBQ3BCLFVBQU1pQyxPQUFPakMsTUFBTWtDLEdBQU4sQ0FBVSxDQUFWLEVBQWFDLFNBQTFCO0FBQ0EsYUFBT0YsS0FBS0csTUFBTCxDQUFZLENBQVosRUFBZUgsS0FBS0gsT0FBTCxDQUFhLEdBQWIsSUFBb0IsQ0FBbkMsQ0FBUDtBQUNEOzs7d0JBckVjO0FBQ2IsYUFBTyxLQUFLckIsUUFBTCxJQUFpQixLQUFLQyxZQUFMLEtBQXNCQyxTQUE5QztBQUNEOzs7Ozs7a0JBOUNrQkgsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNIQTZCLEs7QUFFbkIsaUJBQVlwQyxRQUFaLEVBQXNCRCxLQUF0QixFQUE2QnNDLFdBQTdCLEVBQTBDO0FBQUE7O0FBQUE7O0FBQ3hDLFNBQUtyQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtjLFFBQUwsR0FBZ0JmLEtBQWhCOztBQUVBLFNBQUt1QyxlQUFMLEdBQXVCLEtBQUt4QixRQUFMLENBQWN5QixJQUFkLENBQW1CLDRCQUFuQixDQUF2Qjs7QUFFQSxTQUFLRixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFFBQUcsS0FBS0EsV0FBUixFQUFvQjtBQUNsQixXQUFLdkIsUUFBTCxDQUFjQyxHQUFkLENBQWtCO0FBQ2hCQyxrQkFBVSxVQURNO0FBRWhCd0IsZUFBTztBQUZTLE9BQWxCO0FBSUEsV0FBS0MsT0FBTCxHQUFlLEtBQUszQixRQUFMLENBQWN5QixJQUFkLENBQW1CLHFCQUFuQixDQUFmO0FBQ0E7QUFDQSxXQUFLRixXQUFMLENBQWlCQyxlQUFqQixDQUFpQ0ksTUFBakMsQ0FBd0MsS0FBS0QsT0FBN0M7O0FBRUE7QUFDQSxXQUFLQSxPQUFMLENBQWFwQixFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFlBQU07QUFDN0I7QUFDQSxjQUFLckIsUUFBTCxDQUFjYSxlQUFkLEdBQWdDLElBQWhDO0FBQ0E7QUFDQSxjQUFLUixPQUFMO0FBQ0E7QUFDQW9CLG1CQUFXLFlBQU07QUFDZixnQkFBS3pCLFFBQUwsQ0FBY2EsZUFBZCxHQUFnQyxLQUFoQztBQUNELFNBRkQsRUFFRyxDQUZIO0FBR0QsT0FURDtBQVVEOztBQUVEO0FBQ0EsU0FBSzhCLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxTQUFLN0IsUUFBTCxDQUFjeUIsSUFBZCxDQUFtQix1QkFBbkIsRUFBNEN6QyxJQUE1QyxDQUFpRCxVQUFDOEMsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDOUQsWUFBS0YsV0FBTCxDQUFpQkcsSUFBakIsQ0FBc0IsSUFBSVYsS0FBSixDQUFVcEMsUUFBVixFQUFvQkgsRUFBRWdELElBQUYsQ0FBcEIsUUFBdEI7QUFDRCxLQUZEO0FBR0Q7O0FBRUQ7Ozs7Ozs7QUFLQTswQ0FDc0JFLE8sRUFBUTtBQUM1QixVQUFJQyxTQUFTLEtBQUtYLFdBQWxCO0FBQ0EsYUFBTVcsTUFBTixFQUFhO0FBQ1hELGdCQUFRRCxJQUFSLENBQWFFLE1BQWI7QUFDQUEsaUJBQVNBLE9BQU9YLFdBQWhCO0FBQ0Q7QUFDRjs7QUFFRDs7OztrQ0FDY1QsSyxFQUFNO0FBQ2xCLFVBQUcsS0FBS3FCLE1BQVIsRUFBZTtBQUNickIsY0FBTWtCLElBQU4sQ0FBVyxJQUFYO0FBQ0Q7O0FBRURqRCxRQUFFQyxJQUFGLENBQU8sS0FBSzZDLFdBQVosRUFBeUIsVUFBQ0MsR0FBRCxFQUFNeEMsS0FBTjtBQUFBLGVBQWdCQSxNQUFNMkIsYUFBTixDQUFvQkgsS0FBcEIsQ0FBaEI7QUFBQSxPQUF6QjtBQUNEOztBQUVEOzs7Ozs7QUFXQTsyQkFDT3NCLFEsRUFBUztBQUNkLFVBQU1ILFVBQVUsRUFBaEI7QUFDQSxXQUFLSSxxQkFBTCxDQUEyQkosT0FBM0I7QUFDQWxELFFBQUVDLElBQUYsQ0FBT2lELE9BQVAsRUFBZ0IsVUFBQ0gsR0FBRCxFQUFNeEMsS0FBTixFQUFnQjtBQUM5QjhDLGlCQUFTOUMsS0FBVDtBQUNELE9BRkQ7QUFHRDs7QUFFRDs7Ozs0QkFDUWdELEssRUFBT0YsUSxFQUFTO0FBQ3RCLFVBQUcsS0FBS1AsV0FBTCxDQUFpQlMsS0FBakIsQ0FBSCxFQUEyQjtBQUN6QkYsaUJBQVMsS0FBS1AsV0FBTCxDQUFpQlMsS0FBakIsQ0FBVDtBQUNBLGFBQUtULFdBQUwsQ0FBaUJTLEtBQWpCLEVBQXdCQyxPQUF4QixDQUFnQ0QsS0FBaEMsRUFBdUNGLFFBQXZDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs0QkFDTztBQUNMLFdBQUtwQyxRQUFMLENBQWNDLEdBQWQsQ0FBa0IsRUFBQ3VDLFFBQVEsQ0FBVCxFQUFsQjtBQUNBLFdBQUt4QyxRQUFMLENBQWN5QyxRQUFkLENBQXVCLHNCQUF2QjtBQUNBLFVBQUcsS0FBS2QsT0FBUixFQUFnQjtBQUNkLGFBQUtBLE9BQUwsQ0FBYWMsUUFBYixDQUFzQixzQkFBdEI7QUFDRDs7QUFFRCxVQUFHLEtBQUtOLE1BQVIsRUFBZTtBQUNiLGFBQUtqRCxRQUFMLENBQWNZLFlBQWQsR0FBNkIsSUFBN0I7QUFDRDtBQUNGOzs7OEJBRVE7QUFDUDtBQUNBLFVBQU00QyxZQUFZLEtBQUtDLFNBQUwsQ0FBZTNDLFFBQWYsQ0FBd0J5QixJQUF4QixDQUE2Qix1QkFBN0IsQ0FBbEI7QUFDQWlCLGdCQUFVRSxNQUFWLENBQWlCLHFCQUFqQixFQUF3QzNDLEdBQXhDLENBQTRDLEVBQUN1QyxRQUFRLEVBQVQsRUFBNUM7QUFDQUUsZ0JBQVVHLFdBQVYsQ0FBc0Isc0JBQXRCOztBQUVBO0FBQ0EsV0FBS0MsS0FBTDtBQUNBLFdBQUtDLE1BQUwsQ0FBWTtBQUFBLGVBQVN6RCxNQUFNd0QsS0FBTixFQUFUO0FBQUEsT0FBWjtBQUNBLFdBQUtQLE9BQUwsQ0FBYSxDQUFiLEVBQWdCO0FBQUEsZUFBU2pELE1BQU13RCxLQUFOLEVBQVQ7QUFBQSxPQUFoQjtBQUNEOzs7d0JBekVXO0FBQ1YsYUFBTyxLQUFLakIsV0FBTCxDQUFpQm1CLE1BQWpCLEtBQTRCLENBQW5DO0FBQ0Q7Ozt3QkFxQmM7QUFDYixVQUFNZixVQUFVLEVBQWhCO0FBQ0EsV0FBS0kscUJBQUwsQ0FBMkJKLE9BQTNCO0FBQ0EsVUFBR0EsUUFBUWUsTUFBUixLQUFtQixDQUF0QixFQUF3QjtBQUN0QixlQUFPLElBQVA7QUFDRDs7QUFFRCxhQUFPZixRQUFRQSxRQUFRZSxNQUFSLEdBQWlCLENBQXpCLENBQVA7QUFDRDs7Ozs7O2tCQXRFa0IxQixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGVmZTU4NTMzMjQ1OTAwNGY2NzciLCJpbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jbGFzc2VzL0Nhcm91c2VsJ1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJCgnLnNkeC1jYXJvdXNlbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0ICRlbGVtID0gJCh0aGlzKVxyXG4gICAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoJGVsZW0pXHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAkZWxlbS5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKGludGVydmFsKXtcclxuICAgICAgY2Fyb3VzZWwuc3RhcnQoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2Fyb3VzZWwucGFuZWwuZGlzcGxheSgpXHJcbiAgICB9XHJcblxyXG4gICAgJGVsZW0uZGF0YSgnc2R4Q2Fyb3VzZWwnLCBjYXJvdXNlbClcclxuICB9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBQYW5lbCBmcm9tICcuL1BhbmVsJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcm91c2VsXHJcbntcclxuICBjb25zdHJ1Y3RvcigkZWxlbSkge1xyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjgYzli5XjgYTjgabjgovjgYvjgIHkuIDmmYLlgZzmraLjgZfjgabjgYTjgovjgYvjga7jg5Xjg6njgrBcclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZVxyXG4gICAgLy/jgrnjg6njgqTjg4njgrfjg6fjg7zjga7jgqTjg7Pjgr/jg7zjg5Djg6vjgILjgrnjgr/jg7zjg4jjgZfjgabjgovjgYvjgIHmraLjgb7jgaPjgabjgYTjgovjgYvjga7jg5Xjg6njgrDjgavjgoLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdW5kZWZpbmVkXHJcbiAgICAvL+OCueODqeOCpOODieOCt+ODp+ODvOOBrue5sOOCiui/lOOBl+OBr+OCpOODs+OCv+ODvOODkOODq+OBp+OBr+OBquOBj1RpbWVvdXTjgpLlho3luLDnmoTjgavoqq3jgpPjgaflrp/nj77jgZfjgabjgYTjgb7jgZnjgILjgZ3jga7jgq/jg6rjgqLnlKjjga7jgq3jg7zjgIJcclxuICAgIHRoaXMuX3J1blRpbWVvdXRLZXkgPSAtMVxyXG4gICAgLy/nj77lnKjooajnpLrkuK3jga7mnp3okYnjg5Hjg43jg6vjgpLkv53mjIHjgZfjgabjgYTjgb7jgZnjgILmraLjgb7jgaPjgZ/jgajjgY3ntprjgY3jgYvjgonlho3nlJ/jgZnjgovjgZ/jgoHjgIJcclxuICAgIHRoaXMuX2N1cnJlbnRMZWFmID0gdW5kZWZpbmVkXHJcbiAgICAvL0RPTeS4iuOBruODnOOCv+ODs+OCkuaKvOOBmeOBqG1vdXNlbGVhdmXjgYznmbrnlJ/jgZfjgabjgZfjgb7jgYbjga7jgafjgq/jg6rjg4Pjgq/mmYLjgavjg5Xjg6njgrDjgpLnq4vjgabnmbrnlJ/jgpLmipHmraLjgIJcclxuICAgIHRoaXMuX2NsaWNraW5nQnV0dG9uID0gZmFsc2VcclxuXHJcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1cclxuICAgIC8v5LiA55Wq5aSW5p6g44GvcmVsYXRpdmXjgILkuIvlsaTjga/lhajjgaZhYnNvbHV0ZVxyXG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe3Bvc2l0aW9uOiAncmVsYXRpdmUnfSlcclxuICAgIHRoaXMucGFuZWwgPSBuZXcgUGFuZWwodGhpcywgJGVsZW0pXHJcbiAgICBcclxuICAgIC8v5aSW5p6g44Gu6auY44GV44KS5YiH44KK6Kmw44KB44KLXHJcbiAgICBjb25zdCBoZWlnaHQgPSAkZWxlbS5hdHRyKCdkYXRhLWhlaWdodCcpXHJcbiAgICBpZighaGVpZ2h0KXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBkYXRhLWhlaWdodCBhdHRyaWJ1dGUgaW4gXCIgKyB0aGlzLl9qcXVlcnlUb1N0cmluZyh0aGlzLiRlbGVtZW50KSlcclxuICAgIH1cclxuICAgIHRoaXMuJGVsZW1lbnQuaGVpZ2h0KGhlaWdodClcclxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcclxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXHJcbiAgICB9KVxyXG5cclxuICAgIC8v44Oe44Km44K544Kq44O844OQ44O85pmC44Gv5q2i44KB44KLXHJcbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnBhdXNlKClcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy4kZWxlbWVudC5vbignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgaWYoIXRoaXMuX2NsaWNraW5nQnV0dG9uKXtcclxuICAgICAgICB0aGlzLnJlc3RhcnQoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844GM5YuV44GE44Gm44GE44KL44Gp44GG44GL44CC44Od44O844K644Gn44KC5YGc5q2i44Gn44KC44Gp44Gh44KJ44Gn44KCZmFsc2XjgafjgZnjgIJcclxuICAgKi9cclxuICBnZXQgaXNSdW5uaW5nKCl7XHJcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZyAmJiB0aGlzLl9ydW5JbnRlcnZhbCAhPT0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zlrp/ooYzmmYLjgavnubDjgorov5TjgZflkbzjgbDjgozjgb7jgZnjgIJzZXRJbnRlcnZhbOOBr+S9v+OCj+OBmuOBq3NldFRpbWVvdXTjga7lho3luLDlkbzjgbPlh7rjgZfjgpLkvb/jgaPjgabjgYTjgb7jgZnjgIJcclxuICAgKi9cclxuICBfbmV4dCgpe1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3J1blRpbWVvdXRLZXkpXHJcblxyXG4gICAgdGhpcy5fcnVuVGltZW91dEtleSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZighdGhpcy5pc1J1bm5pbmcpe1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5sZWFmcy5pbmRleE9mKHRoaXMuX2N1cnJlbnRMZWFmKSArIDFcclxuICAgICAgaWYoIXRoaXMubGVhZnNbbmV4dEluZGV4XSl7XHJcbiAgICAgICAgbmV4dEluZGV4ID0gMFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGVhZnNbbmV4dEluZGV4XS5kaXNwbGF5KClcclxuXHJcbiAgICAgIHRoaXMuX25leHQoKVxyXG5cclxuICAgIH0sIHRoaXMuX3J1bkludGVydmFsKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44Od44O844K644GX44G+44GZ44CC5YaN44K544K/44O844OI44GvcmVzdGFydOOBp+OBiumhmOOBhOOBl+OBvuOBmeOAglxyXG4gICAqL1xyXG4gIHBhdXNlKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjg53jg7zjgrrmmYLjga7lho3jgrnjgr/jg7zjg4hcclxuICAgKi9cclxuICByZXN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLlgZzmraLjgZfjgb7jgZnjgIJcclxuICAgKi9cclxuICBzdG9wKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgICAgdGhpcy5fcnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueODqeOCpOODieOCt+ODp+ODvOOCkuOCueOCv+ODvOODiOOBleOBm+OCi+OAguOCpOODs+OCv+ODvOODkOODq+OBr2RhdGEtaW50ZXJ2YWzjgYvjgonlj5bjgorjgb7jgZnjgIJcclxuICAgKi9cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWVcclxuICAgIHRoaXMucGFuZWwuZGlzcGxheSgpXHJcbiAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1pbnRlcnZhbCcpXHJcbiAgICBpZighdGhpcy5fcnVuSW50ZXJ2YWwpe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGRhdGEtaW50ZXJ2YWwgYXR0cmlidXRlIGluIFwiICsgdGhpcy5fanF1ZXJ5VG9TdHJpbmcodGhpcy4kZWxlbWVudCkpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sZWFmcyA9IFtdXHJcbiAgICB0aGlzLnBhbmVsLmFzc2VtYmxlTGVhZnModGhpcy5sZWFmcyk7XHJcblxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICBfanF1ZXJ5VG9TdHJpbmcoJGVsZW0pe1xyXG4gICAgY29uc3QgaHRtbCA9ICRlbGVtLmdldCgwKS5vdXRlckhUTUxcclxuICAgIHJldHVybiBodG1sLnN1YnN0cigwLCBodG1sLmluZGV4T2YoJz4nKSArIDEpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9DYXJvdXNlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsXHJcbntcclxuICBjb25zdHJ1Y3RvcihjYXJvdXNlbCwgJGVsZW0sIHBhcmVudFBhbmVsKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsID0gY2Fyb3VzZWxcclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG5cclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuV3JhcHBlcicpXHJcbiAgICBcclxuICAgIHRoaXMucGFyZW50UGFuZWwgPSBwYXJlbnRQYW5lbFxyXG4gICAgaWYodGhpcy5wYXJlbnRQYW5lbCl7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcclxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICB3aWR0aDogJzEwMCUnXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuJGJ1dHRvbiA9IHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bicpXHJcbiAgICAgIC8v44Oc44K/44Oz44Gv6Kaq44Gu44Op44OD44OR44O844Gr56qB44Gj6L6844G/44G+44GZ44CC5oq844GX44Gf5pmC44Gr44G+44KL44Gj44Go5a2Q44OR44ON44Or44KS5YWl44KM5pu/44GI44KL44GL44KJ44Gn44GZ44CCXHJcbiAgICAgIHRoaXMucGFyZW50UGFuZWwuJGJ1dHRvbnNXcmFwcGVyLmFwcGVuZCh0aGlzLiRidXR0b24pXHJcblxyXG4gICAgICAvL+ODnOOCv+ODs+OBruOCr+ODquODg+OCr+OCpOODmeODs+ODiOeZu+mMsuOAglxyXG4gICAgICB0aGlzLiRidXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9OXHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSB0cnVlXHJcbiAgICAgICAgLy/oh6rliIbjgpLooajnpLpcclxuICAgICAgICB0aGlzLmRpc3BsYXkoKVxyXG4gICAgICAgIC8vbW91c2VsZWF2ZeOBruiqpOeZuueBq+mYsuatoueUqOODleODqeOCsOOCkk9GRlxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbC5fY2xpY2tpbmdCdXR0b24gPSBmYWxzZVxyXG4gICAgICAgIH0sIDApXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/lrZDjg5Hjg43jg6vjgpLnlJ/miJDjgIJcclxuICAgIHRoaXMuY2hpbGRQYW5lbHMgPSBbXVxyXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtcGFuZWwnKS5lYWNoKChrZXksIGVsZW0pID0+IHtcclxuICAgICAgdGhpcy5jaGlsZFBhbmVscy5wdXNoKG5ldyBQYW5lbChjYXJvdXNlbCwgJChlbGVtKSwgdGhpcykpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy/mnp3okYnjg5Hjg43jg6vjgYvjganjgYbjgYvjga7jg4Hjgqfjg4Pjgq/jgIJcclxuICBnZXQgaXNMZWFmKCl7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZFBhbmVscy5sZW5ndGggPT09IDBcclxuICB9XHJcblxyXG4gIC8v55u057O744Gu6Kaq44OR44ON44Or44KS6ZuG44KB44KL44CCXHJcbiAgYXNzZW1ibGVEaXJlY3RQYXJlbnRzKHBhcmVudHMpe1xyXG4gICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50UGFuZWxcclxuICAgIHdoaWxlKHBhcmVudCl7XHJcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpXHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRQYW5lbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy/nm7Tns7vjga7lrZDopoHntKDjgpLpm4bjgoHjgovjgIJcclxuICBhc3NlbWJsZUxlYWZzKGxlYWZzKXtcclxuICAgIGlmKHRoaXMuaXNMZWFmKXtcclxuICAgICAgbGVhZnMucHVzaCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgICQuZWFjaCh0aGlzLmNoaWxkUGFuZWxzLCAoa2V5LCBwYW5lbCkgPT4gcGFuZWwuYXNzZW1ibGVMZWFmcyhsZWFmcykpXHJcbiAgfVxyXG5cclxuICAvL+ODq+ODvOODiOOBruODkeODjeODq1xyXG4gIGdldCByb290UGFuZWwoKXtcclxuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gICAgdGhpcy5hc3NlbWJsZURpcmVjdFBhcmVudHMocGFyZW50cylcclxuICAgIGlmKHBhcmVudHMubGVuZ3RoID09PSAwKXtcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdXHJcbiAgfVxyXG5cclxuICAvL+ebtOezu+OBruimquODkeODjeODq+OBq+WvvuOBl+OBpumghuOBq+ODoeOCveODg+ODieOCkuWun+ihjOOBmeOCi+OAglxyXG4gIGFzY2VuZChjYWxsYmFjayl7XHJcbiAgICBjb25zdCBwYXJlbnRzID0gW11cclxuICAgIHRoaXMuYXNzZW1ibGVEaXJlY3RQYXJlbnRzKHBhcmVudHMpXHJcbiAgICAkLmVhY2gocGFyZW50cywgKGtleSwgcGFuZWwpID0+IHtcclxuICAgICAgY2FsbGJhY2socGFuZWwpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy/mjIflrprjgZfjgZ/jgqTjg7Pjg4fjg4Pjgq/jgrnjga7lrZDjg5Hjg43jg6vjgavlr77jgZfjgabpoIbjgavjg6Hjgr3jg4Pjg4njgpLlrp/ooYzjgZnjgotcclxuICBkZXNjZW5kKGluZGV4LCBjYWxsYmFjayl7XHJcbiAgICBpZih0aGlzLmNoaWxkUGFuZWxzW2luZGV4XSl7XHJcbiAgICAgIGNhbGxiYWNrKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKVxyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzW2luZGV4XS5kZXNjZW5kKGluZGV4LCBjYWxsYmFjaylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8v44Ko44Os44Oh44Oz44OI44KS6KaL44GI44KL54q25oWL44Gr44GX44Gm44Kv44Op44K544KS5LuY5LiO44CCXHJcbiAgX3Nob3coKXtcclxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHt6SW5kZXg6IDF9KVxyXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgaWYodGhpcy4kYnV0dG9uKXtcclxuICAgICAgdGhpcy4kYnV0dG9uLmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICB0aGlzLmNhcm91c2VsLl9jdXJyZW50TGVhZiA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICAvL3NkeC1jYXJvdXNlbC1jdXJyZW5044Guei1pbmRleOOCkuOCr+ODquOCouOBl+OBpuOCr+ODqeOCueOCkuWkluOBmeOAglxyXG4gICAgY29uc3QgJGN1cnJlbnRzID0gdGhpcy5yb290UGFuZWwuJGVsZW1lbnQuZmluZCgnLnNkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgICRjdXJyZW50cy5maWx0ZXIoJy5zZHgtY2Fyb3VzZWwtcGFuZWwnKS5jc3Moe3pJbmRleDogJyd9KVxyXG4gICAgJGN1cnJlbnRzLnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcblxyXG4gICAgLy/lkITjg5Hjg43jg6vjga7jgqjjg6zjg6Hjg7Pjg4jjgpLooajnpLrnirbmhYvjgbhcclxuICAgIHRoaXMuX3Nob3coKVxyXG4gICAgdGhpcy5hc2NlbmQocGFuZWwgPT4gcGFuZWwuX3Nob3coKSlcclxuICAgIHRoaXMuZGVzY2VuZCgwLCBwYW5lbCA9PiBwYW5lbC5fc2hvdygpKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvUGFuZWwuanMiXSwic291cmNlUm9vdCI6IiJ9