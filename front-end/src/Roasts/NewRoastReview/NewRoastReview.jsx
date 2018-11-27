import React, {Component} from 'react';
import { Row, Col, Form, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { searchRoasts } from '../../redux/actions/searchActions';
class NewRoastReview extends Component{
    constructor(){
        super();
        this.state = {
            query: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render(){
        return(
            <Row>
                <Col sm={8} className="offset-sm-2">
                <h3>add a coffee review</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Label>What roast are you reviewing?</Label>
                        <Input type="text" name="query" onChange={this.handleChange} />
                    </Form>
                </Col>
                
            </Row>
        )
    }
}
const mapStateToProps = async (state) => {
    return {
        roastSearchResults: state.search.roastResults
    }
}
const mapDispatchToProps = async (dispatch) => {
    return {
        searchRoasts: (query) => { searchRoasts(dispatch, query)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRoastReview);