import React, { Component } from 'react';
import { Route,Switch,BrowserRouter as Router } from 'react-router-dom';
import Navigation from './../Navigation';
import './App.css';
import Home from './../Home';
import * as routers from './../../constants/routes';
import { withAuthentication } from '../Session';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Navigation/>

        
        </Router>
      </React.Fragment>
    );
  }
}

export default withAuthentication(App);
