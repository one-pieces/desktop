define([], function(){
    'use strict';
    function premiumInfoController($scope){
        $scope.premium = {
            payMode: 1,//0:Installment premium,1:single premium
            payType: 1,//^0:payByYear,1:paidByUnit, 2:paidByAge
            payTerm: null,//  unit is year
            payFreqTerm: null,
            unit: '0',
            age: null,
            isPaidByAge: false
        };

    }
    premiumInfoController.$inject = ['$scope'];
    function premiumInfoDirective() {
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
    }
    return premiumInfoDirective;
});





