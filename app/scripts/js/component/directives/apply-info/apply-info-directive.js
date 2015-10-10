define([], function(){
    'use strict';
     function applyInfoController($scope){
        $scope.isChecked = false;
        $scope.apply = {
            name: '',
            gender: '',
            birthday: '',
            cardNo: '',
            cardType: ''
        }
    };
    applyInfoController.$inject = ['$scope'];
    function applyInfoDirective() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {
            },
            scope : {
            },
            templateUrl: "views/directives/apply-info/apply-info.html",
            controller: applyInfoController
        };
    }
    return applyInfoDirective;

});


