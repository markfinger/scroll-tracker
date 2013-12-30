define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.height');

    QUnit.test('Provides the correct value', function() {
      equal(viewport.height(), window.innerHeight, 'Returns the window\'s height.');
    });

    QUnit.test('Respects viewport.settings.topPadding', function() {
      viewport.settings.topPadding = 100;
      notEqual(viewport.height(), window.innerHeight, 'should not equal window.innerHeight');
      equal(viewport.height(), window.innerHeight - 100, 'should equal window.innerHeight minus viewport.settings.topPadding');
    });

    QUnit.test('Respects viewport.settings.bottomPadding', function() {
      viewport.settings.bottomPadding = 100;
      notEqual(viewport.height(), window.innerHeight, 'should not equal window.innerHeight');
      equal(viewport.height(), window.innerHeight - 100, 'should equal window.innerHeight minus viewport.settings.bottomPadding');
    });

    QUnit.test('Respects both viewport.settings.topPadding and viewport.settings.bottomPadding', function() {
      viewport.settings.topPadding = 100;
      viewport.settings.bottomPadding = 100;
      notEqual(viewport.height(), window.innerHeight, 'should not equal window.innerHeight');
      equal(viewport.height(), window.innerHeight - 200, 'should equal window.innerHeight minus (viewport.settings.topPadding + viewport.settings.bottomPadding)');
    });

  };

  return {
    test: test
  };

});