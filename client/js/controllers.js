'use strict';

/* Controllers */
angular.module('angular-client-side-auth')
  .controller('SurveyController', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {

    // we will store all of our form data in this object
    $scope.survey = {};

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.image = null;
    $scope.imageFileName = "";

    $scope.image2 = null;
    $scope.imageFileName2 = "";

    $scope.imageQuestion = function () {
      console.log('got me a question title=%s fileName=%s image=%s', $scope.questionTitle, $scope.imageFileName, $scope.imageFileName2);
    }

  }]);

angular.module('angular-client-side-auth')
  .controller('QuestionController', ['$rootScope', '$scope', '$log', function ($rootScope, $scope, $log) {
    $scope.image = null;
    $scope.imageFileName = "";

    $scope.image2 = null;
    $scope.imageFileName2 = "";

    $scope.imageQuestion = function () {
      console.log('got me a question title=%s fileName=%s image=%s', $scope.questionTitle, $scope.imageFileName, $scope.imageFileName2);
    }
  }]);

angular.module('angular-client-side-auth')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function () {
      Auth.logout(function () {
        $location.path('/login');
      }, function () {
        $rootScope.error = "Failed to logout";
      });
    };
  }]);

angular.module('angular-client-side-auth')
  .controller('LoginCtrl',
  ['$rootScope', '$scope', '$location', '$window', 'Auth', function ($rootScope, $scope, $location, $window, Auth) {

    $scope.rememberme = true;
    $scope.login = function () {
      Auth.login({
          username: $scope.username,
          password: $scope.password,
          rememberme: $scope.rememberme
        },
        function (res) {
          $location.path('/');
        },
        function (err) {
          $rootScope.error = "Failed to login";
        });
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);

angular.module('angular-client-side-auth')
  .controller('RegisterCtrl',
  ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.register = function () {
      Auth.register({
          username: $scope.username,
          password: $scope.password,
          role: $scope.role
        },
        function () {
          $location.path('/');
        },
        function (err) {
          $rootScope.error = err;
        });
    };
  }]);

angular.module('angular-client-side-auth')
  .controller('AdminCtrl',
  ['$rootScope', '$scope', 'Users', 'Auth', function ($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Users.getAll(function (res) {
      $scope.users = res;
      $scope.loading = false;
    }, function (err) {
      $rootScope.error = "Failed to fetch users.";
      $scope.loading = false;
    });

  }]);

