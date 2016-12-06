(function() {
    var moduleName = 'entity-manager',
        factoryName = 'entitySearch';
    factory.$inject = ['$resource','$http','endpoints'];
    
    function factory($resource,$http,endpoints) {

        var endpointBase = endpoints.BASE;
        //var endpointBase = '/api/';
        var entitySearch = {};
        entitySearch.results = {};
        entitySearch.url = "";
        
        entitySearch.getAllEntities = function(entityName) { 
            entitySearch.url = endpointBase + entityName;
            return $http.get(entitySearch.url);
        };
        
        return entitySearch;
        
    }     
    
angular.module(moduleName).factory(factoryName, factory);
})();
