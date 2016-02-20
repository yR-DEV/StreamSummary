'use-strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let StreamerSchema = new mongoose.Schema({
    date: String,
    // streams[0].channel._id
    channelid: Number,
    // streams[0].channel.name
    name: String,
    // streams[0].viewers
    viewers: Number,
    // streams[0].channel.followers
    followers: Number,
    // streams[0].channel.viewes
    channelviews: Number,
    //channel.
});

module.exports = mongoose.model('Streamers', StreamerSchema);
