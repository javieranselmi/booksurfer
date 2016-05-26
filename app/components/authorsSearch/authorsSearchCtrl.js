app.controller("authorsSearchController", ["$scope","$http","$location", function ($scope,$http,$location) {
    
    "use strict";
    $scope.authors = [];
    $http.get('/api/authors').success(function(data){
            $scope.authors = data;
    });
      


}]);