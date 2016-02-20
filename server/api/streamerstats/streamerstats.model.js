'use-strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let StreamerSchema = new mongoose.Schema({
  // streams[0].channel._id
  channelid: Number,
  // streams[0].channel.name
  channelname: String,
  // streams[0].channel.url
  channelurl: String,
  // streams[0].channel.partner
  twitchpartner: Boolean,
  // array of objects { date: date, followers: x, viewers:x, channelviews: x }
  streamerstats: Array
});

module.exports = mongoose.model('Streamers', StreamerSchema);


// viewers: Number,
// // streams[0].channel.followers
// followers: Number,
// // streams[0].channel.viewes
// channelviews: Number,
