'use-strict';

import express from 'express';
import { getstreamers } from './streamerstats.controller';

var router = express.Router();

//goes to main streamer stats controller
router.get('/getstreamers', getstreamers);

module.exports = router;
