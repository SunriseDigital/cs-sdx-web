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
    carousel.height = $elem.attr('data-height');
    carousel.run();
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

    this.$elem = $elem;
    this.panel = new _Panel2.default($elem);
  }

  _createClass(Carousel, [{
    key: 'run',
    value: function run() {
      console.log(this.panel);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panel = function Panel($elem) {
  var _this = this;

  _classCallCheck(this, Panel);

  this.$self = $elem;

  this.$buttonsWrapper = this.$self.find('> .sdx-carousel-panel > .sdx-carousel-btnWrapper');
  this.$buttons = this.$self.find('> .sdx-carousel-panel > .sdx-carousel-btn');
  this.$buttonsWrapper.append(this.$buttons.clone());
  this.$buttons.hide();

  this.childPanels = [];
  this.$self.find('> .sdx-carousel-panel > .sdx-carousel-child').each(function (key, elem) {
    _this.childPanels.push(new Panel($(elem)));
  });
};

exports.default = Panel;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWFlNjU4YTVkYWJlZjFhZGI2MWUiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJoZWlnaHQiLCJhdHRyIiwicnVuIiwiQ2Fyb3VzZWwiLCJwYW5lbCIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsImNzcyIsIm92ZXJmbG93IiwiUGFuZWwiLCIkc2VsZiIsIiRidXR0b25zV3JhcHBlciIsImZpbmQiLCIkYnV0dG9ucyIsImFwcGVuZCIsImNsb25lIiwiaGlkZSIsImNoaWxkUGFuZWxzIiwia2V5IiwiZWxlbSIsInB1c2giXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBRUFBLEVBQUUsWUFBTTtBQUNOQSxJQUFFLGVBQUYsRUFBbUJDLElBQW5CLENBQXdCLFlBQVU7QUFDaEMsUUFBTUMsUUFBUUYsRUFBRSxJQUFGLENBQWQ7QUFDQSxRQUFNRyxXQUFXLHVCQUFhRCxLQUFiLENBQWpCO0FBQ0FDLGFBQVNDLE1BQVQsR0FBa0JGLE1BQU1HLElBQU4sQ0FBVyxhQUFYLENBQWxCO0FBQ0FGLGFBQVNHLEdBQVQ7QUFDRCxHQUxEO0FBTUQsQ0FQRCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7Ozs7SUFFcUJDLFE7QUFFbkIsb0JBQVlMLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS00sS0FBTCxHQUFhLG9CQUFVTixLQUFWLENBQWI7QUFDRDs7OzswQkFTSTtBQUNITyxjQUFRQyxHQUFSLENBQVksS0FBS0YsS0FBakI7QUFDRDs7O3NCQVRVRyxLLEVBQU07QUFDZixXQUFLVCxLQUFMLENBQVdFLE1BQVgsQ0FBa0JPLEtBQWxCO0FBQ0EsV0FBS1QsS0FBTCxDQUFXVSxHQUFYLENBQWU7QUFDYkMsa0JBQVU7QUFERyxPQUFmO0FBR0Q7Ozs7OztrQkFaa0JOLFE7Ozs7Ozs7Ozs7Ozs7OztJQ0ZBTyxLLEdBRW5CLGVBQVlaLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsT0FBS2EsS0FBTCxHQUFhYixLQUFiOztBQUVBLE9BQUtjLGVBQUwsR0FBdUIsS0FBS0QsS0FBTCxDQUFXRSxJQUFYLENBQWdCLGtEQUFoQixDQUF2QjtBQUNBLE9BQUtDLFFBQUwsR0FBZ0IsS0FBS0gsS0FBTCxDQUFXRSxJQUFYLENBQWdCLDJDQUFoQixDQUFoQjtBQUNBLE9BQUtELGVBQUwsQ0FBcUJHLE1BQXJCLENBQTRCLEtBQUtELFFBQUwsQ0FBY0UsS0FBZCxFQUE1QjtBQUNBLE9BQUtGLFFBQUwsQ0FBY0csSUFBZDs7QUFFQSxPQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsT0FBS1AsS0FBTCxDQUFXRSxJQUFYLENBQWdCLDZDQUFoQixFQUErRGhCLElBQS9ELENBQW9FLFVBQUNzQixHQUFELEVBQU1DLElBQU4sRUFBZTtBQUNqRixVQUFLRixXQUFMLENBQWlCRyxJQUFqQixDQUFzQixJQUFJWCxLQUFKLENBQVVkLEVBQUV3QixJQUFGLENBQVYsQ0FBdEI7QUFDRCxHQUZEO0FBR0QsQzs7a0JBZGtCVixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWFlNjU4YTVkYWJlZjFhZGI2MWUiLCJpbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jbGFzc2VzL0Nhcm91c2VsJ1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJCgnLnNkeC1jYXJvdXNlbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0ICRlbGVtID0gJCh0aGlzKVxyXG4gICAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoJGVsZW0pXHJcbiAgICBjYXJvdXNlbC5oZWlnaHQgPSAkZWxlbS5hdHRyKCdkYXRhLWhlaWdodCcpXHJcbiAgICBjYXJvdXNlbC5ydW4oKTtcclxuICB9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBQYW5lbCBmcm9tICcuL1BhbmVsJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRlbGVtKSB7XHJcbiAgICB0aGlzLiRlbGVtID0gJGVsZW1cclxuICAgIHRoaXMucGFuZWwgPSBuZXcgUGFuZWwoJGVsZW0pXHJcbiAgfVxyXG5cclxuICBzZXQgaGVpZ2h0KHZhbHVlKXtcclxuICAgIHRoaXMuJGVsZW0uaGVpZ2h0KHZhbHVlKVxyXG4gICAgdGhpcy4kZWxlbS5jc3Moe1xyXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBydW4oKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMucGFuZWwpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9DYXJvdXNlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsXHJcbntcclxuICBjb25zdHJ1Y3RvcigkZWxlbSkge1xyXG4gICAgdGhpcy4kc2VsZiA9ICRlbGVtXHJcblxyXG4gICAgdGhpcy4kYnV0dG9uc1dyYXBwZXIgPSB0aGlzLiRzZWxmLmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1wYW5lbCA+IC5zZHgtY2Fyb3VzZWwtYnRuV3JhcHBlcicpXHJcbiAgICB0aGlzLiRidXR0b25zID0gdGhpcy4kc2VsZi5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtcGFuZWwgPiAuc2R4LWNhcm91c2VsLWJ0bicpXHJcbiAgICB0aGlzLiRidXR0b25zV3JhcHBlci5hcHBlbmQodGhpcy4kYnV0dG9ucy5jbG9uZSgpKVxyXG4gICAgdGhpcy4kYnV0dG9ucy5oaWRlKClcclxuXHJcbiAgICB0aGlzLmNoaWxkUGFuZWxzID0gW11cclxuICAgIHRoaXMuJHNlbGYuZmluZCgnPiAuc2R4LWNhcm91c2VsLXBhbmVsID4gLnNkeC1jYXJvdXNlbC1jaGlsZCcpLmVhY2goKGtleSwgZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzLnB1c2gobmV3IFBhbmVsKCQoZWxlbSkpKVxyXG4gICAgfSlcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL1BhbmVsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==