'use-strict';

class StatsController {

      //controller constructor
      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;
            this.stats = {};
            let initialGet = 0;
            let initialDateGet = 0;
            this.statDate;
            //function to call on the twitch api summary.
            //also includes the post that will send each api call data to the back end
            let query = () => {
                  $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
                        this.stats.channels = response.data.channels;
                        this.stats.viewers = response.data.viewers;
                  });
            }
            //needed a function to initially use an http.get
            //because timer will be set to ~30 mins?
            if(initialGet === 0) {
                  query();
                  initialGet += 1;
            }
            $interval(query, 35000);

            let getLastUpdateDate = () => {
                $http.get('/api/stats/lastentry').then(response => {
                    setTickDate(response);
                });
            }
            let setTickDate = (tick) => {
                this.statDate = tick.data[0].date;
            }

            getLastUpdateDate();
            $interval(getLastUpdateDate, 30000);
      }
}

angular.module('StreamSummaryApp')
      .controller('StatsController', StatsController);
