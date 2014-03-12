
// Configurable values and flags which alter the
// behaviour of viewport

define('viewport/settings',{
  // A positive number lowers the top of the viewport,
  // while a negative number raises the top of the viewport
  topPadding: 0,
  // A positive number raises the bottom of the viewport,
  // while a negative number lowers the bottom of the viewport
  bottomPadding: 0,
  // Enforced timeout between checks on an element
  checkTimeout: 100,
  // Enforced delay between calls to the scroll handler
  onScrollThrottle: 10,
  // Enforced debounced delay on calls to the resize handler
  onResizeDebounce: 100,
  // Event namespace used to preserve control over jQuery events
  eventNamespace: '.viewport',
  // Initialise when bindings are added
  initialiseOnBinding: true,
  // Denotes that initialisation has completed
  hasInitialised: false,
  // Denotes that event listeners have been bound
  hasBoundEvents: false
});
define('viewport/utils',[
  'jquery',
  './settings'
], function($, settings) {

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
    // viewport.settings

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
});
define('viewport/bindings',[
  'lodash',
  './settings',
  './utils'
], function(_, settings, utils) {

  // bindings = [
  //   {
  //     element: <element>,
  //     bindings: {
  //       enter: [
  //         {
  //           binding: <function>,
  //           once: <boolean>
  //           lastCheckedAt: -Infinity
  //         },
  //         ...
  //       ],
  //       ...
  //      },
  //     position: {
  //       top: <number>,
  //       bottom: <number>
  //     },
  //     state: {}
  //   },
  //   ...
  // ];

  var bindings = [];

  bindings.get = function get(element) {
    return _.find(bindings, function(obj) {
      return obj.element === element;
    });
  };

  bindings.set = function set(element, condition, binding, options) {
    var obj = bindings.get(element);

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
      bindings.push(obj);
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

  bindings.clean = function clean() {
    // Cleans out the bindings to remove empty bindings and objects

    _.each(bindings, function(binding) {
      // Remove empty binding groups, eg: 'enter' & 'exit'
      _.each(binding.bindings, function(value, key) {
        if (!value.length) {
          delete binding.bindings[key];
        }
      });
      // Remove any objects without any bindings
      if (_.keys(binding.bindings).length === 0) {
        _.remove(bindings, binding);
      }
    });
  };

  bindings.remove = function remove(element, condition, binding) {
    var obj = bindings.get(element);
    var removed = false;

    if (obj) {
      if (binding) {
        if (_.has(obj.bindings, condition)) {
          var bindingsRemoved = _.remove(obj.bindings[condition], function(obj) {
            return obj.binding === binding;
          });
          if (bindingsRemoved.length) {
            removed = true;
          }
        }
      } else if (condition) {
        if (_.has(obj.bindings, condition)) {
          delete obj.bindings[condition];
          removed = true;
        }
      } else {
        _.remove(bindings, obj);
        removed = true;
      }
      bindings.clean();
    }

    return removed;
  };

  bindings.trigger = function trigger(element, condition, binding) {
    var obj = bindings.get(element);

    if (obj && _.has(obj.bindings, condition)) {

      var matchedBindings = obj.bindings[condition];

      if (binding) {
        matchedBindings = _.filter(matchedBindings, function(obj) {
          return obj.binding === binding;
        });
      }

      _.each(matchedBindings, function(binding) {
        var func = binding.binding;
        if (binding.once) {
          bindings.remove(element, condition, func);
        }
        func({
          position: _.clone(obj.position),
          element: element
        });
      });

      if (matchedBindings.length) {
        return true;
      }

    }

    return false;
  };

  return bindings;
});
define('viewport/conditions',[
  './utils',
  './bindings'
], function(utils, bindings) {

  var conditions = {};

  var is = function is(element, condition, data) {
    // Indicates if an Element's position in the viewport matches
    // a specific condition
    //
    // Accepts two arguments:
    //   element: the Element which viewport will check
    //   condition: a string identifying the condition that viewport
    //     will check for
    //   data: an optional Object which contains precomputed information
    //     about an element's position and state, as well as the
    //     viewport's position. Precomputing this Object can be useful
    //     if you are trying to optimise repetitive calls to `is`.

    if (condition[0] === '!') {
      return !is(element, condition.slice(1), data);
    }

    if (conditions[condition] === undefined) {
      throw new Error('Undefined condition: ' + condition);
    }

    data = data || {};
    data.position = data.position || utils.offsetOf(element);
    data.viewport = data.viewport || utils.position();
    if (!data.state) {
      var binding = bindings.get(element);
      if (binding) {
        data.state = binding.state;
      } else {
        data.state = {};
      }
    }

    return conditions[condition](element, data);
  };

  var defineCondition = function defineCondition(condition, binding) {
    if (!conditions[condition]) {
      conditions[condition] = binding;
    } else {
      throw new Error('A condition has already been defined with the name "' + condition + '"');
    }
  };

  defineCondition('above', function(element, data) {
    return data.position.bottom < data.viewport.top;
  });

  defineCondition('below', function(element, data) {
    return data.position.top > data.viewport.bottom;
  });

  defineCondition('inside', function(element, data) {
    return !(
      is(element, 'above', data) ||
      is(element, 'below', data)
    );
  });

  defineCondition('intersectingTop', function(element, data) {
    return (
      data.position.top <= data.viewport.top &&
      data.position.bottom >= data.viewport.top
    );
  });

  defineCondition('intersectingMiddle', function(element, data) {
    var viewportMiddle = data.viewport.top + (data.viewport.height / 2);
    return (
      data.position.top <= viewportMiddle &&
      data.position.bottom >= viewportMiddle
    );
  });

  defineCondition('intersectingBottom', function(element, data) {
    return (
      data.position.top <= data.viewport.bottom &&
      data.position.bottom >= data.viewport.bottom
    );
  });

  defineCondition('contained', function(element, data) {
    return (
      data.position.top >= data.viewport.top &&
      data.position.bottom <= data.viewport.bottom
    );
  });

  defineCondition('enter', function(element, data) {
    var state = data.state;
    if (is(element, 'inside', data)) {
      if (!state.inViewport) {
        state.inViewport = true;
        return true;
      }
    } else {
      state.inViewport = false;
    }
    return false;
  });

  defineCondition('exit', function(element, data) {
    var state = data.state;
    if (is(element, '!inside', data)) {
      if (
        state.inViewport === true ||
        state.inViewport === undefined
      ) {
        state.inViewport = false;
        return true;
      }
    } else {
      state.inViewport = true;
    }
    return false;
  });

  return {
    is: is,
    defineCondition: defineCondition,
    conditions: conditions
  };

});
define('viewport/check',[
  'lodash',
  './bindings',
  './conditions',
  './settings',
  './utils'
], function(_, bindings, conditions, settings, utils) {

  return function check(element) {
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
      .each(function(obj) {
        obj.lastCheckedAt = currentTime;

        var conditionNames = _.keys(obj.bindings);

        var element = obj.element;

        var data = {
          position: obj.position,
          viewport: viewportPosition,
          state: obj.state
        };

        _.each(conditionNames, function(condition) {
          if (conditions.is(element, condition, data)) {
            bindings.trigger(element, condition);
          }
        });
    });
  };

});
define('viewport/off',[
  './bindings'
], function(bindings) {

  return function off(element, condition) {
    // Removes bindings from an element.
    //
    // Accepts two arguments:
    //   element: the Element which viewport will no longer track
    //   condition: an optional string which identifies the specific condition
    //     to remove bindings for
    return bindings.remove(element, condition);

  };

});
define('viewport/update',[
  'lodash',
  './bindings',
  './utils'
], function(_, bindings, utils) {

  var _update = function(obj) {
    obj.position = utils.offsetOf(obj.element);
  };

  return function update(element) {
    // Updates viewport's internal representation of every bound element's
    // location on the page. Viewport caches the location of each element to
    // reduce DOM load, so this is best run after the location of an element
    // has changed.
    //
    // Accepts one optional argument, an Element, which will restrict the
    // update to that element only.

    if (element) {
      _update(bindings.get(element));
    } else {
      _.each(bindings, _update);
    }
  };

});
define('viewport/start',[
  'jquery',
  'lodash',
  './check',
  './settings',
  './update'
], function($, _, check, settings, update) {

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
    // Add event handlers that viewport uses to track scroll
    // and resize events that are fired by the browser.
    if (!settings.hasBoundEvents) {
      $(window).on('scroll' + settings.eventNamespace, onScroll);
      $(window).on('resize' + settings.eventNamespace, onResize);
      settings.hasBoundEvents = true;
    }
  };

});

