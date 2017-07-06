import React, { Component } from 'react';
import OrdersView from './OrdersView';
import OrderForm from './OrderForm';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: false
        };

        this.handleOrderClick = this.handleOrderClick.bind(this);
        this.closeFormCallback = this.closeFormCallback.bind(this);
    }

    handleOrderClick(e) {
        this.setState({ order: true });
    }

    closeFormCallback() {
        this.setState({ order: false });
    }

    render() {
        let view = <OrdersView />;

        if (this.state.order) {
            view = <OrderForm onCloseFormCallback={ this.closeFormCallback } />
        }

        return (
            <div>
                <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navba" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand">Pizza Delivery App</a>
                    <div className="collapse navbar-collapse" id="navbar">
                        <div className="navbar-nav">
                            <a className="nav-item nav-link" onClick={ this.handleOrderClick }>Order</a>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {view}
                </div>
            </div>
        );
    }
}

export default Main;