define([
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