// viewport - utilities for working within the browser's viewport
// https://github.com/markfinger/viewport

define([
  'lodash',
  'viewport/src/bindings',
  'viewport/src/on',
  'viewport/src/position',
  'viewport/src/settings',
  'viewport/src/trigger',
  'viewport/src/utils'
], function(_, bindings, on, position, settings, trigger, utils) {

  // Merge the modules
  return _.assign(
    {
      bindings: bindings,
      settings: settings
    },
    on,
    position,
    trigger,
    utils
  );

});
