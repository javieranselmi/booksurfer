(function() {
    var moduleName = 'shared',
        factoryName = 'login';

    factory.$inject = ['$localStorage','$http', 'endpoints','$q'];

    function factory($localStorage, $http, endpoints, $q) {

        var service = {};



        service.login = function(userToAuthenticate) {
            return service.getUsers().then(function(allUsers) {
                var user = service.authenticateUser(userToAuthenticate,allUsers);
                if (user) {
                  $localStorage.user = user.username;
                  $localStorage.role = user.role;
                  return true;
                } else {
                    return false;
                }
            }) 
        };

        service.logout = function() {
                  delete $localStorage.user;
                  delete $localStorage.role;
                  return true;
        };

        service.getUsers = function() {
             var deferred = $q.defer();
             deferred.resolve([{username: 'javier', role: 'ADMIN', password: 'javier'}]);
             return deferred.promise;
            /*return $http.get(endpoints.GET_USERS).then(function(result){
                return result.data;
            })*/
        };

        service.isLoggedIn = function() {
            return (angular.isDefined($localStorage.user))
        };

        service.getCurrentUser = function() {
            return $localStorage.user;
        };

        service.getCurrentRole = function() {
            return $localStorage.role;
        };

        service.authenticateUser = function(userToAuthenticate, users) {
            result = false;
            angular.forEach(users, function(user){
                if (user.username === userToAuthenticate.username && user.password === userToAuthenticate.password)  {
                    result = user;
                };
            });
            return result;
        };




        return service;
    }

    angular.module(moduleName).factory(factoryName, factory);
})();