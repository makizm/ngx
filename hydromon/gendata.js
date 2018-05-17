
// number of entries to produce
let entries = 144;

// increment in secons between samples
let incr = 300;

// File name
const fileName = "data.json";

// DO NOT MODIFY MAST THIS //
const fs = require('fs');

let startDate = new Date(Date.now());

let i = 0;

let data = new Array();

// print first entry before waiting

// setInterval(function() {
//     printData();
//     i++;
//     if(i == entries - 1) process.exit();
// }, incr);

while (i < entries) {
    i++;

    let n = i * incr;

    let nextDate = new Date(startDate);
        nextDate.setSeconds(nextDate.getSeconds() + n);

    let entry = formatData(nextDate);

    data.push(entry);
}

function formatData(date) {
    let tStamp = date || startDate;

    let a1 = randNum();
    let a2 = randNum();
    let a3 = randNum();
    let a4 = randNum();

    let average = Math.floor((a1 + a2 + a3 + a4) / 4);

    return [ tStamp, average ];
}

function randNum() {
    let num = Math.floor(Math.random() * 99);

    if(num < 30) {
        num = 100 - num;
    }

    return num;
}

function saveData() {
    fs.writeFile(fileName, JSON.stringify(data), function(err) {
        if(err) {
            console.log(err);
            return false;
        }
            console.log("Data saved to " + fileName);
    })
}

// console.log(data);
saveData();
