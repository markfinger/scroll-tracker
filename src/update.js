define([
  'lodash',
  'viewport/src/bindings',
  'viewport/src/utils'
], function(_, bindings, utils) {

  var _update = function(obj) {
    obj.position = utils.offsetOf(obj.element);
  };

  return function update(element) {
    if (element) {
      _update(bindings.get(element));
    } else {
      _.each(bindings, _update);
    }
  };

});