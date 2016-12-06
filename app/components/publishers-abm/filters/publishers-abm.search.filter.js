//CONTROLLERS
                                     
(function() {
    var moduleName     = 'publishers-abm',
        filterName = 'search';

    function filter() {
        
        return function(input,searchName) {
            
            var out = [];
            if (searchName === "" || angular.isUndefined(searchName)) {
                return input;
            };

            angular.forEach(input, function(publisher) {
                if (publisher.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1) {
                    out.push(publisher)                         
                }
            });
            
            
                return out;
        }
        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
