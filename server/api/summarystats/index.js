'use-strict';

var express = require('express');
// var statscontroller = require('./stats.controller');
// var querystatscontroller = require('./querystats.controller');
// import querystatscontroller from './querystats.controller';
import { queryindex, querystats } from './querystats.controller';
import { statstable, lastentry } from './stats.controller'

var router = express.Router();

router.get('/statstable', statstable);
router.get('/lastentry', lastentry);
router.post('/sortchannelstats', queryindex);
router.post('/sortviewerstats', queryindex);


module.exports = router;
