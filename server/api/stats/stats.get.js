'use-strict';

import _ from 'lodash';
import https from 'https';
import controller from './stats.controller';

var options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams/summary'
};

//http request whose data is sent to stats.controller.js
//and then returned to the front end where it is rendered
//on top of the jumbotron in the stats component
//SET INTERVAL GOES HERE
//setInterval(function() {
//export function getStatRecords() {
    console.log('get function');
    https.get(options, function(res) {
        var bodyChunks = [];
        res.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            body = JSON.parse(body);
            //console.log('BODY: ' + body);
            var statTick = {
                "date": new Date,
                "channels": body.channels,
                "viewers": body.viewers
            };
            //Save the data from the timed api call
            controller.saveStats(statTick);
        })
    }).on('error', function(e) {
        console.log('ERROR: ' + e);
    });
//}

//setInterval(getStatRecords(), 5000);
