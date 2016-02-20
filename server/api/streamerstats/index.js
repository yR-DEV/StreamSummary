'use-strict';

import express from 'express';
import { getstreamers } from './streamerstats.controller';

var router = express.Router();

router.get('/getstreamers', getstreamers);

module.exports = router;
