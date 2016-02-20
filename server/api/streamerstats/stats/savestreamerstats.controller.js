'use-strict';

import https from 'https';
import fs from 'fs';
import dateformat from 'dateformat';
import dotend from 'dotenv';

let options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams',
    method: 'GET',
    headers: {
      ClientID: process.env.TWITCH_CLIENT_ID,
      accept: 'application/json'
    }
};

export function getStreamerStats() {
  console.log('ayy');
  https.get(options, function(res) {
    console.log(options);
      let bodyChunks = [];
      res.on('data', function(chunk) {
          bodyChunks.push(chunk);
      }).on('end', function() {
          let body = Buffer.concat(bodyChunks);
          body = JSON.parse(body);
          console.log('saving parsed json');
          console.log(body.streams[0].channel.name);
      })
  }).on('error', function(e) {
      console.log('ERROR: ' + e);
  });
}
