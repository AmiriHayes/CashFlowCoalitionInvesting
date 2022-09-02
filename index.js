//Code for the hamburger menu

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})


//Fill in values for the table on homepage; As of 9/1/22 the table is
//10 across by 20 down. Top and bottom elements are header and foot.

var myTable = document.getElementById('table');

//Current Price Column
currentPrice = [];
for (var j = 1; j < (myTable.rows.length-1); j++) {
    currentPrice[j] = '0';
    myTable.rows[j].cells[5].innerHTML = '$' + currentPrice[j];
}

//Current Value Column
currentValue = [];
shares = [];
for (var j = 1; j < (myTable.rows.length-1); j++) {
    shares[j] = myTable.rows[j].cells[2].innerHTML;
}
for (var j = 1; j < (myTable.rows.length-1); j++) {
    currentValue[j] = currentPrice[j] * shares[j];
    myTable.rows[j].cells[6].innerHTML = '$' + currentValue[j].toFixed(2);
}

//Current Gain Column
currentGain = [];
originalCost = [];
for (var i = 1; i < (myTable.rows.length-1); i++) {
    originalCost[i] = dollarToNum(myTable.rows[i].cells[4].innerHTML);
}
for (var i = 1; i < (myTable.rows.length-1); i++) {
    currentGain[i] = currentValue[i] - originalCost[i];
    if (currentGain[i] == originalCost[i] * -1) {
        myTable.rows[i].cells[7].innerHTML = '$0';
    } else {
        myTable.rows[i].cells[7].innerHTML = '$' + currentGain[i].toFixed(2);
    }
}

//%Increase Column
pIncrease = [];
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
