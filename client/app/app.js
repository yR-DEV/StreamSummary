'use strict';

angular.module('streamSummaryApp', [
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
