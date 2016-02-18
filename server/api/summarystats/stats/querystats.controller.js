'use-strict';

//module imports
import fs from 'fs';
import StatsSchema from '../stats.model';
//sorting logic
import { sortsummarygraphdata } from './sortstats.controller';


//returning 8 records to the front end
export function querygraphstats(req) {
    if(req.body.time === 'minute') {
        return StatsSchema.find().sort({"_id": -1}).limit(8).then(function(minutedata) {
            return minutedata;
        });
    }
    if(req.body.time === 'hour') {
        return StatsSchema.find().sort({"_id": -1}).limit(480).then((hourdata) => {
            return sortsummarygraphdata(hourdata, req.body);

        });
    }
    if(req.body.time === 'day') {
        return StatsSchema.find().sort({"_id": -1}).limit(92160).then(function(daydata) {
            return sortsummarygraphdata(daydata, req.body);
        });
    }
}

export function querytablestats() {
    return StatsSchema.find().sort({"date": -1}).limit(20).then(function(data) {
        data.reverse();
        return data;
    });
}

export function queryrecentstats() {
    return StatsSchema.find().sort({"_id": -1}).limit(1).then(function(data) {
        return data;
    });
}
