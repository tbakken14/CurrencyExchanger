import CurrencyExchangeService from './exchangeRate';
import './css/styles.css';

function addCodes() {
    CurrencyExchangeService.getCodes().then((data) => {
        addCurrencyOptions(data.supported_codes);
    });
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

function validateDollarInput(dollarInput) {
    dollarInput.value = /^\$?([1-9]\d*|0|)((?=\.)\.\d{0,2}|)$/.test(dollarInput.value) ?
        dollarInput.value : dollarInput.previousValue;
    dollarInput.previousValue = dollarInput.value;
}

function addEventListeners() {
    let dollarInput = document.getElementById("dollarInput");
    dollarInput.previousValue = dollarInput.value;
    dollarInput.addEventListener("input", () => validateDollarInput(dollarInput));
}