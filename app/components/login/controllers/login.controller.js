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
    				$state.go('authors.search');
    				$rootScope.currentUser = "HOLA!";
    			} else {
    				$scope.errors = "No coincide el nombre de usuario con la contraseña.";
    			}
    		})
    	}
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
