//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksAbmController';
        controller.$inject = ['$scope','entityAbm','entitySearch','$stateParams','$state','$http','endpoints','$filter', 'lists'];

    function controller($scope,entityAbm,entitySearch,$stateParams, $state, $http, endpoints, $filter, lists) {
        var entity = 'books';
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        $scope.mode = entityAbm.mode;
        $scope.book = entityAbm.entity;
        $scope.lockdown = false;
        $scope.forms = {};
        $scope.countries = lists.countries;
        
        $scope.saveBook = function() {
            $scope.lockdown = true;
                if($scope.forms.bookAbmForm.$valid) {
                    entityAbm.saveEntity().then(function(response){
                    $state.go('books.abm',{id: response.id});
                    $scope.genericError = undefined;
                    $scope.lockdown = false;
                }, function(error){
                    $scope.genericError = error.data.message;
                    $scope.lockdown = false;
                }); 
            };

        }

        $scope.goToEdit = entityAbm.setEditMode;
        $scope.deleteBook = function() {
            $scope.lockdown = true;
            entityAbm.deleteEntity($scope.book.id).then(function(response){
                $state.go('books.deletedModal');
                $scope.genericError = undefined;
                $scope.lockdown = false;
            }, function(error){
                $scope.genericError = error.data.message;
                $scope.lockdown = false;
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
            if (!entityAbm.containsObjectWithSameId(newAuthor, $scope.book.authors)) {
                $scope.addAuthorToBook(newAuthor, $scope.book).then(function(response) {
                    entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                    $scope.book = entityAbm.entity;
                    $scope.existingAuthor = '';
                    $scope.authorsGenericError = undefined;
                });
            } else {
                $scope.authorsGenericError = "El autor que seleccionó ya está relacionado con este libro";
            };

        };
        
        $scope.addNewAuthor = function(entityName, newAuthor) {
            if ($scope.forms.bookAbmAuthorsForm.$invalid) {
                $scope.forms.bookAbmAuthorsForm.$setSubmitted();
                return;
            }
            var postUrl = endpoints.POST_AUTHOR;
              $http.post(postUrl, newAuthor).then(function(response) {
                if (!entityAbm.containsObjectWithSameId(response.data, $scope.book.authors)) {
                  $scope.addAuthorToBook(response.data, $scope.book).then(function (response) {
                      entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                      $scope.book = entityAbm.entity;
                      $scope.mustShowNewAuthor = false;
                      $scope.newAuthor = {};
                      $scope.forms.bookAbmAuthorsForm.$setPristine();
                  });
                } else {
                    $scope.authorsGenericError = "El autor que intentó crear ya existe y está relacionado con este libro";
                }

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

        $scope.loanSampleMessage = function(availableForLoan) {
            if (availableForLoan) {return "Prestar";} else {return "Este ejemplar ya está prestado";}
        }


        $scope.editSample = function(sample) {
            $scope.creatingSample = false;
            $scope.newSample = sample;
            if (sample.acquisitionDate)
                $scope.newSample.acquisitionDate = new Date(sample.acquisitionDate);
            if (sample.discardDate)
            $scope.newSample.discardDate = new Date(sample.discardDate);
            $scope.mustShowSampleForm = true;
            $scope.editingSample = true;
        };
        
        $scope.prepareNewSample = function() {
            $scope.editingSample = false;
            $scope.newSample = {};
            $scope.mustShowSampleForm = true;
            $scope.creatingSample = true;
        };
        
        $scope.createSample = function(entityName, sampleToCreate) {
            if ($scope.forms.bookAbmSamplesForm.$valid) {
                var deleteSampleUrl = endpoints.CREATE_SAMPLE;
                sampleToCreate.bookId = $scope.book.id;
                var newSample = angular.copy(sampleToCreate);
                newSample.acquisitionDate = $filter('date')(sampleToCreate.acquisitionDate, 'yyyy-MM-dd') || null;
                newSample.discardDate = $filter('date')(sampleToCreate.discardDate, 'yyyy-MM-dd')|| null;
                $http.post(deleteSampleUrl, newSample).then(function(response) {
                    $scope.mustShowSampleForm = false;
                    $scope.editingSample = false;
                    $scope.creatingSample = false;
                    entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                    $scope.book = entityAbm.entity;
                }, function(error) {
                    $scope.samplesGenericError = error.data.message;
                });
            } else {
                $scope.forms.bookAbmSamplesForm.$setSubmitted();
            }
        };
        
        $scope.saveEditedSample = function(entityName, sample) {
                if ($scope.forms.bookAbmSamplesForm.$valid) {
                    var putSampleUrl = endpoints.PUT_SAMPLE
                    .replace(':sampleId', sample.id);
                    var newSample = angular.copy(sample);
                    newSample.acquisitionDate = $filter('date')(sample.acquisitionDate, 'yyyy-MM-dd');
                    newSample.discardDate = $filter('date')(sample.discardDate, 'yyyy-MM-dd');
                $http.put(putSampleUrl, newSample).then(function(response) {
                    $scope.mustShowSampleForm = false;
                    $scope.editingSample = false;
                    $scope.creatingSample = false;
                    $scope.mustShowSampleForm = false;
                    entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                    $scope.book = entityAbm.entity;
                });
            } else {
                $scope.forms.bookAbmSamplesForm.$setSubmitted();
            }           

        };
        
        $scope.deleteSample = function(entityName, deletedSample) {
            var deleteSampleUrl = endpoints.DELETE_SAMPLE
                .replace(':sampleId', deletedSample.id);
            $http.delete(deleteSampleUrl).then(function(response) {
                entityAbm.initializeEntity(entity, $stateParams.id, 'true');
                $scope.book = entityAbm.entity;
            }, function(error) {
                    $scope.samplesGenericError = error.data.message;
            });
        };
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
