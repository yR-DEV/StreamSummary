'use-strict';

angular.module('StreamSummaryApp').directive('viewersgraph', () => ({
    templateUrl: 'components/viewersgraph/viewersgraph.html',
    controller: 'ViewersGraphController',
    controllasAs: 'viewersgraph'
}));
