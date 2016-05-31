var appDev = angular.module('bookstoreE2E', ['bookstore', 'ngMockE2E']);

appDev.run(function($httpBackend) {
    var imageUrlForAll = 'https://media.creativemornings.com/uploads/user/avatar/49419/Bechtel_Profile_Square.jpg';
    
    var authorsForBooks = [ //Esta version de los autores no incluye los libros, para poder ser incluidos en el libro
         {id:'1',  firstName: 'Juan', lastName: 'Tomate', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'8',  firstName: 'Omar', lastName: 'Chocolate', imageUrl: "http://facialexercisesguide.com/wp-images/man-face.jpg", nationality: "Argentina", books: books},
         {id:'72', firstName: 'Pepe', lastName: 'Doriano Finfinelo', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'83', firstName: 'Jose', lastName: 'Himmelfreudpointer', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'22', firstName: 'Luis', lastName: 'Ramadan', imageUrl: imageUrlForAll, nationality: "Argentina", books: books}
    ];
    
    //Mocking first 5 authors
      var books = [
        {id:'1', title: "Harry Potter y la orden del fenix", publisher: "Planeta", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", publishYear:"1928", editorial:"Planeta", copiesAvailable:"1", copiesTotal:"4", authors: [authorsForBooks[0],authorsForBooks[1]]},
        {id:'2', title: "Martin y el palmito cosmico", publisher: "Planeta", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", publishYear:"1918", editorial:"Pollito", copiesAvailable:"0", copiesTotal:"10", authors: [authorsForBooks[3]]},
        {id:'3', title: "Esperando la carroza", publisher: "Planeta", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", publishYear:"2001", editorial:"Maquiavelo Portillo", copiesAvailable:"518", copiesTotal:"1000"},
        {id:'4', title: "Sentado en el mar", publisher: "Planeta", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", publishYear:"2016", editorial:"Chocolate", copiesAvailable:"0", copiesTotal:"0"},
        {id:'5', title: "Mientras busco en las trifulcas", publisher: "Planeta", imageUrl: "http://findicons.com/files/icons/2198/dark_glass/128/contents.png", publishYear:"1990", editorial:"Tortuga mutante", copiesAvailable:"3", copiesTotal:"10"}
    ];
    
    var authors = [
         {id:'1',  firstName: 'Juan', lastName: 'Tomate', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'8',  firstName: 'Omar', lastName: 'Chocolate', imageUrl: "http://facialexercisesguide.com/wp-images/man-face.jpg", nationality: "Argentina", books: books},
         {id:'72', firstName: 'Pepe', lastName: 'Doriano Finfinelo', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'83', firstName: 'Jose', lastName: 'Himmelfreudpointer', imageUrl: imageUrlForAll, nationality: "Argentina", books: books},
         {id:'22', firstName: 'Luis', lastName: 'Ramadan', imageUrl: imageUrlForAll, nationality: "Argentina", books: books}
    ];
    

    
    var regex = new RegExp('/authors/([0-9]+)');
    
    var messagePost = {notice: "Object was saved successfully"};
    var messageDelete = {notice: "Object was deleted successfully"};
    var messageNew = {notice: "Object was created successfully"};
    
  // returns the current list of phones
  $httpBackend.whenGET('/api/authors').respond(authors);
  $httpBackend.whenPOST('/api/authors').respond(messageNew);
    
  $httpBackend.whenGET('/api/authors/1').respond(authors[0]);
  $httpBackend.whenPOST('/api/authors/1').respond(messagePost);
  $httpBackend.whenDELETE('/api/authors/1').respond(messageDelete);
    
  $httpBackend.whenGET('/api/authors/8').respond(authors[1]);
  $httpBackend.whenPOST('/api/authors/8').respond(messagePost);
  $httpBackend.whenDELETE('/api/authors/8').respond(messageDelete);
    
  $httpBackend.whenGET('/api/books').respond(books);
  $httpBackend.whenPOST('/api/authors').respond(messageNew);
    
  $httpBackend.whenGET('/api/books/1').respond(books[0]); 
  $httpBackend.whenPOST('/api/books/1').respond(messagePost); 
  $httpBackend.whenDELETE('/api/books/1').respond(messageDelete); 
    
  $httpBackend.whenGET(new RegExp('app/*')).passThrough();
  
});