'use-strict';

class GraphController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;

            var ctx = document.getElementById("myChart").getContext("2d");
            //var myLineChart = new Chart(ctx).Line(data);

            var data = {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 60, 61, 56, 55, 40, 10, 20, 34, 23, 56]
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 66, 27, 60, 43, 54, 23, 14, 64]
                    }
                ]
        };
        var myLineChart = new Chart(ctx).Line(data);
      }
}

angular.module('StreamSummaryApp')
      .controller('GraphController', GraphController);
