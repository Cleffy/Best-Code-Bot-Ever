// Getter method for date formatting in APIquery.js createOn property

const addDateSuffix = (date) => {
    let dateStr = date.toString();
  
    // Gets last character of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  
    return dateStr;
  };
export default (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    // Creates the month object and mapping of month names based on the desired string length.
    const months = {
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: monthLength === 'short' ? 'May' : 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };

    // Creates a date object from the timestamp.
    const dateObj = new Date(timestamp);
    // Gets the month name based on the month value returned by the getMonth() method.
    const formattedMonth = months[dateObj.getMonth()];
    // Gets the day of the month, adding a suffix to it if dateSuffix parameter is set to true.
    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
      // Gets full year.
      const year = dateObj.getFullYear();
  // Gets hours value.  
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() - 12)
      : dateObj.getHours();

  // If hour is 0 (i.e. 12:00am), changes it to read 12.
  if (hour === 0) {
    hour = 12;
  }
  // Formats minutes.
  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

  // Adds am/pm suffix.
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  // Builds timestamp string.
  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};