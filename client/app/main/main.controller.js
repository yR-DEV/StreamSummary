'use strict';

(function() {

class MainController {

      constructor($http, $interval) {
            this.$http = $http;
            this.$interval = $interval;

            //function updateStats() {
            //setInterval(function() {
                  // $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
                  //       this.stats = response.data;
                  //       console.log('stats updated');
                  // });
            //}, 5000);
            //}
            //function updateStats(){
            $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
                  //this.stats = response.data;
                  console.log(response.data);
                  this.stats = response.data;
                  console.log('stats updated');
            });
            //}

            console.log('inside constructor');

            this.statDate = new Date();
            console.log(this.statDate);
      }

      // $interval(function() {
      //       let newStats = updateStats();
      //       console.log(newStats);
      // }, 10000);

}

angular.module('streamSummaryApp')
.controller('MainController', MainController);
})();
