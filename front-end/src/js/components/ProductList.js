import React, {Component} from "react";
import AddButton from "../reusableComponent/AddButton";
import AddProductModal from "./modals/AddProductModal";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = { modalShown: false };
    }
    render() {
        const addProductModal = <AddProductModal />
        const modal = (
            <div className="modal">
                <AddProductModal cancelEvent={() => this.toggleModal(false)} confirmEvent={this.addProduct.bind(this)}/>
            </div>
        )
        return (
        <div className="products-list-container">
            {this.state.modalShown ? modal : ""}
            <div className="products-list-header">
                <div className="products-list-title">Current</div>
                <AddButton id="products-list-add-button" onClick={(e) => this.toggleModal(true)}/>
            </div>
            <input className="products-list-search" type="text" placeholder="Search product"/>
            { this.props.products.length === 0 ? <EmptyProductTable showModal={(e) => this.toggleModal(true)}/> : <ProductsTable products={this.props.products} editProductFunction={this.props.editProduct} getProductFunction={this.props.getProducts} />}
            <div className="expand-button"><span>Expand</span></div>
        </div>);
    }

    addProduct = (value) => {
        this.props.addProductFunction(value, () => {
            this.props.getProducts();
        });
        this.toggleModal(false);
    }

    toggleModal = (show) => {
        this.setState({modalShown: show});
    }
}

class ProductsTable extends Component {
    render() {
        console.log(this.props.products);
        return <div className="products-list-table">
            {
                this.props.products.map((product, key) => {
                    return (
                        <ProductItem product={product} key={key} editProductFunction={this.props.editProductFunction} getProductFunction={this.props.getProductFunction}/>
                    );
                })
            }
        </div>
    }
}

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = { isEditing: false, textFieldInput: "" + this.props.product.price.toFixed(2) }
    }
    render() {
        if (!this.state.isEditing) {
            return <div className="product-item-container">
                <div className="product-item-title">{this.props.product.name}</div>
                <div className="product-item-price">${this.props.product.price.toFixed(2)}</div>
                <div className="product-item-edit-button" onClick={this.toggleEditing.bind(this)}>Edit</div>
            </div>
        }
        return (<div className="product-item-container">
            <div className="product-item-title">{this.props.product.name}</div>
            <input className="product-item-price-input" value={this.state.textFieldInput} onChange={this.handleTextInput.bind(this)}/>
            <div className="product-item-edit-button" onClick={this.toggleEditing.bind(this)}>Done</div>
        </div>);
    }

    toggleEditing = () => {
        if (!this.state.isEditing) {
            this.setState({isEditing: true});
        }
        else {
            if (!isNaN(this.state.textFieldInput) && this.state.textFieldInput != this.props.price) {
                this.props.editProductFunction(this.props.product._id, parseFloat(this.state.textFieldInput), () => {
                    this.props.getProductFunction();
                });
                this.setState({isEditing: false});
            }
        }
    }
    handleTextInput = (e) => {
        this.setState({textFieldInput: e.target.value});
    }
}

class EmptyProductTable extends Component {
    render() {
        return <div className="products-list-empty-table">
            <div className="products-list-empty-title">
                No products found, add new product?
            </div>
            <div className="confirm-button" onClick={this.props.showModal}>Add</div>
        </div>
    }
}

export default ProductList;