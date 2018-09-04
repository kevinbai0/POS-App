import React, { Component } from 'react';
import TabBar from './js/components/TabBar';
import Client from './js/components/Client';
import {Route, BrowserRouter as Router } from "react-router-dom";
import ProductPage from './js/components/ProductPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={TabBar}/>
          <Route exact path="/" render={() => 
              <Client functions={this.props.functions}/>
          }/>
          <Route path="/products" render={ () =>
            <ProductPage functions={this.props.functions.products}/>
          } />
        </div>
      </Router>
    );
  }
}

export default App;
