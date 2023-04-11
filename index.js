const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs')

const scrapeNBAScores = async (date) => {
  try {
    const response = await axios.get(`https://www.espn.com/nba/scoreboard/_/date/${date}`);

    if (response.status !== 200) {
      console.error("Error: Unable to fetch data from ESPN.");
      return;
    }

    const $ = cheerio.load(response.data);
    const games = [];

    $(".ScoreboardScoreCell__Competitors").each((index, element) => {
      const teams = [];
      const scores = [];

      $(element)
        .find(".ScoreCell__TeamName")
        .each((i, teamElem) => {
          teams.push($(teamElem).text().trim());
        });

      $(element)
        .find(".ScoreCell__Score")
        .each((i, scoreElem) => {
        scores.push($(scoreElem).text());
        });

      games.push({
        team1: {
          name: teams[0],
          score: scores[0],
        },
        team2: {
          name: teams[1],
          score: scores[1],
        },
      });
    });
    return games;
  } catch (error) {
    console.error("Error: Unable to fetch data from ESPN.", error);
  }
};

const allDayScores = [];

const forLoop = async _ => {
  console.log('Start')
  const days = [1,2,3,4,5,6,7,8,9,10,11];
  const allDayScores = await Promise.all(days.map(async (day) => {
    const date = `202304${String(day).padStart(2, '0')}`;
    const result = await scrapeNBAScores(date);
    return {
      day,
      result
    };
  }));
  console.log(allDayScores[1].result[0])
  console.log('End')
}

forLoop();









// const asyncCall = async (item) => {
//   // Your async function logic here
//   console.log(`Async call for item: ${item}`);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`Processed item: ${item}`);
//     }, 1000);
//   });
// };

// async function processItems() {
//   const items = Array.from({ length: 10 }, (_, i) => i + 1);
//   const results = await Promise.all(items.map(async (item) => await asyncCall(item)));
//   console.log('All async calls are completed:', results);
// }

// processItems();

