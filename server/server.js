const express = require("express");
const cors = require("cors");

const path = require("path");
const app = express();


const getEventsHostedPerYear = require("../src/output/getEventsHostedPerYear.json");
const AverageNumberOfMaleFemale = require("../src/output/getMalesAndFemalesPerDecade.json");
const topTenCountries = require("../src/output/getTopTenCountriesWithMostMedals.json");
const AverageAgePerYear = require("../src/output/getAverageAgePerSeason.json");
const MedalWinnersFromIndia = require("../src/output/getMedalWinnersFromIndia.json");

const chartsDirectoryPath = path.join(__dirname, "../package/dist");
const jsonDirectoryPath = path.join(__dirname, "../client");

app.use(express.static(chartsDirectoryPath));
app.use(cors());
app.use(express.static(jsonDirectoryPath));

app.get("/getEventsHostedPerYear.json", (req, res) => {
  res.header("Content-Type", "application/json");

  res.send(JSON.stringify(getEventsHostedPerYear));
});
app.get("/getTopTenCountriesWithMostMedals.json", (req, res) => {
  res.header("Content-Type", "application/json");
  res.json(JSON.stringify(topTenCountries));
});
app.get("/getMalesAndFemalesPerDecade.json", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(AverageNumberOfMaleFemale));
});
app.get("/getMedalWinnersFromIndia.json", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(MedalWinnersFromIndia));
});
app.get("/getAverageAgePerSeason.json", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(AverageAgePerYear));
});

app.listen(process.env.PORT || 3000, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
