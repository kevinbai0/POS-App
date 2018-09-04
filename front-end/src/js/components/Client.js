import React, { Component } from "react";
import ClientList from "./ClientList";
import RecentPayments from "./RecentPayments";

class Client extends Component {
    render() {
        return <div className="client-container">
            <div className="client-title">Clients</div>
            <ClientList functions={this.props.functions}/>
            <RecentPayments/>
        </div>
    }
}

export default Client;