'use strict';

var beneficiaries = angular.module('beneficiaries', [])
beneficiaries
    .controller('demoCtrl', function($scope){
        $scope.index = 0;
        $scope.maxGroupCount = 4;
        $scope.beneficiaryGroups = [];

        $scope.addGroup = function() {
            if ($scope.beneficiaryGroups.length >= $scope.maxGroupCount) {
                return;
            }
            var beneficiary = {
                name: '',
                sex: '',
                proportion: 100,
                idType:'1'
            };
            var row = {
                id: $scope.index + "_0",
                beneficiary: beneficiary
            };

            var group = {
                id: $scope.index++,
                apportion: 1,
                proportion: 100,
                rows: []
            };
            group.rows.push(row);
            $scope.beneficiaryGroups.push(group);

        };

        $scope.removeGroup = function(index) {
            $scope.beneficiaryGroups.splice(index,1);
            $scope.index--;
        };
        $scope.$on('remove-group',function(event, data) {
            $scope.removeGroup(data.index);
        });
        $scope.$on('move-group-desc', function(event, data) {
            $scope.moveGroupDesc(data.isDesc, data.index);
        });

        $scope.$on('move-row-desc-cross-group', function(event, data) {
            $scope.moveRowDescCrossGroup(data.isDesc, data.rowIndex, data.groupIndex);
        });
        /**
         * To average the proportion of the beneficiaries by groupIds
         */
        $scope.average = function (groupIds) {
            for( var k = 0; k < groupIds.length; k++) {
                var group = $scope.beneficiaryGroups[groupIds[k]];
                for (var i = 0; i < group.rows.length; i++) {
                    if(group.isAver) {
                        group.rows[i].beneficiary.proportion = parseInt( 100 / group.rows.length );
                    }
                }
            }
        };

        $scope.moveRowDescCrossGroup = function(isDesc, rowIndex, groupIndex) {
            if(isDesc) {
                $scope.beneficiaryGroups[groupIndex + 1].rows.unshift($scope.beneficiaryGroups[groupIndex].rows[rowIndex]);//下一组加上受益人
                $scope.beneficiaryGroups[groupIndex].rows.splice(rowIndex, 1);//当前组去掉受益人
                $scope.average([groupIndex , groupIndex + 1]);
            }else {
                $scope.beneficiaryGroups[groupIndex - 1].rows.push($scope.beneficiaryGroups[groupIndex].rows[rowIndex]);//上一组加上受益人
                $scope.beneficiaryGroups[groupIndex].rows.splice(rowIndex, 1);//当前组去掉受益人
                $scope.average([groupIndex , groupIndex - 1]);
            }
        };

        $scope.moveGroupDesc = function(isDesc, index) {
            var tmpVal;
            if(isDesc) {
                tmpVal =  $scope.beneficiaryGroups[index + 1];
                $scope.beneficiaryGroups[index + 1] = $scope.beneficiaryGroups[index];
                $scope.beneficiaryGroups[index] = tmpVal;
            }else {
                tmpVal =  $scope.beneficiaryGroups[index - 1];
                $scope.beneficiaryGroups[index - 1] = $scope.beneficiaryGroups[index];
                $scope.beneficiaryGroups[index] = tmpVal;
            }
        };

        $scope.checkedAllItems = function(isChecked) {
            $scope.$broadcast('check-all-items', {
                isChecked: isChecked
            });
        };
        $scope.saveBeneficiary = function() {
            $scope.checkedAllItems(true);
        };

    });