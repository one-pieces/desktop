'use strict';
var premiumInfoDirective = angular.module('premiumInfo', []);
premiumInfoDirective
    .directive('premiumInfo', function() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {
            },
            scope : {
            },
            templateUrl: "views/directives/premium-info/premium-info.html",
            controller: premiumInfoController
        };
    });

var premiumInfoController = function($scope){
    $scope.initalPay = function(pay) {
        if(pay.value === $scoope.premium.payMode) return;
        $scope.premium.payType = 0;
        $scope.payPeriod = '';
        $scope.isPayByAge = false;
        $scope.age = '';
        $scope.amount = '';
    }
    $scope.premium = {
        payMode: '0',//0:Installment premium,1:single premium
        payType: '0',//0:payByYear,1:payByMonth
        payPeriod: '',// if payType = 0 the number of the pay Period's unit is year if payType = 1 the unit is month
        isPayByAge: false,
        age: '',
        amount:'',
        payYear:''
    }
};



