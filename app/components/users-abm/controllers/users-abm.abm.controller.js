//CONTROLLERS
(function() {
    var moduleName     = 'users-abm',
        controllerName = 'usersAbmController';
        controller.$inject = ['$scope','entityAbm','$stateParams','$state', 'lists'];

    function controller($scope,entityAbm,$stateParams, $state, lists) {
        
        var entity = 'users';
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        $scope.mode = entityAbm.mode;
        $scope.user = entityAbm.entity;
        $scope.lockdown = false;
        $scope.forms = {};
        
        $scope.saveUser = function() {
            $scope.lockdown = true;
                if($scope.forms.usersAbmForm.$valid) {
                    entityAbm.saveEntity().then(function(response){
                    $state.go('users.abm',{id: response.id});
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
        $scope.deleteUser = function() {
            $scope.lockdown = true;
            entityAbm.deleteEntity($scope.user.id).then(function(response){
                $state.go('users.deletedModal');
                $scope.genericError = undefined;
                $scope.lockdown = false;
            }, function(error){
                $scope.genericError = error.data.message;
                $scope.lockdown = false;
            });
        }
        $scope.discardChanges = function() {
            entityAbm.initializeEntity(entity, $stateParams.id, false);
            $scope.user = entityAbm.entity;
        };
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
