const bill = document.querySelector("#bill-input");
const errMessage = document.querySelectorAll(".error-message");
const tips = document.querySelectorAll(".tip");
const custTip = document.querySelector("#custom-tip");
const nbPeople = document.querySelector("#people-input");
const btnReset = document.querySelector("#reset");


// All the event listeners
bill.addEventListener("input", setBillValue);

tips.forEach((btn) => {
    btn.addEventListener("click", setTipPercent)
});

custTip.addEventListener("input", setCustomTip);

nbPeople.addEventListener("input", setNbOfPeople);

btnReset.addEventListener("click", reset);

// Validate the input with RegEx

function validBill(flt) {
    let rgx = /^[0-9]*\.?[0-9]*$/;
    return rgx.test(flt);
}

function validTip(tip) {
    let rgx = /^[0-9]*$/;
    return rgx.test(tip);
}

function validPeople(ppl) {
    let rgx = /^[0-9]*$/;
    return rgx.test(ppl);
}

// Declaring the variables

let billValue = 0.00;
let tipPercent = 0.15;
let peopleValue = 2;

// All the functions

function setBillValue() {
    if(bill.value.includes(',')) {
        bill.value = bill.value.replace(',', '.');
    }

    if(!validBill(bill.value)) {
        errMessage[0].classList.add("show-error-message");
        setTimeout( function() {
            errMessage[0].classList.remove("show-error-message");
        }, 3000);
        bill.value = 0.0;
    } else {
        billValue = bill.value;
    }

    setTipAmount();

}

function setTipPercent(event) {

    tips.forEach((btn) => {

        // Removing the active state
        btn.classList.remove("active");

        // In order to select only the clicked button, we verify the value
        if(event.target.innerHTML == btn.innerHTML) {
            btn.classList.add("active");
            tipPercent = parseFloat(btn.innerHTML)/100;
            console.log(tipPercent);
        }
    })

    custTip.value = "";
    setTipAmount();

}

function setCustomTip() {

    // Validate the custom tip
    if(!validTip(custTip.value) && custTip.value !== '') {

        errMessage[1].classList.add("show-error-message");

        setTimeout( function() {
            errMessage[1].classList.remove("show-error-message");
        }, 3000);

        tips[2].click();

    } else {

        tipPercent = parseFloat(custTip.value)/100;

        tips.forEach(btn => {
            btn.classList.remove("active");
        })

        setTipAmount();
    }

}

function setNbOfPeople() {

    if(!validPeople(nbPeople.value)) {
        errMessage[2].classList.add("show-error-message");
        setTimeout( function() {
            errMessage[2].classList.remove("show-error-message");
        }, 3000);
        nbPeople.value = 0.0;
    } else {
        peopleValue = nbPeople.value;
    }

    setTipAmount();

}

function setTipAmount() {

    btnReset.removeAttribute("disabled");

    if (peopleValue > 0) {
        let tipAmount = (billValue * tipPercent) / peopleValue;
        let totalAmount = (billValue / peopleValue) + tipAmount;
        document.querySelector("#value-tip").innerHTML = (tipAmount.toFixed(2)+ "$");
        document.querySelector("#value-total").innerHTML = (totalAmount.toFixed(2)+ "$");
    }
}

function reset() {

    bill.value = 0;
    tips[2].click();
    nbPeople.value = 2;

    btnReset.setAttribute("disabled", "true");
}