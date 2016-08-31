(function() {
    var moduleName     = 'authors-abm',
        controllerName = 'authorsSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter) {
        $scope.authors = [];
        
        entitySearch.getAllEntities('authors').then(function(result){
            $scope.authors = result.data;
        });
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();