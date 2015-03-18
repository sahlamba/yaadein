'use strict';

var app = angular.module('yaadeinApp');

var resolve = {
  delay: function ($q, $timeout) {
    var delay = $q.defer();
    $timeout(delay.resolve, 50, false);
    return delay.promise;
  }
};

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/views/home.html',
		controller: 'HomeController',
		resolve: resolve
	})
	.when('/profile/:enrolmentNo', {
		templateUrl: '/views/profile.html',
		controller: 'ProfileController',
		resolve: resolve
	})
	.when('/gallery/:enrolmentNo', {
		templateUrl: '/views/gallery.html',
		controller: 'GalleryController',
		resolve: resolve
	})
	.when('/hashtag/:hashtag', {
		templateUrl: '/views/hashtag.html',
		controller: 'HashtagController',
		resolve: resolve
	})
	.when('/post/:postId', {
		templateUrl: '/views/post.html',
		controller: 'PostController',
		resolve: resolve
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true).hashPrefix('!');
	
}]);

app.config(['$interpolateProvider', '$httpProvider', function ($interpolateProvider, $httpProvider) {
    $interpolateProvider.startSymbol('{~{').endSymbol('}~}');
    $httpProvider.defaults.withCredentials = true;
}]);
