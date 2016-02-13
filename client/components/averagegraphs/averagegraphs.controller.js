'use-strict';


class AverageGraphsController {
    constructor($http, $interval, $timeout) {
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.showGraphs = false;
        let initialRender = 0;
        let ctx1 = document.getElementById('firstHalfAverages').getContext('2d');
        let ctx2 = document.getElementById('secondHalfAverages').getContext('2d');

        let getAverageStats = () => {
            $http.get('/api/stats/averagestats').then(response => {

                let dataFirstHalf = data1;
                let dataSecondHalf = data2;

                setData(response, dataFirstHalf, dataSecondHalf);
            })
        }

        let setData = (res, d1q, d2q) => {
            d1q.labels = [];
            d1q.datasets[0].data = [];
            d2q.labels = [];
            d2q.datasets[0].data = [];

            res.data[0].firsthalf.forEach(function(hour) {
                d1q.labels.push(hour.hour + ":00");
                d1q.datasets[0].data.push(hour.channels);
            })
            res.data[0].secondhalf.forEach(function(hour) {
                d2q.labels.push(hour.hour + ":00");
                d2q.datasets[0].data.push(hour.channels);
            })

            renderGraphs(d1q, d2q);
        }

        let renderGraphs = (d1, d2) => {
            var firstHalfAverages = new Chart(ctx1).Line(d1);
            var secondHalfAverages = new Chart(ctx2).Line(d2);
        }

        this.toggleChannelAverageGraphs = () => {
            if(this.showGraphs === true) {
                this.showGraphs = false;
                initialRender = 0;
            } else {
                if(initialRender === 0) {
                    initialRender =+ 1;
                    $timeout(getAverageStats, 1500);
                }
                $interval(getAverageStats, 63000);
                this.showGraphs = true;
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
    .controller('AverageGraphsController', AverageGraphsController);
