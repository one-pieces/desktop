define(['scripts/js/config'],
    function(config){
        'use strict';

        var app = angular.module('app', ['ngAnimate','ui.bootstrap','ui.router']);
        app.config(config);
    });