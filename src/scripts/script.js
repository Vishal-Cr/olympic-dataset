const csvToJson = require("convert-csv-to-json");
const athleteEvents = require("../../events.json");
const nocRegions = csvToJson
  .fieldDelimiter(",")
  .getJsonFromCsv("../../data/noc_regions.csv");

function topTenCountriesWithMostMedals(athleteEvents) {
  let allCountriesWithMedalsWon = athleteEvents.reduce((acc, curr) => {
    if (parseInt(curr.Year) > 2000) {
      if (!acc.hasOwnProperty(curr.Team)) {
        acc[curr.Team] = {};
        acc[curr.Team]["Gold"] = 0;
        acc[curr.Team]["Silver"] = 0;
        acc[curr.Team]["Bronze"] = 0;
        if (curr.Medal === "Gold") {
          acc[curr.Team]["Gold"] = 1;
        } else if (curr.Medal === "Silver") {
          acc[curr.Team]["Silver"] = 1;
        } else if (curr.Medal === "Bronze") {
          acc[curr.Team]["Bronze"] = 1;
        }
      } else {
        if (curr.Medal === "Gold") {
          acc[curr.Team]["Gold"] += 1;
        } else if (curr.Medal === "Silver") {
          acc[curr.Team]["Silver"] += 1;
        } else if (curr.Medal === "Bronze") {
          acc[curr.Team]["Bronze"] += 1;
        }
      }
    }
    return acc;
  }, {});

  for (let prop in allCountriesWithMedalsWon) {
    allCountriesWithMedalsWon[prop]["winnings"] =
      allCountriesWithMedalsWon[prop]["Gold"] +
      allCountriesWithMedalsWon[prop]["Silver"] +
      allCountriesWithMedalsWon[prop]["Bronze"];
  }

  let topTenCountriesWithMedalsWon = Object.keys(allCountriesWithMedalsWon)
    .sort(
      (a, b) =>
        allCountriesWithMedalsWon[b]["winnings"] -
        allCountriesWithMedalsWon[a]["winnings"]
    )
    .slice(0, 10)
    .reduce((acc, curr) => {
      acc[curr] = allCountriesWithMedalsWon[curr];
      return acc;
    }, {});
  for (let prop in topTenCountriesWithMedalsWon) {
    delete topTenCountriesWithMedalsWon[prop].winnings;
  }
  return topTenCountriesWithMedalsWon;
}
//events hosted;
function eventsHostedPerYear(athleteEvents) {
  return athleteEvents.reduce((acc, cur) => {
    if (!acc.hasOwnProperty(cur.Year)) {
      acc[cur.Year] = {};
      acc[cur.Year]["hosted"] = 1;
    } else {
      acc[cur.Year]["hosted"] += 1;
    }
    return acc;
  }, {});
}
//Males and Females per Decade;
const malesAndFemalesPerDecade = (athleteEvents) => {
  let x = athleteEvents.reduce((acc, cur) => {
    if (!acc.hasOwnProperty(cur.Year)) {
      acc[cur.Year] = {};

      acc[cur.Year][cur.Sex] = 1;
    } else {
      if (acc[cur.Year].hasOwnProperty(cur.Sex)) {
        acc[cur.Year][cur.Sex] += 1;
      } else {
        acc[cur.Year][cur.Sex] = 1;
      }
    }

    return acc;
  }, {});

  let newObj = {};

  for (let prop in x) {
    var decade = `${prop.substring(0, 3)}0-${prop.substring(0, 3)}9`;

    if (!newObj.hasOwnProperty(decade)) {
      newObj[decade] = x[prop];
    } else {
      newObj[decade]["M"] += x[prop].hasOwnProperty("M") ? x[prop]["M"] : 0;
      newObj[decade]["F"] += x[prop].hasOwnProperty("F") ? x[prop]["F"] : 0;
    }
  }

  return newObj;
};

//Medal Winners from India
function medalWinnersFromIndia(athleteEvents) {
  return athleteEvents.reduce((acc, cur) => {
    if (cur.Team === "India" && cur.Medal !== "NA") {
      if (!acc.hasOwnProperty(cur.Season)) {
        acc[cur.Season] = {};
        acc[cur.Season]["winners"] = [];
        if (acc[cur.Season]["winners"].indexOf(cur.Name) === -1) {
          acc["Summer"]["winners"].push({
            // id:
            // Date.now().toString(36) + Math.random().toString(36).substring(2),
            name: cur["Name"],
            age: cur["Age"],
            sex: cur["Sex"],
            medal: cur["Medal"],
            season: cur["Season"],
            year: cur["Year"],
          });
        }
      } else {
        if (acc[cur.Season]["winners"].indexOf(cur.Name) === -1) {
          acc["Summer"]["winners"].push({
            // id:
            // Date.now().toString(36) + Math.random().toString(36).substring(2),
            name: cur["Name"],
            age: cur["Age"],
            sex: cur["Sex"],
            medal: cur["Medal"],
            season: cur["Season"],
            year: cur["Year"],
          });
        }
      }
    }
    return acc;
  }, {});
}
function averageAgePerSeason(athleteEvents) {
  let athleteAges = athleteEvents.reduce((acc, entries) => {
    if (entries.Event && !isNaN(entries.Age)) {
      if (!acc.hasOwnProperty(entries.Year)) {
        acc[entries.Year] = {};
        acc[entries.Year]["Event"] = {};
        acc[entries.Year]["Event"] = [entries.Event];

        acc[entries.Year]["sumOfAges"] = parseInt(entries.Age);
        acc[entries.Year]["numOfPlayers"] = 1;
      } else {
        acc[entries.Year]["sumOfAges"] += parseInt(entries.Age);
        acc[entries.Year]["numOfPlayers"] += 1;
      }
    }
    return acc;
  }, {});

  for (let avgData in athleteAges) {
    athleteAges[avgData]["AverageAge"] = Math.floor(
      athleteAges[avgData]["sumOfAges"] / athleteAges[avgData]["numOfPlayers"]
    );
  }

  return athleteAges;
}
module.exports = {
  eventsHostedPerYear: eventsHostedPerYear,
  topTenCountriesWithMostMedals: topTenCountriesWithMostMedals,
  malesAndFemalesPerDecade: malesAndFemalesPerDecade,
  averageAgePerSeason: averageAgePerSeason,
  medalWinnersFromIndia: medalWinnersFromIndia,
};
