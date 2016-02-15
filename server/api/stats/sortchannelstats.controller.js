'use-strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import StatsSchema from './stats.model';
import controller from './stats.controller';

export function sortstats(req, res) {
    if(req.body.statType === 'channel') {
        return channelStats(req, res);
    }
}

//returning 8 records to the front end
export function channelStats(req, res) {
    console.log(req.body);
    if(req.body.time === 'minute') {
        return StatsSchema.find().sort({"_id": -1}).limit(8).then(function(minutedata) {
            minutedata.reverse();
            console.log(minutedata);
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
        return StatsSchema.find().sort({"_id": -1}).limit(11520).then(function(daydata) {
            if(daydata.length < 11520) {
                res.send(false);
            } else {
                req.body.dayData = daydata;
                return sortDayData(req, res);
            }
        });
    }
}

//60 minutes in a day Kappa
export function sortHourData(req, res) {
    console.log(req.body.statType);
    let days = [];
    let hours = [];
    for(var i = 0; i <= 7; i++) {
        let hourStartingTime;
        let perHourAverage;

        for(var y = 0; y <= 59; y++) {
            if(!perHourAverage) {
                perHourAverage = req.body.hourData[0].channels;
                hourStartingTime = req.body.hourData[0].date;
                req.body.hourData.splice(0, 1);
            } else {
                perHourAverage = Math.floor((perHourAverage += req.body.hourData[0].channels) / 2);
                req.body.hourData.splice(0, 1);
            }
        }
        hours.push({ date: hourStartingTime, channels: perHourAverage });
    }
    hours.reverse();
    res.json(hours);
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
                perDayAverage = req.body.dayData[0].channels;
                dayStartingTime = req.body.dayData[0].date;
                req.body.dayData.splice(0, 1);
            } else {
                perDayAverage = Math.floor((perDayAverage += req.body.dayData[0].channels) / 2);
                req.body.dayData.splice(0, 1);
            }
        }
        days.push({ date: dayStartingTime, channels: perDayAverage });
    }
    days.reverse();
    res.json(days);
}
