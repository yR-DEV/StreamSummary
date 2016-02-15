'use-strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import StatsSchema from './stats.model';
//import AverageSchema from './averagestats.model';
import controller from './stats.controller';

export function getaverages(req, res) {
    console.log(req.body);
}

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
