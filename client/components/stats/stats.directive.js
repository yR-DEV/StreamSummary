'use-strict';

angular.module('StreamSummaryApp').directive('stats', () => ({
      templateUrl: 'components/stats/stats.html',
      controller: 'StatsController',
      controllerAs: 'stats'
}));
