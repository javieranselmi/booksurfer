(function() {
    var moduleName     = 'authors-abm',
        controllerName = 'authorsSearchController';
    controller.$inject = ["$scope","entitySearch","countries"];
    
    function controller($scope,entitySearch,countrySelect) {
        $scope.authors = [];
        entitySearch.initializeEntity("authors");
        
        entitySearch.getAllEntities().then(function(result){
            $scope.authors = result.data;
        });   
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();