describe('homepage', function () {

  beforeEach(module('bookstoreE2E'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('uppercase', function () {
		it('1 + 1 should equal 2', function () {
			var $scope = {};
			var controller = $controller('homeController', { $scope: $scope });
			$scope.username = "Juan";
            var upperUsername = $scope.userUppercase($scope.username);
			expect(upperUsername).toBe("JUAN");
		});	
	});

});

