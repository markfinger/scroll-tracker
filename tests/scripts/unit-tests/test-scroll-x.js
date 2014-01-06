define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.scrollX');

    QUnit.test('Provides the correct value', function() {
      equal(viewport.scrollX(), window.pageXOffset, 'Returns the viewport\'s offset from the document\'s left.');
    });

  };

  return {
    test: test
  };

});