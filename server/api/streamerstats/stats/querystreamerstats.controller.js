'use-strict';

import fs from 'fs';
import StreamerSchema from '../newstreamer.model';

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

export function pushnewstreamerstats(gamer, newStats) {
  return StreamerSchema.findOneAndUpdate({ "channelid": gamer.channel._id }, {$push: {streamerstats: newStats}}, {safe: true, upsert: true}).then((err, result) => {
    if(err) { console.log(err); }
    console.log('RESULT FROM UPDATE');
    return result;
  });
    // if(err) { console.log(err); }
    // console.log(result);
    // return result;
  // });
  // return StreamerSchema.findOneAndUpdate({ "channelid": gamer.channel._id }).then((streamer) => {
    // let updatedStreamer = streamer.streamerstats.push(newStats);
    // return updatedStreamer.save((err) => {
    //   if(err) { console.log(err); }
    // }).then((updatedGamer) => {
    //   console.log('user updated');
    //   return updatedGamer;
    // })
  // })
}
