'use strict';

app
    .directive('beneficiaryGroup', function() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {

            },
            scope : {
                index: "=",
                group: "=",
                groupsLength: "=",
                deleteGroup: "&removeGroup"
            },
            templateUrl: "views/directives/beneficiaryGroup.html",
            controller: "beneficiaryGroupCtrl"
        };
    });
