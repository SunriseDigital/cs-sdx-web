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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGY5MThjZGQ4OWZlODFkNzViNDkiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9zY2FmZm9sZC9Hcm91cFNlbGVjdG9yLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9qcXVlcnkvanVtcE1lbnUuZXM2Iiwid2VicGFjazovLy8uL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvc2NhZmZvbGQvU29ydC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvanF1ZXJ5L3N3YXBBbmltYXRpb24uZXM2Iiwid2VicGFjazovLy8uL2pzL1BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL1VwbG9hZGVyLmVzNiIsIndlYnBhY2s6Ly8vLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlTGlzdC5lczYiLCJ3ZWJwYWNrOi8vLy4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSx3Qjs7Ozs7Ozs7QUNIQTs7Ozs7O0FBRUEsR0FBRSxZQUFNO0FBQ04sS0FBRSxvQ0FBRixFQUF3QyxRQUF4QztBQUNELEVBRkQsRTs7Ozs7Ozs7QUNIQSxHQUFFLEVBQUYsQ0FBSyxNQUFMLENBQVk7QUFDVixhQUFVLG9CQUFVO0FBQ2xCLFVBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsV0FBSSxZ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LFdBQUksUUFBSixDQUFhLEtBQUssUUFBbEI7QUFDRDs7OzZCQUVNO0FBQ0wsV0FBSSxVQUFVLEtBQUssUUFBTCxDQUFjLFFBQWQsRUFBZDtBQUNBLFlBQUssV0FBTCxDQUFpQixRQUFRLE1BQXpCO0FBQ0EsZUFBUSxNQUFSO0FBQ0Q7Ozs7OzttQkE5Q2tCLFM7Ozs7Ozs7Ozs7Ozs7Ozs7S0NBQSxLO0FBRW5CLGtCQUFZLElBQVosRUFBaUI7QUFBQTs7QUFDZixVQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0Q7Ozs7bUNBRWEsUyxFQUFVO0FBQ3RCLFdBQU0sT0FBTyxFQUFFLFNBQUYsRUFBYSxJQUFiLENBQWtCLEtBQWxCLEVBQXlCLEtBQUssSUFBOUIsQ0FBYjtBQUNBLFdBQUcsVUFBVSxVQUFiLEVBQXdCO0FBQ3RCLGNBQUssR0FBTCxDQUFTLE9BQVQsRUFBa0IsVUFBVSxVQUFWLEdBQXFCLElBQXZDO0FBQ0Q7O0FBRUQsV0FBTSxNQUFNLG9KQUc4QyxVQUFVLFdBSHhELDhEQUtnQixLQUFLLElBTHJCLGtCQUtvQyxVQUFVLFVBTDlDLHVCQU9ULE1BUFMsQ0FPRixJQVBFLENBQVo7O0FBU0EsV0FBSSxJQUFKLENBQVMsU0FBVCxFQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxhQUFLO0FBQ25DLFdBQUUsY0FBRjtBQUNBLGFBQU0sTUFBTSxFQUFFLEVBQUUsYUFBSixFQUFtQixPQUFuQixDQUEyQixRQUEzQixDQUFaO0FBQ0EsYUFBSSxNQUFKO0FBQ0EsbUJBQVUsV0FBVjtBQUNBLGdCQUFPLEtBQVA7QUFDRCxRQU5EOztBQVFBLGNBQU8sR0FBUDtBQUNEOzs7Ozs7bUJBOUJrQixLIiwiZmlsZSI6InNjYWZmb2xkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkZjkxOGNkZDg5ZmU4MWQ3NWI0OVxuICoqLyIsImltcG9ydCAnLi9Hcm91cFNlbGVjdG9yJztcclxuaW1wb3J0ICcuL0RlbGV0ZSc7XHJcbmltcG9ydCAnLi9Tb3J0JztcclxuaW1wb3J0ICcuLi9Qb2x5ZmlsbCc7XHJcbmltcG9ydCAnLi4vaW1hZ2VVcGxvYWRlci9hcHAnXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvc2NhZmZvbGQvYXBwLmVzNlxuICoqLyIsIi8vR3JvdXBpbmfmmYLjga7jgrjjg6Pjg7Pjg5fjg6Hjg4vjg6Xjg7xcclxuaW1wb3J0IGp1bXBNZW51IGZyb20gJy4uL2pxdWVyeS9qdW1wTWVudSc7XHJcblxyXG4kKCgpID0+IHtcclxuICAkKFwiLnNkeC1zY2FmZm9sZC1saXN0IC5ncm91cC1zZWxlY3RvclwiKS5qdW1wTWVudSgpO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL0dyb3VwU2VsZWN0b3IuZXM2XG4gKiovIiwiJC5mbi5leHRlbmQoe1xyXG4gIGp1bXBNZW51OiBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkc2VsZWN0b3IgPSAkKHRoaXMpO1xyXG4gICAgICAkc2VsZWN0b3Iub24oXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICB2YXIgdmFsdWUgPSAkc2VsZWN0b3IudmFsKCk7XHJcbiAgICAgICAgdmFyIG5hbWUgPSAkc2VsZWN0b3IuYXR0cignbmFtZScpO1xyXG5cclxuICAgICAgICB2YXIgZXhpc3RzID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHF1ZXJpZXMgPSBbXTtcclxuICAgICAgICBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KCcmJykuZm9yRWFjaCgoa2V5VmFsdWUpID0+IHtcclxuICAgICAgICAgIGlmKGtleVZhbHVlKXtcclxuICAgICAgICAgICAgdmFyIGFyciA9IGtleVZhbHVlLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgIGlmKGFyclswXSA9PSBuYW1lKXtcclxuICAgICAgICAgICAgICBpZih2YWx1ZSkgcXVlcmllcy5wdXNoKG5hbWUgKyAnPScgKyB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBxdWVyaWVzLnB1c2goYXJyLmpvaW4oJz0nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoIWV4aXN0cyAmJiB2YWx1ZSl7XHJcbiAgICAgICAgICBxdWVyaWVzLnB1c2gobmFtZSArICc9JyArIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAgIGxvY2F0aW9uLnBhdGhuYW1lICsgKHF1ZXJpZXMubGVuZ3RoID8gXCI/XCIgKyBxdWVyaWVzLmpvaW4oJyYnKSA6IFwiXCIpICsgbG9jYXRpb24uaGFzaDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvanF1ZXJ5L2p1bXBNZW51LmVzNlxuICoqLyIsIiQoKCkgPT4ge1xyXG4gIHZhciBkZWxldGVNZXNzYWdlID0gJCgnaW5wdXRbdHlwZT1oaWRkZW5dW25hbWU9RGVsZXRlTWVzc2FnZV0nKS52YWwoKTtcclxuICAkKFwiLnNkeC1zY2FmZm9sZC1saXN0IC5idG4uZGVsZXRlXCIpLm9uKCdjbGljaycsIChlLCBlbGVtKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaXRlbSA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5saXN0LXJvdycpO1xyXG5cclxuICAgIGlmKGNvbmZpcm0oZGVsZXRlTWVzc2FnZSkpe1xyXG4gICAgICB2YXIgcGtleVZhbHVlcyA9IGl0ZW0uZmluZChcImlucHV0W3R5cGU9aGlkZGVuXVtuYW1lPXBrZXlzXVwiKS52YWwoKTtcclxuICAgICAgdmFyIHVybCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICBpZihsb2NhdGlvbi5zZWFyY2gpe1xyXG4gICAgICAgIHVybCArPSBsb2NhdGlvbi5zZWFyY2ggKyAnJmRlbGV0ZT0nICsgcGtleVZhbHVlcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1cmwgKz0gJz9kZWxldGU9JyArIHBrZXlWYWx1ZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVybCArPSBsb2NhdGlvbi5oYXNoO1xyXG4gICAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3NjYWZmb2xkL0RlbGV0ZS5lczZcbiAqKi8iLCJpbXBvcnQgJy4uL2pxdWVyeS9zd2FwQW5pbWF0aW9uJztcclxuXHJcbmNsYXNzIFNvcnRlclxyXG57XHJcbiAgY29uc3RydWN0b3IobGlzdFNlbGVjdG9yKXtcclxuICAgIHRoaXMubGlzdFNlbGVjdG9yID0gbGlzdFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgLy/lrZjlnKjjgZfjgarjgYvjgaPjgZ/loLTlkIgkbGlzdFJvd+OCkuOBneOBruOBvuOBvui/lOOBl+OBvuOBmeOAglxyXG4gIF9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgcG9zKXtcclxuICAgIHZhciBmaW5kSW5kZXg7XHJcbiAgICAkbGlzdC5lYWNoKChpbmRleCwgcm93KSA9PiB7XHJcbiAgICAgIGlmKHJvdyA9PT0gJGxpc3RSb3dbMF0pe1xyXG4gICAgICAgIGZpbmRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHRhcmdldEluZGV4ID0gZmluZEluZGV4ICsgcG9zO1xyXG4gICAgaWYodGFyZ2V0SW5kZXggPj0gMCAmJiB0YXJnZXRJbmRleCA8ICRsaXN0Lmxlbmd0aCl7XHJcbiAgICAgIHJldHVybiAkKCRsaXN0W3RhcmdldEluZGV4XSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJGxpc3RSb3c7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc3dhcCgkZWxlbTEsICRlbGVtMil7XHJcbiAgICBpZigkZWxlbTFbMF0gIT09ICRlbGVtMlswXSl7XHJcbiAgICAgICQuc2R4U3dhcEFuaW1hdGlvbigkZWxlbTEsICRlbGVtMiwge1xyXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIHZhciB0bXAgPSAkKCc8bGk+JykuaGlkZSgpO1xyXG4gICAgICAgICAgJGVsZW0xLmJlZm9yZSh0bXApO1xyXG4gICAgICAgICAgJGVsZW0yLmJlZm9yZSgkZWxlbTEpO1xyXG4gICAgICAgICAgdG1wLnJlcGxhY2VXaXRoKCRlbGVtMik7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSB0aGlzLl9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgLTEpO1xyXG4gICAgdGhpcy5fc3dhcCgkbGlzdFJvdywgJHRhcmdldFJvdyk7XHJcbiAgfVxyXG5cclxuICBkb3duKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSB0aGlzLl9maW5kUm93KCRsaXN0LCAkbGlzdFJvdywgMSk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIHRvcCgkbGlzdFJvdyl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgIHZhciAkdGFyZ2V0Um93ID0gJGxpc3QuZmlyc3QoKTtcclxuICAgIHRoaXMuX3N3YXAoJGxpc3RSb3csICR0YXJnZXRSb3cpO1xyXG4gIH1cclxuXHJcbiAgYm90dG9tKCRsaXN0Um93KXtcclxuICAgIHZhciAkbGlzdCA9ICQodGhpcy5saXN0U2VsZWN0b3IpO1xyXG4gICAgdmFyICR0YXJnZXRSb3cgPSAkbGlzdC5sYXN0KCk7XHJcbiAgICB0aGlzLl9zd2FwKCRsaXN0Um93LCAkdGFyZ2V0Um93KTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJ1dHRvblN0YXRlKCl7XHJcbiAgICB2YXIgJGxpc3QgPSAkKHRoaXMubGlzdFNlbGVjdG9yKTtcclxuICAgICRsaXN0LmZpbmQoJy5idG4uc29ydCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJGxpc3QuZmlyc3QoKS5maW5kKCcuYnRuLnNvcnQudXAnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICRsaXN0Lmxhc3QoKS5maW5kKCcuYnRuLnNvcnQuZG93bicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gIH1cclxufVxyXG5cclxuJCgoKSA9PiB7XHJcbiAgdmFyIHNvcnRlciA9IG5ldyBTb3J0ZXIoXCIubGlzdC1yb3dcIik7XHJcbiAgc29ydGVyLmNoYW5nZUJ1dHRvblN0YXRlKCk7XHJcbiAgJCgnLmJ0bi5zb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgJGJ0biA9ICQodGhpcyk7XHJcbiAgICB2YXIgJGxpc3RSb3cgPSAkYnRuLmNsb3Nlc3QoJy5saXN0LXJvdycpO1xyXG5cclxuICAgIHNvcnRlclskYnRuLmF0dHIoJ2RhdGEtc29ydC10eXBlJyldKCRsaXN0Um93KTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zY2FmZm9sZC9Tb3J0LmVzNlxuICoqLyIsIigoJCkgPT4ge1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeE1vdmVUbzogZnVuY3Rpb24oZWxlbSwgdGFyZ2V0LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICB2YXIgZHVtbXkgPSBlbGVtLmNsb25lKCkuYXBwZW5kVG8oZWxlbS5wYXJlbnQoKSk7XHJcbiAgICAgIGR1bW15XHJcbiAgICAgICAgLm91dGVyV2lkdGgoZWxlbS5vdXRlcldpZHRoKCkpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9mZnNldChlbGVtLm9mZnNldCgpKVxyXG4gICAgICAgIDtcclxuXHJcbiAgICAgIC8vdHLjgpJhYnNvbHVl44Gr44GZ44KL44Go5a2Q6KaB57Sg44Gu5bmF44KS5aSx44GG44Gu44GnXHJcbiAgICAgIGlmKGVsZW0uaXMoJ3RyJykpe1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW4oKTtcclxuICAgICAgICBkdW1teS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oa2V5LCBjaGlsZCl7XHJcbiAgICAgICAgICAkKGNoaWxkKS5vdXRlcldpZHRoKGNoaWxkcmVuLmVxKGtleSkub3V0ZXJXaWR0aCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLy8gZWxlbS5kYXRhKCdzd2FwRHVtbXknLCBkdW1teSk7XHJcbiAgICAgIFxyXG4gICAgICAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApKGVsZW0sIGR1bW15KTtcclxuICAgICAgXHJcbiAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAnaGlkZGVuJ30pO1xyXG4gICAgICBkdW1teS5hbmltYXRlKCB7dG9wOiB0YXJnZXQucG9zaXRpb24oKS50b3B9LCB7XHJcbiAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBkdW1teS5yZW1vdmUoKTtcclxuICAgICAgICAgIGVsZW0uY3NzKHt2aXNpYmlsaXR5OiAndmlzaWJsZSd9KTtcclxuICAgICAgICAgIG9wdGlvbnMub25Db21wbGV0ZShlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQuZXh0ZW5kKHtcclxuICAgIHNkeFN3YXBBbmltYXRpb246IGZ1bmN0aW9uKGVsZW0xLCBlbGVtMiwgb3B0aW9ucyl7XHJcblxyXG4gICAgICBpZihlbGVtMS5sZW5ndGggPCAxIHx8IGVsZW0yLmxlbmd0aCA8IDEpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHZhciBlbmQgPSBbXTtcclxuICAgICAgdmFyIF9hbGxDb21wbGV0ZSA9IGZ1bmN0aW9uKClcclxuICAgICAge1xyXG4gICAgICAgIGVuZC5wdXNoKHRydWUpO1xyXG4gICAgICAgIGlmKGVuZC5sZW5ndGggPT0gMilcclxuICAgICAgICB7ICAgICAgICAgXHJcbiAgICAgICAgICAob3B0aW9ucy5vbkNvbXBsZXRlfHwkLm5vb3ApKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAkLnNkeE1vdmVUbyhlbGVtMSwgZWxlbTIsIHtcclxuICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgX2FsbENvbXBsZXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNyZWF0ZUR1bW15OiAob3B0aW9ucy5vbkNyZWF0ZUR1bW15fHwkLm5vb3ApLFxyXG4gICAgICAgIGR1cmF0aW9uOiAob3B0aW9ucy5kdXJhdGlvbnx8MzAwKVxyXG4gICAgICB9KTtcclxuICAgICAgJC5zZHhNb3ZlVG8oZWxlbTIsIGVsZW0xLCB7XHJcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgICBfYWxsQ29tcGxldGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ3JlYXRlRHVtbXk6IChvcHRpb25zLm9uQ3JlYXRlRHVtbXl8fCQubm9vcCksXHJcbiAgICAgICAgZHVyYXRpb246IChvcHRpb25zLmR1cmF0aW9ufHwzMDApXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgKG9wdGlvbnMub25TdGFydGVkfHwkLm5vb3ApKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKGpRdWVyeSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9qcXVlcnkvc3dhcEFuaW1hdGlvbi5lczZcbiAqKi8iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcclxuICBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4ID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XHJcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4IGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcyk7XHJcbiAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XHJcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcclxuICAgIHZhciB2YWx1ZTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlID0gbGlzdFtpXTtcclxuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfTtcclxufVxyXG5cclxuXHJcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XHJcbiAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xyXG4gICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCAwO1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdEluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT09IHBvc2l0aW9uO1xyXG4gIH07XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvUG9seWZpbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgVXBsb2FkZXIgZnJvbSAnLi9VcGxvYWRlcic7XHJcbmltcG9ydCBJbWFnZSBmcm9tICcuL0ltYWdlJztcclxuJCgoKSA9PiB7XHJcbiAgJChcIi5zZHgtaW1hZ2UtdXBsb2FkZXIgaW5wdXRbdHlwZT1maWxlXVwiKS5lYWNoKChrZXksIGVsZW0pID0+IHtcclxuXHJcbiAgICBjb25zdCAkZWxlbSA9ICQoZWxlbSk7XHJcbiAgICBjb25zdCB1cGxvYWRlciA9IG5ldyBVcGxvYWRlcigkZWxlbS5jbG9zZXN0KFwiLnNkeC1pbWFnZS11cGxvYWRlclwiKSk7XHJcbiAgICBjb25zdCBpbWFnZXMgPSB1cGxvYWRlci5nZXRJbWFnZUxpc3QoKTtcclxuXHJcbiAgICB1cGxvYWRlci5nZXRTZXJ2ZXJJbWFnZXMoKS5mb3JFYWNoKGltYWdlID0+IHtcclxuICAgICAgaW1hZ2VzLmFkZEltYWdlKGltYWdlKTtcclxuICAgICAgaW1hZ2VzLnJlc2VydmVDb3VudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGVsZW0uZmlsZXVwbG9hZCh7XHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIHNpbmdsZUZpbGVVcGxvYWRzOiBmYWxzZSxcclxuICAgICAgc2VxdWVudGlhbFVwbG9hZHM6IHRydWUsXHJcbiAgICAgIGxpbWl0TXVsdGlGaWxlVXBsb2FkU2l6ZTogNDA5NiAqIDEwMjQsXHJcbiAgICAgIGZvcm1EYXRhOiB7bmFtZTogJGVsZW0uYXR0cihcIm5hbWVcIil9XHJcbiAgICB9KS5iaW5kKFwiZmlsZXVwbG9hZHN1Ym1pdFwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAvL+S4gOaemuOBl+OBi+OCouODg+ODl+ODreODvOODieOBp+OBjeOBquOBhOOBqOOBjeOBr+W3ruOBl+abv+OBiOOAglxyXG4gICAgICBpZihpbWFnZXMubWF4Q291bnQgPT0gMSl7XHJcbiAgICAgICAgaW1hZ2VzLmNsZWFyKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy/lpJrjgZnjgY7jgovliIbjgpLlj5bjgorpmaTjgY9cclxuICAgICAgdmFyIHJlbW92ZWQgPSBpbWFnZXMucmVtb3ZlRXh0cmFGaWxlKGRhdGEuZmlsZXMpO1xyXG4gICAgICBpbWFnZXMucmVzZXJ2ZUNvdW50KGRhdGEuZmlsZXMubGVuZ3RoKTtcclxuXHJcbiAgICAgIC8v44Ki44OD44OX44Ot44O844OJ44GM44Kt44Oj44Oz44K744Or44GV44KM44Gf55S75YOP44KS55S76Z2i44Gr6KGo56S6XHJcbiAgICAgIHVwbG9hZGVyLmRpc3BsYXlJbWFnZUNvdW50RXJyb3IocmVtb3ZlZC5tYXAoZmlsZSA9PiBmaWxlLm5hbWUpKVxyXG5cclxuICAgICAgLy/jgqLjg4Pjg5fjg63jg7zjg4njgZnjgovnlLvlg4/jgYznhKHjgYvjgaPjgZ/jgonkvZXjgoLjgZfjgarjgYTjgIJcclxuICAgICAgaWYoZGF0YS5maWxlcy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKFwiZmlsZXVwbG9hZGRvbmVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgJC5lYWNoKGRhdGEucmVzdWx0LmZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGZpbGUpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZShmaWxlLm5hbWUpO1xyXG4gICAgICAgIGltYWdlcy5hZGRJbWFnZShpbWFnZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkuYmluZChcImZpbGV1cGxvYWRmYWlsXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIGVycm9yID0gSlNPTi5wYXJzZShkYXRhLmpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gXCJNYXhSZXF1ZXN0TGVuZ3RoXCIpIHtcclxuICAgICAgICAgIGFsZXJ0KGVycm9yLm1heExlbmd0aCArIFwiS0Lku6XkuIrjga/jgqLjg4Pjg5fjg63jg7zjg4njgafjgY3jgb7jgZvjgpPjgIJcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgYWxlcnQoXCLjgrXjg7zjg5Djg7zjgqjjg6njg7zjgafjgZnjgIJcIilcclxuICAgICAgfVxyXG4gICAgfSkuYmluZCgnZmlsZXVwbG9hZHByb2dyZXNzYWxsJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgdXBsb2FkZXIudXBkYXRlUHJvZ3Jlc3MoZGF0YS5sb2FkZWQgLyBkYXRhLnRvdGFsICogMTAwKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2ltYWdlVXBsb2FkZXIvYXBwLmVzNlxuICoqLyIsImltcG9ydCBJbWFnZUxpc3QgZnJvbSAnLi9JbWFnZUxpc3QnO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRlclxyXG57XHJcbiAgY29uc3RydWN0b3IoJHdyYXBwZXIpe1xyXG4gICAgdGhpcy4kd3JhcHBlciA9ICR3cmFwcGVyO1xyXG4gICAgdGhpcy4kcHJvZ3Jlc3NCYXIgPSAkd3JhcHBlci5maW5kKFwiLnByb2dyZXNzIC5wcm9ncmVzcy1iYXJcIilcclxuICAgIHRoaXMuaW1hZ2VMaXN0ID0gbmV3IEltYWdlTGlzdCh0aGlzLiR3cmFwcGVyKTtcclxuICAgIHRoaXMubWF4Q291bnRNZXNzYWdlID0gdGhpcy4kd3JhcHBlci5hdHRyKCdkYXRhLW1heC1jb3VudC1tZXNzYWdlJyk7XHJcbiAgfVxyXG5cclxuICBnZXRJbWFnZUxpc3QoKXtcclxuICAgIHJldHVybiB0aGlzLmltYWdlTGlzdDtcclxuICB9XHJcblxyXG4gIGdldFNlcnZlckltYWdlcygpe1xyXG4gICAgY29uc3QgaW1hZ2VzID0gW107XHJcbiAgICB0aGlzLiR3cmFwcGVyLmZpbmQoJy5zZXJ2ZXItaW1hZ2VzJykuZWFjaCgoa2V5LCBlbGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCQoZWxlbSkudmFsKCkpO1xyXG4gICAgICBpbWFnZXMucHVzaChpbWFnZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaW1hZ2VzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJvZ3Jlc3MocGVyY2VudFZhbHVlKXtcclxuICAgIHRoaXMuJHByb2dyZXNzQmFyLmNzcygnd2lkdGgnLCBwZXJjZW50VmFsdWUgKyBcIiVcIik7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5SW1hZ2VDb3VudEVycm9yKGZpbGVzKXtcclxuICAgIHZhciAkZGl2ID0gdGhpcy4kd3JhcHBlci5maW5kKCcuaW1hZ2UtZXJyb3InKTtcclxuICAgIGlmKCRkaXYubGVuZ3RoID09IDApe1xyXG4gICAgICAkZGl2ID0gJChgXHJcbjxkaXYgY2xhc3M9XCJpbWFnZS1lcnJvciBhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5cclxuPC9kaXY+XHJcbiAgICAgIGApLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGZpbGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgJGRpdi5yZW1vdmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRkaXYuaHRtbChgXHJcbiAgICAgICAgJHt0aGlzLm1heENvdW50TWVzc2FnZS5zcGxpdCgnJU1heENvdW50JScpLmpvaW4odGhpcy5pbWFnZUxpc3QubWF4Q291bnQpfVxyXG4gICAgICAgIDx1bCBjbGFzcz1cImZpbGUtbGlzdFwiPjwvdWw+XHJcbiAgICAgIGApO1xyXG5cclxuICAgICAgY29uc3QgJHVsID0gJGRpdi5maW5kKCcuZmlsZS1saXN0Jyk7XHJcbiAgICAgIGZpbGVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgJHVsLmFwcGVuZChgPGxpPiR7bmFtZX08L2xpPmApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW1hZ2VVcGxvYWRlci9VcGxvYWRlci5lczZcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZUxpc3Rcclxue1xyXG4gIGNvbnN0cnVjdG9yKCRnbG9iYWxXcmFwcGVyKXtcclxuICAgIHRoaXMuY3VycmVudENvdW50ID0gMDtcclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkZ2xvYmFsV3JhcHBlci5maW5kKFwiLmltYWdlc1wiKTtcclxuICAgIHRoaXMuJHdyYXBwZXJcclxuICAgICAgLnNvcnRhYmxlKHtcclxuXHRcdFx0ICBvcGFjaXR5OiAwLjhcclxuICAgICAgfSlcclxuICAgICAgLmRpc2FibGVTZWxlY3Rpb24oKTtcclxuICAgIHRoaXMubWF4Q291bnQgPSAkZ2xvYmFsV3JhcHBlci5hdHRyKCdkYXRhLW1heC1jb3VudCcpO1xyXG4gICAgdGhpcy50aHVtYldpZHRoID0gJGdsb2JhbFdyYXBwZXIuYXR0cignZGF0YS10aHVtYi13aWR0aCcpO1xyXG4gICAgdGhpcy5kZWxldGVMYWJlbCA9ICRnbG9iYWxXcmFwcGVyLmF0dHIoJ2RhdGEtZGVsZXRlLWxhYmVsJyk7XHJcbiAgICB0aGlzLnN1Ym1pdE5hbWUgPSAkZ2xvYmFsV3JhcHBlci5hdHRyKCdkYXRhLXN1Ym1pdC1uYW1lJylcclxuICB9XHJcblxyXG4gIHJlbW92ZUV4dHJhRmlsZShmaWxlcyl7XHJcbiAgICB2YXIgcmVtb3ZlZCA9IFtdO1xyXG4gICAgd2hpbGUoZmlsZXMubGVuZ3RoID4gdGhpcy5tYXhDb3VudCAtIHRoaXMuY3VycmVudENvdW50KXtcclxuICAgICAgcmVtb3ZlZC5wdXNoKGZpbGVzLnBvcCgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVtb3ZlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeUu+WDj+OCouODg+ODl+ODreODvOODieaemuaVsOOCkuS6iOe0hOOBmeOCi+OAguOCouODg+ODl+ODreODvOODieOBmeOCi+WJjeOBq+WItumZkOOBl+OBn+OBhOOBruOBp+S6i+WJjeOBq+S6iOe0hOOBp+OBjeOCi+OCiOOBhuOBq+OBquOBo+OBpuOBhOOBvuOBmeOAglxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gY291bnQgPSAgICAgICAgICAgICAxIFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICByZXNlcnZlQ291bnQoY291bnQgPSAxKXtcclxuICAgIHRoaXMuY3VycmVudENvdW50ICs9IGNvdW50O1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ291bnQoY291bnQgPSAxKXtcclxuICAgIHRoaXMuY3VycmVudENvdW50IC09IGNvdW50O1xyXG4gIH1cclxuXHJcbiAgYWRkSW1hZ2UoaW1hZ2Upe1xyXG4gICAgY29uc3QgJGxpID0gaW1hZ2UuY3JlYXRlRWxlbWVudCh0aGlzKTtcclxuICAgICRsaS5hcHBlbmRUbyh0aGlzLiR3cmFwcGVyKTtcclxuICB9XHJcblxyXG4gIGNsZWFyKCl7XHJcbiAgICB2YXIgJGltYWdlcyA9IHRoaXMuJHdyYXBwZXIuY2hpbGRyZW4oKTtcclxuICAgIHRoaXMucmVtb3ZlQ291bnQoJGltYWdlcy5sZW5ndGgpO1xyXG4gICAgJGltYWdlcy5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbWFnZVVwbG9hZGVyL0ltYWdlTGlzdC5lczZcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZVxyXG57XHJcbiAgY29uc3RydWN0b3IocGF0aCl7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRWxlbWVudChpbWFnZUxpc3Qpe1xyXG4gICAgY29uc3QgJGltZyA9ICQoJzxpbWcgLz4nKS5hdHRyKFwic3JjXCIsIHRoaXMucGF0aCk7XHJcbiAgICBpZihpbWFnZUxpc3QudGh1bWJXaWR0aCl7XHJcbiAgICAgICRpbWcuY3NzKFwid2lkdGhcIiwgaW1hZ2VMaXN0LnRodW1iV2lkdGgrXCJweFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCAkbGkgPSAkKGBcclxuPGxpIGNsYXNzPVwiaW1hZ2UgdGh1bWJuYWlsIHB1bGwtbGVmdFwiPlxyXG4gIDxkaXYgY2xhc3M9XCJoZWFkZXIgY2xlYXJmaXhcIj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kYW5nZXIgYnRuLXhzIHB1bGwtcmlnaHRcIj4ke2ltYWdlTGlzdC5kZWxldGVMYWJlbH08L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJHt0aGlzLnBhdGh9XCIgbmFtZT1cIiR7aW1hZ2VMaXN0LnN1Ym1pdE5hbWV9XCI+XHJcbjwvbGk+XHJcbiAgICBgKS5hcHBlbmQoJGltZyk7XHJcblxyXG4gICAgJGxpLmZpbmQoJy5kZWxldGUnKS5vbignY2xpY2snLCBlID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCAkbGkgPSAkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdCgnLmltYWdlJyk7XHJcbiAgICAgICRsaS5yZW1vdmUoKTtcclxuICAgICAgaW1hZ2VMaXN0LnJlbW92ZUNvdW50KCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiAkbGk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW1hZ2VVcGxvYWRlci9JbWFnZS5lczZcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9