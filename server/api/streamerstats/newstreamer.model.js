'use-strict';

import mongoose from 'mongoose';
import StreamerStatsSchema from './streamerstats.model';

let Schema = mongoose.Schema;


let StreamerSchema = new mongoose.Schema({
  // index: true,
  // streams[0].channel._id
  channelid: Number,
  // streams[0].channel.name
  channelname: String,
  // streams[0].channel.url
  channelurl: String,
  // streams[0].channel.partner
  twitchpartner: Boolean,
  //primary index to make getting the stats array easier.
  // index: true,
  // array of objects { date: date, followers: x, viewers:x, channelviews: x }
  streamerstats: [StreamerStatsSchema]
});

StreamerSchema.index({name: 1});

module.exports = mongoose.model('Streamers', StreamerSchema);
