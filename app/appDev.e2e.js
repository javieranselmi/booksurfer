var appDev = angular.module('bookstoreE2E', ['bookstore', 'ngMockE2E']);

appDev.run(function($httpBackend) {
    var imageUrlForAll = 'https://media.creativemornings.com/uploads/user/avatar/49419/Bechtel_Profile_Square.jpg'
    //Mocking first 5 authors
      var books = [
        {name: "Harry Potter y la orden del fenix", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", year:"1928", editorial:"Planeta", copiesAvailable:"1", copiesTotal:"4"},
        {name: "Martin y el palmito cosmico", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", year:"1918", editorial:"Pollito", copiesAvailable:"0", copiesTotal:"10"},
        {name: "Esperando la carroza", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", year:"2001", editorial:"Maquiavelo Portillo", copiesAvailable:"518", copiesTotal:"1000"},
        {name: "Sentado en el mar", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", year:"2016", editorial:"Chocolate", copiesAvailable:"0", copiesTotal:"0"},
        {name: "Mientras busco en las trifulcas", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", year:"1990", editorial:"Tortuga mutante", copiesAvailable:"3", copiesTotal:"10"}
    ];
    
    var authors = [
         {id:'1',  firstName: 'Juan', lastName: 'Tomate', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'8',  firstName: 'Omar', lastName: 'Chocolate', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'72', firstName: 'Pepe', lastName: 'Doriano Finfinelo', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'83', firstName: 'Jose', lastName: 'Himmelfreudpointer', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'22', firstName: 'Luis', lastName: 'Ramadan', imageUrl: imageUrlForAll, nationality: "Argentina", books: books}
    ];
    
    var regex = new RegExp('/authors/([0-9]+)');
    
    var message = {notice: "Object was saved successfully"};
    
  // returns the current list of phones
  $httpBackend.whenGET('/api/authors').respond(authors);
  $httpBackend.whenGET('/api/authors/1').respond(authors[0]);
  $httpBackend.whenGET('/api/authors/1').respond(authors[0]);
  $httpBackend.whenPOST('/api/authors/1').respond(message);
  $httpBackend.whenGET('/api/books').respond(books);
  $httpBackend.whenGET(new RegExp('app/*')).passThrough();
  
});