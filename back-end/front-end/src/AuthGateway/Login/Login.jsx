import React, { Component } from 'react';
import { Button, Row, Form, FormGroup, Label, Input  } from 'reactstrap';
import { login } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            form: {
            "username": "",
            "password": ""
            },
            error: false,
        }
    }
    submitLogin = async (e) => {
        e.preventDefault();
        this.props.login(this.state.form);
    }
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    render(){
        return(
            <Row className="justify-content-center">
                <Form onSubmit={this.submitLogin}>
                    <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="loginUsername" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="loginPassword" onChange={this.handleChange} />
                    </FormGroup>
                    <Button>Login</Button>
                </Form>
            </Row>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        login: (formData) => { return login(dispatch, formData, ownProps.history) }
    }
}
const mapStateToProps = (state) => {
    return{
        loginError: state.auth.loginError
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));