'use-strict';

class ChannelsGraphController {
    constructor($http, $interval) {
        this.$http = $http;
        this.$interval = $interval;
        var ctx = document.getElementById("channelsGraph").getContext("2d");

        $http.get('/api/stats/graphstats').then(response => {
            //console.log(response.data);
            let data = {
                labels: [],
                datasets: [
                    {
                        label: "Live Channels",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: []
                    },
                ]
            };
            response.data.forEach(function(entry) {
                data.labels.push(entry.date);
                if(entry.channels == undefined || entry.channels == 0) {
                    data.datasets[0].data.push(0)
                } else {
                    data.datasets[0].data.push(entry.channels);
                }
                // if(entry.viewers == undefined || entry.viewers == 0) {
                //     data.datasets[1].data.push(0)
                // } else {
                //     data.datasets[1].data.push(entry.viewers);
                // }
            });
            //console.log(data);
            var myLineChart = new Chart(ctx).Line(data);
        });

        let updateChannelsGraph = (data) => {
            console.log(data);
            var myLineChart = new Chart(ctx).Line(data);
        }
    }
}

angular.module('StreamSummaryApp')
      .controller('ChannelsGraphController', ChannelsGraphController);
