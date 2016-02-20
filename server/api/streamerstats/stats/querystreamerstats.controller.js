'use-strict';

import fs from 'fs';
import StreamerSchema from '../streamerstats.model';

import { sortstreamerdata } from './sortstreamerstats.controller';

export function streamerisnew(gamer) {
  return StreamerSchema.findOne({ "channelname": gamer.channel.name }).then((entered) => {
    return entered;
  });
};

export function insertnewstreamer(gamer) {
  let newStreamer = new StreamerSchema(gamer);
  return newStreamer.save((err) => {
    if(err) { console.log(err); }
  }).then((data) => {
    console.log('new user saved');
    return data;
  })
}
