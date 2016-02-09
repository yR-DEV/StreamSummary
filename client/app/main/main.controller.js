'use strict';

(function() {

class MainController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;

      }
}

angular.module('StreamSummaryApp')
      .controller('MainController', MainController);
      })();
