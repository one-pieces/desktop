define(['app/scripts/js/config',
        'app/scripts/js/features/apply/applyController'],
    function(config, applyController){
    'use strict';

    var apply = angular.module('applyController', ['ngAnimate','ui.bootstrap','ui.router']);
        apply.config(config);
        apply.controller('applyController', applyController);
});