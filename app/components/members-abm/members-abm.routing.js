//Routes
(function() {
    var moduleName = 'members-abm';

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('members', {
            url: '/members',
            // controller: 'QuestionnaireController',
            template: '<ui-view></ui-view>',
            abstract: true
        });
        
        $stateProvider.state('members.search', {
            url: '/search',
            templateUrl: 'app/components/members-abm/templates/members-abm.search.view.html',
            controller: 'membersSearchController'
        });
        
        $stateProvider.state("members.deletedModal", {
            url: "/deleted",
            onEnter: ['$modal', function ($uibModal) {
                $uibModal.open({
                    templateUrl: "app/components/members-abm/templates/members-abm.deleted.modal.view.html",
                    controller: "membersDeletedModal",
                    backdrop: 'static'
                });
            }]
        });
        
        $stateProvider.state('members.abm', {
            url: '/:id',
            templateUrl: 'app/components/members-abm/templates/members-abm.abm.view.html',
            controller: 'membersAbmController',
            params: {
                edit: false
            },
        });
        



    }
    angular.module(moduleName).config(config);
})();

/*
    .when("/", {
        templateUrl: 'app/components/home/homeView.html',
        controller: 'homeController'
    })
    .when("/members/search", {
        templateUrl: 'app/components/membersSearch/membersSearchView.html',
        controller: 'membersSearchController'
      })
   .when("/books/search", {
        templateUrl: 'app/components/booksSearch/booksSearchView.html',
        controller: 'booksSearchController'
    })
     .when("/books/:id", {
        templateUrl: 'app/components/booksEdit/booksEditView.html',
        controller: 'booksEditController'
    })
     .when("/books/:id/:editmode", {
        templateUrl: 'app/components/booksEdit/booksEditView.html',
        controller: 'booksEditController'
    })
    .when("/members/new", {
        templateUrl: 'app/components/membersNew/membersNewView.html',
        controller: 'membersNewController'
    })
    .when("/members/:id", {
        templateUrl: 'app/components/membersEdit/membersEditView.html',
        controller: 'membersEditController'
    })
    .when("/members/:id/:editmode", {
        templateUrl: 'app/components/membersEdit/membersEditView.html',
        controller: 'membersEditController'
    })
}]);
*/