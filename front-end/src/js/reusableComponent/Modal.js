import React, { Component } from "react";

class Modal extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="modal">
                { this.props.subComponent }
            </div>
        );
    }
}

export default Modal;