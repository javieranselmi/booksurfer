//DIRECTIVE

app.directive('entityControls', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/entityControls/entityControlsDir.html',
    scope: {
        editAction: "&",
        deleteAction: "&",
        entity: "=",
        entityName: "@",
        deleteStatus: "="

    },
    link: function(scope) {
        
    }
  };
});


