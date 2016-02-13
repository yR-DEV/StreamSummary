'use-strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let AverageSchema = new mongoose.Schema({
    firstquarter: Array,
    secondquarter: Array,
    thirdquarter: Array,
    fourthquarter: Array
});

module.exports = mongoose.model('AverageStats', AverageSchema);
