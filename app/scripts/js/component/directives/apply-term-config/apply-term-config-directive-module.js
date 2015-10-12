define(['directives/apply-term-config/apply-term-config-directive'],
    function(applyTermConfigDirective){
    'use strict';

    var applyTermConfig = angular.module('applyTermConfigDirective', []);
        applyTermConfig.directive('applyTermConfig', applyTermConfigDirective);
});