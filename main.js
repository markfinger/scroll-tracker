// viewport - utilities for working within the browser's viewport
// https://github.com/markfinger/viewport

define([
  'lodash',
  'viewport/src/bindings',
  'viewport/src/check',
  'viewport/src/off',
  'viewport/src/on',
  'viewport/src/once',
  'viewport/src/conditions',
  'viewport/src/settings',
  'viewport/src/start',
  'viewport/src/stop',
  'viewport/src/update',
  'viewport/src/utils'
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
