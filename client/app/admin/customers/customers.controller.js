'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminCustomersCtrl', function($scope, User) {
    $scope.users = User.query();

    // $scope.delete = function(user) {
    //   user.$remove();
    //   $scope.users.splice($scope.users.indexOf(user), 1);
    // }
  });