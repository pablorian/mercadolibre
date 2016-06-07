'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.once = undefined;
exports.initEvent = initEvent;
exports.on = on;
exports.off = off;
exports.trigger = trigger;

var _extend = require('./extend');

var _extend2 = _interopRequireDefault(_extend);

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DOM_EVENTS = function () {
    var events = [];
    for (var attr in document) {
        if (attr.substring(0, 2) === 'on') {
            var evt = attr.replace('on', '');
            events.push(evt);
        }
    }
    return events;
}();

var MOUSE_EVENTS = DOM_EVENTS.filter(function (name) {
    return (/^(?:click|dblclick|mouse(?:down|up|over|move|out))$/.test(name)
    );
});

var isStandard = document.addEventListener ? true : false;

var addHandler = isStandard ? 'addEventListener' : 'attachEvent';

var removeHandler = isStandard ? 'removeEventListener' : 'detachEvent';

var dispatch = isStandard ? 'dispatchEvent' : 'fireEvent';

if (!Event.prototype.preventDefault && Object.defineProperties) {
    Object.defineProperties(window.Event.prototype, {
        bubbles: {
            value: true,
            writable: true
        },
        cancelable: {
            value: true,
            writable: true
        },
        preventDefault: {
            value: function value() {
                if (this.cancelable) {
                    this.defaultPrevented = true;
                    this.returnValue = false;
                }
            }
        },
        stopPropagation: {
            value: function value() {
                this.stoppedPropagation = true;
                this.cancelBubble = true;
            }
        },
        stopImmediatePropagation: {
            value: function value() {
                this.stoppedImmediatePropagation = true;
                this.stopPropagation();
            }
        }
    });
}

function getElements(el) {
    if (!el) {
        return [];
    }

    if (typeof el === 'string') {
        return nodeListToArray(document.querySelectorAll(el));
    } else if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(el)) && (typeof el.length === 'number' || Object.prototype.hasOwnProperty.call(el, 'length'))) {
        if (el.length === 0 || el[0].nodeType < 1) {
            return [];
        }

        return nodeListToArray(el);
    } else if (Array.isArray(el)) {
        return [].concat(el);
    } else {
        return [el];
    }
}

function nodeListToArray(elements) {
    var i = 0,
        length = elements.length,
        arr = [];

    for (; i < length; i++) {
        arr.push(elements[i]);
    }

    return arr;
}

function initEvent(name, props) {
    if (typeof name !== 'string') {
        props = name;
        name = props.type;
    }
    var event = void 0,
        isDomEvent = DOM_EVENTS.indexOf(name) !== -1,
        isMouseEvent = isDomEvent && MOUSE_EVENTS.indexOf(name) !== -1;

    var data = (0, _extend2['default'])({
        bubbles: isDomEvent,
        cancelable: isDomEvent,
        detail: undefined
    }, props);

    if (document.createEvent) {
        event = document.createEvent(isMouseEvent && window.MouseEvent ? 'MouseEvents' : 'Events');
        event.initEvent(name, data.bubbles, data.cancelable, data.detail);
    } else if (document.createEventObject) {
        event = document.createEventObject(window.event);
        if (isMouseEvent) {
            event.button = 1;
        }
        if (!data.bubbles) {
            event.cancelBubble = true;
        }
    }

    return event;
}

function normalizeEventName(event) {
    if (event.substr(0, 2) === 'on') {
        return isStandard ? event.substr(2) : event;
    } else {
        return isStandard ? event : 'on' + event;
    }
}

/**
 * Crossbrowser implementation of {HTMLElement}.addEventListener.
 *
 * @memberof tiny
 * @type {Function}
 * @param {HTMLElement|String} elem An HTMLElement or a CSS selector to add listener to
 * @param {String} event Event name
 * @param {Function} handler Event handler function
 * @param {Boolean} bubbles Whether or not to be propagated to outer elements.
 *
 * @example
 * tiny.on(document, 'click', function(e){}, false);
 *
 * tiny.on('p > button', 'click', function(e){}, false);
 */
function on(elem, event, handler, bubbles) {
    getElements(elem).forEach(function (el) {
        el[addHandler](normalizeEventName(event), handler, bubbles || false);
    });
}

/**
 * Attach a handler to an event for the {HTMLElement} that executes only
 * once.
 *
 * @memberof ch.Event
 * @type {Function}
 * @param {HTMLElement|String} elem An HTMLElement or a CSS selector to add listener to
 * @param {String} event Event name
 * @param {Function} handler Event handler function
 * @param {Boolean} bubbles Whether or not to be propagated to outer elements.
 *
 * @example
 * tiny.once(document, 'click', function(e){}, false);
 */
function once(elem, event, _handler, bubbles) {
    getElements(elem).forEach(function (el) {
        var origHandler = _handler;

        _handler = function handler(e) {
            off(el, e.type, _handler);

            return origHandler.apply(el, arguments);
        };

        el[addHandler](normalizeEventName(event), _handler, bubbles || false);
    });
}

/**
 * Crossbrowser implementation of {HTMLElement}.removeEventListener.
 *
 * @memberof ch.Event
 * @type {Function}
 * @param {HTMLElement|String} elem An HTMLElement or a CSS selector to remove listener from
 * @param {String} event Event name
 * @param {Function} handler Event handler function to remove
 *
 * @example
 * tiny.off(document, 'click', fn);
 */
exports.once = once;
function off(elem, event, handler) {
    getElements(elem).forEach(function (el) {
        el[removeHandler](normalizeEventName(event), handler);
    });
}

/**
 * Crossbrowser implementation of {HTMLElement}.removeEventListener.
 *
 * @memberof tiny
 * @type {Function}
 * @param {HTMLElement} elem An HTMLElement or a CSS selector to dispatch event to
 * @param {String|Event} event Event name or an event object
 *
 * @example
 * tiny.trigger('.btn', 'click');
 */
function trigger(elem, event, props) {
    var _this = this;

    var name = typeof event === 'string' ? event : event.type;
    event = typeof event === 'string' || (0, _isPlainObject2['default'])(event) ? initEvent(event, props) : event;

    getElements(elem).forEach(function (el) {
        // handle focus(), blur() by calling them directly
        if (event.type in focus && typeof _this[event.type] == 'function') {
            _this[event.type]();
        } else {
            isStandard ? el[dispatch](event) : el[dispatch](normalizeEventName(name), event);
        }
    });
}

var DOMEvents = {
    on: on,
    once: once,
    off: off,
    trigger: trigger
};

exports['default'] = DOMEvents;