'use-strict';

import mongoose from 'mongoose';
import dateformat from 'dateformat';

let Schema = mongoose.Schema;

let StreamerStatsSchema = new mongoose.Schema({
    date: String,
    viewers: Number,
    followers: Number,
    channelviews: Number,
    currentgame: String
});

module.exports = StreamerStatsSchema;
