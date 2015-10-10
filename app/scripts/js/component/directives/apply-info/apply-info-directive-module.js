define(['app/scripts/js/config',
        'app/scripts/js/component/directives/apply-info/apply-info-directive'],
    function(config, applyInfoDirective){
    'use strict';

    var applyInfo = angular.module('applyInfoDirective', ['ngAnimate','ui.bootstrap','ui.router']);
    applyInfo.config(config);
    applyInfo.directive('applyInfo', applyInfoDirective);
});