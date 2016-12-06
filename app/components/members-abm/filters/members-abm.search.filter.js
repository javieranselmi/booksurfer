//CONTROLLERS
                                     
(function() {
    var moduleName     = 'members-abm',
        filterName = 'search';

    function filter() {
        
        return function(input,searchName) {
            
            var out = [];
            if (searchName === "" || angular.isUndefined(searchName)) {
                return input;
            };

            angular.forEach(input, function(member) {
                var fullName = member.firstName + ' ' + member.lastName;
                if (fullName.toLowerCase().indexOf(searchName.toLowerCase()) !== -1) {
                    out.push(member)                         
                }
            });
            
            
                return out;
        }
        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
