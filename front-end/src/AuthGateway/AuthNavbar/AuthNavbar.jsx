import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class AuthNavbar extends Component{
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
            <Navbar dark expand="sm">
              <NavbarBrand tag={Link} to="/">Bean Scout</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/coffee">My Coffee</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>Recommendations</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>My Profile</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
        );
      }
}

export default AuthNavbar