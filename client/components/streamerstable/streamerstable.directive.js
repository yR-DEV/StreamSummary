'use-strict';

angular.module('StreamSummaryApp').directive('streamerstable', () => ({
  templateUrl: 'components/streamerstable/streamerstable.html',
  controller: 'StreamersTableController',
  controllerAs: 'streamerstable'
}));
