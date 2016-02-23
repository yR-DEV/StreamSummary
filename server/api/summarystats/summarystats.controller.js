// /**
//  * Using Rails-like standard naming convention for endpoints.
//  * GET     /api/things              ->  index
//  * POST    /api/things              ->  create
//  * GET     /api/things/:id          ->  show
//  * PUT     /api/things/:id          ->  update
//  * DELETE  /api/things/:id          ->  destroy
//  */
 'use strict';

import fs from 'fs';

import { querygraphstats, querytablestats, queryrecentstats } from './stats/querysummarystats.controller';
import { getKrackenSummaryStats } from './stats/savesummarystats.controller';

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

setInterval(getKrackenSummaryStats, 60000);
