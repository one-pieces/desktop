define(['config'],
    function(config){
        'use strict';
        var app = angular.module('app', ['ngAnimate','ui.bootstrap','ui.router', 'pageslide-directive']);
        app.config(config);
    });