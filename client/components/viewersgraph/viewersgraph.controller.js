'use-strict';

class ViewersGraphController {

    constructor($http, $interval) {
        this.$http = $http;
        this.$interval = $interval;
        let initialRender = 0;
        let cty = document.getElementById('viewersGraph').getContext("2d");

        let viewersGraphData = () => {
            $http.get('/api/stats/graphstats').then(response => {
                console.log(response);
                let data = {
                    labels: [],
                    datasets: [
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
                setData(response, data);
            });
        }

        let setData = (res, data) => {
            res.data.forEach(function(entry) {
                data.labels.push(entry.date);
                if(entry.viewers == undefined || entry.viewers == 0) {
                    data.datasets[0].data.push(0)
                } else {
                    data.datasets[0].data.push(entry.viewers);
                }
            });
            updateViewersGraph(data);
        }

        let updateViewersGraph = (data) => {
            var myLineChart = new Chart(cty).Line(data);
        }

        if(initialRender === 0) {
            viewersGraphData();
            initialRender += 1;
        }
        $interval(viewersGraphData, 10000);
    }
}

angular.module('StreamSummaryApp')
    .controller('ViewersGraphController', ViewersGraphController);
