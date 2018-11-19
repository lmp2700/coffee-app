import React, { Component } from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import Login from './Login/Login';
import Register from './Register/Register';
import './style.css';


class AuthGateway extends Component{
    constructor(props){
        super(props);
        this.state= {
            activeTab: '1',
        }
    }
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    render(){
        return(
                <Row>
                    <Col sm={8} className="offset-sm-2">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                Login
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                Register
                                </NavLink>
                            </NavItem>
                        </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Login/>
                        <button className="link-button" onClick={this.toggle.bind(null, '2')}>New User? Sign up</button>
                    </TabPane>
                    <TabPane tabId="2">
                        <Register />
                    </TabPane>
                    </TabContent>
                    </Col>
                </Row>
        )
    }
}
export default AuthGateway;