//Routes
(function() {
    var moduleName = 'authors-abm';

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('authors', {
            url: '/authors',
            // controller: 'QuestionnaireController',
            template: '<ui-view></ui-view>',
            abstract: true
        });
        
        $stateProvider.state('authors.search', {
            url: '/search',
            templateUrl: 'app/components/authors-abm/templates/authors-abm.search.view.html',
            controller: 'authorsSearchController'
        });
        
        $stateProvider.state("authors.deletedModal", {
            url: "/deleted",
            onEnter: ['$uibModal', function ($uibModal) {
                $uibModal.open({
                    templateUrl: "app/components/authors-abm/templates/authors-abm.deleted.modal.view.html",
                    controller: "authorsDeletedModal",
                    backdrop: 'static'
                });
            }]
        });
        
        $stateProvider.state('authors.abm', {
            url: '/:id',
            templateUrl: 'app/components/authors-abm/templates/authors-abm.abm.view.html',
            controller: 'authorsAbmController',
            params: {
                edit: false
            },
        });
        
        $stateProvider.state('authors.new', {
            url: '/new',
            templateUrl: 'app/components/authors-abm/templates/authors-abm.abm.view.html',
            controller: 'authorsAbmController',
            params: {
                edit: true
            },
        });
        



    }
    angular.module(moduleName).config(config);
})();

/*
    .when("/", {
        templateUrl: 'app/components/home/homeView.html',
        controller: 'homeController'
    })
    .when("/authors/search", {
        templateUrl: 'app/components/authorsSearch/authorsSearchView.html',
        controller: 'authorsSearchController'
      })
   .when("/books/search", {
        templateUrl: 'app/components/booksSearch/booksSearchView.html',
        controller: 'booksSearchController'
    })
     .when("/books/:id", {
        templateUrl: 'app/components/booksEdit/booksEditView.html',
        controller: 'booksEditController'
    })
     .when("/books/:id/:editmode", {
        templateUrl: 'app/components/booksEdit/booksEditView.html',
        controller: 'booksEditController'
    })
    .when("/authors/new", {
        templateUrl: 'app/components/authorsNew/authorsNewView.html',
        controller: 'authorsNewController'
    })
    .when("/authors/:id", {
        templateUrl: 'app/components/authorsEdit/authorsEditView.html',
        controller: 'authorsEditController'
    })
    .when("/authors/:id/:editmode", {
        templateUrl: 'app/components/authorsEdit/authorsEditView.html',
        controller: 'authorsEditController'
    })
}]);
*/