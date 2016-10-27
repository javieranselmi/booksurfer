(function() {
    var moduleName     = 'users-abm',
        controllerName = 'usersSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter) {
        $scope.users = [];
        $scope.loading = true;
        
        entitySearch.getAllEntities('users').then(function(result){
            $scope.users = result.data;
            $scope.loading = false;
        });
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();