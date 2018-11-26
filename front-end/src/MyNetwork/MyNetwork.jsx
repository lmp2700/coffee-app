import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFriendRequest, loadFriendRequests } from '../redux/actions/friendRequestActions';
import { Row, Col } from 'reactstrap';
import UsersSearch from './UsersSearch/UsersSearch';
import './style.css';

class MyNetwork extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        this.props.loadFriendRequests();
    }

    render(){
        return(
            <div className="my-network">
                <Row>
                    <Col sm={4}>
                        <UsersSearch/>
                    </Col>
                    <Col sm={8}>
                        <h2>Here's your friends and requests and such</h2>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        createFriendRequest: () => { createFriendRequest(dispatch) },
        loadFriendRequests: () => { loadFriendRequests(dispatch) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyNetwork);