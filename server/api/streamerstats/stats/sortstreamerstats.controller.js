'use-strict';

import dateformat from 'dateformat';

import { savedsortedresponse } from './savestreamerstats.controller';
import { streamerisnew, insertnewstreamer } from './querystreamerstats.controller';

export function sortstreamerdata() {
  return '9';
}

export function sortstreamerquerystats(data) {
  // console.log('STREAMER NAME');
  // console.log(data.streams[0].channel.name);
  data.streams.forEach((gamer) => {
    return streamerisnew(gamer).then((exist) => {
      if(exist === null) {
        return sortnewstreamer(gamer).then((newstreamer) => {
          console.log(newstreamer);
          return newstreamer;
        });
      }
      //return
    })
  })
}

export function sortnewstreamer(gamer) {
  let now = new Date;
  let streamer = {
    channelid: gamer.channel._id,
    channelname: gamer.channel.name,
    channelurl: gamer.channel.url,
    twitchpartner: gamer.channel.partner,
    streamerstats: [{
      date: (dateformat(now, "h:MM:ss TT, mm/dd/yyyy, ") +"GMT-0700" ),
      viewers: gamer.viewers,
      followers: gamer.channel.followers,
      channelviews: gamer.channel.views
    }],
  };
  return insertnewstreamer(streamer).then((data) => {
    return data;
  })
}

export function sortnewstreamerstats(gamer) {
  let now = new Date;
  let newStats = {
    date: (dateformat(now, "h:MM:ss TT, mm/dd/yyyy, ") +"GMT-0700" ),
    viewers: gamer.viewers,
    followers: gamer.channel.followers,
    channelviews: gamer.channel.views
  }
}
