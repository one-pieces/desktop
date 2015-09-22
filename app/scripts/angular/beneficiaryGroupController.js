'use strict';
/**
 * The controller attached to the beneficiary-group directive
 */
app
    .controller('beneficiaryGroupCtrl', function($scope){
        //$scopeVariable definition start
        $scope.proportionMax = 100;
        $scope.proportionSum = 0;
        $scope.proportionRest = 0;
        $scope.group.isAver = true;
        $scope.counter = $scope.group.rows.length;
        //$scopeVariable definition end

        /**
         * Get beneficiaryNames as A String splitted with 、
         * @returns {string}
         */
        $scope.nameList = function() {
           var beneficiariesInGroup = [];
           for(var count = 0; count < $scope.group.rows.length; count++ ) {
               var name = $scope.group.rows[count].beneficiary.name;
               if(name!=='') {
                   beneficiariesInGroup.push($scope.group.rows[count].beneficiary.name);
               }
           }
           return beneficiariesInGroup.join("、");
        };

        /**
         * Add Beneficiary with initial idType:1(identification) into the Beneficiary Array
         * @param index
         */
        $scope.addBeneficiary = function (index) {
            var beneficiary = {
              proportion: $scope.group.proportion - $scope.proportionSum,
              idType: '1'
            };
            var row = {
              id: 'Row ' + $scope.counter,
              beneficiary: beneficiary
            };
            $scope.group.rows.push(row);
            $scope.counter++;
        };

        /**
         * Remove Beneficiary from the bucket
         * @param index
         */
        $scope.removeBeneficiary = function(index) {
            $scope.group.rows.splice(index,1);
            $scope.counter--;
        };

        /**
         * Emit the event which is on listening to move group position
         * @param isDesc
         * @param index
         */
        $scope.moveDesc = function(isDesc, index) {
          $scope.$emit('move-group-desc', {
            isDesc: isDesc,
            index: index
          });
        };

        /**
         * Emit the event which is on listening to move beneficiary position
         */
        $scope.$on('move-row-desc', function(event, data) {
          $scope.moveRowDesc(data.isDesc, data.index, data.needToCross);
        });

        /**
         *
         * @param isDesc true:moveup false:movedown
         * @param index
         * @param needToCross true:must cross group false:non-cross groups
         */
        $scope.moveRowDesc = function(isDesc, index, needToCross) {
          var templVal;
          if(isDesc) {
              if (needToCross || index === $scope.group.rows.length - 1) {
                $scope.$emit('move-row-desc-cross-group', {
                  isDesc: isDesc,
                  rowIndex: index,
                  groupIndex: $scope.index
                });
              } else{
                templVal = $scope.group.rows[index + 1];
                $scope.group.rows[index + 1] = $scope.group.rows[index];
                $scope.group.rows[index] = templVal;
              }
          } else {
              if (needToCross || index === 0) {
                $scope.$emit('move-row-desc-cross-group', {
                  isDesc: isDesc,
                  rowIndex: index,
                  groupIndex: $scope.index
                });
              } else{
                templVal = $scope.group.rows[index - 1];
                $scope.group.rows[index - 1] = $scope.group.rows[index];
                $scope.group.rows[index] = templVal;
              }
          }
        };

        /**
         * To average the proportion of the beneficiaries
         */
        $scope.average = function () {
          for (var i = 0; i < $scope.group.rows.length; i++) {
              $scope.group.rows[i].beneficiary.proportion = parseInt( 100 / $scope.group.rows.length );
          }
        };

        /**
         * observer to watch the rows.length usually used in remove and add condition
         */
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
        /**
         * oberserver to watch the dynamic arrays returned with the first parameter
         * in order to get the beneficiaries which can be used in calculator pattern.
         */
        $scope.$watch(function() {
          var beneficiaries = [];
              for (var i = 0; i < $scope.group.rows.length; i++) {
                  beneficiaries.push($scope.group.rows[i].beneficiary);
              }
          return beneficiaries;
        }, function(newValue, oldValue) {
          $scope.proportionSum = 0;
          if($scope.group.isAver) {
              $scope.average();
          }
          for (var i = 0; i < newValue.length; i++) {
              $scope.group.rows[i].beneficiary.proportion = $scope.group.rows[i].beneficiary.proportion || 0;
              if (parseInt($scope.group.rows[i].beneficiary.proportion) < 0){
                  $scope.group.rows[i].beneficiary.proportion = 0;
              }
              $scope.proportionSum += parseInt($scope.group.rows[i].beneficiary.proportion);
          }

          $scope.proportionRest = $scope.proportionMax - $scope.proportionSum;
        }, true);
    });