requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts/js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        directives: "component/directives",
        lib: "bower_components"
    }
});

require([ 'app',
        'enum/trigger-type-module',
        'utilities/form-validate-module',
        'features/apply/apply-controller-module',
    'features/beneficiary/beneficiary-controller-module',
    'directives/apply-info/apply-info-directive-module',
    'directives/apply-term-config/apply-term-config-directive-module',
    'directives/beneficiary-group-info/beneficiary-group-info-directive-module',
    'directives/beneficiary-info/beneficiary-info-directive-module',
    'directives/insured-info/insured-info-directive-module',
    'directives/premium-info/premium-info-directive-module'],
    function() {
        'use strict';

        angular.bootstrap(document, ['app','triggerType','checkForm','applyController','beneficiaryController'
            ,'applyInfoDirective','applyTermConfigDirective','beneficiaryGroupInfoDirective',
            'beneficiaryInfoDirective','insuredInfoDirective','premiumInfoDirective']);
    }
);