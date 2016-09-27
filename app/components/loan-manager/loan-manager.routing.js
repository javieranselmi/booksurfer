//Routes
(function() {
    var moduleName = 'loan-manager';

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('loan', {
            url: '/loans',
            // controller: 'QuestionnaireController',
            template: '<ui-view></ui-view>',
            abstract: true
        });
        
        $stateProvider.state('loan.withdraw', {
            url: '/withdraw?sampleId&memberId',
            templateUrl: 'app/components/loan-manager/templates/loan-manager.withdraw.html',
            controller: 'loanManagerWithdrawController'
        });
        
        $stateProvider.state('loan.return', {
            url: '/return',
            templateUrl: 'app/components/loan-manager/templates/loan-manager.return.html',
            controller: 'loanManagerReturnController'
        });

    }
    angular.module(moduleName).config(config);
})();
