//CONTROLLERS
(function() {
    var moduleName     = 'login',
        controllerName = 'loginController';
        controller.$inject = ['$scope', 'login','$state','$rootScope'];

    function controller($scope, login, $state, $rootScope) {
    	$scope.forms = {};
    	$scope.user = {};
    	$scope.login = function(user) {
    		login.login(user).then(function(result){
    			if (result) {
                    // $state.go('books.search');
    				$state.go('loan.home');
    				$rootScope.currentUser = login.getCurrentUser();
    			} else {
    				$scope.errors = "No coincide el nombre de usuario con la contraseña.";
    			}
    		})
    	}
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
