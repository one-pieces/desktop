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
           $scope.counter = 0;
           $scope.addRow = function () {
              var proportionSum = 0;
                for (var i = 0; i < $scope.beneficiaries.length; i++) {
                  proportionSum += parseInt($scope.beneficiaries[i].proportion);
                };
               if ($scope.counter >= $scope.group.maxCount) {
                   alert('Given number exceeds the limitation!');
                   return;
               }
               if (proportionSum >= parseInt($scope.group.proportion)) {
                   alert('The sum of each beneficiary\'s proportion exceeds the max!');
                   return;
               };
               var beneficiary = {
                // name: '',
                // sex: '',
                // age: '',
                // birthdate: '',
                // proportion: ''
               };
               if (!$scope.counter) {
                beneficiary.proportion = $scope.group.proportion;
              } else {
                beneficiary.proportion = parseInt($scope.group.proportion) - proportionSum + '%';
              };
               $scope.beneficiaries.push(beneficiary);
               var row = {
                id: 'Row ' + $scope.counter,
                beneficiary: $scope.beneficiaries[$scope.counter]
               };
               $scope.rows.push(row);
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
    });