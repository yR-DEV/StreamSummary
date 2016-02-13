'use-strict';

angular.module('StreamSummaryApp').directive('averagegraphs', () => ({
    templateUrl: 'components/averagegraphs/averagegraphs.html',
    controller: 'AverageGraphsController',
    controllerAs: 'averagegraphs'
}));
