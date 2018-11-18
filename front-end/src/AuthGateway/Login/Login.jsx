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
        const success = await this.props.login(this.state.form);
        if(success){
            this.props.history.push("/");
        }else{
            this.setState({
                error: true
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
    render(){
        return(
            <Row>
                <Form onSubmit={this.submitLogin} inline>
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
const mapDispatchToProps = (dispatch) => {
    return{
        login: (formData) => { return login(dispatch, formData) }
    }
}
const mapStateToProps = (state) => {
    return{

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));