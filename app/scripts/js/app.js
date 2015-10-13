define(['config'],
    function(config){
        'use strict';
        var app = angular.module('app', ['ngAnimate','ui.bootstrap','ui.router', 'pageslide-directive','frapontillo.bootstrap-switch']);
        app.config(config);
    });