/**
 * Created by Administrator on 2015/9/6 0006.
 */
app
    .controller('demoCtrl', function($scope){
    	$scope.beneficiaryGroups = [{
    		name: "第一顺位",
    		groupAbortion: "40%",
    		maxCount: 3
    	},{
    		name: "第二顺位",
    		groupAbortion: "30%",
    		maxCount: 2
    	},{
    		name: "第三顺位",
    		groupAbortion: "20%",
    		maxCount: 2
    	},{
    		name: "第四顺位",
    		groupAbortion: "10%",
    		maxCount: 2
    	}];

    	$scope.$watch('beneficiaryGroups', function(newValue) {
    		var groupAbortionSum = 0;
    		for (var i = 0; i < $scope.beneficiaryGroups.length; i++) {
    			groupAbortionSum += parseInt($scope.beneficiaryGroups[i].groupAbortion);
    		};

    		if (groupAbortionSum > 100) {
    			alert('The max sum of groups\' abortion is 100%!');
                return;
    		};
    	}, true);
    });