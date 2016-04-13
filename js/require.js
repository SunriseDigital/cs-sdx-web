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
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	if (!global.Sdx) {
	  global.Sdx = {};
	}
	
	function loadScript(script) {
	  return new Promise(function (resolve) {
	    var scriptTag = document.createElement('script');
	    scriptTag.async = 1;
	    scriptTag.defer = 1;
	    scriptTag.src = script;
	
	    scriptTag.onload = function () {
	      resolve();
	    };
	
	    var head = document.getElementsByTagName("head")[0] || document.documentElement;
	    head.insertBefore(scriptTag, head.firstChild);
	  });
	}
	
	/**
	 * javascriptの外部ファイルをasyncで読み込みます。
	 * [['jquery.js'], ['a.js', 'b.js']]
	 * 上記例では`jquery.js`を読み終わってから、`a.js`と`b.js`を並列に一気に読みます。
	 * @param  array<array<string>> scripts
	 * @return Promise
	 */
	global.Sdx.require = function (scripts) {
	  //解決済みのpromiseを作る
	  var promise = Promise.resolve();
	  scripts.forEach(function (scriptGroup) {
	    var promises = [];
	    scriptGroup.forEach(function (script) {
	      promises.push(promise.then(function () {
	        return loadScript(script);
	      }));
	    });
	    //promiseを入れ替えて次のスクリプトに備える
	    promise = Promise.all(promises);
	  });
	
	  return promise;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTUzNjNlNjhmYjk2NjYxYjNiYTkiLCJ3ZWJwYWNrOi8vLy4vanMvcmVxdWlyZS9hcHAuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBRyxDQUFDLE9BQU8sR0FBUCxFQUFXO0FBQ2IsVUFBTyxHQUFQLEdBQWEsRUFBYixDQURhO0VBQWY7O0FBSUEsVUFBUyxVQUFULENBQW9CLE1BQXBCLEVBQTJCO0FBQ3pCLFVBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQWE7QUFDOUIsU0FBSSxZQUFZLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFaLENBRDBCO0FBRTlCLGVBQVUsS0FBVixHQUFrQixDQUFsQixDQUY4QjtBQUc5QixlQUFVLEtBQVYsR0FBa0IsQ0FBbEIsQ0FIOEI7QUFJOUIsZUFBVSxHQUFWLEdBQWdCLE1BQWhCLENBSjhCOztBQU05QixlQUFVLE1BQVYsR0FBbUIsWUFBTTtBQUN2QixpQkFEdUI7TUFBTixDQU5XOztBQVU5QixTQUFJLE9BQU8sU0FBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxLQUE0QyxTQUFTLGVBQVQsQ0FWekI7QUFXOUIsVUFBSyxZQUFMLENBQWtCLFNBQWxCLEVBQTZCLEtBQUssVUFBTCxDQUE3QixDQVg4QjtJQUFiLENBQW5CLENBRHlCO0VBQTNCOzs7Ozs7Ozs7QUF1QkEsUUFBTyxHQUFQLENBQVcsT0FBWCxHQUFxQixVQUFDLE9BQUQsRUFBYTs7QUFFaEMsT0FBSSxVQUFVLFFBQVEsT0FBUixFQUFWLENBRjRCO0FBR2hDLFdBQVEsT0FBUixDQUFnQixVQUFDLFdBQUQsRUFBaUI7QUFDL0IsU0FBSSxXQUFXLEVBQVgsQ0FEMkI7QUFFL0IsaUJBQVksT0FBWixDQUFvQixVQUFDLE1BQUQsRUFBWTtBQUM5QixnQkFBUyxJQUFULENBQWMsUUFBUSxJQUFSLENBQWE7Z0JBQU0sV0FBVyxNQUFYO1FBQU4sQ0FBM0IsRUFEOEI7TUFBWixDQUFwQjs7QUFGK0IsWUFNL0IsR0FBVSxRQUFRLEdBQVIsQ0FBWSxRQUFaLENBQVYsQ0FOK0I7SUFBakIsQ0FBaEIsQ0FIZ0M7O0FBWWhDLFVBQU8sT0FBUCxDQVpnQztFQUFiLEMiLCJmaWxlIjoicmVxdWlyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZTUzNjNlNjhmYjk2NjYxYjNiYTlcbiAqKi8iLCJpZighZ2xvYmFsLlNkeCl7XHJcbiAgZ2xvYmFsLlNkeCA9IHt9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkU2NyaXB0KHNjcmlwdCl7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICB2YXIgc2NyaXB0VGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBzY3JpcHRUYWcuYXN5bmMgPSAxO1xyXG4gICAgc2NyaXB0VGFnLmRlZmVyID0gMTtcclxuICAgIHNjcmlwdFRhZy5zcmMgPSBzY3JpcHQ7XHJcblxyXG4gICAgc2NyaXB0VGFnLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHRUYWcsIGhlYWQuZmlyc3RDaGlsZCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBqYXZhc2NyaXB044Gu5aSW6YOo44OV44Kh44Kk44Or44KSYXN5bmPjgafoqq3jgb/ovrzjgb/jgb7jgZnjgIJcclxuICogW1snanF1ZXJ5LmpzJ10sIFsnYS5qcycsICdiLmpzJ11dXHJcbiAqIOS4iuiomOS+i+OBp+OBr2BqcXVlcnkuanNg44KS6Kqt44G/57WC44KP44Gj44Gm44GL44KJ44CBYGEuanNg44GoYGIuanNg44KS5Lim5YiX44Gr5LiA5rCX44Gr6Kqt44G/44G+44GZ44CCXHJcbiAqIEBwYXJhbSAgYXJyYXk8YXJyYXk8c3RyaW5nPj4gc2NyaXB0c1xyXG4gKiBAcmV0dXJuIFByb21pc2VcclxuICovXHJcbmdsb2JhbC5TZHgucmVxdWlyZSA9IChzY3JpcHRzKSA9PiB7XHJcbiAgLy/op6PmsbrmuIjjgb/jga5wcm9taXNl44KS5L2c44KLXHJcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuICBzY3JpcHRzLmZvckVhY2goKHNjcmlwdEdyb3VwKSA9PiB7XHJcbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcclxuICAgIHNjcmlwdEdyb3VwLmZvckVhY2goKHNjcmlwdCkgPT4ge1xyXG4gICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UudGhlbigoKSA9PiBsb2FkU2NyaXB0KHNjcmlwdCkpKTtcclxuICAgIH0pO1xyXG4gICAgLy9wcm9taXNl44KS5YWl44KM5pu/44GI44Gm5qyh44Gu44K544Kv44Oq44OX44OI44Gr5YKZ44GI44KLXHJcbiAgICBwcm9taXNlID0gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcHJvbWlzZTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL3JlcXVpcmUvYXBwLmVzNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=