import React, { Component } from "react";
import {Link} from "react-router-dom";

class TabBar extends Component {
    render() {
        return <div className="tabbar-container">
            <div className="welcome-bar">
                <div>Bienvenido</div>
            </div>
            <div className="menu-bar-container">
                <div className="menu-bar-item"><Link to="/clients">Clientela</Link></div>
                <div className="menu-bar-item"><Link to="/products">Productos</Link></div>
            </div>
        </div>
    }
}

export default TabBar;