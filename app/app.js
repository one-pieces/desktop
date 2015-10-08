'use strict';

var app = angular.module('app', ['ngAnimate','ui.bootstrap','ui.router', 'beneficiaryGroupInfo', 'beneficiaryInfo', 'beneficiaries', 'apply', 'applyInfo', 'premiumInfo',
		'insuredInfo']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
	$urlRouterProvider
		.when('/', '/siebre/beneficiaries')
		.otherwise('/');
	$stateProvider
		.state("beneficiaries", {
				url: "/siebre/beneficiaries",
				templateUrl: 'views/features/beneficiaries.html',
				controller: 'beneficiariesController'
		}).state("apply", {
				url: "/siebre/apply",
				templateUrl: 'views/features/apply.html',
				controller: 'applyController'
		});
	$locationProvider.html5Mode(true);
}]);
