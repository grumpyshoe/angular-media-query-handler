(function() {
  /**
   * @ngdoc directive
   * @name css-media-query-class-change
   * @description
   * @author Thomas Cirksena grumpyshoe@gmail.com
   *
   * Change class on screen size defined by 'matchmedia'
   *
   * app.js
   * ===========
   *
   * Add the following to app.js:
   *
   * //convert 'resize' event to angular event to be able for binding '$watch'
   * .run(function($rootScope, $window) {
   *   $rootScope.windowWidth = $window.outerWidth;
   *   angular.element($window).bind('resize', function() {
   *     $rootScope.windowWidth = $window.outerWidth;
   *     $rootScope.$apply('windowWidth');
   *   });
   * })
   *
   *
   * //define custom breakpoints (optional)
   * .config(['matchmediaProvider',
   *   function(matchmediaProvider) {
   *     matchmediaProvider.rules.phone = '(max-width: 300px)';
   *     matchmediaProvider.rules.tablet = '(min-width: 500px) and (max-width:600px)';
   *     matchmediaProvider.rules.desktop = '(max-width: 900px)';
   *   }
   * ])
   *
   *
   * Attributes
   * ==============
   *  - change-media-query-class-default : The default class that should be replaced
   *  - change-media-query-class : A list theat defines which classes should be used for which screen size
   *    --> The screen sizes are seperated in: palm, lap and desk
   *
   * Example
   * ==============
   *
   * - html-snippet
   * -----------------
   * <div class="test" change-media-query-class-default="test" change-media-query-class="desk:test--desk palm:test--palm">
   *  This is a test
   * </div>
   *
   * - scss-snippet
   * -----------------
   * .test {
   *   font-family : 'Verdana, "Bitstream Vera Sans", sans-serif';
   *   font-size : 20px;
   *
   *   &--desk {
   *     @extend .test;
   *     font-size: 15px;
   *     font-weight: bold;
   *   }
   *
   *   &--palm {
   *     @extend .test;
   *     font-size: 10px;
   *     color: #123;
   *   }
   * }
   *
   */
  'use strict';

  //login directive
  angular.module('mediaQueryHandler', ['matchmedia-ng'])

  .directive('changeMediaQueryClass', [
    '$rootScope',
    'matchmedia',
    function($rootScope, matchmedia) {

      var classes = {};
      var removeModifierClasses = function removeModifierClasses(elements) {
        var classKeys = Object.keys(classes);
        for (var i = 0; i < classKeys.length; i++) {
          elements.removeClass(classes[classKeys[i]]);
        }
      }

      return {
        restrict: 'A',
        link: function(scope, elements, attrs) {

          var classeChanges = attrs.changeMediaQueryClass.split(' ');
          //var classes = {};
          for (var i = 0; i < classeChanges.length; i++) {
            var changeDetails = classeChanges[i].split(':');
            classes[changeDetails[0]] = changeDetails[1];
          }

          //add $watch for handling window resize
          $rootScope.$watch('windowWidth', function(newVal, oldVal) {

            removeModifierClasses(elements);

            if (matchmedia.isPhone() && classes.palm) {
              elements.removeClass(attrs.changeMediaQueryClassDefault);
              elements.addClass(classes.palm);
            } else if (matchmedia.isTablet() && classes.lap) {
              elements.removeClass(attrs.changeMediaQueryClassDefault);
              elements.addClass(classes.lap);
            } else if (matchmedia.isDesktop() && classes.desk) {
              elements.removeClass(attrs.changeMediaQueryClassDefault);
              elements.addClass(classes.desk);
            } else {

              elements.addClass(attrs.changeMediaQueryClassDefault);
              for (var i = 0; i < Object.keys(classes).length; i++) {
                elements.removeClass(classes[Object.keys(classes)[i]]);
              }
            }

          })

        }
      };
    }
  ])

  .directive('elementInvisibleFor', [
    '$rootScope',
    'matchmedia',
    function($rootScope, matchmedia) {

      return {
        restrict: 'A',
        link: function(scope, elements, attrs) {

          var classes = {};
          var invisibleClasses = attrs.invisibleFor.split(' ');
          for (var i = 0; i < elementInvisibleFor.length; i++) {
            classes[invisibleClasses[0]] = true;
          }

          //add $watch for handling window resize
          $rootScope.$watch('windowWidth', function(newVal, oldVal) {

            elements.removeClass('cssMediaQueryClasschange--invisible');

            if (matchmedia.isPhone() && classes.palm) {
              elements.addClass('cssMediaQueryClasschange--invisible');
            } else if (matchmedia.isTablet() && classes.lap) {
              elements.addClass('cssMediaQueryClasschange--invisible');
            } else if (matchmedia.isDesktop() && classes.desk) {
              elements.addClass('cssMediaQueryClasschange--invisible');
            }

          })

        }
      };
    }
  ])

}());
