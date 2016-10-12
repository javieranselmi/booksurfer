//CONTROLLERS
(function() {
    var moduleName     = 'members-abm',
        controllerName = 'membersDeletedModal';
        controller.$inject = ['$scope','$uibModalStack','$state'];

    function controller($scope,$uibModalStack,$state) {
        $scope.back = function() {
            $uibModalStack.dismissAll();
            $state.go('members.search');
        }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
