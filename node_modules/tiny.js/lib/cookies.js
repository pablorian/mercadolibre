'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var defaults = {
    expires: '', // Empty string for session cookies
    path: '/',
    secure: false,
    domain: ''
};

var day = 60 * 60 * 24;

function get(key) {
    var collection = document.cookie.split('; '),
        value = null,
        l = collection.length;

    if (!l) {
        return value;
    }

    for (var i = 0; i < l; i++) {
        var parts = collection[i].split('='),
            name = decodeURIComponent(parts.shift());

        if (key === name) {
            value = decodeURIComponent(parts.join('='));
            break;
        }
    }

    return value;
}

// Then `key` contains an object with keys and values for cookies, `value` contains the options object.
function set(key, value, options) {
    options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : { expires: options };

    var expires = options.expires != null ? options.expires : defaults.expires;

    if (typeof expires === 'string' && expires !== '') {
        expires = new Date(expires);
    } else if (typeof expires === 'number') {
        expires = new Date(+new Date() + 1000 * day * expires);
    }

    if (expires && 'toGMTString' in expires) {
        expires = ';expires=' + expires.toGMTString();
    }

    var path = ';path=' + (options.path || defaults.path);

    var domain = options.domain || defaults.domain;
    domain = domain ? ';domain=' + domain : '';

    var secure = options.secure || defaults.secure ? ';secure' : '';

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
        if (Array.isArray(value) || (0, _isPlainObject2['default'])(value)) {
            value = JSON.stringify(value);
        } else {
            value = '';
        }
    }

    document.cookie = encodeCookie(key) + '=' + encodeCookie(value) + expires + path + domain + secure;
}

function remove(key) {
    set(key, '', -1);
}

function isEnabled() {
    if (navigator.cookieEnabled) {
        return true;
    }

    set('__', '_');
    var exist = get('__') === '_';
    remove('__');

    return exist;
}

var cookies = {
    get: get,
    set: set,
    remove: remove,
    isEnabled: isEnabled
};

exports['default'] = cookies;

/*
 * Escapes only characters that are not allowed in cookies
 */

function encodeCookie(value) {
    return String(value).replace(/[,;"\\=\s%]/g, function (character) {
        return encodeURIComponent(character);
    });
}