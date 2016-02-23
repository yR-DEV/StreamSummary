'use-strict';

import fs from 'fs';

import { getstreamerstats } from './stats/querystreamerstats.controller';
// import { streamerviewersandfollowers } from './stats/sortstreamerstats.controller';

//goes to the query streamer stats js file in 'stats' folder
export function getstreamers(req, res) {
  getstreamerstats(req).then((data) => {
    // let x = streamerviewersandfollowers(data);
    // console.log('SORTED STREAMER VIEWERS AND FOLLOWERS');
    // console.log(data);
    res.json(data);
  });
};

setInterval(getstreamerstats, 600000);
