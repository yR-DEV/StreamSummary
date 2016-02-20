'use-strict';

import dateformat from 'dateformat';

import { savedsortedresponse } from './savestreamerstats.controller';
import { streamerisnew, insertnewstreamer, pushnewstreamerstats } from './querystreamerstats.controller';

export function sortstreamerdata() {
  return;
}

export function sortstreamerquerystats(data) {
  data.streams.forEach((gamer) => {
  // var gamer = data[0];
    return streamerisnew(gamer).then((exist) => {
      if(exist === null) {
        return sortnewstreamer(gamer).then((newstreamer) => {
          console.log(newstreamer);
          return newstreamer;
        });
      }
      return sortandpushstreamerstats(gamer).then((updatedUser) => {
        console.log(updatedUser);
        return updatedUser;
      });
    });
  });
};

export function sortnewstreamer(gamer) {
  let now = new Date;
  let newStreamerStats = {
    date: (dateformat(now, "h:MM:ss TT, mm/dd/yyyy, ") +"GMT-0700" ),
    viewers: gamer.viewers,
    followers: gamer.channel.followers,
    channelviews: gamer.channel.views,
    currentgame: gamer.channel.game
  }
  let streamer = {
    channelid: gamer.channel._id,
    channelname: gamer.channel.name,
    channelurl: gamer.channel.url,
    twitchpartner: gamer.channel.partner,
    streamerstats: [newStreamerStats],
  };
  return insertnewstreamer(streamer).then((data) => {
    return data;
  });
};

export function sortandpushstreamerstats(gamer) {
  let now = new Date;
  let newStatSet = {
    date: (dateformat(now, "h:MM:ss TT, mm/dd/yyyy, ") +"GMT-0700" ),
    viewers: gamer.viewers,
    followers: gamer.channel.followers,
    channelviews: gamer.channel.views,
    currentgame: gamer.channel.game
  }
  return pushnewstreamerstats(gamer, newStatSet).then((updated) => {
    console.log(updated);
    return updated;
  })
}
