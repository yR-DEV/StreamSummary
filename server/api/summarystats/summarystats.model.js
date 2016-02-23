'use-strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let StatsSchema = new mongoose.Schema({
  date: String,
  channels: Number,
  viewers: Number
});

module.exports = mongoose.model('Statistics', StatsSchema);
