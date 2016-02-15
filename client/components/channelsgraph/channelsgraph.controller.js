'use-strict';

class ChannelsGraphController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        let ctm = document.getElementById("channelsGraphMinutes").getContext("2d");
        let timeGraphToggler;
        let myLineChart;
        let counter = 0;

        this.filterGraphByTime = (typeFilter) => {
            let typeAndTime = { statType: 'channel', time: typeFilter };
            timeGraphToggler = typeFilter;
            getGraphData(typeAndTime);
            this.notEnoughRecords = false;
        }

        let getGraphData = (query) => {
            $http.post('/api/stats/sortchannelstats', query).then(response => {
                if(response.data !== false) {
                    console.log(response);
                    setData(response);
                } else {
                    this.notEnoughRecords = true;
                }
            });
        };

        let setData = (res) => {
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
            res.data.forEach(function(sortedEntry) {
                data.labels.push(sortedEntry.date)
                if(sortedEntry.channels == undefined || sortedEntry.channels == 0) {
                    data.datasets[0].data.push(0)
                } else {
                    data.datasets[0].data.push(sortedEntry.channels);
                }
            })
            console.log(data);
            updateChannelsGraph(data)
        }

        let updateChannelsGraph = (graphData) => {
            if(!myLineChart) {
                myLineChart = new Chart(ctm).Line(graphData);
            } else {
                myLineChart.destroy();
                myLineChart = new Chart(ctm).Line(graphData);
            }
        }

        if(!timeGraphToggler) {
            console.log('NO TOGGLER');
            getGraphData({ statType: 'channel', time: 'minutes' });
        }
        $interval(getGraphData(timeGraphToggler), 3000);
    }
    //
}


angular.module('StreamSummaryApp')
      .controller('ChannelsGraphController', ChannelsGraphController);
