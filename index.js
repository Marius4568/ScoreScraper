const express = require("express");
const cors = require("cors");
const scrapeRoute = require("./routes/scrapeRoute")

const app = express();
app.use(cors())
app.use("/scrape", scrapeRoute);

const PORT = 4000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))
