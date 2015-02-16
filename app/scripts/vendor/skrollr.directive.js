'use strict';

angular.module('directives.skrollr', [])
  .directive('skrollr', function() {
    var directiveDefinitionObject = {
      link: function() {
        skrollr.init({
        	render: function (data) {
        		console.log(data.curTop);
        	}
        }).reload();
      }
    };

    return directiveDefinitionObject;
  });