(function() {
  /**
   * @ngdoc directive
   * @name tpl-select
   * @description
   * @author Thomas Cirksena grumpyshoe@gmail.com
   *
   * Creates a customizable select dropdown
   *
   * Attributes:
   * tpl-options: array of options shown on select
   * tpl-label: the object key that represents the label that data
   * ng-model: the model where the data should be saved
   *
   * @example creating dynamic filled select field (tpl-select):
   * <div tpl-select tpl-options="myOptions" tpl-label="myLabelKey" ng-model="myModel"></div>
   *
   * @example creating dynamic filled select field by using String-array for parameter(tpl-select):
   * <div tpl-select tpl-options="myOptions" ng-model="myModel"></div>
   *
   * @example creating static filled select field (tpl-select-static):
   * <div tpl-select-static ng-model="myModel">
   *   <option value="key1">label1</option>
   *   <option value="key2">label2</option>
   * </div>
   *
   *  Note:
   *  There is no real styling! You have to style the dropdown by your own!
   */
  'use strict';

  //login directive
  angular.module('cssMediaQueryClassChange', ['matchmedia-ng'])

  .directive('changeMediaQueryClass', [
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

          })

        }
      };
    }
  ])

}());
