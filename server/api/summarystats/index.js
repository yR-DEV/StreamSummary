'use-strict';

import express from 'express';
// var statscontroller = require('./stats.controller');
// var querystatscontroller = require('./querystats.controller');
// import querystatscontroller from './querystats.controller';
import { queryindex, querystats, statstable, lastentry } from './querystats.controller';
// import { statstable, lastentry } from './stats.controller'

var router = express.Router();

router.get('/gettablestats', statstable);
router.get('/getlastentry', lastentry);
router.post('/getchannelstats', queryindex);
router.post('/getviewerstats', queryindex);


module.exports = router;
