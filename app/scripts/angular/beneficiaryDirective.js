/**
 * Created by Administrator on 2015/9/6 0006.
 */
'use strict';

app
    .directive('beneficiary', function() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {

            },
            scope : {
                index: '=',
                save: '&saveBeneficiary',
                delete: '&deleteBeneficiary',
                row: '=rowContent',
                rowsLength: '=',
                groupsLength: '=',
                groupIndex: '=',
                rest: '=proportionRest'
            },
            templateUrl: "views/directives/beneficiaryTpl.html",
            controller: "deneficiaryCtrl"
        };
    });
