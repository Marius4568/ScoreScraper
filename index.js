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

const getCurrentDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return day;
};

const getAllDayScores = async (year, month, fromDate, toDate ) => {
  console.log('Start')
  const dateArr = ['20230401', '20230408'];
  const allDayScores = await Promise.all(dateArr.map(async (date) => {
    const result = await scrapeNBAScores(date);
    return {
      date,
      result
    };
  }));
  console.log(allDayScores[1].result[0])
  console.log('End')
}

getAllDayScores();