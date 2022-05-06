"use strict";

//! BASE URL
const BASE_URL = "http://api.weatherapi.com/v1";

//! HELPER get FUNCTION
const get = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

//! CITY \\
let cityCurrent = "berlin";
let cityForecast = "berlin";
//? create a default value that is getting replaced
// document.getElementById("current-city").innerText = city.toUpperCase(); // will be replaced with input later
//

//! CURRENT DATA

const getCurrentData = async () => {
  try {
    let data = await get(
      BASE_URL +
        `/current.json?key=fb655837067d4475bd2103341220804&q=" 
        ${cityCurrent}
        "&aqi=no`
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

  // TIME
  document.getElementById("time").innerText =
    currentWeather.location.localtime.slice(10) + "h";
};

//
//! TABLE
let createTable = () => {
  //? get data that is filterd already as a param

  // get ELEMENTS
  let tableForecast = document.getElementById("forecast-data-table");
  let tbody = document.getElementById("forecast-body");
  // create TR
  let count = 0;
  // ! better like this for (let i = 0; i < 23; i++)
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
  tableForecast.appendChild(tbody);
};
//! FORECAST !\\
//! getter
let getForecastWeather = async () => {
  try {
    let data = await get(
      BASE_URL +
        `/forecast.json?key=fb655837067d4475bd2103341220804&q=${cityForecast}&days=3&aqi=no&alerts=no`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

//! setter
let setForecastWeather = async () => {
  const forecastWeather = await getForecastWeather();
  const forecastDay = forecastWeather.forecast.forecastday[0]; // [0]=today [1]=tomrrow [2]=day after tomorrow

  let hours;

  let countTemp = 0;
  let countIcon = 1;
  let countRain = 2;
  let countTime = 3;

  // set TEMP
  for (let i = 0; i <= 24 - 1; i++) {
    for (let j = 0; j <= 4; j++) {
      if (countTemp % 5 == 0) {
        let tdPosition = document.getElementById("td-0-" + countTemp);

        tdPosition.innerText = forecastDay.hour[i].temp_c + "°c";
      }
      countTemp++;
    }
  }

  // set ICON
  for (let i = 0; i <= forecastDay.hour.length - 1; i++) {
    for (let j = 1; j <= 1; j++) {
      let tdPosition = document.getElementById("td-1-" + countIcon);
      let icon = forecastDay.hour[i].condition.icon;
      let img = document.createElement("img");

      img.setAttribute("src", icon);
      tdPosition.setAttribute("class", "text-center");
      tdPosition.appendChild(img);
    }
    countIcon += 5;
  }

  // set RAIN CHANCE
  for (let i = 0; i <= forecastDay.hour.length - 1; i++) {
    for (let j = 1; j <= 1; j++) {
      let tdPosition = document.getElementById("td-2-" + countRain);
      let rainChance = forecastDay.hour[i].chance_of_rain;
      tdPosition.setAttribute("class", "text-center");
      tdPosition.innerText = rainChance + "%";
    }
    countRain += 5;
  }
  //set TIME
  for (let i = 0; i <= forecastDay.hour.length - 1; i++) {
    for (let j = 1; j <= 1; j++) {
      let tdPosition = document.getElementById("td-3-" + countTime);
      let time = forecastDay.hour[i].time.slice(10);
      tdPosition.setAttribute("class", "text-end");
      tdPosition.innerText = time + "h";
    }
    countTime += 5;
  }
};
// ! generally speaking is good that you have a getWeather() function and a setWeather() function, but you can see how complex it got to
// ! select the appropiate cells of the table and fill them with the right data. It would have been better to directly create and set the
// ! table cells. also, remember that everytime you access the DOM, you are making a quite "expensive" operation.

// to look inside of array's
let ArrayHour = testData.forecast.forecastday[0].hour;
console.log(ArrayHour);
// i want to only display

let dTest = new Date(ArrayHour[0].time);

console.log(dTest);
console.log(dTest.getHours());
let dTestHour = dTest.getHours();
console.log("this is the hour" + "-" + dTestHour);

let datatest = ArrayHour.splice(10, 6);
console.log(datatest);

//test for checkbox
let input1 = document.getElementById("one-day");
let input2 = document.getElementById("two-day");
let testi = testData.forecast.forecastday;
console.log(testi);

// input1.addEventListener("change", function () {
//   if (input1.checked) {
//     console.log(testi[1]);
//   } else {
//     console.log("this is off");
//   }
// });

// let radio = document.getElementsByName("choose-days");

// console.log(radio);
// let indexpos;
// let num;
// for (var i = 0, max = radio.length; i < max; i++) {
//   radio[i].onchange = function () {
//     console.log(this.value);
//     indexpos = this.value;
//     console.log(indexpos);
//     num = parseInt(indexpos);
//     console.log(num);
//     console.log(testData.forecast.forecastday[num]);
//   };
// }
// console.log(indexpos);
// console.log(num);
// console.log(testData.forecast.forecastday[num]);
