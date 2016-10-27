//Routes
(function() {
    var moduleName = 'reports';

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('reports', {
            url: '/reports',
            // controller: 'QuestionnaireController',
            template: '<ui-view></ui-view>',
            abstract: true
        });
        
        $stateProvider.state('reports.latestLoans', {
            url: '/latestLoans',
            templateUrl: 'app/components/reports/templates/reports.latest-loans.view.html',
            controller: 'reportsLatestLoansController'
        });

        $stateProvider.state('reports.outdatedLoans', {
            url: '/outdatedLoans',
            templateUrl: 'app/components/reports/templates/reports.outdated-loans.view.html',
            controller: 'reportsOutdatedLoansController'
        });

        $stateProvider.state('reports.popularBooks', {
            url: '/popularBooks',
            templateUrl: 'app/components/reports/templates/reports.popular-books.view.html',
            controller: 'reportsPopularBooksController'
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