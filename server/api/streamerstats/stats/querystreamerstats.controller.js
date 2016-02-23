'use-strict';

import fs from 'fs';
import StreamerSchema from '../newstreamer.model';
import { sortstreamerdata, sortstreamersviewersandfollowers } from './sortstreamerstats.controller';

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
        return updateviewersandfollowers(updated, gamer).then((updatedstreamer) => {
          return updatedstreamer;
        });
      });
    });
  });
};

export function getstreamerstats() {
  // if(req.body === 'followers') {
    return StreamerSchema.find().sort({ "totalfollowers": -1 }).limit(6).then((data) => {
      data.forEach(function(streamer) {
        if (streamer.streamerstats.length > 1) {
          console.log('greater than 1');
        }
      })
      // console.log(data);
      return data;
    });
  // };
};

export function updateviewersandfollowers(updatedrecord, recentstatresponse) {
  return StreamerSchema.findOne({ "channelid": updatedrecord.channelid }).then((data) => {
    return data.update({  "totalfollowers": recentstatresponse.channel.followers,
      "totalchannelviews": recentstatresponse.channel.views,
      "averageviewers": ((updatedrecord.averageviewers + recentstatresponse.viewers) / 2)}).then((updatedaverages) => {
        return StreamerSchema.findOne({ "channelid": updatedrecord.channelid }).then((streamer) => {
          return streamer;
        })
      })
  })
}
