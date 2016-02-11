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
// var mongoose = require('mongoose');

var StatsSchema = new mongoose.Schema({
  date: String,
  channels: Number,
  viewers: Number
});

var Tick = mongoose.model('Statistics', StatsSchema);



function saveStats(statTick) {
    console.log('** SAVE THIS BODY ***');
    console.log(statTick);
    var statTickEntry = new Tick(statTick);
    // console.log('*** TICK ENTRY ***');
    // console.log(tickEntry);
    return statTickEntry.save(function(err) {
        // if(err) {
        //     return err;
        // } else {
            console.log(statTickEntry + ' SAVED!');
        //}
    }).then(function(ret) {
        return ret;
    });
}

export function graphstats(req, res) {
    return Tick.find().sort({"date": 1}).limit(1).then(function(data) {
        console.log('****GET ****');
        console.log(data);
        res.json(data);
    });
}

var options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams/summary'
};

https.get(options, function(res) {
    var bodyChunks = [];
    res.on('data', function(chunk) {
        bodyChunks.push(chunk);
    }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        body = JSON.parse(body);
        console.log('BODY: ' + body);
        var statTick = {
            "date": new Date,
            "channels": body.channels,
            "viewers": body.viewers
        };
        console.log('FINAL OBJ:  ', statTick);
        saveStats(statTick);
    })
}).on('error', function(e) {
    console.log('ERROR: ' + e);
});
