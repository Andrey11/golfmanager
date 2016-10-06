'use strict';

export const MonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function getFormattedDate (date) {
  if(!isValidDate(date)) {
    return '';
  }

  date.setUTCSeconds(0);
  let day = date.getDate();
  let month = MonthNames[date.getMonth()];
  let year = date.getFullYear();
  let time = date.toLocaleTimeString();

  return month + ' ' + day + ' ' + year + ' ' + time;
}

export function isValidDate (date) {
  var isValidDate = new Date(date);
  return !isNaN(isValidDate);
}
