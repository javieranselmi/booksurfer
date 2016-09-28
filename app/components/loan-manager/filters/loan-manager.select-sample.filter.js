//CONTROLLERS
                                     
(function() {
    var moduleName     = 'loan-manager',
        filterName = 'selectSample';

    function filter() {

        return function(input, searchCriteria) {

            var out = [];
            if (searchName === "" || angular.isUndefined(searchName)) {
                return input;
            };

            angular.forEach(input, function(sample) {
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
