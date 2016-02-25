'use-strict';

import fs from 'fs';
import StreamerSchema from '../newstreamer.model';
import { sortViewersAndFollowers } from './sortstreamerstats.controller';

export function isStreamerNew(gamer) {
  return StreamerSchema.findOne({ "channelname": gamer.channel.name }).then((entered) => {
    return entered;
  });
};

export function saveNewStreamer(gamer) {
  let newStreamer = new StreamerSchema(gamer);
  return newStreamer.save((err) => {
    if(err) { console.log(err); }
  }).then((data) => {
    return data;
  });
};

export function pushStreamerStats(gamer, newStats) {
  return StreamerSchema.findOne({ "channelid": gamer.channel._id }).then((recordtoupdate) => {
    return recordtoupdate.update({ $push: { "streamerstats": newStats }}).then((err, records) => {
      return StreamerSchema.findOne({ "channelid":gamer.channel._id }).then((updated) => {
        return updateViewersAndFollowers(updated, gamer).then((updatedstreamer) => {
          return updatedstreamer;
        });
      });
    });
  });
};

export function getStreamerStats(req) {
  if(req.body === 'followers') {
    return StreamerSchema.find().sort({ "totalfollowers": -1 }).limit(6).then((data) => {
      if(data === undefined) { return false; }
      if(data.length < 6) { return 'Not enough records'; }
      return data;
    });
  }
  // if(req.body === 'averageviewers') {
  //   return StreamerSchema.find().sort({ "averageviewers": -1 }).limit(6).then((data) => {
  //     if(data === undefined) {
  //       return false;
  //     }
  //     return data;
  //   });
  // }
  // if(req.body === 'channelviews') {
  //   return StreamerSchema.find().sort({ "totalchannelviews": -1 }).limit(6).then((data) => {
  //     if(data === undefined) {
  //       return false;
  //     }
  //     return data;
  //   });
  // }
};

export function updateViewersAndFollowers(updatedrecord, recentstatresponse) {
  return StreamerSchema.findOne({ "channelid": updatedrecord.channelid }).then((data) => {
    return data.update({  "totalfollowers": recentstatresponse.channel.followers,
                          "totalchannelviews": recentstatresponse.channel.views,
                          "averageviewers": ((updatedrecord.averageviewers + recentstatresponse.viewers) / 2)})
    .then((updatedaverages) => {
        return StreamerSchema.findOne({ "channelid": updatedrecord.channelid }).then((streamer) => {
          return streamer;
        })
      })
  })
}
