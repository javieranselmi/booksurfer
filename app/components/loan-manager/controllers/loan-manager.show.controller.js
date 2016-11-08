//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerShowController';
        controller.$inject = ['$scope', '$stateParams', 'endpoints', '$http'];

    function controller($scope, $stateParams, endpoints, $http) {



        $scope.getSample = function(sampleId) {
            var url = endpoints.GET_SAMPLE.replace(':sampleId', sampleId);
                return $http.get(url);
        }

        $scope.getMember = function(memberId) {
            var url = endpoints.GET_MEMBER.replace(':memberId', memberId);
                return $http.get(url);
        }

        $scope.getBook = function(bookId) {
            var url = endpoints.GET_BOOK.replace(':bookId', bookId);
                return $http.get(url);
        }

        $scope.getLoan = function(sampleId) {
            var url = endpoints.GET_SAMPLE_LOANS.replace(':sampleId', sampleId);
                $http.get(url).then(function(result){
                    $scope.loan = result.data[0];
                    console.log($scope.loans)
                    $scope.getSample($scope.loan.sampleId).then(function(result){
                        $scope.sample = result.data;
                    });
                    $scope.getMember($scope.loan.memberId).then(function(result){
                        $scope.member = result.data;
                    });;
                })
        }


        $scope.getLoan($stateParams.sampleId);

    }
    angular.module(moduleName).controller(controllerName, controller);
})();
