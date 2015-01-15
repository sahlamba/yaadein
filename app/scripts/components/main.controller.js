'use strict';

var app = angular.module('yaadeinApp');

app.controller('YaadeinController', ['$scope', function ($scope) {

	$scope.appname = 'Yaadein';

	$scope.navigationItems = [
		{
			'id': 'default',
			'class': 'icon icon-three-bars'
		},
		{
			'id': 'search',
			'class': 'icon icon-search-1'
		},
		{
			'id': 'post',
			'class': 'icon icon-compose'
		},
		{
			'id': 'notifications',
			'class': 'icon icon-store'
		}
	];

	$scope.currentNavItem = $scope.navigationItems[0];

	function setCurrentNavItem (navItem) {
		$scope.currentNavItem = navItem;
	}

	function isCurrentNavItem (navItem) {
		return $scope.currentNavItem !== null && $scope.currentNavItem.id === navItem.id;
	}

	$scope.setCurrentNavItem = setCurrentNavItem;
	$scope.isCurrentNavItem = isCurrentNavItem;

	$scope.moreOptions = [
		{
			'id': 'home',
			'name': 'Home',
			'navItem': 'default',
			'iconClass': 'icon icon-torsos-all',
			'url': '/'
		},
		{
			'id': 'profile',
			'name': 'Profile',
			'navItem': 'default',
			'iconClass': 'icon icon-torso',
			'url': '/profile'
		},
		{
			'id': 'gallery',
			'name': 'Gallery',
			'navItem': 'default',
			'iconClass': 'icon icon-device-camera',
			'url': '/gallery'
		},
		{
			'id': 'settings',
			'name': 'Settings',
			'navItem': 'default',
			'iconClass': 'icon icon-settings-1',
			'url': '/settings'
		},
		{
			'id': 'signOut',
			'name': 'Sign Out',
			'navItem': 'default',
			'iconClass': 'icon icon-power',
			'url': '/'
		}
	];

}]);

// app.controller('NavigationController', ['$scope', 'NavigationService', function ($scope, NavigationService) {

// 	var makepromise=NavigationService.getData();
// 	makepromise.then(function(d){
// 		$scope.x=d.forecast;
// 	});

// }]);

// app.controller('ProfileController',['$routeParams','$scope',function($routeParams,$scope){
// 	console.log($routeParams.id);
// }]);
