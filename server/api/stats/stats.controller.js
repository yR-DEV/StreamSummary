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
import StatsSchema from './stats.model';
import savestatscontroller from './savestats.controller';

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
