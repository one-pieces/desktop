define(['app/scripts/js/config',
        'app/scripts/js/component/directives/beneficiary-info/beneficiary-info-directive'],
    function(config, beneficiaryInfoDirective){
    'use strict';

    var beneficiaryInfo = angular.module('beneficiaryInfoDirective', ['ngAnimate','ui.bootstrap','ui.router']);
        beneficiaryInfo.config(config);
        beneficiaryInfo.directive('beneficiaryInfo', beneficiaryInfoDirective);
});