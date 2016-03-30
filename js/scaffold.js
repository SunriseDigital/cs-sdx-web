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
	    e.preventDefault();
	    var $btn = $(this);
	    var $listRow = $btn.closest('.list-row');
	
	    sorter[$btn.attr('data-sort-type')]($listRow);
	    return false;
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
	
	
	if (!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position) {
	    position = position || 0;
	    return this.lastIndexOf(searchString, position) === position;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGNjM2NjOWJlY2MwOGRjOTRkZDAiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvR3JvdXBTZWxlY3Rvci5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L2p1bXBNZW51LmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9EZWxldGUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL1NvcnQuZXM2Iiwid2VicGFjazovLy8uL2pzL1BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL2pzL2pxdWVyeS9zd2FwQW5pbWF0aW9uLmVzNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0EsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QyxHQURNO0VBQU4sQ0FBRixzQjs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZQUFZLEVBQUUsSUFBRixDQUFaLENBRGM7QUFFbEIsaUJBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBQyxDQUFELEVBQU87QUFDNUIsYUFBSSxRQUFRLFVBQVUsR0FBVixFQUFSLENBRHdCO0FBRTVCLGFBQUksT0FBTyxVQUFVLElBQVYsQ0FBZSxNQUFmLENBQVAsQ0FGd0I7O0FBSTVCLGFBQUksU0FBUyxLQUFULENBSndCO0FBSzVCLGFBQUksVUFBVSxFQUFWLENBTHdCO0FBTTVCLGtCQUFTLE1BQVQsQ0FB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LElBQW9CLEVBQUUsSUFBRixDQUFyQixHQURGO1VBREE7UUFIaUIsQ0FSNEI7O0FBaUIvQyxTQUFFLFNBQUYsQ0FBWSxLQUFaLEVBQW1CLEtBQW5CLEVBQTBCO0FBQ3hCLHFCQUFZLHNCQUFVO0FBQ3BCLDBCQURvQjtVQUFWO0FBR1osd0JBQWdCLFFBQVEsYUFBUixJQUF1QixFQUFFLElBQUY7QUFDdkMsbUJBQVcsUUFBUSxRQUFSLElBQWtCLEdBQWxCO1FBTGIsRUFqQitDO0FBd0IvQyxTQUFFLFNBQUYsQ0FBWSxLQUFaLEVBQW1CLEtBQW5CLEVBQTBCO0FBQ3hCLHFCQUFZLHNCQUFVO0FBQ3BCLDBCQURvQjtVQUFWO0FBR1osd0JBQWdCLFFBQVEsYUFBUixJQUF1QixFQUFFLElBQUY7QUFDdkMsbUJBQVcsUUFBUSxRQUFSLElBQWtCLEdBQWxCO1FBTGIsRUF4QitDOztBQWdDL0MsUUFBQyxRQUFRLFNBQVIsSUFBbUIsRUFBRSxJQUFGLENBQXBCLEdBaEMrQztNQUEvQjtJQURwQixFQXBDTTtFQUFQLENBQUQsQ0F3RUcsTUF4RUgsRSIsImZpbGUiOiJzY2FmZm9sZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGNjM2NjOWJlY2MwOGRjOTRkZDBcbiAqKi8iLCIvL0dyb3VwaW5n5pmC44Gu44K444Oj44Oz44OX44Oh44OL44Ol44O8XHJcbmltcG9ydCBqdW1wTWVudSBmcm9tICcuLi9qcXVlcnkvanVtcE1lbnUnO1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJChcIi5zZHgtc2NhZmZvbGQtbGlzdCAuZ3JvdXAtc2VsZWN0b3JcIikuanVtcE1lbnUoKTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNlxuICoqLyIsIiQuZm4uZXh0ZW5kKHtcclxuICBqdW1wTWVudTogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgJHNlbGVjdG9yID0gJCh0aGlzKTtcclxuICAgICAgJHNlbGVjdG9yLm9uKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJHNlbGVjdG9yLnZhbCgpO1xyXG4gICAgICAgIHZhciBuYW1lID0gJHNlbGVjdG9yLmF0dHIoJ25hbWUnKTtcclxuXHJcbiAgICAgICAgdmFyIGV4aXN0cyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBxdWVyaWVzID0gW107XHJcbiAgICAgICAgbG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdCgnJicpLmZvckVhY2goKGtleVZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBpZihrZXlWYWx1ZSl7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICBpZihhcnJbMF0gPT0gbmFtZSl7XHJcbiAgICAgICAgICAgICAgaWYodmFsdWUpIHF1ZXJpZXMucHVzaChuYW1lICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcXVlcmllcy5wdXNoKGFyci5qb2luKCc9JykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKCFleGlzdHMgJiYgdmFsdWUpe1xyXG4gICAgICAgICAgcXVlcmllcy5wdXNoKG5hbWUgKyAnPScgKyB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gICBsb2NhdGlvbi5wYXRobmFtZSArIChxdWVyaWVzLmxlbmd0aCA/IFwiP1wiICsgcXVlcmllcy5qb2luKCcmJykgOiBcIlwiKSArIGxvY2F0aW9uLmhhc2g7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2pxdWVyeS9qdW1wTWVudS5lczZcbiAqKi8iLCIkKCgpID0+IHtcclxuICB2YXIgZGVsZXRlTWVzc2FnZSA9ICQoJ2lucHV0W3R5cGU9aGlkZGVuXVtuYW1lPURlbGV0ZU1lc3NhZ2VdJykudmFsKCk7XHJcbiAgJChcIi5zZHgtc2NhZmZvbGQtbGlzdCAuYnRuLmRlbGV0ZVwiKS5vbignY2xpY2snLCAoZSwgZWxlbSkgPT4ge1xyXG4gICAgdmFyIGl0ZW0gPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcubGlzdC1yb3cnKTtcclxuXHJcbiAgICBpZihjb25maXJtKGRlbGV0ZU1lc3NhZ2UpKXtcclxuICAgICAgdmFyIHBrZXlWYWx1ZXMgPSBpdGVtLmZpbmQoXCJpbnB1dFt0eXBlPWhpZGRlbl1bbmFtZT1wa2V5c11cIikudmFsKCk7XHJcbiAgICAgIHZhciB1cmwgPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgaWYobG9jYXRpb24uc2VhcmNoKXtcclxuICAgICAgICB1cmwgKz0gbG9jYXRpb24uc2VhcmNoICsgJyZkZWxldGU9JyArIHBrZXlWYWx1ZXM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXJsICs9ICc/ZGVsZXRlPScgKyBwa2V5VmFsdWVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1cmwgKz0gbG9jYXRpb24uaGFzaDtcclxuXHJcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvRGVsZXRlLmVzNlxuICoqLyIsImltcG9ydCAnLi4vanF1ZXJ5L3N3YXBBbmltYXRpb24nO1xyXG5cclxuY2xhc3MgU29ydGVyXHJcbntcclxuICBjb25zdHJ1Y3RvcihsaXN0U2VsZWN0b3Ipe1xyXG4gICAgdGhpcy5saXN0U2VsZWN0b3IgPSBsaXN0U2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICAvL+WtmOWcqOOBl+OBquOBi+OBo+OBn+WgtOWQiCRsaXN0Um9344KS44Gd44Gu44G+44G+6L+U44GX44G+44GZ44CCXHJcbiAgX2ZpbmRSb3coJGxpc3QsICRsaXN0Um93LCBwb3Mpe1xyXG4gICAgdmFyIGZpbmRJbmRleDtcclxuICAgICRsaXN0LmVhY2goKGluZGV4LCByb3cpID0+IHtcclxuICAgICAgaWYocm93ID09PSAkbGlzdFJvd1swXSl7XHJcbiAgICAgICAgZmluZEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgdGFyZ2V0SW5kZXggPSBmaW5kSW5kZXggKyBwb3M7XHJcbiAgICBpZih0YXJnZXRJbmRleCA+PSAwICYmIHRhcmdldEluZGV4IDwgJGxpc3QubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuICQoJGxpc3RbdGFyZ2V0SW5kZXhdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAkbGlzdFJvdztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zd2FwKCRlbGVtMSwgJGVsZW0yKXtcclxuICAgIGlmKCRlbGVtMVswXSAhPT0gJGVsZW0yWzBdKXtcclxuICAgICAgJC5zZHhTd2FwQW5pbWF0aW9uKCRlbGVtMSwgJGVsZW0yLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgdmFyIHRtcCA9ICQoJzxsaT4nKS5oaWRlKCk7XHJcbiAgICAgICAgICAkZWxlbTEuYmVmb3JlKHRtcCk7XHJcbiAgICAgICAgICAkZWxlbTIuYmVmb3JlKCRlbGVtMSk7XHJcbiAgICAgICAgICB0bXAucmVwbGFjZVdpdGgoJGVsZW0yKTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXAoJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9IHRoaXMuX2ZpbmRSb3coJGxpc3QsICRsaXN0Um93LCAtMSk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGRvd24oJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9IHRoaXMuX2ZpbmRSb3coJGxpc3QsICRsaXN0Um93LCAxKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgdG9wKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSAkbGlzdC5maXJzdCgpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBib3R0b20oJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9ICRsaXN0Lmxhc3QoKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQnV0dG9uU3RhdGUoKXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgJGxpc3QuZmluZCgnLmJ0bi5zb3J0JykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAkbGlzdC5maXJzdCgpLmZpbmQoJy5idG4uc29ydC51cCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJGxpc3QubGFzdCgpLmZpbmQoJy5idG4uc29ydC5kb3duJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgfVxyXG59XHJcblxyXG4kKCgpID0+IHtcclxuICB2YXIgc29ydGVyID0gbmV3IFNvcnRlcihcIi5saXN0LXJvd1wiKTtcclxuICBzb3J0ZXIuY2hhbmdlQnV0dG9uU3RhdGUoKTtcclxuICAkKCcuYnRuLnNvcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciAkYnRuID0gJCh0aGlzKTtcclxuICAgIHZhciAkbGlzdFJvdyA9ICRidG4uY2xvc2VzdCgnLmxpc3Qtcm93Jyk7XHJcblxyXG4gICAgc29ydGVyWyRidG4uYXR0cignZGF0YS1zb3J0LXR5cGUnKV0oJGxpc3RSb3cpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0pO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL1NvcnQuZXM2XG4gKiovIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KSB7XHJcbiAgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xyXG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuICAgIH1cclxuICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpO1xyXG4gICAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xyXG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XHJcbiAgICB2YXIgdmFsdWU7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICB2YWx1ZSA9IGxpc3RbaV07XHJcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH07XHJcbn1cclxuXHJcblxyXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCkge1xyXG4gIFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcclxuICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcclxuICAgIHJldHVybiB0aGlzLmxhc3RJbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pID09PSBwb3NpdGlvbjtcclxuICB9O1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL1BvbHlmaWxsLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiKCgkKSA9PiB7XHJcbiAgJC5leHRlbmQoe1xyXG4gICAgc2R4TW92ZVRvOiBmdW5jdGlvbihlbGVtLCB0YXJnZXQsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgIHZhciBkdW1teSA9IGVsZW0uY2xvbmUoKS5hcHBlbmRUbyhlbGVtLnBhcmVudCgpKTtcclxuICAgICAgZHVtbXlcclxuICAgICAgICAub3V0ZXJXaWR0aChlbGVtLm91dGVyV2lkdGgoKSlcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub2Zmc2V0KGVsZW0ub2Zmc2V0KCkpXHJcbiAgICAgICAgO1xyXG5cclxuICAgICAgLy90cuOCkmFic29sdWXjgavjgZnjgovjgajlrZDopoHntKDjga7luYXjgpLlpLHjgYbjga7jgadcclxuICAgICAgaWYoZWxlbS5pcygndHInKSl7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gZWxlbS5jaGlsZHJlbigpO1xyXG4gICAgICAgIGR1bW15LmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbihrZXksIGNoaWxkKXtcclxuICAgICAgICAgICQoY2hpbGQpLm91dGVyV2lkdGgoY2hpbGRyZW4uZXEoa2V5KS5vdXRlcldpZHRoKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAvLyBlbGVtLmRhdGEoJ3N3YXBEdW1teScsIGR1bW15KTtcclxuICAgICAgXHJcbiAgICAgIChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCkoZWxlbSwgZHVtbXkpO1xyXG4gICAgICBcclxuICAgICAgZWxlbS5jc3Moe3Zpc2liaWxpdHk6ICdoaWRkZW4nfSk7XHJcbiAgICAgIGR1bW15LmFuaW1hdGUoIHt0b3A6IHRhcmdldC5wb3NpdGlvbigpLnRvcH0sIHtcclxuICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcclxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGR1bW15LnJlbW92ZSgpO1xyXG4gICAgICAgICAgZWxlbS5jc3Moe3Zpc2liaWxpdHk6ICd2aXNpYmxlJ30pO1xyXG4gICAgICAgICAgb3B0aW9ucy5vbkNvbXBsZXRlKGVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgJC5leHRlbmQoe1xyXG4gICAgc2R4U3dhcEFuaW1hdGlvbjogZnVuY3Rpb24oZWxlbTEsIGVsZW0yLCBvcHRpb25zKXtcclxuXHJcbiAgICAgIGlmKGVsZW0xLmxlbmd0aCA8IDEgfHwgZWxlbTIubGVuZ3RoIDwgMSlcclxuICAgICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgdmFyIGVuZCA9IFtdO1xyXG4gICAgICB2YXIgX2FsbENvbXBsZXRlID0gZnVuY3Rpb24oKVxyXG4gICAgICB7XHJcbiAgICAgICAgZW5kLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgaWYoZW5kLmxlbmd0aCA9PSAyKVxyXG4gICAgICAgIHsgICAgICAgICBcclxuICAgICAgICAgIChvcHRpb25zLm9uQ29tcGxldGV8fCQubm9vcCkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICQuc2R4TW92ZVRvKGVsZW0xLCBlbGVtMiwge1xyXG4gICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBfYWxsQ29tcGxldGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ3JlYXRlRHVtbXk6IChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCksXHJcbiAgICAgICAgZHVyYXRpb246IChvcHRpb25zLmR1cmF0aW9ufHwzMDApXHJcbiAgICAgIH0pO1xyXG4gICAgICAkLnNkeE1vdmVUbyhlbGVtMiwgZWxlbTEsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpeyBcclxuICAgICAgICAgIF9hbGxDb21wbGV0ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DcmVhdGVEdW1teTogKG9wdGlvbnMub25DcmVhdGVEdW1teXx8JC5ub29wKSxcclxuICAgICAgICBkdXJhdGlvbjogKG9wdGlvbnMuZHVyYXRpb258fDMwMClcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICAob3B0aW9ucy5vblN0YXJ0ZWR8fCQubm9vcCkoKTtcclxuICAgIH1cclxuICB9KTtcclxufSkoalF1ZXJ5KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2pxdWVyeS9zd2FwQW5pbWF0aW9uLmVzNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=