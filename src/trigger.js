define([
  'viewport/src/bindings'
], function(bindings) {

  return function trigger(element, name) {

    var obj = bindings.get(element);

    if (
      obj &&
      obj.bindings[name]
    ) {
      var namedBindings = obj.bindings[name];
      if (namedBindings.length) {
        _.each(obj.bindings[name], function(obj) {
          var binding = obj.binding;
          var options = obj.options;
          binding();
          if (options.once) {
            bindings.remove(element, name, binding);
          }
        });
        return true;
      }
    }

    return false;
  };

});