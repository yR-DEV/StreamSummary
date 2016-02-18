// /**
//  * Using Rails-like standard naming convention for endpoints.
//  * GET     /api/things              ->  index
//  * POST    /api/things              ->  create
//  * GET     /api/things/:id          ->  show
//  * PUT     /api/things/:id          ->  update
//  * DELETE  /api/things/:id          ->  destroy
//  */
// 'use strict';
//
import _ from 'lodash';
// import mongoose from 'mongoose';
// import https from 'https';
import fs from 'fs';
// import StatsSchema from './stats.model';
// import savestatscontroller from './stats/savestats.controller';
import { querygraphstats, querytablestats, queryrecentstats } from './stats/querystats.controller';
import { sortSummaryData } from './stats/sortstats.controller.js';

export function graphstats(req, res) {
    let query = req.body;
    querygraphstats(req).then((data) => {
        res.json(data)
    });
};

export function tablestats(req, res) {
    querytablestats().then((data) => {
        res.json(data);
    });
}

export function recentstats(req, res) {
    queryrecentstats().then((data) => {
        res.json(data);
    });
}
