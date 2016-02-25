'use-strict';

import fs from 'fs';

import { getGameStats } from './stats/savegamestats.controller';

export function getGames(req, res) {
  res.send(200);
}
