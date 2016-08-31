(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter) {
        $scope.books = [];
        
        entitySearch.getAllEntities('books').then(function(result){
            $scope.books = result.data;
        });
    }
    angular.module(moduleName).controller(controllerName, controller);
})();