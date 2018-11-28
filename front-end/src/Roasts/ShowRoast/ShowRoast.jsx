import React, { Component } from 'react';
import { Row, Col, Progress } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadRoast } from '../../redux/actions/roastActions';
import RoastReviewFormModal from './RoastReviewFormModal/RoastReviewFormModal';
import './style.css';

class ShowRoast extends Component{
    componentDidMount(){
        this.props.loadRoast();
    }
    render(){
        const reviews = this.props.roast.reviews.map((review)=>{
            return(
                <div key={review._id}>
                    <h4>{review.title} {review.rating}/5</h4>
                    <h6>{review.reviewer.username}</h6>
                    <p>{review.body}</p>
                </div>
            )
        })
        let totalRating = 0;
        for(let i = 0; i < this.props.roast.reviews.length; i++){
            totalRating += this.props.roast.reviews[i].rating
        }
        const averageRating = totalRating / this.props.roast.reviews.length;
        return(
            <div>
                <Row className="roast-detail">
                    <Col sm={8}>
                        <h2>{this.props.roast.name} {this.props.roast.reviews.length > 0 && `${averageRating}/5` }</h2>
                        <h5>Roasted by: <Link to={`/roasters/${this.props.roast.roaster._id}`}>{this.props.roast.roaster.name}</Link></h5>
                        <p>Origin: {this.props.roast.origin}</p>
                        <p>{this.props.roast.description}</p>
                        {/* TODO: improve progress bar with https://reactstrap.github.io/components/progress/ */}
                        <Row className="roast-color-detail">
                            <Col>
                                <p className="float-left">Light</p>
                            </Col>
                            <Col>
                                <p className="float-right">Dark</p>
                            </Col>
                        </Row>
                        <Progress value={this.props.roast.color} />
                        <RoastReviewFormModal roast={this.props.roast}/>
                    </Col>
                    <Col sm={4}>
                        <h4>Reviews</h4>
                        {reviews}
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