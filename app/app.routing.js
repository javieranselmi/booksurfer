//Routes
(function() {
    var moduleName = 'bookstore';
    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            controller: 'homeController',
            templateUrl: 'app/components/home/homeView.html',
        });
    }
    angular.module(moduleName).config(config);
})();
