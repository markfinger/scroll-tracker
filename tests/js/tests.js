define([
  'jquery',
  'lodash',
  'viewport'
], function($, _, viewport) {

  var testContainer;
  var testToggle;
  var testElements = [];

  var initTestElements = function() {
    _.each(_.range(200), function() {
      var element = $('<div class="test-element">');
      element.appendTo(testContainer);
      testElements.push(element);
    });
  };

  var checkElementsInViewport = function() {
    _.each(testElements, function(testElement) {
      var position = viewport.getElementPosition(testElement);
      _.each(position, function(value, key) {
        if (value === true || value === false) {
          var positionElement = testElement.find('.' + key);
          if (!positionElement.length) {
            positionElement = $('<span class="position ' + key + '">' + key + '</span>');
            positionElement.appendTo(testElement);
          }
          if (value) {
            positionElement.addClass('positive');
          } else {
            positionElement.removeClass('positive');
          }
        }
      });
    });
  };

  var setBindings = function() {
    testToggle.on('click', checkElementsInViewport);
  };

  var init = function() {
    testContainer = $('.test-container');
    testToggle = $('.test-toggle');

    initTestElements();

    setBindings();
  };

  return {
    init: init
  };
});