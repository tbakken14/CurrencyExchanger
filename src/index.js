import CurrencyExchangeService from './exchangeRate';
import './css/styles.css';

function addCodes() {
    CurrencyExchangeService.getCodes().then((data) => {
        addCurrencyOptions(data.supported_codes);
    }).catch((errorMessage) => displayError(errorMessage));
}

function addCurrencyOptions(currencyCodes) {
    currencyCodes = currencyCodes.sort((a, b) => (a[1] > b[1]) * 2 - 1);
    let select = document.getElementById("currency");
    for (const currencyCode of currencyCodes) {
        let option = document.createElement("option");
        select.appendChild(option);
        option.setAttribute("value", currencyCode[0]);
        option.setAttribute("name", currencyCode[1]);
        option.append(currencyCode[1]);
    }
}

function displayError(errorMessage) {
    let body = document.querySelector("body");
    let p = document.createElement("p");
    body.appendChild(p);
    p.append(errorMessage);
}

function handleSubmit(event) {
    event.preventDefault();
    let usdAmount = document.querySelector("form > input").value;
    let currencyCode = document.querySelector("form > select").value;
    console.log(usdAmount, currencyCode);
}

function validateDollarInput(dollarInput) {
    dollarInput.value = /^([1-9]\d*|0|)((?=\.)\.\d{0,2}|)$/.test(dollarInput.value) ?
        dollarInput.value : dollarInput.previousValue;
    dollarInput.previousValue = dollarInput.value;
}

function addDollarInputEventListener() {
    let dollarInput = document.getElementById("dollarInput");
    dollarInput.previousValue = dollarInput.value;
    dollarInput.addEventListener("input", () => validateDollarInput(dollarInput));
}

function addFormSubmitEventListener() {
    let form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
}

addFormSubmitEventListener();
addDollarInputEventListener();
addCodes();