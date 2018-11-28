import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { acceptFriendRequest, declineFriendRequest } from '../../redux/actions/friendRequestActions';
import './style.css';
class FriendRequestsForYou extends Component{
    render(){
        const requests = this.props.friendRequests.map((request)=>{
            return(
                <Row key={request._id}>
                    <Col sm={8}>
                        <p>{request.requester.displayName} wants to connect with you</p>
                    </Col>
                    <Col sm={4} className="friend-request-response-buttons">
                        <Button color="success" onClick={this.props.acceptFriendRequest.bind(null, request._id)}>Accept</Button>
                        <Button color="danger" onClick={this.props.declineFriendRequest.bind(null, request._id)}>Decline</Button>
                    </Col>
                </Row>
            )
        })
        return(
            <div>
                {requests}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        friendRequests: state.auth.friendRequestsForYou
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        acceptFriendRequest: (requestId) => { acceptFriendRequest(dispatch, requestId) },
        declineFriendRequest: (requestId) => { declineFriendRequest(dispatch, requestId) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestsForYou);