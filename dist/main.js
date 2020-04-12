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
/******/ 	return __webpack_require__(__webpack_require__.s = "./Scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/index.js":
/*!**************************!*\
  !*** ./Scripts/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\nvar currenciesValuesFirst = document.querySelectorAll('.first-list > input');\nvar currenciesValuesSecond = document.querySelectorAll('.second-list > input');\nvar selectBlockFirst = document.querySelector('.first-values');\nvar selectBlockSecond = document.querySelector('.second-values');\nvar selectValuesFirst = document.querySelectorAll('.first-values > option');\nvar selectValuesSecond = document.querySelectorAll('.second-values > option');\nvar firstCurrency = document.querySelector('.val-input-first');\nvar secondCurrency = document.querySelector('.val-input-second');\nvar loading = document.querySelector('.loading');\nvar firstSpan = document.querySelector('.first-val');\nvar secondSpan = document.querySelector('.second-val');\nvar changeButton = document.querySelector('.arrows');\nvar isPending = true;\nvar first;\nvar second;\nvar rate;\nvar current;\nvar currentSecond; //Функция берет значения левой выбранной валюты и считает его правое поле ввода\n\nfunction inputOnclick(e) {\n  e.preventDefault();\n  currenciesValuesFirst.forEach(function (el) {\n    el.classList.remove('active');\n  });\n\n  if (!e.target.classList.contains('active')) {\n    e.target.classList.add('active');\n    selectBlockFirst.classList.remove('active');\n  } else e.target.classList.remove('active');\n\n  checkValue();\n  countFirst();\n} //Функция берет значение правой выбранной валюты и меняет его относительно левого поля\n\n\nfunction inputOnclickSecond(e) {\n  e.preventDefault();\n  currenciesValuesSecond.forEach(function (el) {\n    el.classList.remove('active');\n  });\n\n  if (!e.target.classList.contains('active')) {\n    e.target.classList.add('active');\n    selectBlockSecond.classList.remove('active');\n  } else e.target.classList.remove('active');\n\n  checkValue();\n  countFirst();\n} //Выбор дополнительных валют из списка и пересчет в правое поле ввода\n\n\nvar selectOnChange = function selectOnChange() {\n  selectBlockFirst.classList.add('active');\n  selectValuesFirst.forEach(function (el) {\n    el.style.backgroundColor = 'white';\n  });\n  currenciesValuesFirst.forEach(function (el) {\n    el.classList.remove('active');\n  });\n  checkValue();\n  countFirst();\n}; //Выбор дополнительных валют из списка и пересчет в левое поле ввода относительно левого поля\n\n\nvar selectOnChangeSecond = function selectOnChangeSecond() {\n  selectBlockSecond.classList.add('active');\n  selectValuesSecond.forEach(function (el) {\n    el.style.backgroundColor = 'white';\n  });\n  currenciesValuesSecond.forEach(function (el) {\n    el.classList.remove('active');\n  });\n  checkValue();\n  countFirst();\n}; // Проверяет выбранные валюты и берет их значение\n\n\nfunction checkValue() {\n  currenciesValuesFirst.forEach(function (el) {\n    if (selectBlockFirst.classList.contains('active')) first = selectBlockFirst.value;else if (el.classList.contains('active')) {\n      first = el.value;\n    }\n  });\n  currenciesValuesSecond.forEach(function (el) {\n    if (selectBlockSecond.classList.contains('active')) second = selectBlockSecond.value;else if (el.classList.contains('active')) {\n      second = el.value;\n    }\n  });\n} // На основе функции checkValue() поставляет правильные валюты в запрос на сервер считает его и возвращает ответ в нужное поле\n\n\nfunction fetchInfo(input) {\n  var current = fetch(\"https://api.ratesapi.io/api/latest?base=\".concat(first, \"&symbols=\").concat(second));\n  if (isPending === true) loading.style.display = 'flex';else loading.style.display = 'none';\n  current.then(function (result) {\n    isPending = false;\n    if (result.status === 200) return result.json();\n  }).then(function (result) {\n    rate = result.rates[Object.keys(result.rates)[0]];\n    if (input.classList.contains('val-input-second')) input.value = (firstCurrency.value * rate).toFixed(4);\n    if (input.classList.contains('val-input-first')) input.value = (firstCurrency.value / rate).toFixed(4);\n    firstSpan.innerHTML = \"1 \".concat(first, \" = \").concat(rate.toFixed(4), \" \").concat(second);\n    var currentForSecond = fetch(\"https://api.ratesapi.io/api/latest?base=\".concat(second, \"&symbols=\").concat(first));\n    currentForSecond.then(function (result) {\n      return result.json();\n    }).then(function (result) {\n      rate = result.rates[Object.keys(result.rates)[0]];\n      secondSpan.innerHTML = \"1 \".concat(second, \" = \").concat(rate.toFixed(4), \" \").concat(first);\n    });\n  });\n} // Функция для обработки ввода берет введеное значение и пересчитывает его правильно\n\n\nfunction countFirstCurrency(e) {\n  checkValue();\n  secondCurrency.value = e.target.value;\n  countFirst();\n} // Функция для обработки ввода берет введеное значение и пересчитывает его правильно\n\n\nfunction countSecondCurrency(e) {\n  checkValue();\n  firstCurrency.value = e.target.value;\n  countSecond();\n} //Функция пересчитывающая валюту по клику на меню валют правого блока\n\n\nfunction countFirst() {\n  checkValue();\n\n  if (first === second) {\n    secondCurrency.value = firstCurrency.value;\n    firstSpan.innerHTML = \"1 \".concat(first, \" = 1 \").concat(second);\n    secondSpan.innerHTML = \"1 \".concat(second, \" = 1 \").concat(first);\n  } else {\n    if (firstCurrency.value === '' || second == undefined) checkValue();else {\n      fetchInfo(secondCurrency);\n    }\n  }\n} //Функция пересчитывающая валюту по клику на меню валют левого блока\n\n\nfunction countSecond() {\n  checkValue();\n\n  if (first === second) {\n    firstCurrency.value = secondCurrency.value;\n    firstSpan.innerHTML = \"1 \".concat(first, \" = 1 \").concat(second);\n    secondSpan.innerHTML = \"1 \".concat(second, \" = 1 \").concat(first);\n  } else {\n    if (firstCurrency.value === '' || second == undefined) checkValue();else {\n      console.log('hi');\n      fetchInfo(firstCurrency);\n    }\n  }\n} //Функция меняющая местами значение валют и пересчитывающая его\n\n\nfunction changePlace(e) {\n  e.preventDefault();\n\n  if (selectBlockFirst.classList.contains('active') && selectBlockSecond.classList.contains('active')) {\n    var temp;\n    temp = selectBlockSecond.value;\n    selectBlockSecond.value = selectBlockFirst.value;\n    selectBlockFirst.value = temp;\n  } else {\n    currenciesValuesFirst.forEach(function (el) {\n      if (el.classList.contains('active')) {\n        current = el.value;\n      }\n\n      if (selectBlockFirst.classList.contains('active')) {\n        current = '';\n      }\n    });\n    currenciesValuesSecond.forEach(function (second) {\n      if (second.classList.contains('active')) {\n        currentSecond = second.value;\n      }\n\n      if (selectBlockSecond.classList.contains('active')) {\n        currentSecond = '';\n      }\n    });\n    currenciesValuesFirst.forEach(function (el) {\n      el.classList.remove('active');\n\n      if (selectBlockSecond.classList.contains('active') && currentSecond === '') {\n        selectBlockFirst.value = selectBlockSecond.value;\n        selectBlockFirst.classList.add('active');\n        selectBlockSecond.classList.remove('active');\n        selectValuesFirst.forEach(function (el) {\n          el.style.backgroundColor = 'white';\n        });\n      }\n\n      if (el.value === currentSecond) {\n        el.classList.add('active');\n      }\n    });\n    currenciesValuesSecond.forEach(function (el) {\n      el.classList.remove('active');\n\n      if (selectBlockFirst.classList.contains('active') && current === '') {\n        selectBlockSecond.value = selectBlockFirst.value;\n        selectBlockSecond.classList.add('active');\n        selectBlockFirst.classList.remove('active');\n        selectValuesSecond.forEach(function (el) {\n          el.style.backgroundColor = 'white';\n        });\n      }\n\n      if (el.value === current) {\n        el.classList.add('active');\n      }\n    });\n  }\n\n  checkValue();\n  countFirst();\n}\n\nchangeButton.addEventListener('click', changePlace);\ncurrenciesValuesFirst.forEach(function (el) {\n  el.addEventListener('click', inputOnclick);\n});\ncurrenciesValuesSecond.forEach(function (el) {\n  el.addEventListener('click', inputOnclickSecond);\n});\nselectBlockFirst.addEventListener('change', selectOnChange);\nselectBlockSecond.addEventListener('change', selectOnChangeSecond);\nfirstCurrency.addEventListener('input', countFirstCurrency);\nsecondCurrency.addEventListener('input', countSecondCurrency);\n\n//# sourceURL=webpack:///./Scripts/index.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./scss/style.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--5-2!./node_modules/sass-loader/dist/cjs.js??ref--5-3!./scss/style.scss ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./scss/style.scss?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--5-2!./node_modules/sass-loader/dist/cjs.js??ref--5-3");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./scss/style.scss":
/*!*************************!*\
  !*** ./scss/style.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js??ref--5-2!../node_modules/sass-loader/dist/cjs.js??ref--5-3!./style.scss */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./scss/style.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\nvar exported = content.locals ? content.locals : {};\n\n\n\nmodule.exports = exported;\n\n//# sourceURL=webpack:///./scss/style.scss?");

/***/ })

/******/ });