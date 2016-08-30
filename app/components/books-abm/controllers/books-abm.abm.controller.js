//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksAbmController';
        controller.$inject = ['$scope','countries','entityAbm','$stateParams','$state'];

    function controller($scope,countries,entityAbm,$stateParams, $state) {
        
        var entity = 'books';
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        
        $scope.mode = entityAbm.mode;
        $scope.countries = countries();
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
