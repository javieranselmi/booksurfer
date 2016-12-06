(function() {
    var moduleName     = 'members-abm',
        controllerName = 'membersSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter) {
        $scope.members = [];
        $scope.loading = true;
        entitySearch.getAllEntities('members').then(function(result){
            $scope.members = result.data;
            $scope.loading = false;
        });
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();