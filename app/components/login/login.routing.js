//Routes
(function() {
    var moduleName = 'login';

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/components/login/templates/login.view.html',
            controller: 'loginController'
        });

    }
    angular.module(moduleName).config(config);
})();
