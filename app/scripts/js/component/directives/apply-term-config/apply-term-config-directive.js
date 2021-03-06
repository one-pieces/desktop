define([], function(){
    'use strict';
    function applyTermConfigController($scope) {
        $scope.config = {};
        var termConfigSource = {
            yearConfig: ['3', '5', '10', '15', '20'],
            ageConfig: false
        };
        var termConfigTarget = {
            yearConfig: ['3', '5', '10', '15', '20'],
            ageConfig: true
        };
        $scope.config.termConfig = termConfigSource;
        $scope.termConfigTarget = termConfigTarget;
        $scope.toggleSelection = function (termType, termValue) {
            var idx;
            if (termType === '0') {
                idx = $scope.termConfigTarget.yearConfig.indexOf(termValue);
                if (idx > -1) {
                    $scope.termConfigTarget.yearConfig.splice(idx, 1);
                } else {
                    $scope.termConfigTarget.yearConfig.push(termValue);
                }
            } else {
                $scope.termConfigTarget.ageConfig = !termValue;
            }
        };
    }

    applyTermConfigController.$inject = ['$scope'];
    function applyTermConfigDirective() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {
            },
            scope : {
                termConfigTarget: "=termConfig"
            },
            templateUrl: "views/directives/apply-term-config/apply-term-config.html",
            controller: applyTermConfigController
        };
    }
    return applyTermConfigDirective;

});






