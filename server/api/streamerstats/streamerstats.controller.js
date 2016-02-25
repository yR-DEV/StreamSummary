'use-strict';

import fs from 'fs';
import { getStreamerStats } from './stats/querystreamerstats.controller';
import { getNewStreamerStats } from './stats/getnewstreamerstats.controller';

//goes to the query streamer stats js file in 'stats' folder
export function getStreamers(req, res) {
  console.log(req.body);
  getStreamerStats(req).then((data) => {
    if(data === undefined) { res.send(404); }
    res.json(data);
  });
};

setInterval(getNewStreamerStats, 10000);
