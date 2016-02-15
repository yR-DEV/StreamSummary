'use-strict';

class ChannelsGraphController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        let ctx = document.getElementById("channelsGraph").getContext("2d");
        let initialRender = 0;

        this.filterGraphByTime = (typeFilter) => {
            let typeAndTime = { statType: 'channel', time: typeFilter };
            channelsGraphData(typeAndTime);
        }


        let channelsGraphData = (typeAndTime) => {
            console.log(typeAndTime);
            $http.post('/api/stats/averagestats', typeAndTime).then(response => {
                console.log(response);
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
                //setData(response, data)
            });
        };
        // let setData = (res, data) => {
        //     res.data.forEach(function(entry) {
        //         data.labels.push(entry.date);
        //         if(entry.channels == undefined || entry.channels == 0) {
        //             data.datasets[0].data.push(0)
        //         } else {
        //             data.datasets[0].data.push(entry.channels);
        //         }
        //     });
        //
        //     updateChannelsGraph(data);
        // };
        // let updateChannelsGraph = (data) => {
        //     let myLineChart = new Chart(ctx).Line(data);
        // }
        // if(initialRender === 0) {
        //     initialRender += 1;
        //     $timeout(channelsGraphData, 1000);
        //
        // }
        //
        // $interval(channelsGraphData, 60000);
    }
}

angular.module('StreamSummaryApp')
      .controller('ChannelsGraphController', ChannelsGraphController);
