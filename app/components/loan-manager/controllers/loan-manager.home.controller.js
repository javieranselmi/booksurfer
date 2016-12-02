//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerHomeController';
    controller.$inject = ['$scope','$stateParams','entityAbm','entitySearch','$http','endpoints','$filter','$uibModal','$state'];

    function controller($scope, $stateParams, entityAbm, entitySearch, $http, endpoints, $filter, $uibModal, $state) {
        $scope.showBooks = true;
        $scope.showSamples = false;

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


    }
    angular.module(moduleName).controller(controllerName, controller);
})();
