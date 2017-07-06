    const axios = require('axios');
    const orderApiUrl = 'http://localhost:5000/api/v1/order';

    let instance = null;

    class OrderApi {
        constructor() {
            if (instance) {
                instance = this;
            }

            return instance;
        }

        postOrder(order) {
            return axios.post(orderApiUrl, order)
                .then((response) => { return response.data });
        }

        getOrders() {
            return axios.get(orderApiUrl)
                .then((response) => {return response.data });
        }
    }

    export default OrderApi;