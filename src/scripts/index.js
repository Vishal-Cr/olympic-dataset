const fs = require("fs");
const athleteEvents = require("../../events.json");
const csvToJson = require("convert-csv-to-json");
const nocRegions = csvToJson
  .fieldDelimiter(",")
  .getJsonFromCsv("../../data/noc_regions.csv");
const funcs = require("../scripts/script");

let eventsHostedPerYear = funcs.eventsHostedPerYear(athleteEvents);
let topTenCountriesWithMostMedals = funcs.topTenCountriesWithMostMedals(
  athleteEvents,
  nocRegions
);
let malesAndFemalesPerDecade = funcs.malesAndFemalesPerDecade(athleteEvents);
let averageAgePerSeason = funcs.averageAgePerSeason(athleteEvents);
let medalWinnersFromIndia = funcs.medalWinnersFromIndia(athleteEvents);

let jsonString1 = JSON.stringify(eventsHostedPerYear, null, 4);
let jsonString2 = JSON.stringify(topTenCountriesWithMostMedals, null, 4);
let jsonString3 = JSON.stringify(malesAndFemalesPerDecade, null, 4);
let jsonString4 = JSON.stringify(averageAgePerSeason, null, 4);
let jsonString5 = JSON.stringify(medalWinnersFromIndia, null, 4);

fs.writeFile("../output/getEventsHostedPerYear.json", jsonString1, (err) => {
  if (err) {
    throw err;
  }
  console.log("The file is saved");
});

fs.writeFile(
  "../output/getTopTenCountriesWithMostMedals.json",
  jsonString2,
  (err) => {
    if (err) {
      throw err;
    }
    console.log("The file is saved");
  }
);

fs.writeFile(
  "../output/getMalesAndFemalesPerDecad.json",
  jsonString3,
  (err) => {
    if (err) {
      throw err;
    }
    console.log("The file is saved");
  }
);

fs.writeFile("../output/getAverageAgePerSeason.json", jsonString4, (err) => {
  if (err) {
    throw err;
  }
  console.log("The file is saved");
});

fs.writeFile("../output/getMedalWinnersFromIndia.json", jsonString5, (err) => {
  if (err) {
    throw err;
  }
  console.log("The file is saved");
});
