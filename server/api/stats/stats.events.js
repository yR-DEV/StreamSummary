/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var Stats = require('./stats.model');
var StatsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StatsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Stats.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StatsEvents.emit(event + ':' + doc._id, doc);
    StatsEvents.emit(event, doc);
  }
}

export default StatsEvents;
