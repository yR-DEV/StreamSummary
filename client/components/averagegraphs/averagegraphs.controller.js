'use-strict';

class AverageGraphsController {
    constructor($http, $interval) {
        this.$http = $http;
        this.$interval = $interval;
        let ctx1 = document.getElementById('firstQuarterAverages').getContext('2d');
        let ctx2 = document.getElementById('secondQuarterAverages').getContext('2d');
        let ctx3 = document.getElementById('thirdQuarterAverages').getContext('2d');
        let ctx4 = document.getElementById('fourthQuarterAverages').getContext('2d');

    }
}

angular.module('StreamSummaryApp')
    .controller('AverageGraphsController', AverageGraphsController);
