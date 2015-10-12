define([
        'directives/beneficiary-info/beneficiary-info-directive'],
    function(beneficiaryInfoDirective){
    'use strict';

    var beneficiaryInfo = angular.module('beneficiaryInfoDirective', []);
        beneficiaryInfo.directive('beneficiaryInfo', beneficiaryInfoDirective);
});