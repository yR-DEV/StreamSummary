'use-strict';


export function sortChannelHourData(hourdata, time) {


    if(hourdata.length < 480) {
        res.send(false);
    } else {
    req.body.hourData = hourdata;
        return sortHourData(req, res);
    return sortqueriedstats.sortHourData(hourData);
    }
    // console.log('set hour data statType');
    // console.log(data);
    // console.log('sortstats');
    // let type = {type: hourdata.length};
    // let hours = [];
    // for(var i = 0; i <= 7; i++) {
    //     let hourStartingTime;
    //     let perHourAverage;
    //
    //     for(var y = 0; y <= 59; y++) {
    //         if(!perHourAverage) {
    //             if(req.body.statType === 'channels') {
    //                 perHourAverage = req.body.hourData[0].channels;
    //                 hourStartingTime = req.body.hourData[0].date;
    //                 req.body.hourData.splice(0, 1);
    //             } else if (req.body.statType === 'viewers') {
    //                 perHourAverage = req.body.hourData[0].viewers;
    //                 hourStartingTime = req.body.hourData[0].date;
    //                 req.body.hourData.splice(0, 1);
    //             }
    //         } else {
    //             if(req.body.statType === 'channels') {
    //                 perHourAverage = Math.floor((perHourAverage += req.body.hourData[0].channels) / 2);
    //                 req.body.hourData.splice(0, 1);
    //             } else if (req.body.statType === 'viewers') {
    //                 perHourAverage = Math.floor((perHourAverage += req.body.hourData[0].viewers) / 2);
    //                 req.body.hourData.splice(0, 1);
    //             }
    //         }
    //     }
    //     if(req.body.statType === 'channels') {
    //         hours.push({ date: hourStartingTime, channels: perHourAverage });
    //     } else if (req.body.statType === 'viewers') {
    //         hours.push({ date: hourStartingTime, viewers: perHourAverage })
    //     }
    // }
    // hours.reverse();
    // console.log('final hours arr');
    // console.log(hours);
    // return type;
    // res.sendStatus(200).json(type);
    // return type;
}

export function sortChannelDayData(dayData) {
    return 1;
}
