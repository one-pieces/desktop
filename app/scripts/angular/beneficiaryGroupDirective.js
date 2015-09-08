/**
 * Created by Administrator on 2015/9/6 0006.
 */
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
                deleteGroup: "&removeGroup"
            },
            templateUrl: "views/directives/beneficiaryGroup.html",
            controller: "beneficiaryGroupCtrl"
        };
    });
