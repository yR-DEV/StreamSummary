'use strict';

(function() {

class MainController {

      constructor($http) {
            this.$http = $http;
            //this.awesomeThings = [];

            $http.get('https://api.twitch.tv/kraken/streams/summary').then(response => {
                  this.stats = response.data;
            });

            this.statDate = New Date();
            console.log(this.statDate);

      }


  // addThing() {
  //   if (this.newThing) {
  //     this.$http.post('/api/things', { name: this.newThing });
  //     this.newThing = '';
  //   }
  // }
  //
  // deleteThing(thing) {
  //   this.$http.delete('/api/things/' + thing._id);
  // }

}

angular.module('streamSummaryApp')
      .controller('MainController', MainController);

})();
