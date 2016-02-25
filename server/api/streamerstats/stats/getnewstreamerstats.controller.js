'use-strict';

import https from 'https';
import fs from 'fs';
import dateformat from 'dateformat';
import { sortStreamerStats } from './sortstreamerstats.controller';

let options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams',
    method: 'GET',
    headers: {
      ClientID: process.env.TWITCH_CLIENT_ID,
      accept: 'application/json'
    }
};

export function getNewStreamerStats() {
  https.get(options, function(res) {
      let bodyChunks = [];
      res.on('data', function(chunk) {
          bodyChunks.push(chunk);
      }).on('end', function() {
          let body = Buffer.concat(bodyChunks);
          body = JSON.parse(body);
          if (body === undefined || body.channel === undefined || !body) {
            setTimeout(getNewStreamerStats, 5000);
          }
          console.log(body);
          sortStreamerStats(body);
      })
  }).on('error', function(e) {
      console.log('ERROR: ' + e);
  });
}

setInterval(getNewStreamerStats, 10000);
