import React, { Component } from "react";

class AddButton extends Component {
    render() {
        return (
            <svg id={this.props.id} className="add-button" width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" onClick={this.props.onClick}>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Welcome" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
                    <g id="Desktop" transform="translate(-615.000000, -199.000000)" stroke="#979797">
                        <g id="Add-Symbol" transform="translate(616.000000, 200.000000)">
                            <g id="Group">
                                <path d="M0.388888889,10.5 L20.6111111,10.5" id="Line-2" strokeWidth="2"></path>
                                <path d="M10.5,0.388888889 L10.5,20.6111111" id="Line-2-Copy" strokeWidth="2"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        )
    }
}
export default AddButton;