//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksDeletedModal';
        controller.$inject = ['$scope','$modalStack','$state'];

    function controller($scope,$modalStack,$state) {
        $scope.back = function() {
            $modalStack.dismissAll();
            $state.go('books.search');
        }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
