'use strict';
var applyInfoDirective = angular.module('applyInfo', []);
applyInfoDirective
    .directive('applyInfo', function() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {
            },
            scope : {
            },
            templateUrl: "views/directives/apply-info/apply-info.html",
            controller: applyInfoController
        };
    });

var applyInfoController = function($scope){
    $scope.isChecked = false;
    $scope.apply = {
        name: '',
        gender: '',
        birthday: '',
        cardNo: '',
        cardType: ''
    }
};



