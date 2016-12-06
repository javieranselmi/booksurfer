//CONTROLLERS
(function() {
    var moduleName     = 'publishers-abm',
        controllerName = 'publishersAbmController';
        controller.$inject = ['$scope','entityAbm','$stateParams','$state', 'lists'];

    function controller($scope,entityAbm,$stateParams, $state, lists) {
        
        var entity = 'publishers';
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        $scope.mode = entityAbm.mode;
        $scope.publisher = entityAbm.entity;
        $scope.lockdown = false;
        $scope.forms = {};
        
        $scope.savePublisher = function() {
            $scope.lockdown = true;
                if($scope.forms.publishersAbmForm.$valid) {
                    entityAbm.saveEntity().then(function(response){
                    $state.go('publishers.abm',{id: response.id});
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
        $scope.deletePublisher = function() {
            $scope.lockdown = true;
            entityAbm.deleteEntity($scope.publisher.id).then(function(response){
                $state.go('publishers.deletedModal');
                $scope.genericError = undefined;
                $scope.lockdown = false;
            }, function(error){
                $scope.genericError = error.data.message;
                $scope.lockdown = false;
            });
        }
        $scope.discardChanges = function() {
            entityAbm.initializeEntity(entity, $stateParams.id, false);
            $scope.publisher = entityAbm.entity;
        };
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
