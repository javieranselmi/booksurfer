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

        /*$scope.forms = {};
        $scope.lockdown = false;
        $scope.searchCriteria = {};
        $scope.searchCriteria.filterSamplesNotForLoan = true;

        var entity_name_samples = 'samples';
        var entity_name_members = 'members';
        var entity_name_books = 'books';
        var entity_name_authors = 'authors';

        if (!$stateParams.memberId) {
            entitySearch.getAllEntities(entity_name_members).then(function(result){
                $scope.allMembers = result.data;
            });
        } else {
            entityAbm.initializeEntity(entity_name_members, $stateParams.memberId);
            $scope.member = entityAbm.entity;
        }
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
        }
        $scope.resetMember = function() {
            $scope.member = undefined;
        }

        $scope.setSample = function(sample) {
            $scope.sample = sample;
        }

        $scope.setMember = function(member) {
            $scope.member = member;
        }

        var today = new Date();
        var defaultReturnDate = new Date();

        $scope.loan = {};
        $scope.loan.withdrawDate = today;
        $scope.loan.agreedReturnDate = new Date(defaultReturnDate.setDate(today.getDate() + 10));

        $scope.showSuccess = function() {
            return modalInstance = $uibModal.open({
              animation: false,
              templateUrl: 'app/components/loan-manager/templates/loan-manager.withdraw-confirmation.html',
              controller: 'loanManagerWithdrawConfirmationController',
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

        $scope.postLoan = function() {
            if ($scope.forms.loanForm.$invalid) {
                $scope.forms.loanForm.$setSubmitted();
                return;
            }
            $scope.lockdown = true;
            if($scope.forms.loanForm.$valid) {
                var obj = {
                        memberId: $scope.member.id,
                        sampleId: $scope.sample.id,
                        withdrawDate: $filter('date')($scope.loan.withdrawDate, 'yyyy-MM-dd'),
                        agreedReturnDate: $filter('date')($scope.loan.agreedReturnDate, 'yyyy-MM-dd'),
                        comment: '',
                        loanType: $scope.loan.loanType
                };
                $http.post(endpoints.POST_LOAN, obj).then(function() {
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
        };*/


    }
    angular.module(moduleName).controller(controllerName, controller);
})();
