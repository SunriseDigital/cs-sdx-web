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
	    this.$wrapper.sortable({
	      opacity: 0.8
	    }).disableSelection();
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
	    key: 'removeCount',
	    value: function removeCount() {
	      --this.currentCount;
	    }
	  }, {
	    key: 'addImage',
	    value: function addImage(image) {
	      var $li = image.createElement(this);
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
	    value: function createElement(imageList) {
	      var $img = $('<img />').attr("src", this.path);
	      if (imageList.thumbWidth) {
	        $img.css("width", imageList.thumbWidth + "px");
	      }
	
	      var $li = $("\n<li class=\"image thumbnail pull-left\">\n  <div class=\"header clearfix\">\n    <button class=\"delete btn btn-danger btn-xs pull-right\">" + imageList.deleteLabel + "</button>\n  </div>\n  <input type=\"hidden\" value=\"" + this.path + "\" name=\"" + imageList.submitName + "\">\n</li>\n    ").append($img);
	
	      $li.find('.delete').on('click', function (e) {
	        e.preventDefault();
	        var $li = $(e.currentTarget).closest('.image');
	        $li.remove();
	        imageList.removeCount();
	        return false;
	      });
	
	      return $li;
	    }
	  }]);
	
	  return Image;
	}();
	
	exports.default = Image;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2RhZmZlNzQzNTBiMjY1MGE2ZTgiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvU29ydC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L3N3YXBBbmltYXRpb24uZXM2Iiwid2VicGFjazovLy8uL2pzL1BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL1VwbG9hZGVyLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlTGlzdC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSx3Qjs7Ozs7Ozs7QUNIQTs7Ozs7O0FBRUEsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QztBQUNELEVBRkQsRTs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZ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Ozs7bUNBRWEsUyxFQUFVO0FBQ3RCLFdBQU0sT0FBTyxFQUFFLFNBQUYsRUFBYSxJQUFiLENBQWtCLEtBQWxCLEVBQXlCLEtBQUssSUFBOUIsQ0FBYjtBQUNBLFdBQUcsVUFBVSxVQUFiLEVBQXdCO0FBQ3RCLGNBQUssR0FBTCxDQUFTLE9BQVQsRUFBa0IsVUFBVSxVQUFWLEdBQXFCLElBQXZDO0FBQ0Q7O0FBRUQsV0FBTSxNQUFNLG9KQUc4QyxVQUFVLFdBSHhELDhEQUtnQixLQUFLLElBTHJCLGtCQUtvQyxVQUFVLFVBTDlDLHVCQU9ULE1BUFMsQ0FPRixJQVBFLENBQVo7O0FBU0EsV0FBSSxJQUFKLENBQVMsU0FBVCxFQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxhQUFLO0FBQ25DLFdBQUUsY0FBRjtBQUNBLGFBQU0sTUFBTSxFQUFFLEVBQUUsYUFBSixFQUFtQixPQUFuQixDQUEyQixRQUEzQixDQUFaO0FBQ0EsYUFBSSxNQUFKO0FBQ0EsbUJBQVUsV0FBVjtBQUNBLGdCQUFPLEtBQVA7QUFDRCxRQU5EOztBQVFBLGNBQU8sR0FBUDtBQUNEOzs7Ozs7bUJBOUJrQixLIiwiZmlsZSI6InNjYWZmb2xkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzZGFmZmU3NDM1MGIyNjUwYTZlOFxuICoqLyIsImltcG9ydCAnLi9Hcm91cFNlbGVjdG9yJztcclxuaW1wb3J0ICcuL0RlbGV0ZSc7XHJcbmltcG9ydCAnLi9Tb3J0JztcclxuaW1wb3J0ICcuLi9Qb2x5ZmlsbCc7XHJcbmltcG9ydCAnLi4vaW1hZ2VVcGxvYWRlci9hcHAnXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvYXBwLmVzNlxuICoqLyIsIi8vR3JvdXBpbmfmmYLjga7jgrjjg6Pjg7Pjg5fjg6Hjg4vjg6Xjg7xcclxuaW1wb3J0IGp1bXBNZW51IGZyb20gJy4uL2pxdWVyeS9qdW1wTWVudSc7XHJcblxyXG4kKCgpID0+IHtcclxuICAkKFwiLnNkeC1zY2FmZm9sZC1saXN0IC5ncm91cC1zZWxlY3RvclwiKS5qdW1wTWVudSgpO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL0dyb3VwU2VsZWN0b3IuZXM2XG4gKiovIiwiJC5mbi5leHRlbmQoe1xyXG4gIGp1bXBNZW51OiBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkc2VsZWN0b3IgPSAkKHRoaXMpO1xyXG4gICAgICAkc2VsZWN0b3Iub24oXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICB2YXIgdmFsdWUgPSAkc2VsZWN0b3IudmFsKCk7XHJcbiAgICAgICAgdmFyIG5hbWUgPSAkc2VsZWN0b3IuYXR0cignbmFtZScpO1xyXG5cclxuICAgICAgICB2YXIgZXhpc3RzID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHF1ZXJpZXMgPSBbXTtcclxuICAgICAgICBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KCcmJykuZm9yRWFjaCgoa2V5VmFsdWUpID0+IHtcclxuICAgICAgICAgIGlmKGtleVZhbHVlKXtcclxuICAgICAgICAgICAgdmFyIGFyciA9IGtleVZhbHVlLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgIGlmKGFyclswXSA9PSBuYW1lKXtcclxuICAgICAgICAgICAgICBpZih2YWx1ZSkgcXVlcmllcy5wdXNoKG5hbWUgKyAnPScgKyB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBxdWVyaWVzLnB1c2goYXJyLmpvaW4oJz0nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoIWV4aXN0cyAmJiB2YWx1ZSl7XHJcbiAgICAgICAgICBxdWVyaWVzLnB1c2gobmFtZSArICc9JyArIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAgIGxvY2F0aW9uLnBhdGhuYW1lICsgKHF1ZXJpZXMubGVuZ3RoID8gXCI/XCIgKyBxdWVyaWVzLmpvaW4oJyYnKSA6IFwiXCIpICsgbG9jYXRpb24uaGFzaDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvanF1ZXJ5L2p1bXBNZW51LmVzNlxuICoqLyIsIiQoKCkgPT4ge1xyXG4gIHZhciBkZWxldGVNZXNzYWdlID0gJCgnaW5wdXRbdHlwZT1oaWRkZW5dW25hbWU9RGVsZXRlTWVzc2FnZV0nKS52YWwoKTtcclxuICAkKFwiLnNkeC1zY2FmZm9sZC1saXN0IC5idG4uZGVsZXRlXCIpLm9uKCdjbGljaycsIChlLCBlbGVtKSA9PiB7XHJcbiAgICB2YXIgaXRlbSA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5saXN0LXJvdycpO1xyXG5cclxuICAgIGlmKGNvbmZpcm0oZGVsZXRlTWVzc2FnZSkpe1xyXG4gICAgICB2YXIgcGtleVZhbHVlcyA9IGl0ZW0uZmluZChcImlucHV0W3R5cGU9aGlkZGVuXVtuYW1lPXBrZXlzXVwiKS52YWwoKTtcclxuICAgICAgdmFyIHVybCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICBpZihsb2NhdGlvbi5zZWFyY2gpe1xyXG4gICAgICAgIHVybCArPSBsb2NhdGlvbi5zZWFyY2ggKyAnJmRlbGV0ZT0nICsgcGtleVZhbHVlcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1cmwgKz0gJz9kZWxldGU9JyArIHBrZXlWYWx1ZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVybCArPSBsb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgIH1cclxuICB9KTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9EZWxldGUuZXM2XG4gKiovIiwiaW1wb3J0ICcuLi9qcXVlcnkvc3dhcEFuaW1hdGlvbic7XHJcblxyXG5jbGFzcyBTb3J0ZXJcclxue1xyXG4gIGNvbnN0cnVjdG9yKGxpc3RTZWxlY3Rvcil7XHJcbiAgICB0aGlzLmxpc3RTZWxlY3RvciA9IGxpc3RTZWxlY3RvcjtcclxuICB9XHJcblxyXG4gIC8v5a2Y5Zyo44GX44Gq44GL44Gj44Gf5aC05ZCIJGxpc3RSb3fjgpLjgZ3jga7jgb7jgb7ov5TjgZfjgb7jgZnjgIJcclxuICBfZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIHBvcyl7XHJcbiAgICB2YXIgZmluZEluZGV4O1xyXG4gICAgJGxpc3QuZWFjaCgoaW5kZXgsIHJvdykgPT4ge1xyXG4gICAgICBpZihyb3cgPT09ICRsaXN0Um93WzBdKXtcclxuICAgICAgICBmaW5kSW5kZXggPSBpbmRleDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciB0YXJnZXRJbmRleCA9IGZpbmRJbmRleCArIHBvcztcclxuICAgIGlmKHRhcmdldEluZGV4ID49IDAgJiYgdGFyZ2V0SW5kZXggPCAkbGlzdC5sZW5ndGgpe1xyXG4gICAgICByZXR1cm4gJCgkbGlzdFt0YXJnZXRJbmRleF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICRsaXN0Um93O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3N3YXAoJGVsZW0xLCAkZWxlbTIpe1xyXG4gICAgaWYoJGVsZW0xWzBdICE9PSAkZWxlbTJbMF0pe1xyXG4gICAgICAkLnNkeFN3YXBBbmltYXRpb24oJGVsZW0xLCAkZWxlbTIsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICB2YXIgdG1wID0gJCgnPGxpPicpLmhpZGUoKTtcclxuICAgICAgICAgICRlbGVtMS5iZWZvcmUodG1wKTtcclxuICAgICAgICAgICRlbGVtMi5iZWZvcmUoJGVsZW0xKTtcclxuICAgICAgICAgIHRtcC5yZXBsYWNlV2l0aCgkZWxlbTIpO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cCgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gdGhpcy5fZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIC0xKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgZG93bigkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gdGhpcy5fZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIDEpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICB0b3AoJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9ICRsaXN0LmZpcnN0KCk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGJvdHRvbSgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gJGxpc3QubGFzdCgpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VCdXR0b25TdGF0ZSgpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICAkbGlzdC5maW5kKCcuYnRuLnNvcnQnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICRsaXN0LmZpcnN0KCkuZmluZCgnLmJ0bi5zb3J0LnVwJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAkbGlzdC5sYXN0KCkuZmluZCgnLmJ0bi5zb3J0LmRvd24nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbiQoKCkgPT4ge1xyXG4gIHZhciBzb3J0ZXIgPSBuZXcgU29ydGVyKFwiLmxpc3Qtcm93XCIpO1xyXG4gIHNvcnRlci5jaGFuZ2VCdXR0b25TdGF0ZSgpO1xyXG4gICQoJy5idG4uc29ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyICRidG4gPSAkKHRoaXMpO1xyXG4gICAgdmFyICRsaXN0Um93ID0gJGJ0bi5jbG9zZXN0KCcubGlzdC1yb3cnKTtcclxuXHJcbiAgICBzb3J0ZXJbJGJ0bi5hdHRyKCdkYXRhLXNvcnQtdHlwZScpXSgkbGlzdFJvdyk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvU29ydC5lczZcbiAqKi8iLCIoKCQpID0+IHtcclxuICAkLmV4dGVuZCh7XHJcbiAgICBzZHhNb3ZlVG86IGZ1bmN0aW9uKGVsZW0sIHRhcmdldCwgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgdmFyIGR1bW15ID0gZWxlbS5jbG9uZSgpLmFwcGVuZFRvKGVsZW0ucGFyZW50KCkpO1xyXG4gICAgICBkdW1teVxyXG4gICAgICAgIC5vdXRlcldpZHRoKGVsZW0ub3V0ZXJXaWR0aCgpKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vZmZzZXQoZWxlbS5vZmZzZXQoKSlcclxuICAgICAgICA7XHJcblxyXG4gICAgICAvL3Ry44KSYWJzb2x1ZeOBq+OBmeOCi+OBqOWtkOimgee0oOOBruW5heOCkuWkseOBhuOBruOBp1xyXG4gICAgICBpZihlbGVtLmlzKCd0cicpKXtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtLmNoaWxkcmVuKCk7XHJcbiAgICAgICAgZHVtbXkuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKGtleSwgY2hpbGQpe1xyXG4gICAgICAgICAgJChjaGlsZCkub3V0ZXJXaWR0aChjaGlsZHJlbi5lcShrZXkpLm91dGVyV2lkdGgoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC8vIGVsZW0uZGF0YSgnc3dhcER1bW15JywgZHVtbXkpO1xyXG4gICAgICBcclxuICAgICAgKG9wdGlvbnMub25DcmVhdGVEdW1teXx8JC5ub29wKShlbGVtLCBkdW1teSk7XHJcbiAgICAgIFxyXG4gICAgICBlbGVtLmNzcyh7dmlzaWJpbGl0eTogJ2hpZGRlbid9KTtcclxuICAgICAgZHVtbXkuYW5pbWF0ZSgge3RvcDogdGFyZ2V0LnBvc2l0aW9uKCkudG9wfSwge1xyXG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgZHVtbXkucmVtb3ZlKCk7XHJcbiAgICAgICAgICBlbGVtLmNzcyh7dmlzaWJpbGl0eTogJ3Zpc2libGUnfSk7XHJcbiAgICAgICAgICBvcHRpb25zLm9uQ29tcGxldGUoZWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuICAkLmV4dGVuZCh7XHJcbiAgICBzZHhTd2FwQW5pbWF0aW9uOiBmdW5jdGlvbihlbGVtMSwgZWxlbTIsIG9wdGlvbnMpe1xyXG5cclxuICAgICAgaWYoZWxlbTEubGVuZ3RoIDwgMSB8fCBlbGVtMi5sZW5ndGggPCAxKVxyXG4gICAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICB2YXIgZW5kID0gW107XHJcbiAgICAgIHZhciBfYWxsQ29tcGxldGUgPSBmdW5jdGlvbigpXHJcbiAgICAgIHtcclxuICAgICAgICBlbmQucHVzaCh0cnVlKTtcclxuICAgICAgICBpZihlbmQubGVuZ3RoID09IDIpXHJcbiAgICAgICAgeyAgICAgICAgIFxyXG4gICAgICAgICAgKG9wdGlvbnMub25Db21wbGV0ZXx8JC5ub29wKSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgJC5zZHhNb3ZlVG8oZWxlbTEsIGVsZW0yLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIF9hbGxDb21wbGV0ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DcmVhdGVEdW1teTogKG9wdGlvbnMub25DcmVhdGVEdW1teXx8JC5ub29wKSxcclxuICAgICAgICBkdXJhdGlvbjogKG9wdGlvbnMuZHVyYXRpb258fDMwMClcclxuICAgICAgfSk7XHJcbiAgICAgICQuc2R4TW92ZVRvKGVsZW0yLCBlbGVtMSwge1xyXG4gICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgICAgX2FsbENvbXBsZXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNyZWF0ZUR1bW15OiAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApLFxyXG4gICAgICAgIGR1cmF0aW9uOiAob3B0aW9ucy5kdXJhdGlvbnx8MzAwKVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIChvcHRpb25zLm9uU3RhcnRlZHx8JC5ub29wKSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KShqUXVlcnkpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvanF1ZXJ5L3N3YXBBbmltYXRpb24uZXM2XG4gKiovIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KSB7XHJcbiAgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xyXG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuICAgIH1cclxuICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpO1xyXG4gICAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xyXG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XHJcbiAgICB2YXIgdmFsdWU7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICB2YWx1ZSA9IGxpc3RbaV07XHJcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH07XHJcbn1cclxuXHJcblxyXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCkge1xyXG4gIFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcclxuICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcclxuICAgIHJldHVybiB0aGlzLmxhc3RJbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pID09PSBwb3NpdGlvbjtcclxuICB9O1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL1BvbHlmaWxsLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFVwbG9hZGVyIGZyb20gJy4vVXBsb2FkZXInO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZSc7XHJcbiQoKCkgPT4ge1xyXG4gICQoXCIuc2R4LWltYWdlLXVwbG9hZGVyIGlucHV0W3R5cGU9ZmlsZV1cIikuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcblxyXG4gICAgY29uc3QgJGVsZW0gPSAkKGVsZW0pO1xyXG4gICAgY29uc3QgdXBsb2FkZXIgPSBuZXcgVXBsb2FkZXIoJGVsZW0uY2xvc2VzdChcIi5zZHgtaW1hZ2UtdXBsb2FkZXJcIikpO1xyXG4gICAgY29uc3QgaW1hZ2VzID0gdXBsb2FkZXIuZ2V0SW1hZ2VMaXN0KCk7XHJcblxyXG4gICAgdXBsb2FkZXIuZ2V0U2VydmVySW1hZ2VzKCkuZm9yRWFjaChpbWFnZSA9PiB7XHJcbiAgICAgIGltYWdlcy5hZGRJbWFnZShpbWFnZSk7XHJcbiAgICAgIGltYWdlcy5yZXNlcnZlQ291bnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRlbGVtLmZpbGV1cGxvYWQoe1xyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBzaW5nbGVGaWxlVXBsb2FkczogZmFsc2UsXHJcbiAgICAgIHNlcXVlbnRpYWxVcGxvYWRzOiB0cnVlLFxyXG4gICAgICBsaW1pdE11bHRpRmlsZVVwbG9hZFNpemU6IDQwOTYgKiAxMDI0LFxyXG4gICAgICBmb3JtRGF0YToge25hbWU6ICRlbGVtLmF0dHIoXCJuYW1lXCIpfVxyXG4gICAgfSkuYmluZChcImZpbGV1cGxvYWRzdWJtaXRcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgLy/lpJrjgZnjgY7jgovliIbjgpLlj5bjgorpmaTjgY9cclxuICAgICAgdmFyIHJlbW92ZWQgPSBpbWFnZXMucmVtb3ZlRXh0cmFGaWxlKGRhdGEuZmlsZXMpO1xyXG4gICAgICBpbWFnZXMucmVzZXJ2ZUNvdW50KGRhdGEuZmlsZXMubGVuZ3RoKTtcclxuXHJcbiAgICAgIHVwbG9hZGVyLmRpc3BsYXlJbWFnZUNvdW50RXJyb3IocmVtb3ZlZC5tYXAoZmlsZSA9PiBmaWxlLm5hbWUpKVxyXG5cclxuICAgICAgaWYoZGF0YS5maWxlcy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKFwiZmlsZXVwbG9hZGRvbmVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgJC5lYWNoKGRhdGEucmVzdWx0LmZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGZpbGUpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZShmaWxlLm5hbWUpO1xyXG4gICAgICAgIGltYWdlcy5hZGRJbWFnZShpbWFnZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkuYmluZChcImZpbGV1cGxvYWRmYWlsXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIGVycm9yID0gSlNPTi5wYXJzZShkYXRhLmpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gXCJNYXhSZXF1ZXN0TGVuZ3RoXCIpIHtcclxuICAgICAgICAgIGFsZXJ0KGVycm9yLm1heExlbmd0aCArIFwiS0Lku6XkuIrjga/jgqLjg4Pjg5fjg63jg7zjg4njgafjgY3jgb7jgZvjgpPjgIJcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgYWxlcnQoXCLjgrXjg7zjg5Djg7zjgqjjg6njg7zjgafjgZnjgIJcIilcclxuICAgICAgfVxyXG4gICAgfSkuYmluZCgnZmlsZXVwbG9hZHByb2dyZXNzYWxsJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgdXBsb2FkZXIudXBkYXRlUHJvZ3Jlc3MoZGF0YS5sb2FkZWQgLyBkYXRhLnRvdGFsICogMTAwKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNlxuICoqLyIsImltcG9ydCBJbWFnZUxpc3QgZnJvbSAnLi9JbWFnZUxpc3QnO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRlclxyXG57XHJcbiAgY29uc3RydWN0b3IoJHdyYXBwZXIpe1xyXG4gICAgdGhpcy4kd3JhcHBlciA9ICR3cmFwcGVyO1xyXG4gICAgdGhpcy4kcHJvZ3Jlc3NCYXIgPSAkd3JhcHBlci5maW5kKFwiLnByb2dyZXNzIC5wcm9ncmVzcy1iYXJcIilcclxuICAgIHRoaXMuaW1hZ2VMaXN0ID0gbmV3IEltYWdlTGlzdCh0aGlzLiR3cmFwcGVyKTtcclxuICAgIHRoaXMubWF4Q291bnRNZXNzYWdlID0gdGhpcy4kd3JhcHBlci5hdHRyKCdkYXRhLW1heC1jb3VudC1tZXNzYWdlJyk7XHJcbiAgfVxyXG5cclxuICBnZXRJbWFnZUxpc3QoKXtcclxuICAgIHJldHVybiB0aGlzLmltYWdlTGlzdDtcclxuICB9XHJcblxyXG4gIGdldFNlcnZlckltYWdlcygpe1xyXG4gICAgY29uc3QgaW1hZ2VzID0gW107XHJcbiAgICB0aGlzLiR3cmFwcGVyLmZpbmQoJy5zZXJ2ZXItaW1hZ2VzJykuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCQoZWxlbSkudmFsKCkpO1xyXG4gICAgICBpbWFnZXMucHVzaChpbWFnZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaW1hZ2VzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJvZ3Jlc3MocGVyY2VudFZhbHVlKXtcclxuICAgIHRoaXMuJHByb2dyZXNzQmFyLmNzcygnd2lkdGgnLCBwZXJjZW50VmFsdWUgKyBcIiVcIik7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5SW1hZ2VDb3VudEVycm9yKGZpbGVzKXtcclxuICAgIHZhciAkZGl2ID0gdGhpcy4kd3JhcHBlci5maW5kKCcuaW1hZ2UtZXJyb3InKTtcclxuICAgIGlmKCRkaXYubGVuZ3RoID09IDApe1xyXG4gICAgICAkZGl2ID0gJChgXHJcbjxkaXYgY2xhc3M9XCJpbWFnZS1lcnJvciBhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5cclxuPC9kaXY+XHJcbiAgICAgIGApLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGZpbGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgJGRpdi5yZW1vdmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRkaXYuaHRtbChgXHJcbiAgICAgICAgJHt0aGlzLm1heENvdW50TWVzc2FnZS5zcGxpdCgnJU1heENvdW50JScpLmpvaW4odGhpcy5pbWFnZUxpc3QubWF4Q291bnQpfVxyXG4gICAgICAgIDx1bCBjbGFzcz1cImZpbGUtbGlzdFwiPjwvdWw+XHJcbiAgICAgIGApO1xyXG5cclxuICAgICAgY29uc3QgJHVsID0gJGRpdi5maW5kKCcuZmlsZS1saXN0Jyk7XHJcbiAgICAgIGZpbGVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgJHVsLmFwcGVuZChgPGxpPiR7bmFtZX08L2xpPmApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW1hZ2VVcGxvYWRlci9VcGxvYWRlci5lczZcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZUxpc3Rcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRnbG9iYWxXcmFwcGVyKXtcclxuICAgIHRoaXMuY3VycmVudENvdW50ID0gMDtcclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkZ2xvYmFsV3JhcHBlci5maW5kKFwiLmltYWdlc1wiKTtcclxuICAgIHRoaXMuJHdyYXBwZXJcclxuICAgICAgLnNvcnRhYmxlKHtcclxuXHRcdFx0ICBvcGFjaXR5OiAwLjhcclxuICAgICAgfSlcclxuICAgICAgLmRpc2FibGVTZWxlY3Rpb24oKTtcclxuICAgIHRoaXMubWF4Q291bnQgPSAkZ2xvYmFsV3JhcHBlci5hdHRyKCdkYXRhLW1heC1jb3VudCcpO1xyXG4gICAgdGhpcy50aHVtYldpZHRoID0gJGdsb2JhbFdyYXBwZXIuYXR0cignZGF0YS10aHVtYi13aWR0aCcpO1xyXG4gICAgdGhpcy5kZWxldGVMYWJlbCA9ICRnbG9iYWxXcmFwcGVyLmF0dHIoJ2RhdGEtZGVsZXRlLWxhYmVsJyk7XHJcbiAgICB0aGlzLnN1Ym1pdE5hbWUgPSAkZ2xvYmFsV3JhcHBlci5hdHRyKCdkYXRhLXN1Ym1pdC1uYW1lJylcclxuICB9XHJcblxyXG4gIHJlbW92ZUV4dHJhRmlsZShmaWxlcyl7XHJcbiAgICB2YXIgcmVtb3ZlZCA9IFtdO1xyXG4gICAgd2hpbGUoZmlsZXMubGVuZ3RoID4gdGhpcy5tYXhDb3VudCAtIHRoaXMuY3VycmVudENvdW50KXtcclxuICAgICAgcmVtb3ZlZC5wdXNoKGZpbGVzLnBvcCgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVtb3ZlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeUu+WDj+OCouODg+ODl+ODreODvOODieaemuaVsOOCkuS6iOe0hOOBmeOCi+OAguOCouODg+ODl+ODreODvOODieOBmeOCi+WJjeOBq+WItumZkOOBl+OBn+OBhOOBruOBp+S6i+WJjeOBq+S6iOe0hOOBp+OBjeOCi+OCiOOBhuOBq+OBquOBo+OBpuOBhOOBvuOBmeOAglxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gY291bnQgPSAgICAgICAgICAgICAxIFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICByZXNlcnZlQ291bnQoY291bnQgPSAxKXtcclxuICAgIHRoaXMuY3VycmVudENvdW50ICs9IGNvdW50O1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ291bnQoKXtcclxuICAgIC0tdGhpcy5jdXJyZW50Q291bnQ7XHJcbiAgfVxyXG5cclxuICBhZGRJbWFnZShpbWFnZSl7XHJcbiAgICBjb25zdCAkbGkgPSBpbWFnZS5jcmVhdGVFbGVtZW50KHRoaXMpO1xyXG4gICAgJGxpLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2ltYWdlVXBsb2FkZXIvSW1hZ2VMaXN0LmVzNlxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlXHJcbntcclxuICBjb25zdHJ1Y3RvcihwYXRoKXtcclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbGVtZW50KGltYWdlTGlzdCl7XHJcbiAgICBjb25zdCAkaW1nID0gJCgnPGltZyAvPicpLmF0dHIoXCJzcmNcIiwgdGhpcy5wYXRoKTtcclxuICAgIGlmKGltYWdlTGlzdC50aHVtYldpZHRoKXtcclxuICAgICAgJGltZy5jc3MoXCJ3aWR0aFwiLCBpbWFnZUxpc3QudGh1bWJXaWR0aCtcInB4XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0ICRsaSA9ICQoYFxyXG48bGkgY2xhc3M9XCJpbWFnZSB0aHVtYm5haWwgcHVsbC1sZWZ0XCI+XHJcbiAgPGRpdiBjbGFzcz1cImhlYWRlciBjbGVhcmZpeFwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRhbmdlciBidG4teHMgcHVsbC1yaWdodFwiPiR7aW1hZ2VMaXN0LmRlbGV0ZUxhYmVsfTwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4gIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCIke3RoaXMucGF0aH1cIiBuYW1lPVwiJHtpbWFnZUxpc3Quc3VibWl0TmFtZX1cIj5cclxuPC9saT5cclxuICAgIGApLmFwcGVuZCgkaW1nKTtcclxuXHJcbiAgICAkbGkuZmluZCgnLmRlbGV0ZScpLm9uKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0ICRsaSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCcuaW1hZ2UnKTtcclxuICAgICAgJGxpLnJlbW92ZSgpO1xyXG4gICAgICBpbWFnZUxpc3QucmVtb3ZlQ291bnQoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuICRsaTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlLmVzNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=