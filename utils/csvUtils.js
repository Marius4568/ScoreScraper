const fs = require('fs')

function formatCSV(data) {
    const header = "Date,Team 1,Score 1,Team 2,Score 2\n";
    let csv = header;
  
    data.forEach((item) => {
        const date = item.date;
        const results = JSON.parse(item.result);
  
        results.forEach((result) => {
            const team1Name = result.team1.name;
            const team1Score = result.team1.score;
            const team2Name = result.team2.name;
            const team2Score = result.team2.score;
  
            csv += `${date},${team1Name},${team1Score},${team2Name},${team2Score}\n`;
        });
    });
  
    return csv;
  }

  function outputCSV(data) {
    const csvData = formatCSV(data);
    fs.writeFile('output.csv', csvData, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
  });
  }

  module.exports = {formatCSV, outputCSV};