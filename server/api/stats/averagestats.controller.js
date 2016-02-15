'use-strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import StatsSchema from './stats.model';
//import AverageSchema from './averagestats.model';
import controller from './stats.controller';

export function getaverages(req, res) {
    if(req.body.statType === 'channel') {
        channelStats(req, res);
    }
}

export function channelStats(req, res) {
    //returning 8 records to the front end
    if(req.body.time === 'minute') {
        StatsSchema.find().sort({"_id": -1}).limit(10).then(function(minutedata) {
            minutedata.reverse();
            res.json(minutedata);
        });
    }
    //returning 8 records to the front end
    if(req.body.time === 'hour') {
        StatsSchema.find().sort({"_id": -1}).limit(480).then(function(hourdata) {
            if(hourdata.length < 480) {
                res.json(200);
            } else {
                req.body.hourData = hourdata;
                sortHourData(req, res);
            }
        })
    }
    //8 days going back to the front end
    if(req.body.time === 'day') {
        res.json(200);
    }
}

export function sortHourData(req, res) {
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


// let hourStartingTime;
// let perHourAverage;
//
//     for(var y = 0; y <= hourItemsLength; y++) {
//         if(y === 0) {
    //    perHourAverage = req.body.hourData[y].channels;
    //    hourStartingTime = req.body.hourData[y].date
//         } else {
//             perHourAverage = Math.floor((perHourAverage += req.body.hourData[y].channels) / 2);
//         }
//     }
//     hours.push({ date: hourStartingTime, channels: perHourAverage });
// };
// console.log(hours);

// { stat: 'channel', time: 'minute' }
// { stat: 'channel', time: 'hour' }
// { stat: 'channel', time: 'day' }

//
// module.exports = {
//     getAndUpdateAverageStats: function() {
//         let day = new AverageSchema;
//         StatsSchema.find().sort({"date": -1}).limit(24).then(function(data) {
//             data.forEach(function(hour, i) {
//                 if(i <= 11) {
//                     day.firsthalf.push({ hour: i,
//                                          channels: hour.channels,
//                                          viewers: hour.viewers});
//                 } else if (i >= 12 && i <= 23) {
//                     day.secondhalf.push({ hour: i,
//                                             channels: hour.channels,
//                                             viewers: hour.viewers});
//                 }
//             });
//
//             let newDay = new AverageSchema;
//             AverageSchema.find().sort({"date": -1}).limit(1).then(function(data) {
//                 data[0].firsthalf.forEach(function(hour, i) {
//                     newDay.firsthalf.push({
//                         hour: i,
//                         channels: ((day.firsthalf[i].channels + hour.channels) / 2),
//                         viewers: ((day.firsthalf[i].viewers + hour.viewers) /  2)
//                     });
//                 })
//                 data[0].secondhalf.forEach(function(hour, i) {
//                     newDay.secondhalf.push({
//                         hour: i + 12,
//                         channels: ((day.secondhalf[i].channels + hour.channels) / 2),
//                         viewers: ((day.secondhalf[i].viewers + hour.viewers) / 2)
//                     })
//                 })
//                 AverageSchema.remove({}).then(function(err) {
//                     newDay.save(function(err) {
//                     }).then(function(ret) {
//                         //console.log('RET');
//                         //console.log(ret);
//                         return ret;
//                     })
//                 })
//             })
//         });
//     }
// }
