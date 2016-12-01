//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerHomeController';
    controller.$inject = ['$scope','$stateParams','entityAbm','entitySearch','$http', 'endpoints','$filter','$uibModal','$state'];

    function controller($scope, $stateParams, entityAbm, entitySearch, $http, endpoints, $filter, $uibModal, $state) {

    }
    angular.module(moduleName).controller(controllerName, controller);
})();
