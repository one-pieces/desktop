'use strict';

app
    .controller('demoCtrl', function($scope){
        $scope.index = 0;
        $scope.maxGroupCount = 4;
        $scope.beneficiaryGroups = [];

        $scope.addGroup = function() {
            if ($scope.beneficiaryGroups.length >= $scope.maxGroupCount) {
                alert('超过设置的最大组别!');
                return;
            }
            var group = {
                id: $scope.index++,
                apportion: 1,
                proportion: 100,
                rows: []
            };
            $scope.beneficiaryGroups.push(group);
        }

        $scope.removeGroup = function(index) {
            $scope.beneficiaryGroups.splice(index,1);
        }

        $scope.$on('move-group-desc', function(event, data) {
            $scope.moveGroupDesc(data.isDesc, data.index);
        });

        $scope.$on('move-row-desc-cross-group', function(event, data) {
            $scope.moveRowDescCrossGroup(data.isDesc, data.rowIndex, data.groupIndex);
        });

        $scope.moveRowDescCrossGroup = function(isDesc, rowIndex, groupIndex) {
            if(isDesc) {
                // 当前组的人数
                var length = $scope.beneficiaryGroups[groupIndex].rows.length;
                $scope.beneficiaryGroups[groupIndex + 1].rows.unshift($scope.beneficiaryGroups[groupIndex].rows[length - 1]);
                $scope.beneficiaryGroups[groupIndex].rows.pop();
            }else {
                // 下个组的人数
                var length = $scope.beneficiaryGroups[groupIndex - 1].rows.length;
                $scope.beneficiaryGroups[groupIndex - 1].rows.push($scope.beneficiaryGroups[groupIndex].rows[0]);
                $scope.beneficiaryGroups[groupIndex].rows.shift();
            }
        }

        $scope.moveGroupDesc = function(isDesc, index) {
            if(isDesc) {
                var templVal =  $scope.beneficiaryGroups[index + 1];
                $scope.beneficiaryGroups[index + 1] = $scope.beneficiaryGroups[index];
                $scope.beneficiaryGroups[index] = templVal;
            }else {
                var templVal =  $scope.beneficiaryGroups[index - 1];
                $scope.beneficiaryGroups[index - 1] = $scope.beneficiaryGroups[index];
                $scope.beneficiaryGroups[index] = templVal;
            }
        }
    });