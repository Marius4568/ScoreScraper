const axios = require("axios");
const cheerio = require("cheerio");

const scrapeNBAScores = async () => {
  try {
    const response = await axios.get("https://www.espn.com/nba/scoreboard");

    if (response.status !== 200) {
      console.error("Error: Unable to fetch data from ESPN.");
      return;
    }

    const $ = cheerio.load(response.data);
    const games = [];

    $(".ScoreCell__Team").each((index, element) => {
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
        //   scores.push(parseInt($(scoreElem).text().trim()));
        scores.push($(scoreElem).text.trim());
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

    // console.log(games);
    console.log(games);
  } catch (error) {
    console.error("Error: Unable to fetch data from ESPN.", error);
  }
};

scrapeNBAScores();