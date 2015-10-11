define([], function(){
    'use strict';
    function applyController($scope){
        document.title = "apply";
        $scope.termConfig = {};
        $scope.insuredGroup = [
            {
                name: "",
                gender: "",
                cardNo: "",
                cardType: "",
                relationShip: ""
            }
        ];
        $scope.addInsured = function(index) {
            var insured = {
                name: "",
                gender: "",
                cardNo: "",
                cardType: "",
                relationShip: ""
            };
            $scope.insuredGroup.splice(index + 1, 0, insured);
        }
        $scope.removeInsured = function(index) {
            $scope.insuredGroup.splice(index, 1);
        }
    };
    applyController.$inject = ['$scope'];
    return applyController;
});