const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const { dateRange } = require("./utils/dateUtils");

const app = express();
app.use(cors());

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

const getAllDayScores = async (fromDate, toDate) => {
  const dateArr = dateRange(fromDate, toDate);
  const allDayScores = await Promise.all(dateArr.map(async (date) => {
    const result = await scrapeNBAScores(date);
    return {
      date,
      result: JSON.stringify(result)
    };
  }));
  return allDayScores
}

app.get("/scrape", async (req, res) => {
  const startDate = req.query.startdate;
  const endDate = req.query.enddate;

  if (!startDate || !endDate) {
    return res.status(400).send("Both startDate and endDate are required!")
  }

  try {
    const data = await getAllDayScores(startDate, endDate);
    res.status(200).send(JSON.stringify(data))
  } catch (err) {
    console.log(err);
    return res.status(500).send(`server error: ${err.message}`)
  }
})

const PORT = 4000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))

module.exports = { scrapeNBAScores, getAllDayScores };
