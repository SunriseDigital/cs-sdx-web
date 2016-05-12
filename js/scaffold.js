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
	
	__webpack_require__(7);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ImageList = __webpack_require__(8);
	
	var _ImageList2 = _interopRequireDefault(_ImageList);
	
	var _Image = __webpack_require__(9);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(function () {
	  $(".sdx-image-uploader input[type=file]").each(function (key, elem) {
	
	    var $elem = $(elem);
	    var images = new _ImageList2.default($elem);
	
	    $elem.fileupload({
	      dataType: 'json',
	      singleFileUploads: false,
	      sequentialUploads: true,
	      limitMultiFileUploadSize: 4096 * 1024,
	      formData: { name: $elem.attr("name") }
	    }).bind("fileuploadsubmit", function (e, data) {
	      //多すぎる分を取り除く
	      images.removeExtraFile(data.files);
	      images.reserveCount(data.files);
	
	      if (data.files.length == 0) {
	        return false;
	      }
	    }).bind("fileuploaddone", function (e, data) {
	      $.each(data.result.files, function (index, file) {
	        console.log(file);
	        var image = new _Image2.default(file.name);
	        images.addImage(image);
	      });
	    }).bind("fileuploadfail", function (e, data) {
	      try {
	        var error = JSON.parse(data.jqXHR.responseText);
	        if (error.type == "MaxRequestLength") {
	          alert(error.maxLength + "KB以上はアップロードできません。");
	        } else {
	          throw "";
	        }
	      } catch (e) {
	        alert("サーバーエラーです。");
	      }
	    }).bind('fileuploadprogress', function (e, data) {
	      var progress = parseInt(data.loaded / data.total * 100, 10);
	      //console.log('fileuploadprogress', progress);
	    }).bind('fileuploadprogressall', function (e, data) {
	      var progress = parseInt(data.loaded / data.total * 100, 10);
	      //console.log('fileuploadprogressall', progress);
	    });
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageList = function () {
	  function ImageList($inputElem) {
	    _classCallCheck(this, ImageList);
	
	    this.$wrapper = $inputElem.closest(".sdx-image-uploader").find(".images");
	    this.currentCount = this.$wrapper.find('.image').length;
	    this.maxCount = $inputElem.attr('data-max-count');
	    this.thumbWidth = $inputElem.attr('data-thumb-width');
	    this.deleteLabel = $inputElem.attr('data-delete-label');
	    this.submitName = $inputElem.attr('data-submit-name');
	  }
	
	  _createClass(ImageList, [{
	    key: "removeExtraFile",
	    value: function removeExtraFile(files) {
	      while (files.length > this.maxCount - this.currentCount) {
	        files.pop();
	      }
	    }
	  }, {
	    key: "reserveCount",
	    value: function reserveCount(files) {
	      this.currentCount += files.length;
	    }
	  }, {
	    key: "addImage",
	    value: function addImage(image) {
	      var $li = image.createElement(this.thumbWidth, this.deleteLabel, this.submitName);
	      $li.appendTo(this.$wrapper);
	    }
	  }]);
	
	  return ImageList;
	}();
	
	exports.default = ImageList;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Image = function () {
	  function Image(path) {
	    _classCallCheck(this, Image);
	
	    this.path = path;
	  }
	
	  _createClass(Image, [{
	    key: "createElement",
	    value: function createElement(thumbWidth, deleteLabel, submitName) {
	      var $img = $('<img />').attr("src", this.path);
	      if (thumbWidth) {
	        $img.css("width", thumbWidth + "px");
	      }
	
	      var $li = $("\n<li class=\"image thumbnail pull-left\">\n  <div class=\"header clearfix\">\n    <button class=\"btn btn-danger btn-xs pull-right\">" + deleteLabel + "</button>\n  </div>\n  <input type=\"hidden\" value=\"" + this.path + "\" name=\"" + submitName + "\">\n</li>\n    ").append($img);
	
	      return $li;
	    }
	  }]);
	
	  return Image;
	}();
	
	exports.default = Image;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzFiYjg4ZWIyMTZhNjZlZWJkNzgiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvU29ydC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L3N3YXBBbmltYXRpb24uZXM2Iiwid2VicGFjazovLy8uL2pzL1BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlTGlzdC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSx3Qjs7Ozs7Ozs7QUNIQTs7Ozs7O0FBRUEsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QztBQUNELEVBRkQsRTs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZQUFZLEVBQUUsSUFBRixDQUFoQjtBQUNBLGlCQUFVLEVBQVYsQ0FBYSxRQUFi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aGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDcxYmI4OGViMjE2YTY2ZWViZDc4XG4gKiovIiwiaW1wb3J0ICcuL0dyb3VwU2VsZWN0b3InO1xyXG5pbXBvcnQgJy4vRGVsZXRlJztcclxuaW1wb3J0ICcuL1NvcnQnO1xyXG5pbXBvcnQgJy4uL1BvbHlmaWxsJztcclxuaW1wb3J0ICcuLi9pbWFnZVVwbG9hZGVyL2FwcCdcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9hcHAuZXM2XG4gKiovIiwiLy9Hcm91cGluZ+aZguOBruOCuOODo+ODs+ODl+ODoeODi+ODpeODvFxyXG5pbXBvcnQganVtcE1lbnUgZnJvbSAnLi4vanF1ZXJ5L2p1bXBNZW51JztcclxuXHJcbiQoKCkgPT4ge1xyXG4gICQoXCIuc2R4LXNjYWZmb2xkLWxpc3QgLmdyb3VwLXNlbGVjdG9yXCIpLmp1bXBNZW51KCk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvR3JvdXBTZWxlY3Rvci5lczZcbiAqKi8iLCIkLmZuLmV4dGVuZCh7XHJcbiAganVtcE1lbnU6IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICRzZWxlY3RvciA9ICQodGhpcyk7XHJcbiAgICAgICRzZWxlY3Rvci5vbihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICRzZWxlY3Rvci52YWwoKTtcclxuICAgICAgICB2YXIgbmFtZSA9ICRzZWxlY3Rvci5hdHRyKCduYW1lJyk7XHJcblxyXG4gICAgICAgIHZhciBleGlzdHMgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcXVlcmllcyA9IFtdO1xyXG4gICAgICAgIGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoJyYnKS5mb3JFYWNoKChrZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYoa2V5VmFsdWUpe1xyXG4gICAgICAgICAgICB2YXIgYXJyID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgaWYoYXJyWzBdID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgIGlmKHZhbHVlKSBxdWVyaWVzLnB1c2gobmFtZSArICc9JyArIHZhbHVlKTtcclxuICAgICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHF1ZXJpZXMucHVzaChhcnIuam9pbignPScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZighZXhpc3RzICYmIHZhbHVlKXtcclxuICAgICAgICAgIHF1ZXJpZXMucHVzaChuYW1lICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICAgbG9jYXRpb24ucGF0aG5hbWUgKyAocXVlcmllcy5sZW5ndGggPyBcIj9cIiArIHF1ZXJpZXMuam9pbignJicpIDogXCJcIikgKyBsb2NhdGlvbi5oYXNoO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2XG4gKiovIiwiJCgoKSA9PiB7XHJcbiAgdmFyIGRlbGV0ZU1lc3NhZ2UgPSAkKCdpbnB1dFt0eXBlPWhpZGRlbl1bbmFtZT1EZWxldGVNZXNzYWdlXScpLnZhbCgpO1xyXG4gICQoXCIuc2R4LXNjYWZmb2xkLWxpc3QgLmJ0bi5kZWxldGVcIikub24oJ2NsaWNrJywgKGUsIGVsZW0pID0+IHtcclxuICAgIHZhciBpdGVtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmxpc3Qtcm93Jyk7XHJcblxyXG4gICAgaWYoY29uZmlybShkZWxldGVNZXNzYWdlKSl7XHJcbiAgICAgIHZhciBwa2V5VmFsdWVzID0gaXRlbS5maW5kKFwiaW5wdXRbdHlwZT1oaWRkZW5dW25hbWU9cGtleXNdXCIpLnZhbCgpO1xyXG4gICAgICB2YXIgdXJsID0gbG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgIGlmKGxvY2F0aW9uLnNlYXJjaCl7XHJcbiAgICAgICAgdXJsICs9IGxvY2F0aW9uLnNlYXJjaCArICcmZGVsZXRlPScgKyBwa2V5VmFsdWVzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVybCArPSAnP2RlbGV0ZT0nICsgcGtleVZhbHVlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgdXJsICs9IGxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczZcbiAqKi8iLCJpbXBvcnQgJy4uL2pxdWVyeS9zd2FwQW5pbWF0aW9uJztcclxuXHJcbmNsYXNzIFNvcnRlclxyXG57XHJcbiAgY29uc3RydWN0b3IobGlzdFNlbGVjdG9yKXtcclxuICAgIHRoaXMubGlzdFNlbGVjdG9yID0gbGlzdFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgLy/lrZjlnKjjgZfjgarjgYvjgaPjgZ/loLTlkIgkbGlzdFJvd+OCkuOBneOBruOBvuOBvui/lOOBl+OBvuOBmeOAglxyXG4gIF9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgcG9zKXtcclxuICAgIHZhciBmaW5kSW5kZXg7XHJcbiAgICAkbGlzdC5lYWNoKChpbmRleCwgcm93KSA9PiB7XHJcbiAgICAgIGlmKHJvdyA9PT0gJGxpc3RSb3dbMF0pe1xyXG4gICAgICAgIGZpbmRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHRhcmdldEluZGV4ID0gZmluZEluZGV4ICsgcG9zO1xyXG4gICAgaWYodGFyZ2V0SW5kZXggPj0gMCAmJiB0YXJnZXRJbmRleCA8ICRsaXN0Lmxlbmd0aCl7XHJcbiAgICAgIHJldHVybiAkKCRsaXN0W3RhcmdldEluZGV4XSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJGxpc3RSb3c7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc3dhcCgkZWxlbTEsICRlbGVtMil7XHJcbiAgICBpZigkZWxlbTFbMF0gIT09ICRlbGVtMlswXSl7XHJcbiAgICAgICQuc2R4U3dhcEFuaW1hdGlvbigkZWxlbTEsICRlbGVtMiwge1xyXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIHZhciB0bXAgPSAkKCc8bGk+JykuaGlkZSgpO1xyXG4gICAgICAgICAgJGVsZW0xLmJlZm9yZSh0bXApO1xyXG4gICAgICAgICAgJGVsZW0yLmJlZm9yZSgkZWxlbTEpO1xyXG4gICAgICAgICAgdG1wLnJlcGxhY2VXaXRoKCRlbGVtMik7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSB0aGlzLl9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgLTEpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBkb3duKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSB0aGlzLl9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgMSk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIHRvcCgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gJGxpc3QuZmlyc3QoKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgYm90dG9tKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSAkbGlzdC5sYXN0KCk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJ1dHRvblN0YXRlKCl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgICRsaXN0LmZpbmQoJy5idG4uc29ydCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJGxpc3QuZmlyc3QoKS5maW5kKCcuYnRuLnNvcnQudXAnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICRsaXN0Lmxhc3QoKS5maW5kKCcuYnRuLnNvcnQuZG93bicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gIH1cclxufVxyXG5cclxuJCgoKSA9PiB7XHJcbiAgdmFyIHNvcnRlciA9IG5ldyBTb3J0ZXIoXCIubGlzdC1yb3dcIik7XHJcbiAgc29ydGVyLmNoYW5nZUJ1dHRvblN0YXRlKCk7XHJcbiAgJCgnLmJ0bi5zb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgJGJ0biA9ICQodGhpcyk7XHJcbiAgICB2YXIgJGxpc3RSb3cgPSAkYnRuLmNsb3Nlc3QoJy5saXN0LXJvdycpO1xyXG5cclxuICAgIHNvcnRlclskYnRuLmF0dHIoJ2RhdGEtc29ydC10eXBlJyldKCRsaXN0Um93KTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9Tb3J0LmVzNlxuICoqLyIsIigoJCkgPT4ge1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeE1vdmVUbzogZnVuY3Rpb24oZWxlbSwgdGFyZ2V0LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICB2YXIgZHVtbXkgPSBlbGVtLmNsb25lKCkuYXBwZW5kVG8oZWxlbS5wYXJlbnQoKSk7XHJcbiAgICAgIGR1bW15XHJcbiAgICAgICAgLm91dGVyV2lkdGgoZWxlbS5vdXRlcldpZHRoKCkpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9mZnNldChlbGVtLm9mZnNldCgpKVxyXG4gICAgICAgIDtcclxuXHJcbiAgICAgIC8vdHLjgpJhYnNvbHVl44Gr44GZ44KL44Go5a2Q6KaB57Sg44Gu5bmF44KS5aSx44GG44Gu44GnXHJcbiAgICAgIGlmKGVsZW0uaXMoJ3RyJykpe1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW4oKTtcclxuICAgICAgICBkdW1teS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oa2V5LCBjaGlsZCl7XHJcbiAgICAgICAgICAkKGNoaWxkKS5vdXRlcldpZHRoKGNoaWxkcmVuLmVxKGtleSkub3V0ZXJXaWR0aCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLy8gZWxlbS5kYXRhKCdzd2FwRHVtbXknLCBkdW1teSk7XHJcbiAgICAgIFxyXG4gICAgICAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApKGVsZW0sIGR1bW15KTtcclxuICAgICAgXHJcbiAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAnaGlkZGVuJ30pO1xyXG4gICAgICBkdW1teS5hbmltYXRlKCB7dG9wOiB0YXJnZXQucG9zaXRpb24oKS50b3B9LCB7XHJcbiAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBkdW1teS5yZW1vdmUoKTtcclxuICAgICAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAndmlzaWJsZSd9KTtcclxuICAgICAgICAgIG9wdGlvbnMub25Db21wbGV0ZShlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeFN3YXBBbmltYXRpb246IGZ1bmN0aW9uKGVsZW0xLCBlbGVtMiwgb3B0aW9ucyl7XHJcblxyXG4gICAgICBpZihlbGVtMS5sZW5ndGggPCAxIHx8IGVsZW0yLmxlbmd0aCA8IDEpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHZhciBlbmQgPSBbXTtcclxuICAgICAgdmFyIF9hbGxDb21wbGV0ZSA9IGZ1bmN0aW9uKClcclxuICAgICAge1xyXG4gICAgICAgIGVuZC5wdXNoKHRydWUpO1xyXG4gICAgICAgIGlmKGVuZC5sZW5ndGggPT0gMilcclxuICAgICAgICB7ICAgICAgICAgXHJcbiAgICAgICAgICAob3B0aW9ucy5vbkNvbXBsZXRlfHwkLm5vb3ApKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAkLnNkeE1vdmVUbyhlbGVtMSwgZWxlbTIsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgX2FsbENvbXBsZXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNyZWF0ZUR1bW15OiAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApLFxyXG4gICAgICAgIGR1cmF0aW9uOiAob3B0aW9ucy5kdXJhdGlvbnx8MzAwKVxyXG4gICAgICB9KTtcclxuICAgICAgJC5zZHhNb3ZlVG8oZWxlbTIsIGVsZW0xLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgICBfYWxsQ29tcGxldGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ3JlYXRlRHVtbXk6IChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCksXHJcbiAgICAgICAgZHVyYXRpb246IChvcHRpb25zLmR1cmF0aW9ufHwzMDApXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgKG9wdGlvbnMub25TdGFydGVkfHwkLm5vb3ApKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKGpRdWVyeSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvc3dhcEFuaW1hdGlvbi5lczZcbiAqKi8iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcclxuICBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4ID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XHJcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4IGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcyk7XHJcbiAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XHJcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcclxuICAgIHZhciB2YWx1ZTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlID0gbGlzdFtpXTtcclxuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfTtcclxufVxyXG5cclxuXHJcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XHJcbiAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xyXG4gICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCAwO1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdEluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT09IHBvc2l0aW9uO1xyXG4gIH07XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvUG9seWZpbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgSW1hZ2VMaXN0IGZyb20gJy4vSW1hZ2VMaXN0JztcclxuaW1wb3J0IEltYWdlIGZyb20gJy4vSW1hZ2UnO1xyXG4kKCgpID0+IHtcclxuICAkKFwiLnNkeC1pbWFnZS11cGxvYWRlciBpbnB1dFt0eXBlPWZpbGVdXCIpLmVhY2goKGtleSwgZWxlbSkgPT4ge1xyXG5cclxuICAgIGNvbnN0ICRlbGVtID0gJChlbGVtKTtcclxuICAgIGNvbnN0IGltYWdlcyA9IG5ldyBJbWFnZUxpc3QoJGVsZW0pO1xyXG5cclxuICAgICRlbGVtLmZpbGV1cGxvYWQoe1xyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBzaW5nbGVGaWxlVXBsb2FkczogZmFsc2UsXHJcbiAgICAgIHNlcXVlbnRpYWxVcGxvYWRzOiB0cnVlLFxyXG4gICAgICBsaW1pdE11bHRpRmlsZVVwbG9hZFNpemU6IDQwOTYgKiAxMDI0LFxyXG4gICAgICBmb3JtRGF0YToge25hbWU6ICRlbGVtLmF0dHIoXCJuYW1lXCIpfVxyXG4gICAgfSkuYmluZChcImZpbGV1cGxvYWRzdWJtaXRcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgLy/lpJrjgZnjgY7jgovliIbjgpLlj5bjgorpmaTjgY9cclxuICAgICAgaW1hZ2VzLnJlbW92ZUV4dHJhRmlsZShkYXRhLmZpbGVzKTtcclxuICAgICAgaW1hZ2VzLnJlc2VydmVDb3VudChkYXRhLmZpbGVzKTtcclxuXHJcbiAgICAgIGlmKGRhdGEuZmlsZXMubGVuZ3RoID09IDApe1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSkuYmluZChcImZpbGV1cGxvYWRkb25lXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICQuZWFjaChkYXRhLnJlc3VsdC5maWxlcywgZnVuY3Rpb24gKGluZGV4LCBmaWxlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoZmlsZS5uYW1lKTtcclxuICAgICAgICBpbWFnZXMuYWRkSW1hZ2UoaW1hZ2UpO1xyXG4gICAgICB9KTtcclxuICAgIH0pLmJpbmQoXCJmaWxldXBsb2FkZmFpbFwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciBlcnJvciA9IEpTT04ucGFyc2UoZGF0YS5qcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGlmIChlcnJvci50eXBlID09IFwiTWF4UmVxdWVzdExlbmd0aFwiKSB7XHJcbiAgICAgICAgICBhbGVydChlcnJvci5tYXhMZW5ndGggKyBcIktC5Lul5LiK44Gv44Ki44OD44OX44Ot44O844OJ44Gn44GN44G+44Gb44KT44CCXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGFsZXJ0KFwi44K144O844OQ44O844Ko44Op44O844Gn44GZ44CCXCIpXHJcbiAgICAgIH1cclxuICAgIH0pLmJpbmQoJ2ZpbGV1cGxvYWRwcm9ncmVzcycsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgIHZhciBwcm9ncmVzcyA9IHBhcnNlSW50KGRhdGEubG9hZGVkIC8gZGF0YS50b3RhbCAqIDEwMCwgMTApO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdmaWxldXBsb2FkcHJvZ3Jlc3MnLCBwcm9ncmVzcyk7XHJcbiAgICB9KS5iaW5kKCdmaWxldXBsb2FkcHJvZ3Jlc3NhbGwnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBwYXJzZUludChkYXRhLmxvYWRlZCAvIGRhdGEudG90YWwgKiAxMDAsIDEwKTtcclxuICAgICAgLy9jb25zb2xlLmxvZygnZmlsZXVwbG9hZHByb2dyZXNzYWxsJywgcHJvZ3Jlc3MpO1xyXG4gICAgfSlcclxuICB9KTtcclxufSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW1hZ2VVcGxvYWRlci9hcHAuZXM2XG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VMaXN0XHJcbntcclxuICBjb25zdHJ1Y3RvcigkaW5wdXRFbGVtKXtcclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkaW5wdXRFbGVtLmNsb3Nlc3QoXCIuc2R4LWltYWdlLXVwbG9hZGVyXCIpLmZpbmQoXCIuaW1hZ2VzXCIpO1xyXG4gICAgdGhpcy5jdXJyZW50Q291bnQgPSB0aGlzLiR3cmFwcGVyLmZpbmQoJy5pbWFnZScpLmxlbmd0aDtcclxuICAgIHRoaXMubWF4Q291bnQgPSAkaW5wdXRFbGVtLmF0dHIoJ2RhdGEtbWF4LWNvdW50Jyk7XHJcbiAgICB0aGlzLnRodW1iV2lkdGggPSAkaW5wdXRFbGVtLmF0dHIoJ2RhdGEtdGh1bWItd2lkdGgnKTtcclxuICAgIHRoaXMuZGVsZXRlTGFiZWwgPSAkaW5wdXRFbGVtLmF0dHIoJ2RhdGEtZGVsZXRlLWxhYmVsJyk7XHJcbiAgICB0aGlzLnN1Ym1pdE5hbWUgPSAkaW5wdXRFbGVtLmF0dHIoJ2RhdGEtc3VibWl0LW5hbWUnKVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRXh0cmFGaWxlKGZpbGVzKXtcclxuICAgIHdoaWxlKGZpbGVzLmxlbmd0aCA+IHRoaXMubWF4Q291bnQgLSB0aGlzLmN1cnJlbnRDb3VudCl7XHJcbiAgICAgIGZpbGVzLnBvcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXJ2ZUNvdW50KGZpbGVzKXtcclxuICAgIHRoaXMuY3VycmVudENvdW50ICs9IGZpbGVzLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIGFkZEltYWdlKGltYWdlKXtcclxuICAgIGNvbnN0ICRsaSA9IGltYWdlLmNyZWF0ZUVsZW1lbnQodGhpcy50aHVtYldpZHRoLCB0aGlzLmRlbGV0ZUxhYmVsLCB0aGlzLnN1Ym1pdE5hbWUpO1xyXG4gICAgJGxpLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2ltYWdlVXBsb2FkZXIvSW1hZ2VMaXN0LmVzNlxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlXHJcbntcclxuICBjb25zdHJ1Y3RvcihwYXRoKXtcclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbGVtZW50KHRodW1iV2lkdGgsIGRlbGV0ZUxhYmVsLCBzdWJtaXROYW1lKXtcclxuICAgIGNvbnN0ICRpbWcgPSAkKCc8aW1nIC8+JykuYXR0cihcInNyY1wiLCB0aGlzLnBhdGgpO1xyXG4gICAgaWYodGh1bWJXaWR0aCl7XHJcbiAgICAgICRpbWcuY3NzKFwid2lkdGhcIiwgdGh1bWJXaWR0aCtcInB4XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0ICRsaSA9ICQoYFxyXG48bGkgY2xhc3M9XCJpbWFnZSB0aHVtYm5haWwgcHVsbC1sZWZ0XCI+XHJcbiAgPGRpdiBjbGFzcz1cImhlYWRlciBjbGVhcmZpeFwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0bi14cyBwdWxsLXJpZ2h0XCI+JHtkZWxldGVMYWJlbH08L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJHt0aGlzLnBhdGh9XCIgbmFtZT1cIiR7c3VibWl0TmFtZX1cIj5cclxuPC9saT5cclxuICAgIGApLmFwcGVuZCgkaW1nKTtcclxuXHJcbiAgICByZXR1cm4gJGxpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2ltYWdlVXBsb2FkZXIvSW1hZ2UuZXM2XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==