'use strict';
var premiumInfoDirective = angular.module('premiumInfo', []);
premiumInfoDirective
    .directive('premiumInfo', function() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {
            },
            scope : {
                termConfig: "="
            },
            templateUrl: "views/directives/premium-info/premium-info.html",
            controller: premiumInfoController
        };
    });

var premiumInfoController = function($scope){
    $scope.premium = {
        payMode: '',//0:Installment premium,1:single premium
        payType: '',//^0:payByYear,1:paidByUnit, 2:paidByAge
        payTerm: null,//  unit is year
        payFreqTerm: null,
        unit: '0',
        age: null,
        isPaidByAge: false
    }
};



