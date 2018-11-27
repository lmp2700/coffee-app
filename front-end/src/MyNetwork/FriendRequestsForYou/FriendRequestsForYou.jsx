import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { acceptFriendRequest } from '../../redux/actions/friendRequestActions';
class FriendRequestsForYou extends Component{
    constructor(){
        super();
    }
    render(){
        const requests = this.props.friendRequests.map((request)=>{
            return(
                <div>
                    <p>{request.requester.displayName} wants to connect with you</p>
                    <Button color="success" onClick={this.props.acceptFriendRequest.bind(null, request._id)}>Accept</Button>
                </div>
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
        acceptFriendRequest: (requestId) => { acceptFriendRequest(dispatch, requestId) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestsForYou);