(function() {
    var moduleName     = 'members-abm',
        controllerName = 'membersSearchController';
    controller.$inject = ["$scope","entitySearch","countries","searchFilter"];
    
    function controller($scope,entitySearch,countrySelect,searchFilter) {
        $scope.members = [];
        entitySearch.initializeEntity("members");
        
        entitySearch.getAllEntities().then(function(result){
            $scope.members = result.data;
        });
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();