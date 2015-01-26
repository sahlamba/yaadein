'use strict';

var app = angular.module('yaadeinApp');

app.filter('romanNumber', function () {
  return function (input) {
    if (input === 1) {
    	return 'I';
    } else if (input === 2) {
    	return 'II';
    } else if (input === 3) {
    	return 'III';
    } else if (input === 4) {
    	return 'IV';
    } else {
    	return 'V';
    }
  };
});
