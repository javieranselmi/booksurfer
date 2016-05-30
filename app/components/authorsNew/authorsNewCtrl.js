//CONTROLLERS

app.controller("authorsNewController", ["$scope","$http","$routeParams","$timeout","$location","countrySelect", function ($scope,$http,$routeParams,$timeout,$location,countrySelect) {
    
    
    $scope.author = {}; //Se inicializa un autor vacío
    $scope.author.id = 0;
    $scope.saveStatus = "unset";
    $scope.countries = countrySelect();
    
    $scope.guardarCambios = function() {
        $scope.saveStatus="unset";
        $http.post('/api/authors').then( function(response) {
            //Success callback
            $scope.saveStatus="success";
            $('#editConfirmationModal').on('hidden.bs.modal', function () {
                  $scope.$apply(function(){$location.path("/authors/search")});
                });  
        }, function(err) {
            //Error callback
            $scope.saveStatus="error";
        });
   	}
    
   
}]);