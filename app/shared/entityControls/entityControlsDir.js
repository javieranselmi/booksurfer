//DIRECTIVE

app.directive('entityControls', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/entityControls/entityControlsDir.html',
    scope: {
        editAction: "&",
        deleteAction: "&",
        entityName: "@",
        entityId: "@"

    },
    link: function() {

        //console.log(entityId, entityName);
        //$('.tooltip').tooltip(options)
    }
  };
});