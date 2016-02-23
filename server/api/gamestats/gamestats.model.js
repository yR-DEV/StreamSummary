'use-strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let GamesSchema = new mongoose.Schema({
  // top[0].game.name
  game: String,
  // top[0].game._id
  gameid: Number,
  // top[0].viewers
  totalviewers: Number,
  // top[0].channel
  livechannels: Number,
  // top[0].game.box.medium
  gameart: String
});

module.exports = mongoose.model('Games', GamesSchema);
