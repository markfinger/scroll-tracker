define([
  'lodash',
  'viewport/src/bindings',
  'viewport/src/utils'
], function(_, bindings, utils) {

  return function update(element) {
    // TODO
    if (element) {
      throw Error('not implemented');
    }
    _.each(bindings, function(obj) {
      obj.offset = utils.getOffset(obj.element);
    });
  };

});