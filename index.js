//Code for the hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

//Code for the login page
const loginButton = document.getElementById("loginButton")
const loginErrorMsg = document.getElementById("loginErrorMsg")

let login = (username,password)=>{
    document.getElementById('userna').value = ''
    document.getElementById('passwo').value = ''
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"username":username,"password":password});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://wkijf7fffh.execute-api.us-east-2.amazonaws.com/production", requestOptions)
    .then(response => response.text())
    .then(result => {
        localStorage.setItem('memberData', JSON.stringify(JSON.parse(result).body))
        window.location.href = "member.html";
    })
    .catch(error => console.log('error', error));
}

// JSON.parse(result).body
//Fill in values for the table on homepage; As of 12/1/23 the table is
//10 across by 20 down. Top and bottom elements are header and foot.

//Manipulates Table Elements based on screen-size
document.addEventListener('DOMContentLoaded', init);
function init() {
    let query_one = window.matchMedia("(max-width: 800px)");
    let query_two = window.matchMedia("(max-width: 500px)");
    if (query_one.matches) {
        for (var i = 0; i < myTable.rows.length; i++) {
            myTable.rows[i].deleteCell(1); //delete date column
            myTable.rows[i].deleteCell(8); //delete %increase
            myTable.rows[i].deleteCell(7); //delete %portfolio
            myTable.rows[i].deleteCell(6); //delete %portfolio
        }
    }
    if (query_two.matches) {
        for (var i = 0; i < myTable.rows.length; i++) {
            myTable.rows[i].deleteCell(1); //delete # of stocks
            myTable.rows[i].deleteCell(1); //delete price
            myTable.rows[i].deleteCell(2); //delete current price
        }
    }
}

/*Gets the stock data from CSV file which constantly updates (YOUTUBE)
const fs = require("fs");
const csv = require('csvtojson');
(async () => {
    var price_data = await csv().fromFile("datasheet.csv");
    console.log(price_data);
})();*/

/*Gets the stock data from CSV file which constantly updates (GEEKSFORGEEKS)
const fs = require("fs");
csv = fs.readFileSync("datasheet.csv");
var price_data = csv.toString().split("\r");*/

var myTable = document.getElementById('table');

//Initializes currentPrice array using Python CSV data
var currentPrice = [89.0, 146.71, 100.3, 146.71, 100.3, 42.83, 42.83, 50.18, 50.18, 110.52, 100.46, 100.46, 249.22, 249.22, 73.93, 91.16, 110.98, 110.98];
for (var k = 1; k < (myTable.rows.length-1); k++) {
    myTable.rows[k].cells[5].innerHTML = '$' + currentPrice[k-1].toFixed(2);
}

var originalPrice = [];
for (var j = 1; j < (myTable.rows.length-1); j++) {
    originalPrice[j] = myTable.rows[j].cells[3].innerHTML;
}

//Current Value Column
var currentValue = [];
var shares = [];
for (var j = 1; j < (myTable.rows.length-1); j++) {
    shares[j-1] = myTable.rows[j].cells[2].innerHTML;
}
for (var m = 1; m < (myTable.rows.length-1); m++) {
    currentValue[m] = currentPrice[m-1] * shares[m-1];
    myTable.rows[m].cells[6].innerHTML = '$' + currentValue[m].toFixed(2);
}

//Current Gain Column
var currentGain = [];
var originalCost = [];
for (var i = 1; i < (myTable.rows.length-1); i++) {
    originalCost[i] = dollarToNum(myTable.rows[i].cells[4].innerHTML);
}
for (var i = 1; i < (myTable.rows.length-1); i++) {
    currentGain[i] = currentValue[i] - originalCost[i];
    if (currentGain[i] == originalCost[i] * -1) {
        myTable.rows[i].cells[7].innerHTML = '$0.00';
    } else {
        myTable.rows[i].cells[7].innerHTML = '$' + currentGain[i].toFixed(2);
    }
}

//%Increase Column
var pIncrease = [];
for (var i = 1; i < (myTable.rows.length-1); i++) {
    pIncrease[i] = ((currentValue[i] - originalCost[i])/(originalCost[i])*100);
    if (pIncrease[i] == -100) {
        myTable.rows[i].cells[8].innerHTML = '0%';
    } else {
        myTable.rows[i].cells[8].innerHTML = pIncrease[i].toFixed(0) + '%';
    }
}

//Table Totals (Bottom line of Table)
var sumCost = 0;
var sumcPrice = 0;
var sumcValue = 0;
var sumcGain = 0;
for (var i = 1; i < myTable.rows.length; i++) {
    sumCost += dollarToNum(myTable.rows[i].cells[4].innerHTML);
    sumcPrice += dollarToNum(myTable.rows[i].cells[5].innerHTML);
    sumcValue += dollarToNum(myTable.rows[i].cells[6].innerHTML);
    sumcGain += dollarToNum(myTable.rows[i].cells[7].innerHTML);
}

myTable.rows[19].cells[4].innerHTML = "$" + sumCost.toFixed(2);
myTable.rows[19].cells[5].innerHTML = '$' + sumcPrice.toFixed(2); 
myTable.rows[19].cells[6].innerHTML = '$' + sumcValue.toFixed(2);
myTable.rows[19].cells[7].innerHTML = '$' + sumcGain.toFixed(2);

//%Portfolio Column
pPortfolio = [];
for (var i = 1; i < (myTable.rows.length-1); i++) {
    pPortfolio[i] = ((currentValue[i] / sumcValue)*100);
    if (pPortfolio[i] == -100 || isNaN(pPortfolio[i])) {
        myTable.rows[i].cells[9].innerHTML = '0%';
    } else {
        myTable.rows[i].cells[9].innerHTML = pPortfolio[i].toFixed(2) + '%';
    }
}

function dollarToNum(strIn) {
    var value = strIn.substring(1); // deletes the $ sign
    return Number(value);
}