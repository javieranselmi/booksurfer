(function() {
    var moduleName = 'shared',
        factoryName = 'login';

    factory.$inject = ['$localStorage','$http', 'endpoints'];

    function factory($localStorage, $http, endpoints) {

        var service = {};
        service.loggedIn = false;
        service.user = false;


        service.login = function(user) {
            return service.getUsers().then(function(users) {
                if (service.authenticateUser(user,users)) {
                  $localStorage.user = user.username;
                  service.loggedIn = true;
                  service.user = user.username;
                  return true;
                } else {
                    return false;
                }
            }) 
        };

        service.getUsers = function() {
            return $http.get(endpoints.GET_USERS).then(function(result){
                return result.data;
            })
        };

        service.getCurrentUser = function() {
            return $localStorage.user;
        };

        service.authenticateUser = function(userToAuthenticate, users) {
            result = false;
            angular.forEach(users, function(user){
                if (user.username === userToAuthenticate.username && user.password === userToAuthenticate.password)  {
                    result = true;
                };
            });
            return result;
        };




        return service;
    }

    angular.module(moduleName).factory(factoryName, factory);
})();