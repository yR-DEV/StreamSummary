'use-strict';

class AverageGraphsController {
    constructor($http, $interval) {
        this.$http = $http;
        this.$interval = $interval;
        let initialRender = 0;
        let ctx1 = document.getElementById('firstQuarterAverages').getContext('2d');
        let ctx2 = document.getElementById('secondQuarterAverages').getContext('2d');
        let ctx3 = document.getElementById('thirdQuarterAverages').getContext('2d');
        let ctx4 = document.getElementById('fourthQuarterAverages').getContext('2d');

        let getAverageStats = () => {
            $http.get('/api/stats/averagestats').then(response => {

                let dataFirstQuarter = data1;
                let dataSecondQuarter = data2;
                let dataThirdQuarter = data3;
                let dataFourthQuarter = data4;

                setData(response, dataFirstQuarter, dataSecondQuarter, dataThirdQuarter, dataFourthQuarter);
            })
        }

        let setData = (res, d1q, d2q, d3q, d4q) => {
            res.data[0].firstquarter.forEach(function(hour) {
                d1q.labels.push(hour.hour + ":00");
                d1q.datasets[0].data.push(hour.channels);
            })
            res.data[0].secondquarter.forEach(function(hour) {
                d2q.labels.push(hour.hour + ":00");
                d2q.datasets[0].data.push(hour.channels);
            })
            res.data[0].thirdquarter.forEach(function(hour) {
                d3q.labels.push(hour.hour + ":00");
                d3q.datasets[0].data.push(hour.channels);
            })
            res.data[0].fourthquarter.forEach(function(hour) {
                d4q.labels.push(hour.hour + ":00")
                d4q.datasets[0].data.push(hour.channels);
            })

            renderGraphs(d1q, d2q, d3q, d4q);
        }

        let renderGraphs = (d1, d2, d3, d4) => {
            var firstQuarterAverages = new Chart(ctx1).Line(d1);
            var secondQuarterAverages = new Chart(ctx2).Line(d2);
            var thirdQuarterAverages = new Chart(ctx3).Line(d3);
            var fourthQuarterAverages = new Chart(ctx4).Line(d4);
        }

        if(initialRender === 0) {
            initialRender =+ 1;
            getAverageStats();
        }
        $interval(getAverageStats, 65000);




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
        let data3 = {
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
        let data4 = {
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
