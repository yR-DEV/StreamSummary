'use-strict';

import express from 'express';
import { getgames } from './gamestats.controller';

var router = express.Router();

router.get('/topgames', getgames);

module.exports = router;
