//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerReturnController';
    controller.$inject = ['$scope','$stateParams','entityAbm','entitySearch','$http', 'endpoints','$filter','$uibModal','$state'];

    function controller($scope, $stateParams, entityAbm, entitySearch, $http, endpoints, $filter, $uibModal, $state) {

        var entity_name_samples = 'samples';
        var entity_name_members = 'members';
        var entity_name_books = 'books';
        var entity_name_authors = 'authors';
        $scope.showLoan = false;
        $scope.forms = {};
        $scope.lockdown = false;
        $scope.searchCriteria = {};
        $scope.searchCriteria.filterSamplesNotForLoan = true;


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
            $http.get(endpoints.GET_SAMPLE.replace(':sampleId', $stateParams.sampleId)).then(function(response){
                $scope.sample = response.data;
            });
        }

        $scope.resetSample = function() {
            $scope.sample = undefined;
            $scope.showLoan = false;
        }

        $scope.setSample = function(sample) {
            $scope.sample = sample;
        }

        $scope.getLoanOfSample = function(sample) {
            var url = endpoints.GET_LOAN_BY_SAMPLE_ID.replace(':sampleId', sample.id);
            return $http.get(url, {
                    sampleId: $scope.sample.id,
                    withdrawDate: $scope.loan.withdrawDate,
                    agreedReturnDate: $scope.loan.agreedReturnDate
                }
            )
        }

        $scope.getLoanMember = function(memberId) {
            var url = endpoints.GET_MEMBER.replace(':memberId', memberId);
            return $http.get(url)
        }

        $scope.loan = {};

        $scope.$watch('sample', function() {
            if ($scope.sample) {
                $scope.getLoanOfSample($scope.sample).then(function(result){
                    $scope.showLoan = true;
                    var latestLoan = result.data[0];
                    latestLoan.withdrawDate = new Date(latestLoan.withdrawDate);
                    latestLoan.agreedReturnDate = new Date(latestLoan.agreedReturnDate);
                    $scope.loan = latestLoan;
                    $scope.getLoanMember($scope.loan.memberId).then(function(result){
                        $scope.member = result.data;
                    });
                })
            }
        });

        $scope.showSuccess = function() {
            return modalInstance = $uibModal.open({
              animation: false,
              templateUrl: 'app/components/loan-manager/templates/loan-manager.return-confirmation.html',
              controller: 'loanManagerReturnConfirmationController',
              resolve: { 
                items: function() {
                    return  {
                        member: $scope.member,
                        loan: $scope.loan,
                        book: $scope.book,
                        sample: $scope.sample
                    }
              }
            }
        });
        };

        $scope.editLoan = function() {
            var obj = {
                    id: $scope.loan.id,
                    //returnDate: $filter('date')($scope.loan.returnDate, 'yyyy-MM-dd'),
                    comment: $scope.loan.comment
            };
            $http.put(endpoints.PUT_LOAN.replace(":id",$scope.loan.id), obj).then(function() {
                    $scope.genericError = undefined;
                    $scope.lockdown = false;
                    $scope.showSuccess().result.then(function() {
                        $state.go('books.search');
                    }, function() {
                        $state.go('books.search');
                    })
                }, function(error){
                    $scope.genericError = error.data.message;
                    $scope.lockdown = false;
                });
        };




    }
    angular.module(moduleName).controller(controllerName, controller);
})();
