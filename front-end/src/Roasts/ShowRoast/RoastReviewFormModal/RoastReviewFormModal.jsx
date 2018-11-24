import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { createReview } from '../../../redux/actions/roastActions';
class RoastReviewFormModal extends Component{
    constructor(props){
        super(props);
        this.state = {
          modal: false,
          form: {
              rating: null,
              title: null,
              body: null
          }
        };
    }
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }
    createReview = (e) => {
        e.preventDefault();
        this.toggle();
        const newReview = {
            ...this.state.form,
            roast: this.props.roast._id
        }
        this.props.createReview(newReview);
    }

    render(){
        return(
            <div>
                <Button color="danger" onClick={this.toggle}>Add a review</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Review {this.props.roast.name}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input name="title" type="text" onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Rating</Label>
                            <Input name="rating" type="number" max="5" min="1" onChange={this.handleChange}></Input>
                        </FormGroup>  
                        <FormGroup>
                            <Label>Review</Label>
                            <Input name="body" type="textarea" onChange={this.handleChange}></Input>
                        </FormGroup>   
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.createReview}>Add Review</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return{
        roast: state.roasts.currentRoast
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        createReview: (formData)=> { createReview(dispatch, formData, ownProps.history)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoastReviewFormModal);