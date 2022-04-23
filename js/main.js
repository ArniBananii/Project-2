"use strict";

// let logo = document.getElementById("logo");
// let dataField = newData.current.condition.icon; //! doesnt work cuz its a literal string?
let dataValue = newData.current.temp_c; // logo.appendChild(dataField);

document.getElementById("logo").innerHTML = dataValue + " c°";
console.log(logo);

let testValues = Object.keys(newData.current.condition); //! Turns the object keys into an array
console.log(testValues);

testValues = newData.current.condition; //! Turns the object values into an array
console.log(testValues);

//! I can now turn requested data into array and loop over it if i want!
