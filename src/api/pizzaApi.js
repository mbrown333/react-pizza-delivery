const axios = require('axios');
const pizzaApiUrl = 'http://localhost:5000/api/v1/pizza';

let instance = null;

class PizzaApi {
    constructor() {
        if (instance) {
            instance = this;
        }

        return instance;
    }

    getToppings() {
        return axios.get(pizzaApiUrl + '/toppings').then((response) => { return response.data });
    }

    getSizes() {
        return axios.get(pizzaApiUrl + '/sizes').then((response) => { return response.data });
    }

    getCrusts() {
        return axios.get(pizzaApiUrl + '/crusts').then((response) => { return response.data });
    }
}

export default PizzaApi;