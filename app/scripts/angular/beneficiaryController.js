'use strict';

app
    .controller('deneficiaryCtrl', function($scope) {
        $scope.isChecked = false;
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

        $scope.$on('check-all-items', function(event, data) {
            $scope.isChecked = true;
        });

    });