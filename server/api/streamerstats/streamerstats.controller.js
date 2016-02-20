'use-strict';

import fs from 'fs';

import { getstreamerstats } from './stats/querystreamerstats.controller';

export function getstreamers(req, res) {
  getstreamerstats(req).then((data) => {
    res.json(data);
  });
};

setInterval(getstreamerstats, 600000);
