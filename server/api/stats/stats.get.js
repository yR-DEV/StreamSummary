'use-strict';

// import _ from 'lodash';
// import https from 'https';
// import controller from './stats.controller';
//
// var options = {
//     host: 'api.twitch.tv',
//     path: '/kraken/streams/summary'
// };
//
// var tickGet = () => {
//     console.log('*** TICK ***');
//     https.get(options, function(res) {
//         var bodyChunks = [];
//         res.on('data', function(chunk) {
//             bodyChunks.push(chunk);
//         }).on('end', function() {
//             var body = Buffer.concat(bodyChunks);
//             controller.saveStats(body);
//             console.log('Stat Tick: ' + body);
//         })
//     }).on('error', function(e) {
//         console.log('ERROR: ' + e);
//     })
// };
//
// setInterval(tickGet, 1000);
