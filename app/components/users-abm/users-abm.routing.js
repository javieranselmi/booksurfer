//Routes
(function() {
    var moduleName = 'users-abm';

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('users', {
            url: '/users',
            // controller: 'QuestionnaireController',
            template: '<ui-view></ui-view>',
            abstract: true
        });
        
        $stateProvider.state('users.search', {
            url: '/search',
            templateUrl: 'app/components/users-abm/templates/users-abm.search.view.html',
            controller: 'usersSearchController'
        });
        
        $stateProvider.state("users.deletedModal", {
            url: "/deleted",
            onEnter: ['$uibModal', function ($uibModal) {
                $uibModal.open({
                    templateUrl: "app/components/users-abm/templates/users-abm.deleted.modal.view.html",
                    controller: "usersDeletedModal",
                    backdrop: 'static'
                });
            }]
        });
        
        $stateProvider.state('users.abm', {
            url: '/:id',
            templateUrl: 'app/components/users-abm/templates/users-abm.abm.view.html',
            controller: 'usersAbmController',
            params: {
                edit: false
            },
        });
        
        $stateProvider.state('users.new', {
            url: '/new',
            templateUrl: 'app/components/users-abm/templates/users-abm.abm.view.html',
            controller: 'usersAbmController',
            params: {
                edit: true
            },
        });
        



    }
    angular.module(moduleName).config(config);
})();
