//ROUTE CONFIGURATION

app.config(["$routeProvider", function ($routeProvider) {
    
    "use strict";
    $routeProvider
    
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