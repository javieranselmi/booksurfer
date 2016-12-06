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

        $scope.subtractDates = function(date1, date2) {
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            return  diffDays;
        }

        $scope.getConsideredState = function(loan) {
            var maxReturnDate = new Date(loan.agreedReturnDate);
            var today = new Date();
            var days = $scope.subtractDates(today, maxReturnDate);

            if (days > 365) {
                return "IRRECUPERABLE";
            } else {
                return "VENCIDO";
            };

        }
    
        
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
