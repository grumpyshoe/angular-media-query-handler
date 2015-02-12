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
   * .run(function($rootScope, $window) {
   *   $rootScope.windowWidth = $window.outerWidth;
   *   angular.element($window).bind('resize', function() {
   *     $rootScope.windowWidth = $window.outerWidth;
   *     $rootScope.$apply('windowWidth');
   *   });
   * })
   *
   * Attributes
   * ==============
   *  - change-media-query-class-default : The default class that should be replaced
   *  - change-media-query-class : A list theat defines which classes should be used for which screen size
   *    --> The screen sizes are seperated in: palm, lap and desk
   *
   * Example
   * ==============
   *  <div class="test" change-media-query-class-default="test" change-media-query-class="desk:test--desk palm:test--palm">
   #    test phone
   #  </div>
   */
  'use strict';
  //login directive
  angular.module('cssMediaQueryClassChange', ['matchmedia-ng']).directive('changeMediaQueryClass', [
    '$rootScope',
    'matchmedia',
    function($rootScope, matchmedia) {
      return {
        restrict: 'A',
        link: function(scope, elements, attrs) {
          var classeChanges = attrs.changeClass.split(' ');
          var classes = {};
          for (var i = 0; i < classeChanges.length; i++) {
            var changeDetails = classeChanges[i].split(':');
            classes[changeDetails[0]] = changeDetails[1];
          }
          //add $watch for handling window resize
          $rootScope.$watch('windowWidth', function(newVal, oldVal) {
            if (matchmedia.isPhone() && classes.palm) {
              elements.removeClass(attrs.changeClassDefault);
              elements.addClass(classes.palm);
            } else if (matchmedia.isTablet() && classes.lap) {
              elements.removeClass(attrs.changeClassDefault);
              elements.addClass(classes.lap);
            } else if (matchmedia.isDesktop() && classes.desk) {
              elements.removeClass(attrs.changeClassDefault);
              elements.addClass(classes.desk);
            } else {
              elements.addClass(attrs.changeClassDefault);
              for (var i = 0; i < Object.keys(classes).length; i++) {
                elements.removeClass(classes[Object.keys(classes)[i]]);
              }
            }
          });
        }
      };
    }
  ]);
}());
