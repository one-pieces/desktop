'use strict';

app
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
                id: 'Row 0',
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

        $scope.moveRowDescCrossGroup = function(isDesc, rowIndex, groupIndex) {
            var length;
            if(isDesc) {
                $scope.beneficiaryGroups[groupIndex].rows[rowIndex].id = $scope.beneficiaryGroups[groupIndex + 1].rows[0].id - 1;
                $scope.beneficiaryGroups[groupIndex + 1].rows.unshift($scope.beneficiaryGroups[groupIndex].rows[rowIndex]);//下一组加上受益人
                $scope.beneficiaryGroups[groupIndex].rows.splice(rowIndex, 1);//当前组去掉受益人

            }else {
                $scope.beneficiaryGroups[groupIndex].rows[rowIndex].id = $scope.beneficiaryGroups[groupIndex - 1].rows[$scope.beneficiaryGroups[groupIndex - 1].rows.length - 1].id + 1;
                $scope.beneficiaryGroups[groupIndex - 1].rows.push($scope.beneficiaryGroups[groupIndex].rows[rowIndex]);//上一组加上受益人
                $scope.beneficiaryGroups[groupIndex].rows.splice(rowIndex, 1);//当前组去掉受益人
            }
        };

        $scope.moveGroupDesc = function(isDesc, index) {
            var templVal;
            if(isDesc) {
                templVal =  $scope.beneficiaryGroups[index + 1];
                $scope.beneficiaryGroups[index + 1] = $scope.beneficiaryGroups[index];
                $scope.beneficiaryGroups[index] = templVal;
            }else {
                templVal =  $scope.beneficiaryGroups[index - 1];
                $scope.beneficiaryGroups[index - 1] = $scope.beneficiaryGroups[index];
                $scope.beneficiaryGroups[index] = templVal;
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
        $scope.$on('uncheck-aver', function(event, data) {
            $scope.beneficiaryGroups[data.groupIndex].isAver = false;
        });

    });