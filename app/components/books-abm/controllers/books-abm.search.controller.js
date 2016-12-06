(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter) {
        $scope.books = [];
        $scope.showAdvancedSearch = false;
        $scope.searchCriteria = {'title':''};
        $scope.loading = true;

        entitySearch.getAllEntities('books').then(function(result){
            $scope.books = result.data;
            $scope.loading = false;
        });

        $scope.toggleAdvancedSearch = function() {
            $scope.showAdvancedSearch = !$scope.showAdvancedSearch
        }
    }
    angular.module(moduleName).controller(controllerName, controller);
})();