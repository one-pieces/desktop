define([
        'scripts/js/features/beneficiary/beneficiaryController'],
    function(beneficiaryController){
    'use strict';

    var beneficiary = angular.module('beneficiaryController', []);
        beneficiary.controller('beneficiaryController', beneficiaryController);
});