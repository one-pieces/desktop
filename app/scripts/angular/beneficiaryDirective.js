/**
 * Created by Administrator on 2015/9/6 0006.
 */
'use strict';

app
    .directive('demoBeneficiary', function() {
        return {
            restrict: 'E',
            link : function(scope, element, attrs, ctrl) {

            },
            scope : {
                save: '&saveBeneficiary'
                delete: '&deleteBeneficiary',
                row: '=rowContent'
            },
            templateUrl: "views/directives/beneficiaryTpl.html"
        };
    });
