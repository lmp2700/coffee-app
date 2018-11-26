import React, { Component } from 'react';
import { connect } from 'react-redux';
import { acceptFriendRequest, createFriendRequest, loadFriendRequests } from '../redux/actions/friendRequestActions';

class MyNetwork extends Component{
    constructor(){
        super();
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <h2>Here's your friends and requests and such</h2>
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
        acceptFriendRequest: () => { acceptFriendRequest(dispatch) },
        createFriendRequest: () => { createFriendRequest(dispatch) },
        loadFriendRequests: () => { loadFriendRequests(dispatch) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyNetwork);