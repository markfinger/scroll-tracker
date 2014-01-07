define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.document');

    QUnit.test('Provides the correct value', function() {
      var _document = viewport.document();
      equal(_document.width, $(document).width(), 'Returns the document\'s width.');
      equal(_document.height, $(document).height(), 'Returns the document\'s height.');
    });

  };

  return {
    test: test
  };

});