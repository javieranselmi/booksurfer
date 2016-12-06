(function() {
    var moduleName     = 'entity-manager',
        directiveName = 'checkboxField';
        
    function directive() {
        
       return {
            require: '^form',
            restrict: 'E',
           replace: true,
            require: ['^form', 'ngModel'],
            scope: {
                inputName: '@',
                inputId: '@',
                label: '@',
                isDisabled: '=',
                formObject: '=',
                fieldText: '=ngModel'
            },
           templateUrl: './app/components/entity-manager/directives/checkbox-field/entity-manager.checkbox-field.directive.html',
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
