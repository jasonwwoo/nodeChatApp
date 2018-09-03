const moment = require("moment");

// var date = moment();
// date.add(1, "month").add(1, "day");
// console.log(date.format("MMM Do, YYYY"));

var date = moment(123).format("MMM YY Do h:m a");
console.log(date);
