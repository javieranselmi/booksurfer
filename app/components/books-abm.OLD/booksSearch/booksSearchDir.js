app.directive('searchBooks', ["$timeout","$location","$http", function($timeout,$location,$http) {
  return {
    restrict: 'E',
    templateUrl: 'app/components/booksSearch/booksSearchDir.html',
    scope: {
        books: "="
    },
    link: function(scope) {

        scope.deleteStatus = "unset";
        scope.edit = function ( path ) {
            $location.path( path );
        };
        scope.delete = function ( book ) {
            $http.delete("/api/books/"+ book.id).then(function() {
                scope.deleteStatus = "success";
            },function(){
                scope.deleteStatus = "error";
            });
        };
    }
  };
}]);