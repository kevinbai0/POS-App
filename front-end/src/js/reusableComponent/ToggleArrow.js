import React, {Component} from "react";

class ToggleArrow extends Component {
    render() {
        if (this.props.reversed) {
            return <svg onClick={this.props.onClick} id={this.props.id} width="11px" height="13px" viewBox="0 0 11 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Welcome" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Desktop" transform="translate(-570.000000, -469.000000)" stroke="#333333">
                        <rect id="Rectangle-9-Copy-2" fill="#FFFFFF" transform="translate(575.500000, 475.500000) scale(1, -1) translate(-575.500000, -475.500000) " x="570.5" y="469.5" width="10" height="12" rx="2"></rect>
                        <polyline id="Path-6-Copy" transform="translate(575.514202, 476.000000) scale(1, -1) translate(-575.514202, -476.000000) " points="573 477 575.514202 475 578.028405 477"></polyline>
                    </g>
                </g>
            </svg>
        }
        else {
            return <svg onClick={this.props.onClick} id={this.props.id}width="11px" height="13px" viewBox="0 0 11 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Welcome" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Desktop" transform="translate(-570.000000, -457.000000)" stroke="#333333">
                        <rect id="Rectangle-9-Copy" fill="#FFFFFF" x="570.5" y="457.5" width="10" height="12" rx="2"></rect>
                        <polyline id="Path-6" points="573 465 575.514202 463 578.028405 465"></polyline>
                    </g>
                </g>
            </svg>
        }
    }
}
export default ToggleArrow;