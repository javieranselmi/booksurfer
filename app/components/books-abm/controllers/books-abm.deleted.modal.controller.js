//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'booksDeletedModal';
        controller.$inject = ['$scope','$uibModalStack','$state'];

    function controller($scope,$uibModalStack,$state) {
        $scope.back = function() {
            $uibModalStack.dismissAll();
            $state.go('books.search');
        }

    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
