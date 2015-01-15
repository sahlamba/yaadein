'use strict';

var app = angular.module('yaadeinApp');

// app.service('NavigationService', ['$http', '$q', function ($http, $q) {
// 	var deferred = $q.defer();
// 	this.getData = function () {
// 		$http.get('/data/forecast.json').success(function (d) {
// 			console.log(d);
// 			deferred.resolve(d);
// 		});
// 		return deferred.promise;
// 	};
// }]);