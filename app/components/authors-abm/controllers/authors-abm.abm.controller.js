//CONTROLLERS
(function() {
    var moduleName     = 'authors-abm',
        controllerName = 'authorsAbmController';
        controller.$inject = ['$scope','entityAbm','$stateParams','$state', 'lists'];

    function controller($scope,entityAbm,$stateParams, $state, lists) {
        
        var entity = 'authors';
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        $scope.mode = entityAbm.mode;
        $scope.author = entityAbm.entity;
        $scope.lockdown = false;
        $scope.forms = {};
        
        $scope.saveAuthor = function() {
            $scope.lockdown = true;
                if($scope.forms.authorsAbmForm.$valid) {
                    entityAbm.saveEntity().then(function(response){
                    $state.go('authors.abm',{id: response.id});
                    $scope.genericError = undefined;
                    $scope.lockdown = false;
                }, function(error){
                    $scope.genericError = error.data.message;
                    $scope.lockdown = false;
                }); 
            };

        }
        $scope.countries = lists.countries;
        $scope.goToEdit = entityAbm.setEditMode;
        $scope.deleteAuthor = function() {
            $scope.lockdown = true;
            entityAbm.deleteEntity($scope.author.id).then(function(response){
                $state.go('authors.deletedModal');
                $scope.genericError = undefined;
                $scope.lockdown = false;
            }, function(error){
                $scope.genericError = error.data.message;
                $scope.lockdown = false;
            });
        }
        $scope.discardChanges = function() {
            entityAbm.initializeEntity(entity, $stateParams.id, false);
            $scope.author = entityAbm.entity;
        };
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
