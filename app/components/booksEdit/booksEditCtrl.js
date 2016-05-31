//CONTROLLERS

app.controller("booksEditController", ["$scope","$http","$routeParams","$timeout","$location","countrySelect", function ($scope,$http,$routeParams,$timeout,$location,countrySelect) {
    
    
    $scope.book = {}; //Se inicializa un autor vacío
    $scope.book.id = $routeParams.id;
    $scope.definedEntity = false; //Inicialmente, no hay entidad. Este propiedad se va a true cuano se halla autor.
    $scope.editableEntity = ($routeParams.editmode === "edit") ? true : false;
    $scope.saveStatus = "unset";
    $scope.createAuthor = false;
    $scope.toggleCreateAuthor = function() {
        $scope.createAuthor = !$scope.createAuthor
    }
    
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
        $scope.book = jQuery.extend(true, {}, $scope.originalBook);
        $scope.toggleEdit();
    };

   	$scope.guardarCambios = function() {
        $scope.saveStatus="unset";
        $http.post('/api/books/'+ $scope.book.id, $scope.book).then( function(response) {
            //Success callback
            $scope.saveStatus="success";
            $scope.originalBook = $scope.book;
            $scope.restoreEntity();
            
        }, function(err) {
            //Error callback
            $scope.saveStatus="error";
        });
   	}
    
    $scope.deleteEntity = function() {
        $http.delete("/api/books/"+ $scope.book.id).then(function() {
                $scope.saveStatus = "success";
                $('#editConfirmationModal').on('hidden.bs.modal', function () {
                  $scope.$apply(function(){$location.path("/books/search")});
                });  
            
            },function(){
                $scope.saveStatus = "error";
            });
    };

   $scope.detachAuthorFromBook = function(authorToRemove) {
       $scope.book.authors = $scope.book.authors.filter(function( auth ) {
         return auth.id !== authorToRemove.id;
       });
   }
   $http({
	  method: 'GET',
	  url: '/api/books/' + $scope.book.id
	}).then(function(response) {
		    $timeout(function () {
       			 $scope.book = response.data;
       			 $scope.originalBook = jQuery.extend(true, {}, response.data) //Crea copia de objeto
       			 $scope.definedEntity = true;
                 $scope.displayUrl = $scope.book.imageUrl;
    		}, 0);
	}, function errorCallback(err) {
	  });
   $scope.countries = countrySelect();
}]);