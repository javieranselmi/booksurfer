//CONTROLLERS
                                     
(function() {
    var moduleName     = 'books-abm',
        filterName = 'search';

    function filter() {
        
        return function(input,searchName) {
            
            var out = [];
            if (searchName === "" || angular.isUndefined(searchName)) {
                return input;
            };

            angular.forEach(input, function(book) {
                var fullName = book.firstName + ' ' + book.lastName;
                if (fullName.toLowerCase().indexOf(searchName.toLowerCase()) !== -1) {
                    out.push(book)                         
                }
            });
            
            
                return out;
        }
        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
