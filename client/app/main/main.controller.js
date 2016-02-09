'use strict';

(function() {

class MainController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;

            this.statDate = new Date();
            console.log(this.statDate);
            //function updateStats() {
            //setInterval(function() {
                  // $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
                  //       this.stats = response.data;
                  //       console.log('stats updated');
                  // });
            //}, 5000);
            //}
            //function updateStats(){
            $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
                  this.stats = {};
                  console.log(response.data);
                  this.stats.channels = response.data.channels;
                  this.stats.viewers = response.data.viewers;
                  this.stats.date = this.statDate;
                  console.log('stats updated');

                  $http.post('/api/stats/logstats', this.stats).then(response => {
                        console.log('*** POST RESPONSE *****');
                        console.log(response);
                  })
            });
            //}

            console.log('inside constructor');
      }

      // $interval(function() {
      //       let newStats = updateStats();
      //       console.log(newStats);
      // }, 10000);

}

angular.module('streamSummaryApp')
.controller('MainController', MainController);
})();
