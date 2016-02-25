'use-strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import dateformat from 'dateformat';
import dotenv from 'dotenv';
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
console.log('NEW STREAMER STATS');
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
          console.log('*** SUCCESSFUL GET STREAMERS ***');
          sortStreamerStats(body);
      })
  }).on('error', function(e) {
      console.log('ERROR: ' + e);
  });
}
