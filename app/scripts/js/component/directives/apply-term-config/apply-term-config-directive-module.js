define(['app/scripts/js/config',
        'app/scripts/js/component/directives/apply-term-config/apply-term-config-directive'],
    function(config, applyTermConfigDirective){
    'use strict';

    var applyTermConfig = angular.module('applyTermConfigDirective', ['ngAnimate','ui.bootstrap','ui.router']);
        applyTermConfig.config(config);
        applyTermConfig.directive('applyTermConfig', applyTermConfigDirective);
});