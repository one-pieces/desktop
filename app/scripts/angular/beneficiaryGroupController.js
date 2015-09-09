/**
 * Created by Administrator on 2015/9/6 0006.
 */
app
    .controller('beneficiaryGroupCtrl', function($scope){
           $scope.rows = [];
           // $scope.beneficiaries = [];
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
               var beneficiary = {
                // name: '',
                // sex: '',
                // age: '',
                // birthdate: '',
                proportion: ($scope.group.proportion - $scope.proportionSum).toFixed(2)
               };
               var row = {
                id: 'Row ' + $scope.counter,
                beneficiary: beneficiary
               };
               $scope.rows.push(row);
               $scope.group.rows = $scope.rows;
               $scope.counter++;
           }

          //  $scope.$on('add-row', function(event, data) {
          //   $scope.$addRow();
          // });

          //  $scope.$on('remove-row', function(event, data) {
          //   $scope.$removeBeneficiary();
          // });

           $scope.removeBeneficiary = function(index) {
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

          $scope.$on('move-row-desc', function(event, data) {
              $scope.moveRowDesc(data.isDesc, data.index);
          });

          $scope.moveRowDesc = function(isDesc, index) {
              if(isDesc) {
                  // 向下移动
                  if (index == $scope.rows.length - 1) {
                    // 跨组
                    console.log('跨组向下移动');
                    $scope.$emit('move-row-desc-cross-group', {
                      isDesc: isDesc,
                      rowIndex: index,
                      groupIndex: $scope.index
                    });
                  } else{
                    // 不跨组
                    var templVal =  $scope.rows[index + 1];
                    $scope.rows[index + 1] = $scope.rows[index];
                    $scope.rows[index] = templVal;
                  };
              }else {
                  // 跨组向上移动
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
                    var templVal =  $scope.rows[index - 1];
                    $scope.rows[index - 1] = $scope.rows[index];
                    $scope.rows[index] = templVal;
                  };
              }
          }
          // $scope.$watch('rows', function(newValue) {

          // });

           $scope.$watch(function() {
            var beneficiaries = [];
            for (var i = 0; i < $scope.rows.length; i++) {
              beneficiaries.push($scope.rows[i].beneficiary);
            };
            return beneficiaries;
           }, function(newValue, oldValue) {
            $scope.proportionSum = 0;
            for (var i = 0; i < newValue.length; i++) {
              $scope.proportionSum += parseInt(newValue[i].proportion);
            };
            if ($scope.proportionSum > $scope.proportionMax) {
              alert('同组所有受益人分配比例之和不得超过100%，请调整受益人分配比例！');
              for (var i = 0; i < newValue.length; i++) {
                $scope.rows[i].beneficiary.proportion = parseInt(oldValue[i].proportion).toFixed(2);
              }
              return;
            };
            $scope.proportionRest = $scope.proportionMax - $scope.proportionSum;
           }, true);
    });