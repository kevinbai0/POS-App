import React, { Component } from "react";
import ToggleArrow from "../../reusableComponent/ToggleArrow";

class AddClientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            priceInput: "",
            chosenProducts: {}
        }
    }
    componentDidMount() {
        if (this.props.client != null) {
            var initialChosenProducts = {};
            this.props.client.currentProductsOwed.forEach((owedProduct) => {
                initialChosenProducts[owedProduct.product._id] = owedProduct.quantity;
            })
            this.setState({chosenProducts: initialChosenProducts})
        }
    }
    render() {
        console.log(this.state.chosenProducts);

        return (<div className="modal-add-client-container">
            {  this.props.client == null ? 
                <input className="modal-input" id="modal-add-product-name-input" onChange={this.updateInput.bind(this)} placeholder="Enter name"/> :
                <div className="modal-title">{this.props.client.name}</div>
            }
            <div className="products-grid-container">
                {
                    this.props.products.map((product, i) => {
                        return <div className="product-grid-item" key={i} onClick={(e) => this.addProduct(e, product)}>
                            <div>{product.name}</div>
                            <div>${product.price.toFixed(2)}</div>
                        </div>
                    })
                }
            </div>
            <div className="chosen-products-container">
                {
                    Object.keys(this.state.chosenProducts).map((key, i) => {
                        return <div className="chosen-product-item" key={i}>
                            { /*find id*/ }
                            <div className="item-label">{this.props.products.find((product) => product._id == key).name}</div>
                            <div className="item-quantity">{this.state.chosenProducts[key]}</div>
                            <ToggleArrow id="item-toggle-up-arrow" onClick={(e) => this.addProductById(e,key)}/>
                            <ToggleArrow id="item-toggle-down-arrow" reversed={true} onClick={(e) => this.removeOneQuantity(e, key)}/>
                            <div className="item-remove-button" onClick={(e) => this.removeProduct(e, key)}>remove</div>
                        </div>
                    })
                }
            </div>
            <div className="cancel-button" onClick={this.props.cancelEvent}>Cancel</div>
            <div className="confirm-button" onClick={this.confirmSelected.bind(this)}>Confirm</div>
        </div>)
    }

    confirmSelected = () => {
        if (this.state.input.length === 0 && this.props.client == null) {
            window.alert("Invalid input!");
            return;
        }
        this.props.confirmEvent(this.state.input, this.props.client, this.state.chosenProducts);
    }

    addProduct = (e, product) => {
        var newProducts = this.state.chosenProducts;
        if (newProducts[product._id] != null) {
            newProducts[product._id] += 1;
        }
        else {
            newProducts[product._id] = 1;
        }
        this.setState({
            chosenProducts: newProducts
        });
    }

    addProductById = (e, key) => {
        console.log(key);
        let product = this.props.products.find((product) => product._id == key);
        this.addProduct(e,product);
    }

    removeOneQuantity(e, key) {
        console.log(key);
        var newProducts = this.state.chosenProducts;
        if (newProducts[key] >= 2) {
            newProducts[key] -= 1;
        }
        else if (newProducts[key] >= 1) {
            this.removeProduct(e, key);
        }
        this.setState({
            chosenProducts: newProducts
        })
    }

    removeProduct = (e, key) => {
        var newProducts = this.state.chosenProducts;
        delete newProducts[key];
        this.setState({
            products: newProducts
        })
    }

    updateInput = (e) => {
        this.setState({input: e.target.value});
    }
    updatePriceInput = (e) => {
        this.setState({priceInput: e.target.value})
    }
}

export default AddClientModal;