define(['app/scripts/js/config',
        'app/scripts/js/features/beneficiary/beneficiaryController'],
    function(config, beneficiaryController){
    'use strict';

    var beneficiary = angular.module('beneficiaryController', ['ngAnimate','ui.bootstrap','ui.router']);
        beneficiary.config(config);
        beneficiary.controller('beneficiaryController', beneficiaryController);
});