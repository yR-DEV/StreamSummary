'use-strict';

export function sortSummaryGraphData(queryData, query) {
    if(query.time === 'hour') {
        return sortHourData(queryData, query);
    }
    if(query.time === 'day') {
        return sortDayData(queryData, query);
    }

}

export function sortHourData(hourData, query) {
    let hours = [];
    const stat = query.statType;
    console.log(  hourData[299], hourData[298]);
    if(hourData.length >= 480) {
      console.log(hourData.length);
        for(var i = 0; i <= 7 ; i++) {
            let startingDate;
            let perHourAverage;
            for(var y = 1; y <= 60; y++) {
                if(!perHourAverage) {
                    perHourAverage = hourData[y][stat];
                    startingDate = hourData[y].date;
                    hourData.splice(0, 1);
                } else {
                    if(hourData[y] === undefined) {
                      console.log('the entry is undefined?');
                    } else {
                      perHourAverage = Math.floor((perHourAverage += hourData[y][stat]) / 2);
                    }
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
        return { false: false, length: hourData.length};
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
                  if(dayData[y] === undefined) {
                    console.log('undefined again');
                  } else {
                    perDayAverage = ((perDayAverage += dayData[y][stat]) / 2);
                    dayData.splice(0, 1);
                  }
                }
            }
            let entry = {date: startingDate};
            entry[stat] = perDayAverage;
            days.push(entry);
        }
        days.reverse();
        return days;
    } else {
        console.log(stat);
        return { false: false, length: dayData.length};
    }
}
