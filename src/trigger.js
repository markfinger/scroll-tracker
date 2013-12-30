define([
  'viewport/src/bindings'
], function(bindings) {

  var trigger = function(element, bindingName) {
    var match = _.first(bindings, function(obj) {
      return obj.element === element;
    });
    if (match && match.bindings && match.bindings[bindingName]) {
      match.bindings[bindingName].call(undefined, match);
      return match;
    } else {
      return false;
    }
  };

  return {
    trigger: trigger
  };
});