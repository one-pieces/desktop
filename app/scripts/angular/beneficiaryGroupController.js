/**
 * Created by Administrator on 2015/9/6 0006.
 */
app
    .controller('beneficiaryGroupCtrl', function($scope){
           $scope.rows = [];
           $scope.beneficiaries = [];
           // $scope.beneficiaries = [{
           //  name: 'xiaolong',
           //  sex: '男',
           //  age: '24',
           //  birthdate: '1991-9',
           //  proportion: '20%'
           // },{
           //  name: 'xiaohong',
           //  sex: '女',
           //  age: '22',
           //  birthdate: '1993-9',
           //  proportion: '15%'
           // },{
           //  name: 'xiaoming',
           //  sex: '男',
           //  age: '24',
           //  birthdate: '1991-5',
           //  proportion: '10%'
           // }];
           $scope.proportionMax = 100;
           $scope.proportionSum = 0;
           $scope.proportionRest = 0;
           $scope.counter = 0;
           $scope.addRow = function () {
                // for (var i = 0; i < $scope.beneficiaries.length; i++) {
                //   proportionSum += parseInt($scope.beneficiaries[i].proportion);
                // };
               // if (proportionSum >= parseInt($scope.group.proportion)) {
               //     alert('同组所有受益人分配比例之和不得超过100%，请调整受益人分配比例！');
               //     return;
               // };
               var beneficiary = {
                // name: '',
                // sex: '',
                // age: '',
                // birthdate: '',
                proportion: ($scope.group.proportion - $scope.proportionSum).toFixed(2)
               };
              //  if (!$scope.counter) {
              //   beneficiary.proportion = $scope.group.proportion;
              // } else {
              //   beneficiary.proportion = ($scope.group.proportion - $scope.proportionSum).toFixed(2);
              // };
               $scope.beneficiaries.push(beneficiary);
               var row = {
                id: 'Row ' + $scope.counter,
                beneficiary: $scope.beneficiaries[$scope.counter]
               };
               $scope.rows.push(row);
               $scope.group.rows = $scope.rows;
               $scope.counter++;
           }

           $scope.removeBeneficiary = function(index) {
               $scope.beneficiaries.splice(index, 1);
               $scope.rows.splice(index,1);
               $scope.counter--;
           }

           $scope.saveBeneficiary = function(index) {
               $.post('/api/beneficiary', beneficiary, function(data){
                console.log(data);
               });
           }

           $scope.moveDesc = function(isDesc, index) {
              $scope.$emit('move-group-desc', {
                isDesc: isDesc,
                index: index
              });
           }

           $scope.$watch('beneficiaries', function(newValue, oldValue) {
              // for (var i = 0; i < newValue.length; i++) {
                // if(newValue[i].proportion !== oldValue[i].proportion) {
                  $scope.proportionSum = 0;
                  for (var j = 0; j < newValue.length; j++) {
                    $scope.proportionSum += parseInt(newValue[j].proportion);
                  };
                  $scope.proportionRest = $scope.proportionMax - $scope.proportionSum;
                // }
              // };
           }, true);
    });