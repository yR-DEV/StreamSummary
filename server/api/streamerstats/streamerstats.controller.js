'use-strict';

import fs from 'fs';

import { getStreamerStats } from './stats/querystreamerstats.controller';
// import { streamerviewersandfollowers } from './stats/sortstreamerstats.controller';

//goes to the query streamer stats js file in 'stats' folder
export function getStreamers(req, res) {
  console.log('REQ DAT BODY');
  console.log(req.body);
  res.json(200)

  // getStreamerStats(req.body).then((data) => {
  //   if(data === undefined) { res.send(404); }
  //   // let x = streamerviewersandfollowers(data);
  //   // console.log('SORTED STREAMER VIEWERS AND FOLLOWERS');
  //   // console.log(data);
  //   res.json(data);
  // });
};

// setInterval(getStreamerStats, 600000);
