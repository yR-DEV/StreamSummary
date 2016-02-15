'use-strict';

var express = require('express');
var statscontroller = require('./stats.controller');
var averagestatscontroller = require('./averagestats.controller')

var router = express.Router();

// router.get('/', controller.index);
router.get('/graphstats', statscontroller.graphstats);
router.get('/statstable', statscontroller.statstable);
router.get('/lastentry', statscontroller.lastentry);
//router.get('/averagestats', statscontroller.averagestats);
router.post('/averagestats', averagestatscontroller.getaverages);
//router.post('/saveStats', controller.savestats);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
