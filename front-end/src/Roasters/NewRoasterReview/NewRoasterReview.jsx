import React, {Component} from 'react';
import { Row, Col, Form, Label, Input, Button, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { loadRoasters, createReview } from '../../redux/actions/roasterActions';
import { Link } from 'react-router-dom';
import AutoSuggest from 'react-autosuggest';
import './style.css';

// https://github.com/moroshko/react-autosuggest
 // When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => {
    return suggestion._id;
}
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
<span>
    {suggestion.name}
</span>
);

class NewRoasterReview extends Component{
    constructor(){
        super();
        this.state = {
            roaster: null,
            query: "",
            title: "",
            body: "",
            rating: null,
            roasterSelected: false,
            roasterSuggestions: [],
            roasterChosenError: false
        }
    }
    componentDidMount(){
        this.props.loadRoasters();
    }
    
    handleSearchChange = (e) => {
        if(e.type !== "click"){
            this.setState({
                query: e.currentTarget.value.toString(),
                roaster: null
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.currentTarget.name] : e.currentTarget.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createReview(this.state);
    }
    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        //maybe do a regexy thing in future
        return inputLength === 0 ? [] : this.props.roasters.filter(roaster =>
        //do the first letters of the name match whats typed so far?
        roaster.name.toLowerCase().slice(0, inputLength) === inputValue
        ).slice(0, 20);
    }
    // This should happen when we request suggestions to filter things down
    onSuggestionsFetchRequested = ({ value, reason }) => {
        if(reason === "input-changed"){
            this.setState({
                roasterSuggestions: this.getSuggestions(value)
            });
        }
    };
        // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            roasterSuggestions: []
        });
    };
    selectSuggestion = (e, {suggestion, suggestionValue}) => {
        this.setState({
            query: suggestion.name,
            roaster: suggestionValue,
            roasterChosenError: false
        })
    }
    searchBlur = (e, {highlightedSuggestion}) => {
        //IF THEY CLICK OFF JUST PICK FOR THEM
        if(this.state.roasterSuggestions.length > 0){
            this.setState({
                roast: this.state.roasterSuggestions[0]._id,
                query: this.state.roasterSuggestions[0].name,
                roasterChosenError: false
            })
        }else{
            this.setState({
                roasterChosenError: true
            })
        }
    }
    render(){
        const value = this.state.query
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'What roaster are you reviewing?',
            value,
            onChange: this.handleSearchChange,
            onBlur: this.searchBlur
        };
        return(
            <div>
                <Row>
                    <Col sm={8} className="offset-sm-2">
                        <h3>Review a roaster</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col sm={6}>
                                    <Label>Roast:</Label>
                                    <AutoSuggest
                                    suggestions={this.state.roasterSuggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                    onSuggestionSelected={this.selectSuggestion}
                                    />
                                {this.state.roasterChosenError && !this.state.roaster ? <p>Choose a valid roast</p> : null}
                                </Col>
                                <Col sm={6}>
                                    <p>Can't find the roaster you want?</p>
                                    <Link to="/roasters/new"><Button>Add a new roaster</Button></Link>
                                </Col>
                            </Row>
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
                            <Button type="submit">Submit Review</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        roasters: state.roasters.roasters
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        loadRoasters: () => { loadRoasters(dispatch)},
        createReview: (formData)=> { createReview(dispatch, formData, ownProps.history)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRoasterReview);