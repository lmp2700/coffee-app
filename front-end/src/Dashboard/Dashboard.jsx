import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

class Dashboard extends Component{
    render(){
        return(
            <div>
                <h2>This is the dashboard</h2>
                <Row>
                    <Col sm={8}>
                        <h3>Suggestions for you</h3>
                    </Col>
                    <Col sm={4}>
                        <h3>Recent reviews</h3>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        roasts: state.roasts.roasts,
        roastsDataLoaded: state.roasts.dataLoaded
    }
}
const mapDispatchToProps = (dispatch) => {
    return{

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);