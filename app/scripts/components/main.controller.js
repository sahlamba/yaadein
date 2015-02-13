'use strict';

var app = angular.module('yaadeinApp');

app.controller('YaadeinController', ['$scope', '$http', 'dataTicker', function ($scope, $http, dataTicker) {

	$scope.appname = 'Yaadein';

	$scope.navigationItems = [
		{
			'id': 'home',
			'class': 'fa fa-home',
			'url': '/',
			'hint': 'Home'
		},
		{
			'id': 'profile',
			'class': 'fa fa-user',
			'url': '/profile/',
			'hint': 'My Profile'
		},
		{
			'id': 'search',
			'class': 'fa fa-search',
			'url': '#',
			'hint': 'Search something'
		},
		{
			'id': 'post',
			'class': 'fa fa-pencil-square-o',
			'url': '#',
			'hint:': 'Post a memory'
		},
		{
			'id': 'notifications',
			'class': 'fa fa-bell',
			'url': '#',
			'hint': 'notifications'
		},
		{
			'id': 'signOut',
			'class': 'fa fa-sign-out',
			'url': '/',
			'hint': 'Log Out'
		}
	];

	$scope.currentNavItem = $scope.navigationItems[0];
	$scope.prevNavItem = $scope.navigationItems[0];

	$scope.setCurrentNavItem = function (navItem) {
		$scope.prevNavItem = $scope.currentNavItem;		
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
		$scope.currentNavItem = $scope.prevNavItem;
	};

	$scope.closeSearch = function () {
		$('#searchBox').fadeOut(300);
		$scope.currentNavItem = $scope.prevNavItem;
	};

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

	//Append enrolment number to profile and gallery URLs
	$scope.navigationItems[1].url += $scope.user.enrolmentNo.toString();

	$scope.ticks = [];
	var tickPromise = dataTicker.getTicks();
	tickPromise.then(function (d) {
		$scope.ticks = d;
	});

	$scope.isLoading = false;

	$scope.addToTicker = function () {
		$scope.isLoading = true;
		$http.get('http://beta.json-generator.com/api/json/get/HByxuXv')
			.success(function (ds) {
				for(var i = 0; i < ds.length; i += 1) {
					$scope.ticks.push(ds[i]);
				}
		});
		$scope.isLoading = false;
	};

	$scope.selectedObject = {};

	$scope.usersList = [];
	$http.get('data/users.json')
		.success(function (ds) {
			for(var i = 0; i < ds.length; i += 1) {
				$scope.usersList.push(ds[i]);
			}
	});

}]);

app.controller('HomeController', ['$scope', '$http', 'dataPosts', function ($scope, $http, dataPosts) {


	$scope.posts = [];
	var dataPromise = dataPosts.getPosts();
	dataPromise.then(function (d) {
		$scope.posts = d;
	});

	$scope.addToFeed = function () {
		$http.get('http://beta.json-generator.com/api/json/get/CHdvIym')
			.success(function (ds) {
				for(var i = 0; i < ds.length; i += 1) {
					$scope.posts.push(ds[i]);
				}
		});
	};

}]);

app.controller('ProfileController', ['$routeParams', '$scope', '$http', 'dataPosts', 'dataUsers', 
	function ($routeParams, $scope, $http, dataPosts, dataUsers) {

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

	$scope.addToFeed = function () {
		$http.get('http://beta.json-generator.com/api/json/get/CHdvIym')
			.success(function (ds) {
				for(var i = 0; i < ds.length; i += 1) {
					$scope.posts.push(ds[i]);
				}
		});
	};

}]);

app.controller('GalleryController', ['$routeParams', '$scope', 'dataUsers', 
	function ($routeParams, $scope, dataUsers) {

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

	

}]);

app.controller('SettingsController', ['$scope', function ($scope) {
}]);
