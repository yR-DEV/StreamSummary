'use-strict';

export function sortChannelDataIndex(queryData, time) {
    if(time === 'hour') {
        return sortChannelHourData(queryData);
    }
    if(time === 'day') {
        return sortChannelDayData(queryData);
    }

}

export function sortChannelHourData(hourData) {
    console.log('sorting hour data');
    let hours = [];
    if(hourData.length >= 480) {
        for(var i = 0; i <= 7 ; i++) {
            let startingDate;
            let perHourAverage;

            for(var y = 0; y <= 59; y++) {
                if(!perHourAverage && !startingDate) {
                    console.log('8 times');
                    perHourAverage = hourData[0].channels;
                    startingDate = hourData[0].date;
                    hourData.splice(0, 1);
                } else {
                    perHourAverage = Math.floor((perHourAverage += hourData[y].channels) / 2);
                    hourData.splice(0, 1);
                }
            }
            hours.push({date: startingDate, channels: perHourAverage});
        }
        hours.reverse();
        return hours;
    } else {
        return false;
    }
}

export function sortChannelDayData(dayData) {
    let days = [];

    if(dayData.length >= 92160) {
        for(var i = 0; i <= 7; i++) {
            let startingDate;
            let perDayAverage;

            for(var y = 0; y <= 92159; y++) {
                if(!startingDate && !perDayAverage) {
                    startingDate = dayData[0].date;
                    perDayAverage = dayData[0].channels;
                    dayData.splice(0, 1);
                } else {
                    perDayAverage = ((perDayAverage += dayData[y].channels) / 2);
                    dayData.splice(0, 1);
                }
            }
            days.push({date: startingDate, channels: perDayAverage});
        }

        days.reverse();
        return days;
    } else {
        return false;
    }

}
