//CONTROLLERS
(function() {
    var moduleName     = 'members-abm',
        controllerName = 'membersDeletedModal';
        controller.$inject = ['$scope','$modalStack','$state'];

    function controller($scope,$modalStack,$state) {
        $scope.back = function() {
            $modalStack.dismissAll();
            $state.go('members.search');
        }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
