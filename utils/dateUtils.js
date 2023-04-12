const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return day;
  };

function parseDate(dateString) {
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1; // JavaScript month is 0-indexed
    const day = parseInt(dateString.slice(6, 8), 10);
    return new Date(year, month, day);
  }
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
  
  function dateRange(start, end) {
    const startDate = parseDate(start);
    const endDate = parseDate(end);
    const dateArray = [];
  
    while (startDate <= endDate) {
        dateArray.push(formatDate(startDate));
        startDate.setDate(startDate.getDate() + 1);
    }
  
    return dateArray;
  }

  module.exports = {
    getCurrentDate,
    parseDate,
    formatDate,
    dateRange
  };