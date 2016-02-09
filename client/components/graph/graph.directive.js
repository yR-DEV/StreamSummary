'use-strict';

angular.module('StreamSummaryApp').directive('graph', () => ({
      templateUrl: 'components/graph/graph.html',
      controller: 'GraphController',
      controllerAs: 'graph'
}));
