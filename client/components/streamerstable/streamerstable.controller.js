'use-strict';

class StreamersTableController {
  constructor($http, $interval, $timeout) {
    this.$http = $http;
    this.$interval = $interval;
    this.$timeout = $timeout;
    this.streamers =[];
    this.lol = 'asdfasdf';

    this.getStreamerData = () => {
      $http.get('/api/streamerstats/getstreamers').then(response => {
        console.log(response);
        setStreamer(response);
      });
    }

    let setStreamer = (res) => {
      this.streamers = res.data;
    }
    this.getStreamerData();
  }
}


angular.module('StreamSummaryApp')
  .controller('StreamersTableController', StreamersTableController);
