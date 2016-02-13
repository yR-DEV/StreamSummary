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
                            fillColor: "rgba(187,119,209,0.2)",
                            strokeColor: "rgba(187,119,209,1)",
                            pointColor: "rgba(187,119,209,0.75)",
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
            let myLineChart = new Chart(cty).Line(data);
        }
        if(initialRender === 0) {
            initialRender += 1;
            viewersGraphData();
        }
        $interval(viewersGraphData, 60000);
    }
}

angular.module('StreamSummaryApp')
    .controller('ViewersGraphController', ViewersGraphController);
