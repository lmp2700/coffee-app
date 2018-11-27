import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { searchRoasts } from '../../redux/actions/searchActions';
class NewRoastReview extends Component{
    render(){
        return(
            <Row>
                <Col sm={8} className="offset-sm-2">
                <h3>add a coffee review</h3>
                </Col>
                
            </Row>
        )
    }
}

export default NewRoastReview;