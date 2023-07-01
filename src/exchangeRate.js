
export default class CurrencyExchangeService {
    static getCodes() {
        return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
            .then((response) => this.handleResponse(response));

    }
    static getConversion(targetCurrency, amount) {
        const baseCurrency = "USD";
        return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${baseCurrency}/${targetCurrency}/${amount}`)
            .then((response) => this.handleResponse(response));
    }

    static handleResponse(response) {
        if (!response.ok) {
            return this.rejectResponse(response);
        }
        else {
            return response.json();
        }
    }

    static rejectResponse(response) {
        return response.json()
            .then(function (apiErrorMessage) {
                const errorMessage = `${response.status} ${apiErrorMessage["error-type"]}`;
                return Promise.reject(errorMessage);
            });
    }
}
