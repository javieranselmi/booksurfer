//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerHomeController';
    controller.$inject = ['$scope'];

    function controller($scope) {
        $scope.showBooks = true;
        $scope.showSamples = false;

        $scope.showSample = function(sampleId) {
            $scope.showBooks = false;
            $scope.showSamples = true;
        }

        $scope.deselectBook = function() {
            $scope.showBooks = true;
            $scope.showSamples = false;
        }

    }
    angular.module(moduleName).controller(controllerName, controller);
})();
