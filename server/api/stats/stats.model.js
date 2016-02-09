'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var StatsSchema = new mongoose.Schema({
  date: String,
  channels: Number,
  viewers: Number
});

export default mongoose.model('Stats', StatsSchema);