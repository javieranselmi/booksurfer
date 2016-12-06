(function() {
    var moduleName     = 'entity-manager',
        directiveName = 'toggleField';
        
    function directive() {
        
       return {
            require: '^form',
            restrict: 'E',
            transclude: true,
           replace: true,
            require: ['^form', 'ngModel'],
            scope: {
                inputName: '@',
                inputId: '@',
                label: '@',
                isDisabled: '=',
                isRequired: '=',
                formObject: '=',
                fieldText: '=ngModel',
                options: '=',
                minLength:"=",
                maxLength:"=",
                pattern:"=",
            },
           templateUrl: './app/components/entity-manager/directives/toggle-field/entity-manager.toggle-field.directive.html',
           link: function(scope, element, attrs, ctrls) {

                  scope.form = ctrls[0];
                  var ngModel = ctrls[1];
                 
                  scope.$watch('fieldText', function(oldVal, newVal) {
                    scope.model = scope.fieldText;
                  });

                  scope.$watch('model', function() {
                    ngModel.$setViewValue(scope.model);
                  });

            }
          };
   
    };    
    angular.module(moduleName).directive(directiveName, directive);
})();
