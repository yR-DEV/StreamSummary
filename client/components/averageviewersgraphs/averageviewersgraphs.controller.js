'use-strict';

class AverageViewerGraphsController {
    constructor($http, $interval) {
        this.$http = $http;
        this.$interval = $interval;

        let ctx1 = document.getElementById('firstQuarterViewerAverages').getContext('2d');
        let ctx2 = document.getElementById('secondQuarterViewerAverages').getContext('2d');
        let ctx3 = document.getElementById('thirdQuarterViewerAverages').getContext('2d');
        let ctx4 = document.getElementById('fourthQuarterViewerAverages').getContext('2d');

        let getAverageViewerStats = () => {
            $http.get('/api/stats/averageviewerstats').then(response => {
                console.log(response.data[0].firstquarter);

                let dataFirstQuarter = data1;
                let dataSecondQuarter = data2;
                let dataThirdQuarter = data3;
                let dataFourthQuarter = data4;

                // for(var i = 0; i <= response.data[0].firstquarter.length; i++) {
                //     console.log(response.data[0].firstquarter[i]);
                // }
                response.data[0].firstquarter.forEach(function(hour, i) {
                    dataFirstQuarter.labels.push(hour.hour + ":00");
                    dataFirstQuarter.datasets[0].data.push(hour.viewers);
                });
                response.data[0].secondquarter.forEach(function(hour, i) {
                    dataSecondQuarter.labels.push(hour.hour + ":00");
                    dataSecondQuarter.datasets[0].data.push(hour.viewers);
                });
                response.data[0].thirdquarter.forEach(function(hour, i) {
                    dataThirdQuarter.labels.push(hour.hour + ":00");
                    dataThirdQuarter.datasets[0].data.push(hour.viewers);
                });
                response.data[0].fourthquarter.forEach(function(hour, i) {
                    dataFourthQuarter.labels.push(hour.hour + ":00");
                    dataFourthQuarter.datasets[0].data.push(hour.viewers);
                });

                console.log(dataFirstQuarter);





                let firstQuarterViewerAveragesGraph = new Chart(ctx1).Line(dataFirstQuarter);
                let secondQuarterViewerAveragesGraph = new Chart(ctx2).Line(dataSecondQuarter);
                let thirdQuarterViewerAveragesGraph = new Chart(ctx3).Line(dataThirdQuarter);
                let fourthQuarterViewerAveragesGraph = new Chart(ctx4).Line(dataFourthQuarter);
            });
        }

        getAverageViewerStats();



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
    .controller('AverageViewerGraphsController', AverageViewerGraphsController);
