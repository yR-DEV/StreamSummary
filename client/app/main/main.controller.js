'use strict';

(function() {

class MainController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;
            var self = this;
            this.stats = {};

            this.statDate = new Date();
            console.log(this.statDate);

            var update = () => {
                  $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
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
            }


            $interval(update, 5000);

            console.log('inside constructor');
      }

}

angular.module('streamSummaryApp')
.controller('MainController', MainController);
})();
