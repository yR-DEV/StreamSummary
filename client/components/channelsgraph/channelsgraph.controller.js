'use-strict';

class ChannelsGraphController {
    constructor($http, $interval) {
        this.$http = $http;
        this.$interval = $interval;
        let ctx = document.getElementById("channelsGraph").getContext("2d");
        let initialRender = 0;

        let channelsGraphData = () => {
            $http.get('/api/stats/graphstats').then(response => {
                //console.log(response.data);
                let data = {
                    labels: [],
                    datasets: [
                        {
                            label: "Live Channels",
                            fillColor: "rgba(187,119,209,0.2)",
                            strokeColor: "rgba(187,119,209,1)",
                            pointColor: "rgba(187,119,209,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: []
                        },
                    ]
                };
                setData(response, data)
            });
        };
        let setData = (res, data) => {
            res.data.forEach(function(entry) {
                data.labels.push(entry.date);
                if(entry.channels == undefined || entry.channels == 0) {
                    data.datasets[0].data.push(0)
                } else {
                    data.datasets[0].data.push(entry.channels);
                }
            });

            updateChannelsGraph(data);
        };
        let updateChannelsGraph = (data) => {
            let myLineChart = new Chart(ctx).Line(data);
        }
        if(initialRender === 0) {
            initialRender += 1;
            channelsGraphData();
        }
        $interval(channelsGraphData, 60000);
    }
}

angular.module('StreamSummaryApp')
      .controller('ChannelsGraphController', ChannelsGraphController);
