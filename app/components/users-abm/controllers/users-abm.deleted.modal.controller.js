//CONTROLLERS
(function() {
    var moduleName     = 'users-abm',
        controllerName = 'usersDeletedModal';
        controller.$inject = ['$scope','$uibModalStack','$state'];

    function controller($scope,$modalStack,$state) {
        $scope.back = function() {
            $modalStack.dismissAll();
            $state.go('users.search');
        }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
