'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminCustomersCtrl', function($scope, User, $timeout) {
    $scope.loading = true;

    User.query().$promise
      .then(users => {
        $scope.users = users;
        $scope.loading = false;
      });

    $scope.predicate = 'name';
	  $scope.reverse = true;
	  $scope.order = function(predicate) {
	    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	    $scope.predicate = predicate;
	  };

    // $scope.delete = function(user) {
    //   user.$remove();
    //   $scope.users.splice($scope.users.indexOf(user), 1);
    // }
  });