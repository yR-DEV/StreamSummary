'use-strict';

class StatsTableController {
    constructor($http, $interval) {
        this.$http = $http;
        this.$interval = $interval;
        let stats = [];
        let initialRender = 0;

        let updateStatsTable = () => {
            stats = [];
            $http.get('/api/summarystats/statstable').then(response => {
                response.data.forEach(function(tick) {
                    stats.push({date: tick.date,
                        channels: tick.channels,
                        viewers: tick.viewers
                    });
                    setTableData(stats);
                });
            });
        }
        let setTableData = (stats) => {
            this.stats = stats;
        }
        if(initialRender === 0) {
            initialRender += 1;
            updateStatsTable();
        }
        $interval(updateStatsTable, 60000);
    }
}

angular.module("StreamSummaryApp")
    .controller('StatsTableController', StatsTableController);
