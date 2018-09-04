import React, {Component} from "react";
import Arrow from "../reusableComponent/Arrow";
import AddButton from "../reusableComponent/AddButton";
import AddClientModal from "./modals/AddClientModal";

class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [], modalShown: false, products:[], clientSelected: false, currentClient: null};
    }
    componentDidMount() {
        this.props.functions.products.GET_PRODUCTS((products) => {
            this.setState({
                products: products
            })
        });
        this.fetchClients();
    }

    fetchClients = (params) => {
        this.props.functions.clients.GET_CLIENTS(params, (clients) => {
            this.setState({
                clients: clients
            })
        });
    }
    
    render() {
        const modal = (
            <div className="modal">
                <AddClientModal client={this.state.currentClient} products={this.state.products} cancelEvent={() => this.toggleModal(false)} confirmEvent={this.addClient.bind(this)}/>
            </div>
        )
        if (!this.state.clientSelected) {
            return (
                <div className="client-list-container">
                    { this.state.modalShown ? modal : ""}
                    <div className="client-list-header">
                        <div className="client-list-title">Currently Owed</div>
                        <AddButton id="client-list-add-button" onClick={(e) => this.toggleModal(true)}/>
                    </div>
                    <input className="client-list-search" type="text" onChange={(e) => this.updateSearchQuery(e)} placeholder="Search name"/>
                    {
                        this.state.clients.length === 0 ?
                        <EmptyProductTable  showModal={(e) => this.toggleModal(true)}/> :
                        <ClientTableContainer clients={this.state.clients} clientSelected={this.clientSelected}/>
                    }
                    <div className="expand-button"><span>Expand</span></div>
                </div>
            );
        }
        else {
            return (
                <div className="client-list-container">
                    { this.state.modalShown ? modal : ""}
                    <div className="client-list-header">
                        <div className="client-list-title">Currently Owed</div>
                        <AddButton id="client-list-add-button" onClick={(e) => this.toggleModal(true)}/>
                    </div>
                    <div className="single-client-view">
                        <div className="single-client-view-header">
                            <Arrow reversed={true} onClick={(e) => this.setState({clientSelected: false, currentClient: null}, this.fetchClients())}/>
                            <div>{this.state.currentClient.name}</div>
                        </div>
                        
                        <div className="owed-items-label">Owed Items</div>
                        <div className="add-items-button" onClick={(e) => this.toggleModal(true)}>Edit Items</div>
                        <div className="owed-items-view">
                            {
                                this.state.currentClient.currentProductsOwed.map((product, i) => {
                                    return <div className="owed-item-view" key={i}>
                                        <div className="owed-item-product-name">{product.product.name}</div>
                                        <div className="owed-item-price-overview-label">{product.quantity} x ${product.product.price.toFixed(2)}</div>
                                        <div className="owed-item-price-total-label">${(product.product.price * product.quantity).toFixed(2)}</div>
                                    </div>
                                })
                            }
                        </div>
                        <div className="owed-item-view total-view">
                            <div className="owed-item-product-name total-view">Total</div>
                            <div className="owed-item-price-total-label total-view">${this.state.currentClient.sumOfDebt.toFixed(2)}</div>
                        </div>
                        <div className="complete-transaction-button" onClick={(e) => this.completeClientTransaction(this.state.currentClient)}>
                            <div className="price-text">${this.state.currentClient.sumOfDebt.toFixed(2)}</div>
                            <div className="transaction-text">Complete Transaction</div>
                        </div>
                        <div className="view-history-view"><div className="view-history-view">View History</div> <Arrow /></div>
                        <div className="expand-button"><span>Expand</span></div>
                    </div>
                    
                </div>
            )
        }
    }

    updateSearchQuery = (e) => {
        this.fetchClients("?name=" + e.target.value);
    }

    clientSelected = (client) => {
        this.props.functions.clients.GET_ONE_CLIENT(client._id, (newClientInfo) => {
            this.setState({
                clientSelected: true,
                currentClient: newClientInfo
            })
        })
    }
    toggleModal = (show) => {
        this.setState({modalShown: show});
    }
    addClient = (clientName, client, products) => {
        if (client == null) {
            this.toggleModal(false);
            var products = Object.keys(products).map((objKey) => {
                return { productId: objKey, quantity: products[objKey] }
            });
            var clientForDatabase = {
                name: clientName,
                products: products
            }
            this.props.functions.clients.ADD_CLIENT(clientForDatabase, () => {
                this.props.functions.clients.GET_CLIENTS((clients) => {
                    this.setState({clients: clients});
                })
            })
        }
        else {
            this.editClient(client, products);
        }
    }

    editClient = (client, newProducts) => {
        this.toggleModal(false);
        // filter out the products that are currently owed 
        let mergedProducts = client.products.filter((object) => object.returnDate != null);

        Object.keys(newProducts).forEach((objKey) => {
            mergedProducts.push({
                productId: objKey,
                quantity: newProducts[objKey]
            });
        });
        this.props.functions.clients.EDIT_CLIENT_ADD_PRODUCTS(client, mergedProducts, () => {
            // on finish, reload client info
            this.clientSelected(client);
        });
    }

    completeClientTransaction(client) {
        if (client.sumOfDebt > 0) {
            this.props.functions.clients.EDIT_CLIENT_TRANSACTION_COMPLETE(client, () => {
                this.clientSelected(client);
            });
        }
        
    }
}

class ClientTableContainer extends Component {
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    render() {
        return <div className="client-table-container">
            {
                this.props.clients.map((client, i) => {
                    let last = i === this.props.clients.length - 1;
                    return (
                        <div className={!last ? "client-table-item" : "client-table-item last"} key={i} onClick={(e) => this.props.clientSelected(client)}>
                            <div className="client-name">{client.name}</div>
                            <div className="client-date">{this.mapDateToString(client.mostRecentDate)}</div>
                            <div className="client-items-preview">{client.productsOwedBlurb}</div>
                            <div className="client-price">${client.sumOfDebt.toFixed(2)}</div>
                            <Arrow id="client-arrow-svg"/>
                        </div>
                    )
                })
            }
        </div>
    }

    mapDateToString = (date) => {
        date = new Date(date);
        let month = this.months[date.getMonth()];
        let theDate = date.getDate();
        let year = date.getFullYear();
        return month + ". " + theDate + ", " + year;
    }
}

class EmptyProductTable extends Component {
    render() {
        return <div className="clients-list-empty-table">
            <div className="clients-list-empty-title">
                No clients found, add new client?
            </div>
            <div className="confirm-button" onClick={this.props.showModal}>Add</div>
        </div>
    }
}
export default ClientList;