'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = scroll;
/**
 * Get the current vertical and horizontal positions of the scroll bars.
 *
 * @memberof tiny
 * @returns {{left: (Number), top: (Number)}}
 *
 * @example
 * tiny.scroll().top;
 */
function scroll() {
    return {
        'left': window.pageXOffset || document.documentElement.scrollLeft || 0,
        'top': window.pageYOffset || document.documentElement.scrollTop || 0
    };
}