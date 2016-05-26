//CONTROLLERS

app.controller("authorsEditController", ["$scope","$http","$routeParams","$timeout","countrySelect", function ($scope,$http,$routeParams,$timeout,countrySelect) {
    
   $scope.author = {}; //Se inicializa un autor vacío
   $scope.author.id = $routeParams.id;  //Se captura el nombre del autor
   $scope.definedEntity = false; //Inicialmente, no hay entidad. Este propiedad se va a true cuano se halla autor.
   $scope.editableEntity = false;
   $scope.editMessage = "Click para modificar";

   $scope.toggleEdit = function() {
	   	$scope.editableEntity = !$scope.editableEntity;
	   	if ($scope.editableEntity) {
	   		$scope.editMessage = "Ahora puedes modificar";
	   	} else {
	   		$scope.editMessage = "Click para modificar"
	   	};
    };

   	$scope.restoreEntity = function() {
   		console.log($scope.originalAuthor);
   		$scope.author = jQuery.extend(true, {}, $scope.originalAuthor);
   		$scope.toggleEdit();
   	};

   	$scope.guardarCambios {
   		
   	}

   $http({
	  method: 'GET',
	  url: '/api/authors/' + $scope.author.id
	}).then(function(response) {
		    $timeout(function () {
       			 $scope.author = response.data;
       			 $scope.originalAuthor = jQuery.extend(true, {}, response.data) //Crea copia de objeto
       			 $scope.definedEntity = true;
    		}, 0);
	}, function errorCallback(err) {
	  });
  
   $scope.countries = countrySelect();
   
}]);