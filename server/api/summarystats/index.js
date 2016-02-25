'use-strict';

//need the server kappa
import express from 'express';
var router = express.Router();

//one route file
import { graphStats, tableStats, recentStats } from './summarystats.controller';

var router = express.Router();

router.get('/gettablestats', tableStats);
router.get('/recentstats', recentStats);
router.post('/channelstats', graphStats);
router.post('/viewerstats', graphStats);

module.exports = router;
