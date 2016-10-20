(function() {
    var moduleName = 'entity-manager',
        factoryName = 'entityAbm';
    factory.$inject = ['$resource','endpoints'];
    
    function factory($resource, endpoints) {

        var endpointBase = endpoints.BASE;
        var entityService = {};
        var entityName = "";
        entityService.mode = {status: ""}; //["edit","view","create"]
        
        entityService._containsObject = function(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (angular.equals(list[i],obj)) {
                    return true;
                };
            };
        return false;
        };

        entityService.containsObjectWithSameId = function(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i].id === obj.id) {
                    return true;
                };
            };
        return false;
        };
        
        entityService._filterArray = function(objToBeDeleted, list) {
            var filteredList = list.filter(function(element){
                return !angular.equals(element,objToBeDeleted);
            });
            return filteredList;
        };
        
        entityService.setEditMode = function() {
            entityService.mode.status = "edit";
        };
        
        entityService.setViewMode = function() {
            entityService.mode.status = "view";
        };
        
        entityService.setCreateMode = function() {
            entityService.mode.status = "create";
        };
                
        entityService.saveEntity = function() {
            if (entityService.mode.status === "create") {
                return entityService.entity.$save(function(){
                    entityService.setViewMode();
                });
            } else {
                return entityService.entity.$update({id: entityService.id}, function(){
                    entityService.setViewMode();
                });
            }
        };
        

        entityService.addSubentity = function(key, newEntity){
            var alreadyExists = entityService._containsObject(newEntity, entityService.entity[key]);
            if (!alreadyExists) {
                entityService.entity[key].push(angular.copy(newEntity));
                return true;
            } else {
                return false;
            } 
        };
        
        entityService.deleteSubentity = function(key, entityToBeDeleted){
            var filteredArray = entityService._filterArray(entityToBeDeleted, entityService.entity[key]);
            entityService.entity[key] = filteredArray;
        };
        
    
        entityService.getEntity = function(id, editMode) {
            entityService.entity = new entityService.Entity();
            entityService.entity.$get({id: id} , function(data){
                if (editMode === "true") {
                    entityService.setEditMode();
                } else {
                    entityService.setViewMode();
                }
            }, function(){
                entityService.createEmptyEntity();
            });
        };

        entityService.createEmptyEntity = function(id) {
            entityService.entity = new entityService.Entity(); //Must change
            entityService.setCreateMode();
        };

        entityService.deleteEntity = function(id) {
            return entityService.entity.$delete({id: id});
        };
        
        entityService.initializeEntity = function(entityName, id, editMode) {
            entityService.id = id;
            entityService.Entity = $resource(endpointBase + entityName + '/:id', null ,{
                'update': { method: 'PUT' }
            });
            if (isNaN(id)) {
                entityService.createEmptyEntity();
            } else {
                entityService.getEntity(id, editMode);
            };
        };
        
        entityService.initialized = false;
        
        return entityService;
        
    }

    
angular.module(moduleName).factory(factoryName, factory);
    })();
