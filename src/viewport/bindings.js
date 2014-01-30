define([
  'lodash',
  './settings',
  './utils'
], function(_, settings, utils) {

  // bindings = [
  //   {
  //     element: <element>,
  //     bindings: {
  //       enter: [
  //         {
  //           binding: <function>,
  //           once: <boolean>
  //           lastCheckedAt: -Infinity
  //         },
  //         ...
  //       ],
  //       ...
  //      },
  //     position: {
  //       top: <number>,
  //       bottom: <number>
  //     },
  //     state: {}
  //   },
  //   ...
  // ];

  var bindings = [];

  bindings.get = function get(element) {
    return _.find(bindings, function(obj) {
      return obj.element === element;
    });
  };

  bindings.set = function set(element, condition, binding, options) {
    var obj = bindings.get(element);

    options = options || {};

    if (!obj) {
      obj = {
        element: element,
        bindings: {},
        position: utils.offsetOf(element),
        state: {},
        checkTimeout: settings.checkTimeout,
        lastCheckedAt: -Infinity
      };
      bindings.push(obj);
    }

    if (options.checkTimeout !== undefined) {
      obj.checkTimeout = options.checkTimeout;
    }

    if (!obj.bindings[condition]) {
      obj.bindings[condition] = [];
    }

    obj.bindings[condition].push({
      binding: binding,
      once: options.once || false
    });

    return obj;
  };

  bindings.clean = function clean() {
    // Cleans out the bindings to remove empty bindings and objects

    _.each(bindings, function(binding) {
      // Remove empty binding groups, eg: 'enter' & 'exit'
      _.each(binding.bindings, function(value, key) {
        if (!value.length) {
          delete binding.bindings[key];
        }
      });
      // Remove any objects without any bindings
      if (_.keys(binding.bindings).length === 0) {
        _.remove(bindings, binding);
      }
    });
  };

  bindings.remove = function remove(element, condition, binding) {
    var obj = bindings.get(element);
    var removed = false;

    if (obj) {
      if (binding) {
        if (_.has(obj.bindings, condition)) {
          var bindingsRemoved = _.remove(obj.bindings[condition], function(obj) {
            return obj.binding === binding;
          });
          if (bindingsRemoved.length) {
            removed = true;
          }
        }
      } else if (condition) {
        if (_.has(obj.bindings, condition)) {
          delete obj.bindings[condition];
          removed = true;
        }
      } else {
        _.remove(bindings, obj);
        removed = true;
      }
      bindings.clean();
    }

    return removed;
  };

  bindings.trigger = function trigger(element, condition, binding) {
    var obj = bindings.get(element);

    if (obj && _.has(obj.bindings, condition)) {

      var matchedBindings = obj.bindings[condition];

      if (binding) {
        matchedBindings = _.filter(matchedBindings, function(obj) {
          return obj.binding === binding;
        });
      }

      _.each(matchedBindings, function(binding) {
        var func = binding.binding;
        if (binding.once) {
          bindings.remove(element, condition, func);
        }
        func({
          position: _.clone(obj.position),
          element: element
        });
      });

      if (matchedBindings.length) {
        return true;
      }

    }

    return false;
  };

  return bindings;
});