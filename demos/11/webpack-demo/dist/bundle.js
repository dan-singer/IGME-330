/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/classes.js":
/*!***********************!*\
  !*** ./js/classes.js ***!
  \***********************/
/*! exports provided: createCircleSprites, createImageSprites, createSquareSprites */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCircleSprites\", function() { return createCircleSprites; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createImageSprites\", function() { return createImageSprites; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSquareSprites\", function() { return createSquareSprites; });\n/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities.js */ \"./js/utilities.js\");\n\n\nlet sprite = {\n\t// properties\n\tx: 0,\n\ty: 0,\n\tfwd: { x: 0, y: 1 },\n\tspeed: 0,\n\t//  methods\n\tmove() {\n\t\tthis.x += this.fwd.x * this.speed;\n\t\tthis.y += this.fwd.y * this.speed;\n\t},\n\treflectX() {\n\t\tthis.fwd.x *= -1;\n\t},\n\treflectY() {\n\t\tthis.fwd.y *= -1;\n\t}\n}\n\nfunction createCircleSprites(num = 20, rect = { left: 0, top: 0, width: 300, height: 300 }) {\n\tlet sprites = [];\n\tfor (let i = 0; i < num; i++) {\n\t\t// create Object literal with a prototype object of `sprite`\n\t\tlet s = Object.create(sprite);\n\n\t\t// add properties to `s`\n\t\ts = Object.assign(s, {\n\t\t\tradius: 20,\n\t\t\tcolor: \"red\",\n\t\t\tx: Math.random() * rect.width + rect.left,\n\t\t\ty: Math.random() * rect.height + rect.top,\n\t\t\tfwd: Object(_utilities_js__WEBPACK_IMPORTED_MODULE_0__[\"getRandomUnitVector\"])(),\n\t\t\tspeed: 2,\n\t\t\tdraw(ctx) {\n\t\t\t\tctx.save();\n\t\t\t\tctx.beginPath();\n\t\t\t\tctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n\t\t\t\tctx.closePath();\n\t\t\t\tctx.fillStyle = this.color;\n\t\t\t\tctx.fill();\n\t\t\t\tctx.restore();\n\t\t\t}\n\t\t});\n\n\t\tsprites.push(s);\n\t}\n\n\treturn sprites;\n}\n\nfunction createSquareSprites(num = 20, rect = { left: 0, top: 0, width: 300, height: 300 }) {\n\tlet sprites = [];\n\tfor (let i = 0; i < num; i++) {\n\t\t// create Object literal with a prototype object of `sprite`\n\t\tlet s = Object.create(sprite);\n\n\t\t// add properties to `s`\n\t\ts = Object.assign(s, {\n\t\t\twidth: 25,\n\t\t\theight: 25,\n\t\t\tcolor: \"green\",\n\t\t\tx: Math.random() * rect.width + rect.left,\n\t\t\ty: Math.random() * rect.height + rect.top,\n\t\t\tfwd: Object(_utilities_js__WEBPACK_IMPORTED_MODULE_0__[\"getRandomUnitVector\"])(),\n\t\t\tspeed: 2,\n\t\t\tdraw(ctx) {\n\t\t\t\tctx.save();\n\t\t\t\tctx.fillStyle = this.color;\n\t\t\t\tctx.fillRect(this.x, this.y, this.width, this.height);\n\t\t\t\tctx.restore();\n\t\t\t}\n\t\t});\n\n\t\tsprites.push(s);\n\t}\n\n\treturn sprites;\n}\n\nfunction createImageSprites(num = 20, rect = { left: 0, top: 0, width: 300, height: 300 }) {\n\tlet sprites = [];\n\tfor (let i = 0; i < num; i++) {\n\t\t// create Object literal with a prototype object of `sprite`\n\t\tlet s = Object.create(sprite);\n\n\t\tlet image = new Image();\n\t\timage.src = \"images/Sean-small.png\";\n\n\t\t// add properties to `s`\n\t\ts = Object.assign(s, {\n\t\t\twidth: 50,\n\t\t\theight: 93,\n\t\t\tx: Math.random() * rect.width + rect.left,\n\t\t\ty: Math.random() * rect.height + rect.top,\n\t\t\tfwd: Object(_utilities_js__WEBPACK_IMPORTED_MODULE_0__[\"getRandomUnitVector\"])(),\n\t\t\tspeed: 2,\n\t\t\timage: image,\n\t\t\tdraw(ctx) {\n\t\t\t\tctx.save();\n\t\t\t\tctx.drawImage(this.image, this.x, this.y, this.width, this.height);\n\t\t\t\tctx.restore();\n\t\t\t}\n\t\t});\n\n\t\tsprites.push(s);\n\t}\n\n\treturn sprites;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9jbGFzc2VzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy5qcz9iZDZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0UmFuZG9tVW5pdFZlY3Rvcn0gZnJvbSBcIi4vdXRpbGl0aWVzLmpzXCI7XG5leHBvcnQge2NyZWF0ZUNpcmNsZVNwcml0ZXMsIGNyZWF0ZUltYWdlU3ByaXRlcywgY3JlYXRlU3F1YXJlU3ByaXRlc307XG5sZXQgc3ByaXRlID0ge1xuXHQvLyBwcm9wZXJ0aWVzXG5cdHg6IDAsXG5cdHk6IDAsXG5cdGZ3ZDogeyB4OiAwLCB5OiAxIH0sXG5cdHNwZWVkOiAwLFxuXHQvLyAgbWV0aG9kc1xuXHRtb3ZlKCkge1xuXHRcdHRoaXMueCArPSB0aGlzLmZ3ZC54ICogdGhpcy5zcGVlZDtcblx0XHR0aGlzLnkgKz0gdGhpcy5md2QueSAqIHRoaXMuc3BlZWQ7XG5cdH0sXG5cdHJlZmxlY3RYKCkge1xuXHRcdHRoaXMuZndkLnggKj0gLTE7XG5cdH0sXG5cdHJlZmxlY3RZKCkge1xuXHRcdHRoaXMuZndkLnkgKj0gLTE7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2lyY2xlU3ByaXRlcyhudW0gPSAyMCwgcmVjdCA9IHsgbGVmdDogMCwgdG9wOiAwLCB3aWR0aDogMzAwLCBoZWlnaHQ6IDMwMCB9KSB7XG5cdGxldCBzcHJpdGVzID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcblx0XHQvLyBjcmVhdGUgT2JqZWN0IGxpdGVyYWwgd2l0aCBhIHByb3RvdHlwZSBvYmplY3Qgb2YgYHNwcml0ZWBcblx0XHRsZXQgcyA9IE9iamVjdC5jcmVhdGUoc3ByaXRlKTtcblxuXHRcdC8vIGFkZCBwcm9wZXJ0aWVzIHRvIGBzYFxuXHRcdHMgPSBPYmplY3QuYXNzaWduKHMsIHtcblx0XHRcdHJhZGl1czogMjAsXG5cdFx0XHRjb2xvcjogXCJyZWRcIixcblx0XHRcdHg6IE1hdGgucmFuZG9tKCkgKiByZWN0LndpZHRoICsgcmVjdC5sZWZ0LFxuXHRcdFx0eTogTWF0aC5yYW5kb20oKSAqIHJlY3QuaGVpZ2h0ICsgcmVjdC50b3AsXG5cdFx0XHRmd2Q6IGdldFJhbmRvbVVuaXRWZWN0b3IoKSxcblx0XHRcdHNwZWVkOiAyLFxuXHRcdFx0ZHJhdyhjdHgpIHtcblx0XHRcdFx0Y3R4LnNhdmUoKTtcblx0XHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcblx0XHRcdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdFx0XHRjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcblx0XHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdFx0Y3R4LnJlc3RvcmUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHNwcml0ZXMucHVzaChzKTtcblx0fVxuXG5cdHJldHVybiBzcHJpdGVzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTcXVhcmVTcHJpdGVzKG51bSA9IDIwLCByZWN0ID0geyBsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAzMDAsIGhlaWdodDogMzAwIH0pIHtcblx0bGV0IHNwcml0ZXMgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuXHRcdC8vIGNyZWF0ZSBPYmplY3QgbGl0ZXJhbCB3aXRoIGEgcHJvdG90eXBlIG9iamVjdCBvZiBgc3ByaXRlYFxuXHRcdGxldCBzID0gT2JqZWN0LmNyZWF0ZShzcHJpdGUpO1xuXG5cdFx0Ly8gYWRkIHByb3BlcnRpZXMgdG8gYHNgXG5cdFx0cyA9IE9iamVjdC5hc3NpZ24ocywge1xuXHRcdFx0d2lkdGg6IDI1LFxuXHRcdFx0aGVpZ2h0OiAyNSxcblx0XHRcdGNvbG9yOiBcImdyZWVuXCIsXG5cdFx0XHR4OiBNYXRoLnJhbmRvbSgpICogcmVjdC53aWR0aCArIHJlY3QubGVmdCxcblx0XHRcdHk6IE1hdGgucmFuZG9tKCkgKiByZWN0LmhlaWdodCArIHJlY3QudG9wLFxuXHRcdFx0ZndkOiBnZXRSYW5kb21Vbml0VmVjdG9yKCksXG5cdFx0XHRzcGVlZDogMixcblx0XHRcdGRyYXcoY3R4KSB7XG5cdFx0XHRcdGN0eC5zYXZlKCk7XG5cdFx0XHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuXHRcdFx0XHRjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblx0XHRcdFx0Y3R4LnJlc3RvcmUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHNwcml0ZXMucHVzaChzKTtcblx0fVxuXG5cdHJldHVybiBzcHJpdGVzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbWFnZVNwcml0ZXMobnVtID0gMjAsIHJlY3QgPSB7IGxlZnQ6IDAsIHRvcDogMCwgd2lkdGg6IDMwMCwgaGVpZ2h0OiAzMDAgfSkge1xuXHRsZXQgc3ByaXRlcyA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG5cdFx0Ly8gY3JlYXRlIE9iamVjdCBsaXRlcmFsIHdpdGggYSBwcm90b3R5cGUgb2JqZWN0IG9mIGBzcHJpdGVgXG5cdFx0bGV0IHMgPSBPYmplY3QuY3JlYXRlKHNwcml0ZSk7XG5cblx0XHRsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRpbWFnZS5zcmMgPSBcImltYWdlcy9TZWFuLXNtYWxsLnBuZ1wiO1xuXG5cdFx0Ly8gYWRkIHByb3BlcnRpZXMgdG8gYHNgXG5cdFx0cyA9IE9iamVjdC5hc3NpZ24ocywge1xuXHRcdFx0d2lkdGg6IDUwLFxuXHRcdFx0aGVpZ2h0OiA5Myxcblx0XHRcdHg6IE1hdGgucmFuZG9tKCkgKiByZWN0LndpZHRoICsgcmVjdC5sZWZ0LFxuXHRcdFx0eTogTWF0aC5yYW5kb20oKSAqIHJlY3QuaGVpZ2h0ICsgcmVjdC50b3AsXG5cdFx0XHRmd2Q6IGdldFJhbmRvbVVuaXRWZWN0b3IoKSxcblx0XHRcdHNwZWVkOiAyLFxuXHRcdFx0aW1hZ2U6IGltYWdlLFxuXHRcdFx0ZHJhdyhjdHgpIHtcblx0XHRcdFx0Y3R4LnNhdmUoKTtcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXHRcdFx0XHRjdHgucmVzdG9yZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0c3ByaXRlcy5wdXNoKHMpO1xuXHR9XG5cblx0cmV0dXJuIHNwcml0ZXM7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/classes.js\n");

