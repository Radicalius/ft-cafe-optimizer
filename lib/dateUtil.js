const zeroPad = (num, places) => String(num).padStart(places, '0');

function toPST(date) {
    return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone: 'PST'
        }),
    );
}

function getNextWeekday(date, dir) {
    var start = new Date(date);
    while (start.getDay() == 0 || start.getDay() == 6) {
        start.setDate(start.getDate() + dir)
    }
    return start;
}

function toFTDateString(date) {
    return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1, 2)}-${zeroPad(date.getDate(), 2)}`;
}

export function getNextWeekdayDateString() {
    return toFTDateString(getNextWeekday(toPST(new Date()), 1));
}

export function getDateStringOptions() {
    const days = [];
    var prevDay = toPST(new Date());
    prevDay.setDate(prevDay.getDate() - 1);
    var start = getNextWeekday(prevDay, -1);
    days.push(start);
    for (var i = 0; i < 5; i++) {
        start = toPST(new Date(start));
        start.setDate(start.getDate() + 1);
        start = getNextWeekday(start, 1);
        days.push(start);
    }
    return days.map(x => toFTDateString(x));
}