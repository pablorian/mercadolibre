'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = ajax;

var _extend = require('./extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ajax(url, settings) {
    var args = arguments;
    var opts = void 0;

    settings = args.length === 1 ? args[0] : args[1];

    var noop = function noop() {};

    var defaults = {
        url: args.length === 2 && typeof url === 'string' ? url : '.',
        cache: true,
        data: {},
        headers: {},
        context: null,
        dataType: 'text',
        method: 'GET',
        credentials: 'omit',
        success: noop,
        error: noop,
        complete: noop
    };

    opts = (0, _extend2['default'])(defaults, settings || {});

    var mimeTypes = {
        'application/json': 'json',
        'text/html': 'html',
        'text/plain': 'text'
    };

    var dataTypes = {};
    for (var type in mimeTypes) {
        if (mimeTypes.hasOwnProperty(type)) {
            dataTypes[mimeTypes[type]] = type;
        }
    }

    if (!opts.cache) {
        opts.url = opts.url + (~opts.url.indexOf('?') ? '&' : '?') + 'nc=' + Math.floor(Math.random() * 9e9);
    }

    var complete = function complete(status, xhr) {
        opts.complete.call(opts.context, xhr, status);
    };

    var success = function success(data, xhr) {
        var status = 'success';
        opts.success.call(opts.context, data, status, xhr);
        complete(status, xhr);
    };

    var error = function error(_error, status, xhr) {
        opts.error.call(opts.context, xhr, status, _error);
        complete(status, xhr);
    };

    var xhr = new XMLHttpRequest();

    var useXDR = opts.credentials === 'include' && !('withCredentials' in xhr) && 'XDomainRequest' in window;

    if (useXDR) {
        // Use XDomainRequest instead of XMLHttpRequest for IE<=9 and when CORS is requested
        xhr = new XDomainRequest();
        xhr.onload = function () {
            var mime = xhr.contentType;
            var dataType = mime && mimeTypes[mime[1]] ? mimeTypes[mime[1]].toLowerCase() : 'json';
            var result = void 0;

            if (dataType === 'json') {
                try {
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                    result = xhr.responseText;
                }
            } else {
                result = xhr.responseText;
            }
            success(result, xhr);
        };
    } else {
        // Still cannot use xhr.onload for normal xhr due to required support of IE8 which
        // has no `onload` event https://msdn.microsoft.com/en-us/library/ms535874(v=vs.85).aspx#events
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var result = void 0;
                var status = xhr.status === 1223 ? 204 : xhr.status;

                if (status >= 200 && status < 300 || status === 304) {
                    var mime = /([\/a-z]+)(;|\s|$)/.exec(xhr.getResponseHeader('content-type'));
                    var dataType = mime && mimeTypes[mime[1]] ? mimeTypes[mime[1]].toLowerCase() : 'text';
                    result = xhr.responseText;

                    if (dataType === 'json') {
                        try {
                            result = JSON.parse(result);
                        } catch (e) {
                            result = xhr.responseText;
                        }
                    }

                    success(result, xhr);
                } else {
                    error(new Error(xhr.statusText), 'error', xhr, opts);
                }

                return;
            }
        };
    }

    xhr.onerror = function () {
        error(new Error(xhr.statusText || 'Network request failed'), 'error', xhr, opts);
    };

    xhr.open(opts.method, opts.url);

    if (opts.dataType && dataTypes[opts.dataType.toLowerCase()]) {
        opts.headers.Accept = dataTypes[opts.dataType.toLowerCase()] + ', */*; q=0.01';
    }

    if (opts.method === 'POST') {
        opts.headers = (0, _extend2['default'])(opts.headers, {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-type': 'application/x-www-form-urlencoded'
        });
    }

    if (opts.credentials === 'include') {
        xhr.withCredentials = true;
    }

    if (!useXDR) {
        for (var key in opts.headers) {
            xhr.setRequestHeader(key, opts.headers[key]);
        }
    }

    xhr.send(opts.data);

    return this;
}