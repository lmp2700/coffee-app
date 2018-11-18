import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import MyCoffee from './MyCoffee/MyCoffee';
import AuthGateway from './AuthGateway/AuthGateway';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
                <Switch>
                  <Route exact path="/" component = {Dashboard}/>
                  <Route exact path="/login" component = {AuthGateway} />
                  <Route path="/coffee/" component={MyCoffee} />
                </Switch>
      </Container>
    );
  }
}

export default App;
