//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksAbmController';
        controller.$inject = ['$scope','entityAbm','entitySearch','$stateParams','$state','$http','endpoints'];

    function controller($scope,entityAbm,entitySearch,$stateParams, $state, $http, endpoints) {
        var entity = 'books';
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        $scope.mode = entityAbm.mode;
        $scope.book = entityAbm.entity;
        
        console.log(entityAbm.entity);
        
        $scope.saveBook = function() {
            entityAbm.saveEntity().then(function(response){
                $state.go('books.abm',{id: response.id});
            });
        }

        $scope.goToEdit = entityAbm.setEditMode;
        $scope.deleteBook = function() {
            entityAbm.deleteEntity($scope.book.id).then(function(response){
                $state.go('books.deletedModal');
            });
        }
        $scope.discardChanges = function() {
            entityAbm.initializeEntity(entity, $stateParams.id, false);
            $scope.book = entityAbm.entity;
        };

        //#######################AUTHORS########################
        
        $scope.newAuthor = {};

        $scope.addAuthorToBook = function(author, book, cb) {
            var addToThisBookUrl = endpoints.ADD_AUTHOR_TO_BOOK
                .replace(':authorId', author.id)
                .replace(':bookId', book.id);
            return $http.post(addToThisBookUrl)
        };


        $scope.addExistingAuthor = function(entityName, newAuthor) {
            $scope.addAuthorToBook(newAuthor, $scope.book).then(function(response) {
                entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                $scope.book = entityAbm.entity;
                $scope.existingAuthor = '';
            });
        };
        
        $scope.addNewAuthor = function(entityName, newAuthor) {
            var postUrl = endpoints.POST_AUTHOR;
              $http.post(postUrl, newAuthor).then(function(response) {
                  $scope.addAuthorToBook(response.data, $scope.book).then(function (response) {
                      entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                      $scope.book = entityAbm.entity;
                      $scope.mustShowNewAuthor = true;
                      $scope.newAuthor = {};
                  });
              });
        };
        
        $scope.deleteAuthor = function(entityName, deletedAuthor) {
            var addToThisBookUrl = endpoints.DELETE_AUTHOR
                .replace(':authorId', deletedAuthor.id)
                .replace(':bookId', $scope.book.id);
            $http.delete(addToThisBookUrl).then(function(response) {
                entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                $scope.book = entityAbm.entity;
            });
        };
        
        $scope.allAuthors = {};
        $scope.mustShowNewAuthor = true;
        entitySearch.getAllEntities('authors').then(function(result){
            $scope.allAuthors = result.data;
        });
        
        $scope.mustShowSampleForm = false;
        $scope.editingSample = false;
        $scope.creatingSample = false;


        //##################SAMPLES##################


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
        };
        
        $scope.createSample = function(entityName, newSample) {
            var deleteSampleUrl = endpoints.CREATE_SAMPLE;
            newSample.bookId = $scope.book.id;
            $http.post(deleteSampleUrl, newSample).then(function(response) {
                $scope.mustShowSampleForm = false;
                $scope.editingSample = false;
                $scope.creatingSample = false;
                entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                $scope.book = entityAbm.entity;
            });
        };
        
        $scope.saveEditedSample = function(entityName, sample) {
            var putSampleUrl = endpoints.PUT_SAMPLE
                .replace(':sampleId', sample.id);
            $http.put(putSampleUrl, sample).then(function(response) {
                $scope.mustShowSampleForm = false;
                $scope.editingSample = false;
                $scope.creatingSample = false;
                $scope.mustShowSampleForm = false;
                entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                $scope.book = entityAbm.entity;
            });

        };
        
        $scope.deleteSample = function(entityName, deletedSample) {
            var deleteSampleUrl = endpoints.DELETE_SAMPLE
                .replace(':sampleId', deletedSample.id);
            $http.delete(deleteSampleUrl).then(function(response) {
                entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                $scope.book = entityAbm.entity;
            });
        };
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
