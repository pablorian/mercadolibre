'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _clone = require('./modules/clone');

var _clone2 = _interopRequireDefault(_clone);

var _extend = require('./modules/extend');

var _extend2 = _interopRequireDefault(_extend);

var _inherits = require('./modules/inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _eventEmitter = require('./modules/eventEmitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _ajax = require('./modules/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _jsonp = require('./modules/jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _jcors = require('./modules/jcors');

var _jcors2 = _interopRequireDefault(_jcors);

var _isPlainObject = require('./modules/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _support = require('./modules/support');

var _support2 = _interopRequireDefault(_support);

var _classList = require('./modules/classList');

var _classList2 = _interopRequireDefault(_classList);

var _parent = require('./modules/parent');

var _parent2 = _interopRequireDefault(_parent);

var _next = require('./modules/next');

var _next2 = _interopRequireDefault(_next);

var _css = require('./modules/css');

var _css2 = _interopRequireDefault(_css);

var _offset = require('./modules/offset');

var _offset2 = _interopRequireDefault(_offset);

var _scroll = require('./modules/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _cookies = require('./modules/cookies');

var _cookies2 = _interopRequireDefault(_cookies);

var _domEvents = require('./modules/domEvents');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _events = require('./modules/events');

var events = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tiny = {
    clone: _clone2.default,
    extend: _extend2.default,
    inherits: _inherits2.default,
    EventEmitter: _eventEmitter2.default,
    ajax: _ajax2.default,
    jsonp: _jsonp2.default,
    jcors: _jcors2.default,
    isPlainObject: _isPlainObject2.default,
    support: _support2.default,
    addClass: _classList2.default.addClass,
    removeClass: _classList2.default.removeClass,
    hasClass: _classList2.default.hasClass,
    parent: _parent2.default,
    next: _next2.default,
    css: _css2.default,
    offset: _offset2.default,
    scroll: _scroll2.default,
    cookies: _cookies2.default,
    on: _domEvents2.default.on,
    bind: _domEvents2.default.on,
    one: _domEvents2.default.once,
    once: _domEvents2.default.once,
    off: _domEvents2.default.off,
    trigger: _domEvents2.default.trigger
};

for (var e in events) {
    tiny[e] = events[e];
}

if (typeof window !== 'undefined') {
    window.tiny = tiny;
}

exports.default = tiny;
//# sourceMappingURL=tiny.js.map
