'use-strict';

class GraphController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;
            


      }
}

angular.module('StreamSummaryApp')
      .controller('GraphController', GraphController);
