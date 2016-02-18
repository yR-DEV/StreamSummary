'use-strict';

//module imports
import fs from 'fs';
import StatsSchema from './stats.model';
//sorting logic imports
import { sortChannelDataIndex } from './sortchannelstats.controller';
import { sortViewerIDataIndex } from './sortviewerstats.controller';


export function queryindex(req, res) {
    let query = req.body;
    querystats(req).then(function(data) {
        console.log(data);
        res.json(data)
    });
};

//returning 8 records to the front end  q
export function querystats(req) {
    if(req.body.time === 'minute') {
        return StatsSchema.find().sort({"_id": -1}).limit(8).then(function(minutedata) {
            return minutedata;
        });
    }
    if(req.body.time === 'hour') {
        return StatsSchema.find().sort({"_id": -1}).limit(480).then((hourdata) => {
            return statTypeSorter(req.body, hourdata);
        });
    }
    if(req.body.time === 'day') {
        return StatsSchema.find().sort({"_id": -1}).limit(92160).then(function(daydata) {
            return statTypeSorter(req.body, daydata);
        });
    }
}

export function statTypeSorter(query, queryData) {
    if(query.statType === 'channels') {
        return sortChannelDataIndex(queryData, query.time);
    }
    if(query.statType === 'viewers') {
        return sortViewerIDataIndex(queryData, query.time);
    }
}
