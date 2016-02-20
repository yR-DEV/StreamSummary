'use-strict';

import fs from 'fs';

import { getstreamerstats } from './stats/savestreamerstats.controller';

export function getstreamers(req, res) {
    res.send(200);
}

setInterval(getstreamerstats, 10000);
