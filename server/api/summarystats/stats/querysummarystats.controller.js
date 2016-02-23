'use-strict';

//module imports
import fs from 'fs';
import StatsSchema from '../summarystats.model';
import { sortsummarygraphdata } from './sortsummarystats.controller';


//returning 8 records to the front end
export function queryrecentstats() {
    return StatsSchema.find().sort({"_id": -1}).limit(1).then((data) => {
        return data;
    });
}

export function querytablestats() {
    return StatsSchema.find().sort({"date": -1}).limit(20).then((data) => {
        data.reverse();
        return data;
    });
}

export function querygraphstats(req) {
    if(req.body.time === 'minute') {
        return StatsSchema.find().sort({"_id": -1}).limit(8).then((minutedata) => {
            return minutedata;
        });
    }
    if(req.body.time === 'hour') {
        return StatsSchema.find().sort({"_id": -1}).limit(490).then((hourdata) => {
            return sortsummarygraphdata(hourdata, req.body);

        });
    }
    if(req.body.time === 'day') {
        return StatsSchema.find().sort({"_id": -1}).limit(92160).then((daydata) => {
            return sortsummarygraphdata(daydata, req.body);
        });
    }
}
