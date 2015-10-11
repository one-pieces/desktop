define([
        'scripts/js/component/directives/beneficiary-group-info/beneficiary-group-info-directive'],
    function(beneficiaryGroupInfoDirective){
    'use strict';

    var beneficiaryGroupInfo = angular.module('beneficiaryGroupInfoDirective', []);
        beneficiaryGroupInfo.directive('beneficiaryGroupInfo', beneficiaryGroupInfoDirective);
});