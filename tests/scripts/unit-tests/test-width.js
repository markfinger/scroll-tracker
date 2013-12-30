define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.width');

    QUnit.test('Provides the correct value', function() {
      equal(viewport.width(), window.innerWidth, 'Returns the window\'s width.');
    });

  };

  return {
    test: test
  };

});