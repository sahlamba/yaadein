'use strict';

var app = angular.module('yaadeinApp');
var baseURL = 'http://172.25.55.156:60003/yaadein';

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

app.service('HomeService', ['$http', '$q', function ($http, $q) {
	var deferred = $q.defer();
  var url = baseURL + '/home/';
  console.log(url);
	$http.get(url)
		.success(function (d) {
			deferred.resolve(d);
      d.profilePic = baseURL + d.profilePic;
      d.coverPic = originURL + d.coverPic;
      var posts = d.posts_data;
      for (var i = 0; i < posts.length; i += 1) {
        posts[i].post_owner_pic = originURL + posts[i].post_owner_pic;
        for (var j = 0; j < posts[i].image_url.length; j += 1) {
          posts[i].image_url[j] = originURL + posts[i].image_url[j];
        }
      }
		});

	this.getLoggedUser = function () {
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
		var url = baseURL + '/user/' + enrolmentNo.toString() + '/';
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
        var url = baseURL + '/tag/' + tag + '/';
        console.log(url);
        $http.get(url)
          .success(function (x) {
            deferred.resolve(x);
          });
        return deferred.promise;
    };

}]);
