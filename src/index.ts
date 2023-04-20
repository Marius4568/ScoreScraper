import express from "express";
import cors from "cors";
import scrapeRoute from "./routes/scrapeRoute";
import config from "./config";

const app = express();

app.use(cors());
app.use("/scrape", scrapeRoute);

app.listen(config.Port, () =>
  console.log(`server is running on ${config.Port}`)
);
