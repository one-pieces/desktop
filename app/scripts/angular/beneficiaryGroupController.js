/**
 * Created by Administrator on 2015/9/6 0006.
 */
app
    .controller('beneficiaryGroupCtrl', function($scope){
           $scope.rows = [];
           $scope.users = [];
           // $scope.users = [{
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
                for (var i = 0; i < $scope.users.length; i++) {
                  proportionSum += parseInt($scope.users[i].proportion);
                };
               if ($scope.counter >= $scope.group.maxCount) {
                   alert('Given number exceeds the limitation!');
                   return;
               }
               if (proportionSum >= parseInt($scope.group.proportion)) {
                   alert('The sum of each user\'s proportion exceeds the max!');
                   return;
               };
               var user = {
                // name: '',
                // sex: '',
                // age: '',
                // birthdate: '',
                // proportion: ''
               };
               if (!$scope.counter) {
                user.proportion = $scope.group.proportion;
              } else {
                user.proportion = parseInt($scope.group.proportion) - proportionSum + '%';
              };
               $scope.users.push(user);
               var row = {
                id: 'Row ' + $scope.counter,
                user: $scope.users[$scope.counter]
               };
               $scope.rows.push(row);
               $scope.counter++;
           }

           $scope.removeBeneficiary = function(index) {
               $scope.users.splice(index, 1);
               $scope.rows.splice(index,1);
               $scope.counter--;
           }

           $scope.saveBeneficiary = function(index) {
               $.post('/api/beneficiary', user, function(data){
                console.log(data);
               });
           }
    });