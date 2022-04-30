"use strict";

//! BASE URL
const BASE_URL = "http://api.weatherapi.com/v1";

//! HELPER get FUNCTION
const get = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

//! CURRENT DATA
//! CITY \\
let city = "Berlin";
document.getElementById("current-city").innerText = city.toUpperCase();
//
const getCurrentData = async () => {
  try {
    let data = await get(
      BASE_URL +
        "/current.json?key=fb655837067d4475bd2103341220804&q=" +
        city +
        "&aqi=no"
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
//! CURRENT WEATHER
const setCurrentWeather = async () => {
  const currentWeather = await getCurrentData();

  // TEMPERATUR
  document.getElementById("degree").innerText =
    currentWeather.current.temp_c + " c°";

  // ICON
  document
    .getElementById("icon")
    .setAttribute("src", currentWeather.current.condition.icon);

  // TIME

  document.getElementById("time").innerText =
    currentWeather.location.localtime.slice(10) + "h";
};

//
//! TABLE
let createTable = () => {
  let tbody = document.getElementById("forecast-body");
  let count = 0;
  // create TR
  for (let i = 0; i <= 24 - 1; i++) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", i);
    tbody.appendChild(tr);
    // create TD & content
    for (let j = 0; j <= 4; j++) {
      let td = document.createElement("td");
      td.setAttribute("id", "td-" + j + "-" + count);
      tr.appendChild(td);
      count++;
    }
  }
};
//! FORECAST !\\
//! getter
let getForecastWeather = async () => {
  try {
    let data = await get(
      BASE_URL +
        "/forecast.json?key=fb655837067d4475bd2103341220804&q=Berlin&days=3&aqi=no&alerts=no"
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
//! setter
let setForecastWeather = async () => {
  const forecastWeather = await getForecastWeather();
  const dataPerHour = forecastWeather.forecast.forecastday[0]; // [0]=today [1]=tomrrow [2]=day after tomorrow
  console.log(forecastWeather.forecast);
  let countTemp = 0;
  let countIcon = 1;
  let countRain = 2;
  let countTime = 3;

  // set TEMP
  for (let i = 0; i <= 24 - 1; i++) {
    for (let j = 0; j <= 4; j++) {
      if (countTemp % 5 == 0) {
        let tdPosition = document.getElementById("td-0-" + countTemp);

        tdPosition.innerText = dataPerHour.hour[i].temp_c + "c°";
      }
      countTemp++;
    }
  }

  // set ICON
  for (let i = 0; i <= 24 - 1; i++) {
    for (let j = 1; j <= 1; j++) {
      let tdPosition = document.getElementById("td-1-" + countIcon);
      let icon = dataPerHour.hour[i].condition.icon;
      let img = document.createElement("img");

      img.setAttribute("src", icon);
      tdPosition.setAttribute("class", "text-center");
      tdPosition.appendChild(img);
    }
    countIcon += 5;
  }

  // set RAIN CHANCE
  for (let i = 0; i <= dataPerHour.hour.length - 1; i++) {
    for (let j = 1; j <= 1; j++) {
      let tdPosition = document.getElementById("td-2-" + countRain);
      let rainChance = dataPerHour.hour[i].chance_of_rain;
      tdPosition.setAttribute("class", "text-center");
      tdPosition.innerText = rainChance + "%";
    }
    countRain += 5;
  }
  //set TIME
  for (let i = 0; i <= dataPerHour.hour.length - 1; i++) {
    for (let j = 1; j <= 1; j++) {
      let tdPosition = document.getElementById("td-3-" + countTime);
      let time = dataPerHour.hour[i].time.slice(10);
      tdPosition.setAttribute("class", "text-end");
      tdPosition.innerText = time + "h";
    }
    countTime += 5;
  }
};

// test
// for (let i = 0; i <= 1; i++) {
//   document.getElementById(`${i}`).setAttribute("class", "test");
// }

// to look inside of array
let array = forecast.forecast.forecastday[0].hour;
console.log(array);
