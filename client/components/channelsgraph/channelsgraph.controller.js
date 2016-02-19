'use-strict';

class ChannelsGraphController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;

        let ctx = document.getElementById("channelsGraph").getContext("2d");
        let typeAndTime = { statType: 'channels', time: '' };
        let typeFilter;
        let myLineChart;

        this.filterGraphByTime = (typeFilter) => {
            //setting scope data
            this.showGraph = true;
            this.notEnoughRecords = false;
            if(typeFilter !== 'minute') {
                this.time = 'averaged ' + typeFilter + 's';
            } else {
                this.time = 'minutes';
            }

            //setting query data
            typeAndTime.time = typeFilter;
            let timeGraphQuery = typeFilter;
            getGraphData(typeAndTime);
        }

        let dataTimer = () => {
            getGraphData(typeAndTime);
        }

        let getGraphData = (channelQuery) => {
            $http.post('/api/summarystats/channelstats', channelQuery).then(response => {
                if(response.data.false !== false) {
                    this.showGraph = true;
                    setData(response);
                } else {
                    console.log(response);
                    if(myLineChart) {
                        myLineChart.destroy();
                    }
                    this.notEnoughRecords = true;
                    this.showGraph = false;
                }
            });
        };

        let setData = (res) => {
            let graphData = {
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
                graphData.labels.push(sortedEntry.date)
                if(sortedEntry.channels == undefined || sortedEntry.channels == 0) {
                    graphData.datasets[0].data.push(0)
                } else {
                    graphData.datasets[0].data.push(sortedEntry.channels);
                }
            })
            updateChannelsGraph(graphData);
        }

        let updateChannelsGraph = (graphData) => {
            if(!myLineChart) {
                myLineChart = new Chart(ctx).Line(graphData);
            } else {
                myLineChart.destroy();
                myLineChart = new Chart(ctx).Line(graphData);
            }
        }
        if(!typeFilter) {
            typeFilter = 'minute';
        }

        this.filterGraphByTime(typeFilter);

        $interval(dataTimer, 60000);
    }
}


angular.module('StreamSummaryApp')
      .controller('ChannelsGraphController', ChannelsGraphController);
