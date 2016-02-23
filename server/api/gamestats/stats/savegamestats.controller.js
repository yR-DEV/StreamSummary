'use-strict';

import https from 'https';
import fs from 'fs';
import dateformat from 'dateformat';

let options = {
    host: 'api.twitch.tv',
    path: '/kraken/games/top',
    method: 'GET',
    headers: {
      ClientID: process.env.TWITCH_CLIENT_ID,
      accept: 'application/json'
    }
};

export function getGameStats() {
  https.get(options, function(res) {
    // console.log(options);
      let bodyChunks = [];
      res.on('data', function(chunk) {
          bodyChunks.push(chunk);
      }).on('end', function() {
          let body = Buffer.concat(bodyChunks);
          body = JSON.parse(body);
          // console.log('saving parsed json');
          // console.log(body.top);
      })
  }).on('error', function(e) {
      console.log('ERROR: ' + e);
  });
}
