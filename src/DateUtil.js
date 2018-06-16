import * as moment from 'moment';

export function normalizeMarketHistoryByWeek(data, start = null, end = null) {
    let current_week = start;
    if (start === null) {
        current_week = moment();
    }

    let end_week = end;
    if (end === null) {
        end_week = moment(current_week).subtract(10, 'week');
    }

    let weeks = [];

    while (!current_week.isSameOrBefore(end_week, 'week')) {
        let num_counted = 0;
        let week = 0;

        for (let element of data) {
            if (current_week.isSame(element.date, 'week')) {
                num_counted++;
                week = (week * (num_counted - 1)) + element.average;
                week = week / num_counted;

                continue;
            }
        }

        if (week === 0) {
            week = NaN;
        }

        weeks.push({average: week, date: current_week.format('YYYY-MM-DD')});

        week = 0;
        num_counted = 0;
        current_week.subtract(1, 'week');
    }

    return weeks.reverse();
}