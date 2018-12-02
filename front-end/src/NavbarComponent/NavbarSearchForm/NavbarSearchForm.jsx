import React, {Component} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchRoasters } from '../../redux/actions/searchActions';

class NavbarSearchForm extends Component {
    constructor(){
        super();
        this.state = {
            "query": "",
            "location": ""
        }
    }
    handleNavbarSearch = (e) => {
        e.preventDefault();
        this.props.searchRoasters(this.state);
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    render() {
        return (
        <Form inline onSubmit={this.handleNavbarSearch}>
            <FormGroup className="navbar-search-inputs">
            <Input type="text" name="query" onChange={this.handleChange} placeholder="Search roasters" />
            </FormGroup>
            <FormGroup className="navbar-search-inputs">
            <Input type="text" name="location" onChange={this.handleChange} placeholder="Near"/>
            </FormGroup>
            <Button className="btn-success">Search</Button>
        </Form>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        searchRoasters: (formData) => { searchRoasters(dispatch, formData, ownProps.history)}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarSearchForm));

//TODO: When the search bar is clicked, a dropdown lets you choose:
// Roaster, Roast, or Users. eg. linkedIn's search bar.