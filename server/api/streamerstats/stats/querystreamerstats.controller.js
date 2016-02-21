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
    return data;
  });
};

export function pushnewstreamerstats(gamer, newStats) {
  return StreamerSchema.findOne({ "channelid": gamer.channel._id }).then((recordtoupdate) => {
    return recordtoupdate.update({ $push: { "streamerstats": newStats }}).then((err, records) => {
      return StreamerSchema.findOne({ "channelid":gamer.channel._id }).then((updated) => {
        return updated;
      });
    });
  });
};

export function getstreamerstats() {
  // if(req.body === 'followers') {
    return StreamerSchema.find().sort({ "followers": -1 }).limit(6).then((data) => {
      data.forEach(function(streamer) {
        if (streamer.streamerstats.length > 1) {
          console.log('greater than 1');
        }
      })
      return data;
    });
  // };
};
