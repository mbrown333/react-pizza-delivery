import React, { Component } from 'react';
import OrderApi from '../api/orderApi';
import OrderView from '../components/OrderView';

class OrdersView extends Component {
    constructor(props) {
        super(props);

        this.orderApi = new OrderApi();

        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        this.orderApi.getOrders()
            .then((orders) => this.setState({ orders: orders }));
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map((order, key) => {
                        return(
                            <OrderView order={ order } />
                        );
                    })
                }
            </div>
        );
    }
}

export default OrdersView;