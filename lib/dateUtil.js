const zeroPad = (num, places) => String(num).padStart(places, '0');

function toPST(date) {
    return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone: 'PST'
        }),
    );
}

function getNextWeekday(date) {
    var start = new Date(date);
    while (start.getDay() == 0 || start.getDay() == 6) {
        start.setDate(start.getDate() + 1)
    }
    return start;
}

function toFTDateString(date) {
    return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1, 2)}-${zeroPad(date.getDate(), 2)}`;
}

export function getNextWeekdayDateString() {
    return toFTDateString(getNextWeekday(toPST(new Date())));
}