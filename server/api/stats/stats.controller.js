/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */
'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import dateformat from 'dateformat';
import StatsSchema from './stats.model';
import AverageSchema from './averagestats.model';
import averagestatsupdate from './averagestats.update.js';
//change this to 0 upon launch
let hourCounter = 22;

export function averagestats(req, res) {
    AverageSchema.find().sort({"date": -1}).limit(1).then(function(averages) {
        res.json(averages);
    })
}

export function saveStats(statTick) {
    if(statTick.channels === undefined || statTick.viewers === undefined || statTick === {}) {
        getKraken();
    } else {
        var statTickEntry = new StatsSchema(statTick);
        return statTickEntry.save(function(err) {
        }).then(function(ret) {
            hourCounter += 1;
            if(hourCounter % 23 === 0) {
                averagestatsupdate.getAndUpdateAverageStats();
            }
            return ret;
        });
    }
}

//db call to pull the x most recent entries to graph out.
//the call to update the graph will tick milliseconds after this call
export function graphstats(req, res) {
    return StatsSchema.find().sort({"date": -1}).limit(10).then(function(data) {
        data.reverse();
        res.json(data);
    });
}

export function statstable(req, res) {
    return StatsSchema.find().sort({"date": -1}).limit(20).then(function(data) {
        data.reverse();
        res.json(data);
    });
}

export function lastentry(req, res) {
    return StatsSchema.find().sort({"date": -1}).limit(1).then(function(data) {
        data.reverse();
        res.json(data);
    });
}

export function averageviewerstats(req, res) {
    return AverageSchema.find().sort({"date": -1}).limit(1).then(function(data) {
        data.reverse();
        res.json(data);
    });
}

var options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams/summary'
};

function getKraken() {
    https.get(options, function(res) {
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
            //console.log(statTick);
            saveStats(statTick);
        })
    }).on('error', function(e) {
        console.log('ERROR: ' + e);
    });
}
setInterval(getKraken, 60000);
