var app = angular.module("bookstore", ["ui.router","authors-abm","books-abm","members-abm","users-abm","publishers-abm", "loan-manager","reports","login"]);


app.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('logger');
}]);

app.run(function($rootScope, $state, login) {

	$rootScope.logout = function() {
		login.logout();
		$rootScope.currentUser = undefined;
		$state.go('login');
	};

	$rootScope.currentUser = login.getCurrentUser();

	if (!login.isLoggedIn()) {
		$state.go('login');
	};

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
        	if(toState.name !== 'login' && !login.isLoggedIn()) {
            event.preventDefault();
            $state.go('login');
            }
    });

});

app.factory('logger',['$log',function($log){
	return {request: function(config) {
		if (config.data) {
			$log.debug(config.data);}
		return config;
	}}
}]);


