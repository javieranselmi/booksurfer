//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'bookAbmBookController';
        controller.$inject = ['$scope','entityAbm','$stateParams'];

    function controller($scope,entityAbm,$stateParams) {
        
        $scope.mode = entityAbm.mode;
        $scope.book = entityAbm.entity;


    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
