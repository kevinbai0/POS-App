import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./main.css";
import App from './App';


// create functions
const addProductToDatabase = (product, callback) => {
    fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    }).then((res) => callback());
}
const getProductsFromDatabase = (params, callback) => {
	let url = "/api/products";
	if (params != null) {
        url += params;
	}
    fetch(url).then((res) => res.json()).then((json) => callback(json));
}

const editProductFromDatabase = (id, newPrice, callback) => {
    fetch("/api/products/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: newPrice
        })
    }).then((res) => callback());
}

const getClientsFromDatabase = (params, callback) => {
    let url = "/api/clients/bundled";
    if (params != null) {
        url += params;
    }
    fetch(url).then((res) => res.json()).then((json) => {
        callback(json);
    })
}

const getOneClient = (client_id,callback) => {
    fetch("/api/clients/" + client_id)
        .then((res) => res.json())
        .then((json) => callback(json));
}

const addClientToDatabase = (newClient, callback) => {
    fetch("/api/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newClient)
    }).then((res) => callback());
}

const editClientAddProductsFromDatabase = (client, callback) => {
    fetch("/api/clients/" + client._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            newClient: client
        })
    }).then((res) => callback());
}

const deleteClient = (client, callback) => {
	fetch("/api/clients/" + client._id, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" }
	}).then((res) => console.log("Deleted"));
	callback();
}

const completeUnpaidTransactions = (client, callback) => {
    fetch("/api/transactions/clients/" + client._id, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client: client
        })
    }).then((res) => callback());
}

const signInToDatabase = (formData, callback) => {
    fetch("/api/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then((res) => res.json())
        .then((json) => {
            callback(json.authenticated);
        })
}

const getAllTransactions = (callback) => {
    fetch("/api/transactions/10").then((res) => res.json()).then((json) => {
        callback(json);
    });
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
		EDIT_CLIENT_TRANSACTION_COMPLETE: completeUnpaidTransactions,
		DELETE_CLIENT: deleteClient
    },
    transactions: {
        GET_ALL_TRANSACTIONS: getAllTransactions
    },
    authentication: {
        SIGN_IN: signInToDatabase
    }
}

ReactDOM.render(<App functions={functions}/>, document.getElementById('root'));
