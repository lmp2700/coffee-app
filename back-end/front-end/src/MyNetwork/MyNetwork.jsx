import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFriendRequest, loadFriendRequests } from '../redux/actions/friendRequestActions';
import { Row, Col } from 'reactstrap';
import UsersSearch from './UsersSearch/UsersSearch';
import FriendRequestsForYou from './FriendRequestsForYou/FriendRequestsForYou';
import MyFriendsModal from './MyFriendsModal/MyFriendsModal';
import './style.css';

class MyNetwork extends Component{
    componentDidMount(){
        //Maybe these should be loaded elsewhere, navbar might want them
        this.props.loadFriendRequests();
    }
    render(){
        console.log(this.props);
        return(
            <div className="my-network">
                <Row>
                    <Col sm={4}>
                        <h4>Find new contacts</h4>
                        <UsersSearch/>
                    </Col>
                    <Col sm={8}>
                        <h4>Your contacts</h4>
                        <MyFriendsModal/>
                        <FriendRequestsForYou/>
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