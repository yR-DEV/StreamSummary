'use-strict';

angular.module('StreamSummaryApp').directive('averageviewergraphs', () => ({
    templateUrl: 'components/averageviewersgraphs/averageviewersgraphs.html' ,
    controller: 'AverageViewerGraphsController',
    controllerAs: 'averageviewergraphs'
}));
