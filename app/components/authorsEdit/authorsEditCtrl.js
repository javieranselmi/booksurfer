//CONTROLLERS

app.controller("authorsEditController", ["$scope","$http","$routeParams","$location","countrySelect", function ($scope,$http,$routeParams,$location,countrySelect) {
    
   $scope.author = {};
   $scope.author.id = $routeParams.id;
   $http.get('/api/authors/' + $scope.author.id).success(function(data){
            $scope.author = data;
   });
   $scope.countries = countrySelect();
   
}]);