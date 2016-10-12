//CONTROLLERS
(function() {
    var moduleName     = 'authors-abm',
        controllerName = 'authorsDeletedModal';
        controller.$inject = ['$scope','$uibModalStack','$state'];

    function controller($scope,$modalStack,$state) {
        $scope.back = function() {
            $modalStack.dismissAll();
            $state.go('authors.search');
        }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
