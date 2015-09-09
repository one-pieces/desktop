'use strict';

app
    .controller('beneficiaryGroupCtrl', function($scope){
           $scope.proportionMax = 100;
           $scope.proportionSum = 0;
           $scope.proportionRest = 0;
           $scope.counter = 0;
           $scope.addRow = function () {
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
              $scope.counter++;
           }

           $scope.removeBeneficiary = function(index) {
               $scope.group.rows.splice(index,1);
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

          $scope.$on('move-row-desc', function(event, data) {
              $scope.moveRowDesc(data.isDesc, data.index);
          });

          $scope.moveRowDesc = function(isDesc, index) {
              if(isDesc) {
                  // 向下移动
                  if (index == $scope.group.rows.length - 1) {
                    // 跨组
                    console.log('跨组向下移动');
                    $scope.$emit('move-row-desc-cross-group', {
                      isDesc: isDesc,
                      rowIndex: index,
                      groupIndex: $scope.index
                    });
                  } else{
                    // 不跨组
                    var templVal =  $scope.group.rows[index + 1];
                    $scope.group.rows[index + 1] = $scope.group.rows[index];
                    $scope.group.rows[index] = templVal;
                  };
              }else {
                  // 向上移动
                  if (index == 0) {
                    // 跨组
                    console.log('跨组向上移动');
                    $scope.$emit('move-row-desc-cross-group', {
                      isDesc: isDesc,
                      rowIndex: index,
                      groupIndex: $scope.index
                    });
                  } else{
                    // 不跨组
                    var templVal =  $scope.group.rows[index - 1];
                    $scope.group.rows[index - 1] = $scope.group.rows[index];
                    $scope.group.rows[index] = templVal;
                  };
              }
          }

          $scope.average = function () {
              for (var i = 0; i < $scope.group.rows.length; i++) {
                  $scope.group.rows[i].beneficiary.proportion = parseInt( 100 / $scope.group.rows.length );
              }
          }

          $scope.$watch(function() {
              var beneficiaries = [];
                  for (var i = 0; i < $scope.group.rows.length; i++) {
                      beneficiaries.push($scope.group.rows[i].beneficiary);
                  };
              return beneficiaries;
          }, function(newValue, oldValue) {
              $scope.proportionSum = 0;
              for (var i = 0; i < newValue.length; i++) {
                  // 判断是否为数字，如非数字则为0
                  $scope.group.rows[i].beneficiary.proportion = $scope.group.rows[i].beneficiary.proportion || 0;
                  $scope.proportionSum += parseInt($scope.group.rows[i].beneficiary.proportion);
              };
              if ($scope.proportionSum > $scope.proportionMax) {
                  // 出现错误，把数据回滚
                  for (var i = 0; i < newValue.length; i++) {
                    $scope.group.rows[i].beneficiary.proportion = parseInt(oldValue[i] ? oldValue[i].proportion : 0);
                  }
                  $scope.proportionRest = 0;
                  return;
              };
              $scope.proportionRest = $scope.proportionMax - $scope.proportionSum;
          }, true);
    });