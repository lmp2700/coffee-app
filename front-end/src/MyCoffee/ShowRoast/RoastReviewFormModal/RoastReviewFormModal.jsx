import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class RoastReviewFormModal extends Component{
    constructor(props){
        super(props);
        this.state = {
          modal: false
        };
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

    render(){
        return(
            <div>
                <Button color="danger" onClick={this.toggle}>Add a review</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <h4>form goes here</h4>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default RoastReviewFormModal;