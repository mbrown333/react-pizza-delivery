import React, { Component } from 'react';

class AddPizza extends Component {
  render() {
    let removeButton = '';
    if (this.props.count > 1) {
        removeButton = <button type="button" className="btn btn-outline-danger" onClick={ this.props.onRemoveCallback }>X</button>;
    }

    return (
        <div>
            <h4>Pizza { this.props.count } { removeButton }</h4>
            <div className="form-group">
                <label htmlFor="sizes">Size</label>
                <select value={ this.props.selectedSize ? this.props.selectedSize.id : '' }
                        className="form-control" id="sizes"
                        onChange={ this.props.onUpdateSizeCallback }>
                    <option value="">SELECT A SIZE</option>
                    {
                        this.props.sizes.map((item, key) => {
                            return(<option value={ item.id } key={ item.id }>{ item.name }</option>);
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="crust">Crust</label>
                <select value={ this.props.selectedCrust ? this.props.selectedCrust.id : '' }
                        className="form-control" id="crust"
                        onChange={ this.props.onUpdateCrustCallback }>
                    <option value="">SELECT A CRUST</option>
                    {
                        this.props.crusts.map((item, key) => {
                            return(<option value={ item.id } key={ item.id }>{ item.name }</option>);
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="toppings">Toppings</label>
                <select multiple value={ this.props.selectedToppings ? this.props.selectedToppings : '' }
                    className="form-control"
                    id="toppings"
                    onChange={ this.props.onUpdateToppingsCallback }>
                    {
                        this.props.toppings.map((item, key) => {
                            return(<option value={ item.id } key={ item.id }> { item.name }</option>);
                        })
                    }
                </select>
            </div>
        </div>
    );
  }
}

export default AddPizza;