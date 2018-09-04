import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./main.css";
import App from './App';
const server = "";
// create functions
const addProductToDatabase = (product, callback) => {
    fetch(server + "/api/products", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: product.name,
            price: product.price
        })
    }).then((res) => callback());
}
const getProductsFromDatabase = (callback) => {
    fetch(server + "/api/products", {method: "GET", mode: "no-cors"}).then((res) => res.json()).then((json) => callback(json));
}

const editProductFromDatabase = (id, newPrice, callback) => {
    fetch(server + "/api/products/" + id, {
        method: "PUT",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: newPrice
        })
    }).then((res) => callback());
}

const getClientsFromDatabase = (params, callback) => {
    let url = server + "/api/clients/bundled";
    if (params != null) {
        url += params;
    }
    console.log(url);
    fetch(url, {method: "GET", mode: "no-cors",}).then((res) => res.json()).then((json) => {
        callback(json);
    })
}

const getOneClient = (client_id,callback) => {
    fetch(server + "/api/clients/" + client_id, {method: "GET", mode: "no-cors"})
        .then((res) => res.json())
        .then((json) => callback(json));
}

const addClientToDatabase = (newClient, callback) => {
    fetch(server + "/api/clients", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newClient)
    }).then((res) => callback());
}

const editClientAddProductsFromDatabase = (client, newProducts, callback) => {
    fetch(server + "/api/clients/" + client._id, {
        method: "PUT",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            newProducts: newProducts
        })
    }).then((res) => callback());
}

const completeUnpaidTransactions = (client, callback) => {
    fetch(server + "/api/transactions/clients/" + client._id, {
        method: "PUT", 
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => callback());
}

const functions = {
    products: {
        ADD_PRODUCT: addProductToDatabase,
        GET_PRODUCTS: getProductsFromDatabase,
        EDIT_PRODUCT: editProductFromDatabase,
    },
    clients: {
        GET_CLIENTS: getClientsFromDatabase,
        ADD_CLIENT: addClientToDatabase,
        GET_ONE_CLIENT: getOneClient,
        EDIT_CLIENT_ADD_PRODUCTS: editClientAddProductsFromDatabase,
        EDIT_CLIENT_TRANSACTION_COMPLETE: completeUnpaidTransactions
    }
}

ReactDOM.render(<App functions={functions}/>, document.getElementById('root'));
