import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css';

class MyFriendsModal extends Component{
    constructor(){
        super();
        this.state = {
            modal: false
        }
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }
    render(){
        const friends = this.props.friends.map((friend)=>{
            return(
                <div key={friend._id}>
                    <h1>{friend.displayName}</h1>
                </div>
            )
        })
        return(
            <div className="my-friends-modal">
                <p>You have {this.props.friends.length} friends</p>
                <Button color="secondary" onClick={this.toggle}>View Friends</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>My Network</ModalHeader>
                <ModalBody>
                   {friends}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        friends: state.auth.currentUser.friends
    }
}
export default connect(mapStateToProps)(MyFriendsModal);