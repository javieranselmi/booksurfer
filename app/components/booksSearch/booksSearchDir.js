app.directive('searchBooks', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/booksSearch/booksSearchDir.html',
    scope: {
        books: "="
    },
    link: function() {

        //$('.tooltip').tooltip(options)
    }
  };
});