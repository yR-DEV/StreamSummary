'use strict';

angular.module('StreamSummaryApp', [
  'streamSummaryApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);



  });
