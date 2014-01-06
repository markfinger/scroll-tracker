define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.position');

    QUnit.test('Provides the correct values', function() {
      var position = viewport.position();
      equal(position.top, viewport.scrollY(), 'contains a top property with the correct value.');
      equal(position.bottom, viewport.scrollY() + viewport.height(), 'contains a bottom property with the correct value.');
      equal(position.height, viewport.height(), 'contains a height property with the correct value.');
    });

  };

  return {
    test: test
  };

});