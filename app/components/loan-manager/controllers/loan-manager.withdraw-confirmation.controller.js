//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerWithdrawConfirmationController';
        controller.$inject = ['$scope','$uibModalInstance'];

    function controller($scope, $uibModalInstance) {


		  $scope.ok = function () {
		    $uibModalInstance.close();
		  };

		  $scope.cancel = function () {
		    $uibModalInstance.dismiss();
		};


    }
    angular.module(moduleName).controller(controllerName, controller);
})();
