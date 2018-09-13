import React, { Component } from "react";
import ToggleArrow from "../../reusableComponent/ToggleArrow";

class AddClientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            priceInput: "",
            transactions: []
        }
    }
    componentDidMount() {
        if (this.props.client != null) {
            this.setState({transactions: this.props.client.transactions})
        }
    }
    render() {
        let filteredTransactions = this.state.transactions.filter((transaction) => transaction.returnDate == null);
        return (<div className="modal-add-client-container">
            {  this.props.client == null ? 
                <input className="modal-input" id="modal-add-product-name-input" onChange={this.updateInput.bind(this)} placeholder="Ingrese su nombre"/> :
                <div className="modal-title">{this.props.client.name}</div>
            }
            <div className="products-grid-container">
                {
                    this.props.products.map((product, i) => {
                        return <div className="product-grid-item" key={i} onClick={(e) => this.addProduct(e, product)}>
                            <div>{product.name}</div>
                            <div>{product.price.toFixed(2)}</div>
                        </div>
                    })
                }
            </div>
            <div className="chosen-products-container">
                {
                   filteredTransactions.map((transaction, i) => {
                        return <div className="chosen-product-item" key={i}>
                            { /*find id*/ }
                            <div className="item-label">{transaction.product.name}</div>
                            <div className="item-quantity">{transaction.quantity}</div>
                            <ToggleArrow id="item-toggle-up-arrow" onClick={(e) => this.addProduct(e,transaction.product)}/>
                            <ToggleArrow id="item-toggle-down-arrow" reversed={true} onClick={(e) => this.removeOneQuantity(e, transaction.product._id)}/>
                            <div className="item-remove-button" onClick={(e) => this.removeProduct(e, transaction.product._id)}>retirar</div>
                        </div>
                    })
                }
            </div>
            <div className="cancel-button" onClick={this.props.cancelEvent}>Cancelar</div>
            <div className="confirm-button" onClick={this.confirmSelected.bind(this)}>Confirmar</div>
        </div>)
    }

    confirmSelected = () => {
        if (this.state.input.length === 0 && this.props.client == null) {
            window.alert("Invalid input!");
            return;
        }
        this.props.confirmEvent(this.state.input, this.props.client, this.state.transactions);
    }

    addProduct = (e, product) => {
        console.log(product);
        let productIndex = this.state.transactions.findIndex((transaction) => {
            return transaction.product._id === product._id && transaction.returnDate == null;
        });

        let newTransactions = this.state.transactions;
        if (productIndex != -1) {
            newTransactions[productIndex].quantity += 1;
        }
        else {
            newTransactions.push({
                product: { _id: product._id, name: product.name},
                quantity: 1,
                purchaseDate: null,
                returnDate: null
            });
        }
        this.setState({
            transactions: newTransactions
        });
    }

    removeOneQuantity(e, key) {
        var newTransactions = this.state.transactions;
        let productIndex = newTransactions.findIndex((transaction) => transaction.product._id === key);
        if (newTransactions[productIndex].quantity >= 2) {
            newTransactions[productIndex].quantity -= 1;
        }
        else if (newTransactions[productIndex].quantity >= 1) {
            this.removeProduct(e, key);
        }
        this.setState({
            transactions: newTransactions
        })
    }

    removeProduct = (e, key) => {
        var newTransactions = this.state.transactions;
        let productIndex = newTransactions.findIndex((transaction) => transaction.product._id === key);
        delete newTransactions[productIndex];
        this.setState({
            transactions: newTransactions
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