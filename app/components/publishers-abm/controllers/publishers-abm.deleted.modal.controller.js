//CONTROLLERS
(function() {
    var moduleName     = 'publishers-abm',
        controllerName = 'publishersDeletedModal';
        controller.$inject = ['$scope','$uibModalStack','$state'];

    function controller($scope,$modalStack,$state) {
        $scope.back = function() {
            $modalStack.dismissAll();
            $state.go('publishers.search');
        }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
