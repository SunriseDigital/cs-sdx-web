/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(6);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _jumpMenu = __webpack_require__(2);
	
	var _jumpMenu2 = _interopRequireDefault(_jumpMenu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(function () {
	  $(".sdx-scaffold-list .group-selector").jumpMenu();
	}); //Grouping時のジャンプメニュー

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	$.fn.extend({
	  jumpMenu: function jumpMenu() {
	    this.each(function () {
	      var $selector = $(this);
	      $selector.on("change", function (e) {
	        var value = $selector.val();
	        var name = $selector.attr('name');
	
	        var exists = false;
	        var queries = [];
	        location.search.substr(1).split('&').forEach(function (keyValue) {
	          if (keyValue) {
	            var arr = keyValue.split('=');
	            if (arr[0] == name) {
	              if (value) queries.push(name + '=' + value);
	              exists = true;
	            } else {
	              queries.push(arr.join('='));
	            }
	          }
	        });
	
	        if (!exists && value) {
	          queries.push(name + '=' + value);
	        }
	
	        location.href = location.pathname + (queries.length ? "?" + queries.join('&') : "") + location.hash;
	      });
	    });
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	$(function () {
	  var deleteMessage = $('input[type=hidden][name=DeleteMessage]').val();
	  $(".sdx-scaffold-list .btn.delete").on('click', function (e, elem) {
	    var item = $(e.target).closest('.list-row');
	
	    if (confirm(deleteMessage)) {
	      var pkeyValues = item.find("input[type=hidden][name=pkeys]").val();
	      var url = location.pathname;
	      if (location.search) {
	        url += location.search + '&delete=' + pkeyValues;
	      } else {
	        url += '?delete=' + pkeyValues;
	      }
	
	      url += location.hash;
	
	      location.href = url;
	    }
	  });
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sorter = function () {
	  function Sorter(listSelector) {
	    _classCallCheck(this, Sorter);
	
	    this.listSelector = listSelector;
	  }
	
	  //存在しなかった場合$listRowをそのまま返します。
	
	
	  _createClass(Sorter, [{
	    key: '_findRow',
	    value: function _findRow($list, $listRow, pos) {
	      var findIndex;
	      $list.each(function (index, row) {
	        if (row === $listRow[0]) {
	          findIndex = index;
	          return;
	        }
	      });
	
	      var targetIndex = findIndex + pos;
	      if (targetIndex >= 0 && targetIndex < $list.length) {
	        return $($list[targetIndex]);
	      } else {
	        return $listRow;
	      }
	    }
	  }, {
	    key: '_swap',
	    value: function _swap($elem1, $elem2) {
	      var _this = this;
	
	      if ($elem1[0] !== $elem2[0]) {
	        $.sdxSwapAnimation($elem1, $elem2, {
	          onComplete: function onComplete() {
	            var tmp = $('<li>').hide();
	            $elem1.before(tmp);
	            $elem2.before($elem1);
	            tmp.replaceWith($elem2);
	            _this.changeButtonState();
	          }
	        });
	      }
	    }
	  }, {
	    key: 'up',
	    value: function up($listRow) {
	      var $list = $(this.listSelector);
	      var $targetRow = this._findRow($list, $listRow, -1);
	      this._swap($listRow, $targetRow);
	    }
	  }, {
	    key: 'down',
	    value: function down($listRow) {
	      var $list = $(this.listSelector);
	      var $targetRow = this._findRow($list, $listRow, 1);
	      this._swap($listRow, $targetRow);
	    }
	  }, {
	    key: 'top',
	    value: function top($listRow) {
	      var $list = $(this.listSelector);
	      var $targetRow = $list.first();
	      this._swap($listRow, $targetRow);
	    }
	  }, {
	    key: 'bottom',
	    value: function bottom($listRow) {
	      var $list = $(this.listSelector);
	      var $targetRow = $list.last();
	      this._swap($listRow, $targetRow);
	    }
	  }, {
	    key: 'changeButtonState',
	    value: function changeButtonState() {
	      var $list = $(this.listSelector);
	      $list.find('.btn.sort').removeClass('disabled');
	      $list.first().find('.btn.sort.up').addClass('disabled');
	      $list.last().find('.btn.sort.down').addClass('disabled');
	    }
	  }]);
	
	  return Sorter;
	}();
	
	$(function () {
	  var sorter = new Sorter(".list-row");
	  sorter.changeButtonState();
	  $('.btn.sort').on('click', function (e) {
	    e.preventDefault();
	    var $btn = $(this);
	    var $listRow = $btn.closest('.list-row');
	
	    sorter[$btn.attr('data-sort-type')]($listRow);
	    return false;
	  });
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	(function ($) {
	  $.extend({
	    sdxMoveTo: function sdxMoveTo(elem, target, options) {
	      var dummy = elem.clone().appendTo(elem.parent());
	      dummy.outerWidth(elem.outerWidth()).css({
	        position: 'absolute'
	      }).offset(elem.offset());
	
	      //trをabsolueにすると子要素の幅を失うので
	      if (elem.is('tr')) {
	        var children = elem.children();
	        dummy.children().each(function (key, child) {
	          $(child).outerWidth(children.eq(key).outerWidth());
	        });
	      }
	
	      // elem.data('swapDummy', dummy);
	
	      (options.onCreateDummy || $.noop)(elem, dummy);
	
	      elem.css({ visibility: 'hidden' });
	      dummy.animate({ top: target.position().top }, {
	        duration: options.duration,
	        complete: function complete() {
	          dummy.remove();
	          elem.css({ visibility: 'visible' });
	          options.onComplete(elem);
	        }
	      });
	    }
	  });
	  $.extend({
	    sdxSwapAnimation: function sdxSwapAnimation(elem1, elem2, options) {
	
	      if (elem1.length < 1 || elem2.length < 1) {
	        return;
	      }
	
	      var end = [];
	      var _allComplete = function _allComplete() {
	        end.push(true);
	        if (end.length == 2) {
	          (options.onComplete || $.noop)();
	        }
	      };
	
	      $.sdxMoveTo(elem1, elem2, {
	        onComplete: function onComplete() {
	          _allComplete();
	        },
	        onCreateDummy: options.onCreateDummy || $.noop,
	        duration: options.duration || 300
	      });
	      $.sdxMoveTo(elem2, elem1, {
	        onComplete: function onComplete() {
	          _allComplete();
	        },
	        onCreateDummy: options.onCreateDummy || $.noop,
	        duration: options.duration || 300
	      });
	
	      (options.onStarted || $.noop)();
	    }
	  });
	})(jQuery);

/***/ },
/* 6 */
/***/ function(module, exports) {

	if (!Array.prototype.findIndex) {
	  Array.prototype.findIndex = function(predicate) {
	    if (this === null) {
	      throw new TypeError('Array.prototype.findIndex called on null or undefined');
	    }
	    if (typeof predicate !== 'function') {
	      throw new TypeError('predicate must be a function');
	    }
	    var list = Object(this);
	    var length = list.length >>> 0;
	    var thisArg = arguments[1];
	    var value;
	
	    for (var i = 0; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) {
	        return i;
	      }
	    }
	    return -1;
	  };
	}
	
	
	if (!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position) {
	    position = position || 0;
	    return this.lastIndexOf(searchString, position) === position;
	  };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDBkMWM2Yzc2NzIxMzhhZDU5MmMiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvR3JvdXBTZWxlY3Rvci5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L2p1bXBNZW51LmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9EZWxldGUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL1NvcnQuZXM2Iiwid2VicGFjazovLy8uL2pzL2pxdWVyeS9zd2FwQW5pbWF0aW9uLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9Qb2x5ZmlsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0EsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QyxHQURNO0VBQU4sQ0FBRixzQjs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZQUFZLEVBQUUsSUFBRixDQUFaLENBRGM7QUFFbEIsaUJBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBQyxDQUFELEVBQU87QUFDNUIsYUFBSSxRQUFRLFVBQVUsR0FBVixFQUFSLENBRHdCO0FBRTVCLGFBQUksT0FBTyxVQUFVLElBQVYsQ0FBZSxNQUFmLENBQVAsQ0FGd0I7O0FBSTVCLGFBQUksU0FBUyxLQUFULENBSndCO0FBSzVCLGFBQUksVUFBVSxFQUFWLENBTHdCO0FBTTVCLGtCQUFTLE1BQVQsQ0FB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SUFBRjtBQUN2QyxtQkFBVyxRQUFRLFFBQVIsSUFBa0IsR0FBbEI7UUFMYixFQWpCK0M7QUF3Qi9DLFNBQUUsU0FBRixDQUFZLEtBQVosRUFBbUIsS0FBbkIsRUFBMEI7QUFDeEIscUJBQVksc0JBQVU7QUFDcEIsMEJBRG9CO1VBQVY7QUFHWix3QkFBZ0IsUUFBUSxhQUFSLElBQXVCLEVBQUUsSUFBRjtBQUN2QyxtQkFBVyxRQUFRLFFBQVIsSUFBa0IsR0FBbEI7UUFMYixFQXhCK0M7O0FBZ0MvQyxRQUFDLFFBQVEsU0FBUixJQUFtQixFQUFFLElBQUYsQ0FBcEIsR0FoQytDO01BQS9CO0lBRHBCLEVBcENNO0VBQVAsQ0FBRCxDQXdFRyxNQXhFSCxFOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJmaWxlIjoic2NhZmZvbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQwZDFjNmM3NjcyMTM4YWQ1OTJjXG4gKiovIiwiLy9Hcm91cGluZ+aZguOBruOCuOODo+ODs+ODl+ODoeODi+ODpeODvFxyXG5pbXBvcnQganVtcE1lbnUgZnJvbSAnLi4vanF1ZXJ5L2p1bXBNZW51JztcclxuXHJcbiQoKCkgPT4ge1xyXG4gICQoXCIuc2R4LXNjYWZmb2xkLWxpc3QgLmdyb3VwLXNlbGVjdG9yXCIpLmp1bXBNZW51KCk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvR3JvdXBTZWxlY3Rvci5lczZcbiAqKi8iLCIkLmZuLmV4dGVuZCh7XHJcbiAganVtcE1lbnU6IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICRzZWxlY3RvciA9ICQodGhpcyk7XHJcbiAgICAgICRzZWxlY3Rvci5vbihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICRzZWxlY3Rvci52YWwoKTtcclxuICAgICAgICB2YXIgbmFtZSA9ICRzZWxlY3Rvci5hdHRyKCduYW1lJyk7XHJcblxyXG4gICAgICAgIHZhciBleGlzdHMgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcXVlcmllcyA9IFtdO1xyXG4gICAgICAgIGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoJyYnKS5mb3JFYWNoKChrZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYoa2V5VmFsdWUpe1xyXG4gICAgICAgICAgICB2YXIgYXJyID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgaWYoYXJyWzBdID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgIGlmKHZhbHVlKSBxdWVyaWVzLnB1c2gobmFtZSArICc9JyArIHZhbHVlKTtcclxuICAgICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHF1ZXJpZXMucHVzaChhcnIuam9pbignPScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZighZXhpc3RzICYmIHZhbHVlKXtcclxuICAgICAgICAgIHF1ZXJpZXMucHVzaChuYW1lICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICAgbG9jYXRpb24ucGF0aG5hbWUgKyAocXVlcmllcy5sZW5ndGggPyBcIj9cIiArIHF1ZXJpZXMuam9pbignJicpIDogXCJcIikgKyBsb2NhdGlvbi5oYXNoO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2XG4gKiovIiwiJCgoKSA9PiB7XHJcbiAgdmFyIGRlbGV0ZU1lc3NhZ2UgPSAkKCdpbnB1dFt0eXBlPWhpZGRlbl1bbmFtZT1EZWxldGVNZXNzYWdlXScpLnZhbCgpO1xyXG4gICQoXCIuc2R4LXNjYWZmb2xkLWxpc3QgLmJ0bi5kZWxldGVcIikub24oJ2NsaWNrJywgKGUsIGVsZW0pID0+IHtcclxuICAgIHZhciBpdGVtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmxpc3Qtcm93Jyk7XHJcblxyXG4gICAgaWYoY29uZmlybShkZWxldGVNZXNzYWdlKSl7XHJcbiAgICAgIHZhciBwa2V5VmFsdWVzID0gaXRlbS5maW5kKFwiaW5wdXRbdHlwZT1oaWRkZW5dW25hbWU9cGtleXNdXCIpLnZhbCgpO1xyXG4gICAgICB2YXIgdXJsID0gbG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgIGlmKGxvY2F0aW9uLnNlYXJjaCl7XHJcbiAgICAgICAgdXJsICs9IGxvY2F0aW9uLnNlYXJjaCArICcmZGVsZXRlPScgKyBwa2V5VmFsdWVzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVybCArPSAnP2RlbGV0ZT0nICsgcGtleVZhbHVlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgdXJsICs9IGxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczZcbiAqKi8iLCJpbXBvcnQgJy4uL2pxdWVyeS9zd2FwQW5pbWF0aW9uJztcclxuXHJcbmNsYXNzIFNvcnRlclxyXG57XHJcbiAgY29uc3RydWN0b3IobGlzdFNlbGVjdG9yKXtcclxuICAgIHRoaXMubGlzdFNlbGVjdG9yID0gbGlzdFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgLy/lrZjlnKjjgZfjgarjgYvjgaPjgZ/loLTlkIgkbGlzdFJvd+OCkuOBneOBruOBvuOBvui/lOOBl+OBvuOBmeOAglxyXG4gIF9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgcG9zKXtcclxuICAgIHZhciBmaW5kSW5kZXg7XHJcbiAgICAkbGlzdC5lYWNoKChpbmRleCwgcm93KSA9PiB7XHJcbiAgICAgIGlmKHJvdyA9PT0gJGxpc3RSb3dbMF0pe1xyXG4gICAgICAgIGZpbmRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHRhcmdldEluZGV4ID0gZmluZEluZGV4ICsgcG9zO1xyXG4gICAgaWYodGFyZ2V0SW5kZXggPj0gMCAmJiB0YXJnZXRJbmRleCA8ICRsaXN0Lmxlbmd0aCl7XHJcbiAgICAgIHJldHVybiAkKCRsaXN0W3RhcmdldEluZGV4XSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJGxpc3RSb3c7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc3dhcCgkZWxlbTEsICRlbGVtMil7XHJcbiAgICBpZigkZWxlbTFbMF0gIT09ICRlbGVtMlswXSl7XHJcbiAgICAgICQuc2R4U3dhcEFuaW1hdGlvbigkZWxlbTEsICRlbGVtMiwge1xyXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIHZhciB0bXAgPSAkKCc8bGk+JykuaGlkZSgpO1xyXG4gICAgICAgICAgJGVsZW0xLmJlZm9yZSh0bXApO1xyXG4gICAgICAgICAgJGVsZW0yLmJlZm9yZSgkZWxlbTEpO1xyXG4gICAgICAgICAgdG1wLnJlcGxhY2VXaXRoKCRlbGVtMik7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSB0aGlzLl9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgLTEpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBkb3duKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSB0aGlzLl9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgMSk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIHRvcCgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gJGxpc3QuZmlyc3QoKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgYm90dG9tKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSAkbGlzdC5sYXN0KCk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJ1dHRvblN0YXRlKCl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgICRsaXN0LmZpbmQoJy5idG4uc29ydCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJGxpc3QuZmlyc3QoKS5maW5kKCcuYnRuLnNvcnQudXAnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICRsaXN0Lmxhc3QoKS5maW5kKCcuYnRuLnNvcnQuZG93bicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gIH1cclxufVxyXG5cclxuJCgoKSA9PiB7XHJcbiAgdmFyIHNvcnRlciA9IG5ldyBTb3J0ZXIoXCIubGlzdC1yb3dcIik7XHJcbiAgc29ydGVyLmNoYW5nZUJ1dHRvblN0YXRlKCk7XHJcbiAgJCgnLmJ0bi5zb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgJGJ0biA9ICQodGhpcyk7XHJcbiAgICB2YXIgJGxpc3RSb3cgPSAkYnRuLmNsb3Nlc3QoJy5saXN0LXJvdycpO1xyXG5cclxuICAgIHNvcnRlclskYnRuLmF0dHIoJ2RhdGEtc29ydC10eXBlJyldKCRsaXN0Um93KTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9Tb3J0LmVzNlxuICoqLyIsIigoJCkgPT4ge1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeE1vdmVUbzogZnVuY3Rpb24oZWxlbSwgdGFyZ2V0LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICB2YXIgZHVtbXkgPSBlbGVtLmNsb25lKCkuYXBwZW5kVG8oZWxlbS5wYXJlbnQoKSk7XHJcbiAgICAgIGR1bW15XHJcbiAgICAgICAgLm91dGVyV2lkdGgoZWxlbS5vdXRlcldpZHRoKCkpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9mZnNldChlbGVtLm9mZnNldCgpKVxyXG4gICAgICAgIDtcclxuXHJcbiAgICAgIC8vdHLjgpJhYnNvbHVl44Gr44GZ44KL44Go5a2Q6KaB57Sg44Gu5bmF44KS5aSx44GG44Gu44GnXHJcbiAgICAgIGlmKGVsZW0uaXMoJ3RyJykpe1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW4oKTtcclxuICAgICAgICBkdW1teS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oa2V5LCBjaGlsZCl7XHJcbiAgICAgICAgICAkKGNoaWxkKS5vdXRlcldpZHRoKGNoaWxkcmVuLmVxKGtleSkub3V0ZXJXaWR0aCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLy8gZWxlbS5kYXRhKCdzd2FwRHVtbXknLCBkdW1teSk7XHJcbiAgICAgIFxyXG4gICAgICAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApKGVsZW0sIGR1bW15KTtcclxuICAgICAgXHJcbiAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAnaGlkZGVuJ30pO1xyXG4gICAgICBkdW1teS5hbmltYXRlKCB7dG9wOiB0YXJnZXQucG9zaXRpb24oKS50b3B9LCB7XHJcbiAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBkdW1teS5yZW1vdmUoKTtcclxuICAgICAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAndmlzaWJsZSd9KTtcclxuICAgICAgICAgIG9wdGlvbnMub25Db21wbGV0ZShlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeFN3YXBBbmltYXRpb246IGZ1bmN0aW9uKGVsZW0xLCBlbGVtMiwgb3B0aW9ucyl7XHJcblxyXG4gICAgICBpZihlbGVtMS5sZW5ndGggPCAxIHx8IGVsZW0yLmxlbmd0aCA8IDEpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHZhciBlbmQgPSBbXTtcclxuICAgICAgdmFyIF9hbGxDb21wbGV0ZSA9IGZ1bmN0aW9uKClcclxuICAgICAge1xyXG4gICAgICAgIGVuZC5wdXNoKHRydWUpO1xyXG4gICAgICAgIGlmKGVuZC5sZW5ndGggPT0gMilcclxuICAgICAgICB7ICAgICAgICAgXHJcbiAgICAgICAgICAob3B0aW9ucy5vbkNvbXBsZXRlfHwkLm5vb3ApKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAkLnNkeE1vdmVUbyhlbGVtMSwgZWxlbTIsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgX2FsbENvbXBsZXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNyZWF0ZUR1bW15OiAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApLFxyXG4gICAgICAgIGR1cmF0aW9uOiAob3B0aW9ucy5kdXJhdGlvbnx8MzAwKVxyXG4gICAgICB9KTtcclxuICAgICAgJC5zZHhNb3ZlVG8oZWxlbTIsIGVsZW0xLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgICBfYWxsQ29tcGxldGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ3JlYXRlRHVtbXk6IChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCksXHJcbiAgICAgICAgZHVyYXRpb246IChvcHRpb25zLmR1cmF0aW9ufHwzMDApXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgKG9wdGlvbnMub25TdGFydGVkfHwkLm5vb3ApKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKGpRdWVyeSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvc3dhcEFuaW1hdGlvbi5lczZcbiAqKi8iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcclxuICBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4ID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XHJcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4IGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcyk7XHJcbiAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XHJcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcclxuICAgIHZhciB2YWx1ZTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlID0gbGlzdFtpXTtcclxuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfTtcclxufVxyXG5cclxuXHJcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XHJcbiAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xyXG4gICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCAwO1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdEluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT09IHBvc2l0aW9uO1xyXG4gIH07XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvUG9seWZpbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9