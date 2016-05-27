app.controller("booksSearchController", [ "$scope", "$http", function ($scope, $http) {
    "use strict";
    $scope.books = [];
    $http.get('/api/books').success(function (data) {
        $scope.books = data;
    });
}]);