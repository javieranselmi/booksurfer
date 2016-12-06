(function() {
    var moduleName     = 'entity-manager',
        directiveName = 'dateField';
        
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
                placeholder: '@',
                label: '@',
                glyphicon: '@',
                inputType: '@',
                isRequired: '=',
                isDisabled: '=',
                formObject: '=',
                fieldText: '=ngModel',
                noValidate: '=',
                minLength:"=",
                maxLength:"=",
                max:"=",
                min:"="

            },
           templateUrl: './app/components/entity-manager/directives/date-field/entity-manager.date-field.directive.html',
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
