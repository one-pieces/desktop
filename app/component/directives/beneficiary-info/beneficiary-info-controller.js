'use strict';
app
    .controller('beneficiaryCtrl', function($scope) {
        $scope.isChecked = false;

        /**
         * Calc the proportion when adding a beneficiary
         */
        $scope.add = function() {
            $scope.row.beneficiary.proportion = 
                (parseInt($scope.row.beneficiary.proportion) +
                    parseInt($scope.rest));
            $scope.changeCheckedValue();
        };

        $scope.changeCheckedValue = function() {
            $scope.$emit('uncheck-aver', {
                groupIndex: $scope.groupIndex
            });
        };

        $scope.moveDesc = function(isDesc, index, needToCross) {
            $scope.$emit('move-row-desc', {
                isDesc: isDesc,
                index: index,
                needToCross: needToCross
            });
        };

        /**
         * Call formValidate.js to getIdCardInfo in order to fill in
         * the birthday and sex according to the id card automatically
         */
        $scope.$watch('row.beneficiary.identification', function(cardNo, oldCardNo) {
            if (cardNo !== oldCardNo) {
                $scope.row.beneficiary.birthdate ='';
                $scope.row.beneficiary.sex ='';
            }
            if (cardNo && (15 === cardNo.length || 18 === cardNo.length)) {
                var personInfo = checkForm.getIdCardInfo(cardNo);
                if(!personInfo.isTrue) {
                    return;
                }
                var birthdate = new Date();
                birthdate.setDate(personInfo.day);
                birthdate.setFullYear(personInfo.year);
                birthdate.setMonth(personInfo.month-1);
                $scope.row.beneficiary.birthdate =birthdate;
                $scope.row.beneficiary.sex = personInfo.sex;
            }
        });
        /**
         * Checked the items when submitting the form
         */
        $scope.$on('check-all-items', function(event, data) {
            $scope.isChecked = true;
        });
        /**
         * Given the birthdate to check if the cardNo exsists
         * @param cardNo
         * @param birthdate
         * @returns {boolean}
         */
        $scope.checkId = function(cardNo, birthdate) {
            if(!birthdate || !cardNo || $scope.row.beneficiary.idType!=='1') {
                return true;
            }
            if (cardNo && (15 === cardNo.length || 18 === cardNo.length)) {
                var personInfo = checkForm.getIdCardInfo(cardNo);
                return personInfo.isTrue;
            }
            return true;
        };

    });