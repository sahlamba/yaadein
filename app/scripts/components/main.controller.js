'use strict';

var app = angular.module('yaadeinApp');

app.controller('YaadeinController', ['$scope', function ($scope) {

	$scope.appname = 'Yaadein';

	$scope.navigationItems = [
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

	$scope.moreOptions = [
		{
			'id': 'profile',
			'name': 'Profile',
			'iconClasses': 'icon icon-torso'
		},
		{
			'id': 'gallery',
			'name': 'Gallery',
			'iconClasses': 'icon icon-camera-2'
		},
		{
			'id': 'settings',
			'name': 'Settings',
			'iconClasses': 'icon icon-settings-1'
		},
		{
			'id': 'sign-out',
			'name': 'Sign Out',
			'iconClasses': 'icon icon-power'
		}
	];

	$scope.tickerElements = [
		{
			'id': ''
		}
	];
	
}]);

app.controller('NavigationController', ['$scope', 'NavigationService', function ($scope, NavigationService) {

	var makepromise=NavigationService.getData();
	makepromise.then(function(d){
		$scope.x=d.forecast;
	});


}]);

app.controller('ProfileController',['$routeParams','$scope',function($routeParams,$scope){
	console.log($routeParams.id);
}]);
