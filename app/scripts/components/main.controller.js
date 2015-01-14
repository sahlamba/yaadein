'use strict';

var app = angular.module('yaadeinApp', ['ngSanitize']);

app.controller('YaadeinController', ['$scope', function ($scope) {

	$scope.appname = 'Yaadein';

	$scope.options = [
		{
			'id': 'more',
			'classes': 'icon icon-three-bars active'
		},
		{
			'id': 'search',
			'classes': 'icon icon-search'
		},
		{
			'id': 'post',
			'classes': 'icon icon-compose'
		},
		{
			'id': 'notifications',
			'classes': 'icon icon-comment-quotes'
		}
	];
	
}]);
