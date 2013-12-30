/*

TODO

optimise to buggery
  settle on one of
    current offset tracking with manual update
    fake DOM (?)
    boundingclientrect

defer calling the bindings
setTimeout(<binding>, 0);

*/

define([
  'jquery',
  'lodash',
  'viewport/src/bindings',
  'viewport/src/position',
  'viewport/src/utils'
], function scroll($, _, bindings, position, utils) {

  var eventNamespace = '.scroll';
  var defaultTrackDelay = 100;

  var on = function(element, elementBindings) {

    var trackDelay = elementBindings.trackDelay || defaultTrackDelay;

    var obj = {
      element: element,
      bindings: elementBindings,
      trackDelay: trackDelay,
      lastCheck: -Infinity
    };

    bindings.push(obj);

    return obj;
  };

  var once = function(element) {
    throw Error('not implemented');
  };

  var off = function(element, bindingName) {

    // TODO: this doesn't work as the jQuery objects aren't equal
    // probably need to settle down on using unwrapped elements
    var index = _.indexOf(bindings, function(obj) {
      return obj.element === element;
    });

    if (index !== -1) {
      if (bindingName) {
        var match = bindings[index];
        var keys = _.keys(match.bindings);
        if (_.contains(keys, bindingName)) {
          // If there are other bindings, remove only the specific one
          if (keys.length > 1) {
            delete match.bindings[bindingName];
          } else {
            bindings.splice(index);
          }
        } else {
          return false;
        }
      } else {
        bindings.splice(index);
        return true;
      }
    }

    return false;
  };

  var update = function(element) {
    // TODO
    if (element) {
      throw Error('not implemented');
    }
    _.each(bindings, function(obj) {
      obj.offset = utils.getOffset(obj.element);
    });
  };

  var check = function() {
    console.log(bindings)
    // Precompute these to reduce the load on `viewport`
    var viewportHeight = utils.height();
    var scrollY = utils.scrollY();

    var currentTime = Date.now();

    _(bindings)
      .filter(function(obj) {
        return (currentTime - obj.lastCheck) >= obj.trackDelay;
      }).each(function(obj) {
        // Check if an element is within the viewport and trigger
        // specific bindings.

        obj.lastCheck = currentTime;

        var elementBindings = obj.bindings;
        var precomputed = {
          scrollY: scrollY,
          viewportHeight: viewportHeight,
          offset: obj.offset
        };
        var elementPosition = position.positionOf(obj.element, precomputed);

        // Collect all the bindings to fire
        var matchedBindings = [];
        if (elementPosition.inside && !obj.inViewport) {
          obj.inViewport = true;
          if (elementBindings.enter) {
            matchedBindings.push(elementBindings.enter);
          }
        } else if (elementPosition.outside && obj.inViewport) {
          obj.inViewport = false;
          if (elementBindings.exit) {
            matchedBindings.push(elementBindings.exit);
          }
        }
        _.each(elementPosition, function(value, key) {
          if (value === true && elementBindings[key]) {
            matchedBindings.push(elementBindings[key]);
          }
        });

        _.each(matchedBindings, function(binding) {
          binding({
            element: obj.element,
            position: elementPosition
          });
        });

      });
  };

  var init = function() {
    // TODO: replace this with an auto init when the first element is bound
    update();
    check();
    $(window).on('scroll' + eventNamespace, _.throttle(check, 10));
    $(window).on('resize' + eventNamespace, _.debounce(function() {
      update();
      check();
    }, 100));
  };

  return {
    init: init,
    on: on,
    once: once,
    off: off,
    check: check,
    update: update
  };

});