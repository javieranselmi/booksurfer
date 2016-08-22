//CONTROLLERS
(function() {
    var moduleName     = 'authors-abm',
        controllerName = 'authorsNewController';
        controller.$inject = ['$scope','countries','entityAbm','$stateParams'];

    function controller($scope,countries,entityAbm,$stateParams) {

        entityAbm.initializeEntity('authors', $stateParams.id, $stateParams.edit);
        
        $scope.mode = entityAbm.mode;
        $scope.countries = countries();
        $scope.saveAuthor = entityAbm.saveEntity;
        $scope.author = entityAbm.entity;
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
