'use strict';

(function () {
  var module = angular.module('angular-client-side-auth', ['ngAnimate', 'ui.router', 'ngCookies', 'ui.bootstrap']);

  module.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/survey');

    $stateProvider
      // route to show our basic form (/form)
      .state('form', {
        url: '/survey',
        templateUrl: 'partials/survey',
        controller: 'SurveyController'
      })

      .state('form.details', {
        url: '/details',
        templateUrl: 'partials/survey-partials/page1'
      })

      .state('form.audience', {
        url: '/audience',
        templateUrl: 'partials/survey-partials/page2'
      })

      .state('form.activate', {
        url: '/activate',
        templateUrl: 'partials/survey-partials/page3'
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
