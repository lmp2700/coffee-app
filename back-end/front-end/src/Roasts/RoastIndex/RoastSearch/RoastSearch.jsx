import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { searchRoasts } from '../../../redux/actions/searchActions';

class RoastSearch extends Component{
    constructor(){
        super();
        this.state = {
            query: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchRoasts(this.state);
    }
    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Search Roasts</Label>
                    <Input name="query" onChange={this.handleChange}/>
                </FormGroup>
                <Button type="submit">Search</Button>
            </Form>
        )
    }
}
const mapStateToProps = (state) => {
    return{

    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        searchRoasts: (formData) => { searchRoasts(dispatch, formData)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoastSearch);