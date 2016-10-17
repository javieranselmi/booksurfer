//CONTROLLERS
                                     
(function() {
    var moduleName = 'books-abm',
        filterName = 'bookSearch';

    function filter() {
        
        return function(input,searchCriteria) {
            
            var out = [];
            var noTitle = (searchCriteria.title === "" || angular.isUndefined(searchCriteria.title));
            var noIsbn = (searchCriteria.isbn === "" || angular.isUndefined(searchCriteria.isbn));
            var noGender = (searchCriteria.gender === "" || angular.isUndefined(searchCriteria.gender));
            var noAuthor = (searchCriteria.author === "" || angular.isUndefined(searchCriteria.author));

            var allFieldsEmpty = noTitle && noIsbn && noGender && noAuthor;

            if (allFieldsEmpty) {
                return input;
            };

            angular.forEach(input, function(book) {

                var matchTitle = true;
                var matchIsbn = true;
                var matchGender = true;
                var matchAuthor = true;

                if (searchCriteria.title) {
                    matchTitle = book.title.toLowerCase().indexOf(searchCriteria.title.toLowerCase()) !== -1;
                };

                if (searchCriteria.isbn) {
                    matchIsbn = book.isbn.indexOf(searchCriteria.isbn) !== -1;
                };

                if (searchCriteria.gender) {
                    matchGender = book.gender.toLowerCase().indexOf(searchCriteria.gender.toLowerCase()) !== -1;
                };

                if (searchCriteria.author) {
                    angular.forEach(book.authors, function(author) {
                        var fullName = author.firstName + ' ' + author.lastName;
                        matchAuthor = false;
                        if (fullName.toLowerCase().indexOf(searchCriteria.author.toLowerCase()) !== -1) {
                            matchAuthor = true;
                        };
                    });
                };

                if (matchTitle && matchIsbn && matchGender && matchAuthor) {
                    out.push(book);
                };

            });
            
            
                return out;
        }
        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
