//DIRECTIVE

app.directive('searchAuthors', ["$timeout","$location", function($timeout,$location) {
  return {
    restrict: 'E',
    templateUrl: 'app/components/authorsSearch/authorsSearchDir.html',
    scope: {
        authors: "="
    },
    link: function (scope,el,attrs) {
        scope.go = function ( path ) {
            $location.path( path );
        };
    }
  };
}]);