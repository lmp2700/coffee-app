import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';

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
                <div>
                    <h1>{friend.displayName}</h1>
                </div>
            )
        })
        return(
            <div>
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