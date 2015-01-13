'use strict';

var app=angular.module('yaadeinApp');

app.service('userData',['$http','$q',function($http,$q){
  var deferred=$q.defer();
  this.getname=function(){
    $http.get('path').success(function(d){
      deferred.resolve(d);
    });
    return deferred.promise;
  };
}]);
