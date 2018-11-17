import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import NavbarComponent from './NavbarComponent/NavbarComponent';
import Dashboard from './Dashboard/Dashboard';
import MyCoffee from './MyCoffee/MyCoffee';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/coffee" component={MyCoffee} />
        </Switch>
      </Container>
    );
  }
}

export default App;
