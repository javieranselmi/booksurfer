//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'bookAbmAuthorController';
        controller.$inject = ['$scope','entityAbm','$stateParams','entitySearch'];

    function controller($scope,entityAbm,$stateParams,entitySearch) {
        
        $scope.mode = entityAbm.mode;
        $scope.book = entityAbm.entity;
        
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
