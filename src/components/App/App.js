import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './../Navigation';
import './App.css';
import { withUserAuthentication } from '../Auth';

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

export default withUserAuthentication(App);
