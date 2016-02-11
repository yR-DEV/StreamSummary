'use-strict';

import _ from 'lodash';
import https from 'https';
import controller from './stats.controller';

var options = {
    host: 'api.twitch.tv',
    path: '/kraken/streams/summary'
};

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
        // console.log('FINAL OBJ: ', statTick);
        controller.saveStats(statTick);
    })
}).on('error', function(e) {
    console.log('ERROR: ' + e);
});
