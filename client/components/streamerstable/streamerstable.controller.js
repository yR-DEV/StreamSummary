'use-strict';

class StreamersTableController {
  constructor($http, $interval, $timeout) {
    this.$http = $http;
    this.$interval = $interval;
    this.$timeout = $timeout;
    this.streamers =[];
    this.streamerReq = { "filter": 'followers' }

    this.setNewFilter = (query) => {
      this.streamerReq.filter = query;
    }

    this.getStreamerData = () => {
      $http.post('/api/streamerstats/getstreamers', this.streamerReq).then(response => {
        this.streamers = response.data;
      });
    }
    this.getStreamerData(this.streamerReq);
    this.$timeout(this.getStreamerData, 6000)
  }
}


angular.module('StreamSummaryApp')
  .controller('StreamersTableController', StreamersTableController);
