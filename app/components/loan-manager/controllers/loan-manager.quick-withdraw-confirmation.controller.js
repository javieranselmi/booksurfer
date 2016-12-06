//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerQuickWithdrawConfirmationController';
        controller.$inject = ['$scope','$uibModalInstance','items'];

    function controller($scope, $uibModalInstance, items) {

    	  $scope.book = items.book;
    	  $scope.loan = items.loan;
    	  $scope.member = items.member;
    	  $scope.sample = items.sample;

		  $scope.ok = function () {
		    $uibModalInstance.close();
		  };

		  $scope.cancel = function () {
		    $uibModalInstance.dismiss();
		};

		  $scope.loanTypeTranslate = function(loan) {
		  	return (loan.loanType === 'REMOTE') ? 'Domiciliario' : 'Local';
		  }

		  console.log($scope.loan.withdrawDate)

    }
    angular.module(moduleName).controller(controllerName, controller);
})();
