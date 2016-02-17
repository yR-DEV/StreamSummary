'use-strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import StatsSchema from './stats.model';
import controller from './stats.controller';

export function sortstats(req, res) {
    // console.log('sort stats req.body');
    // console.log(req.body);
    if(req.body.statType === 'channels') {
        return queryStats(req, res);
    }
    if(req.body.statType == 'viewers') {
        return queryStats(req, res);
    }
};

//returning 8 records to the front end
export function queryStats(req, res) {
    // console.log('query stats req.body');
    // console.log(req.body);
    if(req.body.time === 'minute') {
        return StatsSchema.find().sort({"_id": -1}).limit(8).then(function(minutedata) {
            minutedata.reverse();
            res.json(minutedata);
        });
    }
    if(req.body.time === 'hour') {
        return StatsSchema.find().sort({"_id": -1}).limit(480).then(function(hourdata) {
            if(hourdata.length < 480) {
                res.send(false);
            } else {
                req.body.hourData = hourdata;
                return sortHourData(req, res);
            }
        })
    }
    if(req.body.time === 'day') {
        return StatsSchema.find().sort({"_id": -1}).limit(92160).then(function(daydata) {
            if(daydata.length < 92159) {
                res.send(false);
            } else {
                req.body.dayData = daydata;
                return sortDayData(req, res);
            }
        });
    }
}
//
// export function viewerStats(req, res) {
//     res.json(200);
// }

//60 minutes in a day Kappa
export function sortHourData(req, res) {
    // console.log('set hour data statType');
    // console.log(req.body.statType);
    let hours = [];
    for(var i = 0; i <= 7; i++) {
        let hourStartingTime;
        let perHourAverage;

        for(var y = 0; y <= 59; y++) {
            if(!perHourAverage) {
                if(req.body.statType === 'channels') {
                    perHourAverage = req.body.hourData[0].channels;
                    hourStartingTime = req.body.hourData[0].date;
                    req.body.hourData.splice(0, 1);
                } else if (req.body.statType === 'viewers') {
                    perHourAverage = req.body.hourData[0].viewers;
                    hourStartingTime = req.body.hourData[0].date;
                    req.body.hourData.splice(0, 1);
                }
            } else {
                if(req.body.statType === 'channels') {
                    perHourAverage = Math.floor((perHourAverage += req.body.hourData[0].channels) / 2);
                    req.body.hourData.splice(0, 1);
                } else if (req.body.statType === 'viewers') {
                    perHourAverage = Math.floor((perHourAverage += req.body.hourData[0].viewers) / 2);
                    req.body.hourData.splice(0, 1);
                }
            }
        }
        if(req.body.statType === 'channels') {
            hours.push({ date: hourStartingTime, channels: perHourAverage });
        } else if (req.body.statType === 'viewers') {
            hours.push({ date: hourStartingTime, viewers: perHourAverage })
        }
    }
    hours.reverse();
    // console.log('final hours arr');
    // console.log(hours);
    res.send(200).json(hours);
}

//11520 minutes in a day
//1440 minutes in an hour
export function setDayData(req, res) {
    let days = [];
    for(var i = 0; i <= 7; i++) {
        let dayStartingTime;
        let perDayAverage;

        for(var y = 0; y <= 59; y++) {
            if(!perDayAverage) {
                if(req.body.statType === 'channels') {
                    perDayAverage = req.body.dayData[0].channels;
                    dayStartingTime = req.body.dayData[0].date;
                    req.body.dayData.splice(0, 1);
                } else if (req.body.statType === 'viewers') {
                    perDayAverage = req.body.dayData[0].viewers;
                    dayStartingTime = req.body.dayData[0].date;
                    req.body.dayData.splice(0, 1);
                }
            } else {
                if(req.body.statType === 'channels') {
                    perDayAverage = Math.floor((perDayAverage += req.body.dayData[0].channels) / 2);
                    req.body.dayData.splice(0, 1);
                } else if (req.body.statType === 'viewers') {
                    perDayAverage = Math.floor((perDayAverage += req.body.dayData[0].viewers) / 2);
                    req.body.dayData.splice(0, 1);
                }
            }
        }
        if(req.body.statType === 'channels') {
            days.push({ date: dayStartingTime, channels: perDayAverage });
        } else if (req.body.statType === 'viewers') {
            days.push({ date: dayStartingTime, viewers: perDayAverage })
        }
    }
    days.reverse();
    res.send(200).json(days);
}
