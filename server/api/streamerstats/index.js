'use-strict';

import express from 'express';
import { getstreamers } from './streamers.controller';

var router = express.Router();

router.get('/topstreamers', getstreamers);

module.exports = router;
