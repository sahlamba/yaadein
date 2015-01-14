'use strict';

var app = angular.module('yaadeinApp');

var resolve = {
  delay: function ($q, $timeout) {
    var delay = $q.defer();
    $timeout(delay.resolve, 50, false);
    return delay.promise;
  }
};

app.config(['$locationProvider', '$routeProvider', function ($locationProvider,$routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/views/home.html',
		controller: 'HomeController',
		resolve: resolve
	});

	$locationProvider.html5Mode(true).hashPrefix('!');
	
}]);
