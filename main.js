// viewport - utilities for working within the browser's viewport
// https://github.com/markfinger/viewport

define([
  'lodash',
  'viewport/lib/settings',
  'viewport/lib/position',
  'viewport/lib/on',
  'viewport/lib/utils'
], function(_, settings, position, on, utils) {

  // Merge the modules
  return _.assign(
    { settings: settings },
    position,
    on,
    utils
  );

});
