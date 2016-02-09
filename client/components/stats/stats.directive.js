'use-strict';

angular.module('streamSummaryApp').directive('stats', () => ({
      templateUrl: 'components/stats/stats.html',
      controller: 'StatsController',
      controllerAs: 'stats'
}));
