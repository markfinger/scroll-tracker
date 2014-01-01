define([
  'lodash',
  'viewport/src/bindings',
  'viewport/src/utils'
], function(_, bindings, utils) {

  return function check(element) {

    if (element) {
      throw new Error('not implemented');
    }

    var viewportHeight = utils.height();
    var scrollY = utils.scrollY();

    var currentTime = Date.now();

    _(bindings)
      .filter(function(obj) {
        return (currentTime - obj.lastCheck) >= obj.trackDelay;
      }).each(function(obj) {
        // Check if an element is within the viewport and trigger
        // specific bindings.

        obj.lastCheck = currentTime;

        var elementBindings = obj.bindings;
        var precomputed = {
          scrollY: scrollY,
          viewportHeight: viewportHeight,
          offset: obj.offset
        };

        // for viewportRange in viewportRanges
        //   if scrollY >= viewportRange.top && scrollY <= viewportRange.bottom >= viewportRange

//        var elementPosition = positionOf.positionOf(obj.element, precomputed);

        // Collect all the bindings to fire
        var matchedBindings = [];
        if (elementPosition.inside && !obj.inViewport) {
          obj.inViewport = true;
          if (elementBindings.enter) {
            matchedBindings.push(elementBindings.enter);
          }
        } else if (elementPosition.outside && obj.inViewport) {
          obj.inViewport = false;
          if (elementBindings.exit) {
            matchedBindings.push(elementBindings.exit);
          }
        }
        _.each(elementPosition, function(value, key) {
          if (value === true && elementBindings[key]) {
            matchedBindings.push(elementBindings[key]);
          }
        });

        _.each(matchedBindings, function(binding) {
          binding({
            element: obj.element,
            position: elementPosition
          });
        });

      });
  };

});