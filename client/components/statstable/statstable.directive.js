'use-strict';

angular.module('StreamSummaryApp').directive('statstable', () => ({
    templateUrl: 'components/statstable/statstable.html',
    controller: 'StatsTableController',
    controllerAs: 'statstable'
}));
