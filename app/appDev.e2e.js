var appDev = angular.module('bookstoreE2E', ['bookstore', 'ngMockE2E']);

appDev.run(function($httpBackend) {
    var imageUrlForAll = 'https://media.creativemornings.com/uploads/user/avatar/49419/Bechtel_Profile_Square.jpg'
    //Mocking first 5 authors
    var authors = [
         {id:'1',  firstName: 'Juan', lastName: 'Tomate', imageUrl: imageUrlForAll, nationality: "Argentina"},
         {id:'8',  firstName: 'Omar', lastName: 'Chocolate', imageUrl: imageUrlForAll, nationality: "Argentina"},
         {id:'72', firstName: 'Pepe', lastName: 'Doriano Finfinelo', imageUrl: imageUrlForAll, nationality: "Argentina"},
         {id:'83', firstName: 'Jose', lastName: 'Himmelfreudpointer', imageUrl: imageUrlForAll, nationality: "Argentina"},
         {id:'22', firstName: 'Luis', lastName: 'Ramadan', imageUrl: imageUrlForAll, nationality: "Argentina"}
    ];
    
      var books = [
        {name: "Harry Potter y la orden del fenix", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png"},
        {name: "Martin y el palmito cosmico", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png"},
        {name: "Esperando la carroza", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png"},
        {name: "Sentado en el mar", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png"},
        {name: "Mientras busco en las trifulcas", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png"}
    ];
    
    var regex = new RegExp('/authors/([0-9]+)');
    
  // returns the current list of phones
  $httpBackend.whenGET('/api/authors').respond(authors);
  $httpBackend.whenGET('/api/authors/1').respond(authors[0]);
  $httpBackend.whenGET('/api/books').respond(books);
  $httpBackend.whenGET(new RegExp('app/*')).passThrough();
  
});