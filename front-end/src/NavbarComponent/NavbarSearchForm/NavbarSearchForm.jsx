import React, {Component} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default class NavbarSearchForm extends Component {
    handleNavbarSearch = (e) => {
        e.preventDefault();
    }
    render() {
        return (
        <Form inline onSubmit={this.handleNavbarSearch}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="text" name="search-term" placeholder="Search roasters, roasts, people..." />
            </FormGroup>
            <Button className="btn-success">Search</Button>
        </Form>
        );
    }
}

//TODO: When the search bar is clicked, a dropdown lets you choose:
// Roaster, Roast, or Users. eg. linkedIn's search bar.