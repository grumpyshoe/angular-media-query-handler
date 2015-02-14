
#angular-media-query-handler

This package contains two directives:
 - change-media-query-class
 - element-invisible-for
 ---
### Prerequisites
##### app.js
Add the following to app.js for handling resize and setting widths.
```
//convert 'resize' event to angular event to be able for binding '$watch'
.run(function($rootScope, $window) {
  $rootScope.windowWidth = $window.outerWidth;
  angular.element($window).bind('resize', function() {
    $rootScope.windowWidth = $window.outerWidth;
    $rootScope.$apply('windowWidth');
  });
})

//define custom breakpoints (optional)
.config(['matchmediaProvider',
  function(matchmediaProvider) {
    matchmediaProvider.rules.phone = '(max-width: 300px)';
    matchmediaProvider.rules.tablet = '(min-width: 301px) and (max-width:500px)';
    matchmediaProvider.rules.desktop = '(min-width: 501px)';
  }
])
```
---
### change-media-query-class
Change class on screen size defined by directive [matchmedia-ng](https://github.com/AnalogJ/matchmedia-ng) . Should be used if e.g. Font-size, padding, margin,... should be changed on screen resize / different view sizes.

##### Attributes
* _change-media-query-class-default_ : The default class that should be replaced
* _change-media-query-class_ : A list theat defines which classes should be used for which screen size
   * -> The screen sizes are seperated in: palm, lap and desk

##### Usage
```
<div class="test" change-media-query-class-default="test" change-media-query-class="desk:test--desk palm:test--palm">
 This is a test
</div>
```

```
.test {
  font-family : 'Verdana, "Bitstream Vera Sans", sans-serif';
  font-size : 20px;

  &--desk {
    font-size: 15px;
    font-weight: bold;
  }

  &--palm {
    font-size: 10px;
    color: #123;
  }
}
```
---
### element-invisible-for
Set class for hiding element on defined screen sizes.

##### Attributes
* _element-invisible-for_ : The default class that should be replaced

##### Usage
```
<h1 element-invisible-for="lap">'Allo, 'Allo! 2</h1>
```
