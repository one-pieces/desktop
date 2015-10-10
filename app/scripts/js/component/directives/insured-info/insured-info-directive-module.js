define(['app/scripts/js/config',
        'app/scripts/js/component/directives/insured-info/insured-info-directive'],
    function(config, insuredInfoDirective){
    'use strict';

    var insuredInfo = angular.module('insuredInfoDirective', ['ngAnimate','ui.bootstrap','ui.router']);
        insuredInfo.config(config);
        insuredInfo.directive('insuredInfo', insuredInfoDirective);
});