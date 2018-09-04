import React, {Component} from "react";

class RecentPayments extends Component {
    render() {
        let payments = [
            { time: "12:30", name: "Victor Cardenas", price: "12.00", date: "10/04/18" },
            { time: "12:30", name: "Victor Cardenas", price: "12.00", date: "10/04/18" },
            { time: "12:30", name: "Victor Cardenas", price: "12.00", date: "10/04/18" },
            { time: "12:30", name: "Victor Cardenas", price: "12.00", date: "10/04/18" },
            { time: "12:30", name: "Victor Cardenas", price: "12.00", date: "10/04/18" }
        ]
        return (
             <div className="recent-payments-container">
                <div className="recent-payments-title">Recent Payments</div>
                <div className="recent-payments-list-view">
                    {
                        payments.map((payment, i) => {
                            return (
                                <div className="payment-item-container" key={i}>
                                    <div className="payment-item-time">{payment.time}</div>
                                    <div className="payment-item-name">{payment.name}</div>
                                    <div className="payment-item-price">${payment.price}</div>
                                    <div className="payment-item-date">{payment.date}</div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="expand-button"><span>Expand</span></div>
            </div>
        );
    }
}
export default RecentPayments;