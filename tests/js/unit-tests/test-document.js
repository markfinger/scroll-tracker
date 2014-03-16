(function() {

  QUnit.module('scroll.document');

  QUnit.test('Provides the correct value', function() {
    var _document = scroll.document();
    equal(_document.width, $(document).width(), 'Returns the document\'s width.');
    equal(_document.height, $(document).height(), 'Returns the document\'s height.');
  });

})();
