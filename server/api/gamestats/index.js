'use-strict';

import express from 'express';
import { getGames } from './gamestats.controller';

var router = express.Router();

router.get('/topgames', getGames);

module.exports = router;
