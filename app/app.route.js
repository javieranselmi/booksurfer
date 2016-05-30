//ROUTE CONFIGURATION

app.config(["$routeProvider", function ($routeProvider) {
    
    "use strict";
    $routeProvider
    
    .when("/", {
        templateUrl: 'app/components/home/homeView.html',
        controller: 'homeController',
        controllerAs: 'homeCtrl'
    })
    .when("/authors/search", {
        templateUrl: 'app/components/authorsSearch/authorsSearchView.html',
        controller: 'authorsSearchController',
        controllerAs: 'authorsCtrl'
    })
   .when("/books/search", {
        templateUrl: 'app/components/booksSearch/booksSearchView.html',
        controller: 'booksSearchController',
        controllerAs: 'bookCtrl'
    })
    .when("/authors/new", {
        templateUrl: 'app/components/authorsNew/authorsNewView.html',
        controller: 'authorsNewController',
        controllerAs: 'authNewCtrl'
    })
    .when("/authors/:id", {
        templateUrl: 'app/components/authorsEdit/authorsEditView.html',
        controller: 'authorsEditController',
        controllerAs: 'authEditCtrl'
    })
    .when("/authors/:id/:editmode", {
        templateUrl: 'app/components/authorsEdit/authorsEditView.html',
        controller: 'authorsEditController',
        controllerAs: 'authEditCtrl'
    })
}]);