'use-strict';

class ViewersGraphController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        let ctx = document.getElementById('viewersGraph').getContext("2d");
        // let timeGraphQuery = {statType: 'viewers', time: 'minute'}
        // let typeFilter = 'minute';
        let timeGraphQuery;
        let myLineChart;

        this.filterGraphByTime = (typeFilter) => {
            this.showGraph = true;
            this.notEnoughRecords = false;
            this.time = typeFilter;
            let typeAndTime = { statType: 'viewers', time: typeFilter };
            timeGraphQuery = typeFilter;
            getGraphData(typeAndTime);
        }

        let dataTimer = () => {
            getGraphData(timeGraphQuery);
        }

        let getGraphData = (viewersQuery) => {
            $http.post('/api/stats/sortviewerstats', viewersQuery).then(response => {
                console.log(response);
                if(response.data !== false) {
                    this.showGraph = true;
                    setData(response);
                } else {
                    if(myLineChart) {
                        myLineChart.destroy();
                    }
                    this.notEnoughRecords = true;
                    this.showGraph = false;
                }
            })
        }

        let setData = (res) => {
            let data = {
                labels: [],
                datasets: [
                    {
                        label: "Active Viewers",
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
                if(sortedEntry.viewers == undefined || sortedEntry.viewers == 0) {
                    data.datasets[0].data.push(0)
                } else {
                    data.datasets[0].data.push(sortedEntry.viewers);
                }
            })
            updateViewersGraph(data);
        }

        let updateViewersGraph = (graphData) => {
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
    .controller('ViewersGraphController', ViewersGraphController);
