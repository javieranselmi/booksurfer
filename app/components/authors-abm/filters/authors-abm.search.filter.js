//CONTROLLERS
                                     
(function() {
    var moduleName     = 'authors-abm',
        filterName = 'search';

    function filter() {
        
        return function(input,searchName) {
            
            var out = [];
            if (searchName === "" || angular.isUndefined(searchName)) {
                return input;
            };

            angular.forEach(input, function(author) {
                var fullName = author.firstName + ' ' + author.lastName;
                if (fullName.toLowerCase().indexOf(searchName.toLowerCase()) !== -1) {
                    out.push(author)                         
                }
            });
            
            
                return out;
        }
        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
