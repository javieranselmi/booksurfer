var app = angular.module("bookstore", ["ngRoute"]);

//ROUTE CONFIGURATION

app.config(["$routeProvider", function ($routeProvider) {
    
    "use strict";
    $routeProvider
    
    .when("/", {
        templateUrl: 'views/home.html',
        controller: 'mainController',
        controllerAs: 'mainCtrl'
    })
    .when("/authors/search", {
        templateUrl: 'views/authorsearch.html',
        controller: 'authorsController',
        controllerAs: 'authorsCtrl'
    })
   .when("/books/search", {
        templateUrl: 'views/bookssearch.html',
        controller: 'booksController',
        controllerAs: 'bookCtrl'
    })
    .when("/authors/:id", {
        templateUrl: 'views/authorsEdit2.html',
        controller: 'authorsEditController',
        controllerAs: 'authEditCtrl'
    })
}]);

//DIRECTIVES

app.directive('searchAuthors', ["$timeout","$location", function($timeout,$location) {
  return {
    restrict: 'E',
    templateUrl: 'templates/searchauthors.html',
    scope: {
        authors: "="
    },
    link: function (scope,el,attrs) {
        scope.go = function ( path ) {
            $location.path( path );
        };
    }
  };
}]);

app.directive('searchBooks', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/searchbooks.html',
    scope: {
        books: "="
    },
    link: function() {

        //$('.tooltip').tooltip(options)
    }
  };
});

app.directive('entityControls', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/entityControls.html',
    scope: {
        editAction: "&",
        deleteAction: "&",
        entityName: "@",
        entityId: "@"

    },
    link: function() {

        //console.log(entityId, entityName);
        //$('.tooltip').tooltip(options)
    }
  };
});

//FACTORIES

//CONTROLLERS

app.controller("mainController", ["$scope", function ($scope) {
    
    "use strict";
    $scope.user = "Javier";
    
}]);

app.controller("authorsController", ["$scope","$http","$location", function ($scope,$http,$location) {
    
    "use strict";
    $scope.authors = [];
    $http.get('/api/authors').success(function(data){
            $scope.authors = data;
    });
      


}]);

app.controller("booksController", ["$scope","$http", function ($scope,$http) {
    
   "use strict";
    $scope.books = [];
    $http.get('/api/books').success(function(data){
        $scope.books = data;
    });
    
}]);

app.controller("authorsEditController", ["$scope","$http","$routeParams","$location", function ($scope,$http,$routeParams,$location) {
    
   "use strict";
   $scope.author = {};
   $scope.author.id = $routeParams.id;
   $http.get('/api/authors/' + $scope.author.id).success(function(data){
            $scope.author = data;
            console.log('feched!');
   });
    console.log($scope.author);
   
}]);