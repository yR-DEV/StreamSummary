'use-strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let AverageSchema = new mongoose.Schema({
    firsthalf: Array,
    secondhalf: Array,
});

module.exports = mongoose.model('AverageStats', AverageSchema);
