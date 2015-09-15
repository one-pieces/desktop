// var app = require('app.js');
'use strict';

app
    .controller('demoCtrl', function($scope, $stateParams){
        var id = $stateParams.id;
        $scope.tableName = 'Default';
        $scope.maxGroupCount = 4;
        $scope.beneficiaryGroups = [];
        
        if (id !== 'new') {
            $.get('/api/beneficiarytable/' + id, function(res, status, xhr) {
                console.log(res);
                var table = res.table;
                $scope.tableName = table.name;
                $scope.maxGroupCount = table.maxGroupCount;
                var groups = table.groups;
                for (var i = 0; i < groups.length; i++) {
                    var rows = groups[i].rows;
                    for (var j = 0; j < rows.length; j++) {
                        $.get('/api/beneficiary/' + rows[j].beneficiary, function(res, status, xhr) {
                            var beneficiary = res.beneficiary;
                            groups[beneficiary.groupIndex].rows[beneficiary.rowIndex].beneficiary = beneficiary;

                            if (beneficiary.groupIndex === groups.length - 1 && beneficiary.rowIndex === rows.length - 1) {
                                $scope.beneficiaryGroups = groups;
                                // console.log($scope.beneficiaryGroups);
                            }
                        });
                    }
                }
            });
        }

        $scope.addGroup = function() {
            if ($scope.beneficiaryGroups.length >= $scope.maxGroupCount) {
                alert('超过设置的最大组别!');
                return;
            }
            var group = {
                // id: $scope.index++,
                // apportion: 1,
                proportion: 100,
                rows: []
            };
            $scope.beneficiaryGroups.push(group);
        };

        $scope.removeGroup = function(index) {
            $scope.beneficiaryGroups.splice(index,1);
        };

        $scope.saveBeneficiarytable = function() {
            var beneficiarytable = {
                name: $scope.tableName,
                maxGroupCount: $scope.maxGroupCount,
                groups: $scope.beneficiaryGroups
            };
            if (id !== 'new') {
                // $.patch('/api/beneficiarytable' + id, 
                //     { beneficiarytable: beneficiarytable }, 
                //     function(res){
                //     console.log(res);
                // });
                $.ajax({
                    url: '/api/beneficiarytable/' + id,
                    type: 'patch',
                    data: { beneficiarytable: beneficiarytable }
                });
            } else {
                $.post('/api/beneficiarytable', 
                    { beneficiarytable: beneficiarytable }, 
                    function(res){
                    console.log(res);
                });
            }
        };

        $scope.showSaveButton = function() {
            var groups = $scope.beneficiaryGroups;
            return (groups.length ? groups[0].rows.length !== 0 : false);
        };

        $scope.$on('move-group-desc', function(event, data) {
            $scope.moveGroupDesc(data.isDesc, data.index);
        });

        $scope.$on('move-row-desc-cross-group', function(event, data) {
            $scope.moveRowDescCrossGroup(data.isDesc, data.rowIndex, data.groupIndex);
        });

        $scope.moveRowDescCrossGroup = function(isDesc, rowIndex, groupIndex) {
            var length;
            if(isDesc) {
                // 当前组的人数
                length = $scope.beneficiaryGroups[groupIndex].rows.length;
                $scope.beneficiaryGroups[groupIndex + 1].rows.unshift($scope.beneficiaryGroups[groupIndex].rows[length - 1]);
                $scope.beneficiaryGroups[groupIndex].rows.pop();
            }else {
                // 下个组的人数
                length = $scope.beneficiaryGroups[groupIndex - 1].rows.length;
                $scope.beneficiaryGroups[groupIndex - 1].rows.push($scope.beneficiaryGroups[groupIndex].rows[0]);
                $scope.beneficiaryGroups[groupIndex].rows.shift();
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
    });