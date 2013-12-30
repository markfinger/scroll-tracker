define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.scrollY');

    QUnit.test('Provides the correct value', function() {
      equal(viewport.scrollY(), window.pageYOffset, 'Returns the viewport\'s offset from the document\'s top.');
    });

  };

  return {
    test: test
  };

});