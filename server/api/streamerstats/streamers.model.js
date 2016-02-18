'use-strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let StreamerSchema = new mongoose.Schema({
    date: String,
    username: String,
    followers: Number,
});

module.exports = mongoose.model('Streamers', StreamerSchema);
