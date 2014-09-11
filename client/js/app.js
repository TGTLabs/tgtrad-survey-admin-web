'use strict';

(function () {
  var module = angular.module('angular-client-side-auth', ['ngAnimate', 'ui.router', 'ngCookies', 'ui.bootstrap']);

  module.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/survey');

    $stateProvider
      // route to show our basic form (/form)
      .state('form', {
        url: '/survey',
        templateUrl: 'partials/surveyHome',
        controller: 'SurveyController'
      })

      .state('form.details', {
        url: '/details',
        templateUrl: 'partials/survey/details'
      })

      .state('form.audience', {
        url: '/audience',
        templateUrl: 'partials/survey/audience'
      })

      .state('form.questions', {
        url: '/questions',
        templateUrl: 'partials/survey/questions'
      })

      .state('form.activate', {
        url: '/activate',
        templateUrl: 'partials/survey/activate'
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
