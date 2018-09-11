import React, { Component } from "react";
import ClientList from "./ClientList";
import RecentPayments from "./RecentPayments";

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {currentClient: null, clientPayments: [], clients: [], pastTransactions: []};
    }
    componentDidMount() {
        this.props.functions.transactions.GET_ALL_TRANSACTIONS((transactions) => {
            this.setState({
                pastTransactions: transactions,
            })
        })
    }
    render() {
        return <div className="client-container">
            <div className="client-title">Clientela</div>
            <ClientList functions={this.props.functions} clients={this.state.clients} fetchClients={this.fetchClients} selectClient={this.setClient} currentClient={this.state.currentClient} addClient={this.addClient} mapDateToString={this.mapDateToString}/>
            <RecentPayments pastTransactions={this.state.pastTransactions} mapDateToString={this.mapDateToString} currentClient={this.state.currentClient}/>
        </div>
    }

    setClient = (client) => {
        if (client == null) {
            // get all historical transactions from most recent
            this.props.functions.transactions.GET_ALL_TRANSACTIONS((transactions) => {
                this.setState({
                    pastTransactions: transactions,
                    currentClient: null
                },this.fetchClients())
            })
        }
        else {
            this.props.functions.clients.GET_ONE_CLIENT(client._id, (newClientInfo) => {
                // filter out products
                let transactions = newClientInfo.transactions.filter((transaction) => {
                    return transaction.returnDate != null;
                })
                this.setState({
                    currentClient: newClientInfo,
                    pastTransactions: transactions.sort((a,b) => a.returnDate < b.returnDate ? 1 : -1)
                });
            })
        }
    }
    addClient = (client) => {
        this.props.functions.clients.ADD_CLIENT(client, () => {
            this.fetchClients();
        })
    }
    fetchClients = (params) => {
        this.props.functions.clients.GET_CLIENTS(params, (clients) => {
            this.setState({
                clients: clients
            })
        });
    }

    //months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"]
    mapDateToString = (date) => {
        if (date == null) {
            return "";
        }
        date = new Date(date);
        let month = this.months[date.getMonth()];
        let theDate = date.getDate();
        let year = date.getFullYear();
        return month + ". " + theDate + ", " + year;
    }
}

export default Client;