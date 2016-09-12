//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksAbmController';
        controller.$inject = ['$scope','entityAbm','entitySearch','$stateParams'];

    function controller($scope,entityAbm,entitySearch,$stateParams) {
        var entity = 'books';
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);  

        
        $scope.mode = entityAbm.mode;
        $scope.book = entityAbm.entity;
        
        console.log(entityAbm.entity);
        
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
        
              $scope.mustShowSampleForm = false;
        $scope.editingSample = false;
        $scope.creatingSample = false;
        
        $scope.editSample = function(sample) {
            $scope.creatingSample = false;
            $scope.newSample = sample;
            $scope.mustShowSampleForm = true;
            $scope.editingSample = true;
        };
        
        $scope.prepareNewSample = function() {
            $scope.editingSample = false;
            $scope.newSample = {};
            $scope.mustShowSampleForm = true;
            $scope.creatingSample = true;
        }
        
        $scope.createSample = function(entityName, newSample) {
            entityAbm.addSubentity(entityName,newSample);
            $scope.mustShowSampleForm = false;
            $scope.editingSample = false;
            $scope.creatingSample = false;
        }
        
        $scope.saveEditedSample = function(entityName, newAuthor) {
            $scope.mustShowSampleForm = false;
            $scope.editingSample = false;
            $scope.creatingSample = false;
        }
        
        $scope.deleteSample = function(entityName, deletedSample) {
            entityAbm.deleteSubentity(entityName,deletedSample);
        };
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