/***/ }),

/***/ "./js/init.js":
/*!********************!*\
  !*** ./js/init.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./js/main.js\");\n\r\n// a good place for loading schtuff\r\nObject(_main_js__WEBPACK_IMPORTED_MODULE_0__[\"init\"])();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9pbml0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcz82OWJjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXQgfSBmcm9tIFwiLi9tYWluLmpzXCI7XHJcbi8vIGEgZ29vZCBwbGFjZSBmb3IgbG9hZGluZyBzY2h0dWZmXHJcbmluaXQoKTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/init.js\n");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes.js */ \"./js/classes.js\");\n\n\n// these variables are in \"Script scope\" and will be available in this and other .js files\nconst ctx = document.querySelector(\"canvas\").getContext(\"2d\");\nconst screenWidth = 600;\nconst screenHeight = 400;\nlet sprites = [];\n\n\nfunction init(){\n\tlet margin = 50;\n\tlet rect = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*2}\n\tlet rect2 = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*3}\n\tsprites = sprites.concat(Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createCircleSprites\"])(50,rect),Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createSquareSprites\"])(10,rect),Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createImageSprites\"])(10,rect2));\n\tloop();\n}\n\nfunction loop(){\n\t// schedule a call to loop() in 1/60th of a second\n\trequestAnimationFrame(loop);\n\t\n\t// draw background\n\tctx.fillRect(0,0,screenWidth,screenHeight)\n\t\n\t// loop through sprites\n\tfor (let s of sprites){\n\t\t// move sprites\n\t\ts.move();\n\t\t\n\t\t// check sides and bounce\n\t\tif(s.radius){\n\t\t\n\t\t\tif (s.x <= s.radius || s.x >= screenWidth-s.radius){\n\t\t\t\ts.reflectX();\n\t\t\t\ts.move();\n\t\t\t}\n\t\t\tif (s.y <= s.radius || s.y >= screenHeight-s.radius){\n\t\t\t\ts.reflectY();\n\t\t\t\ts.move();\n\t\t\t}\n\t\t} else{ // `s` is not a circle\n\t\t\t// left and right\n\t\t\tif (s.x <= 0 || s.x >= screenWidth-s.width){\n\t\t\t\ts.reflectX();\n\t\t\t\ts.move();\n\t\t\t}\n\t\t\t\n\t\t\tif (s.y <= 0 || s.y >= screenHeight-s.height){\n\t\t\t\ts.reflectY();\n\t\t\t\ts.move();\n\t\t\t}\n\t\t\t\n\t\t} // end if s.radius\n\t\n\t// draw sprites\n\t\ts.draw(ctx);\n\t\t\n\t} // end for\n} // end loop()\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9tYWluLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcz9lM2IxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlSW1hZ2VTcHJpdGVzLCBjcmVhdGVDaXJjbGVTcHJpdGVzLCBjcmVhdGVTcXVhcmVTcHJpdGVzfSBmcm9tIFwiLi9jbGFzc2VzLmpzXCI7XG5leHBvcnQge2luaXR9O1xuLy8gdGhlc2UgdmFyaWFibGVzIGFyZSBpbiBcIlNjcmlwdCBzY29wZVwiIGFuZCB3aWxsIGJlIGF2YWlsYWJsZSBpbiB0aGlzIGFuZCBvdGhlciAuanMgZmlsZXNcbmNvbnN0IGN0eCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xuY29uc3Qgc2NyZWVuV2lkdGggPSA2MDA7XG5jb25zdCBzY3JlZW5IZWlnaHQgPSA0MDA7XG5sZXQgc3ByaXRlcyA9IFtdO1xuXG5cbmZ1bmN0aW9uIGluaXQoKXtcblx0bGV0IG1hcmdpbiA9IDUwO1xuXHRsZXQgcmVjdCA9IHtsZWZ0OiBtYXJnaW4sIHRvcDogbWFyZ2luLCB3aWR0aDogc2NyZWVuV2lkdGggLSBtYXJnaW4qMiwgaGVpZ2h0OiBzY3JlZW5IZWlnaHQtbWFyZ2luKjJ9XG5cdGxldCByZWN0MiA9IHtsZWZ0OiBtYXJnaW4sIHRvcDogbWFyZ2luLCB3aWR0aDogc2NyZWVuV2lkdGggLSBtYXJnaW4qMiwgaGVpZ2h0OiBzY3JlZW5IZWlnaHQtbWFyZ2luKjN9XG5cdHNwcml0ZXMgPSBzcHJpdGVzLmNvbmNhdChjcmVhdGVDaXJjbGVTcHJpdGVzKDUwLHJlY3QpLGNyZWF0ZVNxdWFyZVNwcml0ZXMoMTAscmVjdCksY3JlYXRlSW1hZ2VTcHJpdGVzKDEwLHJlY3QyKSk7XG5cdGxvb3AoKTtcbn1cblxuZnVuY3Rpb24gbG9vcCgpe1xuXHQvLyBzY2hlZHVsZSBhIGNhbGwgdG8gbG9vcCgpIGluIDEvNjB0aCBvZiBhIHNlY29uZFxuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cdFxuXHQvLyBkcmF3IGJhY2tncm91bmRcblx0Y3R4LmZpbGxSZWN0KDAsMCxzY3JlZW5XaWR0aCxzY3JlZW5IZWlnaHQpXG5cdFxuXHQvLyBsb29wIHRocm91Z2ggc3ByaXRlc1xuXHRmb3IgKGxldCBzIG9mIHNwcml0ZXMpe1xuXHRcdC8vIG1vdmUgc3ByaXRlc1xuXHRcdHMubW92ZSgpO1xuXHRcdFxuXHRcdC8vIGNoZWNrIHNpZGVzIGFuZCBib3VuY2Vcblx0XHRpZihzLnJhZGl1cyl7XG5cdFx0XG5cdFx0XHRpZiAocy54IDw9IHMucmFkaXVzIHx8IHMueCA+PSBzY3JlZW5XaWR0aC1zLnJhZGl1cyl7XG5cdFx0XHRcdHMucmVmbGVjdFgoKTtcblx0XHRcdFx0cy5tb3ZlKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAocy55IDw9IHMucmFkaXVzIHx8IHMueSA+PSBzY3JlZW5IZWlnaHQtcy5yYWRpdXMpe1xuXHRcdFx0XHRzLnJlZmxlY3RZKCk7XG5cdFx0XHRcdHMubW92ZSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZXsgLy8gYHNgIGlzIG5vdCBhIGNpcmNsZVxuXHRcdFx0Ly8gbGVmdCBhbmQgcmlnaHRcblx0XHRcdGlmIChzLnggPD0gMCB8fCBzLnggPj0gc2NyZWVuV2lkdGgtcy53aWR0aCl7XG5cdFx0XHRcdHMucmVmbGVjdFgoKTtcblx0XHRcdFx0cy5tb3ZlKCk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmIChzLnkgPD0gMCB8fCBzLnkgPj0gc2NyZWVuSGVpZ2h0LXMuaGVpZ2h0KXtcblx0XHRcdFx0cy5yZWZsZWN0WSgpO1xuXHRcdFx0XHRzLm1vdmUoKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdH0gLy8gZW5kIGlmIHMucmFkaXVzXG5cdFxuXHQvLyBkcmF3IHNwcml0ZXNcblx0XHRzLmRyYXcoY3R4KTtcblx0XHRcblx0fSAvLyBlbmQgZm9yXG59IC8vIGVuZCBsb29wKClcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/main.js\n");

