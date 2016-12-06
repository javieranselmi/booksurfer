//CONTROLLERS
(function() {
    var moduleName     = 'reports',
        controllerName = 'reportsPopularBooksController';
        controller.$inject = ['$scope','entityAbm','$stateParams','$state', 'lists', '$http', 'endpoints'];

    function controller($scope,entityAbm,$stateParams, $state, lists, $http, endpoints) {
        $scope.books = [];
        $http.get(endpoints.GET_POPULAR_BOOKS).then(function(result){
            $scope.books = result.data;
        });
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
