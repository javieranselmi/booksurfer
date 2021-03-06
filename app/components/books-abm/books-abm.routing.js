//Routes
(function() {
    var moduleName = 'books-abm';

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('books', {
            url: '/books',
            // controller: 'QuestionnaireController',
            template: '<ui-view></ui-view>',
            abstract: true
        });
        
        $stateProvider.state('books.search', {
            url: '/search',
            templateUrl: 'app/components/books-abm/templates/books-abm.search.view.html',
            controller: 'booksSearchController'
        });
        
        $stateProvider.state("books.deletedModal", {
            url: "/deleted",
            onEnter: ['$uibModal', function ($uibModal) {
                $uibModal.open({
                    templateUrl: "app/components/books-abm/templates/books-abm.deleted.modal.view.html",
                    controller: "booksDeletedModal",
                    backdrop: 'static'
                });
            }]
        });
        
        /*$stateProvider.state('books.abm', {
            url: '/:id',
            templateUrl: 'app/components/books-abm/templates/books-abm.abm.view.html',
            controller: 'booksAbmController',
            params: {
                edit: false
            },
        });*/
        
        $stateProvider.state('books.abm', {     
            url: '/:id',
            templateUrl: 'app/components/books-abm/templates/books-abm.abm.view.html',
            controller: 'booksAbmController'
        });

        $stateProvider.state('books.new', {     
            url: '/new',
            templateUrl: 'app/components/books-abm/templates/books-abm.abm.view.html',
            controller: 'booksAbmController'
        });
        
        /*$stateProvider.state('books.abm.views', {

            views: {
                'header': {
                    controller: 'bookAbmHeaderController',
                    templateUrl: 'app/components/books-abm/templates/books-abm.abm.header.view.html'
                },
                'book': {
                    controller: 'bookAbmBookController',
                    templateUrl: 'app/components/books-abm/templates/books-abm.abm.book.view.html'
                },
                'author': {
                    controller: 'bookAbmAuthorController',
                    templateUrl: 'app/components/books-abm/templates/books-abm.abm.author.view.html'
                },
                'sample': {
                    controller: 'bookAbmSampleController',
                    templateUrl: 'app/components/books-abm/templates/books-abm.abm.sample.view.html'
                }
            }
        });*/       



    }
    angular.module(moduleName).config(config);
})();

/*
    .when("/", {
        templateUrl: 'app/components/home/homeView.html',
        controller: 'homeController'
    })
    .when("/books/search", {
        templateUrl: 'app/components/booksSearch/booksSearchView.html',
        controller: 'booksSearchController'
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
    .when("/books/new", {
        templateUrl: 'app/components/booksNew/booksNewView.html',
        controller: 'booksNewController'
    })
    .when("/books/:id", {
        templateUrl: 'app/components/booksEdit/booksEditView.html',
        controller: 'booksEditController'
    })
    .when("/books/:id/:editmode", {
        templateUrl: 'app/components/booksEdit/booksEditView.html',
        controller: 'booksEditController'
    })
}]);
*/