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
    var statTickEntry = new Tick(statTick);
    return statTickEntry.save(function(err) {
            // console.log(statTickEntry + ' SAVED!');
    }).then(function(ret) {
        return ret;
    });
}

export function graphstats(req, res) {
    return Tick.find().sort({"date": 1}).limit(5).then(function(data) {
        // console.log('****GET PAST TICKS ****');
        // console.log(data);
        res.json(data);
    });
}
