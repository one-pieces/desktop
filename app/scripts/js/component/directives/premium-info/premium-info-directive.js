define([], function(){
    'use strict';
    function premiumInfoController($scope){
        $scope.status = {
            isopen: false
        };
        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
        $scope.premium = {
            payMode: 1,//0:Installment premium,1:single premium
            payType: 0,//^0:payByYear,1:paidByUnit, 2:paidByAge
            payTerm: '3',//  unit is year
            payFreqTerm: null,
            unit: '0',
            age: null,
            isPayByAge: false
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





