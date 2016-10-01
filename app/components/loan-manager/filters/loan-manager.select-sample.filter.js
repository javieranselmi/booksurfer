//CONTROLLERS
                                     
(function() {
    var moduleName     = 'loan-manager',
        filterName = 'selectSample';

    function filter() {

        return function(input, searchCriteria) {


            if (!searchCriteria) {
                return [];
            }
            var out = [];
            angular.forEach(input, function(sample) {

                var matchTitle = true;
                var matchBarCode = true;
                var matchIsbn = true;

                if (searchCriteria.title) {
                    matchTitle = sample.book.title.toLowerCase().indexOf(searchCriteria.title.toLowerCase()) !== -1;
                };

                if (searchCriteria.barCode) {
                    matchBarCode = sample.barCode.indexOf(searchCriteria.barCode) !== -1;
                };

                if (searchCriteria.isbn) {
                    matchIsbn = sample.book.ISBN.toLowerCase().indexOf(searchCriteria.isbn.toLowerCase()) !== -1;
                };

                if (matchTitle && matchBarCode && matchIsbn) {
                    out.push(sample);
                };
            });

            return out;
        }
        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
