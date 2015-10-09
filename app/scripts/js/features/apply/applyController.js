'use strict';

var apply = angular.module('apply', [])
apply
    .controller('applyController', function($scope){
        $scope.termConfig = {
            monthConfig: [],
            yearConfig: [],
            ageConfig: false
        };
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

    });