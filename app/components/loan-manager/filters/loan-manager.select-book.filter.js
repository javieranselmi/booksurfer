//CONTROLLERS
                                     
(function() {
    var moduleName     = 'loan-manager',
        filterName = 'selectBook';

    function filter() {

        return function(input, searchedTitle) {


            if (!searchCriteria) {
                return [];
            }
            var out = [];
            angular.forEach(input, function(book) {

                if (searchedTitle) {
                    var fullName = member.firstName + ' ' + member.lastName;
                    matchName = fullName.toLowerCase().indexOf(searchCriteria.name.toLowerCase()) !== -1;
                };

                if (searchCriteria.dni) {
                    matchDNI = member.dni.indexOf(searchCriteria.dni) !== -1;
                };

                if (searchCriteria.cuil) {
                    matchCUIL = member.cuil.toLowerCase().indexOf(searchCriteria.cuil.toLowerCase()) !== -1;
                };

                if (searchCriteria.phone) {
                    matchPhone = member.phone.toLowerCase().indexOf(searchCriteria.phone.toLowerCase()) !== -1;
                };

                if (matchName && matchDNI && matchCUIL && matchPhone) {
                    out.push(member);
                };
            });

            return out;
        }
        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
