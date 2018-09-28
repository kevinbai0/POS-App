import React, { Component } from "react";

class Modal extends Component {
    render() {
        return (
            <div className="modal">
                { this.props.subComponent }
            </div>
        );
    }
}

export default Modal;