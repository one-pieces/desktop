define(['app/scripts/js/config',
        'app/scripts/js/component/directives/premium-info/premium-info-directive'],
    function(config, premiumInfoDirective){
    'use strict';

    var premiumInfo = angular.module('premiumInfoDirective', ['ngAnimate','ui.bootstrap','ui.router']);
        premiumInfo.config(config);
        premiumInfo.directive('premiumInfo', premiumInfoDirective);
});