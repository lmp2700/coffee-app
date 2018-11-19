import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import './style.css';
import NavbarSearchForm from './NavbarSearchForm/NavbarSearchForm';

class NavbarComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isOpen: false
        };
    }
      toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      render() {
        return this.props.auth.loggedIn ? 
            <Navbar dark expand="md">
              <NavbarBrand tag={Link} to="/">Bean Scout</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavbarSearchForm/>
                  </NavItem>
                </Nav>
                <Nav navbar className="ml-auto">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Coffee
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag={Link} to="/coffee">
                        My Coffees
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/coffee/reviews/new">
                        Add a review
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/coffee/new">
                        Add a new roast
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                    <NavItem>
                      <NavLink tag={Link} to="/me">My Profile</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.props.logout}>Logout</NavLink>
                    </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          :
          //NAVBAR FOR STRANGERS
          <Navbar dark expand="md">
          <NavbarBrand tag={Link} to="/">Bean Scout</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavbarSearchForm/>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Coffee
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/coffee">
                    Browse Coffees
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                <NavItem>
                  <NavLink tag={Link} to="/login">Login</NavLink>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      }
}
const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    logout: () => { logout(dispatch, ownProps.history) }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarComponent));