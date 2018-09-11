import React, { Component } from "react";
import {Redirect} from "react-router-dom";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.state = { username: "", password: "", shouldRedirect: false };
    }
    render() {
        if (this.state.shouldRedirect) {
        }
        return <Redirect to="/clients"/>;
        return (
            <form className="login-page" onSubmit={this.handleSubmit}>
                <div className="login-title">Login</div>
                <div className="login-username-label label">Username</div>
                <input className="login-username-textfield" name="username" type="text" onChange={this.handleTextChange}/>
                <div className="login-password-label label">Password</div>
                <input type="password" className="login-password-textfield" name="password" onChange={this.handleTextChange}/>
                <input className="login-button" type="submit" value="Log in"/>
            </form>
        )
        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.functions.SIGN_IN(data, (successful) => {
            console.log(successful);
            if (successful) {
                // redirect
                this.setState({
                    shouldRedirect: true
                })
            }
        });
    }
    handleTextChange = (e) => {
        if (e.target.name === "username") {
            this.setState({username: e.target.value});
        }
        else this.setState({password: e.target.value});
        
    }
}

export default LoginPage;