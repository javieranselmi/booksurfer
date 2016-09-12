//CONTROLLERS
(function() {
    var moduleName     = 'books-abm',
        controllerName = 'bookAbmSampleController';
        controller.$inject = ['$scope','entityAbm','$stateParams'];

    function controller($scope,entityAbm,$stateParams) {
        

        $scope.mode = entityAbm.mode;
        $scope.book = entityAbm.entity;
        
        $scope.mustShowSampleForm = false;
        $scope.editingSample = false;
        $scope.creatingSample = false;
        
        $scope.editSample = function(sample) {
            $scope.creatingSample = false;
            $scope.newSample = sample;
            $scope.mustShowSampleForm = true;
            $scope.editingSample = true;
        };
        
        $scope.prepareNewSample = function() {
            $scope.editingSample = false;
            $scope.newSample = {};
            $scope.mustShowSampleForm = true;
            $scope.creatingSample = true;
        }
        
        $scope.createSample = function(entityName, newSample) {
            entityAbm.addSubentity(entityName,newSample);
            $scope.mustShowSampleForm = false;
            $scope.editingSample = false;
            $scope.creatingSample = false;
        }
        
        $scope.saveEditedSample = function(entityName, newAuthor) {
            $scope.mustShowSampleForm = false;
            $scope.editingSample = false;
            $scope.creatingSample = false;
        }
        
        $scope.deleteSample = function(entityName, deletedSample) {
            entityAbm.deleteSubentity(entityName,deletedSample);
        };
    };    
    angular.module(moduleName).controller(controllerName, controller);
})();
