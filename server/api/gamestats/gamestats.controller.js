'use-strict';

import fs from 'fs';

import { getGameStats } from './stats/savegamestats.controller';

export function getgames(req, res) {
  res.send(200);
}
