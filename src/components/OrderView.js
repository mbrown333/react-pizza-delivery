import React, { Component } from 'react';

class OrderView extends Component {
    render() {
        let order = this.props.order;

        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Order Id: {order.id}</h3>
                </div>
                <div className="card-block">
                    <div className="row">
                        <div className="col">
                            <label><b>Name</b></label><br />
                            <p>{order.name}</p>
                        </div>
                        <div className="col">
                            <label><b>Address</b></label><br />
                            <p>{order.address}</p>
                        </div>
                        <div className="col">
                            <label><b>Zip Code</b></label><br />
                            <p>{order.zipCode}</p>
                        </div>
                    </div>
                    <label><b>Pizzas</b></label><br />
                    <ul className="list-group list-group-flush">
                        {
                            order.pizzas.map((pizza, key) => {
                                const toppings = [];
                                pizza.pizzaToppings.map((topping) => {
                                    if (topping.topping) {
                                        toppings.push(topping.topping.name);
                                    }
                                });

                                return (
                                    <li key={key} className="list-group-item">
                                        Size: {pizza.size.name} Crust: {pizza.crust.name} Toppings: { toppings.join(', ') }
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default OrderView;