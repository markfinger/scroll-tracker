define([
  'viewport/src/utils',
  'viewport/src/bindings'
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
    conditions: conditions
  };

});