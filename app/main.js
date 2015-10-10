require(['app/scripts/js/features/apply/apply-controller-module',
    'app/scripts/js/features/beneficiary/beneficiary-controller-module',
    'app/scripts/js/directives/apply-info/apply-info-directive-module',
    'app/scripts/js/directives/apply-info/apply-info-directive-module',
    'app/scripts/js/directives/apply-info/apply-info-directive-module',
    'app/scripts/js/directives/apply-info/apply-info-directive-module'],
    function() {
        'use strict';

        angular.bootstrap(document, ['applyInfoDirective']);
    }
);