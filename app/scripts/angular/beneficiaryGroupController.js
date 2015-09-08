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
           //  abortion: '20%'
           // },{
           //  name: 'xiaohong',
           //  sex: '女',
           //  age: '22',
           //  birthdate: '1993-9',
           //  abortion: '15%'
           // },{
           //  name: 'xiaoming',
           //  sex: '男',
           //  age: '24',
           //  birthdate: '1991-5',
           //  abortion: '10%'
           // }];
           $scope.groupAbortionMax = 100;
           $scope.counter = 0;
           $scope.addRow = function () {
              var abortionSum = 0;
                for (var i = 0; i < $scope.users.length; i++) {
                  abortionSum += parseInt($scope.users[i].abortion);
                };
               if ($scope.counter >= $scope.group.maxCount) {
                   alert('Given number exceeds the limitation!');
                   return;
               }
               if (abortionSum >= parseInt($scope.group.groupAbortion)) {
                   alert('The sum of each user\'s abortion exceeds the max!');
                   return;
               };
               var user = {
                // name: '',
                // sex: '',
                // age: '',
                // birthdate: '',
                // abortion: ''
               };
               if (!$scope.counter) {
                user.abortion = $scope.group.groupAbortion;
              } else {
                user.abortion = parseInt($scope.group.groupAbortion) - abortionSum + '%';
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

          //  $scope.$watch('users', function(newValue, oldValue) {
          //   // console.log(newValue,oldValue);
          //   for (var i = 0; i < newValue.length; i++) {
          //     if (newValue[i].abortion != oldValue[i].abortion) {
          //       for (var i = 0; i < newValue.length; i++) {

          //       }
          //     };
          //   };
          // }, true);

          // $scope.$watch(function($scope) {
          //   return users.map(function(user) {
          //     return user.abortion;
          //   });
          // }, function(newValue, oldValue) {
          //   console.log(newValue,oldValue);
          // });
    });