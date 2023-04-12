const axios = require("axios");
const cheerio = require("cheerio");
const { dateRange } = require("./utils/dateUtils");
const { outputCSV } = require("./utils/csvUtils");

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

const getAllDayScores = async (fromDate, toDate ) => {
  const dateArr = dateRange(fromDate, toDate);
  const allDayScores = await Promise.all(dateArr.map(async (date) => {
    const result = await scrapeNBAScores(date);
    return {
      date,
      result: JSON.stringify(result)
    };
  }));
  console.log(allDayScores)

outputCSV(allDayScores)
}

getAllDayScores('20230315','20230318');