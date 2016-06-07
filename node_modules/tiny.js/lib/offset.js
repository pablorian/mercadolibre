'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = offset;

var _css = require('./css');

var _css2 = _interopRequireDefault(_css);

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Get the current offset of an element.
 *
 * @param {HTMLElement} el A given HTMLElement.
 * @returns {{left: Number, top: Number}}
 *
 * @example
 * tiny.offset(el);
 */
function offset(el) {
    var rect = el.getBoundingClientRect(),
        fixedParent = getFixedParent(el),
        currentScroll = (0, _scroll2['default'])(),
        offset = {
        'left': rect.left,
        'top': rect.top
    };

    if ((0, _css2['default'])(el, 'position') !== 'fixed' && fixedParent === null) {
        offset.left += currentScroll.left;
        offset.top += currentScroll.top;
    }

    return offset;
}

/**
 * Get the current parentNode with the 'fixed' position.
 *
 * @private
 * @param {HTMLElement} el A given HTMLElement.
 *
 * @returns {HTMLElement}
 */
function getFixedParent(el) {
    var currentParent = el.offsetParent,
        parent = void 0;

    while (parent === undefined) {

        if (currentParent === null) {
            parent = null;
            break;
        }

        if ((0, _css2['default'])(currentParent, 'position') !== 'fixed') {
            currentParent = currentParent.offsetParent;
        } else {
            parent = currentParent;
        }
    }

    return parent;
}