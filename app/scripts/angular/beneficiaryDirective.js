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
                rest: '=proportionRest'
            },
            templateUrl: "views/directives/beneficiaryTpl.html",
            controller: function($scope) {
                $scope.add = function() {
                    $scope.row.beneficiary.proportion = 
                        (parseInt($scope.row.beneficiary.proportion)
                         + parseInt($scope.rest)).toFixed(2);
                }

                $scope.moveDesc = function(isDesc, index) {
                    $scope.$emit('move-row-desc', {
                        isDesc: isDesc,
                        index: index
                    });
                }
            }
        };
    });
