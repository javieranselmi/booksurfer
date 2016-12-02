//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerHomeController';
    controller.$inject = ['$scope','$stateParams','entityAbm','entitySearch','$http','endpoints','$filter','$uibModal','$state'];

    function controller($scope, $stateParams, entityAbm, entitySearch, $http, endpoints, $filter, $uibModal, $state) {
        $scope.showBooks = true;
        $scope.showSamples = false;
        $scope.lockdown = false;
        $scope.forms = {};

        $scope.showSample = function(sampleId) {
            $scope.showBooks = false;
            $scope.showSamples = true;
        }

        $scope.deselectBook = function() {
            $scope.showBooks = true;
            $scope.showSamples = false;
        }

        entitySearch.getAllEntities('members').then(function(result){
            $scope.allMembers = result.data;
        });
        entitySearch.getAllEntities('samples').then(function(result){
            $scope.allSamples = result.data;
        });
        entitySearch.getAllEntities('books').then(function(result){
            $scope.allBooks = result.data;
        });

        $scope.availableSamples = function(book) {
            return book.samples.filter(function(sample) {return sample.availableForLoan === "True"}).length;
        }

        $scope.setBook = function(book) {
            $scope.book = book;
        }

        $scope.unsetBook = function() {
            $scope.book = undefined;
        }

        $scope.setSample = function(sample) {
            $scope.sample = sample;
        }

        $scope.filterAvailable = function(samples) {
            return samples.filter(function(sample){
                return sample.availableForLoan === "True";
            });
        }

        $scope.postLoan = function() {
            if ($scope.forms.withdrawForm.$invalid) {
                $scope.forms.withdrawForm.$setSubmitted();
                console.log("FORM INVALID!", $scope.forms.withdrawForm)
                return;
            }
            $scope.lockdown = true;
            if($scope.forms.withdrawForm.$valid) {
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
                    $scope.showSuccess();
                    $scope.lockdown = false;
                }, function(error){
                    $scope.genericError = error.data.message;
                    $scope.lockdown = false;
                });
            };
        };


    }
    angular.module(moduleName).controller(controllerName, controller);
})();
