'use-strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import StatsSchema from './stats.model';
import AverageSchema from './averagestats.model';
import controller from './stats.controller';


module.exports = {
    getAndUpdateAverageStats: function() {
        let day = new AverageSchema;
        StatsSchema.find().sort({"date": -1}).limit(24).then(function(data) {
            data.forEach(function(hour, i) {
                if(i <= 11) {
                    day.firsthalf.push({ hour: i,
                                         entries: data.entries + 1,
                                         channels: hour.channels,
                                         viewers: hour.viewers});
                } else if (i >= 12 && i <= 23) {
                    day.secondhalf.push({ hour: i,
                                            entries: data.entries + 1,
                                            channels: hour.channels,
                                            viewers: hour.viewers});
                }

            });

            //THIS WAS FOR THE LOGIC, OF ENTERING A NEW INSTANCE INSIDE THE COLLECTION
            //COME BACK TO THIS LATER. NEED TO SET LOGIC FOR RIGHT WHEN
            //THE APP GOES LIVE, AND TO NEVER BE EXECUTED AGAIN
            // AverageSchema.find().then(function(data)
            let newDay = new AverageSchema;

            AverageSchema.find().sort({"date": -1}).limit(1).then(function(data) {
                data[0].firsthalf.forEach(function(hour, i) {
                    newDay.firsthalf.push({
                        hour: i,
                        entries: day.entries,
                        channels: ((day.firsthalf[i].channels + hour.channels) / day.entries),
                        viewers: ((day.firsthalf[i].viewers + hour.viewers) /  day.entries)
                    });
                })
                data[0].secondhalf.forEach(function(hour, i) {
                    newDay.secondhalf.push({
                        hour: i,
                        entries: day.entries,
                        channels: ((day.secondquarter[i].channels + hour.channels) / day.entries),
                        viewers: ((day.secondquarter[i].viewers + hour.viewers) / day.entries)
                    })
                })
            })
        });
    }
}
