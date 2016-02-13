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
        //console.log('gngngn12');
        StatsSchema.find().sort({"date": -1}).limit(24).then(function(data) {
            data.forEach(function(hour, i) {
                if(i <= 5) {
                    day.firstquarter.push({ hour: i,
                                            channels: hour.channels,
                                            viewers: hour.viewers});
                } else if (i >= 6 && i <= 11) {
                    day.secondquarter.push({ hour: i,
                                             channels: hour.channels,
                                             viewers: hour.viewers});
                } else if (i >= 12 && i <= 17) {
                    day.thirdquarter.push({ hour: i,
                                            channels: hour.channels,
                                            viewers: hour.viewers});
                } else if(i >= 18 && i <= 23) {
                    day.fourthquarter.push({ hour: i,
                                             channels: hour.channels,
                                             viewers: hour.viewers})
                }
            });

            //THIS WAS FOR THE LOGIC, OF ENTERING A NEW INSTANCE INSIDE THE COLLECTION
            //COME BACK TO THIS LATER. NEED TO SET LOGIC FOR RIGHT WHEN
            //THE APP GOES LIVE, AND TO NEVER BE EXECUTED AGAIN
            // AverageSchema.find().then(function(data)
            let newDay = new AverageSchema;

            AverageSchema.find().sort({"date": -1}).limit(1).then(function(data) {
                data[0].firstquarter.forEach(function(hour, i) {
                    newDay.firstquarter.push({
                        hour: i,
                        channels: ((day.firstquarter[i].channels + hour.channels) / 2),
                        viewers: ((day.firstquarter[i].viewers + hour.viewers) /  2)
                    });
                })
                data[0].secondquarter.forEach(function(hour, i) {
                    newDay.secondquarter.push({
                        hour: i,
                        channels: ((day.secondquarter[i].channels + hour.channels) / 2),
                        viewers: ((day.secondquarter[i].viewers + hour.viewers) /2 )
                    })
                })
                data[0].thirdquarter.forEach(function(hour, i) {
                    newDay.thirdquarter.push({
                        hour: i,
                        channels: ((day.thirdquarter[i].channels + hour.channels) / 2),
                        viewers: ((day.thirdquarter[i].viewers + hour.viewers) / 2)
                    })
                })
                data[0].fourthquarter.forEach(function(hour, i) {
                    newDay.fourthquarter.push({
                        hour: i,
                        channels: ((day.fourthquarter[i].channels + hour.channels) / 2),
                        viewers: ((day.fourthquarter[i].viewers + hour.viewers) / 2)
                    })
                })
            })
        });
    }
}
