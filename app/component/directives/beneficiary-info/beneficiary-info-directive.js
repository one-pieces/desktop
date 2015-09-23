'use strict';

app
    .directive('beneficiaryInfo', function() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {

            },
            scope : {
                index: '=',
                save: '&saveBeneficiary',
                delete: '&deleteBeneficiary',
                addBeneficiary: '&addBeneficiary',
                row: '=rowContent',
                rowsLength: '=',
                groupsLength: '=',
                groupIndex: '=',
                rest: '=proportionRest'
            },
            templateUrl: "component/directives/beneficiary-info/beneficiary-info.html",
            controller: "beneficiaryCtrl"
        };
    });
