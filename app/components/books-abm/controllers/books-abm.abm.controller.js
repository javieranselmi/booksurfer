//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksAbmController';
        controller.$inject = ['$scope','countries','entityAbm','$stateParams','$state','entitySearch'];

    function controller($scope,countries,entityAbm,$stateParams, $state, entitySearch) {
        
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
        
        $scope.newAuthor = {};
        
        $scope.addExistingAuthor = function(entityName, newAuthor) {
            entityAbm.addSubentity(entityName,newAuthor);
            $scope.existingAuthor = '';
        };
        
        $scope.addNewAuthor = function(entityName, newAuthor) {
            entityAbm.addSubentity(entityName,newAuthor);
            $scope.mustShowNewAuthor = true;
            $scope.newAuthor = {};
        };
        
        $scope.deleteAuthor = function(entityName, deletedAuthor) {
            entityAbm.deleteSubentity(entityName,deletedAuthor);
        };
        
        $scope.allAuthors = {};
        $scope.mustShowNewAuthor = true;
        entitySearch.getAllEntities('authors').then(function(result){
            $scope.allAuthors = result.data;
            console.log($scope.allAuthors)
        });
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
