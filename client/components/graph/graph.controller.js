'use-strict';

class GraphController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;

            var ctx = document.getElementById("myChart").getContext("2d");
            //var myLineChart = new Chart(ctx).Line(data);

        //     var data = {
        //         labels: ["January", "February", "March", "April", "May", "June", "July"],
        //         datasets: [
        //             {
        //                 label: "My First dataset",
        //                 fillColor: "rgba(220,220,220,0.2)",
        //                 strokeColor: "rgba(220,220,220,1)",
        //                 pointColor: "rgba(220,220,220,1)",
        //                 pointStrokeColor: "#fff",
        //                 pointHighlightFill: "#fff",
        //                 pointHighlightStroke: "rgba(220,220,220,1)",
        //                 data: [65, 59, 60, 61, 56, 55, 40]
        //             },
        //             {
        //                 label: "My Second dataset",
        //                 fillColor: "rgba(151,187,205,0.2)",
        //                 strokeColor: "rgba(151,187,205,1)",
        //                 pointColor: "rgba(151,187,205,1)",
        //                 pointStrokeColor: "#fff",
        //                 pointHighlightFill: "#fff",
        //                 pointHighlightStroke: "rgba(151,187,205,1)",
        //                 data: [28, 48, 40, 19, 66, 27, 60]
        //             }
        //         ]
        // };
        // var myLineChart = new Chart(ctx).Line(data);

        $http.get('/api/stats/graphstats').then(response => {
            console.log(response.data);

            var data = {
                labels: [],
                datasets: [
                    {
                        label: "Live Channels",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: []
                    },
                    {
                        label: "Active Viewers",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: []
                    }
                ]
        };

            response.data.forEach(function(entry) {
                data.labels.push(entry.date);
                data.datasets[0].data.push(entry.channels);
                data.datasets[1].data.push(entry.viewers);
                console.log(entry);
            });

            var myLineChart = new Chart(ctx).Line(data);

        });
      }
}

angular.module('StreamSummaryApp')
      .controller('GraphController', GraphController);
