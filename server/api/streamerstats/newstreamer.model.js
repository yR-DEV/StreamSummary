'use-strict';

import mongoose from 'mongoose';
import StreamerStatsSchema from './streamerstats.model';

let Schema = mongoose.Schema;


let StreamerSchema = new mongoose.Schema({
  channelid: Number,
  channelname: String,
  channelurl: String,
  twitchpartner: Boolean,
  logo: String,
  streamerstats: [StreamerStatsSchema]
});

StreamerSchema.index({name: 1});

module.exports = mongoose.model('Streamers', StreamerSchema);
