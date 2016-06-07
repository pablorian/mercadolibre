'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onkeyinput = exports.onpointerleave = exports.onpointerenter = exports.onpointertap = exports.onpointermove = exports.onpointerup = exports.onpointerdown = exports.onscroll = exports.onresize = exports.onlayoutchange = undefined;

var _support = require('./support');

var _support2 = _interopRequireDefault(_support);

require('./pointerEvents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var supportsMouseEvents = !!window.MouseEvent;

/**
 * Every time Chico UI needs to inform all visual components that layout has
 * been changed, it emits this event.
 *
 * @constant
 * @type {String}
 */
var onlayoutchange = exports.onlayoutchange = 'layoutchange';

/**
 * Equivalent to 'resize'.
 * @constant
 * @type {String}
 */
var onresize = exports.onresize = 'resize';

/**
 * Equivalent to 'scroll'.
 * @constant
 * @type {String}
 */
var onscroll = exports.onscroll = 'scroll';

/**
 * Equivalent to 'pointerdown' or 'mousedown', depending on browser capabilities.
 *
 * @constant
 * @type {String}
 * @link http://www.w3.org/TR/pointerevents/#dfn-pointerdown | Pointer Events W3C Recommendation
 */
var onpointerdown = exports.onpointerdown = supportsMouseEvents ? 'pointerdown' : 'mousedown';

/**
 * Equivalent to 'pointerup' or 'mouseup', depending on browser capabilities.
 *
 * @constant
 * @type {String}
 * @link http://www.w3.org/TR/pointerevents/#dfn-pointerup | Pointer Events W3C Recommendation
 */
var onpointerup = exports.onpointerup = supportsMouseEvents ? 'pointerup' : 'mouseup';

/**
 * Equivalent to 'pointermove' or 'mousemove', depending on browser capabilities.
 *
 * @constant
 * @type {String}
 * @link http://www.w3.org/TR/pointerevents/#dfn-pointermove | Pointer Events W3C Recommendation
 */
var onpointermove = exports.onpointermove = supportsMouseEvents ? 'pointermove' : 'mousemove';

/**
 * Equivalent to 'pointertap' or 'click', depending on browser capabilities.
 *
 * @constant
 * @type {String}
 * @link http://www.w3.org/TR/pointerevents/#list-of-pointer-events | Pointer Events W3C Recommendation
 */
var onpointertap = exports.onpointertap = _support2['default'].touch && supportsMouseEvents ? 'pointertap' : 'click';

/**
 * Equivalent to 'pointerenter' or 'mouseenter', depending on browser capabilities.
 *
 * @constant
 * @type {String}
 * @link http://www.w3.org/TR/pointerevents/#dfn-pointerenter | Pointer Events W3C Recommendation
 */
var onpointerenter = exports.onpointerenter = supportsMouseEvents ? 'pointerenter' : 'mouseenter';

/**
 * Equivalent to 'pointerleave' or 'mouseleave', depending on browser capabilities.
 *
 * @constant
 * @type {String}
 * @link http://www.w3.org/TR/pointerevents/#dfn-pointerleave | Pointer Events W3C Recommendation
 */
var onpointerleave = exports.onpointerleave = supportsMouseEvents ? 'pointerleave' : 'mouseleave';

/**
 * The DOM input event that is fired when the value of an <input> or <textarea>
 * element is changed. Equivalent to 'input' or 'keydown', depending on browser
 * capabilities.
 *
 * @constant
 * @type {String}
 */
var onkeyinput = exports.onkeyinput = 'oninput' in document.createElement('input') ? 'input' : 'keydown';