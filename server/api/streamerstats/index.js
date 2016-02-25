'use-strict';

import express from 'express';
import { getStreamers } from './streamerstats.controller';

var router = express.Router();

//goes to main streamer stats controller
router.post('/getstreamers', getStreamers);

module.exports = router;
