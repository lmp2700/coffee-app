import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import { createRoast } from '../../redux/actions/roastActions';
import { loadRoasters } from '../../redux/actions/roasterActions';
class NewRoast extends Component{
    constructor(){
        super();
        this.state = {
            form: {
                "name": "",
                "roaster": null,
                "color": null,
                "origin": null,
                "description": null
            }
        }
    }
    componentDidMount(){
        this.props.loadRoasters();
    }
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    createCoffee = async(e)=>{
        e.preventDefault();
        this.props.createRoast(this.state.form)
    }
    render(){
        const roasterOptions = this.props.roasters.map((roaster)=>{
            return <option value={roaster._id} key={roaster._id}>{roaster.name}</option>
        })
        return(
            <Row>
                <Col sm={8} className="offset-sm-2">
                    <h4>Add a new coffee</h4>
                    <Form onSubmit={this.createCoffee}>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Name:</Label>
                                    <Input type="text" name="name" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    {/* TODO: Make this a typable box that shows results beneath */}
                                    <Label>Roaster:</Label>
                                    <Input type="select" name="roaster" onChange={this.handleChange}>
                                        <option value="none"></option>
                                        {roasterOptions}
                                    </Input>
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
                </Col>
            </Row>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        createRoast: (formData) => { createRoast(dispatch, formData, ownProps.history)},
        loadRoasters: () => { loadRoasters(dispatch) }
    }
}
const mapStateToProps = (state) => {
    return{
        roasters: state.roasters.roasters
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRoast)