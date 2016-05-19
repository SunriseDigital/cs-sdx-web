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
	    e.preventDefault();
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
	      return false;
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
	    }).bind("fileuploadstart", function (e, data) {
	      uploader.showProgress();
	    }).bind("fileuploadsubmit", function (e, data) {
	      //一枚しかアップロードできないときは差し替え。
	      if (images.maxCount == 1) {
	        images.clear();
	      }
	      //多すぎる分を取り除く
	      var removed = images.removeExtraFile(data.files);
	      images.reserveCount(data.files.length);
	
	      //アップロードがキャンセルされた画像を画面に表示
	      uploader.displayImageCountError(removed.map(function (file) {
	        return file.name;
	      }));
	
	      //アップロードする画像が無かったら何もしない。
	      if (data.files.length == 0) {
	        return false;
	      }
	    }).bind("fileuploaddone", function (e, data) {
	      $.each(data.result.files, function (index, file) {
	        var image = new _Image2.default(file.name);
	        images.addImage(image);
	      });
	    }).bind("fileuploadfail", function (e, data) {
	      images.cleanImageCount();
	      try {
	        var error = JSON.parse(data.jqXHR.responseText);
	        if (error.type == "MaxRequestLength") {
	          alert(error.maxLength + "KB以上はアップロードできません。");
	        } else {
	          throw new Error("Unknown error type " + error.type);
	        }
	      } catch (e) {
	        alert("サーバーエラーです。");
	      }
	    }).bind('fileuploadprogressall', function (e, data) {
	      uploader.updateProgress(data.loaded / data.total * 100);
	    }).bind("fileuploadstop", function (e, data) {
	      uploader.hideProgress();
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
	    this.$progressWrapper = $wrapper.find(".progress");
	    this.$progressBar = this.$progressWrapper.find(".progress-bar");
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
	  }, {
	    key: 'showProgress',
	    value: function showProgress() {
	      clearTimeout(this.progressHideTimeout);
	      this.$progressWrapper.fadeTo(200, 1);
	    }
	  }, {
	    key: 'hideProgress',
	    value: function hideProgress() {
	      var _this2 = this;
	
	      this.progressHideTimeout = setTimeout(function () {
	        return _this2.$progressWrapper.fadeTo(300, 0);
	      }, 800);
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
	    this.thumbHeight = $globalWrapper.attr('data-thumb-height');
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
	      var count = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
	      this.currentCount -= count;
	    }
	  }, {
	    key: 'addImage',
	    value: function addImage(image) {
	      var $li = image.createElement(this);
	      $li.appendTo(this.$wrapper);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var $images = this.$wrapper.children();
	      this.removeCount($images.length);
	      $images.remove();
	    }
	  }, {
	    key: 'cleanImageCount',
	    value: function cleanImageCount() {
	      this.currentCount = this.$wrapper.find('.image').length;
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
	      $img.css({
	        display: "block",
	        width: "auto",
	        height: "auto",
	        margin: "auto"
	      });
	
	      var $imgWrapper = $('<div />');
	      $imgWrapper.append($img);
	
	      if (imageList.thumbWidth) {
	        $img.css("max-width", imageList.thumbWidth + "px");
	        $imgWrapper.css("width", imageList.thumbWidth + "px");
	      }
	
	      if (imageList.thumbHeight) {
	        $img.css("max-height", imageList.thumbHeight + "px");
	        $imgWrapper.css("height", imageList.thumbHeight + "px");
	      }
	
	      var $li = $("\n<li class=\"image thumbnail pull-left\">\n  <div class=\"header clearfix\">\n    <button class=\"delete btn btn-danger btn-xs pull-right\">" + imageList.deleteLabel + "</button>\n  </div>\n  <input type=\"hidden\" value=\"" + this.path + "\" name=\"" + imageList.submitName + "\">\n  <a href=\"" + this.path + "\" class=\"holder\"></a>\n</li>\n    ");
	
	      $li.find(".holder").append($imgWrapper).colorbox({
	        maxWidth: '95%',
	        maxHeight: '95%'
	      });
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTUzZGMxNjE3NzQ5YzhiZmIzNjciLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvU29ydC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L3N3YXBBbmltYXRpb24uZXM2Iiwid2VicGFjazovLy8uL2pzL1BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL1VwbG9hZGVyLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlTGlzdC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSx3Qjs7Ozs7Ozs7QUNIQTs7Ozs7O0FBRUEsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QztBQUNELEVBRkQsRTs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZ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bGUiOiJzY2FmZm9sZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNTUzZGMxNjE3NzQ5YzhiZmIzNjdcbiAqKi8iLCJpbXBvcnQgJy4vR3JvdXBTZWxlY3Rvcic7XHJcbmltcG9ydCAnLi9EZWxldGUnO1xyXG5pbXBvcnQgJy4vU29ydCc7XHJcbmltcG9ydCAnLi4vUG9seWZpbGwnO1xyXG5pbXBvcnQgJy4uL2ltYWdlVXBsb2FkZXIvYXBwJ1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL2FwcC5lczZcbiAqKi8iLCIvL0dyb3VwaW5n5pmC44Gu44K444Oj44Oz44OX44Oh44OL44Ol44O8XHJcbmltcG9ydCBqdW1wTWVudSBmcm9tICcuLi9qcXVlcnkvanVtcE1lbnUnO1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJChcIi5zZHgtc2NhZmZvbGQtbGlzdCAuZ3JvdXAtc2VsZWN0b3JcIikuanVtcE1lbnUoKTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNlxuICoqLyIsIiQuZm4uZXh0ZW5kKHtcclxuICBqdW1wTWVudTogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgJHNlbGVjdG9yID0gJCh0aGlzKTtcclxuICAgICAgJHNlbGVjdG9yLm9uKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJHNlbGVjdG9yLnZhbCgpO1xyXG4gICAgICAgIHZhciBuYW1lID0gJHNlbGVjdG9yLmF0dHIoJ25hbWUnKTtcclxuXHJcbiAgICAgICAgdmFyIGV4aXN0cyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBxdWVyaWVzID0gW107XHJcbiAgICAgICAgbG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdCgnJicpLmZvckVhY2goKGtleVZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBpZihrZXlWYWx1ZSl7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICBpZihhcnJbMF0gPT0gbmFtZSl7XHJcbiAgICAgICAgICAgICAgaWYodmFsdWUpIHF1ZXJpZXMucHVzaChuYW1lICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcXVlcmllcy5wdXNoKGFyci5qb2luKCc9JykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKCFleGlzdHMgJiYgdmFsdWUpe1xyXG4gICAgICAgICAgcXVlcmllcy5wdXNoKG5hbWUgKyAnPScgKyB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gICBsb2NhdGlvbi5wYXRobmFtZSArIChxdWVyaWVzLmxlbmd0aCA/IFwiP1wiICsgcXVlcmllcy5qb2luKCcmJykgOiBcIlwiKSArIGxvY2F0aW9uLmhhc2g7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2pxdWVyeS9qdW1wTWVudS5lczZcbiAqKi8iLCIkKCgpID0+IHtcclxuICB2YXIgZGVsZXRlTWVzc2FnZSA9ICQoJ2lucHV0W3R5cGU9aGlkZGVuXVtuYW1lPURlbGV0ZU1lc3NhZ2VdJykudmFsKCk7XHJcbiAgJChcIi5zZHgtc2NhZmZvbGQtbGlzdCAuYnRuLmRlbGV0ZVwiKS5vbignY2xpY2snLCAoZSwgZWxlbSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGl0ZW0gPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcubGlzdC1yb3cnKTtcclxuXHJcbiAgICBpZihjb25maXJtKGRlbGV0ZU1lc3NhZ2UpKXtcclxuICAgICAgdmFyIHBrZXlWYWx1ZXMgPSBpdGVtLmZpbmQoXCJpbnB1dFt0eXBlPWhpZGRlbl1bbmFtZT1wa2V5c11cIikudmFsKCk7XHJcbiAgICAgIHZhciB1cmwgPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgaWYobG9jYXRpb24uc2VhcmNoKXtcclxuICAgICAgICB1cmwgKz0gbG9jYXRpb24uc2VhcmNoICsgJyZkZWxldGU9JyArIHBrZXlWYWx1ZXM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXJsICs9ICc/ZGVsZXRlPScgKyBwa2V5VmFsdWVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1cmwgKz0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9EZWxldGUuZXM2XG4gKiovIiwiaW1wb3J0ICcuLi9qcXVlcnkvc3dhcEFuaW1hdGlvbic7XHJcblxyXG5jbGFzcyBTb3J0ZXJcclxue1xyXG4gIGNvbnN0cnVjdG9yKGxpc3RTZWxlY3Rvcil7XHJcbiAgICB0aGlzLmxpc3RTZWxlY3RvciA9IGxpc3RTZWxlY3RvcjtcclxuICB9XHJcblxyXG4gIC8v5a2Y5Zyo44GX44Gq44GL44Gj44Gf5aC05ZCIJGxpc3RSb3fjgpLjgZ3jga7jgb7jgb7ov5TjgZfjgb7jgZnjgIJcclxuICBfZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIHBvcyl7XHJcbiAgICB2YXIgZmluZEluZGV4O1xyXG4gICAgJGxpc3QuZWFjaCgoaW5kZXgsIHJvdykgPT4ge1xyXG4gICAgICBpZihyb3cgPT09ICRsaXN0Um93WzBdKXtcclxuICAgICAgICBmaW5kSW5kZXggPSBpbmRleDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciB0YXJnZXRJbmRleCA9IGZpbmRJbmRleCArIHBvcztcclxuICAgIGlmKHRhcmdldEluZGV4ID49IDAgJiYgdGFyZ2V0SW5kZXggPCAkbGlzdC5sZW5ndGgpe1xyXG4gICAgICByZXR1cm4gJCgkbGlzdFt0YXJnZXRJbmRleF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICRsaXN0Um93O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3N3YXAoJGVsZW0xLCAkZWxlbTIpe1xyXG4gICAgaWYoJGVsZW0xWzBdICE9PSAkZWxlbTJbMF0pe1xyXG4gICAgICAkLnNkeFN3YXBBbmltYXRpb24oJGVsZW0xLCAkZWxlbTIsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICB2YXIgdG1wID0gJCgnPGxpPicpLmhpZGUoKTtcclxuICAgICAgICAgICRlbGVtMS5iZWZvcmUodG1wKTtcclxuICAgICAgICAgICRlbGVtMi5iZWZvcmUoJGVsZW0xKTtcclxuICAgICAgICAgIHRtcC5yZXBsYWNlV2l0aCgkZWxlbTIpO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cCgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gdGhpcy5fZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIC0xKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgZG93bigkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gdGhpcy5fZmluZFJvdygkbGlzdCwgJGxpc3RSb3csIDEpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICB0b3AoJGxpc3RSb3cpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICB2YXIgJHRhcmdldFJvdyA9ICRsaXN0LmZpcnN0KCk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGJvdHRvbSgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gJGxpc3QubGFzdCgpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VCdXR0b25TdGF0ZSgpe1xyXG4gICAgdmFyICRsaXN0ID0gJCh0aGlzLmxpc3RTZWxlY3Rvcik7XHJcbiAgICAkbGlzdC5maW5kKCcuYnRuLnNvcnQnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICRsaXN0LmZpcnN0KCkuZmluZCgnLmJ0bi5zb3J0LnVwJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAkbGlzdC5sYXN0KCkuZmluZCgnLmJ0bi5zb3J0LmRvd24nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbiQoKCkgPT4ge1xyXG4gIHZhciBzb3J0ZXIgPSBuZXcgU29ydGVyKFwiLmxpc3Qtcm93XCIpO1xyXG4gIHNvcnRlci5jaGFuZ2VCdXR0b25TdGF0ZSgpO1xyXG4gICQoJy5idG4uc29ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyICRidG4gPSAkKHRoaXMpO1xyXG4gICAgdmFyICRsaXN0Um93ID0gJGJ0bi5jbG9zZXN0KCcubGlzdC1yb3cnKTtcclxuXHJcbiAgICBzb3J0ZXJbJGJ0bi5hdHRyKCdkYXRhLXNvcnQtdHlwZScpXSgkbGlzdFJvdyk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvU29ydC5lczZcbiAqKi8iLCIoKCQpID0+IHtcclxuICAkLmV4dGVuZCh7XHJcbiAgICBzZHhNb3ZlVG86IGZ1bmN0aW9uKGVsZW0sIHRhcmdldCwgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgdmFyIGR1bW15ID0gZWxlbS5jbG9uZSgpLmFwcGVuZFRvKGVsZW0ucGFyZW50KCkpO1xyXG4gICAgICBkdW1teVxyXG4gICAgICAgIC5vdXRlcldpZHRoKGVsZW0ub3V0ZXJXaWR0aCgpKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vZmZzZXQoZWxlbS5vZmZzZXQoKSlcclxuICAgICAgICA7XHJcblxyXG4gICAgICAvL3Ry44KSYWJzb2x1ZeOBq+OBmeOCi+OBqOWtkOimgee0oOOBruW5heOCkuWkseOBhuOBruOBp1xyXG4gICAgICBpZihlbGVtLmlzKCd0cicpKXtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtLmNoaWxkcmVuKCk7XHJcbiAgICAgICAgZHVtbXkuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKGtleSwgY2hpbGQpe1xyXG4gICAgICAgICAgJChjaGlsZCkub3V0ZXJXaWR0aChjaGlsZHJlbi5lcShrZXkpLm91dGVyV2lkdGgoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC8vIGVsZW0uZGF0YSgnc3dhcER1bW15JywgZHVtbXkpO1xyXG4gICAgICBcclxuICAgICAgKG9wdGlvbnMub25DcmVhdGVEdW1teXx8JC5ub29wKShlbGVtLCBkdW1teSk7XHJcbiAgICAgIFxyXG4gICAgICBlbGVtLmNzcyh7dmlzaWJpbGl0eTogJ2hpZGRlbid9KTtcclxuICAgICAgZHVtbXkuYW5pbWF0ZSgge3RvcDogdGFyZ2V0LnBvc2l0aW9uKCkudG9wfSwge1xyXG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgZHVtbXkucmVtb3ZlKCk7XHJcbiAgICAgICAgICBlbGVtLmNzcyh7dmlzaWJpbGl0eTogJ3Zpc2libGUnfSk7XHJcbiAgICAgICAgICBvcHRpb25zLm9uQ29tcGxldGUoZWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuICAkLmV4dGVuZCh7XHJcbiAgICBzZHhTd2FwQW5pbWF0aW9uOiBmdW5jdGlvbihlbGVtMSwgZWxlbTIsIG9wdGlvbnMpe1xyXG5cclxuICAgICAgaWYoZWxlbTEubGVuZ3RoIDwgMSB8fCBlbGVtMi5sZW5ndGggPCAxKVxyXG4gICAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICB2YXIgZW5kID0gW107XHJcbiAgICAgIHZhciBfYWxsQ29tcGxldGUgPSBmdW5jdGlvbigpXHJcbiAgICAgIHtcclxuICAgICAgICBlbmQucHVzaCh0cnVlKTtcclxuICAgICAgICBpZihlbmQubGVuZ3RoID09IDIpXHJcbiAgICAgICAgeyAgICAgICAgIFxyXG4gICAgICAgICAgKG9wdGlvbnMub25Db21wbGV0ZXx8JC5ub29wKSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgJC5zZHhNb3ZlVG8oZWxlbTEsIGVsZW0yLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIF9hbGxDb21wbGV0ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DcmVhdGVEdW1teTogKG9wdGlvbnMub25DcmVhdGVEdW1teXx8JC5ub29wKSxcclxuICAgICAgICBkdXJhdGlvbjogKG9wdGlvbnMuZHVyYXRpb258fDMwMClcclxuICAgICAgfSk7XHJcbiAgICAgICQuc2R4TW92ZVRvKGVsZW0yLCBlbGVtMSwge1xyXG4gICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgICAgX2FsbENvbXBsZXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNyZWF0ZUR1bW15OiAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApLFxyXG4gICAgICAgIGR1cmF0aW9uOiAob3B0aW9ucy5kdXJhdGlvbnx8MzAwKVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIChvcHRpb25zLm9uU3RhcnRlZHx8JC5ub29wKSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KShqUXVlcnkpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvanF1ZXJ5L3N3YXBBbmltYXRpb24uZXM2XG4gKiovIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KSB7XHJcbiAgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xyXG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuICAgIH1cclxuICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpO1xyXG4gICAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xyXG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XHJcbiAgICB2YXIgdmFsdWU7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICB2YWx1ZSA9IGxpc3RbaV07XHJcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH07XHJcbn1cclxuXHJcblxyXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCkge1xyXG4gIFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcclxuICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcclxuICAgIHJldHVybiB0aGlzLmxhc3RJbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pID09PSBwb3NpdGlvbjtcclxuICB9O1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL1BvbHlmaWxsLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFVwbG9hZGVyIGZyb20gJy4vVXBsb2FkZXInO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZSc7XHJcbiQoKCkgPT4ge1xyXG4gICQoXCIuc2R4LWltYWdlLXVwbG9hZGVyIGlucHV0W3R5cGU9ZmlsZV1cIikuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcblxyXG4gICAgY29uc3QgJGVsZW0gPSAkKGVsZW0pO1xyXG4gICAgY29uc3QgdXBsb2FkZXIgPSBuZXcgVXBsb2FkZXIoJGVsZW0uY2xvc2VzdChcIi5zZHgtaW1hZ2UtdXBsb2FkZXJcIikpO1xyXG4gICAgY29uc3QgaW1hZ2VzID0gdXBsb2FkZXIuZ2V0SW1hZ2VMaXN0KCk7XHJcblxyXG4gICAgdXBsb2FkZXIuZ2V0U2VydmVySW1hZ2VzKCkuZm9yRWFjaChpbWFnZSA9PiB7XHJcbiAgICAgIGltYWdlcy5hZGRJbWFnZShpbWFnZSk7XHJcbiAgICAgIGltYWdlcy5yZXNlcnZlQ291bnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRlbGVtLmZpbGV1cGxvYWQoe1xyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBzaW5nbGVGaWxlVXBsb2FkczogZmFsc2UsXHJcbiAgICAgIHNlcXVlbnRpYWxVcGxvYWRzOiB0cnVlLFxyXG4gICAgICBsaW1pdE11bHRpRmlsZVVwbG9hZFNpemU6IDQwOTYgKiAxMDI0LFxyXG4gICAgICBmb3JtRGF0YToge25hbWU6ICRlbGVtLmF0dHIoXCJuYW1lXCIpfVxyXG4gICAgfSkuYmluZChcImZpbGV1cGxvYWRzdGFydFwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICB1cGxvYWRlci5zaG93UHJvZ3Jlc3MoKTtcclxuICAgIH0pLmJpbmQoXCJmaWxldXBsb2Fkc3VibWl0XCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgIC8v5LiA5p6a44GX44GL44Ki44OD44OX44Ot44O844OJ44Gn44GN44Gq44GE44Go44GN44Gv5beu44GX5pu/44GI44CCXHJcbiAgICAgIGlmKGltYWdlcy5tYXhDb3VudCA9PSAxKXtcclxuICAgICAgICBpbWFnZXMuY2xlYXIoKTtcclxuICAgICAgfVxyXG4gICAgICAvL+WkmuOBmeOBjuOCi+WIhuOCkuWPluOCiumZpOOBj1xyXG4gICAgICB2YXIgcmVtb3ZlZCA9IGltYWdlcy5yZW1vdmVFeHRyYUZpbGUoZGF0YS5maWxlcyk7XHJcbiAgICAgIGltYWdlcy5yZXNlcnZlQ291bnQoZGF0YS5maWxlcy5sZW5ndGgpO1xyXG5cclxuICAgICAgLy/jgqLjg4Pjg5fjg63jg7zjg4njgYzjgq3jg6Pjg7Pjgrvjg6vjgZXjgozjgZ/nlLvlg4/jgpLnlLvpnaLjgavooajnpLpcclxuICAgICAgdXBsb2FkZXIuZGlzcGxheUltYWdlQ291bnRFcnJvcihyZW1vdmVkLm1hcChmaWxlID0+IGZpbGUubmFtZSkpXHJcblxyXG4gICAgICAvL+OCouODg+ODl+ODreODvOODieOBmeOCi+eUu+WDj+OBjOeEoeOBi+OBo+OBn+OCieS9leOCguOBl+OBquOBhOOAglxyXG4gICAgICBpZihkYXRhLmZpbGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pLmJpbmQoXCJmaWxldXBsb2FkZG9uZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAkLmVhY2goZGF0YS5yZXN1bHQuZmlsZXMsIGZ1bmN0aW9uIChpbmRleCwgZmlsZSkge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKGZpbGUubmFtZSk7XHJcbiAgICAgICAgaW1hZ2VzLmFkZEltYWdlKGltYWdlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KS5iaW5kKFwiZmlsZXVwbG9hZGZhaWxcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgaW1hZ2VzLmNsZWFuSW1hZ2VDb3VudCgpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciBlcnJvciA9IEpTT04ucGFyc2UoZGF0YS5qcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGlmIChlcnJvci50eXBlID09IFwiTWF4UmVxdWVzdExlbmd0aFwiKSB7XHJcbiAgICAgICAgICBhbGVydChlcnJvci5tYXhMZW5ndGggKyBcIktC5Lul5LiK44Gv44Ki44OD44OX44Ot44O844OJ44Gn44GN44G+44Gb44KT44CCXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVycm9yIHR5cGUgXCIgKyBlcnJvci50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBhbGVydChcIuOCteODvOODkOODvOOCqOODqeODvOOBp+OBmeOAglwiKVxyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKCdmaWxldXBsb2FkcHJvZ3Jlc3NhbGwnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICB1cGxvYWRlci51cGRhdGVQcm9ncmVzcyhkYXRhLmxvYWRlZCAvIGRhdGEudG90YWwgKiAxMDApO1xyXG4gICAgfSkuYmluZChcImZpbGV1cGxvYWRzdG9wXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgIHVwbG9hZGVyLmhpZGVQcm9ncmVzcygpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNlxuICoqLyIsImltcG9ydCBJbWFnZUxpc3QgZnJvbSAnLi9JbWFnZUxpc3QnO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRlclxyXG57XHJcbiAgY29uc3RydWN0b3IoJHdyYXBwZXIpe1xyXG4gICAgdGhpcy4kd3JhcHBlciA9ICR3cmFwcGVyO1xyXG4gICAgdGhpcy4kcHJvZ3Jlc3NXcmFwcGVyID0gJHdyYXBwZXIuZmluZChcIi5wcm9ncmVzc1wiKTtcclxuICAgIHRoaXMuJHByb2dyZXNzQmFyID0gdGhpcy4kcHJvZ3Jlc3NXcmFwcGVyLmZpbmQoXCIucHJvZ3Jlc3MtYmFyXCIpXHJcbiAgICB0aGlzLmltYWdlTGlzdCA9IG5ldyBJbWFnZUxpc3QodGhpcy4kd3JhcHBlcik7XHJcbiAgICB0aGlzLm1heENvdW50TWVzc2FnZSA9IHRoaXMuJHdyYXBwZXIuYXR0cignZGF0YS1tYXgtY291bnQtbWVzc2FnZScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW1hZ2VMaXN0KCl7XHJcbiAgICByZXR1cm4gdGhpcy5pbWFnZUxpc3Q7XHJcbiAgfVxyXG5cclxuICBnZXRTZXJ2ZXJJbWFnZXMoKXtcclxuICAgIGNvbnN0IGltYWdlcyA9IFtdO1xyXG4gICAgdGhpcy4kd3JhcHBlci5maW5kKCcuc2VydmVyLWltYWdlcycpLmVhY2goKGtleSwgZWxlbSkgPT4ge1xyXG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgkKGVsZW0pLnZhbCgpKTtcclxuICAgICAgaW1hZ2VzLnB1c2goaW1hZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGltYWdlcztcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByb2dyZXNzKHBlcmNlbnRWYWx1ZSl7XHJcbiAgICB0aGlzLiRwcm9ncmVzc0Jhci5jc3MoJ3dpZHRoJywgcGVyY2VudFZhbHVlICsgXCIlXCIpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUltYWdlQ291bnRFcnJvcihmaWxlcyl7XHJcbiAgICB2YXIgJGRpdiA9IHRoaXMuJHdyYXBwZXIuZmluZCgnLmltYWdlLWVycm9yJyk7XHJcbiAgICBpZigkZGl2Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgJGRpdiA9ICQoYFxyXG48ZGl2IGNsYXNzPVwiaW1hZ2UtZXJyb3IgYWxlcnQgYWxlcnQtZGFuZ2VyXCIgcm9sZT1cImFsZXJ0XCI+XHJcbjwvZGl2PlxyXG4gICAgICBgKS5hcHBlbmRUbyh0aGlzLiR3cmFwcGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihmaWxlcy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICRkaXYucmVtb3ZlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkZGl2Lmh0bWwoYFxyXG4gICAgICAgICR7dGhpcy5tYXhDb3VudE1lc3NhZ2Uuc3BsaXQoJyVNYXhDb3VudCUnKS5qb2luKHRoaXMuaW1hZ2VMaXN0Lm1heENvdW50KX1cclxuICAgICAgICA8dWwgY2xhc3M9XCJmaWxlLWxpc3RcIj48L3VsPlxyXG4gICAgICBgKTtcclxuXHJcbiAgICAgIGNvbnN0ICR1bCA9ICRkaXYuZmluZCgnLmZpbGUtbGlzdCcpO1xyXG4gICAgICBmaWxlcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgICR1bC5hcHBlbmQoYDxsaT4ke25hbWV9PC9saT5gKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93UHJvZ3Jlc3MoKXtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnByb2dyZXNzSGlkZVRpbWVvdXQpO1xyXG4gICAgdGhpcy4kcHJvZ3Jlc3NXcmFwcGVyLmZhZGVUbygyMDAsIDEpO1xyXG4gIH1cclxuXHJcbiAgaGlkZVByb2dyZXNzKCl7XHJcbiAgICB0aGlzLnByb2dyZXNzSGlkZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuJHByb2dyZXNzV3JhcHBlci5mYWRlVG8oMzAwLCAwKSwgODAwKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbWFnZVVwbG9hZGVyL1VwbG9hZGVyLmVzNlxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlTGlzdFxyXG57XHJcbiAgY29uc3RydWN0b3IoJGdsb2JhbFdyYXBwZXIpe1xyXG4gICAgdGhpcy5jdXJyZW50Q291bnQgPSAwO1xyXG4gICAgdGhpcy4kd3JhcHBlciA9ICRnbG9iYWxXcmFwcGVyLmZpbmQoXCIuaW1hZ2VzXCIpO1xyXG4gICAgdGhpcy4kd3JhcHBlclxyXG4gICAgICAuc29ydGFibGUoe1xyXG5cdFx0XHQgIG9wYWNpdHk6IDAuOFxyXG4gICAgICB9KVxyXG4gICAgICAuZGlzYWJsZVNlbGVjdGlvbigpO1xyXG4gICAgdGhpcy5tYXhDb3VudCA9ICRnbG9iYWxXcmFwcGVyLmF0dHIoJ2RhdGEtbWF4LWNvdW50Jyk7XHJcbiAgICB0aGlzLnRodW1iV2lkdGggPSAkZ2xvYmFsV3JhcHBlci5hdHRyKCdkYXRhLXRodW1iLXdpZHRoJyk7XHJcbiAgICB0aGlzLnRodW1iSGVpZ2h0ID0gJGdsb2JhbFdyYXBwZXIuYXR0cignZGF0YS10aHVtYi1oZWlnaHQnKTtcclxuICAgIHRoaXMuZGVsZXRlTGFiZWwgPSAkZ2xvYmFsV3JhcHBlci5hdHRyKCdkYXRhLWRlbGV0ZS1sYWJlbCcpO1xyXG4gICAgdGhpcy5zdWJtaXROYW1lID0gJGdsb2JhbFdyYXBwZXIuYXR0cignZGF0YS1zdWJtaXQtbmFtZScpXHJcbiAgfVxyXG5cclxuICByZW1vdmVFeHRyYUZpbGUoZmlsZXMpe1xyXG4gICAgdmFyIHJlbW92ZWQgPSBbXTtcclxuICAgIHdoaWxlKGZpbGVzLmxlbmd0aCA+IHRoaXMubWF4Q291bnQgLSB0aGlzLmN1cnJlbnRDb3VudCl7XHJcbiAgICAgIHJlbW92ZWQucHVzaChmaWxlcy5wb3AoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnlLvlg4/jgqLjg4Pjg5fjg63jg7zjg4nmnprmlbDjgpLkuojntITjgZnjgovjgILjgqLjg4Pjg5fjg63jg7zjg4njgZnjgovliY3jgavliLbpmZDjgZfjgZ/jgYTjga7jgafkuovliY3jgavkuojntITjgafjgY3jgovjgojjgYbjgavjgarjgaPjgabjgYTjgb7jgZnjgIJcclxuICAgKiBAcGFyYW0gIHtbdHlwZV19IGNvdW50ID0gICAgICAgICAgICAgMSBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgcmVzZXJ2ZUNvdW50KGNvdW50ID0gMSl7XHJcbiAgICB0aGlzLmN1cnJlbnRDb3VudCArPSBjb3VudDtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNvdW50KGNvdW50ID0gMSl7XHJcbiAgICB0aGlzLmN1cnJlbnRDb3VudCAtPSBjb3VudDtcclxuICB9XHJcblxyXG4gIGFkZEltYWdlKGltYWdlKXtcclxuICAgIGNvbnN0ICRsaSA9IGltYWdlLmNyZWF0ZUVsZW1lbnQodGhpcyk7XHJcbiAgICAkbGkuYXBwZW5kVG8odGhpcy4kd3JhcHBlcik7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpe1xyXG4gICAgdmFyICRpbWFnZXMgPSB0aGlzLiR3cmFwcGVyLmNoaWxkcmVuKCk7XHJcbiAgICB0aGlzLnJlbW92ZUNvdW50KCRpbWFnZXMubGVuZ3RoKTtcclxuICAgICRpbWFnZXMucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBjbGVhbkltYWdlQ291bnQoKXtcclxuICAgIHRoaXMuY3VycmVudENvdW50ID0gdGhpcy4kd3JhcHBlci5maW5kKCcuaW1hZ2UnKS5sZW5ndGg7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZUxpc3QuZXM2XG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Vcclxue1xyXG4gIGNvbnN0cnVjdG9yKHBhdGgpe1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVsZW1lbnQoaW1hZ2VMaXN0KXtcclxuICAgIGNvbnN0ICRpbWcgPSAkKCc8aW1nIC8+JykuYXR0cihcInNyY1wiLCB0aGlzLnBhdGgpO1xyXG4gICAgJGltZy5jc3Moe1xyXG4gICAgICBkaXNwbGF5OiBcImJsb2NrXCIsXHJcbiAgICAgIHdpZHRoOiBcImF1dG9cIixcclxuICAgICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgICAgbWFyZ2luOiBcImF1dG9cIlxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgJGltZ1dyYXBwZXIgPSAkKCc8ZGl2IC8+Jyk7XHJcbiAgICAkaW1nV3JhcHBlci5hcHBlbmQoJGltZyk7XHJcblxyXG4gICAgaWYoaW1hZ2VMaXN0LnRodW1iV2lkdGgpe1xyXG4gICAgICAkaW1nLmNzcyhcIm1heC13aWR0aFwiLCBpbWFnZUxpc3QudGh1bWJXaWR0aCtcInB4XCIpO1xyXG4gICAgICAkaW1nV3JhcHBlci5jc3MoXCJ3aWR0aFwiLCBpbWFnZUxpc3QudGh1bWJXaWR0aCtcInB4XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGltYWdlTGlzdC50aHVtYkhlaWdodCl7XHJcbiAgICAgICRpbWcuY3NzKFwibWF4LWhlaWdodFwiLCBpbWFnZUxpc3QudGh1bWJIZWlnaHQrXCJweFwiKTtcclxuICAgICAgJGltZ1dyYXBwZXIuY3NzKFwiaGVpZ2h0XCIsIGltYWdlTGlzdC50aHVtYkhlaWdodCtcInB4XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0ICRsaSA9ICQoYFxyXG48bGkgY2xhc3M9XCJpbWFnZSB0aHVtYm5haWwgcHVsbC1sZWZ0XCI+XHJcbiAgPGRpdiBjbGFzcz1cImhlYWRlciBjbGVhcmZpeFwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRhbmdlciBidG4teHMgcHVsbC1yaWdodFwiPiR7aW1hZ2VMaXN0LmRlbGV0ZUxhYmVsfTwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4gIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCIke3RoaXMucGF0aH1cIiBuYW1lPVwiJHtpbWFnZUxpc3Quc3VibWl0TmFtZX1cIj5cclxuICA8YSBocmVmPVwiJHt0aGlzLnBhdGh9XCIgY2xhc3M9XCJob2xkZXJcIj48L2E+XHJcbjwvbGk+XHJcbiAgICBgKTtcclxuXHJcbiAgICAkbGkuZmluZChcIi5ob2xkZXJcIilcclxuICAgICAgLmFwcGVuZCgkaW1nV3JhcHBlcilcclxuICAgICAgLmNvbG9yYm94KHtcclxuICAgICAgICBtYXhXaWR0aDogJzk1JScsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiAnOTUlJ1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAkbGkuZmluZCgnLmRlbGV0ZScpLm9uKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0ICRsaSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCcuaW1hZ2UnKTtcclxuICAgICAgJGxpLnJlbW92ZSgpO1xyXG4gICAgICBpbWFnZUxpc3QucmVtb3ZlQ291bnQoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuICRsaTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlLmVzNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=