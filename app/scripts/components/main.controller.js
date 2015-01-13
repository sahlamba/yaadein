'use strict';

var app=angular.module('yaadeinApp',['ngSanitize']);

app.controller('YaadeinController',['$scope','userData',function($scope,userData){
  console.log($scope);
  $scope.x='sahil';

  var datapromise=userData.getname();
  datapromise.then(function(d){
    $scope.data=d;
  });
}]);
