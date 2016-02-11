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

var StatsSchema = new mongoose.Schema({
  date: String,
  channels: Number,
  viewers: Number
});

var Tick = mongoose.model('Statistics', StatsSchema);

//saves individual ticks of the api calls from stats.get.js
//this was originally on the client side but I realized
//that all clients would be pushing data to the db which skews the data
export function saveStats(statTick) {
    var statTickEntry = new Tick(statTick);
    return statTickEntry.save(function(err) {
    }).then(function(ret) {
        return ret;
    });
}

//db call to pull the x most recent entries to graph out.
//the call to update the graph will tick milliseconds after this call
export function graphstats(req, res) {
    return Tick.find().sort({"date": 1}).limit(5).then(function(data) {
        res.json(data);
    });
}
