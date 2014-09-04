'use strict';

(function () {
  var module = angular.module('angular-client-side-auth', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

  module.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/survey', {
          templateUrl: 'partials/survey',
          controller: 'SurveyController'
        }).
        when('/survey/imageQuestion', {
          templateUrl: 'partials/imageQuestion',
          controller: 'QuestionController'
        }).
        otherwise({
//          redirectTo: '/survey'
          redirectTo: '/'
        });
    }]);
}());