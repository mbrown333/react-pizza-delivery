import React, { Component } from 'react';
import PizzaApi from '../api/pizzaApi';
import OrderApi from '../api/orderApi';
import AddPizza from '../components/AddPizza';

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.pizzaApi = new PizzaApi();
    this.orderApi = new OrderApi();

    this.state = {
        toppings: [],
        sizes: [],
        crusts: [],
        name: '',
        address: '',
        zipCode: '',
        pizzas: []
    };

    // Bind functions to this
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addPizzaClick = this.addPizzaClick.bind(this);
    this.createNewPizza = this.createNewPizza.bind(this);
    this.removePizzaCallback = this.removePizzaCallback.bind(this);
    this.handleUpdateSize = this.handleUpdateSize.bind(this);
    this.handleUpdateToppings = this.handleUpdateToppings.bind(this);
    this.handleUpdateCrust = this.handleUpdateCrust.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.pizzaApi.getToppings().then((toppings) => this.setState({ toppings: toppings }));
    this.pizzaApi.getSizes().then((sizes) => this.setState({ sizes: sizes }));
    this.pizzaApi.getCrusts().then((crusts) => this.setState({ crusts: crusts }));

    this.createNewPizza();
  }

  addPizzaClick() {
    this.createNewPizza();
  }

  createNewPizza() {
    const pizzas = this.state.pizzas.slice();
    pizzas.push({
        size: null,
        crust: null,
        pizzaToppings: []
    });

    this.setState({ pizzas: pizzas });
  }

  removePizzaCallback(pizza) {
    const pizzas = this.state.pizzas.slice();
    const index = pizzas.indexOf(pizza);
    if (index) {
        pizzas.splice(index, 1);
        this.setState({ pizzas: pizzas });
    }
  }

  handleUpdateSize(index, e) {
    const pizzas = this.state.pizzas.slice();
    const pizza = pizzas[index];
    pizza.size = { id: e.target.value };
    this.setState({ pizzas: pizzas });
  }

  handleUpdateCrust(index, e) {
    const pizzas = this.state.pizzas.slice();
    const pizza = pizzas[index];
    pizza.crust = { id: e.target.value };
    this.setState({ pizzas: pizzas });
  }

  handleUpdateToppings(index, e) {
    const pizzas = this.state.pizzas.slice();
    const pizza = pizzas[index];
    let options = e.target.options;
    let selected = [];

    for (let index in options) {
        if (options[index].selected) {
            selected.push(options[index].value);
        }
    }

    pizza.pizzaToppings = selected;
    this.setState({ pizzas: pizzas });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleAddressChange(e) {
    this.setState({ address: e.target.value });
  }

  handleZipCodeChange(e) {
    this.setState({ zipCode: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.state.pizzas.map((pizza) =>
        pizza.pizzaToppings = pizza.pizzaToppings.map(
            (topping) => { return { toppingId: topping } }
        ));

    const order = {
        name: this.state.name,
        address: this.state.address,
        zipCode: this.state.zipCode,
        pizzas: this.state.pizzas
    };

    this.orderApi.postOrder(order).then((response) => {
        this.props.onCloseFormCallback();
    });
  }

  render() {
    return (
        <div className="order-form">
            <h1>Order Pizza</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name"
                            value={ this.state.name }
                            onChange={ this.handleNameChange } />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="address" className="form-control" id="address" placeholder="Address"
                            value={ this.state.address }
                            onChange={ this.handleAddressChange } />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" className="form-control" id="zip" placeholder="Zip Code"
                             value={ this.state.zipCode }
                             onChange={ this.handleZipCodeChange } />
                </div>
                <h3>Pizzas <button type="button" className="btn btn-outline-primary" onClick={ this.addPizzaClick }>+</button></h3>
                {
                    this.state.pizzas.map((item, key) => {
                        return (
                            <AddPizza
                                    onRemoveCallback={ this.removePizzaCallback.bind(this, item) }
                                    key={ key }
                                    count={ key+1 }
                                    sizes={ this.state.sizes }
                                    crusts={ this.state.crusts }
                                    toppings={ this.state.toppings }
                                    selectedSize={ item.size }
                                    selectedCrust={ item.crust }
                                    selectedToppings={ item.pizzaToppings }
                                    onUpdateSizeCallback={ this.handleUpdateSize.bind(this, key) }
                                    onUpdateCrustCallback={ this.handleUpdateCrust.bind(this, key) }
                                    onUpdateToppingsCallback={ this.handleUpdateToppings.bind(this, key) } />
                        );
                    })
                }
                <button type="submit" className="btn btn-primary" onClick={ this.handleSubmit }>Submit Order</button>
                <button className="btn btn-danger" onClick={ this.props.onCloseFormCallback }>Cancel</button>
            </form>
        </div>
    );
  }
}

export default OrderForm;