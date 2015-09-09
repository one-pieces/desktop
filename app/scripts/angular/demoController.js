/**
 * Created by Administrator on 2015/9/6 0006.
 */
app
    .controller('demoCtrl', function($scope){
        $scope.index = 0;
        $scope.maxGroupCount = 4;
        $scope.beneficiaryGroups = [];
    	// $scope.beneficiaryGroups = [{
    	// 	name: "第一顺位",
    	// 	proportion: "40%",
    	// 	maxCount: 3
    	// },{
    	// 	name: "第二顺位",
    	// 	proportion: "30%",
    	// 	maxCount: 2
    	// },{
    	// 	name: "第三顺位",
    	// 	proportion: "20%",
    	// 	maxCount: 2
    	// },{
    	// 	name: "第四顺位",
    	// 	proportion: "10%",
    	// 	maxCount: 2
    	// }];

        $scope.addGroup = function() {
            if ($scope.beneficiaryGroups.length >= $scope.maxGroupCount) {
                alert('超过设置的最大组别!');
                return;
            }
            var group = {
                id: $scope.index++,
                apportion: 1,
                proportion: (100).toFixed(2),
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
            $scope.moveGroupDescCrossGroup(data.isDesc, data.rowIndex, data.groupIndex);
        });

        $scope.moveGroupDescCrossGroup = function(isDesc, rowIndex, groupIndex) {
            if(isDesc) {
                var templVal =  $scope.beneficiaryGroups[groupIndex + 1].rows[0];
                if (templVal) {
                    $scope.beneficiaryGroups[groupIndex + 1].rows[0] = $scope.beneficiaryGroups[groupIndex].rows[$scope.beneficiaryGroups[groupIndex].rows.length - 1];
                    $scope.beneficiaryGroups[groupIndex].rows[$scope.beneficiaryGroups[groupIndex].rows.length - 1] = templVal;
                } else{
                    $scope.beneficiaryGroups[groupIndex + 1].rows.push($scope.beneficiaryGroups[groupIndex].rows[$scope.beneficiaryGroups[groupIndex].rows.length - 1]);
                    $scope.beneficiaryGroups[groupIndex].rows.splice($scope.beneficiaryGroups[groupIndex].rows.length - 1);
                };
            }else {
                var templVal =  $scope.beneficiaryGroups[groupIndex - 1].rows[$scope.beneficiaryGroups[groupIndex - 1].rows.length - 1];
                if (templVal) {
                    $scope.beneficiaryGroups[groupIndex - 1].rows[$scope.beneficiaryGroups[groupIndex - 1].rows.length - 1] = $scope.beneficiaryGroups[groupIndex].rows[0];
                    $scope.beneficiaryGroups[groupIndex].rows[0] = templVal;
                } else{
                    $scope.beneficiaryGroups[groupIndex - 1].rows.push($scope.beneficiaryGroups[groupIndex].rows[0]);
                    $scope.beneficiaryGroups[groupIndex].rows.splice(0, 1);
                
                };
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

        // $scope.$watch('beneficiaryGroups', function(newv){
        //     console.log(newv);
        // }, true);
    });