'use-strict';

export function sortsummarygraphdata(queryData, query) {
    if(query.time === 'hour') {
        return sortHourData(queryData, query);
    }
    if(query.time === 'day') {
        return sortDayData(queryData, query);
    }

}

export function sortHourData(hourData, query) {
    console.log('sorting hour data');
    let hours = [];
    const stat = query.statType;
    if(hourData.length >= 480) {
        for(var i = 0; i <= 7 ; i++) {
            let startingDate;
            let perHourAverage;
            for(var y = 0; y <= 59; y++) {
                if(!perHourAverage && !startingDate) {
                    console.log('8 times');
                    perHourAverage = hourData[0][stat];
                    startingDate = hourData[0].date;
                    hourData.splice(0, 1);
                } else {
                    perHourAverage = Math.floor((perHourAverage += hourData[y][stat]) / 2);
                    hourData.splice(0, 1);
                }
            }
            let entry = {date: startingDate};
            entry[stat] = perHourAverage;
            hours.push(entry);
        }
        hours.reverse();
        return hours;
    } else {
        return false;
    }
}

export function sortDayData(dayData, query) {
    let days = [];
    let stat = query.statType;
    if(dayData.length >= 92160) {
        for(var i = 0; i <= 7; i++) {
            let startingDate;
            let perDayAverage;
            for(var y = 0; y < 92159; y++) {
                if(!startingDate && !perDayAverage) {
                    startingDate = dayData[0].date;
                    perDayAverage = dayData[0][stat];
                    dayData.splice(0, 1);
                } else {
                    perDayAverage = ((perDayAverage += dayData[y][stat]) / 2);
                    dayData.splice(0, 1);
                }
            }
            let entry = {date: startingDate};
            entry[stat] = perDayAverage;
            days.push(entry);
        }
        days.reverse();
        return days;
    } else {
        return false;
    }

}
