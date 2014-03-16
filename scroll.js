// Scroll Tracker
// https://github.com/markfinger/scroll-tracker

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals
    root.scroll = factory();
  }

})(this, function() {

  var settings = {
    // A positive number lowers the top of the viewport,
    // while a negative number raises the top of the viewport
    topPadding: 0,
    // A positive number raises the bottom of the viewport,
    // while a negative number lowers the bottom of the viewport
    bottomPadding: 0,
    // Enforced timeout between checks on an element, defaults to a largish
    // timeout so that we can ensure minimal impact on the browser
    checkTimeout: 100,
    // Enforced delay between calls to the scroll handler, this varies from
    // `checkTimeout` so that some elements can have more granular tracking
    onScrollThrottle: 10,
    // Enforced debounced delay on calls to the resize handler
    onResizeDebounce: 100,
    // Event namespace used to preserve control over jQuery events
    eventNamespace: '.scroll-lib',
    // Initialise the trackers when the first binding has been made
    initialiseOnFirstBinding: true,
    // Denotes that initialisation has completed
    hasInitialised: false,
    // Denotes that event listeners have been bound
    hasBoundEvents: false
  };

  var utils = (function() {

    var scrollX = function() {
      // Returns the distance between the left edges of the viewport and the document
      return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    };

    var scrollY = function() {
      // Returns the distance between the top edges of the viewport and the document
      return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    };

    var width = function() {
      // Returns the width of the viewport
      return window.innerWidth;
    };

    var height = function() {
      // Returns the height of the viewport, this value is adjusted to
      // respect the topPadding and bottomPadding properties in
      // scroll.settings

      var height = window.innerHeight;

      if (settings.topPadding !== 0) {
        height -= settings.topPadding;
      }

      if (settings.bottomPadding !== 0) {
        height -= settings.bottomPadding;
      }

      return height;
    };

    var offsetOf = function(element) {
      // Returns a superset of jQuery(element).offset() which contains
      // the bottom and right offsets from the top and left edges of
      // the document respectively

      if (!element.jquery) {
        element = $(element);
      }

      var offset = element.offset();

      if (settings.topPadding) {
        offset.top -= settings.topPadding;
      }

      offset.bottom = offset.top + element.outerHeight();
      offset.right = offset.left + element.outerWidth();

      return offset;
    };

    var position = function() {
      // Returns an object which contains the viewport's top, bottom, left and
      // right offsets from the document's top or left edge. The object also
      // contains the viewport's height and width
      var _scrollX = scrollX();
      var _scrollY = scrollY();
      var _width = width();
      var _height = height();

      return {
        top: _scrollY,
        bottom: _scrollY + _height,
        left: _scrollX,
        right: _scrollX + _width,
        width: _width,
        height: _height
      };
    };

    var _document = function() {
      // Returns an object which contains the document's height and width
      var $document = $(document);
      return {
        height: $document.height(),
        width: $document.width()
      };
    };

    return {
      scrollX: scrollX,
      scrollY: scrollY,
      width: width,
      height: height,
      offsetOf: offsetOf,
      position: position,
      document: _document
    };

  })();

  var bindings = (function() {

    var _bindings = [];

    _bindings.get = function get(element) {
      return _.find(_bindings, function(obj) {
        return obj.element === element;
      });
    };

    _bindings.set = function set(element, condition, binding, options) {
      var obj = _bindings.get(element);

      options = options || {};

      if (!obj) {
        obj = {
          element: element,
          bindings: {},
          position: utils.offsetOf(element),
          state: {},
          checkTimeout: settings.checkTimeout,
          lastCheckedAt: -Infinity
        };
        _bindings.push(obj);
      }

      if (options.checkTimeout !== undefined) {
        obj.checkTimeout = options.checkTimeout;
      }

      if (!obj.bindings[condition]) {
        obj.bindings[condition] = [];
      }

      obj.bindings[condition].push({
        binding: binding,
        once: options.once || false
      });

      return obj;
    };

    _bindings.clean = function clean() {
      // Cleans out the bindings to remove empty bindings and objects

      _.forEach(_bindings, function(binding, index) {
        // Remove empty binding groups, eg: 'enter' & 'exit'
        _.forEach(binding.bindings, function(value, key) {
          if (!value.length) {
            delete binding.bindings[key];
          }
        });
        // Remove any objects without any bindings
        if (_.keys(binding.bindings).length === 0) {
          _bindings.splice(index, 1);
        }
      });
    };

    _bindings.remove = function remove(element, condition, binding) {
      var obj = _bindings.get(element);
      var removed = false;

      if (obj) {
        if (binding) {
          if (_.has(obj.bindings, condition)) {
            obj.bindings[condition] = _.filter(obj.bindings[condition], function(obj) {
              if (obj.binding === binding) {
                removed = true;
              } else {
                return true;
              }
            });
          }
        } else if (condition) {
          if (_.has(obj.bindings, condition)) {
            delete obj.bindings[condition];
            removed = true;
          }
        } else {
          // Delegate to `_bindings.clean`
          delete obj.bindings;
          removed = true;
        }
        _bindings.clean();
      }

      return removed;
    };

    _bindings.trigger = function trigger(element, condition, binding) {
      var obj = _bindings.get(element);

      if (obj && _.has(obj.bindings, condition)) {

        var matchedBindings = obj.bindings[condition];

        if (binding) {
          matchedBindings = _.filter(matchedBindings, function(obj) {
            return obj.binding === binding;
          });
        }

        _.forEach(matchedBindings, function(binding) {
          var func = binding.binding;
          if (binding.once) {
            _bindings.remove(element, condition, func);
          }
          func({
            position: _.clone(obj.position),
            element: element
          });
        });

        return matchedBindings.length > 0;

      }

      return false;
    };

    return _bindings;

  })();

  var conditions = (function() {

    var _conditions = {};

    var is = function is(element, condition, data) {
      // Indicates if an Element's position in the viewport matches
      // a specific condition
      //
      // Accepts two arguments:
      //   element: the Element which will be checked
      //   condition: a string identifying the condition that will be tested
      //   data: an optional Object which contains precomputed information
      //     about an element's position and state, as well as the
      //     viewport's position. Precomputing this Object can be useful
      //     if you are trying to optimise repetitive calls to `is`.

      if (condition[0] === '!') {
        return !is(element, condition.slice(1), data);
      }

      if (_conditions[condition] === undefined) {
        throw new Error('Undefined condition: ' + condition);
      }

      data = data || {};
      data.position = data.position || utils.offsetOf(element);
      data.viewportPosition = data.viewportPosition || utils.position();
      if (!data.state) {
        var binding = bindings.get(element);
        if (binding) {
          data.state = binding.state;
        } else {
          data.state = {};
        }
      }

      return _conditions[condition](element, data);
    };

    var defineCondition = function defineCondition(condition, binding) {
      if (!_conditions[condition]) {
        _conditions[condition] = binding;
      } else {
        throw new Error('A condition has already been defined with the name "' + condition + '"');
      }
    };

    defineCondition('above', function(element, data) {
      return data.position.bottom < data.viewportPosition.top;
    });

    defineCondition('below', function(element, data) {
      return data.position.top > data.viewportPosition.bottom;
    });

    defineCondition('inside', function(element, data) {
      return !(
        is(element, 'above', data) ||
        is(element, 'below', data)
      );
    });

    defineCondition('intersectingTop', function(element, data) {
      return (
        data.position.top <= data.viewportPosition.top &&
        data.position.bottom >= data.viewportPosition.top
      );
    });

    defineCondition('intersectingMiddle', function(element, data) {
      var viewportMiddle = data.viewportPosition.top + (data.viewportPosition.height / 2);
      return (
        data.position.top <= viewportMiddle &&
        data.position.bottom >= viewportMiddle
      );
    });

    defineCondition('intersectingBottom', function(element, data) {
      return (
        data.position.top <= data.viewportPosition.bottom &&
        data.position.bottom >= data.viewportPosition.bottom
      );
    });

    defineCondition('contained', function(element, data) {
      return (
        data.position.top >= data.viewportPosition.top &&
        data.position.bottom <= data.viewportPosition.bottom
      );
    });

    defineCondition('enter', function(element, data) {
      var state = data.state;
      if (is(element, 'inside', data)) {
        if (!state.hasEntered) {
          return state.hasEntered = true;
        }
      } else {
        state.hasEntered = false;
      }
      return false;
    });

    defineCondition('exit', function(element, data) {
      var state = data.state;
      if (!is(element, 'inside', data)) {
        if (!state.hasExited) {
          return state.hasExited = true;
        }
      } else {
        state.hasExited = false;
      }
      return false;
    });

    return {
      is: is,
      defineCondition: defineCondition,
      conditions: _conditions
    };

  })();

  var check = function check(element) {
    // Checks the conditions of each bound Element and, if successful,
    // triggers any Function bound to that Element and condition.
    // Accepts an optional Element argument, which restricts the checks
    // to that Element only.

    var bindingsToCheck = bindings;

    if (element && _.isElement(element)) {
      var binding = bindings.get(element);
      if (!binding) {
        return;
      }
      bindingsToCheck = [binding];
    }

    var currentTime = _.now();
    var viewportPosition = utils.position();

    _(bindingsToCheck)
      .filter(function(obj) {
        return (obj.lastCheckedAt + obj.checkTimeout) <= currentTime;
      })
      .forEach(function(obj) {
        obj.lastCheckedAt = currentTime;

        var conditionNames = _.keys(obj.bindings);

        var element = obj.element;

        var data = {
          position: obj.position,
          viewportPosition: viewportPosition,
          state: obj.state
        };

        _.forEach(conditionNames, function(condition) {
          if (conditions.is(element, condition, data)) {
            bindings.trigger(element, condition);
          }
        });
    });
  };

  var update = (function() {

    var _update = function(obj) {
      obj.position = utils.offsetOf(obj.element);
    };

    return function update(element) {
      // Updates scroll's internal representation of every bound element's
      // location on the page. Each element's location is cached to reduce DOM
      // load, so this will need to be run if an element's position changes.
      //
      // Note: `update` is automatically called when the browser is resized
      //
      // Accepts one optional argument, an Element, which will restrict the
      // update to that element only.

      if (element) {
        _update(bindings.get(element));
      } else {
        _.forEach(bindings, _update);
      }
    };

  })();

  var init = function init() {
    // Initialises all the position tracking and checking magic

    update();
    check();
    start();

    settings.hasInitialised = true;
  };

  var start = (function() {

    var onScroll = function onScroll() {
      check();
    };

    var onResize = function onResize() {
      update();
      check();
    };

    onScroll = _.throttle(onScroll, settings.onScrollThrottle);
    onResize = _.debounce(onResize, settings.onResizeDebounce);

    return function start() {
      // Bind event handlers to respond the browsers state changes
      if (!settings.hasBoundEvents) {
        $(window).on('scroll' + settings.eventNamespace, onScroll);
        $(window).on('resize' + settings.eventNamespace, onResize);
        settings.hasBoundEvents = true;
      }
    };

  })();

  var stop = function stop() {
    // Removes the bindings which track the browser's state
    $(window).off('scroll' + settings.eventNamespace);
    $(window).off('resize' + settings.eventNamespace);

    settings.hasBoundEvents = false;
  };

  var on = function on(element, condition, binding, options) {
    // Binds callbacks to an element's position in the viewport
    //
    // Accepts four arguments:
    //   element: the Element which will be tracked
    //   condition: a string identifying the condition that will be tested
    //   binding: a function that will be called when the condition
    //     test returns true
    //   options: on optional Object that contains specific options
    //     for the binding,

    if (_.contains([element, condition, binding], undefined)) {
      throw new Error('Missing argument(s) supplied.');
    }

    var obj = bindings.set(element, condition, binding, options);

    // If this is the first element, initialise the tracking
    if (settings.initialiseOnFirstBinding && !settings.hasInitialised) {
      init();
    }

    return obj;
  };

  var once = function once(element, condition, binding, options) {
    // Similar to `on`, except that the binding will be
    // removed immediately after the first call.

    options = options || {};

    options.once = true;

    return on(element, condition, binding, options);
  };

  var off = function off(element, condition) {
    // Removes bindings from an element.
    //
    // Accepts two arguments:
    //   element: the Element which will no longer be tracked
    //   condition: an optional string which identifies the specific condition
    //     to remove bindings for, if the condition is not provided, all
    //     bindings on an element are removed
    return bindings.remove(element, condition);
  };

  return _.extend(
    // Methods and objects
    {
      bindings: bindings,
      check: check,
      off: off,
      on: on,
      once: once,
      settings: settings,
      start: start,
      stop: stop,
      update: update
    },
    // The properties of these objects are merged in
    // to the above object
    conditions,
    utils
  );

});
