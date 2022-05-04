let createTableTest = (days, hours) => {
  // a function that creates a table no mattter what
  //? get data that is filterd already as a param

  const rowNum = 4;
  let colNum = hours;
  // get ELEMENTS

  let div = document.getElementById("div");
  let count = 0;
  //create tbody
  for (let t = 0; t <= days; t++) {
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    table.setAttribute("id", "table-day-" + t);
    table.setAttribute("class", "col table-bordered");
    tbody.setAttribute("id", "tbody-" + t);
    table.appendChild(tbody);
    div.appendChild(table);
    // create TR
    for (let i = 0; i <= colNum - 1; i++) {
      let tr = document.createElement("tr");
      tr.setAttribute("id", "tr-" + t + "-" + i);
      tbody.appendChild(tr);
      // create TD & content
      for (let j = 0; j <= rowNum; j++) {
        let td = document.createElement("td");
        td.setAttribute("id", "td-" + j + "-" + count);
        tr.appendChild(td);
        count++;
      }
    }
  }
};
createTableTest(3, 24);

// params (days,hour)
// days = amount of tables
// hours = amount of rows

const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const filtered = hours.filter((value) => {
  return value >= 15 && value <= 18;
});

console.log(filtered);

var radios = document.forms["formA"].elements["myradio"];
for (var i = 0, max = radios.length; i < max; i++) {
  radios[i].onclick = function () {
    alert(this.value);
  };
}
