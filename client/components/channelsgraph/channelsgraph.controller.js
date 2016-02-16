'use-strict';

class ChannelsGraphController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        let ctm = document.getElementById("channelsGraphMinutes").getContext("2d");
        let timeGraphToggler;
        let myLineChart;
        let typeFilter;

        this.filterGraphByTime = (typeFilter) => {
            let typeAndTime = { statType: 'channel', time: typeFilter };
            timeGraphToggler = typeFilter;
            getGraphData(typeAndTime);
            this.notEnoughRecords = false;
        }

        let dataTimer = () => {
            getGraphData({ statType: 'channel', time: typeFilter })
        }

        let getGraphData = (channelQuery) => {
            console.log(timeGraphToggler);
            $http.post('/api/stats/sortchannelstats', channelQuery).then(response => {
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

        // function firstRender() {
        //     let executed = false;
        //     return function() {
        //         if(!executed) {
        //             console.log('FIRST RENDER');
        //             getGraphData({ statType: 'channel', time: 'minute' });
        //             executed = true;
        //         }
        //     }
        // }
        // if(counter === 0 || counter === 1) {
        //     let firstQuery = { statType: 'channel', time: 'minute' }
        //     getGraphData(firstQuery);
        // } else {
        //     console.log('out of the loop');
        // }
        // let firstQuery = { statType: 'channel', time: 'minute' }
        if(!typeFilter) {
            typeFilter = 'minute';
        }


        // $interval(setTheData, 5000);
    }
    //
}


angular.module('StreamSummaryApp')
      .controller('ChannelsGraphController', ChannelsGraphController);
