define([
        'directives/premium-info/premium-info-directive'],
    function(premiumInfoDirective){
    'use strict';

    var premiumInfo = angular.module('premiumInfoDirective', []);
        premiumInfo.directive('premiumInfo', premiumInfoDirective);
});