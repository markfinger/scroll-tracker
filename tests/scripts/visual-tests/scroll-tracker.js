define([
  'jquery',
  'lodash',
  'viewport'
], function($, _, viewport) {

  var container;
  var viewportTopElement;
  var viewportBottomElement;
  var elements = {};
  var quadrants = [];

  var initViewportOffsets = function() {
    viewport.settings.topPadding = viewportTopElement.outerHeight();
    viewport.settings.bottomPadding = viewportBottomElement.outerHeight();
  };

  var insertElements = function() {
    var conditions = _.keys(viewport.conditions);

    _.each(conditions, function(condition) {
      _.each(_.range(3), function() {
        elements[condition] = elements[condition] || [];
        var element = $(
          '<div class="test-element ' + condition + '">' +
            condition +
          '</div>'
        );
        elements[condition].push(element);
        container.append(element);
      });
    });
  };

  var positionElements = function() {

    var shuffledElements = _.shuffle(_.flatten(_.values(elements)));

    var elementHeight = shuffledElements[0].outerHeight();
    var elementWidth = Math.max.apply(null, _.invoke(shuffledElements, 'outerWidth'));

    _.each(shuffledElements, function(element) {
      element.css({
        top: _.random(window.innerHeight * 5 - elementHeight),
        left: _.random(window.innerWidth - elementWidth)
      });
    });
  };

  var _setAnimationName = function(element, name) {
    if (element.style.animationName !== undefined) {
      element.style.animationName = name;
    } else if (element.style.webkitAnimationName !== undefined) {
      element.style.webkitAnimationName = name;
    } else if (element.style.MozAnimationName !== undefined) {
      element.style.MozAnimationName = name;
    }
  };

  var bindElements = function() {
    _.each(elements, function(elementsToBind, binding) {
      _.each(elementsToBind, function($element) {
        var element = $element.get(0);
        var animating = false;

        viewport.on(element, binding, function() {
          if (!animating) {
            requestAnimationFrame(function() {
              _setAnimationName(element, 'colourPulse');
              animating = true;
            });
          }
        });

        $element.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
          requestAnimationFrame(function() {
            _setAnimationName(element, '');
            animating = false;
          });
        });
      });
    });
  };

  var setBindings = function() {
    $(window).on('resize', _.debounce(initViewportOffsets, 10));

    bindElements();
  };

  var init = function() {
    container = $('.test-container');
    viewportTopElement = $('.viewport-top');
    viewportBottomElement = $('.viewport-bottom');

    initViewportOffsets();

    insertElements();
    positionElements();

    setBindings();

    viewport.check();
  };

  return {
    init: init
  };
});