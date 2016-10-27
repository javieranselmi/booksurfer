(function() {
    var moduleName     = 'publishers-abm',
        controllerName = 'publishersSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter) {
        $scope.publishers = [];
        $scope.loading = true;
        
        entitySearch.getAllEntities('publishers').then(function(result){
            $scope.publishers = result.data;
            $scope.loading = false;
        });
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();