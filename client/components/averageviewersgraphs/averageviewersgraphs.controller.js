'use-strict';

class AverageViewerGraphsController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.showGraphs = false;

        let initialRender = 0;
        let ctx1 = document.getElementById('firstQuarterViewerAverages').getContext('2d');
        let ctx2 = document.getElementById('secondQuarterViewerAverages').getContext('2d');

        let getAverageViewerStats = () => {
            $http.get('/api/stats/averageviewerstats').then(response => {
                console.log(response.data[0].firstquarter);

                let dataFirstQuarter = data1;
                let dataSecondQuarter = data2;

                setData(response, dataFirstQuarter, dataSecondQuarter);
            });
        }

        let setData = (res, d1q, d2q) => {
            d1q.labels = [];
            d1q.datasets[0].data = [];
            d2q.labels = [];
            d2q.datasets[0].data = [];


            res.data[0].firstquarter.forEach(function(hour, i) {
                d1q.labels.push(hour.hour + ":00");
                d1q.datasets[0].data.push(hour.viewers);
            });
            res.data[0].secondquarter.forEach(function(hour, i) {
                d1q.labels.push(hour.hour + ":00");
                d1q.datasets[0].data.push(hour.viewers);
            });
            res.data[0].thirdquarter.forEach(function(hour, i) {
                d2q.labels.push(hour.hour + ":00");
                d2q.datasets[0].data.push(hour.viewers);
            });
            res.data[0].fourthquarter.forEach(function(hour, i) {
                d2q.labels.push(hour.hour + ":00");
                d2q.datasets[0].data.push(hour.viewers);
            });
            renderGraphs(d1q, d2q);
        }

        let renderGraphs = (d1, d2) => {
            let firstQuarterViewerAveragesGraph = new Chart(ctx1).Line(d1);
            let secondQuarterViewerAveragesGraph = new Chart(ctx2).Line(d2);
        }


        this.toggleViewerAverageGraphs = () => {
            if(this.showGraphs === false) {
                this.showGraphs = true;
                if(initialRender === 0) {
                    initialRender += 1;
                    $timeout(getAverageViewerStats, 1500);
                }
                $interval(getAverageViewerStats, 63000);
            } else {
                initialRender = 0;
                this.showGraphs = false;
            }
        }

        let data1 = {
            labels: [],
            datasets: [
                {
                    label: "Live Channels",
                    fillColor: "rgba(187,119,209,0.2)",
                    strokeColor: "rgba(187,119,209,1)",
                    pointColor: "rgba(187,119,209,0.75)",
                    pointColor: "rgba(187,119,209,0.75)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: []
                },
            ]
        }
        let data2 = {
            labels: [],
            datasets: [
                {
                    label: "Live Channels",
                    fillColor: "rgba(187,119,209,0.2)",
                    strokeColor: "rgba(187,119,209,1)",
                    pointColor: "rgba(187,119,209,0.75)",
                    pointColor: "rgba(187,119,209,0.75)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: []
                },
            ]
        }
    }
}

angular.module('StreamSummaryApp')
    .controller('AverageViewerGraphsController', AverageViewerGraphsController);
