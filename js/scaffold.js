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
	      var pkeyValues = item.attr("data-pkeys");
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
	
	__webpack_require__(7);
	
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
	    var $btn = $(this);
	    var $listRow = $btn.closest('.list-row');
	
	    sorter[$btn.attr('data-sort-type')]($listRow);
	  });
	});

/***/ },
/* 5 */,
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

/***/ },
/* 7 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZThhNThmNzdjM2E5OWI2YjRjN2YiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvR3JvdXBTZWxlY3Rvci5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L2p1bXBNZW51LmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9EZWxldGUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL1NvcnQuZXM2Iiwid2VicGFjazovLy8uL2pzL1BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL2pzL2pxdWVyeS9zd2FwQW5pbWF0aW9uLmVzNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0EsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QyxHQURNO0VBQU4sQ0FBRixzQjs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZQUFZLEVBQUUsSUFBRixDQUFaLENBRGM7QUFFbEIsaUJBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBQyxDQUFELEVBQU87QUFDNUIsYUFBSSxRQUFRLFVBQVUsR0FBVixFQUFSLENBRHdCO0FBRTVCLGFBQUksT0FBTyxVQUFVLElBQVYsQ0FBZSxNQUFmLENBQVAsQ0FGd0I7O0FBSTVCLGFBQUksU0FBUyxLQUFULENBSndCO0FBSzVCLGFBQUksVUFBVSxFQUFWLENBTHdCO0FBTTVCLGtCQUFTLE1BQVQsQ0FB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QjtBQUN4QixxQkFBWSxzQkFBVTtBQUNwQiwwQkFEb0I7VUFBVjtBQUdaLHdCQUFnQixRQUFRLGFBQVIsSUFBdUIsRUFBRSxJQUFGO0FBQ3ZDLG1CQUFXLFFBQVEsUUFBUixJQUFrQixHQUFsQjtRQUxiLEVBakIrQztBQXdCL0MsU0FBRSxTQUFGLENBQVksS0FBWixFQUFtQixLQUFuQixFQUEwQjtBQUN4QixxQkFBWSxzQkFBVTtBQUNwQiwwQkFEb0I7VUFBVjtBQUdaLHdCQUFnQixRQUFRLGFBQVIsSUFBdUIsRUFBRSxJQUFGO0FBQ3ZDLG1CQUFXLFFBQVEsUUFBUixJQUFrQixHQUFsQjtRQUxiLEVBeEIrQzs7QUFnQy9DLFFBQUMsUUFBUSxTQUFSLElBQW1CLEVBQUUsSUFBRixDQUFwQixHQWhDK0M7TUFBL0I7SUFEcEIsRUFwQ007RUFBUCxDQUFELENBd0VHLE1BeEVILEUiLCJmaWxlIjoic2NhZmZvbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGU4YTU4Zjc3YzNhOTliNmI0YzdmXG4gKiovIiwiLy9Hcm91cGluZ+aZguOBruOCuOODo+ODs+ODl+ODoeODi+ODpeODvFxyXG5pbXBvcnQganVtcE1lbnUgZnJvbSAnLi4vanF1ZXJ5L2p1bXBNZW51JztcclxuXHJcbiQoKCkgPT4ge1xyXG4gICQoXCIuc2R4LXNjYWZmb2xkLWxpc3QgLmdyb3VwLXNlbGVjdG9yXCIpLmp1bXBNZW51KCk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvR3JvdXBTZWxlY3Rvci5lczZcbiAqKi8iLCIkLmZuLmV4dGVuZCh7XHJcbiAganVtcE1lbnU6IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICRzZWxlY3RvciA9ICQodGhpcyk7XHJcbiAgICAgICRzZWxlY3Rvci5vbihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICRzZWxlY3Rvci52YWwoKTtcclxuICAgICAgICB2YXIgbmFtZSA9ICRzZWxlY3Rvci5hdHRyKCduYW1lJyk7XHJcblxyXG4gICAgICAgIHZhciBleGlzdHMgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcXVlcmllcyA9IFtdO1xyXG4gICAgICAgIGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoJyYnKS5mb3JFYWNoKChrZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYoa2V5VmFsdWUpe1xyXG4gICAgICAgICAgICB2YXIgYXJyID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgaWYoYXJyWzBdID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgIGlmKHZhbHVlKSBxdWVyaWVzLnB1c2gobmFtZSArICc9JyArIHZhbHVlKTtcclxuICAgICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHF1ZXJpZXMucHVzaChhcnIuam9pbignPScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZighZXhpc3RzICYmIHZhbHVlKXtcclxuICAgICAgICAgIHF1ZXJpZXMucHVzaChuYW1lICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICAgbG9jYXRpb24ucGF0aG5hbWUgKyAocXVlcmllcy5sZW5ndGggPyBcIj9cIiArIHF1ZXJpZXMuam9pbignJicpIDogXCJcIikgKyBsb2NhdGlvbi5oYXNoO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2XG4gKiovIiwiJCgoKSA9PiB7XHJcbiAgdmFyIGRlbGV0ZU1lc3NhZ2UgPSAkKCdpbnB1dFt0eXBlPWhpZGRlbl1bbmFtZT1EZWxldGVNZXNzYWdlXScpLnZhbCgpO1xyXG4gICQoXCIuc2R4LXNjYWZmb2xkLWxpc3QgLmJ0bi5kZWxldGVcIikub24oJ2NsaWNrJywgKGUsIGVsZW0pID0+IHtcclxuICAgIHZhciBpdGVtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmxpc3Qtcm93Jyk7XHJcblxyXG4gICAgaWYoY29uZmlybShkZWxldGVNZXNzYWdlKSl7XHJcbiAgICAgIHZhciBwa2V5VmFsdWVzID0gaXRlbS5hdHRyKFwiZGF0YS1wa2V5c1wiKTtcclxuICAgICAgdmFyIHVybCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICBpZihsb2NhdGlvbi5zZWFyY2gpe1xyXG4gICAgICAgIHVybCArPSBsb2NhdGlvbi5zZWFyY2ggKyAnJmRlbGV0ZT0nICsgcGtleVZhbHVlcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1cmwgKz0gJz9kZWxldGU9JyArIHBrZXlWYWx1ZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVybCArPSBsb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgIH1cclxuICB9KTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9EZWxldGUuZXM2XG4gKiovIiwiaW1wb3J0ICcuLi9qcXVlcnkvc3dhcEFuaW1hdGlvbic7XHJcblxyXG5jbGFzcyBTb3J0ZXJcclxue1xyXG4gIGNvbnN0cnVjdG9yKGxpc3RTZWxlY3Rvcil7XHJcbiAgICB0aGlzLmxpc3RTZWxlY3RvciA9IGxpc3RTZWxlY3RvcjtcclxuICB9XHJcblxyXG4gIC8v5a2Y5Zyo44GX44Gq44GL44Gj44Gf5aC05ZCIJGxpc3RSb3fjgpLjgZ3jga7jgb7jgb7ov5TjgZfjgb7jgZnjgIJcclxuICBfZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIHBvcyl7XHJcbiAgICB2YXIgZmluZEluZGV4O1xyXG4gICAgJGxpc3QuZWFjaCgoaW5kZXgsIHJvdykgPT4ge1xyXG4gICAgICBpZihyb3cgPT09ICRsaXN0Um93WzBdKXtcclxuICAgICAgICBmaW5kSW5kZXggPSBpbmRleDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciB0YXJnZXRJbmRleCA9IGZpbmRJbmRleCArIHBvcztcclxuICAgIGlmKHRhcmdldEluZGV4ID49IDAgJiYgdGFyZ2V0SW5kZXggPCAkbGlzdC5sZW5ndGgpe1xyXG4gICAgICByZXR1cm4gJCgkbGlzdFt0YXJnZXRJbmRleF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICRsaXN0Um93O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3N3YXAoJGVsZW0xLCAkZWxlbTIpe1xyXG4gICAgaWYoJGVsZW0xWzBdICE9PSAkZWxlbTJbMF0pe1xyXG4gICAgICAkLnNkeFN3YXBBbmltYXRpb24oJGVsZW0xLCAkZWxlbTIsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICB2YXIgdG1wID0gJCgnPGxpPicpLmhpZGUoKTtcclxuICAgICAgICAgICRlbGVtMS5iZWZvcmUodG1wKTtcclxuICAgICAgICAgICRlbGVtMi5iZWZvcmUoJGVsZW0xKTtcclxuICAgICAgICAgIHRtcC5yZXBsYWNlV2l0aCgkZWxlbTIpO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cCgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gdGhpcy5fZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIC0xKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgZG93bigkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gdGhpcy5fZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIDEpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICB0b3AoJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9ICRsaXN0LmZpcnN0KCk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGJvdHRvbSgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gJGxpc3QubGFzdCgpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VCdXR0b25TdGF0ZSgpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICAkbGlzdC5maW5kKCcuYnRuLnNvcnQnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICRsaXN0LmZpcnN0KCkuZmluZCgnLmJ0bi5zb3J0LnVwJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAkbGlzdC5sYXN0KCkuZmluZCgnLmJ0bi5zb3J0LmRvd24nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbiQoKCkgPT4ge1xyXG4gIHZhciBzb3J0ZXIgPSBuZXcgU29ydGVyKFwiLmxpc3Qtcm93XCIpO1xyXG4gIHNvcnRlci5jaGFuZ2VCdXR0b25TdGF0ZSgpO1xyXG4gICQoJy5idG4uc29ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyICRidG4gPSAkKHRoaXMpO1xyXG4gICAgdmFyICRsaXN0Um93ID0gJGJ0bi5jbG9zZXN0KCcubGlzdC1yb3cnKTtcclxuXHJcbiAgICBzb3J0ZXJbJGJ0bi5hdHRyKCdkYXRhLXNvcnQtdHlwZScpXSgkbGlzdFJvdyk7XHJcbiAgfSk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvU29ydC5lczZcbiAqKi8iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcclxuICBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4ID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XHJcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4IGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcyk7XHJcbiAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XHJcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcclxuICAgIHZhciB2YWx1ZTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlID0gbGlzdFtpXTtcclxuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9Qb2x5ZmlsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIigoJCkgPT4ge1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeE1vdmVUbzogZnVuY3Rpb24oZWxlbSwgdGFyZ2V0LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICB2YXIgZHVtbXkgPSBlbGVtLmNsb25lKCkuYXBwZW5kVG8oZWxlbS5wYXJlbnQoKSk7XHJcbiAgICAgIGR1bW15XHJcbiAgICAgICAgLm91dGVyV2lkdGgoZWxlbS5vdXRlcldpZHRoKCkpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9mZnNldChlbGVtLm9mZnNldCgpKVxyXG4gICAgICAgIDtcclxuXHJcbiAgICAgIC8vdHLjgpJhYnNvbHVl44Gr44GZ44KL44Go5a2Q6KaB57Sg44Gu5bmF44KS5aSx44GG44Gu44GnXHJcbiAgICAgIGlmKGVsZW0uaXMoJ3RyJykpe1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW4oKTtcclxuICAgICAgICBkdW1teS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oa2V5LCBjaGlsZCl7XHJcbiAgICAgICAgICAkKGNoaWxkKS5vdXRlcldpZHRoKGNoaWxkcmVuLmVxKGtleSkub3V0ZXJXaWR0aCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLy8gZWxlbS5kYXRhKCdzd2FwRHVtbXknLCBkdW1teSk7XHJcbiAgICAgIFxyXG4gICAgICAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApKGVsZW0sIGR1bW15KTtcclxuICAgICAgXHJcbiAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAnaGlkZGVuJ30pO1xyXG4gICAgICBkdW1teS5hbmltYXRlKCB7dG9wOiB0YXJnZXQucG9zaXRpb24oKS50b3B9LCB7XHJcbiAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBkdW1teS5yZW1vdmUoKTtcclxuICAgICAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAndmlzaWJsZSd9KTtcclxuICAgICAgICAgIG9wdGlvbnMub25Db21wbGV0ZShlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeFN3YXBBbmltYXRpb246IGZ1bmN0aW9uKGVsZW0xLCBlbGVtMiwgb3B0aW9ucyl7XHJcblxyXG4gICAgICBpZihlbGVtMS5sZW5ndGggPCAxIHx8IGVsZW0yLmxlbmd0aCA8IDEpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHZhciBlbmQgPSBbXTtcclxuICAgICAgdmFyIF9hbGxDb21wbGV0ZSA9IGZ1bmN0aW9uKClcclxuICAgICAge1xyXG4gICAgICAgIGVuZC5wdXNoKHRydWUpO1xyXG4gICAgICAgIGlmKGVuZC5sZW5ndGggPT0gMilcclxuICAgICAgICB7ICAgICAgICAgXHJcbiAgICAgICAgICAob3B0aW9ucy5vbkNvbXBsZXRlfHwkLm5vb3ApKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAkLnNkeE1vdmVUbyhlbGVtMSwgZWxlbTIsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgX2FsbENvbXBsZXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNyZWF0ZUR1bW15OiAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApLFxyXG4gICAgICAgIGR1cmF0aW9uOiAob3B0aW9ucy5kdXJhdGlvbnx8MzAwKVxyXG4gICAgICB9KTtcclxuICAgICAgJC5zZHhNb3ZlVG8oZWxlbTIsIGVsZW0xLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgICBfYWxsQ29tcGxldGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ3JlYXRlRHVtbXk6IChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCksXHJcbiAgICAgICAgZHVyYXRpb246IChvcHRpb25zLmR1cmF0aW9ufHwzMDApXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgKG9wdGlvbnMub25TdGFydGVkfHwkLm5vb3ApKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKGpRdWVyeSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvc3dhcEFuaW1hdGlvbi5lczZcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9