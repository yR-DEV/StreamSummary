'use-strict';

//module imports
import fs from 'fs';
import StatsSchema from './stats.model';
//sorting logic imports
import { sortSummaryDataIndex } from './sortstats.controller';


export function queryindex(req, res) {
    let query = req.body;
    querystats(req).then(function(data) {
        console.log(data);
        res.json(data)
    });
};

//returning 8 records to the front end
export function querystats(req) {
    if(req.body.time === 'minute') {
        return StatsSchema.find().sort({"_id": -1}).limit(8).then(function(minutedata) {
            return minutedata;
        });
    }
    if(req.body.time === 'hour') {
        return StatsSchema.find().sort({"_id": -1}).limit(480).then((hourdata) => {
            return sortSummaryDataIndex(hourdata, req.body);

        });
    }
    if(req.body.time === 'day') {
        return StatsSchema.find().sort({"_id": -1}).limit(92160).then(function(daydata) {
            return sortSummaryDataIndex(daydata, req.body);
        });
    }
}

export function statstable(req, res) {
    return StatsSchema.find().sort({"date": -1}).limit(20).then(function(data) {
        data.reverse();
        res.json(data);
    });
}

export function lastentry(req, res) {
    return StatsSchema.find().sort({"_id": -1}).limit(1).then(function(data) {
        res.json(data);
    });
}
