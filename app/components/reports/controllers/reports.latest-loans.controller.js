//CONTROLLERS
(function() {
    var moduleName     = 'reports',
        controllerName = 'reportsLatestLoansController';
        controller.$inject = ['$scope','entityAbm','$stateParams','$state', 'lists','$http','endpoints'];

    function controller($scope,entityAbm,$stateParams, $state, lists, $http, endpoints) {
    	$scope.loans = [];
        $http.get(endpoints.GET_LATEST_LOANS).then(function(result){
        	$scope.loans = result.data;
        });

        $scope.currentPage = 0;
	    $scope.pageSize = 10;
	    $scope.numberOfPages=function(){
	        return Math.ceil($scope.loans.length/$scope.pageSize);                
	    }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
