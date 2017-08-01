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
  $('.wrapper').each(function () {
    var $wrapper = $(this);
    var $elem = $wrapper.find('.sdx-carousel');
    var carousel = new _Carousel2.default($elem);
    carousel.height = $elem.attr('data-height');
    carousel.run(1000);

    $wrapper.find('.btn.start').on('click', function () {
      return carousel.run(1000);
    });
    $wrapper.find('.btn.stop').on('click', function () {
      return carousel.stop();
    });
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
    _classCallCheck(this, Carousel);

    this.runInterval = undefined;
    this.runTimeoutKey = -1;
    this.currentLeaf = undefined;
    this.$elem = $elem;
    this.$elem.css({ position: 'relative' });

    this.panel = new _Panel2.default(this, $elem);
  }

  _createClass(Carousel, [{
    key: 'next',
    value: function next() {
      var _this = this;

      clearTimeout(this.runTimeoutKey);
      if (!this.isRunning) {
        return;
      }

      this.runTimeoutKey = setTimeout(function () {
        var nextIndex = _this.leafs.indexOf(_this.currentLeaf) + 1;
        if (!_this.leafs[nextIndex]) {
          nextIndex = 0;
        }
        _this.leafs[nextIndex].display();

        _this.next();
      }, this.runInterval);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.runInterval = undefined;
    }

    /**
     * スライドショーをスタートさせる
     * @param {int} interval 
     */

  }, {
    key: 'run',
    value: function run(interval) {
      this.panel.display();
      this.runInterval = interval;

      this.leafs = [];
      this.panel.assembleLeafs(this.leafs);

      this.next();
    }
  }, {
    key: 'isRunning',
    get: function get() {
      return this.runInterval !== undefined;
    }
  }, {
    key: 'height',
    set: function set(value) {
      this.$elem.height(value);
      this.$elem.css({
        overflow: 'hidden'
      });
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
    this.$elem = $elem;

    this.$buttonsWrapper = this.$elem.find('> .sdx-carousel-btnWrapper');

    this.parentPanel = parentPanel;
    if (this.parentPanel) {
      this.$elem.css({
        position: 'absolute',
        width: '100%'
      });
      this.$button = this.$elem.find('> .sdx-carousel-btn');
      this.parentPanel.addButton(this.$button);
      this.$button.on('click', function () {
        _this.display();
        if (_this.carousel.isRunning) {
          _this.carousel.next();
        }
      });
    }

    this.childPanels = [];
    this.$elem.find('> .sdx-carousel-panel').each(function (key, elem) {
      _this.childPanels.push(new Panel(carousel, $(elem), _this));
    });

    this.$display = $elem.find('> .sdx-carousel-display');
  }

  _createClass(Panel, [{
    key: 'addButton',
    value: function addButton($button) {
      this.$buttonsWrapper.append($button);
    }
  }, {
    key: 'ascend',
    value: function ascend(callback) {
      $.each(this.parents, function (key, panel) {
        callback(panel);
      });
    }
  }, {
    key: 'descend',
    value: function descend(index, callback) {
      if (this.childPanels[index]) {
        callback(this.childPanels[index]);
        this.childPanels[index].descend(index, callback);
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this.$elem.css({ zIndex: 1 });
      this.$elem.addClass('sdx-carousel-current');
      if (this.$button) {
        this.$button.addClass('sdx-carousel-current');
      }

      if (this.isLeaf) {
        this.carousel.currentLeaf = this;
      }
    }
  }, {
    key: 'display',
    value: function display() {
      var $currents = this.rootPanel.$elem.find('.sdx-carousel-current');
      $currents.filter('.sdx-carousel-panel').css({ zIndex: '' });
      $currents.removeClass('sdx-carousel-current');

      this.show();
      this.ascend(function (panel) {
        return panel.show();
      });
      this.descend(0, function (panel) {
        return panel.show();
      });
    }
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
  }, {
    key: 'isLeaf',
    get: function get() {
      return this.$display.length > 0;
    }
  }, {
    key: 'parents',
    get: function get() {
      var parents = [];
      var parent = this.parentPanel;
      while (parent) {
        parents.push(parent);
        parent = parent.parentPanel;
      }

      return parents;
    }
  }, {
    key: 'rootPanel',
    get: function get() {
      var parents = this.parents;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzYwYzU1MGYyYWRmM2MxNDliYmYiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiR3cmFwcGVyIiwiJGVsZW0iLCJmaW5kIiwiY2Fyb3VzZWwiLCJoZWlnaHQiLCJhdHRyIiwicnVuIiwib24iLCJzdG9wIiwiQ2Fyb3VzZWwiLCJydW5JbnRlcnZhbCIsInVuZGVmaW5lZCIsInJ1blRpbWVvdXRLZXkiLCJjdXJyZW50TGVhZiIsImNzcyIsInBvc2l0aW9uIiwicGFuZWwiLCJjbGVhclRpbWVvdXQiLCJpc1J1bm5pbmciLCJzZXRUaW1lb3V0IiwibmV4dEluZGV4IiwibGVhZnMiLCJpbmRleE9mIiwiZGlzcGxheSIsIm5leHQiLCJpbnRlcnZhbCIsImFzc2VtYmxlTGVhZnMiLCJ2YWx1ZSIsIm92ZXJmbG93IiwiUGFuZWwiLCJwYXJlbnRQYW5lbCIsIiRidXR0b25zV3JhcHBlciIsIndpZHRoIiwiJGJ1dHRvbiIsImFkZEJ1dHRvbiIsImNoaWxkUGFuZWxzIiwia2V5IiwiZWxlbSIsInB1c2giLCIkZGlzcGxheSIsImFwcGVuZCIsImNhbGxiYWNrIiwicGFyZW50cyIsImluZGV4IiwiZGVzY2VuZCIsInpJbmRleCIsImFkZENsYXNzIiwiaXNMZWFmIiwiJGN1cnJlbnRzIiwicm9vdFBhbmVsIiwiZmlsdGVyIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiYXNjZW5kIiwibGVuZ3RoIiwicGFyZW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7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QUFNO0FBQ2xCLFVBQUcsS0FBSzBCLE1BQVIsRUFBZTtBQUNiMUIsY0FBTWlCLElBQU4sQ0FBVyxJQUFYO0FBQ0Q7O0FBRUR4QyxRQUFFQyxJQUFGLENBQU8sS0FBS29DLFdBQVosRUFBeUIsVUFBQ0MsR0FBRCxFQUFNcEIsS0FBTjtBQUFBLGVBQWdCQSxNQUFNVSxhQUFOLENBQW9CTCxLQUFwQixDQUFoQjtBQUFBLE9BQXpCO0FBQ0Q7Ozt3QkFyRVc7QUFDVixhQUFPLEtBQUtrQixRQUFMLENBQWNlLE1BQWQsR0FBdUIsQ0FBOUI7QUFDRDs7O3dCQUVZO0FBQ1gsVUFBTVosVUFBVSxFQUFoQjtBQUNBLFVBQUlhLFNBQVMsS0FBS3pCLFdBQWxCO0FBQ0EsYUFBTXlCLE1BQU4sRUFBYTtBQUNYYixnQkFBUUosSUFBUixDQUFhaUIsTUFBYjtBQUNBQSxpQkFBU0EsT0FBT3pCLFdBQWhCO0FBQ0Q7O0FBRUQsYUFBT1ksT0FBUDtBQUNEOzs7d0JBRWM7QUFDYixVQUFNQSxVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsVUFBR0EsUUFBUVksTUFBUixLQUFtQixDQUF0QixFQUF3QjtBQUN0QixlQUFPLElBQVA7QUFDRDs7QUFFRCxhQUFPWixRQUFRQSxRQUFRWSxNQUFSLEdBQWlCLENBQXpCLENBQVA7QUFDRDs7Ozs7O2tCQXREa0J6QixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzYwYzU1MGYyYWRmM2MxNDliYmYiLCJpbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jbGFzc2VzL0Nhcm91c2VsJ1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJCgnLndyYXBwZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCAkd3JhcHBlciA9ICQodGhpcylcclxuICAgIGNvbnN0ICRlbGVtID0gJHdyYXBwZXIuZmluZCgnLnNkeC1jYXJvdXNlbCcpXHJcbiAgICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCgkZWxlbSlcclxuICAgIGNhcm91c2VsLmhlaWdodCA9ICRlbGVtLmF0dHIoJ2RhdGEtaGVpZ2h0JylcclxuICAgIGNhcm91c2VsLnJ1bigxMDAwKTtcclxuXHJcbiAgICAkd3JhcHBlci5maW5kKCcuYnRuLnN0YXJ0Jykub24oJ2NsaWNrJywgKCkgPT4gY2Fyb3VzZWwucnVuKDEwMDApKVxyXG4gICAgJHdyYXBwZXIuZmluZCgnLmJ0bi5zdG9wJykub24oJ2NsaWNrJywgKCkgPT4gY2Fyb3VzZWwuc3RvcCgpKVxyXG4gIH0pXHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IFBhbmVsIGZyb20gJy4vUGFuZWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJvdXNlbFxyXG57XHJcbiAgY29uc3RydWN0b3IoJGVsZW0pIHtcclxuICAgIHRoaXMucnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICAgIHRoaXMucnVuVGltZW91dEtleSA9IC0xXHJcbiAgICB0aGlzLmN1cnJlbnRMZWFmID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLiRlbGVtID0gJGVsZW1cclxuICAgIHRoaXMuJGVsZW0uY3NzKHtwb3NpdGlvbjogJ3JlbGF0aXZlJ30pXHJcblxyXG4gICAgdGhpcy5wYW5lbCA9IG5ldyBQYW5lbCh0aGlzLCAkZWxlbSlcclxuICB9XHJcblxyXG4gIGdldCBpc1J1bm5pbmcoKXtcclxuICAgIHJldHVybiB0aGlzLnJ1bkludGVydmFsICE9PSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIHNldCBoZWlnaHQodmFsdWUpe1xyXG4gICAgdGhpcy4kZWxlbS5oZWlnaHQodmFsdWUpXHJcbiAgICB0aGlzLiRlbGVtLmNzcyh7XHJcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG5leHQoKXtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJ1blRpbWVvdXRLZXkpXHJcbiAgICBpZighdGhpcy5pc1J1bm5pbmcpe1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJ1blRpbWVvdXRLZXkgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMubGVhZnMuaW5kZXhPZih0aGlzLmN1cnJlbnRMZWFmKSArIDFcclxuICAgICAgaWYoIXRoaXMubGVhZnNbbmV4dEluZGV4XSl7XHJcbiAgICAgICAgbmV4dEluZGV4ID0gMFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGVhZnNbbmV4dEluZGV4XS5kaXNwbGF5KClcclxuXHJcbiAgICAgIHRoaXMubmV4dCgpXHJcblxyXG4gICAgfSwgdGhpcy5ydW5JbnRlcnZhbClcclxuICB9XHJcblxyXG4gIHN0b3AoKXtcclxuICAgICB0aGlzLnJ1bkludGVydmFsID0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLjgrnjgr/jg7zjg4jjgZXjgZvjgotcclxuICAgKiBAcGFyYW0ge2ludH0gaW50ZXJ2YWwgXHJcbiAgICovXHJcbiAgcnVuKGludGVydmFsKXtcclxuICAgIHRoaXMucGFuZWwuZGlzcGxheSgpXHJcbiAgICB0aGlzLnJ1bkludGVydmFsID0gaW50ZXJ2YWxcclxuXHJcbiAgICB0aGlzLmxlYWZzID0gW11cclxuICAgIHRoaXMucGFuZWwuYXNzZW1ibGVMZWFmcyh0aGlzLmxlYWZzKTtcclxuXHJcbiAgICB0aGlzLm5leHQoKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQYW5lbFxyXG57XHJcbiAgY29uc3RydWN0b3IoY2Fyb3VzZWwsICRlbGVtLCBwYXJlbnRQYW5lbCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsXHJcbiAgICB0aGlzLiRlbGVtID0gJGVsZW1cclxuXHJcbiAgICB0aGlzLiRidXR0b25zV3JhcHBlciA9IHRoaXMuJGVsZW0uZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bldyYXBwZXInKVxyXG4gICAgXHJcbiAgICB0aGlzLnBhcmVudFBhbmVsID0gcGFyZW50UGFuZWxcclxuICAgIGlmKHRoaXMucGFyZW50UGFuZWwpe1xyXG4gICAgICB0aGlzLiRlbGVtLmNzcyh7XHJcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJ1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLiRidXR0b24gPSB0aGlzLiRlbGVtLmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1idG4nKVxyXG4gICAgICB0aGlzLnBhcmVudFBhbmVsLmFkZEJ1dHRvbih0aGlzLiRidXR0b24pXHJcbiAgICAgIHRoaXMuJGJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5KClcclxuICAgICAgICBpZih0aGlzLmNhcm91c2VsLmlzUnVubmluZyl7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsLm5leHQoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkUGFuZWxzID0gW11cclxuICAgIHRoaXMuJGVsZW0uZmluZCgnPiAuc2R4LWNhcm91c2VsLXBhbmVsJykuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHMucHVzaChuZXcgUGFuZWwoY2Fyb3VzZWwsICQoZWxlbSksIHRoaXMpKVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLiRkaXNwbGF5ID0gJGVsZW0uZmluZCgnPiAuc2R4LWNhcm91c2VsLWRpc3BsYXknKTtcclxuICB9XHJcblxyXG4gIGdldCBpc0xlYWYoKXtcclxuICAgIHJldHVybiB0aGlzLiRkaXNwbGF5Lmxlbmd0aCA+IDBcclxuICB9XHJcblxyXG4gIGdldCBwYXJlbnRzKCl7XHJcbiAgICBjb25zdCBwYXJlbnRzID0gW11cclxuICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudFBhbmVsXHJcbiAgICB3aGlsZShwYXJlbnQpe1xyXG4gICAgICBwYXJlbnRzLnB1c2gocGFyZW50KVxyXG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50UGFuZWxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50c1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJvb3RQYW5lbCgpe1xyXG4gICAgY29uc3QgcGFyZW50cyA9IHRoaXMucGFyZW50c1xyXG4gICAgaWYocGFyZW50cy5sZW5ndGggPT09IDApe1xyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXJlbnRzW3BhcmVudHMubGVuZ3RoIC0gMV1cclxuICB9XHJcblxyXG4gIGFkZEJ1dHRvbigkYnV0dG9uKXtcclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyLmFwcGVuZCgkYnV0dG9uKVxyXG4gIH1cclxuXHJcbiAgYXNjZW5kKGNhbGxiYWNrKXtcclxuICAgICQuZWFjaCh0aGlzLnBhcmVudHMsIChrZXksIHBhbmVsKSA9PiB7XHJcbiAgICAgIGNhbGxiYWNrKHBhbmVsKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKXtcclxuICAgIGlmKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKXtcclxuICAgICAgY2FsbGJhY2sodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pXHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdLmRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdygpe1xyXG4gICAgdGhpcy4kZWxlbS5jc3Moe3pJbmRleDogMX0pXHJcbiAgICB0aGlzLiRlbGVtLmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICBpZih0aGlzLiRidXR0b24pe1xyXG4gICAgICB0aGlzLiRidXR0b24uYWRkQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgIH1cclxuXHJcbiAgICBpZih0aGlzLmlzTGVhZil7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWwuY3VycmVudExlYWYgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcGxheSgpe1xyXG4gICAgY29uc3QgJGN1cnJlbnRzID0gdGhpcy5yb290UGFuZWwuJGVsZW0uZmluZCgnLnNkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgICRjdXJyZW50cy5maWx0ZXIoJy5zZHgtY2Fyb3VzZWwtcGFuZWwnKS5jc3Moe3pJbmRleDogJyd9KVxyXG4gICAgJGN1cnJlbnRzLnJlbW92ZUNsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcblxyXG4gICAgdGhpcy5zaG93KClcclxuICAgIHRoaXMuYXNjZW5kKHBhbmVsID0+IHBhbmVsLnNob3coKSlcclxuICAgIHRoaXMuZGVzY2VuZCgwLCBwYW5lbCA9PiBwYW5lbC5zaG93KCkpXHJcbiAgfVxyXG5cclxuICBhc3NlbWJsZUxlYWZzKGxlYWZzKXtcclxuICAgIGlmKHRoaXMuaXNMZWFmKXtcclxuICAgICAgbGVhZnMucHVzaCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgICQuZWFjaCh0aGlzLmNoaWxkUGFuZWxzLCAoa2V5LCBwYW5lbCkgPT4gcGFuZWwuYXNzZW1ibGVMZWFmcyhsZWFmcykpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=