define([
  'lodash'
], function(_) {

  var positions = {};

  var definePosition = function(name, position) {
    positions[name] = position;
  };

  var checkPosition = function(name, position) {
    return positions[name](position);
  };

  definePosition('above', function(position) {
    return position.elementBottom < position.viewportTop;
  });

  definePosition('below', function(position) {
    return position.elementTop > position.viewportBottom;
  });

  definePosition('outside', function(position) {
    return (
      checkPosition('above', position) ||
      checkPosition('below', position)
    );
  });

  definePosition('inside', function(position) {
    return !(checkPosition('outside', position));
  });

  definePosition('intersectsTop', function(position) {
    return (
      position.elementTop <= position.viewportTop &&
      position.elementBottom >= position.viewportTop
    );
  });

  definePosition('intersectsMiddle', function(position) {
    var viewportMiddle = position.viewportHeight / 2;
    return (
      position.elementTop <= viewportMiddle &&
      position.elementBottom >= viewportMiddle
    );
  });

  definePosition('intersectsBottom', function(position) {
    return (
      position.elementTop <= position.viewportBottom &&
      position.elementBottom >= position.viewportBottom
    );
  });

  definePosition('contained', function(position) {
    return (
      checkPosition('inside', position) &&
      !(
        checkPosition('intersectsTop', position) ||
        checkPosition('intersectsBottom', position)
      )
    );
  });

  return {
    definePosition: definePosition,
    checkPosition: checkPosition
  };

});