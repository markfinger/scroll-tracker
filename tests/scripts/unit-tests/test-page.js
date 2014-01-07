define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.page');

    QUnit.test('Provides the correct value', function() {
      var page = viewport.page();
      equal(page.width, $(document).width(), 'Returns the document\'s width.');
      equal(page.height, $(document).height(), 'Returns the document\'s height.');
    });

  };

  return {
    test: test
  };

});