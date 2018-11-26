import React, {Component} from 'react';
import { connect } from 'react-redux';
import { acceptFriendRequest } from '../../redux/actions/friendRequestActions';

class PendingFriendRequests extends Component{
    render(){
        const requests = this.props.friendRequestsForYou.map((request)=>{
            return(
                <div key={request._id}>
                    <p>{request.requester.username} requests friendship with you</p>
                </div>
            )
        })
        return(
            <div>
                <h4>your friend requests await</h4>
                {requests}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        friendRequestsForYou: state.friendRequests.friendRequestsForYou
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        acceptFriendRequest: (friendRequestId) => { acceptFriendRequest(dispatch, friendRequestId)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingFriendRequests)