import React, {Component} from "react";

class RecentPayments extends Component {
    render() {
        if (this.props.currentClient == null) {
            return (
                <div className="recent-payments-container">
                <div className="recent-payments-title">Pagos recientes</div>
                <div className="recent-payments-list-view">
                    {
                        this.props.pastTransactions.map((transactionGroup, i) => {
							return (
								<div className="payment-item-container" key={i}>
									<div className="payment-item-time">{this.getTimeFromDateToString(transactionGroup.transaction.returnDate)}</div>
									<div className="payment-item-name">{transactionGroup.transaction.quantity} x {transactionGroup.transaction.product.name}</div>
									<div className="payment-item-client-name">{transactionGroup.name}</div>
									<div className="payment-item-price">{transactionGroup.transaction.total != null ? transactionGroup.transaction.total.toFixed(2) : "0.00"}</div>
									<div className="payment-item-date">{this.props.mapDateToString(transactionGroup.transaction.returnDate)}</div>
								</div>
							);
                        })
                    }
                </div>
                <div className="expand-button"><span>Expandir</span></div>
            </div>
            )
        }
        else return (
             <div className="recent-payments-container">
                <div className="recent-payments-title">Pagos recientes</div>
                <div className="recent-payments-list-view">
                    {
                        this.props.pastTransactions.map((transaction, i) => {
                            return (
                                <div className="payment-item-container" key={i}>
                                    <div className="payment-item-time">{this.getTimeFromDateToString(transaction.returnDate)}</div>
                                    <div className="payment-item-name">{transaction.quantity} x {transaction.product.name}</div>
                                    <div className="payment-item-price">{transaction.total != null ? transaction.total.toFixed(2) : "0.00"}</div>
                                    <div className="payment-item-date">{this.props.mapDateToString(transaction.returnDate)}</div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="expand-button"><span>Expandir</span></div>
            </div>
        );
    }

    getTimeFromDateToString(date) {
        date = new Date(date);
        let hours = date.getHours();
        let mins = date.getMinutes();
        let minsStr = mins < 10 ? "0" + mins : "" + mins;
        return hours + ":" + minsStr;
    }
}
export default RecentPayments;