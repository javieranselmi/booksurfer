//CONTROLLERS
                                     
(function() {
    var moduleName     = 'shared',
        filterName = 'startFrom';

    function filter() {
        
	    return function(input, start) {
	        start = +start; //parse to int
	        return input.slice(start);
	    }

        
     };

    angular.module(moduleName).filter(filterName, filter);
})();
