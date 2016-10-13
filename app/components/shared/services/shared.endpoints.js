(function() {
    var moduleName = 'shared',
        factoryName = 'endpoints';
    //service.$inject = [];

    function factory() {
        //BASE = '/api/ for mocks.
        var BASE = '/api/';
        return {
            BASE: BASE,
            POST_LOAN: BASE + 'loans/',
            PUT_LOAN: BASE + 'loans/:id',
            GET_LOAN: BASE + 'loans/',
            GET_LOAN_BY_SAMPLE_ID: BASE + 'samples/:sampleId/loans/'
        }
    }

    angular.module(moduleName).factory(factoryName, factory);
})();