const express = require("express");
const cors = require("cors");
const scrapeRoute = require("./routes/scrapeRoute")
const { Port } = require('./config');

const app = express();

app.use(cors())
app.use("/scrape", scrapeRoute);

app.listen(Port, () => console.log(`server is running on ${Port}`))
