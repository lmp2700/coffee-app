import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkForUser } from './redux/actions/authActions';
import Dashboard from './Dashboard/Dashboard';
import Roasts from './Roasts/Roasts';
import AuthGateway from './AuthGateway/AuthGateway';
import Profile from './Profile/Profile';
import NavbarComponent from './NavbarComponent/NavbarComponent';
import Roasters from './Roasters/Roasters';
import RoasterSearchResults from './SearchResults/RoasterSearchResults';
import MyNetwork from './MyNetwork/MyNetwork';

class App extends Component {
  componentDidMount(){
    this.props.checkForUser();
  }
  render() {
    return (
      <Container fluid={true}>
        <NavbarComponent/>
                <Switch>
                  <Route exact path="/login" component = {AuthGateway} />
                  <Route path="/me/" component={Profile} />
                  <Route path="/mynetwork" component = {MyNetwork}/>
                  <Route path="/roasts/" component={Roasts} />
                  <Route path="/roasters/" component={Roasters} />
                  <Route path="/search/roasters/results" component={RoasterSearchResults} />
                  <Route exact path="/" component = {Dashboard}/>
                </Switch>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    checkForUser: () => { checkForUser(dispatch); }
  }
}
const mapStateToProps = (state) => {
  return{

  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));