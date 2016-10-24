(function() {
    var moduleName = 'shared',
        factoryName = 'endpoints';
    //service.$inject = [];

    function factory() {
        //BASE = '/api/' for mocks.
        //BASE = 'http://192.168.0.16:5000/'
        var BASE = 'http://localhost:5000/';
        return {
            BASE: BASE,
            POST_LOAN: BASE + 'loans',
            PUT_LOAN: BASE + 'loans/:id',
            GET_LOAN: BASE + 'loans/',
            GET_LOAN_BY_SAMPLE_ID: BASE + 'samples/:sampleId/loans',
            POST_AUTHOR: BASE + 'authors',
            ADD_AUTHOR_TO_BOOK: BASE + 'books/:bookId/authors/:authorId',
            DELETE_AUTHOR: BASE + 'books/:bookId/authors/:authorId',
            CREATE_SAMPLE: BASE + 'samples',
            DELETE_SAMPLE: BASE + 'samples/:sampleId',
            PUT_SAMPLE: BASE + 'samples/:sampleId'
        }
    }

    angular.module(moduleName).factory(factoryName, factory);
})();