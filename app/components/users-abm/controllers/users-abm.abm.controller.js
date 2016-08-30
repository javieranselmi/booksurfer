//CONTROLLERS
(function() {
    var moduleName     = 'members-abm',
        controllerName = 'membersAbmController';
        controller.$inject = ['$scope','countries','entityAbm','$stateParams','$state'];

    function controller($scope,countries,entityAbm,$stateParams, $state) {
        
        var entity = 'members';
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        
        $scope.mode = entityAbm.mode;
        $scope.countries = countries();
        $scope.member = entityAbm.entity;
        $scope.saveMember = entityAbm.saveEntity;
        $scope.goToEdit = entityAbm.setEditMode;
        $scope.deleteMember = function() {
            entityAbm.deleteEntity($scope.member.id).then(function(response){
                console.log(response.notice); //TEMP
                $state.go('members.deletedModal');
            });
        }
        $scope.discardChanges = function() {
            entityAbm.initializeEntity(entity, $stateParams.id, false);
            $scope.member = entityAbm.entity;
        };
        
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
