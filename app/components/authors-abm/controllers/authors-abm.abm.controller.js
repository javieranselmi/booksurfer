//CONTROLLERS
(function() {
    var moduleName     = 'authors-abm',
        controllerName = 'authorsAbmController';
        controller.$inject = ['$scope','countries','entityAbm','$stateParams','$state'];

    function controller($scope,countries,entityAbm,$stateParams, $state) {
        
        var entity = 'authors';
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        
        $scope.mode = entityAbm.mode;
        $scope.countries = countries();
        $scope.author = entityAbm.entity;
        $scope.saveAuthor = function() {
            entityAbm.saveEntity().then(function(response){
                $state.go('authors.abm',{id: response.id});
            });
        }
        $scope.goToEdit = entityAbm.setEditMode;
        $scope.deleteAuthor = function() {
            entityAbm.deleteEntity($scope.author.id).then(function(response){
                $state.go('authors.deletedModal');
            });
        }
        $scope.discardChanges = function() {
            entityAbm.initializeEntity(entity, $stateParams.id, false);
            $scope.author = entityAbm.entity;
        };
        
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
