(function() {
    var moduleName     = 'bookstore',
        controllerName = 'homeController';
    controller.$inject = ['$scope'];
    
    function controller($scope) {
        $scope.user = "Javier";
    }
    angular.module(moduleName).controller(controllerName, controller);
})();
