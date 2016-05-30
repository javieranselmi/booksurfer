//CONTROLLERS

app.controller("authorsEditController", ["$scope","$http","$routeParams","$timeout","$location","countrySelect", function ($scope,$http,$routeParams,$timeout,$location,countrySelect) {
    
    
    $scope.author = {}; //Se inicializa un autor vacío
    $scope.author.id = $routeParams.id;
    $scope.definedEntity = false; //Inicialmente, no hay entidad. Este propiedad se va a true cuano se halla autor.
    $scope.editableEntity = ($routeParams.editmode === "edit") ? true : false;
    $scope.saveStatus = "unset";
    
    $scope.toggleEdit = function() {
        $scope.editableEntity = !$scope.editableEntity;
    };
    $scope.$watch('editableEntity', function () {
        if ($scope.editableEntity) {
            $scope.editMessage = "Ahora puedes modificar";
            $scope.modeMessage = "Modo de edición"
        } else {
            $scope.editMessage = "Click para modificar";
            $scope.modeMessage = "Modo de lectura"
        };
    });
    $scope.restoreEntity = function() {
        $scope.author = jQuery.extend(true, {}, $scope.originalAuthor);
        $scope.toggleEdit();
    };

   	$scope.guardarCambios = function() {
        $scope.saveStatus="unset";
        $http.post('/api/authors/'+ $scope.author.id, $scope.author).then( function(response) {
            //Success callback
            $scope.saveStatus="success";
            $scope.originalAuthor = $scope.author;
            $scope.restoreEntity();
            
        }, function(err) {
            //Error callback
            $scope.saveStatus="error";
        });
   	}
    
    $scope.deleteEntity = function() {
        $http.delete("/api/authors/"+ $scope.author.id).then(function() {
                $scope.saveStatus = "success";
                $('#editConfirmationModal').on('hidden.bs.modal', function () {
                  $scope.$apply(function(){$location.path("/authors/search")});
                });  
            
            },function(){
                $scope.saveStatus = "error";
            });
    };

   $http({
	  method: 'GET',
	  url: '/api/authors/' + $scope.author.id
	}).then(function(response) {
		    $timeout(function () {
       			 $scope.author = response.data;
       			 $scope.originalAuthor = jQuery.extend(true, {}, response.data) //Crea copia de objeto
       			 $scope.definedEntity = true;
                 $scope.displayUrl = $scope.author.imageUrl;
    		}, 0);
	}, function errorCallback(err) {
	  });
  
   $scope.countries = countrySelect();
   
}]);