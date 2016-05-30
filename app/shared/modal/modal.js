//DIRECTIVE

app.directive('modal', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/modal/modal.html',
    scope: {
        saveStatus: "="
    },
  };
});