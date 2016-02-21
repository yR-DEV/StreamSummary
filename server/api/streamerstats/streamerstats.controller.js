'use-strict';

import fs from 'fs';

import { getstreamerstats } from './stats/querystreamerstats.controller';
import { streamerviewersandfollowers } from './stats/sortstreamerstats.controller';

export function getstreamers(req, res) {
  getstreamerstats(req).then((data) => {
    let x = streamerviewersandfollowers(data);
    console.log(x);
    res.json(x);
  });
};

setInterval(getstreamerstats, 600000);
