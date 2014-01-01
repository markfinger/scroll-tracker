define([
  'viewport/src/on'
], function(on) {

  return function once (element, name, binding, options) {

    options = options || {};

    options.once = true;

    return on(element, name, binding, options);

  };

});