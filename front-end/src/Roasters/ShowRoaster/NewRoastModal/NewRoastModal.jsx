import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { createRoast } from '../../../redux/actions/roastActions';
import { withRouter } from 'react-router-dom';
class NewRoastModal extends Component{
    constructor(props){
        super(props);
        this.state = {
          modal: false,
          form: {
            "name": "",
            "roaster": null,
            "color": null,
            "origin": null,
            "description": null
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
    createRoast = (e) => {
        e.preventDefault();
        this.toggle();
        const newRoast = {
            ...this.state.form,
            roaster: this.props.roaster._id
        }
        this.props.createRoast(newRoast);
    }

    render(){
        return(
            <div>
                <Button color="success" className="roast-review-form-modal-button" onClick={this.toggle}>Add a review</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add a roast to f{this.props.roaster.name}</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.createRoast}>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Name:</Label>
                                    <Input type="text" name="name" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Color:</Label>
                                    <Input type="range" className="form-control-range" name="color" min="0" max="100" onChange={this.handleChange}/>
                                    <Label className="float-left">Light</Label><Label className="float-right">Dark</Label>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Origin:</Label>
                                    <Input type="text" name="origin" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input type="textarea" name="description" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button type="submit">Create</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.createRoast}>Add Review</Button>{' '}
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
        roaster: state.roasters.currentRoaster
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        createRoast: (formData)=> { createRoast(dispatch, formData, ownProps.history)}
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewRoastModal));