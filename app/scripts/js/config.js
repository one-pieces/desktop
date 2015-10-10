define([],function(){
    'use strict';
    function config($urlRouterProvider, $stateProvider, $locationProvider) {
        $urlRouterProvider
            .when('/', '/siebre/beneficiaries')
            .otherwise('/');
        $stateProvider
            .state("beneficiaries", {
                url: "/siebre/beneficiaries",
                templateUrl: 'views/features/beneficiaries.html',
                controller: 'beneficiaryController'
            }).state("apply", {
                url: "/siebre/apply",
                templateUrl: 'views/features/apply.html',
                controller: 'applyController'
            });
        $locationProvider.html5Mode(true);
    }

    config.$inject=['$urlRouterProvider', '$stateProvider', '$locationProvider'];
    return config;
});