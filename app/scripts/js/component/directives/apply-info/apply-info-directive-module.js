define([
        'scripts/js/component/directives/apply-info/apply-info-directive'],
    function(applyInfoDirective){
    'use strict';

    var applyInfo = angular.module('applyInfoDirective', []);
    applyInfo.directive('applyInfo', applyInfoDirective);
});