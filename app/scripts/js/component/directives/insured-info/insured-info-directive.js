define([], function(){
    'use strict';
    function insuredInfoController($scope) {
        $scope.getRelationShipDescription = function(relationShipStr) {
            switch(relationShipStr) {
                case "0": return "本人";
                case "1": return "法定";
                case "2": return "父子";
                default : return "投被关系";
            }
        }
    };
    insuredInfoController.$inject = ['$scope'];
    function insuredInfoDirective() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {

            },
            scope : {
                insured: '='
            },
            templateUrl: "views/directives/insured-info/insured-info.html",
            controller: insuredInfoController
        };
    }
    return insuredInfoDirective;

});


