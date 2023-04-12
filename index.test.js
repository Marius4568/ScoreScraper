const axios = require('axios');
const cheerio = require('cheerio');
const index = require('./index');
const { getAllDayScores, scrapeNBAScores } = require('./index');
const { outputCSV } = require('./utils/csvUtils');

jest.mock('axios');
jest.mock('./utils/csvUtils', () => ({
  outputCSV: jest.fn(),
}));

const scrapeNBAScoresSpy = jest.spyOn(index, 'scrapeNBAScores');
const mockHtml = `
  <div class="ScoreboardScoreCell__Competitors">
    <div class="ScoreCell__TeamName">Team A</div>
    <div class="ScoreCell__Score">100</div>
    <div class="ScoreCell__TeamName">Team B</div>
    <div class="ScoreCell__Score">90</div>
  </div>
`;

describe('scrapeNBAScores', () => {
  it('should scrape NBA scores', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: mockHtml,
    });

    const result = await scrapeNBAScores('20230412');
    const expected = [
      {
        team1: {
          name: 'Team A',
          score: '100',
        },
        team2: {
          name: 'Team B',
          score: '90',
        },
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should handle error while fetching data', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await scrapeNBAScores('20230412');

    expect(consoleSpy).toHaveBeenCalledWith('Error: Unable to fetch data from ESPN.', expect.any(Error));
    expect(result).toBeUndefined();

    consoleSpy.mockRestore();
  });
});