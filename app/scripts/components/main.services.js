'use strict';

var app = angular.module('yaadeinApp');

app.service('dataPosts', ['$http', '$q', function ($http, $q) {
	var deferred = $q.defer();
	$http.get('/data/posts.json')
		.success(function (d) {
			deferred.resolve(d);
		});

	this.getPosts = function () {
		return deferred.promise;
	};
}]);

app.service('dataUsers', ['$http', '$q', function ($http, $q) {
	var deferred = $q.defer();
	$http.get('/data/users.json')
		.success(function (d) {
			deferred.resolve(d);
		});

	this.getUsers = function () {
		return deferred.promise;
	};
}]);