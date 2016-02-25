'use-strict';

class StreamersTableController {
  constructor($http, $interval, $timeout) {
    this.$http = $http;
    this.$interval = $interval;
    this.$timeout = $timeout;
    this.streamers =[];
    this.reqPost = { "filter": '' }

    this.getStreamerData = (queryFilter) => {
      this.reqPost.filter = queryFilter;
      $http.post('/api/streamerstats/getstreamers', this.reqPost).then(response => {
        setStreamer(response);
      });
    }

    let setStreamer = (res) => {
      this.streamers = res.data;
    }
    this.getStreamerData('followers');
  }
}


angular.module('StreamSummaryApp')
  .controller('StreamersTableController', StreamersTableController);
