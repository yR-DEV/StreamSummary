'use-strict';

angular.module('StreamSummaryApp').directive('channelsgraph', () => ({
      templateUrl: 'components/channelsgraph/channelsgraph.html',
      controller: 'ChannelsGraphController',
      controllerAs: 'channelsgraph'
}));
