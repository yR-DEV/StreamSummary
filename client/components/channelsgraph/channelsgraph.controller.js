'use-strict';

class ChannelsGraphController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        let ctx = document.getElementById("channelsGraph").getContext("2d");
        // let timeGraphQuery = {statType: 'channels', time: 'minute'}
        // let typeFilter = 'minute';
        let timeGraphQuery;
        let myLineChart;

        this.filterGraphByTime = (typeFilter) => {
            this.showGraph = true;
            this.notEnoughRecords = false;
            this.time = typeFilter;
            let typeAndTime = { statType: 'channels', time: typeFilter };
            timeGraphQuery = typeFilter;
            getGraphData(typeAndTime);
        }

        let dataTimer = () => {
            getGraphData(timeGraphQuery);
        }

        let getGraphData = (channelQuery) => {
            console.log(timeGraphQuery);
            $http.post('/api/stats/sortchannelstats', channelQuery).then(response => {
                if(response.data !== false) {
                    console.log(response);
                    this.showGraph = true;
                    setData(response);
                } else {
                    myLineChart.destroy();
                    this.notEnoughRecords = true;
                    this.showGraph = false;
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
            updateChannelsGraph(data)
        }

        let updateChannelsGraph = (graphData) => {
            if(!myLineChart) {
                myLineChart = new Chart(ctx).Line(graphData);
            } else {
                myLineChart.destroy();
                myLineChart = new Chart(ctx).Line(graphData);
            }
        }
        $interval(dataTimer, 60000);
    }
}


angular.module('StreamSummaryApp')
      .controller('ChannelsGraphController', ChannelsGraphController);
