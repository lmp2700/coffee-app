import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input  } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { register } from '../../redux/actions/authActions';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            form: {
                "username": "",
                "password": "",
                "email": "",
                "confirmPassword": "",
            },
            errors: {}
        }
    }
    submitRegister = (e) => {
        e.preventDefault();
        let [valid, errors] = this.hasValidRegistration();
        if(valid){
            this.setState({
                errors: {}
            })
            this.props.register(this.state.form);
        }else{
            this.setState({
                errors
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    hasValidRegistration = () => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        let errors = {
            "email": [],
            "username": [],
            "password": [],
            "confirmPassword": [],
            "displayName": ""
        };
        let newUser = this.state.form;
        let valid = true;
        if(newUser.email === ""){
            errors.email = [...errors.email, "Provide an email address"]
            valid = false;
        }
        else if(!newUser.email.match(emailRegex)){
            errors.email = [...errors.email, "Invalid email format"]
            valid = false;
        }
        if(newUser.username.length < 2){
            errors.username = [...errors.username, "Username must be more than 2 characters"]
            valid = false;
        }
        if(!newUser.password){
            errors.password = [...errors.password, "Provide a password"]
            valid = false;
        }
        else if(newUser.password !== newUser.confirmPassword){
            errors.confirmPassword = [...errors.confirmPassword, "Passwords do not match"]
            valid = false;
        }
        return [valid, errors];
    }
    render(){
        return(
            <Form onSubmit={this.submitRegister}>
                 { this.props.registerError ? <p className="error-message">{this.props.registerError}</p> : null}
                <FormGroup>
                <Label for="username">Username</Label>
                {this.state.errors.username ? <p className="error-message">{this.state.errors.username}</p> : null}
                <Input type="text" name="username" id="registerUsername" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="registerEmail" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="registerPassword" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                <Label for="password">Confirm Password</Label>
                <Input type="password" name="confirmPassword" id="registerConfirmPassword" onChange={this.handleChange} />
                </FormGroup>
                <Button type="submit">Register</Button>
            </Form>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        register: (formData) => { register(dispatch, formData, ownProps.history) }
    }
}
const mapStateToProps = (state) => {
    return{
        registerError: state.auth.registerError
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));