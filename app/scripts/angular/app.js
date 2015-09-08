'use strict';

var app = angular.module('app', ['ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
	$urlRouterProvider
		.when('/', '/desktop/welcome')
		.otherwise('/desktop/welcome');
	$stateProvider
		.state("welcome", {
			url: "/desktop/welcome",
			templateUrl: 'views/tpl/welcome.html',
			controller: 'WelcomeCtrl'})
		.state("login", {
			url: "/desktop/login",
			templateUrl: 'views/desktop/login.html',
			controller: 'LoginCtrl'})
		.state("desktop", {
			url: "/desktop/index",
			templateUrl: 'views/desktop/desktop.html',
			controller: 'DesktopCtrl'})
		.state("desktop.window", {
			url: "/desktop/window",
			views: {
				'windowContent@': {
					templateUrl: 'views/desktop/pages/settings.html'
				}
			}
		})
		.state("demo", {
				url: "/desktop/demo",
				templateUrl: 'views/beneficiary/demo.html',
				controller: 'demoCtrl'
		});
	$locationProvider.html5Mode(true);
}]);