// viewport - utilities for working within the browser's viewport
// https://github.com/markfinger/viewport

define([
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