define('viewport/init',[
  './check',
  './settings',
  './start',
  './update'
], function(check, settings, start, update) {

  return function init() {
    // Initialises all the position tracking and checking magic

    update();
    check();
    start();

    settings.hasInitialised = true;
  };

});

define('viewport/on',[
  './bindings',
  './init',
  './settings'
], function(bindings, init, settings) {

  /*

   viewport.on(element, condition, binding[, options])

   Binds specific functions to events that relate to an
   element's position in the viewport.

   Accepts four arguments:
   element: the Element which viewport will track
   condition: a string representing the condition that viewport
   will check for
   binding: a function that will be called when the condition
   is true
   options: on optional Object that contains specific options
   for the binding
   */

  return function on(element, condition, binding, options) {

    if (_.contains([element, condition, binding], undefined)) {
      throw new Error('Missing argument(s) supplied.');
    }

    var obj = bindings.set(element, condition, binding, options);

    // Defer initialisation until the first element has been bound
    if (settings.initialiseOnBinding && !settings.hasInitialised) {
      init();
    }

    return obj;
  };

});
define('viewport/once',[
  './on'
], function(on) {

  return function once (element, condition, binding, options) {
    // Similar to viewport.on, except that the binding will be
    // removed immediately after the first call.

    options = options || {};

    options.once = true;

    return on(element, condition, binding, options);

  };

});
define('viewport/stop',[
  'jquery',
  './settings'
], function($, settings) {

  return function stop() {
    // Remove event handlers that viewport uses to track scroll
    // and resize events that are fired by the browser.
    $(window).off('scroll' + settings.eventNamespace);
    $(window).off('resize' + settings.eventNamespace);

    settings.hasBoundEvents = false;
  };

});

// viewport - utilities for working within the browser's viewport
// https://github.com/markfinger/viewport

define('viewport',[
  'lodash',
  'viewport/bindings',
  'viewport/check',
  'viewport/off',
  'viewport/on',
  'viewport/once',
  'viewport/conditions',
  'viewport/settings',
  'viewport/start',
  'viewport/stop',
  'viewport/update',
  'viewport/utils'
], function(_, bindings, check, off, on, once, conditions, settings, start, stop, update, utils) {

  return _.assign(
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
