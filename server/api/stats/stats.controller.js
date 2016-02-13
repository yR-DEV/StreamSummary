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
import Stats from './stats.model';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import dateformat from 'dateformat';

let StatsSchema = new mongoose.Schema({
  date: String,
  channels: Number,
  viewers: Number
});

let Tick = mongoose.model('Statistics', StatsSchema);

//saves individual ticks of the api calls from stats.get.js
//this was originally on the client side but I realized
//that all clients would be pushing data to the db which skews the data
export function saveStats(statTick) {
    console.log('*** STAT TICK FOR DB ***');
    console.log(statTick);
    if(statTick.channels === undefined || statTick.viewers === undefined) {
        getKraken();
    } else {
        var statTickEntry = new Tick(statTick);
        return statTickEntry.save(function(err) {
        }).then(function(ret) {
            return ret;
        });
    }
}

//db call to pull the x most recent entries to graph out.
//the call to update the graph will tick milliseconds after this call
export function graphstats(req, res) {
    return Tick.find().sort({"date": -1}).limit(7).then(function(data) {
        res.json(data);
    });
}

var options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams/summary'
};

//http request whose data is sent to stats.controller.js
//and then returned to the front end where it is rendered
//on top of the jumbotron in the stats component
//SET INTERVAL GOES HERE (WORKING)
function getKraken() {
    https.get(options, function(res) {
        //console.log(res);
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
            //Save the data from the kraken call
            console.log(statTick);
            saveStats(statTick);
        })
    }).on('error', function(e) {
        console.log('ERROR: ' + e);
    });
}

setInterval(getKraken, 10000);
