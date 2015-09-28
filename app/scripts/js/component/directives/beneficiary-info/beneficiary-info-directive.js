'use strict';
var benificiaryInfoDirective = angular.module('beneficiaryInfo', []);
benificiaryInfoDirective
    .directive('beneficiaryInfo', function() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {

            },
            scope : {
                index: '=',
                save: '&saveBeneficiary',
                delete: '&deleteBeneficiary',
                addBeneficiary: '&addBeneficiary',
                row: '=rowContent',
                rowsLength: '=',
                groupsLength: '=',
                groupIndex: '=',
                rest: '=proportionRest'
            },
            templateUrl: "views/directives/beneficiary-info/beneficiary-info.html",
            controller: beneficiaryInfoController
        };
    });

var beneficiaryInfoController =  function($scope) {

    $scope.row.beneficiary.selfChange = false;
    $scope.isChecked = false;
    $scope.row.beneficiary.proportionChangedTrigger = '';//btn:from the button txt: from the text
    /**
     * Calc the proportion when adding a beneficiary
     */
    $scope.add = function() {
        $scope.row.beneficiary.selfChange = true;
        $scope.row.beneficiary.proportionChangedTrigger = triggerType.BUTTON;
        $scope.row.beneficiary.proportion =
            (parseInt($scope.row.beneficiary.proportion) +
            parseInt($scope.rest));
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
    $scope.checkId = function(cardNo) {
        if (cardNo && cardNo!=='' && (15 === cardNo.length || 18 === cardNo.length)) {
            var personInfo = checkForm.getIdCardInfo(cardNo);
            return personInfo.isTrue;
        }
        return true;
    };

    /**
     * check the length of the card
     * @param cardNo
     * @returns {boolean}
     */
    $scope.checkIdLength = function(cardNo) {
        if (cardNo && cardNo!=='' && (15 === cardNo.length || 18 === cardNo.length)) {
            return true;
        }else {
            return false;
        }
    }

    $scope.triggerAction = function(type) {
        $scope.row.beneficiary.proportionChangedTrigger = type;
    }

};
