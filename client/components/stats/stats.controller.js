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

            let getLastUpdateDate = () => {
                $http.get('/api/stats/lastentry').then(response => {
                    setTickDate(response);
                });
            }
            let setTickDate = (tick) => {
                this.statDate = tick.data[0].date;
                this.stats.channels = tick.data[0].channels;
                this.stats.viewers = tick.data[0].viewers;
            }
            getLastUpdateDate();
            $interval(getLastUpdateDate, 60000);
      }
}

angular.module('StreamSummaryApp')
      .controller('StatsController', StatsController);
