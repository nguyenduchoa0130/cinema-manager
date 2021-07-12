const helper = require('./config/helper');
const date1 = new Date();
const date2 = helper.convertUTCDateToLocalDate(new Date());
console.log('date1', date1);
console.log('date2', date2);