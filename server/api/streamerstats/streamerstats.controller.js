'use-strict';

import fs from 'fs';

import { getStreamerStats } from './stats/querystreamerstats.controller';
// import { streamerviewersandfollowers } from './stats/sortstreamerstats.controller';
import { getNewStreamerStats } from './stats/getnewstreamerstats.controller';

//goes to the query streamer stats js file in 'stats' folder
export function getStreamers(req, res) {
  getStreamerStats(req).then((data) => {
    if(data === undefined) { res.send(404); }
    // let x = streamerviewersandfollowers(data);
    // console.log('SORTED STREAMER VIEWERS AND FOLLOWERS');
    // console.log(data);
    res.json(data);
  });
};

setInterval(getStreamerStats, 3000);
