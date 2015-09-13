'use strict';

app
    .controller('deneficiaryCtrl', function($scope) {
        $scope.add = function() {
            $scope.row.beneficiary.proportion = 
                (parseInt($scope.row.beneficiary.proportion) +
                    parseInt($scope.rest));
        };

        $scope.moveDesc = function(isDesc, index) {
            $scope.$emit('move-row-desc', {
                isDesc: isDesc,
                index: index
            });
        };
    });