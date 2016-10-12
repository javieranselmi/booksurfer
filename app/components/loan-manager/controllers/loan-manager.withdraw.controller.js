//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerWithdrawController';
        controller.$inject = ['$scope','$stateParams','entityAbm','entitySearch','$http'];

    function controller($scope, $stateParams, entityAbm, entitySearch, $http) {

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

        $scope.postLoan = function() {
            console.log("Posting loan");
            $http.post('http://192.168.0.16:5000/loans', {
                    memberId: $scope.member.id,
                    sampleId: $scope.sample.id,
                    withdrawDate: $scope.loan.withdrawDate,
                    agreedReturnDate: $scope.loan.agreedReturnDate
                }
            )
        };








    }
    angular.module(moduleName).controller(controllerName, controller);
})();
