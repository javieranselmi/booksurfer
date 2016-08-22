//DIRECTIVE

app.directive('searchAuthors', ["$timeout","$location","$http", function($timeout,$location,$http) {
  return {
    restrict: 'E',
    templateUrl: 'app/components/authorsSearch/authorsSearchDir.html',
    scope: {
        authors: "="
    },
    link: function (scope,el,attrs) {
        scope.deleteStatus = "unset";
        scope.edit = function ( path ) {
            $location.path( path );
        };
        scope.delete = function ( author ) {
            $http.delete("/api/authors/"+author.id).then(function() {
                scope.deleteStatus = "success";
            },function(){
                scope.deleteStatus = "error";
            });
        };
    }
  };
}]);