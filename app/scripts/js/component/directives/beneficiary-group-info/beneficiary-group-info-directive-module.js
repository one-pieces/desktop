define(['app/scripts/js/config',
        'app/scripts/js/component/directives/beneficiary-group-info/beneficiary-group-info-directive'],
    function(config, beneficiaryGroupInfoDirective){
    'use strict';

    var beneficiaryGroupInfo = angular.module('beneficiaryGroupInfoDirective', ['ngAnimate','ui.bootstrap','ui.router']);
        beneficiaryGroupInfo.config(config);
        beneficiaryGroupInfo.directive('beneficiaryGroupInfo', beneficiaryGroupInfoDirective);
});