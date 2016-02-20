'use-strict';

//need the server kappa
import express from 'express';
var router = express.Router();

//one route file
import { graphstats, tablestats, recentstats } from './summarystats.controller';

var router = express.Router();

router.get('/gettablestats', tablestats);
router.get('/recentstats', recentstats);
router.post('/channelstats', graphstats);
router.post('/viewerstats', graphstats);

module.exports = router;
