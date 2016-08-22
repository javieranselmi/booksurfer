(function() {
    var moduleName = 'entity-manager',
        factoryName = 'entitySearch';
    factory.$inject = ['$resource','$http'];
    
    function factory($resource,$http) {    
        
        var entitySearch = {};
        entitySearch.results = {};
        entitySearch.url = "";
        
        entitySearch.initializeEntity = function(entityName) {
            entitySearch.url = '/api/' + entityName;
        };
        
        entitySearch.getAllEntities = function() { 
            return $http.get(entitySearch.url);
        };
        
        return entitySearch;
        
    }     
    
angular.module(moduleName).factory(factoryName, factory);
})();
