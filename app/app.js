'use strict';

var app = angular.module('app', ['ngAnimate','ui.bootstrap','ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
	$urlRouterProvider
		.when('/', '/siebre/demo')
		.otherwise('/');
	$stateProvider
		.state("demo", {
				url: "/siebre/demo",
				templateUrl: 'features/beneficiary/demo.html',
				controller: 'demoCtrl'
		});
	$locationProvider.html5Mode(true);
}]);