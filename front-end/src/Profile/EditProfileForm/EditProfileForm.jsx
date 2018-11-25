import React, { Component } from 'react';
import { Row,Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/authActions';

class EditProfileForm extends Component{
    constructor(props){
        super(props);
        this.state = {
          modal: false,
          form: {
              displayName: this.props.currentUser.displayName,
              roastColorPreference: this.props.currentUser.profile.roastColorPreference,
              location: this.props.currentUser.profile.location,
          }
        };
    }
    updateUser = (e) => {
        e.preventDefault();
        this.toggle();
        this.props.updateUser({
            ...this.state.form,
            userId: this.props.currentUser._id
        });
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

    render(){
        return(
            <div>
                <Button color="danger" onClick={this.toggle}>{this.props.modalTitle}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Update your profile</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Display Name</Label>
                            <Input name="displayName" type="text" placeholder={this.props.currentUser.displayName} onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Location</Label>
                            <Input name="location" type="text" placeholder={this.props.currentUser.profile.location} onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Roast Color Preference</Label>
                            <Input type="range" className="form-control-range" name="roastColorPreference" min="0" max="100" onChange={this.handleChange}/>
                            <Row>
                                <Col sm={6}>
                                    <Label className="float-left">Light</Label>
                                </Col>
                                <Col sm={6}>
                                <Label className="float-right">Dark</Label>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.updateUser}>{this.props.modalTitle}</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        updateUser: (formData)=> { updateUser(dispatch, formData, ownProps.history)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm); 