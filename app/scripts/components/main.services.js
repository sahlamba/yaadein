'use strict';

var app = angular.module('yaadeinApp');
var baseURL = 'http://172.25.55.156:60002/yaadein/';

app.service('dataTicker', ['$http', '$q', function ($http, $q) {
	var deferred = $q.defer();
	$http.get('http://beta.json-generator.com/api/json/get/HByxuXv')
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

	this.getUsers = function () {
		var deferred = $q.defer();
		$http.get('/data/users.json')
			.success(function (d) {
				deferred.resolve(d);
			});
		return deferred.promise;
	};

	this.getUser = function (enrolmentNo) {
		var def = $q.defer();
		var url = baseURL + 'user/' + enrolmentNo.toString() + '/';
		console.log(url);
		$http.get(url)
			.success(function (x) {
				def.resolve(x);
			});
		return def.promise;
	};

}]);

app.service('HashtagService', ['$http', '$q', function ($http, $q) {

    this.getHashtaggedPosts = function (tag) {
        var deferred = $q.defer();
        var url = baseURL + 'tag/' + tag + '/';
        console.log(url);
        $http.get(url)
          .success(function (x) {
            deferred.resolve(x);
          });
        return deferred.promise;
    };

}]);
