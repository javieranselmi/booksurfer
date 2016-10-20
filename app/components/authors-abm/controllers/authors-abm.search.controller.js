(function() {
    var moduleName     = 'authors-abm',
        controllerName = 'authorsSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter) {
        $scope.authors = [];
        $scope.loading = true;
        
        entitySearch.getAllEntities('authors').then(function(result){
            $scope.authors = result.data;
            $scope.loading = false;
            console.log("Done loading")
        });
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();