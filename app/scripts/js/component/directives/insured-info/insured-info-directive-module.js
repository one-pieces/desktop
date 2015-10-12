define([
        'directives/insured-info/insured-info-directive'],
    function(insuredInfoDirective){
    'use strict';

    var insuredInfo = angular.module('insuredInfoDirective', []);
        insuredInfo.directive('insuredInfo', insuredInfoDirective);
});