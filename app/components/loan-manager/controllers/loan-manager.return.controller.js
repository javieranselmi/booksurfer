//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerReturnController';
    controller.$inject = ['$scope','$stateParams','entityAbm','entitySearch','$http', 'endpoints'];

    function controller($scope, $stateParams, entityAbm, entitySearch, $http, endpoints) {

        var entity_name_samples = 'samples';
        var entity_name_members = 'members';
        var entity_name_books = 'books';
        var entity_name_authors = 'authors';
        $scope.showLoan = false;

        if (!$stateParams.sampleId) {
            entitySearch.getAllEntities(entity_name_samples).then(function(result){
                $scope.allSamples = result.data;
            });
            entitySearch.getAllEntities(entity_name_books).then(function(result){
                $scope.allBooks = result.data;
            });
            entitySearch.getAllEntities(entity_name_authors).then(function(result){
                $scope.allAuthors = result.data;
            });
        } else {
            entityAbm.initializeEntity(entity_name_samples, $stateParams.sampleId);
            $scope.sample = entityAbm.entity;
        }

        $scope.resetSample = function() {
            $scope.sample = undefined;
            $scope.showLoan = false;
        }

        $scope.setSample = function(sample) {
            $scope.sample = sample;
        }

        $scope.getLoan = function() {
            var url = endpoints.GET_LOAN_BY_SAMPLE_ID.replace(':sampleId', $scope.sample.id);
            return $http.get(url, {
                    sampleId: $scope.sample.id,
                    withdrawDate: $scope.loan.withdrawDate,
                    agreedReturnDate: $scope.loan.agreedReturnDate
                }
            )
        }

        $scope.loan = {};

        $scope.$watch('sample', function() {
            if ($scope.sample) {
                $scope.getLoan().then(function(result){
                    $scope.showLoan = true;
                    var latestLoan = result.data[0];
                    latestLoan.withdrawDate = new Date(latestLoan.withdrawDate);
                    latestLoan.agreedReturnDate = new Date(latestLoan.agreedReturnDate);
                    $scope.loan = latestLoan;
                })
            }
        })

        $scope.editLoan = function() {
            $http.put(endpoints.PUT_LOAN.replace(":id",$scope.loan.id), {
                    id: $scope.loan.id,
                    returnDate: $scope.loan.returnDate,
                    comment: $scope.loan.comment
                }
            )
        };








    }
    angular.module(moduleName).controller(controllerName, controller);
})();
