(function() {
    var moduleName     = 'entity-manager',
        directiveName = 'genericError';
        
    function directive() {
        
       return {
            restrict: 'E',
            replace: true,
            scope: {
                genericError: '=',
            },
           templateUrl: './app/components/entity-manager/directives/generic-error/entity-manager.generic-error.directive.html',
          };
   
    };    
    angular.module(moduleName).directive(directiveName, directive);
})();
