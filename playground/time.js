// var date = new Date();
// var months = ['Jan', 'Feb']
// console.log(date.getMonth());
const moment = require('moment');
//
// var date = moment();
// date.add(10, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

var date = moment();
var createdAt = moment(1234);
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
console.log(date.format('h:mm a'));
