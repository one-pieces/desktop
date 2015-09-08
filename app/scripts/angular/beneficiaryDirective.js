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
                save: '&saveBeneficiary',
                delete: '&deleteBeneficiary',
                row: '=rowContent',
                rest: '=proportionRest'
            },
            templateUrl: "views/directives/beneficiaryTpl.html",
            controller: function($scope) {
                $scope.add = function() {
                    $scope.row.beneficiary.proportion = 
                        (parseInt($scope.row.beneficiary.proportion)
                         + parseInt($scope.rest)).toFixed(2);
                }
            }
        };
    });
