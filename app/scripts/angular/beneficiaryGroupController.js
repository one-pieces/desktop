'use strict';

app
    .controller('beneficiaryGroupCtrl', function($scope){
           $scope.proportionMax = 100;
           $scope.proportionSum = 0;
           $scope.proportionRest = 0;
           $scope.counter = $scope.group.rows.length;
           $scope.addBeneficiary = function (index) {
              var beneficiary = {
                  // name: '',
                  // sex: '',
                  // age: '',
                  // birthdate: '',
                  proportion: $scope.group.proportion - $scope.proportionSum
              };
              var row = {
                  id: 'Row ' + $scope.counter,
                  beneficiary: beneficiary
              };

               $scope.group.rows.push(row);
            /*  $scope.group.rows.splice(index,0,row);*/
              $scope.counter++;
               $scope.average();
           };

           $scope.removeBeneficiary = function(index) {
              $scope.group.rows.splice(index,1);
              $scope.counter--;
               $scope.average();
           };

           $scope.saveBeneficiary = function(index) {
               $.post('/api/beneficiary', $scope.group.rows[index].beneficiary, function(data){
                console.log(data);
               });
           };

           $scope.moveDesc = function(isDesc, index) {
              $scope.$emit('move-group-desc', {
                isDesc: isDesc,
                index: index
              });
           };

          $scope.$on('move-row-desc', function(event, data) {
              $scope.moveRowDesc(data.isDesc, data.index, data.needToCross);
          });
          //isDesc：true下移 false上移动
          //index:移动序号
          //needToCross必须跨组 true跨组 false不跨组
          $scope.moveRowDesc = function(isDesc, index, needToCross) {
              var templVal;
              if(isDesc) {
                  // 向下移动
                  if (needToCross || index === $scope.group.rows.length - 1) {
                    // 跨组
                    console.log('跨组向下移动');
                    $scope.$emit('move-row-desc-cross-group', {
                      isDesc: isDesc,
                      rowIndex: index,
                      groupIndex: $scope.index
                    });
                  } else{
                    // 不跨组
                    templVal = $scope.group.rows[index + 1];
                    $scope.group.rows[index + 1] = $scope.group.rows[index];
                    $scope.group.rows[index] = templVal;
                  }
              } else {
                  // 向上移动
                  if (needToCross || index === 0) {
                    // 跨组
                    console.log('跨组向上移动');
                    $scope.$emit('move-row-desc-cross-group', {
                      isDesc: isDesc,
                      rowIndex: index,
                      groupIndex: $scope.index
                    });
                  } else{
                    // 不跨组
                    templVal = $scope.group.rows[index - 1];
                    $scope.group.rows[index - 1] = $scope.group.rows[index];
                    $scope.group.rows[index] = templVal;
                  }
              }
          };

          $scope.average = function () {
              for (var i = 0; i < $scope.group.rows.length; i++) {
                  $scope.group.rows[i].beneficiary.proportion = parseInt( 100 / $scope.group.rows.length );
              }
          };
          $scope.$watch('group.rows.length', function(newValue) {
            if (newValue === 0) {
              if($scope.group.rows.length === 0 ) {
                console.log($scope.index);
                $scope.$emit('remove-group', {
                  index: $scope.index
                });
              }
            }
          });

          $scope.$watch(function() {
              var beneficiaries = [];
                  for (var i = 0; i < $scope.group.rows.length; i++) {
                      beneficiaries.push($scope.group.rows[i].beneficiary);
                  }
              return beneficiaries;
          }, function(newValue, oldValue) {
              $scope.proportionSum = 0;
              for (var i = 0; i < newValue.length; i++) {
                  // 判断是否为数字，如非数字则为0
                  $scope.group.rows[i].beneficiary.proportion = $scope.group.rows[i].beneficiary.proportion || 0;
                  if (parseInt($scope.group.rows[i].beneficiary.proportion) < 0){
                      $scope.group.rows[i].beneficiary.proportion = 0;
                  }
                  $scope.proportionSum += parseInt($scope.group.rows[i].beneficiary.proportion);
              }

              $scope.proportionRest = $scope.proportionMax - $scope.proportionSum;
          }, true);
    });