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

    this._running = false;
    this._runInterval = undefined;
    this._runTimeoutKey = -1;
    this._currentLeaf = undefined;

    this.$element = $elem;
    this.$element.css({ position: 'relative' });
    this.panel = new _Panel2.default(this, $elem);
  }

  _createClass(Carousel, [{
    key: '_next',
    value: function _next() {
      var _this = this;

      clearTimeout(this._runTimeoutKey);

      this._runTimeoutKey = setTimeout(function () {
        if (!_this.isRunning) {
          return;
        }

        var nextIndex = _this.leafs.indexOf(_this._currentLeaf) + 1;
        if (!_this.leafs[nextIndex]) {
          nextIndex = 0;
        }
        _this.leafs[nextIndex].display();

        _this._next();
      }, this._runInterval);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._running = false;
    }
  }, {
    key: 'restart',
    value: function restart() {
      this._running = true;
      this._next();
    }

    /**
     * スライドショーをスタートさせる
     * @param {int} interval 
     */

  }, {
    key: 'start',
    value: function start(interval) {
      this._running = true;
      this.panel.display();
      this._runInterval = interval;

      this.leafs = [];
      this.panel.assembleLeafs(this.leafs);

      this._next();
    }
  }, {
    key: 'isRunning',
    get: function get() {
      return this._running && this._runInterval !== undefined;
    }
  }, {
    key: 'height',
    set: function set(value) {
      this.$element.height(value);
      this.$element.css({
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
    this.$element = $elem;

    this.$buttonsWrapper = this.$element.find('> .sdx-carousel-btnWrapper');

    this.parentPanel = parentPanel;
    if (this.parentPanel) {
      this.$element.css({
        position: 'absolute',
        width: '100%'
      });
      this.$button = this.$element.find('> .sdx-carousel-btn');
      this.parentPanel._addButton(this.$button);
      this.$button.on('click', function () {
        _this.display();
        if (_this.carousel.isRunning) {
          _this.carousel._next();
        }
      });
    }

    this.childPanels = [];
    this.$element.find('> .sdx-carousel-panel').each(function (key, elem) {
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
    key: '_addButton',
    value: function _addButton($button) {
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
      var $currents = this.rootPanel.$element.find('.sdx-carousel-current');
      $currents.filter('.sdx-carousel-panel').css({ zIndex: '' });
      $currents.removeClass('sdx-carousel-current');

      this._show();
      this.ascend(function (panel) {
        return panel._show();
      });
      this.descend(0, function (panel) {
        return panel._show();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTEzYTRhZDIxMTBlOGEzZDc4YzMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJoZWlnaHQiLCJhdHRyIiwiRXJyb3IiLCJpbnRlcnZhbCIsInN0YXJ0IiwicGFuZWwiLCJkaXNwbGF5IiwiZGF0YSIsIkNhcm91c2VsIiwiX3J1bm5pbmciLCJfcnVuSW50ZXJ2YWwiLCJ1bmRlZmluZWQiLCJfcnVuVGltZW91dEtleSIsIl9jdXJyZW50TGVhZiIsIiRlbGVtZW50IiwiY3NzIiwicG9zaXRpb24iLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaXNSdW5uaW5nIiwibmV4dEluZGV4IiwibGVhZnMiLCJpbmRleE9mIiwiX25leHQiLCJhc3NlbWJsZUxlYWZzIiwidmFsdWUiLCJvdmVyZmxvdyIsIlBhbmVsIiwicGFyZW50UGFuZWwiLCIkYnV0dG9uc1dyYXBwZXIiLCJmaW5kIiwid2lkdGgiLCIkYnV0dG9uIiwiX2FkZEJ1dHRvbiIsIm9uIiwiY2hpbGRQYW5lbHMiLCJrZXkiLCJlbGVtIiwicHVzaCIsInBhcmVudHMiLCJwYXJlbnQiLCJhcHBlbmQiLCJjYWxsYmFjayIsImFzc2VtYmxlRGlyZWN0UGFyZW50cyIsImluZGV4IiwiZGVzY2VuZCIsInpJbmRleCIsImFkZENsYXNzIiwiaXNMZWFmIiwiJGN1cnJlbnRzIiwicm9vdFBhbmVsIiwiZmlsdGVyIiwicmVtb3ZlQ2xhc3MiLCJfc2hvdyIsImFzY2VuZCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFFQUEsRUFBRSxZQUFNO0FBQ05BLElBQUUsZUFBRixFQUFtQkMsSUFBbkIsQ0FBd0IsWUFBVTtBQUNoQyxRQUFNQyxRQUFRRixFQUFFLElBQUYsQ0FBZDtBQUNBLFFBQU1HLFdBQVcsdUJBQWFELEtBQWIsQ0FBakI7O0FBRUEsUUFBTUUsU0FBU0YsTUFBTUcsSUFBTixDQUFXLGFBQVgsQ0FBZjtBQUNBLFFBQUcsQ0FBQ0QsTUFBSixFQUFXO0FBQ1QsWUFBTSxJQUFJRSxLQUFKLENBQVUsb0NBQVYsQ0FBTjtBQUNEO0FBQ0RILGFBQVNDLE1BQVQsR0FBa0JBLE1BQWxCOztBQUVBLFFBQU1HLFdBQVdMLE1BQU1HLElBQU4sQ0FBVyxlQUFYLENBQWpCO0FBQ0EsUUFBR0UsUUFBSCxFQUFZO0FBQ1ZKLGVBQVNLLEtBQVQsQ0FBZUQsUUFBZjtBQUNELEtBRkQsTUFFTztBQUNMSixlQUFTTSxLQUFULENBQWVDLE9BQWY7QUFDRDs7QUFFRFIsVUFBTVMsSUFBTixDQUFXLGFBQVgsRUFBMEJSLFFBQTFCO0FBQ0QsR0FsQkQ7QUFtQkQsQ0FwQkQsRTs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7Ozs7Ozs7O0lBR3FCUyxRO0FBRW5CLG9CQUFZVixLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLFNBQUtXLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CQyxTQUFwQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsQ0FBQyxDQUF2QjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JGLFNBQXBCOztBQUVBLFNBQUtHLFFBQUwsR0FBZ0JoQixLQUFoQjtBQUNBLFNBQUtnQixRQUFMLENBQWNDLEdBQWQsQ0FBa0IsRUFBQ0MsVUFBVSxVQUFYLEVBQWxCO0FBQ0EsU0FBS1gsS0FBTCxHQUFhLG9CQUFVLElBQVYsRUFBZ0JQLEtBQWhCLENBQWI7QUFDRDs7Ozs0QkFhTTtBQUFBOztBQUNMbUIsbUJBQWEsS0FBS0wsY0FBbEI7O0FBRUEsV0FBS0EsY0FBTCxHQUFzQk0sV0FBVyxZQUFNO0FBQ3JDLFlBQUcsQ0FBQyxNQUFLQyxTQUFULEVBQW1CO0FBQ2pCO0FBQ0Q7O0FBRUQsWUFBSUMsWUFBWSxNQUFLQyxLQUFMLENBQVdDLE9BQVgsQ0FBbUIsTUFBS1QsWUFBeEIsSUFBd0MsQ0FBeEQ7QUFDQSxZQUFHLENBQUMsTUFBS1EsS0FBTCxDQUFXRCxTQUFYLENBQUosRUFBMEI7QUFDeEJBLHNCQUFZLENBQVo7QUFDRDtBQUNELGNBQUtDLEtBQUwsQ0FBV0QsU0FBWCxFQUFzQmQsT0FBdEI7O0FBRUEsY0FBS2lCLEtBQUw7QUFFRCxPQWJxQixFQWFuQixLQUFLYixZQWJjLENBQXRCO0FBY0Q7OzsyQkFFSztBQUNILFdBQUtELFFBQUwsR0FBZ0IsS0FBaEI7QUFDRjs7OzhCQUVRO0FBQ1AsV0FBS0EsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFdBQUtjLEtBQUw7QUFDRDs7QUFFRDs7Ozs7OzswQkFJTXBCLFEsRUFBUztBQUNiLFdBQUtNLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLSixLQUFMLENBQVdDLE9BQVg7QUFDQSxXQUFLSSxZQUFMLEdBQW9CUCxRQUFwQjs7QUFFQSxXQUFLa0IsS0FBTCxHQUFhLEVBQWI7QUFDQSxXQUFLaEIsS0FBTCxDQUFXbUIsYUFBWCxDQUF5QixLQUFLSCxLQUE5Qjs7QUFFQSxXQUFLRSxLQUFMO0FBQ0Q7Ozt3QkFwRGM7QUFDYixhQUFPLEtBQUtkLFFBQUwsSUFBaUIsS0FBS0MsWUFBTCxLQUFzQkMsU0FBOUM7QUFDRDs7O3NCQUVVYyxLLEVBQU07QUFDZixXQUFLWCxRQUFMLENBQWNkLE1BQWQsQ0FBcUJ5QixLQUFyQjtBQUNBLFdBQUtYLFFBQUwsQ0FBY0MsR0FBZCxDQUFrQjtBQUNoQlcsa0JBQVU7QUFETSxPQUFsQjtBQUdEOzs7Ozs7a0JBdEJrQmxCLFE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDSEFtQixLO0FBRW5CLGlCQUFZNUIsUUFBWixFQUFzQkQsS0FBdEIsRUFBNkI4QixXQUE3QixFQUEwQztBQUFBOztBQUFBOztBQUN4QyxTQUFLN0IsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLZSxRQUFMLEdBQWdCaEIsS0FBaEI7O0FBRUEsU0FBSytCLGVBQUwsR0FBdUIsS0FBS2YsUUFBTCxDQUFjZ0IsSUFBZCxDQUFtQiw0QkFBbkIsQ0FBdkI7O0FBRUEsU0FBS0YsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxRQUFHLEtBQUtBLFdBQVIsRUFBb0I7QUFDbEIsV0FBS2QsUUFBTCxDQUFjQyxHQUFkLENBQWtCO0FBQ2hCQyxrQkFBVSxVQURNO0FBRWhCZSxlQUFPO0FBRlMsT0FBbEI7QUFJQSxXQUFLQyxPQUFMLEdBQWUsS0FBS2xCLFFBQUwsQ0FBY2dCLElBQWQsQ0FBbUIscUJBQW5CLENBQWY7QUFDQSxXQUFLRixXQUFMLENBQWlCSyxVQUFqQixDQUE0QixLQUFLRCxPQUFqQztBQUNBLFdBQUtBLE9BQUwsQ0FBYUUsRUFBYixDQUFnQixPQUFoQixFQUF5QixZQUFNO0FBQzdCLGNBQUs1QixPQUFMO0FBQ0EsWUFBRyxNQUFLUCxRQUFMLENBQWNvQixTQUFqQixFQUEyQjtBQUN6QixnQkFBS3BCLFFBQUwsQ0FBY3dCLEtBQWQ7QUFDRDtBQUNGLE9BTEQ7QUFNRDs7QUFFRCxTQUFLWSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBS3JCLFFBQUwsQ0FBY2dCLElBQWQsQ0FBbUIsdUJBQW5CLEVBQTRDakMsSUFBNUMsQ0FBaUQsVUFBQ3VDLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQzlELFlBQUtGLFdBQUwsQ0FBaUJHLElBQWpCLENBQXNCLElBQUlYLEtBQUosQ0FBVTVCLFFBQVYsRUFBb0JILEVBQUV5QyxJQUFGLENBQXBCLFFBQXRCO0FBQ0QsS0FGRDtBQUdEOzs7OzBDQU1xQkUsTyxFQUFRO0FBQzVCLFVBQUlDLFNBQVMsS0FBS1osV0FBbEI7QUFDQSxhQUFNWSxNQUFOLEVBQWE7QUFDWEQsZ0JBQVFELElBQVIsQ0FBYUUsTUFBYjtBQUNBQSxpQkFBU0EsT0FBT1osV0FBaEI7QUFDRDtBQUNGOzs7K0JBWVVJLE8sRUFBUTtBQUNqQixXQUFLSCxlQUFMLENBQXFCWSxNQUFyQixDQUE0QlQsT0FBNUI7QUFDRDs7OzJCQUVNVSxRLEVBQVM7QUFDZCxVQUFNSCxVQUFVLEVBQWhCO0FBQ0EsV0FBS0kscUJBQUwsQ0FBMkJKLE9BQTNCO0FBQ0EzQyxRQUFFQyxJQUFGLENBQU8wQyxPQUFQLEVBQWdCLFVBQUNILEdBQUQsRUFBTS9CLEtBQU4sRUFBZ0I7QUFDOUJxQyxpQkFBU3JDLEtBQVQ7QUFDRCxPQUZEO0FBR0Q7Ozs0QkFFT3VDLEssRUFBT0YsUSxFQUFTO0FBQ3RCLFVBQUcsS0FBS1AsV0FBTCxDQUFpQlMsS0FBakIsQ0FBSCxFQUEyQjtBQUN6QkYsaUJBQVMsS0FBS1AsV0FBTCxDQUFpQlMsS0FBakIsQ0FBVDtBQUNBLGFBQUtULFdBQUwsQ0FBaUJTLEtBQWpCLEVBQXdCQyxPQUF4QixDQUFnQ0QsS0FBaEMsRUFBdUNGLFFBQXZDO0FBQ0Q7QUFDRjs7OzRCQUVNO0FBQ0wsV0FBSzVCLFFBQUwsQ0FBY0MsR0FBZCxDQUFrQixFQUFDK0IsUUFBUSxDQUFULEVBQWxCO0FBQ0EsV0FBS2hDLFFBQUwsQ0FBY2lDLFFBQWQsQ0FBdUIsc0JBQXZCO0FBQ0EsVUFBRyxLQUFLZixPQUFSLEVBQWdCO0FBQ2QsYUFBS0EsT0FBTCxDQUFhZSxRQUFiLENBQXNCLHNCQUF0QjtBQUNEOztBQUVELFVBQUcsS0FBS0MsTUFBUixFQUFlO0FBQ2IsYUFBS2pELFFBQUwsQ0FBY2MsWUFBZCxHQUE2QixJQUE3QjtBQUNEO0FBQ0Y7Ozs4QkFFUTtBQUNQLFVBQU1vQyxZQUFZLEtBQUtDLFNBQUwsQ0FBZXBDLFFBQWYsQ0FBd0JnQixJQUF4QixDQUE2Qix1QkFBN0IsQ0FBbEI7QUFDQW1CLGdCQUFVRSxNQUFWLENBQWlCLHFCQUFqQixFQUF3Q3BDLEdBQXhDLENBQTRDLEVBQUMrQixRQUFRLEVBQVQsRUFBNUM7QUFDQUcsZ0JBQVVHLFdBQVYsQ0FBc0Isc0JBQXRCOztBQUVBLFdBQUtDLEtBQUw7QUFDQSxXQUFLQyxNQUFMLENBQVk7QUFBQSxlQUFTakQsTUFBTWdELEtBQU4sRUFBVDtBQUFBLE9BQVo7QUFDQSxXQUFLUixPQUFMLENBQWEsQ0FBYixFQUFnQjtBQUFBLGVBQVN4QyxNQUFNZ0QsS0FBTixFQUFUO0FBQUEsT0FBaEI7QUFDRDs7O2tDQUVhaEMsSyxFQUFNO0FBQ2xCLFVBQUcsS0FBSzJCLE1BQVIsRUFBZTtBQUNiM0IsY0FBTWlCLElBQU4sQ0FBVyxJQUFYO0FBQ0Q7O0FBRUQxQyxRQUFFQyxJQUFGLENBQU8sS0FBS3NDLFdBQVosRUFBeUIsVUFBQ0MsR0FBRCxFQUFNL0IsS0FBTjtBQUFBLGVBQWdCQSxNQUFNbUIsYUFBTixDQUFvQkgsS0FBcEIsQ0FBaEI7QUFBQSxPQUF6QjtBQUNEOzs7d0JBckVXO0FBQ1YsYUFBTyxLQUFLYyxXQUFMLENBQWlCb0IsTUFBakIsS0FBNEIsQ0FBbkM7QUFDRDs7O3dCQVVjO0FBQ2IsVUFBTWhCLFVBQVUsRUFBaEI7QUFDQSxXQUFLSSxxQkFBTCxDQUEyQkosT0FBM0I7QUFDQSxVQUFHQSxRQUFRZ0IsTUFBUixLQUFtQixDQUF0QixFQUF3QjtBQUN0QixlQUFPLElBQVA7QUFDRDs7QUFFRCxhQUFPaEIsUUFBUUEsUUFBUWdCLE1BQVIsR0FBaUIsQ0FBekIsQ0FBUDtBQUNEOzs7Ozs7a0JBbERrQjVCLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMTNhNGFkMjExMGU4YTNkNzhjMyIsImltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2NsYXNzZXMvQ2Fyb3VzZWwnXHJcblxyXG4kKCgpID0+IHtcclxuICAkKCcuc2R4LWNhcm91c2VsJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgJGVsZW0gPSAkKHRoaXMpXHJcbiAgICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCgkZWxlbSlcclxuXHJcbiAgICBjb25zdCBoZWlnaHQgPSAkZWxlbS5hdHRyKCdkYXRhLWhlaWdodCcpXHJcbiAgICBpZighaGVpZ2h0KXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YS1oZWlnaHQgYXR0cmlidXRlIGlzIHJlcXVpcmVkLlwiKVxyXG4gICAgfVxyXG4gICAgY2Fyb3VzZWwuaGVpZ2h0ID0gaGVpZ2h0XHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAkZWxlbS5hdHRyKCdkYXRhLWludGVydmFsJylcclxuICAgIGlmKGludGVydmFsKXtcclxuICAgICAgY2Fyb3VzZWwuc3RhcnQoaW50ZXJ2YWwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYXJvdXNlbC5wYW5lbC5kaXNwbGF5KClcclxuICAgIH1cclxuXHJcbiAgICAkZWxlbS5kYXRhKCdzZHhDYXJvdXNlbCcsIGNhcm91c2VsKVxyXG4gIH0pXHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IFBhbmVsIGZyb20gJy4vUGFuZWwnXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRlbGVtKSB7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2VcclxuICAgIHRoaXMuX3J1bkludGVydmFsID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLl9ydW5UaW1lb3V0S2V5ID0gLTFcclxuICAgIHRoaXMuX2N1cnJlbnRMZWFmID0gdW5kZWZpbmVkXHJcblxyXG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtXHJcbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7cG9zaXRpb246ICdyZWxhdGl2ZSd9KVxyXG4gICAgdGhpcy5wYW5lbCA9IG5ldyBQYW5lbCh0aGlzLCAkZWxlbSlcclxuICB9XHJcblxyXG4gIGdldCBpc1J1bm5pbmcoKXtcclxuICAgIHJldHVybiB0aGlzLl9ydW5uaW5nICYmIHRoaXMuX3J1bkludGVydmFsICE9PSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIHNldCBoZWlnaHQodmFsdWUpe1xyXG4gICAgdGhpcy4kZWxlbWVudC5oZWlnaHQodmFsdWUpXHJcbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XHJcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIF9uZXh0KCl7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fcnVuVGltZW91dEtleSlcclxuXHJcbiAgICB0aGlzLl9ydW5UaW1lb3V0S2V5ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmKCF0aGlzLmlzUnVubmluZyl7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLmxlYWZzLmluZGV4T2YodGhpcy5fY3VycmVudExlYWYpICsgMVxyXG4gICAgICBpZighdGhpcy5sZWFmc1tuZXh0SW5kZXhdKXtcclxuICAgICAgICBuZXh0SW5kZXggPSAwXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sZWFmc1tuZXh0SW5kZXhdLmRpc3BsYXkoKVxyXG5cclxuICAgICAgdGhpcy5fbmV4dCgpXHJcblxyXG4gICAgfSwgdGhpcy5fcnVuSW50ZXJ2YWwpXHJcbiAgfVxyXG5cclxuICBzdG9wKCl7XHJcbiAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlXHJcbiAgfVxyXG5cclxuICByZXN0YXJ0KCl7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjg6njgqTjg4njgrfjg6fjg7zjgpLjgrnjgr/jg7zjg4jjgZXjgZvjgotcclxuICAgKiBAcGFyYW0ge2ludH0gaW50ZXJ2YWwgXHJcbiAgICovXHJcbiAgc3RhcnQoaW50ZXJ2YWwpe1xyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWVcclxuICAgIHRoaXMucGFuZWwuZGlzcGxheSgpXHJcbiAgICB0aGlzLl9ydW5JbnRlcnZhbCA9IGludGVydmFsXHJcblxyXG4gICAgdGhpcy5sZWFmcyA9IFtdXHJcbiAgICB0aGlzLnBhbmVsLmFzc2VtYmxlTGVhZnModGhpcy5sZWFmcyk7XHJcblxyXG4gICAgdGhpcy5fbmV4dCgpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2xhc3Nlcy9DYXJvdXNlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsXHJcbntcclxuICBjb25zdHJ1Y3RvcihjYXJvdXNlbCwgJGVsZW0sIHBhcmVudFBhbmVsKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsID0gY2Fyb3VzZWxcclxuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbVxyXG5cclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyID0gdGhpcy4kZWxlbWVudC5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuV3JhcHBlcicpXHJcbiAgICBcclxuICAgIHRoaXMucGFyZW50UGFuZWwgPSBwYXJlbnRQYW5lbFxyXG4gICAgaWYodGhpcy5wYXJlbnRQYW5lbCl7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcclxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICB3aWR0aDogJzEwMCUnXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuJGJ1dHRvbiA9IHRoaXMuJGVsZW1lbnQuZmluZCgnPiAuc2R4LWNhcm91c2VsLWJ0bicpXHJcbiAgICAgIHRoaXMucGFyZW50UGFuZWwuX2FkZEJ1dHRvbih0aGlzLiRidXR0b24pXHJcbiAgICAgIHRoaXMuJGJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5KClcclxuICAgICAgICBpZih0aGlzLmNhcm91c2VsLmlzUnVubmluZyl7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsLl9uZXh0KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGlsZFBhbmVscyA9IFtdXHJcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1wYW5lbCcpLmVhY2goKGtleSwgZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzLnB1c2gobmV3IFBhbmVsKGNhcm91c2VsLCAkKGVsZW0pLCB0aGlzKSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBnZXQgaXNMZWFmKCl7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZFBhbmVscy5sZW5ndGggPT09IDBcclxuICB9XHJcblxyXG4gIGFzc2VtYmxlRGlyZWN0UGFyZW50cyhwYXJlbnRzKXtcclxuICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudFBhbmVsXHJcbiAgICB3aGlsZShwYXJlbnQpe1xyXG4gICAgICBwYXJlbnRzLnB1c2gocGFyZW50KVxyXG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50UGFuZWxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCByb290UGFuZWwoKXtcclxuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gICAgdGhpcy5hc3NlbWJsZURpcmVjdFBhcmVudHMocGFyZW50cylcclxuICAgIGlmKHBhcmVudHMubGVuZ3RoID09PSAwKXtcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdXHJcbiAgfVxyXG5cclxuICBfYWRkQnV0dG9uKCRidXR0b24pe1xyXG4gICAgdGhpcy4kYnV0dG9uc1dyYXBwZXIuYXBwZW5kKCRidXR0b24pXHJcbiAgfVxyXG5cclxuICBhc2NlbmQoY2FsbGJhY2spe1xyXG4gICAgY29uc3QgcGFyZW50cyA9IFtdXHJcbiAgICB0aGlzLmFzc2VtYmxlRGlyZWN0UGFyZW50cyhwYXJlbnRzKVxyXG4gICAgJC5lYWNoKHBhcmVudHMsIChrZXksIHBhbmVsKSA9PiB7XHJcbiAgICAgIGNhbGxiYWNrKHBhbmVsKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKXtcclxuICAgIGlmKHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdKXtcclxuICAgICAgY2FsbGJhY2sodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pXHJcbiAgICAgIHRoaXMuY2hpbGRQYW5lbHNbaW5kZXhdLmRlc2NlbmQoaW5kZXgsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Nob3coKXtcclxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHt6SW5kZXg6IDF9KVxyXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgaWYodGhpcy4kYnV0dG9uKXtcclxuICAgICAgdGhpcy4kYnV0dG9uLmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICB0aGlzLmNhcm91c2VsLl9jdXJyZW50TGVhZiA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICBjb25zdCAkY3VycmVudHMgPSB0aGlzLnJvb3RQYW5lbC4kZWxlbWVudC5maW5kKCcuc2R4LWNhcm91c2VsLWN1cnJlbnQnKVxyXG4gICAgJGN1cnJlbnRzLmZpbHRlcignLnNkeC1jYXJvdXNlbC1wYW5lbCcpLmNzcyh7ekluZGV4OiAnJ30pXHJcbiAgICAkY3VycmVudHMucmVtb3ZlQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuXHJcbiAgICB0aGlzLl9zaG93KClcclxuICAgIHRoaXMuYXNjZW5kKHBhbmVsID0+IHBhbmVsLl9zaG93KCkpXHJcbiAgICB0aGlzLmRlc2NlbmQoMCwgcGFuZWwgPT4gcGFuZWwuX3Nob3coKSlcclxuICB9XHJcblxyXG4gIGFzc2VtYmxlTGVhZnMobGVhZnMpe1xyXG4gICAgaWYodGhpcy5pc0xlYWYpe1xyXG4gICAgICBsZWFmcy5wdXNoKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgJC5lYWNoKHRoaXMuY2hpbGRQYW5lbHMsIChrZXksIHBhbmVsKSA9PiBwYW5lbC5hc3NlbWJsZUxlYWZzKGxlYWZzKSlcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL1BhbmVsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==