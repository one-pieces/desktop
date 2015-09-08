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
                proportion: (100).toFixed(2)
            };
            $scope.beneficiaryGroups.push(group);
        }

        $scope.removeGroup = function(index) {
            $scope.beneficiaryGroups.splice(index,1);
        }
    });