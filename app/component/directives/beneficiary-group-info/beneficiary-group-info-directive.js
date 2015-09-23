'use strict';

app
    .directive('beneficiaryGroupInfo', function() {
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
            templateUrl: "component/directives/beneficiary-group-info/beneficiary-group-info.html",
            controller: "beneficiaryGroupCtrl"
        };
    });
