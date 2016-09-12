//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'bookAbmHeaderController';
        controller.$inject = ['$scope','entityAbm','$stateParams','$rootScope'];

    function controller($scope,entityAbm,$stateParams,$rootScope) {
        
        var entity = 'books';
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);  

        
        $scope.mode = entityAbm.mode;
        $scope.book = entityAbm.entity;
        
        $scope.saveBook = entityAbm.saveEntity;
        $scope.goToEdit = entityAbm.setEditMode;
        $scope.deleteBook = function() {
            entityAbm.deleteEntity($scope.book.id).then(function(response){
                console.log(response.notice); //TEMP
                $state.go('books.deletedModal');
            });
        }
        $scope.discardChanges = function() {
            entityAbm.initializeEntity(entity, $stateParams.id, false);
            $scope.book = entityAbm.entity;
        };
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
