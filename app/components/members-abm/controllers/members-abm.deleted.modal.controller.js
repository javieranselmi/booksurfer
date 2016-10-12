//CONTROLLERS
(function() {
    var moduleName     = 'members-abm',
        controllerName = 'membersDeletedModal';
        controller.$inject = ['$scope','$uibModalStack','$state'];

    function controller($scope,$modalStack,$state) {
        $scope.back = function() {
            $modalStack.dismissAll();
            $state.go('members.search');
        }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
