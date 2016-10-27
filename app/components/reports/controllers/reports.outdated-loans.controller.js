//CONTROLLERS
(function() {
    var moduleName     = 'reports',
        controllerName = 'reportsOutdatedLoansController';
        controller.$inject = ['$scope','entityAbm','$stateParams','$state', 'lists', '$http','endpoints'];

    function controller($scope,entityAbm,$stateParams, $state, lists, $http, endpoints) {
        $scope.loans = [];
        $http.get(endpoints.GET_OUTDATED_LOANS).then(function(result){
            $scope.loans = result.data;
        });
    
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
