import React, { Component } from "react";

class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            priceInput: ""
        }
    }
    render() {
        return <div className="modal-add-product-container">
            <input className="modal-input" id="modal-add-product-name-input" onChange={this.updateInput.bind(this)} placeholder="Ingresa el producto"/>
            <input className="modal-input" id="modal-add-product-price-input" onChange={this.updatePriceInput.bind(this)} placeholder="eg. 2.50"/>
            <div className="cancel-button" onClick={this.props.cancelEvent}>Cancelar</div>
            <div className="confirm-button" onClick={this.confirmSelected.bind(this)}>Confirmar</div>
        </div>
    }

    confirmSelected = () => {
        console.log(isNaN(this.state.priceInput));
        if (this.state.input.length === 0 || this.state.priceInput.length === 0 || isNaN(this.state.priceInput)) {
            window.alert("Invalid input!");
            return;
        }
        this.props.confirmEvent({name: this.state.input, price: parseFloat(this.state.priceInput)});
    }

    updateInput = (e) => {
        this.setState({input: e.target.value});
    }
    updatePriceInput = (e) => {
        this.setState({priceInput: e.target.value})
    }
}

export default AddProductModal;