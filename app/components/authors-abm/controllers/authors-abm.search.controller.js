(function() {
    var moduleName     = 'authors-abm',
        controllerName = 'authorsSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter","login"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter, login) {
        $scope.authors = [];
        $scope.loading = true;
        
        entitySearch.getAllEntities('authors').then(function(result){
            $scope.authors = result.data;
            $scope.loading = false;
        });


    };    
    angular.module(moduleName).controller(controllerName, controller);
})();