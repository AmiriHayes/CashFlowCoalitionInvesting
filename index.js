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

// Code for the login page
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

// Code for the admin page

let pushtoDatabase = (e) => {
    e.preventDefault()
    console.log('got here')
    // window.location.replace("https://amirihayes.com/")

    // document.getElementById('userna').value = ''
    // document.getElementById('passwo').value = ''
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({"username":username,"password":password});
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    // fetch("https://wkijf7fffh.execute-api.us-east-2.amazonaws.com/production", requestOptions)
    // .then(response => response.text())
    // .then(result => {
    //     localStorage.setItem('memberData', JSON.stringify(JSON.parse(result).body))
    //     window.location.href = "member.html";
    // })
    // .catch(error => console.log('error', error));
}

// Code to determine the next meeting (3rd Saturday of month)
const meetingday = document.getElementById("nextMeeting")
let SATURDAY = 6, date = new Date();
let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
dayOfMeeting = SATURDAY - firstDayOfMonth + 15
meetingday.innerHTML = `${date.getMonth() + 1}/${dayOfMeeting}/${String(date.getFullYear()).slice(-2)}`

//Manipulates Table Elements based on screen-size
document.addEventListener('DOMContentLoaded', init);
function init() {
    let query_one = window.matchMedia("(max-width: 800px)");
    let query_two = window.matchMedia("(max-width: 500px)");
    let query_three = window.matchMedia("(min-width: 800px)");

    if (query_one.matches && query_two.matches) {
        for (var i = 0; i < myTable.rows.length; i++) {
            myTable.rows[i].deleteCell(1); //delete date column
            myTable.rows[i].deleteCell(8); //delete %increase
            myTable.rows[i].deleteCell(7); //delete %portfolio
            myTable.rows[i].deleteCell(6); //delete %portfolio
            myTable.rows[i].deleteCell(1); //delete # of stocks
            myTable.rows[i].deleteCell(1); //delete price
            myTable.rows[i].deleteCell(2); //delete current price
            getStockPrices(q1=false, q2=true)
        }
    }

    if (query_one.matches) {
        for (var i = 0; i < myTable.rows.length; i++) {
            myTable.rows[i].deleteCell(1); //delete date column
            myTable.rows[i].deleteCell(8); //delete %increase
            myTable.rows[i].deleteCell(7); //delete %portfolio
            myTable.rows[i].deleteCell(6); //delete %portfolio
            getStockPrices(q1=true, q2=false)
        }
    }

    if (query_three.matches) {
        getStockPrices()
    }
}

var myTable = document.getElementById('table');

currentPrice = []
let getStockPrices = (q1, q2) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    raw = ''
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://cfcicload.us-3.evennode.com/", requestOptions)
    .then(response => response.json())
    .then(data => {
        currentPrice.push(...data.stocks)
        fillOutTable(currentPrice, q1, q2)
    })
}

// Fills in values for the table on homepage; As of 12/1/23 the table is
// 10 across by 20 down. Top and bottom elements are header and foot.

function fillOutTable(currentPrice, q1 = false, q2 = false) {
    if (q2 == true) {
        // myTable.rows[0].cells[1].innerHTML = "Current Price"
        // myTable.rows[0].cells[2].innerHTML = "Current Value"
        shares = [2.00, 16.45, 9, 0.18, 0.11, 15, 0.5, 8, 0.29, 2, 3, 0.02, 4, 0.02, 2, 4, 5, 0.03]
        for (var k = 1; k < myTable.rows.length-1; k++) {
            myTable.rows[k].cells[2].innerHTML = '$' + (currentPrice[k-1] * shares[k-1]).toFixed(2);
        }
        myTable.rows[0].style.display = 'none';
        myTable.rows[19].style.display = 'none';
        // let sum = 0;
        // for (let i = 0; i < currentPrice.length; i++) sum += (currentPrice[i] * shares[i]);
        // myTable.rows[19].cells[2].innerHTML = ''
        // myTable.deleteRow(-1)
        return
    }

    if (q1 == true) {
        for (var k = 1; k < (myTable.rows.length-1); k++) {
            myTable.rows[k].cells[4].innerHTML = '$' + currentPrice[k-1];
        }
    } else {
        for (var k = 1; k < (myTable.rows.length-1); k++) {
            myTable.rows[k].cells[5].innerHTML = '$' + currentPrice[k-1];
        }
    }
    
    var originalPrice = [];
    for (var j = 1; j < (myTable.rows.length-1); j++) {
        originalPrice[j] = myTable.rows[j].cells[3].innerHTML;
    }
    
    // Current Value Column
    var currentValue = [];
    var shares = [];
    
    if (q1) {
        shares = [2.00, 16.45, 9, 0.18, 0.11, 15, 0.5, 8, 0.29, 2, 3, 0.02, 4, 0.02, 2, 4, 5, 0.03]
        for (var m = 1; m < (myTable.rows.length-1); m++) { 
            currentValue[m] = currentPrice[m-1] * shares[m-1];
            myTable.rows[m].cells[5].innerHTML = '$' + currentValue[m].toFixed(2);
        }
        myTable.rows[19].cells[5].innerHTML = '$' + currentValue.reduce((a, b) => a + b, 0).toFixed(2)
        return
    } else {
        for (var j = 1; j < (myTable.rows.length-1); j++) {
            shares[j-1] = myTable.rows[j].cells[2].innerHTML;
        }
        for (var m = 1; m < (myTable.rows.length-1); m++) {
            currentValue[m] = currentPrice[m-1] * shares[m-1];
            myTable.rows[m].cells[6].innerHTML = '$' + currentValue[m].toFixed(2);
        }
    }

    // Current Gain Column
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
    
    // %Increase Column
    var pIncrease = [];
    for (var i = 1; i < (myTable.rows.length-1); i++) {
        pIncrease[i] = ((currentValue[i] - originalCost[i])/(originalCost[i])*100);
        if (pIncrease[i] == -100) {
            myTable.rows[i].cells[8].innerHTML = '0%';
        } else {
            myTable.rows[i].cells[8].innerHTML = pIncrease[i].toFixed(0) + '%';
        }
    }
    
    // Table Totals (Bottom line of Table)
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
    
    // %Portfolio Column
    pPortfolio = [];
    for (var i = 1; i < (myTable.rows.length-1); i++) {
        pPortfolio[i] = ((currentValue[i] / sumcValue)*100);
        if (pPortfolio[i] == -100 || isNaN(pPortfolio[i])) {
            myTable.rows[i].cells[9].innerHTML = '0%';
        } else {
            myTable.rows[i].cells[9].innerHTML = pPortfolio[i].toFixed(2) + '%';
        }
    }
}

function dollarToNum(strIn) {
    var value = strIn.substring(1); // deletes the $ sign
    return Number(value);
}