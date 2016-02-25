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

import { queryGraphStats, queryTableStats, queryRecentStats } from './stats/querysummarystats.controller';
import { getStreamSummaryStats } from './stats/savesummarystats.controller';

export function graphStats(req, res) {
    let query = req.body;
    queryGraphStats(req).then((data) => {
        res.json(data)
    });
};

export function tableStats(req, res) {
    queryTableStats().then((data) => {
        res.json(data);
    });
}

export function recentStats(req, res) {
    queryRecentStats().then((data) => {
        res.json(data);
    });
}

setInterval(getStreamSummaryStats, 60000);
