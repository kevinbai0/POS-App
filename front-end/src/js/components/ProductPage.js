import React , { Component } from "react";
import ProductList from "./ProductList";

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {products: []}
    }
    componentDidMount() {
        this.getProducts();
    }
    render() {
        return (
            <div className="product-page-container">
                <div className="product-page-title">Productos</div>
                <ProductList products={this.state.products} addProductFunction={this.props.functions.ADD_PRODUCT} getProducts={this.getProducts.bind(this)} editProduct={this.props.functions.EDIT_PRODUCT}/>
            </div>
        );
    }

    getProducts = () => {
        this.props.functions.GET_PRODUCTS((returnedProducts) => {
            this.setState({products: returnedProducts});
        });
    }
}

export default ProductPage;