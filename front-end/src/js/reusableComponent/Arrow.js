import React, { Component } from "react";

class Arrow extends Component {
    render() {
        if (!this.props.reversed) {
            return (
                <svg className="arrow"onClick={this.props.onClick} id={this.props.id} width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    { /*Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch */ }
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Arrow" transform="translate(1.000000, 1.000000)" stroke="#333333" strokeWidth="2">
                            <polyline id="Path-2" points="0.5 1.13686838e-13 8.5 8 0.5 16"></polyline>
                        </g>
                    </g>
                </svg>
            )
        }
        else {
            return (
                <svg className="arrow" onClick={this.props.onClick} id={this.props.id} width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Welcome" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Desktop" transform="translate(-705.000000, -194.000000)" stroke="#333333" strokeWidth="2">
                            <g id="Arrow" transform="translate(710.500000, 203.000000) scale(-1, 1) translate(-710.500000, -203.000000) translate(706.000000, 195.000000)">
                                <polyline id="Path-2" points="0.5 1.13686838e-13 8.5 8 0.5 16"></polyline>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        }
        
    }
}
export default Arrow;