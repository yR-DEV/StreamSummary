'use-strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import dateformat from 'dateformat';
import StatsSchema from '../summarystats.model';
import dotenv from 'dotenv';

let options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams/summary',
    method: 'GET',
    headers: {
      ClientID: process.env.TWITCH_CLIENT_ID,
      accept: 'application/json'
    }
};

export function getKrackenSummaryStats() {
    console.log('ticked from stats.controller');
    https.get(options, function(res) {
      console.log(options);
        let bodyChunks = [];
        res.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            let body = Buffer.concat(bodyChunks);
            body = JSON.parse(body);
            let now = new Date;
            let statTick = {
                "date": (dateformat(now, "h:MM:ss TT, mm/dd/yyyy, ") +"GMT-0700" ),
                "channels": body.channels,
                "viewers": body.viewers
            };
            console.log('saving parsed json');
            saveStats(statTick);
        })
    }).on('error', function(e) {
        console.log('ERROR: ' + e);
    });
}
let saveStats = (statTick) => {
    if(statTick.channels === undefined || statTick.viewers === undefined
                    || statTick === {} || statTick.status === 503 || statTick.status === 404) {
        getKrackenSummaryStats();
    } else {
        var statTickEntry = new StatsSchema(statTick);
        return statTickEntry.save(function(err) {
            if(err) {
                console.log(err);
            }
        }).then(function(data) {
            console.log('tick successfully saved in db');
            console.log(data);
            return data;
        });
    }
};
