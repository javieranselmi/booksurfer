//CONTROLLERS
(function() {
    var moduleName     = 'members-abm',
        controllerName = 'membersAbmController';
        controller.$inject = ['$scope','countries','entityAbm','$stateParams','$state','lists','$filter','endpoints','$http'];

    function controller($scope,countries,entityAbm,$stateParams, $state, lists, $filter, endpoints, $http) {
        
        var entity = 'members';
        $scope.defaultImg = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
        
        entityAbm.initializeEntity(entity, $stateParams.id, $stateParams.edit);
        
        $scope.mode = entityAbm.mode;
        $scope.countries = countries();
        $scope.member = entityAbm.entity;
        $scope.goToEdit = entityAbm.setEditMode;
        $scope.lockdown = false;
        $scope.forms = {};
        $scope.countries = lists.countries;
        $scope.states = lists.states;
        $scope.cities = lists.cities;
        
        $scope.getMemberLoans = function(memberId) {
            var url = endpoints.GET_MEMBER_LOANS.replace(':memberId', memberId);
                $http.get(url).then(function(result){
                    $scope.loans = result.data;
                })

        }

        $scope.getMemberLoans($stateParams.id);

        $scope.saveMember = function() {
            $scope.lockdown = true;
                if($scope.forms.membersAbmForm.$valid) {
                    entityAbm.saveEntity().then(function(response){
                    $state.go('members.abm',{id: response.id});
                    $scope.genericError = undefined;
                    $scope.lockdown = false;
                }, function(error){
                    $scope.genericError = error.data.message;
                    $scope.lockdown = false;
                }); 
            };

        }

        $scope.goToEdit = entityAbm.setEditMode;
        $scope.deleteMember = function() {
            $scope.lockdown = true;
            entityAbm.deleteEntity($scope.member.id).then(function(response){
                $state.go('members.deletedModal');
                $scope.genericError = undefined;
                $scope.lockdown = false;
            }, function(error){
                $scope.genericError = error.data.message;
                $scope.lockdown = false;
            });
        }
        $scope.discardChanges = function() {
            entityAbm.initializeEntity(entity, $stateParams.id, false);
            $scope.member = entityAbm.entity;
        };

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
