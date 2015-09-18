'use strict';
app
    .controller('deneficiaryCtrl', function($scope) {
        $scope.isChecked = false;
        $scope.add = function() {
            $scope.row.beneficiary.proportion = 
                (parseInt($scope.row.beneficiary.proportion) +
                    parseInt($scope.rest));
            $scope.changeCheckedValue();
        };
        $scope.changeCheckedValue = function() {
            $scope.$emit('uncheck-aver', {
                groupIndex: $scope.groupIndex
            });
        };
        $scope.moveDesc = function(isDesc, index, needToCross) {
            $scope.$emit('move-row-desc', {
                isDesc: isDesc,
                index: index,
                needToCross: needToCross
            });
        };

        $scope.$on('check-all-items', function(event, data) {
            $scope.isChecked = true;
        });

        $scope.checkId = function(cardNo, birthdate) {
            if(!birthdate || !cardNo || $scope.row.beneficiary.idType!=='1') {
                return true;
            }
            if ( (15 !== cardNo.length && 18 !== cardNo.length)) {
                return false;
            }
            var givenYear = birthdate.getFullYear();
            var givenMonth =birthdate.getMonth()+1;
            var givenDay = birthdate.getDate();
            var year = cardNo.substring(6, 10);
            var month = cardNo.substring(10, 12);
            var day = cardNo.substring(12, 14);
            if(Number(givenYear) !== Number(year) || Number(givenMonth)!== Number(month) || Number(givenDay)!== Number(day)) {
                return false;
            }else {
                return true;
            }

        };

    });