'use strict';

var app = angular.module('yaadeinApp');

app.controller('YaadeinController', ['$scope', '$http', 'dataTicker', function ($scope, $http, dataTicker) {

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

	$scope.setCurrentNavItem = function (navItem) {
		$scope.currentNavItem = navItem;
	};

	$scope.isCurrentNavItem = function (navItem) {
		return $scope.currentNavItem !== null && $scope.currentNavItem.id === navItem.id;
	};

	$scope.getCurrentNavItem = function () {
		return $scope.currentNavItem.id;
	};

	$scope.closePost = function () {
		$('#postBox').fadeOut(300);
		$scope.currentNavItem = $scope.navigationItems[0];
	};

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
			'url': '/profile/'
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
		'enrolmentNo': 13117060,
		'year': 2,
		'course': 'B.Tech',
		'branch': 'ME',
		'profilePic': 'images/users/1.jpg',
		'coverPic': 'images/cover.png',
		'url': '/profile/13117060',
		'gallery': ['images/gallery.png', 'images/gallery.png']
	};

	$scope.moreOptions[1].url += $scope.user.enrolmentNo.toString();

	$scope.ticks = [];
	var tickPromise = dataTicker.getTicks();
	tickPromise.then(function (d) {
		$scope.ticks = d;
	});

}]);

app.controller('HomeController', ['$scope', '$http', 'dataPosts', function ($scope, $http, dataPosts) {


	$scope.posts = [];
	var dataPromise = dataPosts.getPosts();
	dataPromise.then(function (d) {
		$scope.posts = d;
	});

	// $scope.addToFeed = function () {
	// 	$http.get('http://beta.json-generator.com/api/json/get/CHdvIym')
	// 		.success(function (ds) {
	// 			angular.forEach(ds, function (d) {
	// 	    	$scope.posts.push(d);
	// 	  });
	// 	});
	// };

}]);

app.controller('ProfileController', ['$routeParams', '$scope', '$sce', '$http', '$resource', '$interpolate', 'dataPosts', 'dataUsers', 
	function ($routeParams, $scope, $sce, $http, $resource, $interpolate, dataPosts, dataUsers) {

	$scope.posts = [];
	var dataPromise = dataPosts.getPosts();
	dataPromise.then(function (d) {
		$scope.posts = d;
	});

	$scope.currentUser = {};
	var userPromise = dataUsers.getUsers();
	userPromise.then(function (d) {
		for(var i = 0; i < d.length; i += 1) {
			if(d[i].enrolmentNo === parseInt($routeParams.enrolmentNo)) {
				$scope.currentUser = d[i];
				break;
			}
 		}
	});

	$scope.degreeSnippet = $interpolate('<i class="fa fa-graduation-cap"></i> {{currentUser.course}} ({{currentUser.branch}}) {{currentUser.year}} Year')($scope);
	$scope.renderSnippet = $sce.trustAsHtml($scope.degreeSnippet);

}]);

app.controller('GalleryController', ['$scope', function ($scope) {
}]);

app.controller('SettingsController', ['$scope', function ($scope) {
}]);
