'use strict';

var app = angular.module('app', ['ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
	$urlRouterProvider
		.when('/', '/welcome')
		.otherwise('/welcome');
	$stateProvider
		.state("welcome", {
			url: "/welcome",
			templateUrl: 'views/tpl/welcome.html',
			controller: 'WelcomeCtrl'})
		.state("login", {
			url: "/login",
			templateUrl: 'views/desktop/login.html',
			controller: 'LoginCtrl'})
		.state("desktop", {
			url: "/desktop",
			templateUrl: 'views/desktop/desktop.html',
			controller: 'DesktopCtrl'})
		.state("desktop.window", {
			url: "/window",
			views: {
				'windowContent@': {
					templateUrl: 'views/desktop/pages/settings.html'
				}
			}
		});
	$locationProvider.html5Mode(true);
}]);