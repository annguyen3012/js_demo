const moment = require('moment');

function isWeekend(dateString) {
    // Write code here...
    let date = moment(dateString);
    return date.isoWeekday() === 6 || date.isoWeekday() === 7;
}

isWeekend('2020-04-03');