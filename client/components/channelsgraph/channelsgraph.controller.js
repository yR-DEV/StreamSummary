'use-strict';

class ChannelsGraphController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        let ctx = document.getElementById("channelsGraph").getContext("2d");
        let typeFilter = 'minute';
        let myLineChart;

        this.filterGraphByTime = (typeFilter) => {
            this.showGraph = true;
            this.notEnoughRecords = false;
            this.time = typeFilter;
            let typeAndTime = { statType: 'channels', time: typeFilter };
            let timeGraphQuery = typeFilter;
            getGraphData(typeAndTime);
        }

        let dataTimer = () => {
            getGraphData(timeGraphQuery);
        }

        let getGraphData = (channelQuery) => {
            $http.post('/api/summarystats/getchannelstats', channelQuery).then(response => {
                console.log(response);
                if(response.data !== false) {
                    console.log(response);
                    this.showGraph = true;
                    setData(response);
                } else {
                    if(myLineChart) {
                        myLineChart.destroy();
                    }
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
        this.filterGraphByTime(typeFilter);

        $interval(dataTimer, 60000);
    }
}


angular.module('StreamSummaryApp')
      .controller('ChannelsGraphController', ChannelsGraphController);
