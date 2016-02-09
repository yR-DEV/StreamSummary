'use-strict';

class StatsController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;
            this.stats = {};
            var initialGet = 0;

            this.statDate = new Date();

            var update = () => {
                  $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
                        //making an object so I dont have the kraken link in every single object stored in the db
                        this.stats.channels = response.data.channels;
                        this.stats.viewers = response.data.viewers;
                        this.stats.date = this.statDate;
                        //posting the statistics to the backend where they will be inserted into mongo
                        $http.post('/api/stats/logstats', this.stats).then(response => {
                              console.log('*** POST RESPONSE *****');
                              console.log(response);
                        })
                  });
            }
            //needed a function to initially use an http.get
            //because timer will be set to ~30 mins?
            if(initialGet === 0) {
                  update();
                  initialGet += 1;
            }
            $interval(update, 10000);
      }

}

angular.module('StreamSummaryApp')
      .controller('StatsController', StatsController);
