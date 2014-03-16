(function() {

  QUnit.module('scroll.scrollX');

  QUnit.test('Provides the correct value', function() {
    equal(scroll.scrollX(), window.pageXOffset, 'Returns the scroll\'s offset from the document\'s left.');
  });

})();
