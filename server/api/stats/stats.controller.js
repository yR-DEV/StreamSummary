/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */
'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import dateformat from 'dateformat';
import StatsSchema from './stats.model';
import AverageSchema from './averagestats.model';

let hourCounter = 23;
//saves individual ticks of the api calls from stats.get.js
//this was originally on the client side but I realized
//that all clients would be pushing data to the db which skews the data

// export function averagestats(req, res) {
//     //if(hourCounter % 12 == 0) {
//     console.log('averagestats');
//         return StatsSchema.find().sort({"date": -1}).limit(12).then(function(data) {
//             console.log('average stats');
//             console.log(data);
//             res.json(200);
//             return data;
//         });
//
// }
export function averagestats(req, res) {
    // if(hourCounter % 12 === 0) {
    //     console.log('12');
    //     res.json(200);
    // }
    res.json(200);
}

export function getAverageStats() {
    let day = new AverageSchema;
    console.log('gngngn12');
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
        console.log(day);
    });
}


export function saveStats(statTick) {
    console.log(statTick);
    console.log(hourCounter);
    if(statTick.channels === undefined || statTick.viewers === undefined || statTick === {}) {
        getKraken();
    } else {
        var statTickEntry = new StatsSchema(statTick);
        return statTickEntry.save(function(err) {
        }).then(function(ret) {
            hourCounter += 1;
            if(hourCounter % 24 === 0) {
                console.log('counter 12');
                getAverageStats();
            }
            return ret;
        });
    }
}

// if(hourCounter % 12 === 0) {
//     console.log('counter 12');
//     getaveragestats();
// }

//db call to pull the x most recent entries to graph out.
//the call to update the graph will tick milliseconds after this call
export function graphstats(req, res) {
    return StatsSchema.find().sort({"date": -1}).limit(10).then(function(data) {
        res.json(data);
    });
}

export function statstable(req, res) {
    return StatsSchema.find().sort({"date": -1}).limit(20).then(function(data) {
        res.json(data);
    });
}

export function lastentry(req, res) {
    //console.log(req.body);
    return StatsSchema.find().sort({"date": -1}).limit(1).then(function(data) {
        res.json(data);
    });
}


var options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams/summary'
};

//http request whose data is sent to stats.controller.js
//and then returned to the front end where it is rendered
//on top of the jumbotron in the stats component
//SET INTERVAL GOES HERE (WORKING)
function getKraken() {
    https.get(options, function(res) {
        let bodyChunks = [];
        res.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            let body = Buffer.concat(bodyChunks);
            body = JSON.parse(body);
            let now = new Date;
            let statTick = {
                "date": (dateformat(now, "h:MM:ss TT, mm/dd/yyyy, ") +"GMT-0700" ),
                "channels": body.channels,
                "viewers": body.viewers
            };
            console.log(statTick);
            //Save the data from the kraken call
            // console.log(statTick);
            saveStats(statTick);
        })
    }).on('error', function(e) {
        console.log('ERROR: ' + e);
    });
}
//interval for back end API call-erinOoOOO
setInterval(getKraken, 10000);
