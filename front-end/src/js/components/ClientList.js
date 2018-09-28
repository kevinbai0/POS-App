import React, {Component} from "react";
import Arrow from "../reusableComponent/Arrow";
import AddButton from "../reusableComponent/AddButton";
import AddClientModal from "./modals/AddClientModal";

class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {modalShown: false, clientSelected: false, products: []};
    }
    componentDidMount() {
        this.props.functions.products.GET_PRODUCTS("", (products) => {
            this.setState({
                products: products
            })
        });
        this.props.fetchClients();
    }
    
    render() {
        const modal = (
            <div className="modal">
                <AddClientModal client={this.props.currentClient} products={this.state.products} cancelEvent={() => this.toggleModal(false)} confirmEvent={this.addClient.bind(this)}/>
            </div>
        )
        if (this.props.currentClient == null) {
            return (
                <div className="client-list-container">
                    { this.state.modalShown ? modal : ""}
                    <div className="client-list-header">
                        <div className="client-list-title">Actualmente debido</div>
                        <AddButton id="client-list-add-button" onClick={(e) => this.toggleModal(true)}/>
                    </div>
                    <input className="client-list-search" type="text" onChange={(e) => this.updateSearchQuery(e)} placeholder="Nombre de búsqueda"/>
                    {
                        this.props.clients.length === 0 ?
                        <EmptyProductTable  showModal={(e) => this.toggleModal(true)}/> :
                        <ClientTableContainer clients={this.props.clients} clientSelected={this.clientSelected} mapDateToString={this.props.mapDateToString}/>
                    }
                    <div className="expand-button"><span>Expandir</span></div>
                </div>
            );
        }
        else {
            let filteredTransactions = this.props.currentClient.transactions.filter((transaction) => transaction.returnDate == null);
            return (
                <div className="client-list-container">
                    { this.state.modalShown ? modal : ""}
                    <div className="client-list-header">
                        <div className="client-list-title">Actualmente debido</div>
                        <AddButton id="client-list-add-button" onClick={(e) => this.toggleModal(true)}/>
                    </div>
                    <div className="single-client-view">
                        <div className="single-client-view-header">
                            <Arrow reversed={true} onClick={(e) => this.props.selectClient(null)}/>
                            <div>{this.props.currentClient.name}</div>
                        </div>
                        
                        <div className="owed-items-label">Artículos debidos</div>
                        <div className="add-items-button" onClick={(e) => this.toggleModal(true)}>Editar elementos</div>
                        <div className="owed-items-view">
                            {
                                filteredTransactions.map((transaction, i) => {
                                    let unitPriceOfProduct = this.state.products.find((product) => product._id === transaction.product._id).price;
                                    
                                    return <div className="owed-item-view" key={i}>
                                        <div className="owed-item-product-name">{transaction.product.name}</div>
                                        <div className="owed-item-product-date">{this.props.mapDateToString(transaction.purchaseDate)}</div>
                                        <div className="owed-item-price-overview-label">{transaction.quantity} x {unitPriceOfProduct.toFixed(2)}</div>
                                        <div className="owed-item-price-total-label">{(unitPriceOfProduct * transaction.quantity).toFixed(2)}</div>
                                    </div>
                                })
                            }
                        </div>
                        <div className="owed-item-view total-view">
                            <div className="owed-item-product-name total-view">Total</div>
                            <div className="owed-item-price-total-label total-view">{this.props.currentClient.sumOfDebt.toFixed(2)}</div>
                        </div>
                        <div className="complete-transaction-button" onClick={(e) => this.completeClientTransaction(this.props.currentClient)}>
                            <div className="price-text">{this.props.currentClient.sumOfDebt.toFixed(2)}</div>
                            <div className="transaction-text">Transacción completa</div>
                        </div>
                        <div className="delete-button"><span onClick={(e) => this.deleteCurrentClient()}>Borrar</span></div>
                    </div>
                </div>
            )
        }
    }

    updateSearchQuery = (e) => {
        this.props.fetchClients("?name=" + e.target.value);
    }

    clientSelected = (client) => {
        this.props.selectClient(client);
    }
    toggleModal = (show) => {
        this.setState({modalShown: show});
    }
    addClient = (clientName, client, transactions) => {
        if (client == null) {
            this.toggleModal(false);
            var clientForDatabase = {
                name: clientName,
                transactions: transactions
            }
            this.props.addClient(clientForDatabase);
        }
        else {
            this.editClient(client, transactions);
        }
    }

    editClient = (client, newTransactions) => {
        this.toggleModal(false);
        client.transactions = newTransactions;
        this.props.functions.clients.EDIT_CLIENT_ADD_PRODUCTS(client, () => {
            // on finish, reload client info
            this.clientSelected(client);
        });
	}
	
	deleteCurrentClient = () => {
		this.props.deleteCurrentClient();
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
    render() {
        return <div className="client-table-container">
            {
                this.props.clients.map((client, i) => {
                    let last = i === this.props.clients.length - 1;
                    return (
                        <div className={!last ? "client-table-item" : "client-table-item last"} key={i} onClick={(e) => this.props.clientSelected(client)}>
                            <div className="client-name">{client.name}</div>
                            <div className="client-date">{this.props.mapDateToString(client.mostRecentDate)}</div>
                            <div className="client-items-preview">{client.productsOwedBlurb}</div>
                            <div className="client-price">{client.sumOfDebt.toFixed(2)}</div>
                            <Arrow id="client-arrow-svg"/>
                        </div>
                    )
                })
            }
        </div>
    }
}

class EmptyProductTable extends Component {
    render() {
        return <div className="clients-list-empty-table">
            <div className="clients-list-empty-title">
                No se encontraron clientes, ¿agregar nuevo cliente?
            </div>
            <div className="confirm-button" onClick={this.props.showModal}>Añadir</div>
        </div>
    }
}
export default ClientList;