require([  'scripts/js/app',
        'scripts/js/enum/trigger-type-module',
        'scripts/js/utilities/form-validate-module',
        'scripts/js/features/apply/apply-controller-module',
    'scripts/js/features/beneficiary/beneficiary-controller-module',
    'scripts/js/component/directives/apply-info/apply-info-directive-module',
    'scripts/js/component/directives/apply-term-config/apply-term-config-directive-module',
    'scripts/js/component/directives/beneficiary-group-info/beneficiary-group-info-directive-module',
    'scripts/js/component/directives/beneficiary-info/beneficiary-info-directive-module',
    'scripts/js/component/directives/insured-info/insured-info-directive-module',
    'scripts/js/component/directives/premium-info/premium-info-directive-module'],
    function() {
        'use strict';

        angular.bootstrap(document, ['app','triggerType','checkForm','applyController','beneficiaryController'
            ,'applyInfoDirective','applyTermConfigDirective','beneficiaryGroupInfoDirective',
            'beneficiaryInfoDirective','insuredInfoDirective','premiumInfoDirective']);
    }
);