/***/ }),

/***/ "./js/utilities.js":
/*!*************************!*\
  !*** ./js/utilities.js ***!
  \*************************/
/*! exports provided: getRandomUnitVector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandomUnitVector\", function() { return getRandomUnitVector; });\n \n// these 2 helpers are used by classes.js\nfunction getRandomUnitVector(){\n\tlet x = getRandom(-1,1);\n\tlet y = getRandom(-1,1);\n\tlet length = Math.sqrt(x*x + y*y);\n\tif(length == 0){ // very unlikely\n\t\tx=1; // point right\n\t\ty=0;\n\t\tlength = 1;\n\t} else{\n\t\tx /= length;\n\t\ty /= length;\n\t}\n\n\treturn {x:x, y:y};\n}\n\nfunction getRandom(min, max) {\n\treturn Math.random() * (max - min) + min;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy91dGlsaXRpZXMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy91dGlsaXRpZXMuanM/ZDc4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBnZXRSYW5kb21Vbml0VmVjdG9yIH07IFxuLy8gdGhlc2UgMiBoZWxwZXJzIGFyZSB1c2VkIGJ5IGNsYXNzZXMuanNcbmZ1bmN0aW9uIGdldFJhbmRvbVVuaXRWZWN0b3IoKXtcblx0bGV0IHggPSBnZXRSYW5kb20oLTEsMSk7XG5cdGxldCB5ID0gZ2V0UmFuZG9tKC0xLDEpO1xuXHRsZXQgbGVuZ3RoID0gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG5cdGlmKGxlbmd0aCA9PSAwKXsgLy8gdmVyeSB1bmxpa2VseVxuXHRcdHg9MTsgLy8gcG9pbnQgcmlnaHRcblx0XHR5PTA7XG5cdFx0bGVuZ3RoID0gMTtcblx0fSBlbHNle1xuXHRcdHggLz0gbGVuZ3RoO1xuXHRcdHkgLz0gbGVuZ3RoO1xuXHR9XG5cblx0cmV0dXJuIHt4OngsIHk6eX07XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbShtaW4sIG1heCkge1xuXHRyZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/utilities.js\n");

/***/ }),

/***/ 0:
/*!*************************************************************************!*\
  !*** multi ./js/init.js ./js/classes.js ./js/main.js ./js/utilities.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./js/init.js */"./js/init.js");
__webpack_require__(/*! ./js/classes.js */"./js/classes.js");
__webpack_require__(/*! ./js/main.js */"./js/main.js");
module.exports = __webpack_require__(/*! ./js/utilities.js */"./js/utilities.js");


/***/ })

/******/ });