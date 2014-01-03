define([
  'viewport/src/utils',
  'viewport/src/bindings'
], function(utils, bindings) {

  var conditions = {};

  var is = function is(element, name, data) {

    if (conditions[name] === undefined) {
      throw new Error('Undefined condition: ' + name);
    }

    data = data || {};
    data.position = data.position || utils.offsetOf(element);
    data.viewport = data.viewport || utils.viewportPosition();
    if (!data.state) {
      var binding = bindings.get(element);
      if (binding) {
        data.state = binding.state;
      } else {
        data.state = {};
      }
    }

    return conditions[name](element, data);
  };

  var defineCondition = function defineCondition(name, test) {
    if (!conditions[name]) {
      conditions[name] = test;
    } else {
      throw new Error('A condition has already been defined with the name "' + name + '"');
    }
  };

  defineCondition('above', function(element, data) {
    return data.position.bottom < data.viewport.top;
  });

  defineCondition('below', function(element, data) {
    return data.position.top > data.viewport.bottom;
  });

  defineCondition('outside', function(element, data) {
    return (
      is(element, 'above', data) ||
      is(element, 'below', data)
    );
  });

  defineCondition('inside', function(element, data) {
    return !(is(element, 'outside', data));
  });

  defineCondition('intersectingTop', function(element, data) {
    return (
      data.position.top <= data.viewport.top &&
      data.position.bottom >= data.viewport.top
    );
  });

  defineCondition('intersectingMiddle', function(element, data) {
    var viewportMiddle = data.viewport.height / 2;
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

  defineCondition('notContained', function(element, data) {
    return (
      data.position.top < data.viewport.top &&
      data.position.bottom > data.viewport.bottom
    );
  });

  defineCondition('contained', function(element, data) {
    return !is(element, 'notContained', data);
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
    if (is(element, 'outside', data)) {
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