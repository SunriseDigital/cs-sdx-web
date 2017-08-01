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

    var height = $elem.attr('data-height');
    if (!height) {
      throw new Error("data-height attribute is required.");
    }
    carousel.height = height;

    var interval = $elem.attr('data-interval');
    if (interval) {
      carousel.start(interval);
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
    _classCallCheck(this, Carousel);

    this.running = false;
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

      this.runTimeoutKey = setTimeout(function () {
        if (!_this.isRunning) {
          return;
        }

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
      this.running = false;
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.running = true;
      this.next();
    }

    /**
     * スライドショーをスタートさせる
     * @param {int} interval 
     */

  }, {
    key: 'start',
    value: function start(interval) {
      this.running = true;
      this.panel.display();
      this.runInterval = interval;

      this.leafs = [];
      this.panel.assembleLeafs(this.leafs);

      this.next();
    }
  }, {
    key: 'isRunning',
    get: function get() {
      return this.running && this.runInterval !== undefined;
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
  }

  _createClass(Panel, [{
    key: 'assembleDirectParents',
    value: function assembleDirectParents(parents) {
      var parent = this.parentPanel;
      while (parent) {
        parents.push(parent);
        parent = parent.parentPanel;
      }
    }
  }, {
    key: 'addButton',
    value: function addButton($button) {
      this.$buttonsWrapper.append($button);
    }
  }, {
    key: 'ascend',
    value: function ascend(callback) {
      var parents = [];
      this.assembleDirectParents(parents);
      $.each(parents, function (key, panel) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmExYTlkMGEwNmMyMGM2YmI0NGIiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJoZWlnaHQiLCJhdHRyIiwiRXJyb3IiLCJpbnRlcnZhbCIsInN0YXJ0IiwicGFuZWwiLCJkaXNwbGF5IiwiZGF0YSIsIkNhcm91c2VsIiwicnVubmluZyIsInJ1bkludGVydmFsIiwidW5kZWZpbmVkIiwicnVuVGltZW91dEtleSIsImN1cnJlbnRMZWFmIiwiY3NzIiwicG9zaXRpb24iLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaXNSdW5uaW5nIiwibmV4dEluZGV4IiwibGVhZnMiLCJpbmRleE9mIiwibmV4dCIsImFzc2VtYmxlTGVhZnMiLCJ2YWx1ZSIsIm92ZXJmbG93IiwiUGFuZWwiLCJwYXJlbnRQYW5lbCIsIiRidXR0b25zV3JhcHBlciIsImZpbmQiLCJ3aWR0aCIsIiRidXR0b24iLCJhZGRCdXR0b24iLCJvbiIsImNoaWxkUGFuZWxzIiwia2V5IiwiZWxlbSIsInB1c2giLCJwYXJlbnRzIiwicGFyZW50IiwiYXBwZW5kIiwiY2FsbGJhY2siLCJhc3NlbWJsZURpcmVjdFBhcmVudHMiLCJpbmRleCIsImRlc2NlbmQiLCJ6SW5kZXgiLCJhZGRDbGFzcyIsImlzTGVhZiIsIiRjdXJyZW50cyIsInJvb3RQYW5lbCIsImZpbHRlciIsInJlbW92ZUNsYXNzIiwic2hvdyIsImFzY2VuZCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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QixDQUFsQjtBQUNBbUIsZ0JBQVVFLE1BQVYsQ0FBaUIscUJBQWpCLEVBQXdDcEMsR0FBeEMsQ0FBNEMsRUFBQytCLFFBQVEsRUFBVCxFQUE1QztBQUNBRyxnQkFBVUcsV0FBVixDQUFzQixzQkFBdEI7O0FBRUEsV0FBS0MsSUFBTDtBQUNBLFdBQUtDLE1BQUwsQ0FBWTtBQUFBLGVBQVNoRCxNQUFNK0MsSUFBTixFQUFUO0FBQUEsT0FBWjtBQUNBLFdBQUtSLE9BQUwsQ0FBYSxDQUFiLEVBQWdCO0FBQUEsZUFBU3ZDLE1BQU0rQyxJQUFOLEVBQVQ7QUFBQSxPQUFoQjtBQUNEOzs7a0NBRWFoQyxLLEVBQU07QUFDbEIsVUFBRyxLQUFLMkIsTUFBUixFQUFlO0FBQ2IzQixjQUFNaUIsSUFBTixDQUFXLElBQVg7QUFDRDs7QUFFRHpDLFFBQUVDLElBQUYsQ0FBTyxLQUFLcUMsV0FBWixFQUF5QixVQUFDQyxHQUFELEVBQU05QixLQUFOO0FBQUEsZUFBZ0JBLE1BQU1rQixhQUFOLENBQW9CSCxLQUFwQixDQUFoQjtBQUFBLE9BQXpCO0FBQ0Q7Ozt3QkFyRVc7QUFDVixhQUFPLEtBQUtjLFdBQUwsQ0FBaUJvQixNQUFqQixLQUE0QixDQUFuQztBQUNEOzs7d0JBVWM7QUFDYixVQUFNaEIsVUFBVSxFQUFoQjtBQUNBLFdBQUtJLHFCQUFMLENBQTJCSixPQUEzQjtBQUNBLFVBQUdBLFFBQVFnQixNQUFSLEtBQW1CLENBQXRCLEVBQXdCO0FBQ3RCLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQU9oQixRQUFRQSxRQUFRZ0IsTUFBUixHQUFpQixDQUF6QixDQUFQO0FBQ0Q7Ozs7OztrQkFsRGtCNUIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZhMWE5ZDBhMDZjMjBjNmJiNDRiIiwiaW1wb3J0IENhcm91c2VsIGZyb20gJy4vY2xhc3Nlcy9DYXJvdXNlbCdcclxuXHJcbiQoKCkgPT4ge1xyXG4gICQoJy5zZHgtY2Fyb3VzZWwnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCAkZWxlbSA9ICQodGhpcylcclxuICAgIGNvbnN0IGNhcm91c2VsID0gbmV3IENhcm91c2VsKCRlbGVtKVxyXG5cclxuICAgIGNvbnN0IGhlaWdodCA9ICRlbGVtLmF0dHIoJ2RhdGEtaGVpZ2h0JylcclxuICAgIGlmKCFoZWlnaHQpe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhLWhlaWdodCBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQuXCIpXHJcbiAgICB9XHJcbiAgICBjYXJvdXNlbC5oZWlnaHQgPSBoZWlnaHRcclxuXHJcbiAgICBjb25zdCBpbnRlcnZhbCA9ICRlbGVtLmF0dHIoJ2RhdGEtaW50ZXJ2YWwnKVxyXG4gICAgaWYoaW50ZXJ2YWwpe1xyXG4gICAgICBjYXJvdXNlbC5zdGFydChpbnRlcnZhbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNhcm91c2VsLnBhbmVsLmRpc3BsYXkoKVxyXG4gICAgfVxyXG5cclxuICAgICRlbGVtLmRhdGEoJ3NkeENhcm91c2VsJywgY2Fyb3VzZWwpXHJcbiAgfSlcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiLCJpbXBvcnQgUGFuZWwgZnJvbSAnLi9QYW5lbCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcm91c2VsXHJcbntcclxuICBjb25zdHJ1Y3RvcigkZWxlbSkge1xyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2VcclxuICAgIHRoaXMucnVuSW50ZXJ2YWwgPSB1bmRlZmluZWRcclxuICAgIHRoaXMucnVuVGltZW91dEtleSA9IC0xXHJcbiAgICB0aGlzLmN1cnJlbnRMZWFmID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLiRlbGVtID0gJGVsZW1cclxuICAgIHRoaXMuJGVsZW0uY3NzKHtwb3NpdGlvbjogJ3JlbGF0aXZlJ30pXHJcblxyXG4gICAgdGhpcy5wYW5lbCA9IG5ldyBQYW5lbCh0aGlzLCAkZWxlbSlcclxuICB9XHJcblxyXG4gIGdldCBpc1J1bm5pbmcoKXtcclxuICAgIHJldHVybiB0aGlzLnJ1bm5pbmcgJiYgdGhpcy5ydW5JbnRlcnZhbCAhPT0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICBzZXQgaGVpZ2h0KHZhbHVlKXtcclxuICAgIHRoaXMuJGVsZW0uaGVpZ2h0KHZhbHVlKVxyXG4gICAgdGhpcy4kZWxlbS5jc3Moe1xyXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBuZXh0KCl7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5ydW5UaW1lb3V0S2V5KVxyXG5cclxuICAgIHRoaXMucnVuVGltZW91dEtleSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZighdGhpcy5pc1J1bm5pbmcpe1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5sZWFmcy5pbmRleE9mKHRoaXMuY3VycmVudExlYWYpICsgMVxyXG4gICAgICBpZighdGhpcy5sZWFmc1tuZXh0SW5kZXhdKXtcclxuICAgICAgICBuZXh0SW5kZXggPSAwXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sZWFmc1tuZXh0SW5kZXhdLmRpc3BsYXkoKVxyXG5cclxuICAgICAgdGhpcy5uZXh0KClcclxuXHJcbiAgICB9LCB0aGlzLnJ1bkludGVydmFsKVxyXG4gIH1cclxuXHJcbiAgc3RvcCgpe1xyXG4gICAgIHRoaXMucnVubmluZyA9IGZhbHNlXHJcbiAgfVxyXG5cclxuICByZXN0YXJ0KCl7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXHJcbiAgICB0aGlzLm5leHQoKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Op44Kk44OJ44K344On44O844KS44K544K/44O844OI44GV44Gb44KLXHJcbiAgICogQHBhcmFtIHtpbnR9IGludGVydmFsIFxyXG4gICAqL1xyXG4gIHN0YXJ0KGludGVydmFsKXtcclxuICAgIHRoaXMucnVubmluZyA9IHRydWVcclxuICAgIHRoaXMucGFuZWwuZGlzcGxheSgpXHJcbiAgICB0aGlzLnJ1bkludGVydmFsID0gaW50ZXJ2YWxcclxuXHJcbiAgICB0aGlzLmxlYWZzID0gW11cclxuICAgIHRoaXMucGFuZWwuYXNzZW1ibGVMZWFmcyh0aGlzLmxlYWZzKTtcclxuXHJcbiAgICB0aGlzLm5leHQoKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQYW5lbFxyXG57XHJcbiAgY29uc3RydWN0b3IoY2Fyb3VzZWwsICRlbGVtLCBwYXJlbnRQYW5lbCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsXHJcbiAgICB0aGlzLiRlbGVtID0gJGVsZW1cclxuXHJcbiAgICB0aGlzLiRidXR0b25zV3JhcHBlciA9IHRoaXMuJGVsZW0uZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bldyYXBwZXInKVxyXG4gICAgXHJcbiAgICB0aGlzLnBhcmVudFBhbmVsID0gcGFyZW50UGFuZWxcclxuICAgIGlmKHRoaXMucGFyZW50UGFuZWwpe1xyXG4gICAgICB0aGlzLiRlbGVtLmNzcyh7XHJcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJ1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLiRidXR0b24gPSB0aGlzLiRlbGVtLmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1idG4nKVxyXG4gICAgICB0aGlzLnBhcmVudFBhbmVsLmFkZEJ1dHRvbih0aGlzLiRidXR0b24pXHJcbiAgICAgIHRoaXMuJGJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5KClcclxuICAgICAgICBpZih0aGlzLmNhcm91c2VsLmlzUnVubmluZyl7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsLm5leHQoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkUGFuZWxzID0gW11cclxuICAgIHRoaXMuJGVsZW0uZmluZCgnPiAuc2R4LWNhcm91c2VsLXBhbmVsJykuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHMucHVzaChuZXcgUGFuZWwoY2Fyb3VzZWwsICQoZWxlbSksIHRoaXMpKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGdldCBpc0xlYWYoKXtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkUGFuZWxzLmxlbmd0aCA9PT0gMFxyXG4gIH1cclxuXHJcbiAgYXNzZW1ibGVEaXJlY3RQYXJlbnRzKHBhcmVudHMpe1xyXG4gICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50UGFuZWxcclxuICAgIHdoaWxlKHBhcmVudCl7XHJcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpXHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRQYW5lbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHJvb3RQYW5lbCgpe1xyXG4gICAgY29uc3QgcGFyZW50cyA9IFtdXHJcbiAgICB0aGlzLmFzc2VtYmxlRGlyZWN0UGFyZW50cyhwYXJlbnRzKVxyXG4gICAgaWYocGFyZW50cy5sZW5ndGggPT09IDApe1xyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXJlbnRzW3BhcmVudHMubGVuZ3RoIC0gMV1cclxuICB9XHJcblxyXG4gIGFkZEJ1dHRvbigkYnV0dG9uKXtcclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyLmFwcGVuZCgkYnV0dG9uKVxyXG4gIH1cclxuXHJcbiAgYXNjZW5kKGNhbGxiYWNrKXtcclxuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gICAgdGhpcy5hc3NlbWJsZURpcmVjdFBhcmVudHMocGFyZW50cylcclxuICAgICQuZWFjaChwYXJlbnRzLCAoa2V5LCBwYW5lbCkgPT4ge1xyXG4gICAgICBjYWxsYmFjayhwYW5lbClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBkZXNjZW5kKGluZGV4LCBjYWxsYmFjayl7XHJcbiAgICBpZih0aGlzLmNoaWxkUGFuZWxzW2luZGV4XSl7XHJcbiAgICAgIGNhbGxiYWNrKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKVxyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzW2luZGV4XS5kZXNjZW5kKGluZGV4LCBjYWxsYmFjaylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3coKXtcclxuICAgIHRoaXMuJGVsZW0uY3NzKHt6SW5kZXg6IDF9KVxyXG4gICAgdGhpcy4kZWxlbS5hZGRDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgaWYodGhpcy4kYnV0dG9uKXtcclxuICAgICAgdGhpcy4kYnV0dG9uLmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICB0aGlzLmNhcm91c2VsLmN1cnJlbnRMZWFmID0gdGhpcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc3BsYXkoKXtcclxuICAgIGNvbnN0ICRjdXJyZW50cyA9IHRoaXMucm9vdFBhbmVsLiRlbGVtLmZpbmQoJy5zZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICAkY3VycmVudHMuZmlsdGVyKCcuc2R4LWNhcm91c2VsLXBhbmVsJykuY3NzKHt6SW5kZXg6ICcnfSlcclxuICAgICRjdXJyZW50cy5yZW1vdmVDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG5cclxuICAgIHRoaXMuc2hvdygpXHJcbiAgICB0aGlzLmFzY2VuZChwYW5lbCA9PiBwYW5lbC5zaG93KCkpXHJcbiAgICB0aGlzLmRlc2NlbmQoMCwgcGFuZWwgPT4gcGFuZWwuc2hvdygpKVxyXG4gIH1cclxuXHJcbiAgYXNzZW1ibGVMZWFmcyhsZWFmcyl7XHJcbiAgICBpZih0aGlzLmlzTGVhZil7XHJcbiAgICAgIGxlYWZzLnB1c2godGhpcylcclxuICAgIH1cclxuXHJcbiAgICAkLmVhY2godGhpcy5jaGlsZFBhbmVscywgKGtleSwgcGFuZWwpID0+IHBhbmVsLmFzc2VtYmxlTGVhZnMobGVhZnMpKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvUGFuZWwuanMiXSwic291cmNlUm9vdCI6IiJ9