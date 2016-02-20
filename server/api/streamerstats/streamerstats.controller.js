'use-strict';

import fs from 'fs';

import { getStreamerStats } from './stats/savestreamerstats.controller';

export function getstreamers(req, res) {
    res.send(200);
}

setInterval(getStreamerStats, 10000)
