import React, { Component } from 'react';
import { Row, Col, Progress } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadRoast } from '../../redux/actions/roastActions';
import RoastReviewFormModal from './RoastReviewFormModal/RoastReviewFormModal';

class ShowRoast extends Component{
    componentDidMount(){
        this.props.loadRoast();
    }
    render(){
        return(
            <div>
                <Row className="roast-detail">
                    <Col sm={6} className="offset-sm-3">
                        <h2>{this.props.roast.name}</h2>
                        <h5>Roasted by: <Link to={`/roasters/${this.props.roast.roaster._id}`}>{this.props.roast.roaster.name}</Link></h5>
                        <p>Origin: {this.props.roast.origin}</p>
         {/* improve progress bar with https://reactstrap.github.io/components/progress/ */}
                        <Row className="roast-color-detail">
                            <Col>
                                <p className="float-left">Light</p>
                            </Col>
                            <Col>
                                <p className="float-right">Dark</p>
                            </Col>
                        
                        </Row>
                        <Progress value={this.props.roast.color} />
                        <RoastReviewFormModal />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        roast: state.roasts.currentRoast
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        loadRoast: () => { loadRoast(dispatch, ownProps.match.params.id)}
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowRoast));