import React, { Component } from 'react';
import TabBar from './js/components/TabBar';
import Client from './js/components/Client';
import {Route, BrowserRouter as Router } from "react-router-dom";
import ProductPage from './js/components/ProductPage';
import LoginPage from "./js/components/LoginPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={ () => <LoginPage functions={this.props.functions.authentication}/> } />
          <Route path="/clients" component={TabBar}/>
          <Route path="/products" component={TabBar}/>
          <Route exact path="/clients" render={() => 
            <Client functions={this.props.functions}/>
          }/>
          <Route exact path="/products" render={ () =>
            <ProductPage functions={this.props.functions.products}/>
          } />
        </div>
      </Router>
    );
  }
}

export default App;
