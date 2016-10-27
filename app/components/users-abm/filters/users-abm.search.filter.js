//CONTROLLERS
                                     
(function() {
    var moduleName     = 'users-abm',
        filterName = 'search';

    function filter() {
        
        return function(input,searchName) {
            
            var out = [];
            if (searchName === "" || angular.isUndefined(searchName)) {
                return input;
            };

            angular.forEach(input, function(users) {
                var fullName = user.firstName + ' ' + user.lastName;
                if (fullName.toLowerCase().indexOf(searchName.toLowerCase()) !== -1) {
                    out.push(user)                         
                }
            });
            
            
                return out;
        }
        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
