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
	
	var _Uploader = __webpack_require__(8);
	
	var _Uploader2 = _interopRequireDefault(_Uploader);
	
	var _Image = __webpack_require__(10);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(function () {
	  $(".sdx-image-uploader input[type=file]").each(function (key, elem) {
	
	    var $elem = $(elem);
	    var uploader = new _Uploader2.default($elem.closest(".sdx-image-uploader"));
	    var images = uploader.getImageList();
	
	    uploader.getServerImages().forEach(function (image) {
	      images.addImage(image);
	      images.reserveCount();
	    });
	
	    $elem.fileupload({
	      dataType: 'json',
	      singleFileUploads: false,
	      sequentialUploads: true,
	      limitMultiFileUploadSize: 4096 * 1024,
	      formData: { name: $elem.attr("name") }
	    }).bind("fileuploadsubmit", function (e, data) {
	      //多すぎる分を取り除く
	      var removed = images.removeExtraFile(data.files);
	      images.reserveCount(data.files.length);
	
	      uploader.displayImageCountError(removed.map(function (file) {
	        return file.name;
	      }));
	
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
	    }).bind('fileuploadprogressall', function (e, data) {
	      uploader.updateProgress(data.loaded / data.total * 100);
	    });
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ImageList = __webpack_require__(9);
	
	var _ImageList2 = _interopRequireDefault(_ImageList);
	
	var _Image = __webpack_require__(10);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Uploader = function () {
	  function Uploader($wrapper) {
	    _classCallCheck(this, Uploader);
	
	    this.$wrapper = $wrapper;
	    this.$progressBar = $wrapper.find(".progress .progress-bar");
	    this.imageList = new _ImageList2.default(this.$wrapper);
	    this.maxCountMessage = this.$wrapper.attr('data-max-count-message');
	    console.log(this.maxCountMessage);
	  }
	
	  _createClass(Uploader, [{
	    key: 'getImageList',
	    value: function getImageList() {
	      return this.imageList;
	    }
	  }, {
	    key: 'getServerImages',
	    value: function getServerImages() {
	      var images = [];
	      this.$wrapper.find('.server-images').each(function (key, elem) {
	        var image = new _Image2.default($(elem).val());
	        images.push(image);
	      });
	
	      return images;
	    }
	  }, {
	    key: 'updateProgress',
	    value: function updateProgress(percentValue) {
	      this.$progressBar.css('width', percentValue + "%");
	    }
	  }, {
	    key: 'displayImageCountError',
	    value: function displayImageCountError(files) {
	      var _this = this;
	
	      var $div = this.$wrapper.find('.image-error');
	      if ($div.length == 0) {
	        $div = $('\n<div class="image-error alert alert-danger" role="alert">\n</div>\n      ').appendTo(this.$wrapper);
	      }
	
	      if (files.length == 0) {
	        $div.remove();
	      } else {
	        (function () {
	          $div.html('\n        ' + _this.maxCountMessage.split('%MaxCount%').join(_this.imageList.maxCount) + '\n        <ul class="file-list"></ul>\n      ');
	
	          var $ul = $div.find('.file-list');
	          files.forEach(function (name) {
	            $ul.append('<li>' + name + '</li>');
	          });
	        })();
	      }
	    }
	  }]);
	
	  return Uploader;
	}();
	
	exports.default = Uploader;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageList = function () {
	  function ImageList($globalWrapper) {
	    _classCallCheck(this, ImageList);
	
	    this.currentCount = 0;
	    this.$wrapper = $globalWrapper.find(".images");
	    this.maxCount = $globalWrapper.attr('data-max-count');
	    this.thumbWidth = $globalWrapper.attr('data-thumb-width');
	    this.deleteLabel = $globalWrapper.attr('data-delete-label');
	    this.submitName = $globalWrapper.attr('data-submit-name');
	  }
	
	  _createClass(ImageList, [{
	    key: 'removeExtraFile',
	    value: function removeExtraFile(files) {
	      var removed = [];
	      while (files.length > this.maxCount - this.currentCount) {
	        removed.push(files.pop());
	      }
	
	      return removed;
	    }
	
	    /**
	     * 画像アップロード枚数を予約する。アップロードする前に制限したいので事前に予約できるようになっています。
	     * @param  {[type]} count =             1 [description]
	     */
	
	  }, {
	    key: 'reserveCount',
	    value: function reserveCount() {
	      var count = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
	      this.currentCount += count;
	    }
	  }, {
	    key: 'addImage',
	    value: function addImage(image) {
	      var $li = image.createElement(this.thumbWidth, this.deleteLabel, this.submitName);
	      $li.appendTo(this.$wrapper);
	    }
	  }]);
	
	  return ImageList;
	}();
	
	exports.default = ImageList;

/***/ },
/* 10 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWYxMTZhNmViMDUwODllMmM4N2MiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvU29ydC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L3N3YXBBbmltYXRpb24uZXM2Iiwid2VicGFjazovLy8uL2pzL1BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL1VwbG9hZGVyLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlTGlzdC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSx3Qjs7Ozs7Ozs7QUNIQTs7Ozs7O0FBRUEsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QztBQUNELEVBRkQsRTs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZ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RUFBVztBQUNoRCxXQUFNLE9BQU8sRUFBRSxTQUFGLEVBQWEsSUFBYixDQUFrQixLQUFsQixFQUF5QixLQUFLLElBQTlCLENBQWI7QUFDQSxXQUFHLFVBQUgsRUFBYztBQUNaLGNBQUssR0FBTCxDQUFTLE9BQVQsRUFBa0IsYUFBVyxJQUE3QjtBQUNEOztBQUVELFdBQU0sTUFBTSw2SUFHdUMsV0FIdkMsOERBS2dCLEtBQUssSUFMckIsa0JBS29DLFVBTHBDLHVCQU9ULE1BUFMsQ0FPRixJQVBFLENBQVo7O0FBU0EsY0FBTyxHQUFQO0FBQ0Q7Ozs7OzttQkF0QmtCLEsiLCJmaWxlIjoic2NhZmZvbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDVmMTE2YTZlYjA1MDg5ZTJjODdjXG4gKiovIiwiaW1wb3J0ICcuL0dyb3VwU2VsZWN0b3InO1xyXG5pbXBvcnQgJy4vRGVsZXRlJztcclxuaW1wb3J0ICcuL1NvcnQnO1xyXG5pbXBvcnQgJy4uL1BvbHlmaWxsJztcclxuaW1wb3J0ICcuLi9pbWFnZVVwbG9hZGVyL2FwcCdcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9hcHAuZXM2XG4gKiovIiwiLy9Hcm91cGluZ+aZguOBruOCuOODo+ODs+ODl+ODoeODi+ODpeODvFxyXG5pbXBvcnQganVtcE1lbnUgZnJvbSAnLi4vanF1ZXJ5L2p1bXBNZW51JztcclxuXHJcbiQoKCkgPT4ge1xyXG4gICQoXCIuc2R4LXNjYWZmb2xkLWxpc3QgLmdyb3VwLXNlbGVjdG9yXCIpLmp1bXBNZW51KCk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvR3JvdXBTZWxlY3Rvci5lczZcbiAqKi8iLCIkLmZuLmV4dGVuZCh7XHJcbiAganVtcE1lbnU6IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICRzZWxlY3RvciA9ICQodGhpcyk7XHJcbiAgICAgICRzZWxlY3Rvci5vbihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICRzZWxlY3Rvci52YWwoKTtcclxuICAgICAgICB2YXIgbmFtZSA9ICRzZWxlY3Rvci5hdHRyKCduYW1lJyk7XHJcblxyXG4gICAgICAgIHZhciBleGlzdHMgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcXVlcmllcyA9IFtdO1xyXG4gICAgICAgIGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoJyYnKS5mb3JFYWNoKChrZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYoa2V5VmFsdWUpe1xyXG4gICAgICAgICAgICB2YXIgYXJyID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgaWYoYXJyWzBdID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgIGlmKHZhbHVlKSBxdWVyaWVzLnB1c2gobmFtZSArICc9JyArIHZhbHVlKTtcclxuICAgICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHF1ZXJpZXMucHVzaChhcnIuam9pbignPScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZighZXhpc3RzICYmIHZhbHVlKXtcclxuICAgICAgICAgIHF1ZXJpZXMucHVzaChuYW1lICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICAgbG9jYXRpb24ucGF0aG5hbWUgKyAocXVlcmllcy5sZW5ndGggPyBcIj9cIiArIHF1ZXJpZXMuam9pbignJicpIDogXCJcIikgKyBsb2NhdGlvbi5oYXNoO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2XG4gKiovIiwiJCgoKSA9PiB7XHJcbiAgdmFyIGRlbGV0ZU1lc3NhZ2UgPSAkKCdpbnB1dFt0eXBlPWhpZGRlbl1bbmFtZT1EZWxldGVNZXNzYWdlXScpLnZhbCgpO1xyXG4gICQoXCIuc2R4LXNjYWZmb2xkLWxpc3QgLmJ0bi5kZWxldGVcIikub24oJ2NsaWNrJywgKGUsIGVsZW0pID0+IHtcclxuICAgIHZhciBpdGVtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmxpc3Qtcm93Jyk7XHJcblxyXG4gICAgaWYoY29uZmlybShkZWxldGVNZXNzYWdlKSl7XHJcbiAgICAgIHZhciBwa2V5VmFsdWVzID0gaXRlbS5maW5kKFwiaW5wdXRbdHlwZT1oaWRkZW5dW25hbWU9cGtleXNdXCIpLnZhbCgpO1xyXG4gICAgICB2YXIgdXJsID0gbG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgIGlmKGxvY2F0aW9uLnNlYXJjaCl7XHJcbiAgICAgICAgdXJsICs9IGxvY2F0aW9uLnNlYXJjaCArICcmZGVsZXRlPScgKyBwa2V5VmFsdWVzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVybCArPSAnP2RlbGV0ZT0nICsgcGtleVZhbHVlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgdXJsICs9IGxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczZcbiAqKi8iLCJpbXBvcnQgJy4uL2pxdWVyeS9zd2FwQW5pbWF0aW9uJztcclxuXHJcbmNsYXNzIFNvcnRlclxyXG57XHJcbiAgY29uc3RydWN0b3IobGlzdFNlbGVjdG9yKXtcclxuICAgIHRoaXMubGlzdFNlbGVjdG9yID0gbGlzdFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgLy/lrZjlnKjjgZfjgarjgYvjgaPjgZ/loLTlkIgkbGlzdFJvd+OCkuOBneOBruOBvuOBvui/lOOBl+OBvuOBmeOAglxyXG4gIF9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgcG9zKXtcclxuICAgIHZhciBmaW5kSW5kZXg7XHJcbiAgICAkbGlzdC5lYWNoKChpbmRleCwgcm93KSA9PiB7XHJcbiAgICAgIGlmKHJvdyA9PT0gJGxpc3RSb3dbMF0pe1xyXG4gICAgICAgIGZpbmRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHRhcmdldEluZGV4ID0gZmluZEluZGV4ICsgcG9zO1xyXG4gICAgaWYodGFyZ2V0SW5kZXggPj0gMCAmJiB0YXJnZXRJbmRleCA8ICRsaXN0Lmxlbmd0aCl7XHJcbiAgICAgIHJldHVybiAkKCRsaXN0W3RhcmdldEluZGV4XSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJGxpc3RSb3c7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc3dhcCgkZWxlbTEsICRlbGVtMil7XHJcbiAgICBpZigkZWxlbTFbMF0gIT09ICRlbGVtMlswXSl7XHJcbiAgICAgICQuc2R4U3dhcEFuaW1hdGlvbigkZWxlbTEsICRlbGVtMiwge1xyXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIHZhciB0bXAgPSAkKCc8bGk+JykuaGlkZSgpO1xyXG4gICAgICAgICAgJGVsZW0xLmJlZm9yZSh0bXApO1xyXG4gICAgICAgICAgJGVsZW0yLmJlZm9yZSgkZWxlbTEpO1xyXG4gICAgICAgICAgdG1wLnJlcGxhY2VXaXRoKCRlbGVtMik7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSB0aGlzLl9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgLTEpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBkb3duKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSB0aGlzLl9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgMSk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIHRvcCgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gJGxpc3QuZmlyc3QoKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgYm90dG9tKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSAkbGlzdC5sYXN0KCk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJ1dHRvblN0YXRlKCl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgICRsaXN0LmZpbmQoJy5idG4uc29ydCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJGxpc3QuZmlyc3QoKS5maW5kKCcuYnRuLnNvcnQudXAnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICRsaXN0Lmxhc3QoKS5maW5kKCcuYnRuLnNvcnQuZG93bicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gIH1cclxufVxyXG5cclxuJCgoKSA9PiB7XHJcbiAgdmFyIHNvcnRlciA9IG5ldyBTb3J0ZXIoXCIubGlzdC1yb3dcIik7XHJcbiAgc29ydGVyLmNoYW5nZUJ1dHRvblN0YXRlKCk7XHJcbiAgJCgnLmJ0bi5zb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgJGJ0biA9ICQodGhpcyk7XHJcbiAgICB2YXIgJGxpc3RSb3cgPSAkYnRuLmNsb3Nlc3QoJy5saXN0LXJvdycpO1xyXG5cclxuICAgIHNvcnRlclskYnRuLmF0dHIoJ2RhdGEtc29ydC10eXBlJyldKCRsaXN0Um93KTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9Tb3J0LmVzNlxuICoqLyIsIigoJCkgPT4ge1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeE1vdmVUbzogZnVuY3Rpb24oZWxlbSwgdGFyZ2V0LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICB2YXIgZHVtbXkgPSBlbGVtLmNsb25lKCkuYXBwZW5kVG8oZWxlbS5wYXJlbnQoKSk7XHJcbiAgICAgIGR1bW15XHJcbiAgICAgICAgLm91dGVyV2lkdGgoZWxlbS5vdXRlcldpZHRoKCkpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9mZnNldChlbGVtLm9mZnNldCgpKVxyXG4gICAgICAgIDtcclxuXHJcbiAgICAgIC8vdHLjgpJhYnNvbHVl44Gr44GZ44KL44Go5a2Q6KaB57Sg44Gu5bmF44KS5aSx44GG44Gu44GnXHJcbiAgICAgIGlmKGVsZW0uaXMoJ3RyJykpe1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW4oKTtcclxuICAgICAgICBkdW1teS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oa2V5LCBjaGlsZCl7XHJcbiAgICAgICAgICAkKGNoaWxkKS5vdXRlcldpZHRoKGNoaWxkcmVuLmVxKGtleSkub3V0ZXJXaWR0aCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLy8gZWxlbS5kYXRhKCdzd2FwRHVtbXknLCBkdW1teSk7XHJcbiAgICAgIFxyXG4gICAgICAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApKGVsZW0sIGR1bW15KTtcclxuICAgICAgXHJcbiAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAnaGlkZGVuJ30pO1xyXG4gICAgICBkdW1teS5hbmltYXRlKCB7dG9wOiB0YXJnZXQucG9zaXRpb24oKS50b3B9LCB7XHJcbiAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBkdW1teS5yZW1vdmUoKTtcclxuICAgICAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAndmlzaWJsZSd9KTtcclxuICAgICAgICAgIG9wdGlvbnMub25Db21wbGV0ZShlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeFN3YXBBbmltYXRpb246IGZ1bmN0aW9uKGVsZW0xLCBlbGVtMiwgb3B0aW9ucyl7XHJcblxyXG4gICAgICBpZihlbGVtMS5sZW5ndGggPCAxIHx8IGVsZW0yLmxlbmd0aCA8IDEpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHZhciBlbmQgPSBbXTtcclxuICAgICAgdmFyIF9hbGxDb21wbGV0ZSA9IGZ1bmN0aW9uKClcclxuICAgICAge1xyXG4gICAgICAgIGVuZC5wdXNoKHRydWUpO1xyXG4gICAgICAgIGlmKGVuZC5sZW5ndGggPT0gMilcclxuICAgICAgICB7ICAgICAgICAgXHJcbiAgICAgICAgICAob3B0aW9ucy5vbkNvbXBsZXRlfHwkLm5vb3ApKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAkLnNkeE1vdmVUbyhlbGVtMSwgZWxlbTIsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgX2FsbENvbXBsZXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNyZWF0ZUR1bW15OiAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApLFxyXG4gICAgICAgIGR1cmF0aW9uOiAob3B0aW9ucy5kdXJhdGlvbnx8MzAwKVxyXG4gICAgICB9KTtcclxuICAgICAgJC5zZHhNb3ZlVG8oZWxlbTIsIGVsZW0xLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgICBfYWxsQ29tcGxldGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ3JlYXRlRHVtbXk6IChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCksXHJcbiAgICAgICAgZHVyYXRpb246IChvcHRpb25zLmR1cmF0aW9ufHwzMDApXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgKG9wdGlvbnMub25TdGFydGVkfHwkLm5vb3ApKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKGpRdWVyeSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvc3dhcEFuaW1hdGlvbi5lczZcbiAqKi8iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcclxuICBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4ID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XHJcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4IGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcyk7XHJcbiAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XHJcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcclxuICAgIHZhciB2YWx1ZTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlID0gbGlzdFtpXTtcclxuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfTtcclxufVxyXG5cclxuXHJcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XHJcbiAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xyXG4gICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCAwO1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdEluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT09IHBvc2l0aW9uO1xyXG4gIH07XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvUG9seWZpbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgVXBsb2FkZXIgZnJvbSAnLi9VcGxvYWRlcic7XHJcbmltcG9ydCBJbWFnZSBmcm9tICcuL0ltYWdlJztcclxuJCgoKSA9PiB7XHJcbiAgJChcIi5zZHgtaW1hZ2UtdXBsb2FkZXIgaW5wdXRbdHlwZT1maWxlXVwiKS5lYWNoKChrZXksIGVsZW0pID0+IHtcclxuXHJcbiAgICBjb25zdCAkZWxlbSA9ICQoZWxlbSk7XHJcbiAgICBjb25zdCB1cGxvYWRlciA9IG5ldyBVcGxvYWRlcigkZWxlbS5jbG9zZXN0KFwiLnNkeC1pbWFnZS11cGxvYWRlclwiKSk7XHJcbiAgICBjb25zdCBpbWFnZXMgPSB1cGxvYWRlci5nZXRJbWFnZUxpc3QoKTtcclxuXHJcbiAgICB1cGxvYWRlci5nZXRTZXJ2ZXJJbWFnZXMoKS5mb3JFYWNoKGltYWdlID0+IHtcclxuICAgICAgaW1hZ2VzLmFkZEltYWdlKGltYWdlKTtcclxuICAgICAgaW1hZ2VzLnJlc2VydmVDb3VudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGVsZW0uZmlsZXVwbG9hZCh7XHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIHNpbmdsZUZpbGVVcGxvYWRzOiBmYWxzZSxcclxuICAgICAgc2VxdWVudGlhbFVwbG9hZHM6IHRydWUsXHJcbiAgICAgIGxpbWl0TXVsdGlGaWxlVXBsb2FkU2l6ZTogNDA5NiAqIDEwMjQsXHJcbiAgICAgIGZvcm1EYXRhOiB7bmFtZTogJGVsZW0uYXR0cihcIm5hbWVcIil9XHJcbiAgICB9KS5iaW5kKFwiZmlsZXVwbG9hZHN1Ym1pdFwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAvL+WkmuOBmeOBjuOCi+WIhuOCkuWPluOCiumZpOOBj1xyXG4gICAgICB2YXIgcmVtb3ZlZCA9IGltYWdlcy5yZW1vdmVFeHRyYUZpbGUoZGF0YS5maWxlcyk7XHJcbiAgICAgIGltYWdlcy5yZXNlcnZlQ291bnQoZGF0YS5maWxlcy5sZW5ndGgpO1xyXG5cclxuICAgICAgdXBsb2FkZXIuZGlzcGxheUltYWdlQ291bnRFcnJvcihyZW1vdmVkLm1hcChmaWxlID0+IGZpbGUubmFtZSkpXHJcblxyXG4gICAgICBpZihkYXRhLmZpbGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pLmJpbmQoXCJmaWxldXBsb2FkZG9uZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAkLmVhY2goZGF0YS5yZXN1bHQuZmlsZXMsIGZ1bmN0aW9uIChpbmRleCwgZmlsZSkge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKGZpbGUubmFtZSk7XHJcbiAgICAgICAgaW1hZ2VzLmFkZEltYWdlKGltYWdlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KS5iaW5kKFwiZmlsZXVwbG9hZGZhaWxcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgZXJyb3IgPSBKU09OLnBhcnNlKGRhdGEuanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSBcIk1heFJlcXVlc3RMZW5ndGhcIikge1xyXG4gICAgICAgICAgYWxlcnQoZXJyb3IubWF4TGVuZ3RoICsgXCJLQuS7peS4iuOBr+OCouODg+ODl+ODreODvOODieOBp+OBjeOBvuOBm+OCk+OAglwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBhbGVydChcIuOCteODvOODkOODvOOCqOODqeODvOOBp+OBmeOAglwiKVxyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKCdmaWxldXBsb2FkcHJvZ3Jlc3NhbGwnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICB1cGxvYWRlci51cGRhdGVQcm9ncmVzcyhkYXRhLmxvYWRlZCAvIGRhdGEudG90YWwgKiAxMDApO1xyXG4gICAgfSlcclxuICB9KTtcclxufSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW1hZ2VVcGxvYWRlci9hcHAuZXM2XG4gKiovIiwiaW1wb3J0IEltYWdlTGlzdCBmcm9tICcuL0ltYWdlTGlzdCc7XHJcbmltcG9ydCBJbWFnZSBmcm9tICcuL0ltYWdlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZGVyXHJcbntcclxuICBjb25zdHJ1Y3Rvcigkd3JhcHBlcil7XHJcbiAgICB0aGlzLiR3cmFwcGVyID0gJHdyYXBwZXI7XHJcbiAgICB0aGlzLiRwcm9ncmVzc0JhciA9ICR3cmFwcGVyLmZpbmQoXCIucHJvZ3Jlc3MgLnByb2dyZXNzLWJhclwiKVxyXG4gICAgdGhpcy5pbWFnZUxpc3QgPSBuZXcgSW1hZ2VMaXN0KHRoaXMuJHdyYXBwZXIpO1xyXG4gICAgdGhpcy5tYXhDb3VudE1lc3NhZ2UgPSB0aGlzLiR3cmFwcGVyLmF0dHIoJ2RhdGEtbWF4LWNvdW50LW1lc3NhZ2UnKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMubWF4Q291bnRNZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIGdldEltYWdlTGlzdCgpe1xyXG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VMaXN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VydmVySW1hZ2VzKCl7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBbXTtcclxuICAgIHRoaXMuJHdyYXBwZXIuZmluZCgnLnNlcnZlci1pbWFnZXMnKS5lYWNoKChrZXksIGVsZW0pID0+IHtcclxuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoJChlbGVtKS52YWwoKSk7XHJcbiAgICAgIGltYWdlcy5wdXNoKGltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpbWFnZXM7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcm9ncmVzcyhwZXJjZW50VmFsdWUpe1xyXG4gICAgdGhpcy4kcHJvZ3Jlc3NCYXIuY3NzKCd3aWR0aCcsIHBlcmNlbnRWYWx1ZSArIFwiJVwiKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlJbWFnZUNvdW50RXJyb3IoZmlsZXMpe1xyXG4gICAgdmFyICRkaXYgPSB0aGlzLiR3cmFwcGVyLmZpbmQoJy5pbWFnZS1lcnJvcicpO1xyXG4gICAgaWYoJGRpdi5sZW5ndGggPT0gMCl7XHJcbiAgICAgICRkaXYgPSAkKGBcclxuPGRpdiBjbGFzcz1cImltYWdlLWVycm9yIGFsZXJ0IGFsZXJ0LWRhbmdlclwiIHJvbGU9XCJhbGVydFwiPlxyXG48L2Rpdj5cclxuICAgICAgYCkuYXBwZW5kVG8odGhpcy4kd3JhcHBlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoZmlsZXMubGVuZ3RoID09IDApe1xyXG4gICAgICAkZGl2LnJlbW92ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGRpdi5odG1sKGBcclxuICAgICAgICAke3RoaXMubWF4Q291bnRNZXNzYWdlLnNwbGl0KCclTWF4Q291bnQlJykuam9pbih0aGlzLmltYWdlTGlzdC5tYXhDb3VudCl9XHJcbiAgICAgICAgPHVsIGNsYXNzPVwiZmlsZS1saXN0XCI+PC91bD5cclxuICAgICAgYCk7XHJcblxyXG4gICAgICBjb25zdCAkdWwgPSAkZGl2LmZpbmQoJy5maWxlLWxpc3QnKTtcclxuICAgICAgZmlsZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICAkdWwuYXBwZW5kKGA8bGk+JHtuYW1lfTwvbGk+YCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbWFnZVVwbG9hZGVyL1VwbG9hZGVyLmVzNlxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlTGlzdFxyXG57XHJcbiAgY29uc3RydWN0b3IoJGdsb2JhbFdyYXBwZXIpe1xyXG4gICAgdGhpcy5jdXJyZW50Q291bnQgPSAwO1xyXG4gICAgdGhpcy4kd3JhcHBlciA9ICRnbG9iYWxXcmFwcGVyLmZpbmQoXCIuaW1hZ2VzXCIpO1xyXG4gICAgdGhpcy5tYXhDb3VudCA9ICRnbG9iYWxXcmFwcGVyLmF0dHIoJ2RhdGEtbWF4LWNvdW50Jyk7XHJcbiAgICB0aGlzLnRodW1iV2lkdGggPSAkZ2xvYmFsV3JhcHBlci5hdHRyKCdkYXRhLXRodW1iLXdpZHRoJyk7XHJcbiAgICB0aGlzLmRlbGV0ZUxhYmVsID0gJGdsb2JhbFdyYXBwZXIuYXR0cignZGF0YS1kZWxldGUtbGFiZWwnKTtcclxuICAgIHRoaXMuc3VibWl0TmFtZSA9ICRnbG9iYWxXcmFwcGVyLmF0dHIoJ2RhdGEtc3VibWl0LW5hbWUnKVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRXh0cmFGaWxlKGZpbGVzKXtcclxuICAgIHZhciByZW1vdmVkID0gW107XHJcbiAgICB3aGlsZShmaWxlcy5sZW5ndGggPiB0aGlzLm1heENvdW50IC0gdGhpcy5jdXJyZW50Q291bnQpe1xyXG4gICAgICByZW1vdmVkLnB1c2goZmlsZXMucG9wKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZW1vdmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog55S75YOP44Ki44OD44OX44Ot44O844OJ5p6a5pWw44KS5LqI57SE44GZ44KL44CC44Ki44OD44OX44Ot44O844OJ44GZ44KL5YmN44Gr5Yi26ZmQ44GX44Gf44GE44Gu44Gn5LqL5YmN44Gr5LqI57SE44Gn44GN44KL44KI44GG44Gr44Gq44Gj44Gm44GE44G+44GZ44CCXHJcbiAgICogQHBhcmFtICB7W3R5cGVdfSBjb3VudCA9ICAgICAgICAgICAgIDEgW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIHJlc2VydmVDb3VudChjb3VudCA9IDEpe1xyXG4gICAgdGhpcy5jdXJyZW50Q291bnQgKz0gY291bnQ7XHJcbiAgfVxyXG5cclxuICBhZGRJbWFnZShpbWFnZSl7XHJcbiAgICBjb25zdCAkbGkgPSBpbWFnZS5jcmVhdGVFbGVtZW50KHRoaXMudGh1bWJXaWR0aCwgdGhpcy5kZWxldGVMYWJlbCwgdGhpcy5zdWJtaXROYW1lKTtcclxuICAgICRsaS5hcHBlbmRUbyh0aGlzLiR3cmFwcGVyKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlTGlzdC5lczZcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZVxyXG57XHJcbiAgY29uc3RydWN0b3IocGF0aCl7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRWxlbWVudCh0aHVtYldpZHRoLCBkZWxldGVMYWJlbCwgc3VibWl0TmFtZSl7XHJcbiAgICBjb25zdCAkaW1nID0gJCgnPGltZyAvPicpLmF0dHIoXCJzcmNcIiwgdGhpcy5wYXRoKTtcclxuICAgIGlmKHRodW1iV2lkdGgpe1xyXG4gICAgICAkaW1nLmNzcyhcIndpZHRoXCIsIHRodW1iV2lkdGgrXCJweFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCAkbGkgPSAkKGBcclxuPGxpIGNsYXNzPVwiaW1hZ2UgdGh1bWJuYWlsIHB1bGwtbGVmdFwiPlxyXG4gIDxkaXYgY2xhc3M9XCJoZWFkZXIgY2xlYXJmaXhcIj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG4teHMgcHVsbC1yaWdodFwiPiR7ZGVsZXRlTGFiZWx9PC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIiR7dGhpcy5wYXRofVwiIG5hbWU9XCIke3N1Ym1pdE5hbWV9XCI+XHJcbjwvbGk+XHJcbiAgICBgKS5hcHBlbmQoJGltZyk7XHJcblxyXG4gICAgcmV0dXJuICRsaTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlLmVzNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=