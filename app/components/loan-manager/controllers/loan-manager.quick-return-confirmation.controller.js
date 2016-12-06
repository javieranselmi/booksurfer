//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerQuickReturnConfirmationController';
        controller.$inject = ['$scope','$uibModalInstance','items'];

    function controller($scope, $uibModalInstance, items) {

    	  $scope.loan = items.loan;

		  $scope.ok = function () {
		    $uibModalInstance.close();
		  };

		  $scope.cancel = function () {
		    $uibModalInstance.dismiss();
		};

		  $scope.loanTypeTranslate = function(loan) {
		  	return (loan.loanType === 'REMOTE') ? 'Domiciliario' : 'Local';
		  }
    }
    angular.module(moduleName).controller(controllerName, controller);
})();
