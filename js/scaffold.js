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
	      limitMultiFileUploadSize: 4096 * 1024
	    }).bind("fileuploadsubmit", function (e, data) {
	      //多すぎる分を取り除く
	      images.removeExtraFile(data.files);
	      images.reserveCount(data.files);
	
	      if (data.files.length == 0) {
	        return false;
	      }
	    }).bind("fileuploaddone", function (e, data) {
	      $.each(data.result.files, function (index, file) {
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
	      var $img = image.createElement(this.thumbWidth);
	      $('<li />').addClass("image").append($img).appendTo(this.$wrapper);
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
	    value: function createElement(thumbWidth) {
	      var $img = $('<img />').attr("src", this.path);
	      if (thumbWidth) {
	        $img.css("width", thumbWidth + "px");
	      }
	
	      return $img;
	    }
	  }]);
	
	  return Image;
	}();
	
	exports.default = Image;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2RhNjk2YWNjNDJiYjU3NjY2ZjQiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvU29ydC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L3N3YXBBbmltYXRpb24uZXM2Iiwid2VicGFjazovLy8uL2pzL1BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlTGlzdC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSx3Qjs7Ozs7Ozs7QUNIQTs7Ozs7O0FBRUEsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QztBQUNELEVBRkQsRTs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZQUFZLEVBQUUsSUFBRixDQUFoQjtBQUNBLGlCQUFVLEVBQVYsQ0FBYSxRQUFi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QUNEOzs7O3FDQUVlLEssRUFBTTtBQUNwQixjQUFNLE1BQU0sTUFBTixHQUFlLEtBQUssUUFBTCxHQUFnQixLQUFLLFlBQTFDLEVBQXVEO0FBQ3JELGVBQU0sR0FBTjtBQUNEO0FBQ0Y7OztrQ0FFWSxLLEVBQU07QUFDakIsWUFBSyxZQUFMLElBQXFCLE1BQU0sTUFBM0I7QUFDRDs7OzhCQUVRLEssRUFBTTtBQUNiLFdBQU0sT0FBTyxNQUFNLGFBQU4sQ0FBb0IsS0FBSyxVQUF6QixDQUFiO0FBQ0EsU0FBRSxRQUFGLEVBQVksUUFBWixDQUFxQixPQUFyQixFQUE4QixNQUE5QixDQUFxQyxJQUFyQyxFQUEyQyxRQUEzQyxDQUFvRCxLQUFLLFFBQXpEO0FBQ0Q7Ozs7OzttQkF0QmtCLFM7Ozs7Ozs7Ozs7Ozs7Ozs7S0NBQSxLO0FBRW5CLGtCQUFZLElBQVosRUFBaUI7QUFBQTs7QUFDZixVQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0Q7Ozs7bUNBRWEsVSxFQUFXO0FBQ3ZCLFdBQU0sT0FBTyxFQUFFLFNBQUYsRUFBYSxJQUFiLENBQWtCLEtBQWxCLEVBQXlCLEtBQUssSUFBOUIsQ0FBYjtBQUNBLFdBQUcsVUFBSCxFQUFjO0FBQ1osY0FBSyxHQUFMLENBQVMsT0FBVCxFQUFrQixhQUFXLElBQTdCO0FBQ0Q7O0FBRUQsY0FBTyxJQUFQO0FBQ0Q7Ozs7OzttQkFia0IsSyIsImZpbGUiOiJzY2FmZm9sZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgY2RhNjk2YWNjNDJiYjU3NjY2ZjRcbiAqKi8iLCJpbXBvcnQgJy4vR3JvdXBTZWxlY3Rvcic7XHJcbmltcG9ydCAnLi9EZWxldGUnO1xyXG5pbXBvcnQgJy4vU29ydCc7XHJcbmltcG9ydCAnLi4vUG9seWZpbGwnO1xyXG5pbXBvcnQgJy4uL2ltYWdlVXBsb2FkZXIvYXBwJ1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL2FwcC5lczZcbiAqKi8iLCIvL0dyb3VwaW5n5pmC44Gu44K444Oj44Oz44OX44Oh44OL44Ol44O8XHJcbmltcG9ydCBqdW1wTWVudSBmcm9tICcuLi9qcXVlcnkvanVtcE1lbnUnO1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJChcIi5zZHgtc2NhZmZvbGQtbGlzdCAuZ3JvdXAtc2VsZWN0b3JcIikuanVtcE1lbnUoKTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNlxuICoqLyIsIiQuZm4uZXh0ZW5kKHtcclxuICBqdW1wTWVudTogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgJHNlbGVjdG9yID0gJCh0aGlzKTtcclxuICAgICAgJHNlbGVjdG9yLm9uKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJHNlbGVjdG9yLnZhbCgpO1xyXG4gICAgICAgIHZhciBuYW1lID0gJHNlbGVjdG9yLmF0dHIoJ25hbWUnKTtcclxuXHJcbiAgICAgICAgdmFyIGV4aXN0cyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBxdWVyaWVzID0gW107XHJcbiAgICAgICAgbG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdCgnJicpLmZvckVhY2goKGtleVZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBpZihrZXlWYWx1ZSl7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICBpZihhcnJbMF0gPT0gbmFtZSl7XHJcbiAgICAgICAgICAgICAgaWYodmFsdWUpIHF1ZXJpZXMucHVzaChuYW1lICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcXVlcmllcy5wdXNoKGFyci5qb2luKCc9JykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKCFleGlzdHMgJiYgdmFsdWUpe1xyXG4gICAgICAgICAgcXVlcmllcy5wdXNoKG5hbWUgKyAnPScgKyB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gICBsb2NhdGlvbi5wYXRobmFtZSArIChxdWVyaWVzLmxlbmd0aCA/IFwiP1wiICsgcXVlcmllcy5qb2luKCcmJykgOiBcIlwiKSArIGxvY2F0aW9uLmhhc2g7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2pxdWVyeS9qdW1wTWVudS5lczZcbiAqKi8iLCIkKCgpID0+IHtcclxuICB2YXIgZGVsZXRlTWVzc2FnZSA9ICQoJ2lucHV0W3R5cGU9aGlkZGVuXVtuYW1lPURlbGV0ZU1lc3NhZ2VdJykudmFsKCk7XHJcbiAgJChcIi5zZHgtc2NhZmZvbGQtbGlzdCAuYnRuLmRlbGV0ZVwiKS5vbignY2xpY2snLCAoZSwgZWxlbSkgPT4ge1xyXG4gICAgdmFyIGl0ZW0gPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcubGlzdC1yb3cnKTtcclxuXHJcbiAgICBpZihjb25maXJtKGRlbGV0ZU1lc3NhZ2UpKXtcclxuICAgICAgdmFyIHBrZXlWYWx1ZXMgPSBpdGVtLmZpbmQoXCJpbnB1dFt0eXBlPWhpZGRlbl1bbmFtZT1wa2V5c11cIikudmFsKCk7XHJcbiAgICAgIHZhciB1cmwgPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgaWYobG9jYXRpb24uc2VhcmNoKXtcclxuICAgICAgICB1cmwgKz0gbG9jYXRpb24uc2VhcmNoICsgJyZkZWxldGU9JyArIHBrZXlWYWx1ZXM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXJsICs9ICc/ZGVsZXRlPScgKyBwa2V5VmFsdWVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1cmwgKz0gbG9jYXRpb24uaGFzaDtcclxuXHJcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvRGVsZXRlLmVzNlxuICoqLyIsImltcG9ydCAnLi4vanF1ZXJ5L3N3YXBBbmltYXRpb24nO1xyXG5cclxuY2xhc3MgU29ydGVyXHJcbntcclxuICBjb25zdHJ1Y3RvcihsaXN0U2VsZWN0b3Ipe1xyXG4gICAgdGhpcy5saXN0U2VsZWN0b3IgPSBsaXN0U2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICAvL+WtmOWcqOOBl+OBquOBi+OBo+OBn+WgtOWQiCRsaXN0Um9344KS44Gd44Gu44G+44G+6L+U44GX44G+44GZ44CCXHJcbiAgX2ZpbmRSb3coJGxpc3QsICRsaXN0Um93LCBwb3Mpe1xyXG4gICAgdmFyIGZpbmRJbmRleDtcclxuICAgICRsaXN0LmVhY2goKGluZGV4LCByb3cpID0+IHtcclxuICAgICAgaWYocm93ID09PSAkbGlzdFJvd1swXSl7XHJcbiAgICAgICAgZmluZEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgdGFyZ2V0SW5kZXggPSBmaW5kSW5kZXggKyBwb3M7XHJcbiAgICBpZih0YXJnZXRJbmRleCA+PSAwICYmIHRhcmdldEluZGV4IDwgJGxpc3QubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuICQoJGxpc3RbdGFyZ2V0SW5kZXhdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAkbGlzdFJvdztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zd2FwKCRlbGVtMSwgJGVsZW0yKXtcclxuICAgIGlmKCRlbGVtMVswXSAhPT0gJGVsZW0yWzBdKXtcclxuICAgICAgJC5zZHhTd2FwQW5pbWF0aW9uKCRlbGVtMSwgJGVsZW0yLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgdmFyIHRtcCA9ICQoJzxsaT4nKS5oaWRlKCk7XHJcbiAgICAgICAgICAkZWxlbTEuYmVmb3JlKHRtcCk7XHJcbiAgICAgICAgICAkZWxlbTIuYmVmb3JlKCRlbGVtMSk7XHJcbiAgICAgICAgICB0bXAucmVwbGFjZVdpdGgoJGVsZW0yKTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXAoJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9IHRoaXMuX2ZpbmRSb3coJGxpc3QsICRsaXN0Um93LCAtMSk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGRvd24oJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9IHRoaXMuX2ZpbmRSb3coJGxpc3QsICRsaXN0Um93LCAxKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgdG9wKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSAkbGlzdC5maXJzdCgpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBib3R0b20oJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9ICRsaXN0Lmxhc3QoKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQnV0dG9uU3RhdGUoKXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgJGxpc3QuZmluZCgnLmJ0bi5zb3J0JykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAkbGlzdC5maXJzdCgpLmZpbmQoJy5idG4uc29ydC51cCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJGxpc3QubGFzdCgpLmZpbmQoJy5idG4uc29ydC5kb3duJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgfVxyXG59XHJcblxyXG4kKCgpID0+IHtcclxuICB2YXIgc29ydGVyID0gbmV3IFNvcnRlcihcIi5saXN0LXJvd1wiKTtcclxuICBzb3J0ZXIuY2hhbmdlQnV0dG9uU3RhdGUoKTtcclxuICAkKCcuYnRuLnNvcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciAkYnRuID0gJCh0aGlzKTtcclxuICAgIHZhciAkbGlzdFJvdyA9ICRidG4uY2xvc2VzdCgnLmxpc3Qtcm93Jyk7XHJcblxyXG4gICAgc29ydGVyWyRidG4uYXR0cignZGF0YS1zb3J0LXR5cGUnKV0oJGxpc3RSb3cpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0pO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL1NvcnQuZXM2XG4gKiovIiwiKCgkKSA9PiB7XHJcbiAgJC5leHRlbmQoe1xyXG4gICAgc2R4TW92ZVRvOiBmdW5jdGlvbihlbGVtLCB0YXJnZXQsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgIHZhciBkdW1teSA9IGVsZW0uY2xvbmUoKS5hcHBlbmRUbyhlbGVtLnBhcmVudCgpKTtcclxuICAgICAgZHVtbXlcclxuICAgICAgICAub3V0ZXJXaWR0aChlbGVtLm91dGVyV2lkdGgoKSlcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub2Zmc2V0KGVsZW0ub2Zmc2V0KCkpXHJcbiAgICAgICAgO1xyXG5cclxuICAgICAgLy90cuOCkmFic29sdWXjgavjgZnjgovjgajlrZDopoHntKDjga7luYXjgpLlpLHjgYbjga7jgadcclxuICAgICAgaWYoZWxlbS5pcygndHInKSl7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gZWxlbS5jaGlsZHJlbigpO1xyXG4gICAgICAgIGR1bW15LmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbihrZXksIGNoaWxkKXtcclxuICAgICAgICAgICQoY2hpbGQpLm91dGVyV2lkdGgoY2hpbGRyZW4uZXEoa2V5KS5vdXRlcldpZHRoKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAvLyBlbGVtLmRhdGEoJ3N3YXBEdW1teScsIGR1bW15KTtcclxuICAgICAgXHJcbiAgICAgIChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCkoZWxlbSwgZHVtbXkpO1xyXG4gICAgICBcclxuICAgICAgZWxlbS5jc3Moe3Zpc2liaWxpdHk6ICdoaWRkZW4nfSk7XHJcbiAgICAgIGR1bW15LmFuaW1hdGUoIHt0b3A6IHRhcmdldC5wb3NpdGlvbigpLnRvcH0sIHtcclxuICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcclxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGR1bW15LnJlbW92ZSgpO1xyXG4gICAgICAgICAgZWxlbS5jc3Moe3Zpc2liaWxpdHk6ICd2aXNpYmxlJ30pO1xyXG4gICAgICAgICAgb3B0aW9ucy5vbkNvbXBsZXRlKGVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgJC5leHRlbmQoe1xyXG4gICAgc2R4U3dhcEFuaW1hdGlvbjogZnVuY3Rpb24oZWxlbTEsIGVsZW0yLCBvcHRpb25zKXtcclxuXHJcbiAgICAgIGlmKGVsZW0xLmxlbmd0aCA8IDEgfHwgZWxlbTIubGVuZ3RoIDwgMSlcclxuICAgICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgdmFyIGVuZCA9IFtdO1xyXG4gICAgICB2YXIgX2FsbENvbXBsZXRlID0gZnVuY3Rpb24oKVxyXG4gICAgICB7XHJcbiAgICAgICAgZW5kLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgaWYoZW5kLmxlbmd0aCA9PSAyKVxyXG4gICAgICAgIHsgICAgICAgICBcclxuICAgICAgICAgIChvcHRpb25zLm9uQ29tcGxldGV8fCQubm9vcCkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICQuc2R4TW92ZVRvKGVsZW0xLCBlbGVtMiwge1xyXG4gICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBfYWxsQ29tcGxldGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ3JlYXRlRHVtbXk6IChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCksXHJcbiAgICAgICAgZHVyYXRpb246IChvcHRpb25zLmR1cmF0aW9ufHwzMDApXHJcbiAgICAgIH0pO1xyXG4gICAgICAkLnNkeE1vdmVUbyhlbGVtMiwgZWxlbTEsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpeyBcclxuICAgICAgICAgIF9hbGxDb21wbGV0ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DcmVhdGVEdW1teTogKG9wdGlvbnMub25DcmVhdGVEdW1teXx8JC5ub29wKSxcclxuICAgICAgICBkdXJhdGlvbjogKG9wdGlvbnMuZHVyYXRpb258fDMwMClcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICAob3B0aW9ucy5vblN0YXJ0ZWR8fCQubm9vcCkoKTtcclxuICAgIH1cclxuICB9KTtcclxufSkoalF1ZXJ5KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2pxdWVyeS9zd2FwQW5pbWF0aW9uLmVzNlxuICoqLyIsImlmICghQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCkge1xyXG4gIEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXggPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcclxuICAgIGlmICh0aGlzID09PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kSW5kZXggY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKTtcclxuICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcclxuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xyXG4gICAgdmFyIHZhbHVlO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFsdWUgPSBsaXN0W2ldO1xyXG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XHJcbiAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxuICB9O1xyXG59XHJcblxyXG5cclxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIHtcclxuICBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSB7XHJcbiAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IDA7XHJcbiAgICByZXR1cm4gdGhpcy5sYXN0SW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PT0gcG9zaXRpb247XHJcbiAgfTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9Qb2x5ZmlsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBJbWFnZUxpc3QgZnJvbSAnLi9JbWFnZUxpc3QnO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZSc7XHJcbiQoKCkgPT4ge1xyXG4gICQoXCIuc2R4LWltYWdlLXVwbG9hZGVyIGlucHV0W3R5cGU9ZmlsZV1cIikuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcblxyXG4gICAgY29uc3QgJGVsZW0gPSAkKGVsZW0pO1xyXG4gICAgY29uc3QgaW1hZ2VzID0gbmV3IEltYWdlTGlzdCgkZWxlbSk7XHJcblxyXG4gICAgJGVsZW0uZmlsZXVwbG9hZCh7XHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIHNpbmdsZUZpbGVVcGxvYWRzOiBmYWxzZSxcclxuICAgICAgc2VxdWVudGlhbFVwbG9hZHM6IHRydWUsXHJcbiAgICAgIGxpbWl0TXVsdGlGaWxlVXBsb2FkU2l6ZTogNDA5NiAqIDEwMjRcclxuICAgIH0pLmJpbmQoXCJmaWxldXBsb2Fkc3VibWl0XCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgIC8v5aSa44GZ44GO44KL5YiG44KS5Y+W44KK6Zmk44GPXHJcbiAgICAgIGltYWdlcy5yZW1vdmVFeHRyYUZpbGUoZGF0YS5maWxlcyk7XHJcbiAgICAgIGltYWdlcy5yZXNlcnZlQ291bnQoZGF0YS5maWxlcyk7XHJcblxyXG4gICAgICBpZihkYXRhLmZpbGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pLmJpbmQoXCJmaWxldXBsb2FkZG9uZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAkLmVhY2goZGF0YS5yZXN1bHQuZmlsZXMsIGZ1bmN0aW9uIChpbmRleCwgZmlsZSkge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKGZpbGUubmFtZSk7XHJcbiAgICAgICAgaW1hZ2VzLmFkZEltYWdlKGltYWdlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KS5iaW5kKFwiZmlsZXVwbG9hZGZhaWxcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgZXJyb3IgPSBKU09OLnBhcnNlKGRhdGEuanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSBcIk1heFJlcXVlc3RMZW5ndGhcIikge1xyXG4gICAgICAgICAgYWxlcnQoZXJyb3IubWF4TGVuZ3RoICsgXCJLQuS7peS4iuOBr+OCouODg+ODl+ODreODvOODieOBp+OBjeOBvuOBm+OCk+OAglwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBhbGVydChcIuOCteODvOODkOODvOOCqOODqeODvOOBp+OBmeOAglwiKVxyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKCdmaWxldXBsb2FkcHJvZ3Jlc3MnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBwYXJzZUludChkYXRhLmxvYWRlZCAvIGRhdGEudG90YWwgKiAxMDAsIDEwKTtcclxuICAgICAgLy9jb25zb2xlLmxvZygnZmlsZXVwbG9hZHByb2dyZXNzJywgcHJvZ3Jlc3MpO1xyXG4gICAgfSkuYmluZCgnZmlsZXVwbG9hZHByb2dyZXNzYWxsJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgdmFyIHByb2dyZXNzID0gcGFyc2VJbnQoZGF0YS5sb2FkZWQgLyBkYXRhLnRvdGFsICogMTAwLCAxMCk7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ2ZpbGV1cGxvYWRwcm9ncmVzc2FsbCcsIHByb2dyZXNzKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNlxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlTGlzdFxyXG57XHJcbiAgY29uc3RydWN0b3IoJGlucHV0RWxlbSl7XHJcbiAgICB0aGlzLiR3cmFwcGVyID0gJGlucHV0RWxlbS5jbG9zZXN0KFwiLnNkeC1pbWFnZS11cGxvYWRlclwiKS5maW5kKFwiLmltYWdlc1wiKTtcclxuICAgIHRoaXMuY3VycmVudENvdW50ID0gdGhpcy4kd3JhcHBlci5maW5kKCcuaW1hZ2UnKS5sZW5ndGg7XHJcbiAgICB0aGlzLm1heENvdW50ID0gJGlucHV0RWxlbS5hdHRyKCdkYXRhLW1heC1jb3VudCcpO1xyXG4gICAgdGhpcy50aHVtYldpZHRoID0gJGlucHV0RWxlbS5hdHRyKCdkYXRhLXRodW1iLXdpZHRoJyk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVFeHRyYUZpbGUoZmlsZXMpe1xyXG4gICAgd2hpbGUoZmlsZXMubGVuZ3RoID4gdGhpcy5tYXhDb3VudCAtIHRoaXMuY3VycmVudENvdW50KXtcclxuICAgICAgZmlsZXMucG9wKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNlcnZlQ291bnQoZmlsZXMpe1xyXG4gICAgdGhpcy5jdXJyZW50Q291bnQgKz0gZmlsZXMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgYWRkSW1hZ2UoaW1hZ2Upe1xyXG4gICAgY29uc3QgJGltZyA9IGltYWdlLmNyZWF0ZUVsZW1lbnQodGhpcy50aHVtYldpZHRoKTtcclxuICAgICQoJzxsaSAvPicpLmFkZENsYXNzKFwiaW1hZ2VcIikuYXBwZW5kKCRpbWcpLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2ltYWdlVXBsb2FkZXIvSW1hZ2VMaXN0LmVzNlxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlXHJcbntcclxuICBjb25zdHJ1Y3RvcihwYXRoKXtcclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbGVtZW50KHRodW1iV2lkdGgpe1xyXG4gICAgY29uc3QgJGltZyA9ICQoJzxpbWcgLz4nKS5hdHRyKFwic3JjXCIsIHRoaXMucGF0aCk7XHJcbiAgICBpZih0aHVtYldpZHRoKXtcclxuICAgICAgJGltZy5jc3MoXCJ3aWR0aFwiLCB0aHVtYldpZHRoK1wicHhcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICRpbWc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZS5lczZcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9