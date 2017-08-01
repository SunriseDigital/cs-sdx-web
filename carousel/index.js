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
    carousel.run(1000);
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
    this.$elem.css({ position: 'relative' });

    this.panel = new _Panel2.default($elem);
    this.panel.display();
  }

  _createClass(Carousel, [{
    key: 'run',
    value: function run() {
      console.log();
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
  function Panel($elem, parentPanel) {
    var _this = this;

    _classCallCheck(this, Panel);

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
      });
    }

    this.childPanels = [];
    this.$elem.find('> .sdx-carousel-panel').each(function (key, elem) {
      _this.childPanels.push(new Panel($(elem), _this));
    });
  }

  _createClass(Panel, [{
    key: 'addButton',
    value: function addButton($button) {
      this.$buttonsWrapper.append($button);
    }
  }, {
    key: 'rise',
    value: function rise(callback) {
      callback(this);
      $.each(this.parents, function (key, panel) {
        callback(panel);
      });
    }
  }, {
    key: 'cascade',
    value: function cascade(callback) {
      callback(this);
      $.each(this.childPanels, function (key, panel) {
        panel.cascade(callback);
      });
    }
  }, {
    key: 'fall',
    value: function fall(index, callback) {
      if (this.childPanels[index]) {
        callback(this.childPanels[index]);
        this.childPanels[index].fall(index, callback);
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.$elem.css({ zIndex: -1 });
      if (this.$button) {
        this.$button.removeClass('sdx-carousel-current');
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this.$elem.css({ zIndex: 1 });
      if (this.$button) {
        this.$button.addClass('sdx-carousel-current');
      }
    }
  }, {
    key: 'display',
    value: function display() {
      this.rootPanel.cascade(function (panel) {
        return panel.hide();
      });
      this.rise(function (panel) {
        return panel.show();
      });
      this.fall(0, function (panel) {
        return panel.show();
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWQ3OGZjMGU4NzYxOGRlMGEwNjUiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9QYW5lbC5qcyJdLCJuYW1lcyI6WyIkIiwiZWFjaCIsIiRlbGVtIiwiY2Fyb3VzZWwiLCJoZWlnaHQiLCJhdHRyIiwicnVuIiwiQ2Fyb3VzZWwiLCJjc3MiLCJwb3NpdGlvbiIsInBhbmVsIiwiZGlzcGxheSIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsIm92ZXJmbG93IiwiUGFuZWwiLCJwYXJlbnRQYW5lbCIsIiRidXR0b25zV3JhcHBlciIsImZpbmQiLCJ3aWR0aCIsIiRidXR0b24iLCJhZGRCdXR0b24iLCJvbiIsImNoaWxkUGFuZWxzIiwia2V5IiwiZWxlbSIsInB1c2giLCJhcHBlbmQiLCJjYWxsYmFjayIsInBhcmVudHMiLCJjYXNjYWRlIiwiaW5kZXgiLCJmYWxsIiwiekluZGV4IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInJvb3RQYW5lbCIsImhpZGUiLCJyaXNlIiwic2hvdyIsInBhcmVudCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7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ZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5ZDc4ZmMwZTg3NjE4ZGUwYTA2NSIsImltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2NsYXNzZXMvQ2Fyb3VzZWwnXHJcblxyXG4kKCgpID0+IHtcclxuICAkKCcuc2R4LWNhcm91c2VsJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgJGVsZW0gPSAkKHRoaXMpXHJcbiAgICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCgkZWxlbSlcclxuICAgIGNhcm91c2VsLmhlaWdodCA9ICRlbGVtLmF0dHIoJ2RhdGEtaGVpZ2h0JylcclxuICAgIGNhcm91c2VsLnJ1bigxMDAwKTtcclxuICB9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBQYW5lbCBmcm9tICcuL1BhbmVsJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRlbGVtKSB7XHJcbiAgICB0aGlzLiRlbGVtID0gJGVsZW1cclxuICAgIHRoaXMuJGVsZW0uY3NzKHtwb3NpdGlvbjogJ3JlbGF0aXZlJ30pXHJcblxyXG4gICAgdGhpcy5wYW5lbCA9IG5ldyBQYW5lbCgkZWxlbSlcclxuICAgIHRoaXMucGFuZWwuZGlzcGxheSgpXHJcbiAgfVxyXG5cclxuICBzZXQgaGVpZ2h0KHZhbHVlKXtcclxuICAgIHRoaXMuJGVsZW0uaGVpZ2h0KHZhbHVlKVxyXG4gICAgdGhpcy4kZWxlbS5jc3Moe1xyXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBydW4oKXtcclxuICAgIGNvbnNvbGUubG9nKClcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jbGFzc2VzL0Nhcm91c2VsLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRlbGVtLCBwYXJlbnRQYW5lbCkge1xyXG4gICAgdGhpcy4kZWxlbSA9ICRlbGVtXHJcblxyXG4gICAgdGhpcy4kYnV0dG9uc1dyYXBwZXIgPSB0aGlzLiRlbGVtLmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1idG5XcmFwcGVyJylcclxuICAgIFxyXG4gICAgdGhpcy5wYXJlbnRQYW5lbCA9IHBhcmVudFBhbmVsXHJcbiAgICBpZih0aGlzLnBhcmVudFBhbmVsKXtcclxuICAgICAgdGhpcy4kZWxlbS5jc3Moe1xyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwJSdcclxuICAgICAgfSlcclxuICAgICAgdGhpcy4kYnV0dG9uID0gdGhpcy4kZWxlbS5maW5kKCc+IC5zZHgtY2Fyb3VzZWwtYnRuJylcclxuICAgICAgdGhpcy5wYXJlbnRQYW5lbC5hZGRCdXR0b24odGhpcy4kYnV0dG9uKVxyXG4gICAgICB0aGlzLiRidXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheSgpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGlsZFBhbmVscyA9IFtdXHJcbiAgICB0aGlzLiRlbGVtLmZpbmQoJz4gLnNkeC1jYXJvdXNlbC1wYW5lbCcpLmVhY2goKGtleSwgZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLmNoaWxkUGFuZWxzLnB1c2gobmV3IFBhbmVsKCQoZWxlbSksIHRoaXMpKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGdldCBwYXJlbnRzKCl7XHJcbiAgICBjb25zdCBwYXJlbnRzID0gW11cclxuICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudFBhbmVsXHJcbiAgICB3aGlsZShwYXJlbnQpe1xyXG4gICAgICBwYXJlbnRzLnB1c2gocGFyZW50KVxyXG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50UGFuZWxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50c1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJvb3RQYW5lbCgpe1xyXG4gICAgY29uc3QgcGFyZW50cyA9IHRoaXMucGFyZW50c1xyXG4gICAgaWYocGFyZW50cy5sZW5ndGggPT09IDApe1xyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXJlbnRzW3BhcmVudHMubGVuZ3RoIC0gMV1cclxuICB9XHJcblxyXG4gIGFkZEJ1dHRvbigkYnV0dG9uKXtcclxuICAgIHRoaXMuJGJ1dHRvbnNXcmFwcGVyLmFwcGVuZCgkYnV0dG9uKVxyXG4gIH1cclxuXHJcbiAgcmlzZShjYWxsYmFjayl7XHJcbiAgICBjYWxsYmFjayh0aGlzKVxyXG4gICAgJC5lYWNoKHRoaXMucGFyZW50cywgKGtleSwgcGFuZWwpID0+IHtcclxuICAgICAgY2FsbGJhY2socGFuZWwpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY2FzY2FkZShjYWxsYmFjayl7XHJcbiAgICBjYWxsYmFjayh0aGlzKVxyXG4gICAgJC5lYWNoKHRoaXMuY2hpbGRQYW5lbHMsIChrZXksIHBhbmVsKSA9PiB7XHJcbiAgICAgIHBhbmVsLmNhc2NhZGUoY2FsbGJhY2spXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmFsbChpbmRleCwgY2FsbGJhY2spe1xyXG4gICAgaWYodGhpcy5jaGlsZFBhbmVsc1tpbmRleF0pe1xyXG4gICAgICBjYWxsYmFjayh0aGlzLmNoaWxkUGFuZWxzW2luZGV4XSlcclxuICAgICAgdGhpcy5jaGlsZFBhbmVsc1tpbmRleF0uZmFsbChpbmRleCwgY2FsbGJhY2spXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCl7XHJcbiAgICB0aGlzLiRlbGVtLmNzcyh7ekluZGV4OiAtMX0pXHJcbiAgICBpZih0aGlzLiRidXR0b24pe1xyXG4gICAgICB0aGlzLiRidXR0b24ucmVtb3ZlQ2xhc3MoJ3NkeC1jYXJvdXNlbC1jdXJyZW50JylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3coKXtcclxuICAgIHRoaXMuJGVsZW0uY3NzKHt6SW5kZXg6IDF9KVxyXG4gICAgaWYodGhpcy4kYnV0dG9uKXtcclxuICAgICAgdGhpcy4kYnV0dG9uLmFkZENsYXNzKCdzZHgtY2Fyb3VzZWwtY3VycmVudCcpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCl7XHJcbiAgICB0aGlzLnJvb3RQYW5lbC5jYXNjYWRlKHBhbmVsID0+IHBhbmVsLmhpZGUoKSlcclxuICAgIHRoaXMucmlzZShwYW5lbCA9PiBwYW5lbC5zaG93KCkpXHJcbiAgICB0aGlzLmZhbGwoMCwgcGFuZWwgPT4gcGFuZWwuc2hvdygpKVxyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NsYXNzZXMvUGFuZWwuanMiXSwic291cmNlUm9vdCI6IiJ9