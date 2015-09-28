'use strict';

var app = angular.module('app', ['ngAnimate','ui.bootstrap','ui.router', 'beneficiaryGroupInfo', 'beneficiaryInfo', 'beneficiaries']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
	$urlRouterProvider
		.when('/', '/siebre/demo')
		.otherwise('/');
	$stateProvider
		.state("demo", {
				url: "/siebre/demo",
				templateUrl: 'scripts/js/features/beneficiary/demo.html',
				controller: 'demoCtrl'
		});
	$locationProvider.html5Mode(true);
}]);
