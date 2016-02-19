'use-strict';

class ViewersGraphController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;

        let ctx = document.getElementById('viewersGraph').getContext("2d");
        let typeAndTime = { statType: 'viewers', time: '' };
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
            getGraphData(typeAndTime);
        }

        let dataTimer = () => {
            console.log('viewer tick');
            getGraphData(typeAndTime);
        }

        let getGraphData = (viewersQuery) => {
            $http.post('/api/summarystats/viewerstats', viewersQuery).then(response => {
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

        if(!typeFilter) {
            typeFilter = 'minute';
            this.filterGraphByTime(typeFilter);
        }
        $interval(dataTimer, 60000);

    }
}

angular.module('StreamSummaryApp')
    .controller('ViewersGraphController', ViewersGraphController);
