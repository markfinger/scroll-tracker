define([
  'lodash',
  'viewport/src/bindings',
  'viewport/src/conditions',
  'viewport/src/settings',
  'viewport/src/utils'
], function(_, bindings, conditions, settings, utils) {

  return function check(element) {
    // Checks the conditions of each bound Element and, if successful,
    // triggers any Function bound to that Element and condition.
    // Accepts an optional Element argument, which restricts the checks
    // to that Element only.

    var bindingsToCheck = bindings;

    if (_.isElement(element)) {
      var binding = bindings.get(element);
      if (!binding) {
        return;
      }
      bindingsToCheck = [binding];
    }

    var currentTime = _.now();
    var viewportPosition = utils.position();

    _(bindingsToCheck)
      .filter(function(obj) {
        return (obj.lastCheckedAt + obj.checkTimeout) <= currentTime;
      })
      .each(function(obj) {
        obj.lastCheckedAt = currentTime;

        var conditionNames = _.keys(obj.bindings);

        var element = obj.element;

        var data = {
          position: obj.position,
          viewport: viewportPosition,
          state: obj.state
        };

        _.each(conditionNames, function(condition) {
          if (conditions.is(element, condition, data)) {
            bindings.trigger(element, condition);
          }
        });
    });
  };

});