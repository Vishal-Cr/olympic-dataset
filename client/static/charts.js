const serverUrl = `http://127.0.0.1:${process.env.PORT}`;
fetch(serverUrl + "getEventsHostedPerYear.json")
  .then((response) => response.json())
  .then((data) => {
    chartForEventsHostedPerYear(data);
  });

fetch(serverUrl + "getTopTenCountriesWithMostMedals.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    chartForTopTenCountriesWithMostMedals(data);
  });

fetch(serverUrl + "getMalesAndFemalesPerDecade.json")
  .then((response) => response.json())
  .then((data) => {
    chartForMalesAndFemalesPerDecade(data);
  });

fetch(serverUrl + "getAverageAgePerSeason.json")
  .then((response) => response.json())
  .then((data) => {
    chartForAverageAgePerYear(data);
  });

fetch(serverUrl + "getMedalWinnersFromIndia.json")
  .then((response) => response.json())
  .then((data) => {
    medalsWinnersIndia(data);
  });
Chart.defaults.color = "#fff";
const eventsPerYear = document.getElementById("eventsHostedPerYear");

const topCountriesWithMedalsWon = document
  .getElementById("topTenCountriesWithMostMedals")
  .getContext("2d");

const AverageAgePerYear = document.getElementById("AverageAgePerYear");

const malesAndFemalesOverDecade = document.getElementById(
  "malesAndFemalesPerDecade"
);

const IndianMedalWinners = document.getElementById("medalWinnersFromIndia");

function chartForEventsHostedPerYear(eventsHostedPerYear) {
  const data = Object.keys(eventsHostedPerYear).reduce((acc, cur) => {
    acc.push({
      name: cur,
      y: eventsHostedPerYear[cur],
    });
    return acc;
  }, []);
  // Chart.defaults.global.defaultFontColor = "#fff";
  let hostedData = data.map((item) => item.y["hosted"]);
  const myChart = new Chart(eventsPerYear, {
    type: "line",
    data: {
      datasets: [
        {
          data: hostedData,
          label: "Number of Events Hosted",

          normalized: true,
          hitRadius: 3,
          backgroundColor: "yellow",
          borderColor: "#337def",
          tension: 0.1,
          radius: 4,
          borderWidth: 1,
          borderCapStyle: "butt",
          pointStyle: "circle",
          hoverRadius: 8,
        },
      ],
      labels: data.map((item) => item.name),
    },
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 32);

              return {
                weight: "bold",
                size: size,
              };
            },
          },
        },
      },

      responsive: true,
    },
  });
}

//Top ten countries with most medals
function chartForTopTenCountriesWithMostMedals(topCountriesWithMedals) {
  let parsedData = JSON.parse(topCountriesWithMedals);
  const dataObj = Object.keys(parsedData).reduce((acc, cur) => {
    acc.push({
      country: cur,
      medals: [
        {
          Gold: parsedData[cur]["Gold"],
          Silver: parsedData[cur]["Silver"],
          Bronze: parsedData[cur]["Bronze"],
        },
      ],
    });
    return acc;
  }, []);
  console.log(dataObj);
  const myBarChart = new Chart(topCountriesWithMedalsWon, {
    type: "bar",
    label: "Top Ten Countries With Most Medals",
    data: {
      labels: dataObj.map((item) => item["country"]),
      datasets: [
        {
          label: "Gold",
          data: dataObj.map((item) => item["medals"][0]["Gold"]),
          backgroundColor: "#f7e069",
          borderColor: "rgb(255,250,240)",
          borderWidth: 1,
          hoverBorderWidth: 4,
        },
        {
          label: "Silver",
          data: dataObj.map((item) => item["medals"][0]["Silver"]),
          backgroundColor: "#308eff",
          borderColor: "silver",
          borderWidth: 1,
          hoverBorderWidth: 4,
        },
        {
          label: "Bronze",
          data: dataObj.map((item) => item["medals"][0]["Bronze"]),
          backgroundColor: "#ff65c3",
          borderColor: "#AD8A56",
          borderWidth: 1,
          hoverBorderWidth: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 32);

              return {
                weight: "bold",
                size: size,
              };
            },
          },
        },
      },
    },
    responsive: true,
    resizeDelay: 2,
    maintainAspectRatio: false,
  });
}

//Males And Females Over a Decade

