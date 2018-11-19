import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import { createCoffee } from '../../redux/actions/coffeeActions';
class NewCoffee extends Component{
    constructor(){
        super();
        this.state = {
            form: {
                "name": "",
                "roaster": null,
                "color": null,
                "origin": null
            }
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
    createCoffee = async(e)=>{
        e.preventDefault();
        this.props.createCoffee(this.state.form)
    }
    render(){
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
                                    <Label>Roaster:</Label>
                                    <Input type="select" name="roasterId" onChange={this.handleChange}>
                                        <option value="none">Unknown</option>
                                        <option value="1">Roaster1</option>
                                        <option value="2">Roaster2</option>
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
                        <Button type="submit">Create</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        createCoffee: (formData) => { createCoffee(dispatch, formData, ownProps.history)}
    }
}
const mapStateToProps = (state) => {
    return{
        roasters: state.allRoasters
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewCoffee)