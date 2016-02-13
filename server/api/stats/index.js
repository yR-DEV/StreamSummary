'use-strict';

var express = require('express');
var controller = require('./stats.controller');

var router = express.Router();

// router.get('/', controller.index);
router.get('/graphstats', controller.graphstats);
router.get('/statstable', controller.statstable);
router.get('/lastentry', controller.lastentry);
router.get('/averagestats', controller.averagestats);
router.get('/averageviewerstats', controller.averageviewerstats);
//router.post('/saveStats', controller.savestats);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);
// router.get('/averagestats', function(req, res, next) {
//     res.json(200)
// })

module.exports = router;