const chartForMalesAndFemalesPerDecade = (malesAndFemalesData) => {
  const data = Object.keys(malesAndFemalesData).reduce((acc, cur) => {
    acc.push({
      Decade: cur,
      numberOfParticipants: {
        M: malesAndFemalesData[cur]["M"],
        F: malesAndFemalesData[cur]["F"],
      },
    });
    return acc;
  }, []);

  let values = data.map((item) => item["Decade"]);

  let select = document.createElement("select");
  select.name = "Decade";
  select.id = "Decade";

  for (const val of values) {
    let option = document.createElement("option");
    option.setAttribute("id", "optionValue");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }

  let label = document.createElement("label");
  label.innerHTML = "Choose Decade: ";
  label.htmlFor = "Decade";

  document.getElementById("dropdown").appendChild(label).appendChild(select);

  let chosenDecadeDataIndex = 0;

  let datasetData = [
    data[chosenDecadeDataIndex]["numberOfParticipants"]["M"],
    data[chosenDecadeDataIndex]["numberOfParticipants"]["F"],
  ];

  document.getElementById("Decade").addEventListener("change", (e) => {
    chosenDecade = e.target.value;

    chosenDecadeDataIndex = values.indexOf(
      values.find((element) => element == e.target.value)
    );
    datasetData = [
      data[chosenDecadeDataIndex]["numberOfParticipants"]["M"],
      data[chosenDecadeDataIndex]["numberOfParticipants"]["F"],
    ];
    makeChart();
  });

  let myPieChart = new Chart(malesAndFemalesOverDecade, {
    type: "pie",
    label: "Average age of males and females over a decade",
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "My First Dataset",
          data: datasetData,
          backgroundColor: ["#0086ff", "#ff5cc6"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 32);

              return {
                weight: "bold",
                size: size,
              };
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 4,
    },
  });

  function makeChart() {
    myPieChart.destroy();
    myPieChart = new Chart(malesAndFemalesOverDecade, {
      type: "pie",
      label: "Average age of males and females over a decade",
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Average age dataset",
            data: datasetData,
            backgroundColor: ["#0086ff", "#ff5cc6"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: function (context) {
                let width = context.chart.width;
                let size = Math.round(width / 32);

                return {
                  weight: "bold",
                  size: size,
                };
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 4,
      },
    });
  }
};
function chartForAverageAgePerYear(AverageAgeData) {
  const data = Object.keys(AverageAgeData).reduce((acc, cur) => {
    acc.push({
      Year: cur,
      AverageAge: AverageAgeData[cur]["AverageAge"],
    });
    return acc;
  }, []);

  const myBarChart = new Chart(AverageAgePerYear, {
    type: "bar",
    label: "Average Age per Decade",
    data: {
      labels: data.map((item) => item["Year"]),
      datasets: [
        {
          label: "Average Age",
          data: data.map((item) => item["AverageAge"]),
          backgroundColor: "#125c4a",
          borderColor: "lightBlue",
          borderWidth: 1,
          hoverBorderWidth: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 32);

              return {
                weight: "bold",
                size: size,
              };
            },
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 2,
  });
}

function medalsWinnersIndia(winnersData) {
  $(document).ready(function () {
    $("table").bootstrapTable({
      data: winnersData["Summer"]["winners"],
    });
  });

  let html = "";
  html += `<table class='table  table-striped table-hover table-sm'
  cellspacing="0" 
  data-show-columns="true"
  data-show-toggle="true"
  data-search="true",
  data-resizable='true',
  data-pagination="true"
  data-key-events="true"
  data-mobile-responsive="true",
  

  
  > \n`;
  html += `<thead class='table-primary'>\n`;
  html += `<tr>\n`;

  html += `<th class='th-sm'data-field="name"data-sortable="true">Name<small>(click to Sort)</small> </th>\n`;
  html += `<th class='th-sm'data-field="age" data-sortable='true'>AGE</th>\n`;
  html += `<th class='th-sm'data-field="sex" data-sortable='true'>Sex</th>\n`;
  html += `<th class='th-sm'data-field="medal">Medal</th>\n`;
  html += `<th class='th-sm'data-field="season" data-sortable="true">Season</th>\n`;
  html += `<th class='th-sm'data-field="year"data-sortable="true">Year</th>\n`;

  html += `</tr>\n`;
  html += `</thead>\n`;
  html += `</thead>\n`;

  document.getElementById("medalWinnersFromIndia").innerHTML = html;
}
