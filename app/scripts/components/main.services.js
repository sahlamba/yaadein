'use strict';

var app = angular.module('yaadeinApp');

app.service('dataTicker', ['$http', '$q', function ($http, $q) {
	var deferred = $q.defer();
	$http.get('http://beta.json-generator.com/api/json/get/OJgO6ee')
		.success(function (d) {
			deferred.resolve(d);
		});

	this.getTicks = function () {
		return deferred.promise;
	};
}]);

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

	// this.getUser = function (enrolmentNo) {
	// 	var def = $q.defer();
	// 	$http.get('data/users.json?enrolmentNo=' + enrolmentNo)
	// 		.success(function (x) {
	// 			def.resolve(x);
	// 		});
	// 	return def.promise;
	// };

	// var User = function(data) {
	// 	if (data) {
	// 		angular.copy(data, this);
	// 	}
	// };

	// this.getCover = function(enrolmentNo) {
	// 	return deferred.promise.then(function(d) {
	// 		var result = null;
	// 		angular.forEach(d, function(d) {
	// 			if (d.enrolmentNo === enrolmentNo) {
	// 				result = new User(d);
	// 			}
	// 		});
	// 		return result;
	// 	});
	// };
}]);