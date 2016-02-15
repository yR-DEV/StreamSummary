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


export function saveStats(statTick) {
    if(statTick.channels === undefined || statTick.channels === undefined
                    || statTick === {} || statTick.status === 503 || statTick.status === 404) {
        getInitialKrakenStats();
    } else {
        var statTickEntry = new StatsSchema(statTick);
        return statTickEntry.save(function(err) {
            if(err) {
                console.log(err);
            }
        }).then(function(data) {
            return data;
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

var options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams/summary'
};

function getInitialKrakenStats() {
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
            saveStats(statTick);
        })
    }).on('error', function(e) {
        console.log('ERROR: ' + e);
    });
}
setInterval(getInitialKrakenStats, 60000);
