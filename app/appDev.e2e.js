var appDev = angular.module('bookstoreE2E', ['bookstore', 'ngMockE2E']);

appDev.run(function($httpBackend) {
    
    
    var removeProperty = function(entityVector, entityName, propertyName) {
        var entityNamePlural =  entityName + 's';
        angular.forEach(entityVector[entityNamePlural], function(entity) {
              delete entity[propertyName];
        });
    };
    
    var addRelationship = function(entityVector, parentEntityName, childEntityName) {
        var parentEntityNamePlural =  parentEntityName + 's';
        var childEntityName = childEntityName + 's';
        
        angular.forEach(entityVector[parentEntityNamePlural], function(entity) {
              entity[childEntityName] = entityVector[childEntityName];
        });
    }
    
    //Entity mocking
    
    var entities = [];
    
    entities.authors = [
         {id:'1',  firstName: 'Juan', lastName: 'Tomate',  nationality: "Argentina"},
         {id:'2',  firstName: 'Omar', lastName: 'Chocolate', nationality: "Argentina"},
         {id:'3',  firstName: 'Pepe', lastName: 'Doriano Finfinelo',  nationality: "Argentina"},
         {id:'4',  firstName: 'Jose', lastName: 'Himmelfreudpointer',  nationality: "Argentina"},
         {id:'5',  firstName: 'Luis', lastName: 'Ramadan',  nationality: "Argentina"}
    ];
    
    entities.books = [
        {
            "id": "1",
            "title": "Pergamino precolombino",
            "publisher": "Smithsonian Historical Publishings",
            "editionYear": "1203",
            "editionCountry": "India",
            "libraryNumber": "5",
            "ISBN": "1204423095839482930",
            "price": "14000.00",
            "reputationValue": "8",
            "samplesAvailable": "1",
            "samplesTotal": "1"
        },
        {
            "id": "2",
            "title": "El psicoanalista",
            "publisher": "Emecé",
            "editionYear": "2009",
            "editionCountry": "España",
            "libraryNumber": "412",
            "ISBN": "1204423032839482930",
            "price": "130.00",
            "reputationValue": "1",
            "samplesAvailable": "0",
            "samplesTotal": "8"
        },
        {
            "id": "3",
            "title": "Martín y la pantalla",
            "publisher": "Niñolibros",
            "editionYear": "1984",
            "editionCountry": "Argentina",
            "libraryNumber": "523",
            "ISBN": "1204423093267432930",
            "price": "300.00",
            "reputationValue": "1",
            "samplesAvailable": "1",
            "samplesTotal": "4"
        }
    ];
    
    entities.members = [
        {
            "id":"1",
            "firstName": "Juan", 
            "lastName": "Tomate", 
            "DNI": "35656544",
            "CUIL": "20-35336537-2",
            "phone": "47666193",
            "email": "juantomate@gmail.com",
            "zip": "1023",
            "city": "Río Cuarto",
            "state": "cordoba",
            "enabled": true,
            "reputation": 2
        },
        {
            "id":"4",
            "firstName": "Martín", 
            "lastName": "Homóplato", 
            "DNI": "35626544",
            "CUIL": "20-33236537-2",
            "phone": "47636193",
            "email": "mat123@gmail.com",
            "zip": "1532",
            "city": "Tandil",
            "state": "Buenos Aires",
            "enabled": true,
            "reputation": 6
        } 
    ];
    entities.samples = [
        {
            "id": "1",
            "barCode":"123123123123123",
            "acquisitionDate": "21-08-2014",
            "withdrawDate": "28-08-2016",
            "book": {
                "id": "1",
                "title": "Pergamino precolombino",
                "publisher": "Smithsonian Historical Publishings",
                "editionYear": "1203",
                "editionCountry": "India",
                "libraryNumber": "5",
                "ISBN": "1204423095839482930",
                "price": "14000.00",
                "reputationValue": "8",
                "samplesAvailable": "1",
                "samplesTotal": "1"
            }
        },
        {
            "id": "2",
            "barCode":"145215346234242",
            "acquisitionDate": "22-01-2011",
            "withdrawDate": null,
            "book": {
                "id": "1",
                "title": "Pergamino precolombino",
                "publisher": "Smithsonian Historical Publishings",
                "editionYear": "1203",
                "editionCountry": "India",
                "libraryNumber": "5",
                "ISBN": "1204423095839482930",
                "price": "14000.00",
                "reputationValue": "8",
                "samplesAvailable": "1",
                "samplesTotal": "1"
            }
        },
        {
            "id": "3",
            "barCode":"145445346234242",
            "acquisitionDate": "22-01-2011",
            "withdrawDate": null,
            "book": {
                "id": "2",
                "title": "El psicoanalista",
                "publisher": "Emecé",
                "editionYear": "2009",
                "editionCountry": "España",
                "libraryNumber": "412",
                "ISBN": "1204423032839482930",
                "price": "130.00",
                "reputationValue": "1",
                "samplesAvailable": "0",
                "samplesTotal": "8"
            }
        },
        {
            "id": "4",
            "barCode":"145108346234242",
            "acquisitionDate": "22-01-2011",
            "withdrawDate": null,
            "book": {
                "id": "3",
                "title": "Martín y la pantalla",
                "publisher": "Niñolibros",
                "editionYear": "1984",
                "editionCountry": "Argentina",
                "libraryNumber": "523",
                "ISBN": "1204423093267432930",
                "price": "300.00",
                "reputationValue": "1",
                "samplesAvailable": "1",
                "samplesTotal": "4"
            }
        },
        {
            "id": "5",
            "barCode":"111111111111111",
            "acquisitionDate": "22-01-2011",
            "withdrawDate": null,
            "book": {
                "id": "1",
                "title": "Pergamino precolombino",
                "publisher": "Smithsonian Historical Publishings",
                "editionYear": "1203",
                "editionCountry": "India",
                "libraryNumber": "5",
                "ISBN": "1204423095839482930",
                "price": "14000.00",
                "reputationValue": "8",
                "samplesAvailable": "1",
                "samplesTotal": "1"
            }
        }];

    entities.loans = [{
            "id": "1",
            "comment": "Se entregó todo sucio",
            "agreedReturnDate":  "2016-10-27",
            "returnDate":  "2016-10-28",
            "withdrawDate":  "2016-10-24",
            "member": {
                "id":"1",
                "firstName": "Juan",
                "lastName": "Tomate",
                "DNI": "35656544",
                "CUIL": "20-35336537-2",
                "phone": "47666193",
                "email": "juantomate@gmail.com",
                "zip": "1023",
                "city": "Río Cuarto",
                "state": "cordoba",
                "enabled": true,
                "reputation": 2
            }
        },
        {
            "id": "2",
            "comment": "Se entregó todo popin",
            "agreedReturnDate":  "2016-11-24",
            "returnDate":  "2016-12-24",
            "withdrawDate":  "2016-10-14"
        }];
    
    addRelationship(entities, 'book', 'author');
    addRelationship(entities, 'book', 'sample');
    
    var messagePost = {notice: "Object was saved successfully"};
    var messageDelete = {notice: "Object was deleted successfully"};
    var messageNew = {notice: "Object was created successfully"};
    var messagePut = {notice: "Object was edited successfully"};

    var entityNames = ['author','member','book','sample','loan'];
    angular.forEach(entityNames, function(entityName) {
        
        var entityNamePlural = entityName + 's';
        var apiUrl = '/api/' + entityNamePlural;
        var regex = new RegExp('/' + entityNamePlural + '/([0-9]+)');
        
        //GET to /entitys/
        $httpBackend.whenGET(apiUrl).respond(function(method,url,data) {
            console.log("GET to" + apiUrl +". Returned ", entities[entityNamePlural]);
            return [200, entities[entityNamePlural], {}];

        });
        
        //POST to /entitys/
        $httpBackend.whenPOST(apiUrl).respond(function(method, url, data) {
            var entity = angular.fromJson(data);
            entity.id = angular.isDefined(entity.id)? entity.id : "2016";
            console.log("Posted entity to " + apiUrl + " . Success, returning entity with ID " +  entity.id, entity);
            return [200, entity, {}];
        });
        
        //GET to /entitys/1
        $httpBackend.whenGET(apiUrl + '/1').respond(function() {
            console.log("GET to " + apiUrl + "/1. Success, returning entity with ID " +  entities[entityNamePlural][0].id, entities[entityNamePlural][0]);
            return [200, entities[entityNamePlural][0], {}];
        });

        //PUT to /entitys/1
        $httpBackend.whenPUT(apiUrl + '/1').respond(function(method, url, data) {
            var entity = angular.fromJson(data);
            console.log("PUT to " + apiUrl + "/1. Success, returning entity with ID " +  entity.id, entity);
            return [200, entity, {}];
        });


        //POST to /entitys/1
        $httpBackend.whenPOST(apiUrl + '/1').respond(messagePost);

        //PUT to /entitys/1
        //$httpBackend.whenPUT(apiUrl + '/1').respond(messagePut);
        
        //DELETE to /entitys/1
        $httpBackend.whenDELETE(apiUrl + '/1').respond(messageDelete);
        
    });


    $httpBackend.whenGET('/api/samples/1/loans/').respond(function(method, url, data) {
        console.log("GET to api/samples/1/loans. Success, returning loan array");
        return [200, entities.loans, {}];
    });

  $httpBackend.whenGET(new RegExp('app/*')).passThrough();
  
});

/*
        {id:'1', title: "Harry Potter y la orden del fenix", publisher: "Planeta", publishYear:"1928", editorial:"Planeta", copiesAvailable:"1", copiesTotal:"4"},
        {id:'2', title: "Martin y el palmito cosmico", publisher: "Planeta", publishYear:"1918", editorial:"Pollito", copiesAvailable:"0", copiesTotal:"10"},
        {id:'3', title: "Esperando la carroza", publisher: "Planeta", publishYear:"2001", editorial:"Maquiavelo Portillo", copiesAvailable:"518", copiesTotal:"1000"},
        {id:'4', title: "Sentado en el mar", publisher: "Planeta", publishYear:"2016", editorial:"Chocolate", copiesAvailable:"0", copiesTotal:"0"},
        {id:'5', title: "Mientras busco en las trifulcas", publisher: "Planeta", publishYear:"1990", editorial:"Tortuga mutante", copiesAvailable:"3", copiesTotal:"10"}
*/