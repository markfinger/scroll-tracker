define([
  'jquery',
  'lodash',
  'viewport',
  'scroll'
], function($, _, viewport, scroll) {

  var testContainer;
  var topOffsetElement;
  var bottomOffsetElement;
  var testToggle;
  var testElements;

  var initTestElements = function() {
    testElements = _.map(_.range(50), function() {
      var element = $('<div class="test-element">');
      element.appendTo(testContainer);
      return element;
    });
    checkElementsInViewport();
    scroll.init();
    _.each(testElements, function(element) {
      var elements = {
        inside: element.find('.inside'),
        outside: element.find('.outside'),
        above: element.find('.above'),
        below: element.find('.below'),
        contained: element.find('.contained'),
        intersectsTop: element.find('.intersectsTop'),
        intersectsBottom: element.find('.intersectsBottom'),
        intersectsMiddle: element.find('.intersectsMiddle')
      };
      var updateElement = function(obj) {
        var position = obj.position;
        _.each(elements, function(element, property) {
          var value = position[property];
          if (value === true || value === false) {
            var hasClass = element.hasClass('positive');
            if (value === true && !hasClass) {
              element.addClass('positive');
            } else if (value === false && hasClass) {
              element.removeClass('positive');
            }
          } else if (typeof value === 'number') {
            element.text(property + ': ' + value);
          }
        });
      };
      scroll.on(element, {
        enter: updateElement,
        exit: updateElement,
        contained: updateElement,
        intersectsTop: updateElement,
        intersectsBottom: updateElement
      });
    });
  };

  var initViewportOffsets = function() {
    viewport.setViewport({
      topOffset: topOffsetElement.outerHeight(),
      bottomOffset: bottomOffsetElement.outerHeight()
    });
  };

  var checkElementsInViewport = function() {
    _.each(testElements, function(testElement) {
      var position = viewport.getPositionOf(testElement);

      var positionFormatter = function(value, className, textValue) {
        var element = testElement.find('.' + className);
        if (!element.length) {
          element = $('<span class="position ' + className + '">');
          element.appendTo(testElement);
        }

        element.addClass('positive');

        var text;

        if (value === true || value === false) {
          text = className;
          if (!value) {
            element.removeClass('positive');
          }
        } else if (typeof value === "object") {
          element.remove();
          _.each(value, function(_value, _key) {
            positionFormatter(_value, className + '-' + _key, className + '.' + _key);
          });
          return;
        } else if (typeof value === "number") {
          text = className + ': ' + value;
        } else {
          text = textValue + ': ' + value;
        }

        element.text(text);

        if (!element.length) {
          element = $('<span class="position ' + className + '">' + className + '</span>');
          element.appendTo(testElement);
        }
      };

      _.each(position, positionFormatter);
    });
  };

  var setBindings = function() {
    testToggle.on('click', function() {
      testToggle.attr('disabled', true);
      checkElementsInViewport();
      testToggle.attr('disabled', false);
    });
  };

  var init = function() {
    testContainer = $('.test-container');
    topOffsetElement = $('.viewport-top-offset');
    bottomOffsetElement = $('.viewport-bottom-offset');
    testToggle = $('.test-toggle');

    initViewportOffsets();
    _.defer(initTestElements);

    setBindings();
  };

  return {
    init: init,
    checkElementsInViewport: checkElementsInViewport
  };
});