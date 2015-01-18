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
		},
		{
			'id': 'signOut',
			'class': 'icon icon-power'
		}
	];

	$scope.currentNavItem = $scope.navigationItems[0];

	function setCurrentNavItem (navItem) {
		$scope.currentNavItem = navItem;
	}

	function isCurrentNavItem (navItem) {
		return $scope.currentNavItem !== null && $scope.currentNavItem.id === navItem.id;
	}

	function getCurrentNavItem () {
		return $scope.currentNavItem.id;
	}

	function closePost () {
		$('#postBox').fadeOut(300);
		$scope.currentNavItem = $scope.navigationItems[0];
	}

	$scope.setCurrentNavItem = setCurrentNavItem;
	$scope.isCurrentNavItem = isCurrentNavItem;
	$scope.getCurrentNavItem = getCurrentNavItem;
	$scope.closePost = closePost;

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
			'id': 'test1',
			'name': 'test1',
			'navItem': 'search',
			'iconClass': 'icon icon-torsos-all',
			'url': '/'
		},
		{
			'id': 'test2',
			'name': 'test2',
			'navItem': 'search',
			'iconClass': 'icon icon-torso',
			'url': '/'
		}
	];

	$scope.user = {
		'name': 'Sahil Lamba',
		'enrolmentNo': '13117060',
		'year': 2,
		'course': 'B.Tech',
		'branch': 'ME',
		'profilePic': 'images/user.png',
		'coverPic': 'images/cover.png',
		'url': '/profile/13117060',
		'gallery': ['images/gallery.png', 'images/gallery.png']
	};

}]);

app.controller('HomeController', ['$scope', function ($scope) {
}]);

// app.controller('NavigationController', ['$scope', 'NavigationService', function ($scope, NavigationService) {

// 	var makepromise=NavigationService.getData();
// 	makepromise.then(function(d){
// 		$scope.x=d.forecast;
// 	});

// }]);

app.controller('ProfileController', ['$routeParams', '$scope', function ($routeParams, $scope) {
	console.log($routeParams.enrolmentNo);
}]);

app.controller('GalleryController', ['$scope', function ($scope) {
}]);

app.controller('SettingsController', ['$scope', function ($scope) {
}]);
