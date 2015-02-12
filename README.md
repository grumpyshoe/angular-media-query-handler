
#css-media-query-class-change
Change class on screen size defined by directive [matchmedia-ng](https://github.com/AnalogJ/matchmedia-ng) .

# - app.js -
Add the following to app.js for handling resize and setting widths
```
.run(function($rootScope, $window) {
  $rootScope.windowWidth = $window.outerWidth;
  angular.element($window).bind('resize', function() {
    $rootScope.windowWidth = $window.outerWidth;
    $rootScope.$apply('windowWidth');
  });
})

.config(['matchmediaProvider',
  function(matchmediaProvider) {
    matchmediaProvider.rules.phone = '(max-width: 300px)';
    matchmediaProvider.rules.tablet = '(min-width: 500px) and (max-width:600px)';
    matchmediaProvider.rules.desktop = '(max-width: 900px)';
  }
])
```

# - Attributes -
* _change-media-query-class-default_ : The default class that should be replaced
* _change-media-query-class_ : A list theat defines which classes should be used for which screen size
   * -> The screen sizes are seperated in: palm, lap and desk

# - Example -

### html-snippet
```
<div class="test" change-media-query-class-default="test" change-media-query-class="desk:test--desk palm:test--palm">
 This is a test
</div>
```

### scss-snippet
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

