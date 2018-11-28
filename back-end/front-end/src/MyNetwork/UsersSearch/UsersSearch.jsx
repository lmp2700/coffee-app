import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap'
import { connect } from 'react-redux';
import { searchUsers } from '../../redux/actions/searchActions';
import { createFriendRequest } from '../../redux/actions/friendRequestActions';

class UsersSearch extends Component{
    constructor(){
        super();
        this.state = {
            query: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchUsers(this.state.query);
    }
    render(){
        const nonFriends = this.props.searchResults.filter((user)=>{
            return !this.props.currentUser.friends.find((friend) => {
                return friend.username === user.username
            });
        })
        const myFriends = this.props.searchResults.filter((user)=>{
            return this.props.currentUser.friends.find((friend)=>{
                return friend.username === user.username
            })
        })
        console.log(myFriends);
        const searchResults = nonFriends.map((result)=>{
            return(
                <div key={result._id} className="user-search-result">
                    <h4>{result.username}</h4>
                    <Button onClick={this.props.createFriendRequest.bind(null, result._id)}>Request as Friend</Button>
                </div>
            )
        })
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Input type="text" name="query" onChange={this.handleChange} />
                    <Button type="submit">Search for users</Button>
                </Form>
                {searchResults}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        searchResults: state.search.userResults,
        currentUser: state.auth.currentUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        searchUsers: (query) => { searchUsers(dispatch, query)},
        createFriendRequest: (userId) => { createFriendRequest(dispatch, userId)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersSearch);