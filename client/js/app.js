'use strict';
//
//(function () {
//  var module = angular.module('angular-client-side-auth', ['ngRoute', 'ngCookies', 'ui.bootstrap']);
//
//  module.config(['$routeProvider',
//    function($routeProvider) {
//      $routeProvider.
//        when('/survey', {
//          templateUrl: 'partials/survey',
//          controller: 'SurveyController'
//        }).
//        when('/survey/imageQuestion', {
//          templateUrl: 'partials/imageQuestion',
//          controller: 'QuestionController'
//        }).
//        otherwise({
////          redirectTo: '/survey'
//          redirectTo: '/'
//        });
//    }]);
//}());

(function () {
  var module = angular.module('angular-client-side-auth', ['ui.router', 'ngCookies', 'ui.bootstrap']);

  module.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/survey');

    $stateProvider
      .state('survey', {
        url: '/survey',
        templateUrl: 'partials/survey',
        controller: 'SurveyController'
      })

      .state('question', {
        url: '/survey/imageQuestion',
        templateUrl: 'partials/imageQuestion',
        controller: 'QuestionController'
      })

      .state('about', {
        // we'll get to this in a bit
      });

  });

}());
