(function() {
    var moduleName = 'entity-manager',
        factoryName = 'entityAbm';
    factory.$inject = ['$resource'];
    
    function factory($resource) {    
        
        var entityService = {};
        var entityName = "";
        entityService.mode = {status: ""}; //["edit","view","create"]

        
        entityService.setEditMode = function() {
            entityService.mode.status = "edit";
        };
        
        entityService.setViewMode = function() {
            entityService.mode.status = "view";
        };
        
        entityService.setCreateMode = function() {
            entityService.mode.status = "create";
        };
                
        entityService.saveEntity = function(successCb, errorCb) {
           entityService.entity.$save(function(){
                entityService.setViewMode();   
           });
        };
        
        entityService.createEmptyEntity = function(id) {
            entityService.entity = new entityService.Entity(); //Must change
            entityService.setCreateMode();
        };
        
        entityService.getEntity = function(id, editMode) {
            entityService.entity = new entityService.Entity();
            entityService.entity.$get({id: id}, function(data){
                if (editMode === "true") {
                    entityService.setEditMode();
                } else {
                    entityService.setViewMode();
                }
            }, function(){
                entityService.createEmptyEntity();
            });
        };
        
        entityService.initializeEntity = function(entityName, id, editMode) {
            entityService.Entity = new $resource('/api/' + entityName + '/:id');
            if (isNaN(id)) {
                entityService.createEmptyEntity();
            } else {
                entityService.getEntity(id, editMode);
            };
        };
        
        return entityService;
        
    }     
    
angular.module(moduleName).factory(factoryName, factory);
})();
