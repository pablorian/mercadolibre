'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports['default'] = clone;
function clone(obj) {
    if (obj === undefined || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
        throw new Error('The "obj" parameter is required and must be an object.');
    }

    var copy = {},
        prop = void 0;

    for (prop in obj) {
        if (obj[prop] !== undefined) {
            copy[prop] = obj[prop];
        }
    }

    return copy;
}