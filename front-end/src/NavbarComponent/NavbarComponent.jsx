import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
        return (
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
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink>Recommendations</NavLink>
                  </NavItem>
                  { this.props.auth.loggedIn ? 
                      <NavItem>
                      <NavLink>My Profile</NavLink>
                    </NavItem> :
                    <NavItem>
                      <NavLink tag={Link} to="/login">Log in</NavLink>
                    </NavItem>
                  }
                </Nav>
              </Collapse>
            </Navbar>
        );
      }
}
const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}
export default connect(mapStateToProps)(NavbarComponent);