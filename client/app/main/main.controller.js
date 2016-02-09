'use strict';

(function() {

class MainController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;

            //function updateStats() {
                  $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
                        this.stats = response.data;
                        console.log('stats updated');
                  });
            //}

            console.log('inside constructor');

            this.statDate = new Date();
            console.log(this.statDate);
      }
}

angular.module('streamSummaryApp')
.controller('MainController', MainController);
})();
