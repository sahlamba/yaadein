'use strict';

var app = angular.module('yaadeinApp');

app.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            element[0].focus();
        });
      }, true);
  };    
});

app.directive('scroller', function () {
    return {
        restrict: 'A',
        scope: {
            loadingMethod: '&'
        },
        link: function (scope, elem, attrs) {
            var rawElement = elem[0];
            elem.bind('scroll', function () {
                if((rawElement.scrollTop + rawElement.offsetHeight + 10) >= rawElement.scrollHeight){
                    scope.$apply(scope.loadingMethod);
                }
            });
        }
    };
});