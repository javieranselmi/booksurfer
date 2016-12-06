//Routes
(function() {
    var moduleName = 'publishers-abm';

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('publishers', {
            url: '/publishers',
            // controller: 'QuestionnaireController',
            template: '<ui-view></ui-view>',
            abstract: true
        });
        
        $stateProvider.state('publishers.search', {
            url: '/search',
            templateUrl: 'app/components/publishers-abm/templates/publishers-abm.search.view.html',
            controller: 'publishersSearchController'
        });
        
        $stateProvider.state("publishers.deletedModal", {
            url: "/deleted",
            onEnter: ['$uibModal', function ($uibModal) {
                $uibModal.open({
                    templateUrl: "app/components/publishers-abm/templates/publishers-abm.deleted.modal.view.html",
                    controller: "publishersDeletedModal",
                    backdrop: 'static'
                });
            }]
        });
        
        $stateProvider.state('publishers.abm', {
            url: '/:id',
            templateUrl: 'app/components/publishers-abm/templates/publishers-abm.abm.view.html',
            controller: 'publishersAbmController',
            params: {
                edit: false
            },
        });
        
        $stateProvider.state('publishers.new', {
            url: '/new',
            templateUrl: 'app/components/publishers-abm/templates/publishers-abm.abm.view.html',
            controller: 'publishersAbmController',
            params: {
                edit: true
            }
        });
        



    }
    angular.module(moduleName).config(config);
})();
