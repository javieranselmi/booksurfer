(function() {
    var moduleName = 'entity-manager',
        factoryName = 'entitySearch';
    factory.$inject = ['$resource','$http'];
    
    function factory($resource,$http) {    
        
        var entitySearch = {};
        entitySearch.results = {};
        entitySearch.url = "";
        
        entitySearch.getAllEntities = function(entityName) { 
            entitySearch.url = '/api/' + entityName;
            return $http.get(entitySearch.url);
        };
        
        return entitySearch;
        
    }     
    
angular.module(moduleName).factory(factoryName, factory);
})();
